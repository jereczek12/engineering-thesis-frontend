// app/components/game/share-game/share-game.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-share-game',
  templateUrl: './share-game.component.html',
  styleUrls: ['./share-game.component.scss']
})
export class ShareGameComponent implements OnInit {
  @Input() gameId!: string;
  @Input() isPvpGame: boolean = false;
  
  constructor(private snackBar: MatSnackBar) {}
  
  ngOnInit() {}
  
  copyGameId() {
    const el = document.createElement('textarea');
    el.value = this.gameId;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    
    this.snackBar.open('Game ID copied to clipboard', 'Close', {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}