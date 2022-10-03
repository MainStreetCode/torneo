import { GamePlayer } from '../player/game-player';

export interface TeamPlayer {
    player: GamePlayer;
    points: number;
    isPointsConfirmed: boolean;
}
