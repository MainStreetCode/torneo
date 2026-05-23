import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { Team } from './team';
import { Auth, getAuth } from "firebase/auth";
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { TeamService } from 'src/app/services/team/team.service';
import { Table } from '../table/table';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TeamPlayer } from '../team-player/team-player';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})

export class TeamComponent implements OnInit, OnChanges, OnDestroy {
  @Input() team: Team;
  @Input() table: Table;
  @Input() allTablesConfirmed = false;
  @Output() confirmPoints = new EventEmitter<{ team: Team, confirm: boolean }>();
  @Output() pointsChange = new EventEmitter<{ team: Team, points: number }>();

  teamPointsFormControl = new FormControl<number | string | null>({ value: 0, disabled: false});
  gameId: string;
  roundId: string;
  auth?: Auth;
  pointsConfirmed = false;
  isEditable = true;
  canConfirmPoints = false;
  isCurrentUserOnTeam = false;
  isEditingPoints = false;
  subscriptions: Subscription[] = [];
  teamPlayers: TeamPlayer[] = [];
  private lastEmittedPoints?: number;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private teamService: TeamService) {
      this.auth = this.getAuth();
    }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.roundId = this.route.snapshot.paramMap.get('roundId');

    this.subscriptions.push(
      this.teamPointsFormControl.valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(1000),
      ).subscribe({
        next: (points) => {
          const normalizedPoints = this.normalizePoints(points, false);
          if (normalizedPoints === null) { return; }

          this.pointsChanged(normalizedPoints);
        }
      }),
      this.teamService.getTeam(this.team.id, this.table.id, this.roundId, this.gameId).subscribe({
        next: (currentTeam) => {
          if (currentTeam) {
            const currentPoints = this.normalizePoints(this.teamPointsFormControl.value, false);
            const shouldUpdatePointsInput = !this.isEditingPoints || currentPoints === currentTeam.points;

            this.team = currentTeam;
            if (this.lastEmittedPoints === currentTeam.points) {
              this.lastEmittedPoints = undefined;
            }
            if (shouldUpdatePointsInput) {
              this.teamPointsFormControl.setValue(currentTeam.points, { emitEvent: false });
            }

            this.updateTeamState();
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.team || changes.allTablesConfirmed) && this.team) {
      this.updateTeamState();
    }
  }

  pointsChanged(points: number): void {
    if (this.team.points === points || this.lastEmittedPoints === points) { return; }

    console.log('pointsChanged: ' + points);

    this.lastEmittedPoints = points;
    this.pointsChange.emit({ team: this.team, points });
  }

  onPointsFocus(event: FocusEvent): void {
    this.isEditingPoints = true;
    (event.target as HTMLInputElement)?.select();
  }

  onPointsInput(): void {
    this.isEditingPoints = true;
  }

  onPointsBlur(): void {
    const normalizedPoints = this.normalizePoints(this.teamPointsFormControl.value, true);
    if (normalizedPoints === null) {
      this.isEditingPoints = false;
      return;
    }

    this.teamPointsFormControl.setValue(normalizedPoints, { emitEvent: false });
    this.pointsChanged(normalizedPoints);
    this.isEditingPoints = false;
  }

  toggleConfirmPoints(confirm: boolean): void {
    if (!this.canConfirmPoints) { return; }

    this.confirmPoints.emit({ team: this.team, confirm });
  }

  private canEditPoints(): void {
    const currentUser = this.auth?.currentUser;

    if (!currentUser) {
      this.isEditable = false;
      this.teamPointsFormControl.disable();
      return;
    }

    this.subscriptions.push(
      this.gameService.isUserAdmin(currentUser.uid, this.gameId)
      .pipe(take(1)).subscribe({
        next: (isAdmin) => {
          if (!this.allTablesConfirmed && (isAdmin || this.isCurrentUserOnTeam) && !this.pointsConfirmed) {
            this.isEditable = true;
            this.teamPointsFormControl.enable();
          } else {
            this.isEditable = false;
            this.teamPointsFormControl.disable();
          }
        }
      })
    );
  }

  private updateTeamState(): void {
    const currentUser = this.auth?.currentUser;
    this.teamPlayers = this.team.teamPlayers ?? [];
    this.pointsConfirmed = this.teamPlayers.some((teamPlayer) => !!teamPlayer.isPointsConfirmed);
    this.isCurrentUserOnTeam = !!currentUser && this.teamPlayers.some((teamPlayer) => teamPlayer.player.uid === currentUser.uid);
    this.canConfirmPoints = !!currentUser && this.isCurrentUserOnTeam && !this.allTablesConfirmed;

    if (!this.gameId || !this.roundId) {
      this.isEditable = false;
      this.teamPointsFormControl.disable();
      return;
    }

    this.canEditPoints();
  }

  private normalizePoints(points: unknown, useZeroForEmpty: boolean): number | null {
    if (points === null || points === undefined || points === '') {
      return useZeroForEmpty ? 0 : null;
    }

    const normalizedPoints = Number(points);
    return Number.isFinite(normalizedPoints) ? normalizedPoints : null;
  }

  private getAuth(): Auth | undefined {
    try {
      return getAuth();
    } catch {
      return undefined;
    }
  }
}
