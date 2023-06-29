class Kirby {

    constructor(ctx, x, y, color = 'pink') { // (ctx, x, y, w = 50, y = 50 color = 'red') lo ideal es que w y h sean argumentos del constructor
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        //Carlos dice que es mejor que esten declarados en el constructor
        this.w = 50;
        this.h = 50;

        this.vy = 1;

        this.color = color;
    }


    onKeyDown(event) {
        switch (event.keyCode) {
            case KEY_UP:
                this.vy = -KIRBY_SPEED;
                break;
            case KEY_DOWN:
                this.vy = +KIRBY_SPEED;
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
        case KEY_UP:
        case KEY_DOWN:
            this.vy = 0;
            break;
    }
}

    move() {
        this.y += this.vy

        if (this.y + this.h > this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.h;
        } else if (this.y < 0) {
            this.y = 0;
        }
    }

    draw() {
        this.ctx.fillRect(this.x, this.y, this.w, this.h);

    }
    
}