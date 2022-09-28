import { Component, OnInit } from '@angular/core';
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";

@Component({
  selector: 'app-user',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  auth = getAuth();
  displayName: string;
  email: string;

  constructor() { }

  ngOnInit(): void {
    const currentUser = this.auth.currentUser;
    this.displayName = currentUser.displayName;
    this.email = currentUser.email;
  }

}
