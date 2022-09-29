import { Component, Inject, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import firebase from "firebase/compat/app";
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData, LoginDialogComponent } from './components/user/login/login-dialog/login-dialog-component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Torneo';
  isLoggedIn$: Observable<boolean>;

  constructor(private router: Router,
              private authService: AuthService,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  login(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '360px',
      // data: { null }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout(): void {
    firebase.auth().signOut();
    this.goHome();
  }

  goHome(): void {
    this.router.navigateByUrl('');
  }

  userProfile(): void {
    this.router.navigateByUrl('userProfile');
  }
}
