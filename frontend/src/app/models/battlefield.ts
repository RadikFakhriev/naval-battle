import { Ship } from './ship';
import { Coordinates } from './coordinates';
import { BehaviorSubject } from 'rxjs';

export class Battlefield {
    private id: number;
    private squadron: Array<Ship>;

    public matrix: number[][] = Array(10);
    // 0 - пустая ячейка
    // 1 - невредимая палуба
    // 2 - ячейка со следом выстрела
    // 3 - пораженная палуба
    public matrixUpdate$: BehaviorSubject<object> = new BehaviorSubject<object>(null);


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

        for (let i = 0; i < 10; i++) {
            this.matrix[i] = Array(10);
            for (let j = 0; j < 10; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }

    makeSquadronOnField () {
       
        for (let ship of this.squadron) {
            ship.coordinates = this.getPossibleCoordinates(ship.decks);
            this.locate(ship);
        }

        return this.matrix;
    }

    getRandomByMax(n : number) : number {
        return Math.floor(Math.random() * (n + 1));
    }

    getPossibleCoordinates(decks : number) {
        let isCorrect: boolean = false,
            supposeCoordinates: Coordinates;

        let rot = this.getRandomByMax(1),
            x, y;

        if (rot == 0) { // корабль расположен вертикально
            x = this.getRandomByMax(10 - decks);
            y = this.getRandomByMax(9);
        } else {
            x = this.getRandomByMax(9);
            y = this.getRandomByMax(10 - decks);
        }

        supposeCoordinates = new Coordinates(x, y, rot);

        isCorrect = this.isAvailableLocation(supposeCoordinates, decks);

        if (!isCorrect) return this.getPossibleCoordinates(decks);

        return supposeCoordinates;
    }

    isAvailableLocation(suppCoords: Coordinates, decks: number) : boolean {
        // занимаемый диапазон координат таким кораблём + "зазор вокруг в 1 клетку"
        let fromX, toX, fromY, toY;
        // 'прирост' палуб в направлении X и Y соответственно
        let dx, dy;

        if (suppCoords.rot == 0) {
            dx = 0;
            dy = 1;
        } else {
            dx = 1;
            dy = 0;
        }
 
        // если корабль не примыкает к левому краю добавляем зазор слева в 1 клетку
        fromX = (suppCoords.x0 == 0) ? suppCoords.x0 : suppCoords.x0 - 1;

        if (suppCoords.x0 + dx * decks == 10 && dx == 1) toX = suppCoords.x0 + dx * decks;
        else if (suppCoords.x0 + dx * decks < 10 && dx == 1) toX = suppCoords.x0 + dx * decks + 1; // + зазор справа
        else if (suppCoords.x0 == 9 && dx == 0) toX = suppCoords.x0 + 1;
        else if (suppCoords.x0 < 9 && dx == 0) toX = suppCoords.x0 + 2; // + зазор справа
        else return false;


        // если корабль не примыкает к верхней границе добавляем зазор сверху
        fromY = (suppCoords.y0 == 0) ? suppCoords.y0 : suppCoords.y0 - 1;

        if (suppCoords.y0 + dy * decks == 10 && dy == 1) toY = suppCoords.y0 + dy * decks;
        else if (suppCoords.y0 + dy * decks < 10 && dy == 1) toY = suppCoords.y0 + dy * decks + 1; // + зазор снизу
        else if (suppCoords.y0 == 9 && dy == 0) toY = suppCoords.y0 + 1;
        else if (suppCoords.y0 < 9 && dy == 0) toY = suppCoords.y0 + 2; // + зазор снизу
        else return false;

        // проверяем есть ли в полученном диапазоне заянятые клетки
        for (let i = fromY; i < toY; i++) {
            for (let j = fromX; j < toX; j++) {
                if (this.matrix[i][j] == 1) return false;
            }
        }

        return true;
    }


    locate(ship: Ship) {
        if (ship.coordinates.rot == 0) { // вертикально
            for (let i = 0; i < ship.decks; i++) {
                this.matrix[ship.coordinates.y0 + i][ship.coordinates.x0] = 1;
            }
           
        } else {
            for (let i = 0; i < ship.decks; i++) {
                this.matrix[ship.coordinates.y0][ship.coordinates.x0 + i] = 1;
            }
        }
    }

    strike(targetX: number, targetY: number) {
        let cellState = 0;

        switch (this.matrix[targetY][targetX]) {
            case 0:
                cellState = 2;
                break;
            case 1:
                cellState = 3;
                break;
        }

        this.matrix[targetY][targetX] = cellState;

        this.matrixUpdate$.next({targetX, targetY, cellState});
    }
}
