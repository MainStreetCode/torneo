import { Team } from 'src/app/components/team/team';

export interface Table {
    id: string;
    teams: Team[];
    number?: number;
    name?: string;
}
