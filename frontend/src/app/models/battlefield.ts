import { Ship } from './ship';

export class Battlefield {
    private id: number;
    private squadron: Array<Ship>;
    private matrix: number[][]; 


    constructor(id: number) {
        this.id = id;

        this.squadron = [
            new Ship(id, 4),
            new Ship(id, 3),
            new Ship(id, 3),
            new Ship(id, 2),
            new Ship(id, 2),
            new Ship(id, 2),
            new Ship(id, 1),
            new Ship(id, 1),
            new Ship(id, 1),
            new Ship(id, 1)
        ];

        //TODO: init matrix
    }

    getPossibleCoordinates(ship: Ship) {

    }

    isAvailableLocation(ship: Ship): boolean {

        return true;
    }


    locate(ship: Ship) {

    }
}
