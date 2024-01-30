export interface NewItemInput {
    name: string;
    email: string;
    url: string;
    notes: string;
}
export interface NewItemData {
    name: string;
    email: string;
    password: string;
    url: string;
    notes: string;
}
export interface Item {
    id: number;
    name: string;
    email: string;
    password: string;
    url: string;
    notes: string;
}

export interface UserData {
    username: string;
    salt: string;
    keyLength: number;
    iterations: number;
    digest: string;
    hasMasterPassword: number;
}

export type ConfirmOrRegenOpts = {
    newPassword: string;
    newPasswordLength: number;
    newPasswordOpts: { numbers: boolean; symbols: boolean };
};

export type UserEmails = {
    id: number;
    email: string;
};
