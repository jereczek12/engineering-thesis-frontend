import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent {
  @Input() state!: number;
  @Input() number!: number | null;
  @Input() isDark!: boolean;
  @Input() isSelected: boolean = false;
  @Input() highlightColor: string | null = null;
  @Input() isIntermediate: boolean = false;


  @Output() squareClick = new EventEmitter<number | null>();
  @Output() pieceClick = new EventEmitter<number | null>();

  onSquareClick() {
    this.squareClick.emit(this.number);
  }
  onPieceClick(number: number | null) {
    this.pieceClick.emit(number);
  }
}

