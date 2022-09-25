import { Roles } from './roles';

export interface User {
    id: string;
    name: string;
    roles: Roles[];
    email?: string;
}
