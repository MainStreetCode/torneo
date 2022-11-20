import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { Team } from './team';
import { getAuth } from "firebase/auth";
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { TeamService } from 'src/app/services/team/team.service';
import { Table } from '../table/table';
import { FormControl } from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';
import { RoundMediatorService } from 'src/app/services/round-mediator/round-mediator.service';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})

export class TeamComponent implements OnInit, OnDestroy {
  @Input() team: Team;
  @Input() table: Table;

  teamPointsFormControl = new FormControl({ value: 0, disabled: false});
  gameId: string;
  roundId: string;
  auth = getAuth();
  pointsConfirmed = false;
  isEditable = true;
  subscriptions: Subscription[] = [];

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private roundMediatorService: RoundMediatorService) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.roundId = this.route.snapshot.paramMap.get('roundId');
    this.canEditPoints();

    this.subscriptions.push(
      this.teamPointsFormControl.valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(1000),
      ).subscribe({
        next: (points) => {
          this.pointsChanged(points);
        }
      }),
      this.teamService.getTeam(this.team.id, this.table.id, this.roundId, this.gameId).subscribe({
        next: (currentTeam) => {
          if (currentTeam) {
            this.teamPointsFormControl.setValue(currentTeam.points);

            currentTeam.teamPlayers.forEach((teamPlayer) => {
              if (teamPlayer.isPointsConfirmed) {
                this.pointsConfirmed = true;
              }
            });
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  pointsChanged(points: number): void {
    if (this.team.points === points) { return; }

    console.log('pointsChanged: ' + points);

    this.team.points = points;
    this.subscriptions.push(
      this.teamService.updateTeam(this.team, this.table.id, this.roundId, this.gameId).subscribe()
    );
  }

  private canEditPoints(): void {
    const currentUser = this.auth.currentUser;

    if (!currentUser) {
      this.isEditable = false;
      this.teamPointsFormControl.disable();
      return;
    }

    this.subscriptions.push(
      combineLatest([
        this.roundMediatorService.allTablesConfirmed(this.roundId, this.gameId),
        this.gameService.isUserAdmin(currentUser.uid, this.gameId)
      ])
      .pipe(take(1)).subscribe({
        next: ([allTablesConfirmed, isAdmin]) => {
          const isTeamPlayer = this.team.teamPlayers.find((teamPlayer) => teamPlayer.player.uid === currentUser.uid);

          if (allTablesConfirmed) {
            this.isEditable = false;
            this.teamPointsFormControl.disable();
          }
          else if ((isAdmin || isTeamPlayer) && !this.pointsConfirmed) {
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
}
