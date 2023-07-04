class Bullet {
    constructor(ctx, x, y,) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = 10;
        this.ax = 0;
        this.r = 5;
        

        this.impact = false;
        
    }

    //cambiar por sprite
    draw() {
        this.ctx.save();
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    }

    move() {
        this.vx += this.ax
        this.x += this.vx
    }

    isVisible() {
        return this.x < this.ctx.canvas.width;
    }

    hasImpact() {
        this.impact = true;
    }
}