import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from "firebase/auth";
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  displayName: string;
  email: string;
  currentUser: User;
  subscription?: Subscription;

  constructor(private authService: AuthService, private location: Location) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    if (this.currentUser) {
      this.displayName = this.currentUser.displayName;
      this.email = this.currentUser.email;
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  save(): void {
    // this.gamePlayerService.updatePlayer()
  }

  back(): void {
    this.location.back();
  }

}
