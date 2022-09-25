import { Player } from 'src/app/components/player/player';
import { User } from 'src/app/components/player/user';

export interface Tournament {
    id: string;
    name: string;
    players: Player[];
    admins: User[]
    rounds: number;
    buyIn: number;
}
