import { Coordinates } from './coordinates';

export class Ship {
    private battlefieldId: number;
    public decks: number;
    public coordinates: Coordinates
    

    constructor(fieldId: number, decksAmount) {
        this.battlefieldId = fieldId;
        this.decks = decksAmount;
    }
}