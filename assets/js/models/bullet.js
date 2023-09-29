class Bullet {
    constructor(ctx, x, y,) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = 16 * 3;
        this.h = 16 * 3;
        this.vx = 5;

        this.impact = false;
        
        this.sprite = new Image();
        this.sprite.src = '/assets/img/star_bullet.png';
        this.sprite.verticalFrame = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrame = 16;
        this.sprite.horizontalFrameIndex = 0;
        
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrame);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrame);
        }

        this.animationTick = 0;
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
    }

    move() {
        this.x += this.vx
    }

    isVisible() {
        return this.x < this.ctx.canvas.width;
    }

    hasImpact() {
        this.impact = true;
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