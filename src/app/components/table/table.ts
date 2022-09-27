import { Team } from '../team/team';

export interface Table {
    id: string;
    teams: Team[];
    number: number;
    name: string;
}