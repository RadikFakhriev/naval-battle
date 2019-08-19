export class Player {
    public name: string;
    public isEnemy: boolean;

    constructor (name: string, isEnemy: boolean) {
        this.name = name;
        this.isEnemy = isEnemy;
    }
}