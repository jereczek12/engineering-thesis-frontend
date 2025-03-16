import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-evaluation-bar',
  templateUrl: './evaluation-bar.component.html',
  styleUrls: ['./evaluation-bar.component.scss']
})
export class EvaluationBarComponent implements OnChanges {
  @Input() evaluation: number = 0;
  
  indicatorPosition: number = 50; // Start at middle (50%)

  ngOnChanges(changes: SimpleChanges) {
    if (changes['evaluation']) {
      this.updateIndicator();
    }
  }

  private updateIndicator() {
    const maxAdvantage = 1000;
    const percentage = (this.evaluation / maxAdvantage) * 50; // 50% movement in either direction
    this.indicatorPosition = 50 - percentage; // Subtract to move up for positive values
  }

  formatEvaluation(): string {
    const absValue = Math.abs(this.evaluation / 100);
    return `${this.evaluation > 0 ? '+' : '-'}${absValue.toFixed(1)}`;
  }
}