import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameEntityDTO } from '../../model/game-entity-dto';
import { GameHistory, MoveModel } from 'src/app/model/game-entity';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  getGameState(id: string): Observable<GameEntityDTO> {
    return this.http.get<GameEntityDTO>(this.baseUrl +'/game/'+ id, {withCredentials:true});
  }

  sendMove(gameplayData: { moves: MoveModel[], gameID: string, playerID: string }) {
  return this.http.post(`${this.baseUrl}/game/gameplay`, gameplayData, {withCredentials: true});
  }

  createGame(playerId: string, isPvp: boolean, difficulty: number): Observable<GameEntityDTO> {
    return this.http.post<GameEntityDTO>(`${this.baseUrl}/game/start`, {playerID: playerId, pvp:isPvp, difficulty: difficulty}, {withCredentials: true});
  }

  getGameHistory(playerID: string): Observable<GameHistory[]> {
    return this.http.get<GameHistory[]>(`${this.baseUrl}/history/${playerID}`, 
      {withCredentials: true});
  }

  connectToGame(playerId: string, gameId: string): Observable<GameEntityDTO> {
    return this.http.post<GameEntityDTO>(`${this.baseUrl}/game/connect`, 
      {
        player: {playerID: playerId},
        gameID: gameId
      }, 
      {withCredentials: true}
    );
  }
  
  connectToRandomGame(playerId: string): Observable<GameEntityDTO> {
    return this.http.post<GameEntityDTO>(`${this.baseUrl}/game/connect`, 
      {
        player: {playerID: playerId},
        gameID: null
      }, 
      {withCredentials: true}
    );
  }
}
