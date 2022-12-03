export class Point {
    public x : number;
    public y : number;
    constructor(x? : number, y? : number) {
        this.x = x ?? 0;
        this.y = y ?? 0;
    }
}

export class Rectangle {
    public topLeft : Point;
    public bottomRight : Point;
    constructor(x? : number, y? : number, w? : number, h?: number) {
        this.topLeft = new Point(x??0, y??0);
        this.bottomRight = new Point(w??0, h??0);
    }
}

export class Triangle {
    public top : Point;
    public left : Point;
    public right : Point;
    constructor(top? : Point, left? : Point, right? : Point) {
        this.top = top ?? new Point(0,0);
        this.left = left ?? new Point(0,0);
        this.right = right ?? new Point(0,0);
    }
}

export class Circle {
    public center : Point;
    public radius : number;
    constructor(center? : Point, radius? : number) {
        this.center = center ?? new Point(0,0);
        this.radius = radius ?? 1;
    }
}
