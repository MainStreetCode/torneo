import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from "firebase/auth";
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  displayName: string;
  email: string;
  currentUser: User;
  photoURL: string;
  initials = '?';
  editableDisplayName = '';
  isSaving = false;
  subscription?: Subscription;

  constructor(
    private authService: AuthService,
    private location: Location,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    if (this.currentUser) {
      this.displayName = this.currentUser.displayName;
      this.email = this.currentUser.email;
      this.photoURL = this.currentUser.photoURL;
      this.editableDisplayName = this.displayName || '';
      this.initials = this.getInitials(this.displayName || this.email);
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  save(): void {
    const displayName = this.editableDisplayName.trim();

    if (this.isSaveDisabled()) {
      return;
    }

    this.isSaving = true;
    this.subscription?.unsubscribe();
    this.subscription = this.authService.updateDisplayName(displayName).subscribe({
      next: () => {
        this.displayName = displayName;
        this.editableDisplayName = displayName;
        this.initials = this.getInitials(this.displayName || this.email);
        this.isSaving = false;
        this.snackBar.open('Display name updated.', 'Dismiss', {
          duration: 4000
        });
      },
      error: () => {
        this.isSaving = false;
        this.snackBar.open('Unable to update display name.', 'Dismiss', {
          duration: 5000
        });
      }
    });
  }

  cancelEdit(): void {
    this.editableDisplayName = this.displayName || '';
  }

  isSaveDisabled(): boolean {
    const displayName = this.editableDisplayName.trim();
    return this.isSaving || !displayName || displayName === (this.displayName || '');
  }

  back(): void {
    this.location.back();
  }

  private getInitials(value: string): string {
    if (!value) {
      return '?';
    }

    const words = value.trim().split(/\s+/);
    const firstInitial = words[0]?.charAt(0) ?? '';
    const secondInitial = words.length > 1 ? words[1]?.charAt(0) ?? '' : '';
    return `${firstInitial}${secondInitial}`.toUpperCase();
  }
}
