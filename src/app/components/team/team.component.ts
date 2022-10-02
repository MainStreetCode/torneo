import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { Team } from './team';
import { getAuth } from "firebase/auth";
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { RoundService } from 'src/app/services/round/round.service';
import { Round } from 'src/app/services/round/round';
import { TeamService } from 'src/app/services/team/team.service';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})

export class TeamComponent implements OnInit {
  @Input() team: Team;
  gameId: string;
  roundId: string;
  tableId: string;
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
    this.teamService.getTeam(this.team.id, this.tableId, this.roundId, this.gameId).subscribe({
      next: (currentTeam) => {
        if (currentTeam) {
          this.teamPoints = currentTeam.points;
        }
      }
    });
  }

  pointsChanged(): void {
    this.team.points = Number(this.teamPoints);
    this.teamService.updateTeam(this.team, this.tableId, this.roundId, this.gameId);
  }

  private canEditPoints(): void {
    const currentUser = this.auth.currentUser;

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
