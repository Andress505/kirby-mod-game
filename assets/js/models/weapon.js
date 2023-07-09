class Weapon {
    constructor(ctx, x, y) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      
      this.bullets = [];
      this.canShoot = true; // Add a flag for cooldown
      
      this.weaponAudio = new Audio("/assets/audio/star_rod_bullet.mp3");
    }
  
    shoot() {
      if (!this.canShoot) {
        return; // Exit the function if still in cooldown
      }
      
      this.weaponAudio.play();
      const newBullet = new Bullet(this.ctx, this.x, this.y);
      this.bullets.push(newBullet);
  
      this.canShoot = false; // Set the cooldown flag to false
  
      // Enable shooting after 2 seconds
      setTimeout(() => {
        this.canShoot = true;
      }, 1001); // 2000 milliseconds = 2 seconds
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