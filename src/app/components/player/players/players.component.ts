import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayerService } from 'src/app/services/player/player.service';
import { Router } from '@angular/router';
import { Tournament } from 'src/app/services/tournament/tournament';
import { TournamentService } from 'src/app/services/tournament/tournament.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];
  @Input() tournament?: Tournament;

  constructor(private playerService: PlayerService, private router: Router, private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService.playersForTournament(this.tournament.id).subscribe({
      next: (players) => {
        this.players = players;
      }
    });
  }

  add(name: string): void {
    name = name.trim();

    if (!name) { return; }

    this.addPlayerToTournament({ name } as Player);
  }

  delete(player: Player): void {
    this.playerService.deletePlayer(player.id, this.tournament);
  }

  showPlayerDetail(player: Player): void {
    this.router.navigateByUrl(`/tournament/${this.tournament.id}/player/${player.id}`);
  }

  addPlayerToTournament(player: Player): void {
    if (this.tournament) {

      if (!this.tournament.players) {
        this.tournament.players = [];
      }

      this.playerService.addPlayer(player, this.tournament.id);
    }
  }
}
