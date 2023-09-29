class Weapon {
    constructor(ctx, x, y) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      
      this.bullets = [];
      this.canShoot = true;
      
      this.weaponAudio = new Audio("/assets/audio/star_rod_bullet.mp3");
    }
  
    shoot() {
      if (!this.canShoot) {
        return; 
      }
      
      this.weaponAudio.play();
      const newBullet = new Bullet(this.ctx, this.x, this.y);
      this.bullets.push(newBullet);
  
      this.canShoot = false; 
  
      
      setTimeout(() => {
        this.canShoot = true;
      }, 1100); 
    }
  
    draw() {
      this.bullets.forEach((bullet) => {
        bullet.draw();
      });
    }
  
    move() {
      this.bullets.forEach((bullet) => {
        bullet.move();
      });
    }
  
    clearBullets() {
      this.bullets = this.bullets.filter(
        (bullet) => bullet.isVisible() && !bullet.impact
      );
    }
  }