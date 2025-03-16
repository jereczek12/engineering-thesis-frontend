import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { GameService } from 'src/app/service/game/game.service';
import { CpuDialogComponent } from './dialogs/cpu-dialog/cpu-dialog.component';
import { ConnectDialogComponent, ConnectResult } from './dialogs/connect-dialog/connect-dialog.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  username?: string;
  userID!: string;
  gameId?: string;

  constructor(
    private authService: AuthenticationService,
    private gameService: GameService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.username = user.username;
      this.userID = user.playerID;
    });
  }

  openDifficultyDialog() {
    const dialogRef = this.dialog.open(CpuDialogComponent);
    dialogRef.afterClosed().subscribe(difficulty => {
      if (difficulty) {
        this.createCpuGame(difficulty);
      }
    });
  }

  createCpuGame(difficulty: number) {
    if (this.userID != null) {
      this.gameService.createGame(this.userID, false, difficulty).subscribe((data) => {
          this.snackBar.open('Created game successfuly', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.gameId = data.gameID;
          this.router.navigate([`./gameplay/${this.gameId}`]);
      });
    } else {
      this.snackBar.open('You need to log in first!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
  }

  createPvpGame() {
    if (this.userID != null) {
      this.gameService.createGame(this.userID, true, 0).subscribe((data) => {
        this.snackBar.open('Created PVP game successfully. Game ID: ' + data.gameID, 'Copy ID', {
          duration: 30000,
          verticalPosition: 'top',
        }).onAction().subscribe(() => {
          this.copyToClipboard(data.gameID);
        });
        this.gameId = data.gameID;
        this.router.navigate([`./gameplay/${this.gameId}`]);
      });
    } else {
      this.snackBar.open('You need to log in first!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
  }

  connectToPvpGame() {
    if (!this.userID) {
      this.snackBar.open('You need to log in first!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }
    
    const dialogRef = this.dialog.open(ConnectDialogComponent);
    dialogRef.afterClosed().subscribe((result: ConnectResult) => {
      if (!result) return;
      
      if (result.mode === 'specific' && result.gameID) {
        this.gameService.connectToGame(this.userID, result.gameID).subscribe(
          (data) => {
            this.snackBar.open('Connected to game successfully', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
            this.router.navigate([`./gameplay/${data.gameID}`]);
          },
          (error) => {
            this.snackBar.open('Failed to connect: ' + (error.error?.message || 'Unknown error'), 'Close', {
              duration: 5000,
              verticalPosition: 'top',
            });
          }
        );
      } else if (result.mode === 'random') {
        this.gameService.connectToRandomGame(this.userID).subscribe(
          (data) => {
            this.snackBar.open('Connected to random game successfully', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
            this.router.navigate([`./gameplay/${data.gameID}`]);
          },
          (error) => {
            this.snackBar.open('Failed to connect: ' + (error.error?.message || 'No games available'), 'Close', {
              duration: 5000,
              verticalPosition: 'top',
            });
          }
        );
      }
    });
  }

  private copyToClipboard(text: string) {
    const el = document.createElement('textarea');
    el.value = text;
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
