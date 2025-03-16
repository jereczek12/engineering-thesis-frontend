// app/components/main-page/dialogs/connect-dialog/connect-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export interface ConnectResult {
  mode: 'specific' | 'random';
  gameID?: string;
}

@Component({
  selector: 'app-connect-dialog',
  templateUrl: './connect-dialog.component.html',
  styleUrls: ['./connect-dialog.component.scss']
})
export class ConnectDialogComponent {
  gameID: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConnectDialogComponent>
  ) {}

  connect() {
    if (this.gameID) {
      this.dialogRef.close({ mode: 'specific', gameID: this.gameID });
    }
  }

  connectRandom() {
    this.dialogRef.close({ mode: 'random' });
  }
}