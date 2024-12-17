export default class Teleporter {
    constructor(entryX, entryY, exitX, exitY, radius, assetsManager) {
      this.entry = { x: entryX, y: entryY, radius: radius }; // Position d'entrée
      this.exit = { x: exitX, y: exitY };            
      this.image = assetsManager.getImage("teleporter");
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
    if (this.image) {
      // Dessiner l'image d'entrée
      ctx.drawImage(
        this.image,
        this.entry.x - this.entry.radius,
        this.entry.y - this.entry.radius,
        this.entry.radius * 2,
        this.entry.radius * 2
      );
      // Dessiner l'image de sortie
      ctx.drawImage(
        this.image,
        this.exit.x - this.entry.radius,
        this.exit.y - this.entry.radius,
        this.entry.radius * 2,
        this.entry.radius * 2
      );
    } else {
      // Rendu par défaut si les images ne sont pas chargées
      ctx.beginPath();
      ctx.arc(this.entry.x, this.entry.y, this.entry.radius, 0, Math.PI * 2);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(this.exit.x, this.exit.y, this.entry.radius, 0, Math.PI * 2);
      ctx.fillStyle = "purple";
      ctx.fill();
      ctx.closePath();
    }
  }
  }  