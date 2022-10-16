import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData, LoginDialogComponent } from './components/user/login/login-dialog/login-dialog-component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Torneo';
  isLoggedIn$: Observable<boolean>;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private authService: AuthService,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  login(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      panelClass: 'dialog-container'
      // data: { null }
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      })
    );
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
