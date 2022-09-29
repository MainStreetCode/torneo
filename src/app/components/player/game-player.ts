import { User } from "firebase/auth";

export interface GamePlayer extends User {
    points?: number;
    displayName: string;
}
