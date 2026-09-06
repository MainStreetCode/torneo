import { GamePlayer } from 'src/app/components/player/game-player';

export interface Round {
    id: string;
    number: number;
    byes: GamePlayer[];
    pointsConfirmed: boolean;
}
