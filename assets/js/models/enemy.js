class Enemy {
    constructor(ctx, x, y, w, h, sprite, score, isBoss) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vx = -2;

    this.lifes = 3;
    this.isBoss = isBoss;

    this.sprite = new Image();
    this.sprite.src = sprite;
    this.sprite.verticalFrames = 1;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 3;
    this.sprite.horizontalFrameIndex = 0;

    this.score = score;

    this.sprite.onload = () => {
        this.sprite.isReady = true;

        this.sprite.frameWidth = Math.floor(
        this.sprite.width / this.sprite.horizontalFrames
        );

        this.sprite.frameHeight = Math.floor(
        this.sprite.height / this.sprite.verticalFrames
        );
    };

    this.animationTick = 0;
    }

    draw() {
    if (this.sprite.isReady) {
        this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.w,
        this.h
        );

        this.animate();
    }
    }

    move() {
        if ((this.isBoss && this.x > this.ctx.canvas.width / 2) || !this.isBoss) {
            this.x += this.vx;
        }
    }

    animate() {
        this.animationTick++;

        if (this.animationTick > KIRBY_PASSIVE_ANIMATION_TICK) {
            this.animationTick = 0;
            this.sprite.horizontalFrameIndex++;

            if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
            this.sprite.horizontalFrameIndex = 0;
            }
        }
    }

    isVisible() {
        return this.x + this.w > 0
    }

    
}