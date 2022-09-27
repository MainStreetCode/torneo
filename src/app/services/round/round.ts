import { GamePlayer } from 'src/app/components/player/game-player';
import { Table } from './table';

export interface Round {
    id: string;
    number: number;
    tables: Table[];
    byes: GamePlayer[];
}
