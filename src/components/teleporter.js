export default class Teleporter {
    constructor(entryX, entryY, exitX, exitY, radius) {
      this.entry = { x: entryX, y: entryY, radius: radius }; // Position d'entrée
      this.exit = { x: exitX, y: exitY };                   // Position de sortie
    }
  
    // Téléporte le joueur
    applyEffect(player) {
      player.x = this.exit.x;
      player.y = this.exit.y;
      player.vx *= 0.5;
      player.vy *= 0.5;
    }
  
    // Rendu du téléporteur
    render(ctx) {
      // Entrée
      ctx.beginPath();
      ctx.arc(this.entry.x, this.entry.y, this.entry.radius, 0, Math.PI * 2);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();
  
      // Sortie
      ctx.beginPath();
      ctx.arc(this.exit.x, this.exit.y, this.entry.radius, 0, Math.PI * 2);
      ctx.fillStyle = "purple";
      ctx.fill();
      ctx.closePath();
    }
  }  