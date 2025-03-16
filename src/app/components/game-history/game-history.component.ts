import { Component, OnInit } from '@angular/core';
import { GameHistory } from 'src/app/model/game-entity';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';
import { GameService } from 'src/app/service/game/game.service';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.scss']
})
export class GameHistoryComponent implements OnInit {
  gameHistory: GameHistory[] = [];
  displayedColumns: string[] = ['opponent', 'result', 'gameType', 'date'];

  constructor(
    private gameService: GameService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.loadGameHistory(user.playerID);
      }
    });
  }

  loadGameHistory(playerID: string) {
    this.gameService.getGameHistory(playerID).subscribe(
      history => this.gameHistory = history
    );
  }
}