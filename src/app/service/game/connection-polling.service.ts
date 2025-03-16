import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameEntityDTO } from 'src/app/model/game-entity-dto';

@Injectable({
  providedIn: 'root'
})
export class GamePollingService {
  private pollingInterval: any;
  private maxPollingAttempts = 60;
    private pollingAttempts = 0;
  private opponentJoinedSubject = new BehaviorSubject<GameEntityDTO | null>(null);

  constructor(private gameService: GameService) {}

  startPollingForOpponent(gameId: string, currentPlayerId: string): Observable<GameEntityDTO | null> {
    this.opponentJoinedSubject.next(null);
    this.pollingAttempts = 0;
    
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
    
    this.pollingInterval = setInterval(() => {
      this.pollingAttempts++;
      
      if (this.pollingAttempts > this.maxPollingAttempts) {
        clearInterval(this.pollingInterval);
        console.log("Stopped polling after maximum attempts");
        return;
      }
      
      this.gameService.getGameState(gameId).subscribe({
        next: (data) => {
          if (data.player2 && data.player2.playerID && data.player1?.playerID === currentPlayerId) {
            console.log("Opponent has connected!");
            clearInterval(this.pollingInterval);
            this.opponentJoinedSubject.next(data);
          }
        },
        error: (err) => console.error("Error polling for opponent:", err)
      });
    }, 1000); // Poll every 1 second
    
    return this.opponentJoinedSubject.asObservable();
  }

  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }
}