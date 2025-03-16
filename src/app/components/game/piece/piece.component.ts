import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PieceTypes } from 'src/app/model/PieceTypes';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent {
  PieceTypes = PieceTypes;
  @Input() state!: PieceTypes;
  @Input() squareNumber: number | null = null;
  @Input() isSelected: boolean = false;
  @Output() pieceClick = new EventEmitter<number | null>();


  onPieceClick(event: Event) {
    event.stopPropagation();
    this.pieceClick.emit(this.squareNumber);
  }
}
