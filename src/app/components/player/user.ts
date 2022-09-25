import { Roles } from './roles';
import firebase from "firebase/compat/app";

export interface User extends firebase.User {
    id: string;
    name: string;
    roles: Roles[];
}
