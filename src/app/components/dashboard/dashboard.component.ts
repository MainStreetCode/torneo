import { Component, OnInit } from '@angular/core';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { GamePlayer } from '../player/gamePlayer';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  players: GamePlayer[] = [];

  constructor(private playerService: GamePlayerService) { }

  ngOnInit(): void {

  }
}
