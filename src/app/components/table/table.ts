import { Team } from '../team/team';

export interface Table {
    id: string;
    number: number;
    name: string;
    playerIds: string[];
    pointsConfirmed: boolean;
}
