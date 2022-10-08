import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { Team } from './team';
import { getAuth } from "firebase/auth";
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { TeamService } from 'src/app/services/team/team.service';
import { Table } from '../table/table';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})

export class TeamComponent implements OnInit {
  @Input() team: Team;
  @Input() table: Table;
  gameId: string;
  roundId: string;
  teamPoints: number;
  auth = getAuth();
  pointsConfirmed = false;
  isEditable = true;

  constructor(private gameService: GameService, private route: ActivatedRoute, private teamService: TeamService) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.roundId = this.route.snapshot.paramMap.get('roundId');
    this.canEditPoints();

    // TODO: push to subscription
    this.teamService.getTeam(this.team.id, this.table.id, this.roundId, this.gameId).subscribe({
      next: (currentTeam) => {
        if (currentTeam) {
          this.teamPoints = currentTeam.points;

          currentTeam.teamPlayers.forEach((teamPlayer) => {
            if (teamPlayer.isPointsConfirmed) {
              this.pointsConfirmed = true;
            }
          });

          this.canEditPoints();
        }
      }
    });
  }

  pointsChanged(): void {
    this.team.points = Number(this.teamPoints);
    this.teamService.updateTeam(this.team, this.table.id, this.roundId, this.gameId);
  }

  private canEditPoints(): void {
    const currentUser = this.auth.currentUser;

    if (!currentUser) {
      this.isEditable = false;
      return;
    }

    this.gameService.isUserAdmin(currentUser.uid, this.gameId).pipe(take(1)).subscribe({
      next: (isAdmin) => {
        const isTeamPlayer = this.team.teamPlayers.find((teamPlayer) => teamPlayer.player.uid === currentUser.uid);

        if ((isAdmin || isTeamPlayer) && !this.pointsConfirmed) {
          this.isEditable = true;
        } else {
          this.isEditable = false;
        }
      }
    });
  }
}
