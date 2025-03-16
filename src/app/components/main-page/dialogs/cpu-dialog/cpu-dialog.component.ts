import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cpu-dialog',
  templateUrl: './cpu-dialog.component.html',
  styleUrls: ['./cpu-dialog.component.scss']
})
export class CpuDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CpuDialogComponent>
  ) {}

  selectDifficulty(difficulty: number) {
    this.dialogRef.close(difficulty);
  }

}
