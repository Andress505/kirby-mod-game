class Bullet {
    constructor(ctx, x, y,) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = 10;
        this.ax = 0;
        this.r = 5;
        

        
    }

    //cambiar por sprite
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    move() {
        this.vx += this.ax
        this.x += this.vx
    }
}