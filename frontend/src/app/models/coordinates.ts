export class Coordinates {
    public x0: number;
    public y0: number;
    public rot: number; // 0 - вертикально, 1 - горизонтально
    
    constructor(x, y, rot) {
        this.x0 = x;
        this.y0 = y;
        this.rot = rot;
    }
}