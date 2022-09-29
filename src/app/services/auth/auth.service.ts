import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase-admin/app';
import { getAuth, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$: Observable<firebase.User>;

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public readonly isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private ui: firebaseui.auth.AuthUI;

  constructor(private afAuth: AngularFireAuth) {
    firebase.initializeApp(environment.firebase);
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());

    firebase.auth().onAuthStateChanged((user) => {
      this.currentUser$ = of(user);
      if (user) {
        this.isLoggedInSubject.next(true);
      } else {
        this.isLoggedInSubject.next(false);
      }
    });
  }

  getCurrentUser(): User {
    return firebase.auth().currentUser;
  }

  showLogin(container: string): void {
    const uiConfig = {
      signInOptions: [
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          // signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
        }
      ],
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
      }
    };

    this.ui.start(container, uiConfig);
  }

  onLoginSuccessful(): void {

  }
}
