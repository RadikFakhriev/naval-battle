import { Coordinates } from './coordinates';

export class Ship {
    private battlefieldId: number;
    private decks: number;
    private coordinates: Coordinates

    constructor(fieldId: number, decksAmount) {
        this.battlefieldId = fieldId;
        this.decks = decksAmount;
    }
}