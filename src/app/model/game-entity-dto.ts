import { PieceTypes } from "./PieceTypes";

export interface GameDataDTO {
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

export interface GameEntityDTO {
    gameID: string;
    gameStatus: string;
    player1: PlayerHumanDTO;
    player2: PlayerHumanDTO;
    boardStateEntity: BoardEntityDTO;
    winner: PieceTypes;
    gameData: GameDataDTO;
    pvpGame: boolean;
    difficulty?: number;

  }
  
  export interface PlayerHumanDTO {
    playerID: string,
    username: string
  }
  
  export interface BoardEntityDTO {
    board: string;
    moveList: string;
    whitePieces: string;
    blackPieces: string;
    whiteKings: string;
    blackKings: string;
    currentPlayer: PieceTypes;
  }
  
