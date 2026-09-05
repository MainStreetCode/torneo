import { TeamPlayer } from '../team-player/team-player';

export interface PointConfirmation {
    teamId: string;
    playerId: string;
}

export interface Team {
    id: string;
    teamPlayers: TeamPlayer[];
    points: number;
    pointConfirmations?: PointConfirmation[];
}
