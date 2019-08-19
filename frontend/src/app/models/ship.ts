import { Coordinates } from './coordinates';

export class Ship {
    public decks: number;
    public coordinates: Coordinates
    public isHit: boolean = false; // поврежден
    public isDrowned: boolean = false; // утоплен

    constructor(decksAmount) {
        this.decks = decksAmount;
    }
}