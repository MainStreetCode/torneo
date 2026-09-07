import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GameService } from 'src/app/services/game/game.service';
import { MessageService } from 'src/app/services/message/message.service';
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
  currentUserTeamId?: string;
  isDisabled = false;
  subscriptions: Subscription[] = [];
  isCurrentUserAdmin = false;
  allTablesConfirmed = false;
  private round?: Round;
  private hasRedirectedToDashboard = false;
  private previousPointsConfirmed?: boolean;
  private previousAllTablesConfirmed?: boolean;
  private isFinalizingRound = false;
  private isEndingRound = false;

  constructor(
    private authService: AuthService,
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
    private tableService: TableService,
    private roundService: RoundService,
    private roundMediatorService: RoundMediatorService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.roundId = this.route.snapshot.paramMap.get('roundId');

    this.getTeams();
    this.watchRoundFinalized();

    this.subscriptions.push(
      combineLatest([
        this.gameService.isCurrentUserAdmin(this.gameId),
        this.roundMediatorService.allTablesConfirmed(this.roundId, this.gameId)
      ]).subscribe({
        next: ([isAdmin, confirmed]) => {
          this.isCurrentUserAdmin = isAdmin;
          this.allTablesConfirmed = confirmed;
          this.handleAllTablesConfirmedChange(confirmed);
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
        this.teamService.getTeamsForTable(this.table.id, this.roundId, this.gameId)
      ]).subscribe({
        next: ([updatedTeams]) => {
          if (updatedTeams) {

            this.teams = updatedTeams;
            this.currentTeamPlayer = undefined;
            this.currentUserTeamId = undefined;

            updatedTeams.forEach((team) => {
              const updatedCurrentPlayer = team.teamPlayers.find((teamPlayer) => teamPlayer.player.uid === currentUser.uid);
              if (updatedCurrentPlayer) {
                this.currentTeamPlayer = updatedCurrentPlayer;
                this.currentUserTeamId = team.id;
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
              this.setAdminTeamPointsConfirmed(team, confirm, currentUser.uid);
            });

          } else if (this.currentTeamPlayer) {
            const currentUsersTeam = this.getCurrentUsersTeam(currentUser.uid);
            this.teams.forEach((team) => this.setTeamPointsConfirmed(team, currentUsersTeam, currentUser.uid, confirm));
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
    const currentUsersTeam = this.getCurrentUsersTeam(currentUser.uid);

    if (!teamToUpdate || !currentUsersTeam) { return; }

    this.setTeamPointsConfirmed(teamToUpdate, currentUsersTeam, currentUser.uid, confirm);

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
    this.clearTeamConfirmations(teamToUpdate);

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
    const requiredTeamIds = (this.teams ?? []).map((tableTeam) => tableTeam.id);

    return requiredTeamIds.length > 0 && requiredTeamIds.every((teamId) =>
      (team.pointConfirmations ?? []).some((confirmation) => confirmation.teamId === teamId)
    );
  }

  hasCurrentUserTeamConfirmed(team: Team): boolean {
    return !!this.currentUserTeamId && (team.pointConfirmations ?? [])
      .some((confirmation) => confirmation.teamId === this.currentUserTeamId);
  }

  get tableHeaderLabel(): string {
    const tableLabel = `Table ${this.table?.number}`;
    return this.currentUserTeamId ? `Your table: ${tableLabel}` : tableLabel;
  }

  get tableStatusLabel(): string {
    if (this.allTablesConfirmed) {
      return 'Round finalized';
    }

    return this.pointsConfirmed ? 'Scores confirmed' : 'Needs scores';
  }

  get tableStatusIcon(): string {
    if (this.allTablesConfirmed) {
      return 'verified';
    }

    return this.pointsConfirmed ? 'check_circle' : 'edit_note';
  }

  get tablePlayerCount(): number {
    return (this.table?.playerIds ?? []).length;
  }

  get tablePlayerCountLabel(): string {
    const count = this.tablePlayerCount;
    return `${count} player${count === 1 ? '' : 's'}`;
  }

  get currentUserTeamLabel(): string {
    const currentUserTeam = this.teams?.find((team) => team.id === this.currentUserTeamId);
    return currentUserTeam ? this.formatTeamPlayers(currentUserTeam) : '';
  }

  get opponentTeamLabel(): string {
    if (!this.currentUserTeamId) {
      return '';
    }

    const opponentTeams = (this.teams ?? []).filter((team) => team.id !== this.currentUserTeamId);
    return opponentTeams.map((team) => this.formatTeamPlayers(team)).join(' / ');
  }

  get isWaitingForOtherConfirmations(): boolean {
    return !!this.currentUserTeamId
      && !this.pointsConfirmed
      && (this.teams ?? []).length > 0
      && this.teams.every((team) => this.hasCurrentUserTeamConfirmed(team));
  }

  get scoreTaskStatusIcon(): string {
    if (this.allTablesConfirmed) {
      return 'verified';
    }

    if (this.pointsConfirmed) {
      return 'check_circle';
    }

    if (this.isWaitingForOtherConfirmations) {
      return 'hourglass_top';
    }

    if (this.currentUserTeamId) {
      return 'edit_note';
    }

    return this.isCurrentUserAdmin ? 'fact_check' : 'hourglass_empty';
  }

  get scoreTaskStatusMessage(): string {
    if (this.allTablesConfirmed) {
      return 'Round scores are finalized.';
    }

    if (this.pointsConfirmed) {
      return 'Table scores are confirmed. Waiting for remaining tables.';
    }

    if (this.isWaitingForOtherConfirmations) {
      return 'Waiting for other team/admin.';
    }

    if (this.currentUserTeamId) {
      return 'Enter score, then submit score when both teams agree.';
    }

    if (this.isCurrentUserAdmin) {
      return 'Review the table scores, then confirm table scores.';
    }

    return 'Waiting for players at this table to enter scores.';
  }

  private checkPointsConfirmed(): void {
    const allTeamsConfirmed = this.teams?.length > 0 && this.teams.every((team) => this.isTeamConfirmed(team));
    this.pointsConfirmed = allTeamsConfirmed;

    if (this.table.pointsConfirmed !== allTeamsConfirmed) {
      this.table.pointsConfirmed = allTeamsConfirmed;
      this.subscriptions.push(
        this.tableService.updateTable(this.table, this.roundId, this.gameId).subscribe({
          next: () => undefined
        })
      );
    }
  }

  private setAdminTeamPointsConfirmed(team: Team, confirm: boolean, adminPlayerId: string): void {
    if (!confirm) {
      team.pointConfirmations = [];
      return;
    }

    team.pointConfirmations = (this.teams ?? []).map((tableTeam) => ({
        teamId: tableTeam.id,
        playerId: adminPlayerId
      }));
  }

  private setTeamPointsConfirmed(team: Team, confirmingTeam: Team | undefined, playerId: string, confirm: boolean): void {
    if (!confirmingTeam) { return; }

    const existingConfirmations = (team.pointConfirmations ?? [])
      .filter((confirmation) => confirmation.teamId !== confirmingTeam.id);

    team.pointConfirmations = confirm
      ? [
          ...existingConfirmations,
          {
            teamId: confirmingTeam.id,
            playerId
          }
        ]
      : existingConfirmations;
  }

  private clearTeamConfirmations(team: Team): void {
    team.pointConfirmations = [];
  }

  private getCurrentUsersTeam(playerId: string): Team | undefined {
    return this.teams?.find((team) =>
      (team.teamPlayers ?? []).some((teamPlayer) => teamPlayer.player.uid === playerId)
    );
  }

  private formatTeamPlayers(team: Team): string {
    const playerNames = (team.teamPlayers ?? [])
      .map((teamPlayer) => teamPlayer.player?.displayName)
      .filter(Boolean);

    return playerNames.length > 0 ? playerNames.join(' & ') : 'Team';
  }

  private updateTeams() {
    return combineLatest(
      this.teams.map((team) => this.teamService.updateTeam(team, this.table.id, this.roundId, this.gameId))
    ).pipe(take(1));
  }

  private finalizeRoundIfReady(): void {
    if (this.isFinalizingRound) {
      return;
    }

    this.isFinalizingRound = true;
    this.isEndingRound = true;
    this.subscriptions.push(
      this.roundMediatorService.finalizeRoundIfReady(this.roundId, this.gameId).subscribe({
        next: (finalized) => {
          if (finalized) {
            this.navigateToScores();
          }
        },
        error: (error) => {
          this.messageService.add(`TableDetailComponent: ${error.message || 'Unable to finalize the round'}`);
          this.isFinalizingRound = false;
          this.isEndingRound = false;
        },
        complete: () => {
          this.isFinalizingRound = false;
          this.isEndingRound = false;
        }
      })
    );
  }

  private handleAllTablesConfirmedChange(confirmed: boolean): void {
    const shouldFinalize = confirmed && this.previousAllTablesConfirmed !== true;
    this.previousAllTablesConfirmed = confirmed;

    if (shouldFinalize) {
      this.finalizeRoundIfReady();
    }
  }

  private watchRoundFinalized(): void {
    this.subscriptions.push(
      this.roundService.getRound(this.roundId, this.gameId).subscribe({
        next: (round) => {
          const wasPointsConfirmed = this.previousPointsConfirmed;
          this.round = round;

          if (!this.isEndingRound && wasPointsConfirmed === false && round?.pointsConfirmed) {
            this.navigateToScores();
          }

          this.previousPointsConfirmed = !!round?.pointsConfirmed;
        }
      })
    );
  }

  private navigateToScores(): void {
    if (this.hasRedirectedToDashboard || !this.gameId || !this.round) {
      return;
    }

    this.hasRedirectedToDashboard = true;
    this.router.navigateByUrl(`/game/${this.gameId}/dashboard?selectedTab=0&roundEnded=${this.round.number}`);
  }
}
