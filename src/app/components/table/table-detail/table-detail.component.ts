import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GameService } from 'src/app/services/game/game.service';
import { RoundMediatorService } from 'src/app/services/round-mediator/round-mediator.service';
import { Round } from 'src/app/services/round/round';
import { RoundService } from 'src/app/services/round/round.service';
import { TableService } from 'src/app/services/table/table.service';
import { TeamService } from 'src/app/services/team/team.service';
import { TeamPlayer } from '../../team-player/team-player';
import { Team } from '../../team/team';
import { Table } from './../table';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.css']
})
export class TableDetailComponent implements OnInit, OnDestroy {
  @Input() table: Table;
  teams: Team[];
  teamScore: number;
  gameId: string;
  roundId: string;
  pointsConfirmed = false;
  currentTeamPlayer?: TeamPlayer;
  isDisabled = false;
  subscriptions: Subscription[] = [];
  isCurrentUserAdmin = false;
  allTablesConfirmed = false;

  constructor(
    private authService: AuthService,
    private gameService: GameService,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private tableService: TableService,
    private roundMediatorService: RoundMediatorService) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.roundId = this.route.snapshot.paramMap.get('roundId');

    this.getTeams();

    this.subscriptions.push(
      combineLatest([
        this.gameService.isCurrentUserAdmin(this.gameId),
        this.roundMediatorService.allTablesConfirmed(this.roundId, this.gameId)
      ]).subscribe({
        next: ([isAdmin, confirmed]) => {
          this.isCurrentUserAdmin = isAdmin;
          this.allTablesConfirmed = confirmed;
          if (!isAdmin && confirmed) {
            this.isDisabled = true;
          } else {
            this.isDisabled = false;
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getTeams(): void {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) { return; }

    this.subscriptions.push(
      combineLatest([
        this.gameService.isUserAdmin(currentUser.uid, this.gameId),
        this.teamService.getTeamsForTable(this.table.id, this.roundId, this.gameId)
      ]).subscribe({
        next: ([isAdmin, updatedTeams]) => {
          if (updatedTeams) {

            this.teams = updatedTeams;

            updatedTeams.forEach((team) => {
              const updatedCurrentPlayer = team.teamPlayers.find((teamPlayer) => teamPlayer.player.uid === currentUser.uid);
              if (updatedCurrentPlayer) {
                this.currentTeamPlayer = updatedCurrentPlayer;
              }
            });

            this.checkPointsConfirmed();
          }
        }
      })
    );
  }

  toggleConfirmPoints(confirm: boolean): void {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) { return; }

    this.subscriptions.push(
      this.gameService.isUserAdmin(currentUser.uid, this.gameId).pipe(take(1)).subscribe({
        next: (isAdmin) => {

          if (isAdmin) {
            this.teams.forEach((team) => {
              this.setTeamPointsConfirmed(team, confirm);
            });

          } else if (this.currentTeamPlayer) {
            this.teams.forEach((team) => {
              const teamPlayer = team.teamPlayers.find((tp) => tp.player.uid === currentUser.uid);
              if (teamPlayer) {
                this.setTeamPointsConfirmed(team, confirm);
              }
            });
          }

          this.updateTeams().subscribe({
            next: () => {
              this.checkPointsConfirmed();
            }
          });
        }
      })
    );
  }

  toggleTeamConfirmPoints(team: Team, confirm: boolean): void {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser || this.allTablesConfirmed) { return; }

    const teamToUpdate = this.teams.find((t) => t.id === team.id);
    const isCurrentUsersTeam = teamToUpdate?.teamPlayers.some((teamPlayer) => teamPlayer.player.uid === currentUser.uid);

    if (!teamToUpdate || !isCurrentUsersTeam) { return; }

    if (confirm) {
      this.setCurrentPlayerPointsConfirmed(teamToUpdate, currentUser.uid);
    } else {
      this.setTeamPointsConfirmed(teamToUpdate, false);
    }

    this.subscriptions.push(
      this.teamService.updateTeam(teamToUpdate, this.table.id, this.roundId, this.gameId).subscribe({
        next: () => {
          this.checkPointsConfirmed();
        }
      })
    );
  }

  updateTeamPoints(team: Team, points: number): void {
    if (this.allTablesConfirmed) { return; }

    const teamToUpdate = this.teams.find((t) => t.id === team.id);

    if (!teamToUpdate || teamToUpdate.points === points) { return; }

    teamToUpdate.points = points;
    this.clearAllTeamConfirmations();

    if (this.table.pointsConfirmed) {
      this.table.pointsConfirmed = false;
      this.subscriptions.push(
        this.tableService.updateTable(this.table, this.roundId, this.gameId).subscribe()
      );
    }

    this.subscriptions.push(
      this.updateTeams().subscribe({
        next: () => {
          this.checkPointsConfirmed();
        }
      })
    );
  }

  trackByTeamId(index: number, team: Team): string {
    return team.id;
  }

  isTeamConfirmed(team: Team): boolean {
    return (team.teamPlayers ?? []).some((teamPlayer) => !!teamPlayer.isPointsConfirmed);
  }

  private checkPointsConfirmed(): void {
    const allTeamsConfirmed = this.teams?.length > 0 && this.teams.every((team) => this.isTeamConfirmed(team));
    this.pointsConfirmed = allTeamsConfirmed;

    if (this.table.pointsConfirmed !== allTeamsConfirmed) {
      this.table.pointsConfirmed = allTeamsConfirmed;
      this.subscriptions.push(
        this.tableService.updateTable(this.table, this.roundId, this.gameId).subscribe({
          next: () => {
            if (allTeamsConfirmed) {
              this.finalizeRoundIfReady();
            }
          }
        })
      );
    }
  }

  private setTeamPointsConfirmed(team: Team, confirm: boolean): void {
    team.teamPlayers = (team.teamPlayers ?? []).map((teamPlayer) => ({
      ...teamPlayer,
      isPointsConfirmed: confirm
    }));
  }

  private setCurrentPlayerPointsConfirmed(team: Team, playerId: string): void {
    team.teamPlayers = (team.teamPlayers ?? []).map((teamPlayer) => ({
      ...teamPlayer,
      isPointsConfirmed: teamPlayer.player.uid === playerId ? true : !!teamPlayer.isPointsConfirmed
    }));
  }

  private clearAllTeamConfirmations(): void {
    this.teams.forEach((team) => this.setTeamPointsConfirmed(team, false));
  }

  private updateTeams() {
    return combineLatest(
      this.teams.map((team) => this.teamService.updateTeam(team, this.table.id, this.roundId, this.gameId))
    ).pipe(take(1));
  }

  private finalizeRoundIfReady(): void {
    this.subscriptions.push(
      this.roundMediatorService.finalizeRoundIfReady(this.roundId, this.gameId).subscribe()
    );
  }
}
