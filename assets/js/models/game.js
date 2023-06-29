class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.drawIntervalId = undefined;
        this.fps = 60;
        
        this.background = new Background(this.ctx);
        this.kirby = new Kirby(this.ctx, 25, 10);
    }

    
    onKeyDown(event) {
        this.kirby.onKeyDown(event);
    }

    onKeyUp(event) {
        this.kirby.onKeyUp(event);
    }

    start() {
        if (!this.drawIntervalId) {
        this.drawIntervalId = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
        }, 1000 / this.fps);
    }
}

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    move () {
        this.kirby.move();
        this.background.move();
    }

    draw() {
        this.background.draw();
        this.kirby.draw();
    }
}

