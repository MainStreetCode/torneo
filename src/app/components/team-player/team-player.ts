import { GamePlayer } from '../player/game-player';

export interface TeamPlayer {
    id: string;
    player: GamePlayer;
    points: number;
    isPointsConfirmed: boolean;
}
