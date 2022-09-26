import { Player } from 'src/app/components/player/player';
import { User } from 'src/app/components/player/user';

export interface Game {
    id: string;
    name: string;
    gamePlayers: Player[];
    admins: User[]
    rounds: number;    
}
