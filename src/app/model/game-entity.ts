import { PieceTypes } from "./PieceTypes";

export interface GameData {
  evaluation: number,
  possibleMoves: any[][],
  tips: Tips
}

export interface Tips {
  bestMove: MoveModel[],
  enemyRisk: MoveModel[],
}

export interface MoveModel {
  startPos: number,
  endPos: number
}

export interface GameEntity {
    gameID: string;
    gameStatus: string;
    player1: PlayerHuman;
    player2: PlayerHuman;
    boardStateEntity: BoardEntity;
    winner: PieceTypes;
    gameData: GameData;
    pvp: boolean;
    difficulty?: number;
  }
  
  export interface PlayerHuman {
    uuid: string,
    username: string
  }
  
  export interface BoardEntity {
    board: number[][];
    moveList: string;
    whitePieces: string;
    blackPieces: string;
    whiteKings: string;
    blackKings: string;
    currentPlayer: PieceTypes;
  }

  export interface GameHistory {
    gameID: string;
    opponent: string;
    winner: PieceTypes;
    startTime: string;
    wasPvpGame: boolean;
  }