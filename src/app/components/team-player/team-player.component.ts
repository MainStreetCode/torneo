import { Component, Input, OnInit } from '@angular/core';
import { TeamPlayer } from './team-player';

@Component({
  selector: 'app-team-player',
  templateUrl: './team-player.component.html',
  styleUrls: ['./team-player.component.css']
})
export class TeamPlayerComponent implements OnInit {
  @Input() teamPlayer: TeamPlayer;

  constructor() { }

  ngOnInit(): void {
  }

  confirmPoints(): void {

  }
}
