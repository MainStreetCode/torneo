import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tournament } from 'src/app/services/tournament/tournament';
import { TournamentService } from 'src/app/services/tournament/tournament.service';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit {
  @Input() tournament?: Tournament;

  constructor(private route: ActivatedRoute, private tournamentService: TournamentService, private location: Location) { }

  ngOnInit(): void {
    this.getTournament();
  }

  getTournament(): void {
    const id = this.route.snapshot.paramMap.get('tournamentId');
    this.tournamentService.getTournament(id).subscribe({
      next: (tournament) => this.tournament = tournament
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.tournament) {
      this.tournamentService.updateTournament(this.tournament);
    }
  }
}
