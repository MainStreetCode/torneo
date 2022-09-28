import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { Team } from './team';
import { getAuth } from "firebase/auth";
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})

export class TeamComponent implements OnInit {
  @Input() team: Team;
  gameId: string;
  teamPoints: number;
  isEditable = false;
  auth = getAuth();
  pointsConfirmed = false;

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.teamPoints = this.team.teamPlayers[0].points;

    this.canEditPoints();
  }

  toggleConfirmPoints(): void {
    const currentUser = this.auth.currentUser;

    this.gameService.isUserAdmin(currentUser.uid, this.gameId).pipe(take(1)).subscribe({
      next: (isAdmin) => {
        const currentTeamPlayer = this.team.teamPlayers.find((teamPlayer) => teamPlayer.player.id === currentUser.uid);

        // if current user is admin, then set all team players points confirmed
        if (isAdmin) {
          this.team.teamPlayers.forEach((teamPlayer) => {
            teamPlayer.isPointsConfirmed = !teamPlayer.isPointsConfirmed;
          });
          this.pointsConfirmed = !this.pointsConfirmed;
        } else if (currentTeamPlayer) {
          // else if user is a team player, then only set their points confirmed value
          currentTeamPlayer.isPointsConfirmed = !currentTeamPlayer.isPointsConfirmed;
          this.pointsConfirmed = currentTeamPlayer.isPointsConfirmed;
        }
      }
    });
  }

  private canEditPoints(): void {
    const currentUser = this.auth.currentUser;

    this.gameService.isUserAdmin(currentUser.uid, this.gameId).pipe(take(1)).subscribe({
      next: (isAdmin) => {
        const isTeamPlayer = this.team.teamPlayers.find((teamPlayer) => teamPlayer.player.id === currentUser.uid);

        if (isAdmin || isTeamPlayer) {
          this.isEditable = true;
        } else {
          this.isEditable = false;
        }
      }
    });
  }
}
