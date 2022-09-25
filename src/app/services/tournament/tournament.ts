import { Player } from 'src/app/components/player/player';

export interface Tournament {
    id: string;
    name: string;
    players: Player[];
    rounds: number;
    buyIn: number;
}
