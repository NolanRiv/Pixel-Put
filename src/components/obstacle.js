export default class Obstacle {
    constructor(x, y, radius, bouncy = false) {
      this.x = x;           // Position X
      this.y = y;           // Position Y
      this.radius = radius; // Rayon de l'obstacle
      this.bouncy = bouncy; // Surface rebondissante ou non
    }
  
    // Rendu de l'obstacle
    render(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.bouncy ? "orange" : "gray"; // Couleur différente si rebondissant
      ctx.fill();
      ctx.closePath();
    }
  }
  