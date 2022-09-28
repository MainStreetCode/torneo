import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { Team } from './team';
import { getAuth } from "firebase/auth";
import { ActivatedRoute, Route } from '@angular/router';
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

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.teamPoints = this.team.teamPlayers[0].points;

    this.canEditPoints();
  }

  confirmPoints(): void {

  }

  private canEditPoints(): void {
    const auth = getAuth();
    const user = auth.currentUser;

    this.gameService.getAdmins(this.gameId).subscribe({
      next: (adminIds) => {
        const isAdmin = adminIds.find((adminId) => adminId === user.uid);
        const isTeamPlayer = this.team.teamPlayers.find((teamPlayer) => teamPlayer.player.id === user.uid);

        if (isAdmin || isTeamPlayer) {
          this.isEditable = true;
        } else {
          this.isEditable = false;
        }
      }
    });
  }
}
