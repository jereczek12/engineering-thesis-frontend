import { BoardEntityDTO, GameEntityDTO, PlayerHumanDTO } from "./game-entity-dto";
import { BoardEntity, GameEntity, PlayerHuman } from "./game-entity";

export function mapToGameState(gameStateDTO: GameEntityDTO): GameEntity {
  return {
    gameID: gameStateDTO.gameID || '',
    gameStatus: gameStateDTO.gameStatus || '',
    player1: mapToPlayerHuman(gameStateDTO.player1 || { playerID: '', username: '' }),
    player2: mapToPlayerHuman(gameStateDTO.player2 || { playerID: '', username: '' }),
    boardStateEntity: mapToBoardEntity(gameStateDTO.boardStateEntity),
    winner: gameStateDTO.winner || 0,
    gameData: {
      evaluation: gameStateDTO.gameData?.evaluation || 0,
      possibleMoves: gameStateDTO.gameData?.possibleMoves || [],
      tips: gameStateDTO.gameData?.tips || { bestMove: [], enemyRisk: [] }
    },
    pvp: gameStateDTO.pvpGame || false,
    difficulty: gameStateDTO.difficulty
  };
}

  
  function mapToPlayerHuman(playerDTO: PlayerHumanDTO): PlayerHuman {
    return {
      uuid: playerDTO.playerID,
      username: playerDTO.username
    };
  }
  
  function mapToBoardEntity(boardDTO: BoardEntityDTO): BoardEntity {
    return {
      board: JSON.parse(boardDTO.board),
      moveList: boardDTO.moveList,
      whitePieces: boardDTO.whitePieces,
      blackPieces: boardDTO.blackPieces,
      whiteKings: boardDTO.whiteKings,
      blackKings: boardDTO.blackKings,
      currentPlayer: boardDTO.currentPlayer
    };
}
