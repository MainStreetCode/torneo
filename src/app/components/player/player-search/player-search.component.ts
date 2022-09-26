import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { GamePlayerService } from 'src/app/services/gamePlayer/game-player.service';
import { Player } from '../player';


@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: [ './player-search.component.css' ]
})
export class PlayerSearchComponent implements OnInit {
  players$!: Observable<Player[]>;
  private searchTerms = new Subject<string>();

  constructor(private playerService: GamePlayerService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.players$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.playerService.searchPlayers(term)),
    );
  }
}
