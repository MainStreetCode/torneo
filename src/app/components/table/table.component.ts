import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GameService } from 'src/app/services/game/game.service';
import { Round } from 'src/app/services/round/round';
import { RoundService } from 'src/app/services/round/round.service';
import { TableService } from 'src/app/services/table/table.service';
import { TeamService } from 'src/app/services/team/team.service';
import { TeamPlayer } from '../team-player/team-player';
import { Team } from '../team/team';
import { Table } from './table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() table: Table;
  teams: Team[];
  teamScore: number;
  isEditable = true;
  gameId: string;
  roundId: string;
  pointsConfirmed = false;
  round: Round;
  currentTeamPlayer?: TeamPlayer;

  constructor(
    private authService: AuthService,
    private gameService: GameService,
    private route: ActivatedRoute,
    private roundService: RoundService,
    private tableService: TableService,
    private teamService: TeamService) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.roundId = this.route.snapshot.paramMap.get('roundId');

    this.getTeams();
  }

  getTeams(): void {
    this.teamService.getTeamsForTable(this.table.id, this.roundId, this.gameId).subscribe({
      next: (teams) => {
        if (teams) {
          this.teams = teams;
          teams.forEach((team) => {
            const currentUser = this.authService.getCurrentUser();
            this.currentTeamPlayer = team.teamPlayers.find((teamPlayer) => teamPlayer.player.uid === currentUser.uid);
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
            this.teamService.updateTeam(team, this.table.id, this.roundId, this.gameId);
          });

          this.pointsConfirmed = !this.pointsConfirmed;
        } else if (this.currentTeamPlayer) {
          // else if user is a team player, then only set their points confirmed value
          this.currentTeamPlayer.isPointsConfirmed = !this.currentTeamPlayer.isPointsConfirmed;
          this.pointsConfirmed = this.currentTeamPlayer.isPointsConfirmed;

          // find the team to update
          this.teams.forEach((team) => {
            // if current user is on this team, then update it
            if (team.teamPlayers.find((teamPlayer) => teamPlayer.player.uid === currentUser.uid)) {
              this.teamService.updateTeam(team, this.table.id, this.roundId, this.gameId);
            }
          });
        }

        this.isEditable = !this.pointsConfirmed;
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
  }
}
