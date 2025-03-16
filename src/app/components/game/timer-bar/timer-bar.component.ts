import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer-bar',
  templateUrl: './timer-bar.component.html',
  styleUrls: ['./timer-bar.component.scss']
})
export class TimerBarComponent implements OnInit, OnDestroy {
  @Input() isActive: boolean = false;
  @Input() isGeneratingTips: boolean = false;

  progress: number = 0;
  remainingTime: number = 30;
  displayTime: number = 30;
  private subscription?: Subscription;

  ngOnInit() {
    this.resetTimer();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isGeneratingTips']) {
      if (this.isGeneratingTips) {
        this.startTimer();
      } else {
        this.resetTimer();
      }
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private startTimer() {
    this.subscription?.unsubscribe();
    this.remainingTime = 30;
    this.displayTime = 30;
    this.progress = 0;
    
    this.subscription = interval(100).subscribe(() => {
      this.remainingTime = Math.max(0, this.remainingTime - 0.1);
      this.displayTime = Math.ceil(this.remainingTime);
      this.progress = ((30 - this.remainingTime) / 30) * 100;
    });
  }

  private resetTimer() {
    this.subscription?.unsubscribe();
    this.progress = 0;
    this.remainingTime = 30;
    this.displayTime = 30;
  }
}