import { Component } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './components/player/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Torneo';
  users: User[] = [];

  constructor(private store: AngularFirestore, private router: Router) {
    // todo = this.store.collection('todo').valueChanges({ idField: 'id' }) as Observable<Task[]>;
    // inProgress = this.store.collection('inProgress').valueChanges({ idField: 'id' }) as Observable<Task[]>;
    // done = this.store.collection('done').valueChanges({ idField: 'id' }) as Observable<Task[]>;

    this.initializeStore();
  }

  private initializeStore(): void {
    // const userStore = this.store.collection('users').valueChanges({ id: 'id' }) as Observable<User[]>;
    // userStore.subscribe({
    //   next: (users) => {
    //     this.users = users;
    //   }
    // });

    // const app = initializeApp(environment.firebase);
    // const db = getFirestore(app);
    // const messageRef = doc(db, 'torunaments', tournamentId, players, playerId);

    
  }

  goHome(): void {
    this.router.navigateByUrl('');
  }

  // // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
}
