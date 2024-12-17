export default class Booster {
    constructor(x, y, radius, boostFactor = 1.5) {
      this.x = x;             // Position X
      this.y = y;             // Position Y
      this.radius = radius;   // Rayon
      this.boostFactor = boostFactor; // Facteur de boost
    }
  
    // Applique l'effet de boost sur un joueur
    applyEffect(player) {
      player.vx *= this.boostFactor;
      player.vy *= this.boostFactor;
    }
  
    // Rendu du booster
    render(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "green";
      ctx.fill();
      ctx.strokeStyle = "darkgreen";
      ctx.stroke();
      ctx.closePath();
    }
  }  