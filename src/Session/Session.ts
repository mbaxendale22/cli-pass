import { Item } from "../@types/customTypes";

export class Session {
    private masterPassword: string;
    private currentItem: Item;

    constructor() { }

    public setMasterPassword(masterPassword: string) {
        this.masterPassword = masterPassword;
    }
    public getMasterPassword() {
        return this.masterPassword;
    }

    public setCurrentItem(item: Item) {
        this.currentItem = item;
    }

    public getCurrentItem() {
        return this.currentItem;
    }

    public printCurrentItem(): string {
        return `id: ${this.currentItem.id}, name: ${this.currentItem.name}, email: ${this.currentItem.email}`;
    }
}
