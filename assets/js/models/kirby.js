class Kirby {

    constructor(ctx, x, y, color = 'pink') { // (ctx, x, y, w = 50, y = 50 color = 'red') lo ideal es que w y h sean argumentos del constructor
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        //Carlos dice que es mejor que esten declarados en el constructor
        this.w = 50;
        this.h = 50;

        this.color = color;
    }

    draw() {
        this.ctx.fillRect(this.x, this.y, this.w, this.h);

    }
    
}