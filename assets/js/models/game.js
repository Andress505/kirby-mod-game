class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.drawIntervalId = undefined;
        this.fps = 60;
        
        this.background = new Background(this.ctx);
        this.kirby = new Kirby(this.ctx, 25, 10);
        this.enemy = new Enemy(this.ctx, 50, this.canvas.height -164);


        this.audio = new Audio("/assets/audio/kirby_dl_theme.mp3");
        this.audio.volume = 0.05;
    }

    
    onKeyDown(event) {
        this.kirby.onKeyDown(event);
    }

    onKeyUp(event) {
        this.kirby.onKeyUp(event);
    }

    start() {
        if (!this.drawIntervalId) {
        this.audio.play();

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
        this.audio.pause();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    move() {
        this.background.move();
        this.kirby.move();
        this.enemy.move();
    }
    
    draw() {
        this.background.draw();
        this.kirby.draw();
        this.enemy.draw();
    }
    }

