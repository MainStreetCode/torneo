import { GamePlayer } from 'src/app/components/player/game-player';
import { Round } from '../round/round';

export interface Game {
    id: string;
    name: string;
    adminIds: string[];
    numberOfRounds: number;
}
