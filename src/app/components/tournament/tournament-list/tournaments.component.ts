import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tournament } from 'src/app/services/tournament/tournament';
import { TournamentService } from 'src/app/services/tournament/tournament.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  tournaments: Tournament[] = [];

  constructor(private tournamentService: TournamentService, private router: Router) { }

  ngOnInit(): void {
    this.getTournaments();
  }

  getTournaments(): void {
    this.tournamentService.tournaments$.subscribe({
      next: (tournaments) => {
        this.tournaments = tournaments;
      }
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.tournamentService.addTournament({ name } as Tournament);
  }

  delete(tournament: Tournament): void {
    this.tournamentService.deleteTournament(tournament.id);
  }

  update(tournament: Tournament): void {
    this.router.navigateByUrl(`/tournament/${tournament.id}`);
  }
}
