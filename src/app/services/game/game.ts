import { GamePlayer } from 'src/app/components/player/game-player';

export interface Game {
    id: string;
    name: string;
    adminIds: string[];
    numberOfRounds: number;

    // array of player ids used to select bye players from
    byePool: GamePlayer[];
}
