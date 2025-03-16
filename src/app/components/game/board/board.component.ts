// board.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BoardEntity, Tips } from 'src/app/model/game-entity';
import { PieceComponent } from '../piece/piece.component';
import { MoveModel } from 'src/app/model/game-entity-dto';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() boardState!: BoardEntity;
  @Input() tips?: Tips;
  @Input() longestSequence: number | null = 1;

  @Output() moveMade = new EventEmitter<MoveModel[]>();

  currentMoveSequence: MoveModel[] = [];
  
  selectedSquareNumber: number | null = null;
  move?: MoveModel;

  getSquareNumber(x: number, y: number): number | null {
    if ((x + y) % 2 !== 0) {
      return Math.floor((y * 10 + x) / 2 + 1);
    } else {
      return null;
    }
}

onSquareSelected(squareNumber: number | null) {
  if (squareNumber !== null) {
    if (this.selectedSquareNumber !== null) {
      const move: MoveModel = {
        startPos: this.selectedSquareNumber,
        endPos: squareNumber
      };
      this.currentMoveSequence.push(move);
    }

    if (this.currentMoveSequence.length === this.longestSequence) {
      this.moveMade.emit(this.currentMoveSequence);
      this.currentMoveSequence = [];
      this.selectedSquareNumber = null;
    } else {
      this.selectedSquareNumber = squareNumber;
    }
  }
}

  onPieceClick(squareNumber: number | null) {
    if (this.selectedSquareNumber === squareNumber) {
      this.selectedSquareNumber = null;
    } else {
      this.selectedSquareNumber = squareNumber;
    }
  }

  getHighlightColor(squareNumber: number | null): string | null {
    if (!this.tips || !squareNumber) {
      return null;
    }
    
    if (this.tips.bestMove && this.tips.bestMove.some(move => move.startPos === squareNumber || move.endPos === squareNumber)) {
      return 'green';
    }
    
    if (this.tips.enemyRisk && this.tips.enemyRisk.some(move => move.startPos === squareNumber || move.endPos === squareNumber)) {
      return 'red';
    }
    
    return null;
  }

  isIntermediateSquare(squareNumber: number | null): boolean {
    return this.currentMoveSequence.some(move => move.endPos === squareNumber);
  }

}
