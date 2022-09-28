import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import firebase from "firebase/compat/app";
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Torneo';
  isLoggedIn$: Observable<boolean>;

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  login(): void {
    this.router.navigateByUrl('login');
  }

  logout(): void {
    firebase.auth().signOut();
  }

  goHome(): void {
    this.router.navigateByUrl('');
  }

  userProfile(): void {
    this.router.navigateByUrl('userProfile');
  }
}
