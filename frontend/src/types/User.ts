import {ConnectedAccount} from "@/src/types/ConnectedAccount";

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    birthDate: Date;
    age: number;
    avatarUrl: string;
    bio: string;
    isVerified: boolean;
    userRoles: string[];
    institutions: string[];
    banned: boolean;
    createdAt: Date;
    updatedAt: Date;
    connectedAccounts: ConnectedAccount[];

}