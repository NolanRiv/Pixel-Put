export default class Booster {
    constructor(x, y, radius, boostFactor = 1.5, assetsManager) {
      this.x = x;             // Position X
      this.y = y;             // Position Y
      this.radius = radius;   // Rayon
      this.boostFactor = boostFactor; // Facteur de boost

      this.assetsManager = assetsManager;
      this.image = assetsManager.getImage("booster");
    }
  
    // Applique l'effet de boost sur un joueur
    applyEffect(player) {
      player.vx *= this.boostFactor;
      player.vy *= this.boostFactor;
      
      const sound = this.assetsManager.getSound("booster");
      if (sound) sound.play();
    }
  
    // Rendu du booster
    render(ctx) {
      if (this.image) {
        ctx.drawImage(
          this.image,
          this.x - this.radius,
          this.y - this.radius,
          this.radius * 2,
          this.radius * 2
        );
      } else {
        // Rendu par défaut en cas d'absence d'image
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "darkgreen";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
      }
    }
  }  