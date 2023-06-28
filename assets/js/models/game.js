class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.ctx = this.canvas.getContext('2d');

        this.drawIntervalId = undefined;
        
        this.kirby = new Kirby(this.ctx, 10, 10);
    }


    start() {
        if (!this.drawIntervalId) {
        this.drawIntervalId = setInterval(() => {
            this.clear();
            this.draw();
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


    draw() {
        this.kirby.draw();
    }
}

