import { GamePlayer } from 'src/app/components/player/gamePlayer';
import { User } from 'src/app/components/player/user';

export interface Game {
    id: string;
    name: string;
    gamePlayers: GamePlayer[];
    admins: User[];
    rounds: number;
}
