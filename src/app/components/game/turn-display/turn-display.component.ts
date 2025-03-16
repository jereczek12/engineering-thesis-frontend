import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GameEntity } from 'src/app/model/game-entity';
import { PieceTypes } from 'src/app/model/PieceTypes';

@Component({
  selector: 'app-turn-display',
  templateUrl: './turn-display.component.html',
  styleUrls: ['./turn-display.component.scss']
})
export class TurnDisplayComponent implements OnChanges {
  @Input() gameState!: GameEntity;
  @Input() currentPlayer: any;

  PieceTypes = PieceTypes;

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['gameState'] && changes['gameState'].currentValue) ||
      (changes['currentPlayer'] && changes['currentPlayer'].currentValue)) {
      console.log('Game state:', this.gameState);
      console.log('Current player:', this.currentPlayer);
      console.log('BoardState entity:', this.gameState?.boardStateEntity);

      if (this.gameState?.boardStateEntity) {
        console.log('Current turn from board:', this.gameState.boardStateEntity.currentPlayer);
      }

      console.log('Player1:', this.gameState?.player1);
      console.log('Player2:', this.gameState?.player2);
      console.log('isPlayer1():', this.isPlayer1());
      console.log('isPlayerTurn():', this.isPlayerTurn());
      console.log('getCurrentTurnColor():', this.getCurrentTurnColor());
      console.log('---------------------------------');
    }
  }

  isPlayer1(): boolean {
    if (!this.currentPlayer || !this.gameState?.player1) {
      return false;
    }
    return this.currentPlayer.playerID === this.gameState.player1.uuid;
  }

  isTurnColor(color: 'WHITE' | 'BLACK'): boolean {
    if (!this.gameState?.boardStateEntity?.currentPlayer) {
      return false;
    }

    const currentTurn = this.gameState.boardStateEntity.currentPlayer;

    if (typeof currentTurn === 'string') {
      return currentTurn === color;
    }

    if (color === 'WHITE') {
      return currentTurn === PieceTypes.WHITE;
    } else {
      return currentTurn === PieceTypes.BLACK;
    }
  }

  isPlayerTurn(): boolean {
    if (!this.gameState?.boardStateEntity) {
      return false;
    }
    return (this.isPlayer1() && this.isTurnColor('WHITE')) ||
      (!this.isPlayer1() && this.isTurnColor('BLACK'));
  }

  getCurrentPlayerColor(): PieceTypes {
    return this.isPlayer1() ? PieceTypes.WHITE : PieceTypes.BLACK;
  }

  getOpponentColor(): PieceTypes {
    return this.isPlayer1() ? PieceTypes.BLACK : PieceTypes.WHITE;
  }

  getColorName(pieceType: PieceTypes): string {
    return pieceType === PieceTypes.WHITE ? 'WHITE' : 'BLACK';
  }

  getCurrentPlayerName(): string {
    return this.currentPlayer?.username || 'You';
  }

  getOpponentName(): string {
    if (!this.gameState.pvp) {
      return 'Computer';
    }

    if (this.isPlayer1()) {
      return this.gameState.player2?.uuid ?
        (this.gameState.player2.username || 'Opponent') :
        'Waiting for opponent...';
    } else {
      return this.gameState.player1?.username || 'Opponent';
    }
  }

  getCurrentTurnColor(): string {
    if (!this.gameState?.boardStateEntity?.currentPlayer) {
      return 'Unknown';
    }

    const currentTurn = this.gameState.boardStateEntity.currentPlayer;

    if (typeof currentTurn === 'string') {
      return currentTurn;
    }

    if (currentTurn === PieceTypes.WHITE) {
      return 'WHITE';
    } else if (currentTurn === PieceTypes.BLACK) {
      return 'BLACK';
    }

    return 'Unknown';
  }
}