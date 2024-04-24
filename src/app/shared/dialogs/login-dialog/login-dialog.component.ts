import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close(true);
  }
}
