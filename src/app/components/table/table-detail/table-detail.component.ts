import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
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
export class TableDetailComponent implements OnInit {
  @Input() table: Table;
  teams: Team[];
  teamScore: number;
  gameId: string;
  roundId: string;
  pointsConfirmed = false;
  currentTeamPlayer?: TeamPlayer;
  isDisabled = false;

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

    combineLatest([
      this.gameService.isCurrentUserAdmin(this.gameId),
      this.roundMediatorService.allTablesConfirmed(this.roundId, this.gameId)
    ]).subscribe({
      next: ([isAdmin, confirmed]) => {
        if (!isAdmin && confirmed) {
          this.isDisabled = true;
        } else {
          this.isDisabled = false;
        }
      }
    });
  }

  getTeams(): void {
    this.teamService.getTeamsForTable(this.table.id, this.roundId, this.gameId).subscribe({
      next: (teams) => {
        if (teams) {
          this.teams = teams;
          teams.forEach((team) => {
            const currentUser = this.authService.getCurrentUser();
            if (currentUser) {
              this.currentTeamPlayer = team.teamPlayers.find((teamPlayer) => teamPlayer.player.uid === currentUser.uid);
            }
          });

          this.checkPointsConfirmed();
        }
      }
    });
  }

  toggleConfirmPoints(): void {
    const currentUser = this.authService.getCurrentUser();

    this.gameService.isUserAdmin(currentUser.uid, this.gameId).pipe(take(1)).subscribe({
      next: (isAdmin) => {

        // if current user is admin, then set all team players points confirmed
        if (isAdmin) {
          this.teams.forEach((team) => {
            team.teamPlayers.forEach((teamPlayer) => {
              teamPlayer.isPointsConfirmed = !teamPlayer.isPointsConfirmed;
            });
            this.teamService.updateTeam(team, this.table.id, this.roundId, this.gameId).subscribe({
              next: () => {
                this.checkPointsConfirmed();
              }
            });
          });

        } else if (this.currentTeamPlayer) {
          // else if user is a team player, then only set their points confirmed value
          this.currentTeamPlayer.isPointsConfirmed = !this.currentTeamPlayer.isPointsConfirmed;

          // find the team to update
          this.teams.forEach((team) => {
            // if current user is on this team, then update it
            if (team.teamPlayers.find((teamPlayer) => teamPlayer.player.uid === currentUser.uid)) {
              this.teamService.updateTeam(team, this.table.id, this.roundId, this.gameId).subscribe({
                next: () => {
                  this.checkPointsConfirmed();
                }
              });
            }
          });
        }
      }
    });
  }

  private checkPointsConfirmed(): void {
    let confirmCounter = 0;

    this.teams.forEach((team) => {
      team.teamPlayers.forEach((teamPlayer) => {
        if (teamPlayer.isPointsConfirmed) {
          confirmCounter++;
        }
      });
    });

    this.pointsConfirmed = confirmCounter > 0;
    const allPlayersConfirmed = confirmCounter === 4;

    if (this.table.pointsConfirmed !== allPlayersConfirmed) {
      this.table.pointsConfirmed = allPlayersConfirmed;
      this.tableService.updateTable(this.table, this.roundId, this.gameId);
    }
  }
}