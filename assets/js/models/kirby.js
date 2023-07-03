class Kirby {

    constructor(ctx, x, y) { // (ctx, x, y, w = 50, y = 50 color = 'red') lo ideal es que w y h sean argumentos del constructor
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        //Carlos dice que es mejor que esten declarados en el constructor
        this.w = 34 * 2;
        this.h = 37 * 2;
        this.h0 = this.h;

        this.vy = 1;

        this.weapon = new Weapon(this.ctx, this.x + this.w, this.y + this.h / 2)

        

        this.sprite = new Image();
        this.sprite.src = '/assets/img/passivekirby2.png';
        this.sprite.verticalFrame = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrame = 2;
        this.sprite.horizontalFrameIndex = 0;
        
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrame);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrame);
        }

        this.animationTick = 0;
    }


    onKeyDown(event) {
        switch (event.keyCode) {
            case KEY_SPACE:
                this.weapon.shoot();
                break;
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
        case KEY_SPACE:
        case KEY_UP:
        case KEY_DOWN:
            this.vy = 0;
            break;
    }
}

    move() {
        this.y += this.vy

        this.weapon.x = this.x + this.w;
        this.weapon.y = this.y + this.h / 2;
        this.weapon.move()

        if (this.y + this.h > this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.h;
        } else if (this.y < 0) {
            this.y = 0;
        }

    }

    draw() {
        if (this.sprite.isReady) {
            this.ctx.drawImage(
            this.sprite,
            this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
            this.sprite.verticalFrameIndex * this.sprite.frameHeight,
            this.sprite.frameHeight,
            this.sprite.frameWidth,
            this.x,
            this.y,
            this.w,
            this.h
            );

            this.animate();
        }

    this.weapon.draw();

    }

    animate() {
        this.animationTick++;

        if (this.animationTick > KIRBY_PASSIVE_ANIMATION_TICK) {
            this.animationTick = 0;
            this.sprite.horizontalFrameIndex++;
        }
        if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrame - 1) {
            this.sprite.horizontalFrameIndex = 0;
        }
    }
}