class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.drawIntervalId = undefined;
        this.fps = 60;
        
        this.background = new Background(this.ctx);
        this.kirby = new Kirby(this.ctx, 25, 10);
        this.enemy = new Enemy(this.ctx, 50, this.canvas.height -160);


        this.gameOverAudio = new Audio("/assets/audio/game_over_theme.mp3")
        this.gameOverAudio.volume = 0.7;
        this.audio = new Audio("/assets/audio/kirby_dl_theme.mp3");
        this.audio.volume = 0.7;
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
            this.checkKirbyCollisions();
        }, 1000 / this.fps);
    }
}

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
        this.audio.game_over_theme();
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
    

    checkKirbyCollisions() {
        const k = this.kirby;
        const e = this.enemy;
        
        const colx = k.x + k.w >= e.x && k.x < e.x + e.w;
        const coly = k.y + k.h >= e.y && k.y < e.y + e.h;

        if (colx && coly) {
        this.gameOver();
        }
    };

    gameOver() {
        this.gameOverAudio.play();
    this.stop();

    this.ctx.font = "40px Comic Sans MS";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
        "GAME OVER",
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 2
    );
    }
    
    stop() {
        clearInterval(this.drawIntervalId);
        this.audio.pause();
        this.drawIntervalId = undefined;
    }
}
