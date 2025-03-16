import { Injectable } from '@angular/core';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GameEntityDTO } from 'src/app/model/game-entity-dto';

export interface TimerState {
  isGeneratingTips: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient: Client;
  private gameUpdates$: Subject<GameEntityDTO>;
  private tipUpdates$: Subject<GameEntityDTO>;
  private timerState$: BehaviorSubject<TimerState>;

  constructor() {
    this.stompClient = Stomp.over(() => new SockJS('http://localhost:8080/gameplay'));
    this.gameUpdates$ = new Subject<any>();
    this.tipUpdates$ = new Subject<any>();
    this.timerState$ = new BehaviorSubject<TimerState>({
      isGeneratingTips: false
    });
  }

  connect(gameId: string) {
    this.stompClient.onConnect = () => {
      this.stompClient.subscribe(`/topic/game-progress/${gameId}`, (message: IMessage) => {
        const gameState = JSON.parse(message.body) as GameEntityDTO;
        
        if (!gameState.pvpGame) {
          this.timerState$.next({
            isGeneratingTips: true
          });
        }
        
        this.gameUpdates$.next(gameState);
      });
      
      this.stompClient.subscribe(`/topic/game-tips/${gameId}`, (message: IMessage) => {
        const gameState = JSON.parse(message.body) as GameEntityDTO;
        
        if (!gameState.pvpGame) {
          this.timerState$.next({
            isGeneratingTips: false
          });
        }
        
        this.tipUpdates$.next(gameState);
      });
    };

    this.stompClient.activate();
  }

  getTimerState(): Observable<TimerState> {
    return this.timerState$.asObservable();
  }

  getTipUpdates(): Observable<GameEntityDTO> {
    return this.tipUpdates$.asObservable();
  }

  getGameUpdates(): Observable<GameEntityDTO> {
    return this.gameUpdates$.asObservable();
  }

  disconnect() {
    this.stompClient.deactivate();
  }

  reconnect(gameId: string) {
    this.disconnect();
    
    setTimeout(() => {
      this.connect(gameId);
    }, 300);
  }
}