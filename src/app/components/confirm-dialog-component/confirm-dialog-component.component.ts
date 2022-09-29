import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../user/login/login-dialog/login-dialog-component';
import { ConfirmDialogData } from './confirm-dialog-data';

@Component({
  selector: 'app-confirm-dialog-component',
  templateUrl: './confirm-dialog-component.component.html',
  styleUrls: ['./confirm-dialog-component.component.css']
})
export class ConfirmDialogComponentComponent implements OnInit {
  title = 'Confirm Dialog';
  message = '';
  confirmButtonText = 'Ok';
  cancelButtonText = 'Cancel';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
  ) {}

  ngOnInit(): void {
    if (this.data.title) {
      this.title = this.data.title;
    }
    if (this.data.message) {
      this.message = this.data.message;
    }
    if (this.data.confirmButtonText) {
      this.confirmButtonText = this.data.confirmButtonText;
    }
    if (this.data.cancelButtonText) {
      this.cancelButtonText = this.data.cancelButtonText;
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

}
