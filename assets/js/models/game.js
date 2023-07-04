class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.drawIntervalId = undefined;
        this.fps = 60;
        
        this.background = new Background(this.ctx);
        this.kirby = new Kirby(this.ctx, 25, 10);
        this.enemies = [];

        this.gameOverAudio = new Audio("/assets/audio/game_over_theme.mp3")
        this.gameOverAudio.volume = 0.3;
        this.audio = new Audio("/assets/audio/kirby_dl_theme.mp3");
        this.audio.volume = 0.3;

        this.tickEnemy = 0;

        this.score = 0;
        this.timelaps = 60 * 60;
        this.boss = true;
    }

    
    onKeyDown(event) {
        this.kirby.onKeyDown(event);
    }

    onKeyUp(event) {
        this.kirby.onKeyUp(event);
    }

    start() {
        if (!this.drawIntervalId) {
        //this.audio.play();

        this.drawIntervalId = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
            this.checkKirbyCollisions();
            this.checkWeaponCollisions();
            this.clearEnemies();
            this.kirby.weapon.clearBullets();

            if (this.tickEnemy > 100) {
                this.addEnemy();
                this.tickEnemy = 0;
            }

            if (this.timelaps < 0) {
                this.gameOver();
            }

            this.timelaps--;
            this.tickEnemy++;
        }, 1000 / this.fps);
    }
}

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
        this.gameOverAudio.play();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    clearEnemies() {
        this.enemies = this.enemies.filter(enemy => {
            if (enemy.lifes === 0) {
                this.score += enemy.score;
            }
            return enemy.isVisible() && enemy.lifes > 0
        })
    }

    

    move() {
        this.background.move();
        this.kirby.move();
        this.kirby.weapon.bullets.forEach((bullet) => bullet.move());
        this.enemies.forEach((enemy) => enemy.move());
    }
    
    draw() {
        this.background.draw();
        this.ctx.save();
        this.ctx.fillStyle = "white";
        this.ctx.font = "bold 25px verdana";
        this.ctx.fillText(`Score: ${this.score.toString().padStart(4, "0")}`, this.canvas.width - 150, 25, 100)
        this.ctx.fillText(`Timelaps: ${Math.floor(this.timelaps / 60)}`, 25, 25, 100)
        this.ctx.restore();
        this.enemies.forEach((enemy) => enemy.draw());
        this.kirby.weapon.bullets.forEach((bullet) => bullet.draw());
        this.kirby.draw();
    }

    addEnemy() {
        let y = Math.floor(Math.random() * this.canvas.height);
        if (y > this.canvas.height - 48){
            y = this.canvas.height - 48;
        }

        const random = Math.floor(Math.random() * 10);


        if (this.timelaps < 50 * 60 && this.boss) {
            this.boss = false;
            this.enemies.push(new Enemy(this.ctx, this.canvas.width, this.canvas.height / 2 - 95, 100 * 2, 95 * 2, "/assets/img/scarfyorange.png", 1000, true))
        } else if (random > 8 && this.boss) {
            this.enemies.push(new Enemy(this.ctx, this.canvas.width, y, 26 * 2, 24 * 2, "/assets/img/scarfyorange.png", 100, false))
        } else if (random < 3 && this.boss) {
            this.enemies.push(new Enemy(this.ctx, this.canvas.width, y, 26 * 2, 24 * 2, "/assets/img/scarfyyellow.png", 200, false))
        } else if (this.boss) {
            this.enemies.push(new Enemy(this.ctx, this.canvas.width, y, 26 * 2, 24 * 2, "/assets/img/scarfypurple.png", 300, false))
        }       
    }
    

    checkKirbyCollisions() {
        const k = this.kirby;
        this.enemies.forEach((enemy) => {
            const e = enemy;
            
            const colx = k.x + k.w >= e.x && k.x < e.x + e.w;
            const coly = k.y + k.h >= e.y && k.y < e.y + e.h;
    
            if (colx && coly) {
                this.gameOver();
            }
        })
    }

    checkWeaponCollisions() {
        this.enemies.forEach((enemy) => {
            const result = this.kirby.checkBulletCollisions(enemy);
            if (result) {
                
            }
        })
    }

    

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
