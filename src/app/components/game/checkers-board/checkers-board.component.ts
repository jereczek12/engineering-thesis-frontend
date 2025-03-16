import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/service/game/websocket/websocket.service';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/service/game/game.service';
import { GameEntity } from 'src/app/model/game-entity';
import { mapToGameState } from 'src/app/model/game-entity.mapper';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { MoveModel } from 'src/app/model/game-entity-dto';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PieceTypes } from 'src/app/model/PieceTypes';


@Component({
  selector: 'app-checkers-board',
  templateUrl: './checkers-board.component.html',
  styleUrls: ['./checkers-board.component.scss'],
  animations: [
    trigger('pieceMove', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' }))
      ])
    ])
  ]
})
export class CheckersBoardComponent implements OnInit, OnDestroy {
  gameState: GameEntity = {} as GameEntity;
  gameId!: string;
  currentPlayer: any;
  isGameEnded: boolean = false;
  winnerMessage: string = '';
  isGeneratingTips: boolean = false;
  private tipTransitionTimeout?: any;


  constructor(private websocketService: WebsocketService,
    private route: ActivatedRoute,
    private gameService: GameService,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar) { }

  ngOnDestroy() {
    this.websocketService.disconnect();
    if (this.tipTransitionTimeout) {
      clearTimeout(this.tipTransitionTimeout);
    }
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => {
      this.currentPlayer = user;
    });

    let gameID = this.route.snapshot.paramMap.get('gameID');
    if (gameID !== null) {
      this.gameId = gameID;
    }

    this.gameService.getGameState(this.gameId).subscribe(data => {
      this.gameState = mapToGameState(data);
      this.checkGameEnd();
    });

    this.websocketService.getTimerState().subscribe(state => {
      this.isGeneratingTips = state.isGeneratingTips;
      if (state.isGeneratingTips) {
        this.tipTransitionTimeout = setTimeout(() => {
          this.gameState = {
            ...this.gameState,
            gameData: {
              ...this.gameState.gameData,
              tips: {
                bestMove: [],
                enemyRisk: []
              }
            }
          };
        }, 150);
      }
    });
    this.connectToWebsocket();
  }

  submitMove(move: MoveModel[]) {
    if (this.isGameEnded) {
      return;
    }
    const moveData = {
      moves: move,
      gameID: this.gameId,
      playerID: this.currentPlayer.playerID
    };

    this.gameService.sendMove(moveData).subscribe({
      next: (response) => {
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 422) {
          const errorMessage = error.error?.payload?.message || 'Invalid move';
          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            panelClass: ['error-snackbar']
          });
        } else {
          console.error('Error submitting move', error);
          this.snackBar.open('An error occurred while submitting the move', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            panelClass: ['error-snackbar']
          });
        }
      }
    });
  }

  private connectToWebsocket() {
    this.websocketService.connect(this.gameId);
    this.websocketService.getGameUpdates().subscribe(data => {
      const newGameState = mapToGameState(data);

      if (newGameState.pvp) {
        this.gameState = newGameState;
      } else {
        this.gameState = {
          ...newGameState,
          gameData: {
            ...newGameState.gameData,
            tips: this.gameState.gameData.tips
          }
        };
      }
      this.checkGameEnd();
    });

    this.websocketService.getTipUpdates().subscribe(data => {
      if (!data.pvpGame) {
        const newGameState = mapToGameState(data);

        setTimeout(() => {
          this.gameState = {
            ...this.gameState,
            gameData: {
              ...this.gameState.gameData,
              tips: newGameState.gameData.tips
            }
          };
        }, 300);
      }
    });
  }

  private checkGameEnd() {
    if (this.gameState.winner) {
      this.isGameEnded = true;
      this.winnerMessage = this.gameState.winner.toString() === 'WHITE' ?
        'White player wins!' : 'Black player wins!';
    }
  }
}
