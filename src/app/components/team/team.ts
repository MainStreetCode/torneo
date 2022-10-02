import { TeamPlayer } from '../team-player/team-player';

export interface Team {
    id: string;
    teamPlayers: TeamPlayer[];
    points: number;
}
