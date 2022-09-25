import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player/player.service';
import { Player } from '../player/player';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  players: Player[] = [];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {

  }
}