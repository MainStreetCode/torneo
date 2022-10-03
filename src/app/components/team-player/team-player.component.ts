import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TeamPlayer } from './team-player';

@Component({
  selector: 'app-team-player',
  templateUrl: './team-player.component.html',
  styleUrls: ['./team-player.component.css']
})
export class TeamPlayerComponent implements OnInit {
  @Input() teamPlayer: TeamPlayer;
  isCurrentUserTeamPlayer = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (this.teamPlayer.player.uid === currentUser.uid) {
      this.isCurrentUserTeamPlayer = true;
    } else {
      this.isCurrentUserTeamPlayer = false;
    }
  }
}
