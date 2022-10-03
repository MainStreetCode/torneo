import { User } from 'firebase/auth';
import { RoundPoints } from './game-players/round-points';

export interface GamePlayer extends User {
    pointsForRound: RoundPoints[];
    displayName: string;
}
