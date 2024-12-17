export default class Terrain {
  constructor(type, x, y, width, height, properties = {}, assetsManager) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.properties = properties;

    // Charger l'image en fonction du type
    this.image = assetsManager.getImage(`${type}`);
  }

  // Applique l'effet du terrain sur un joueur
  applyEffect(player) {
    switch (this.type) {
      case "sand":
        player.vx *= 0.8;
        player.vy *= 0.8;
        break;
      case "sticky":
        player.vx *= 0.5;
        player.vy *= 0.5;
        break;
      case "wind":
        player.vx += this.properties.forceX || 0;
        player.vy += this.properties.forceY || 0;
        break;
    }
  }

  // Rendu du terrain
  render(ctx) {
    if (this.image) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      // Couleur par défaut si l'image n'est pas chargée
      ctx.fillStyle = this.getColor();
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  // Couleur par défaut pour les terrains
  getColor() {
    switch (this.type) {
      case "sand": return "yellow";
      case "sticky": return "brown";
      case "wind": return "lightblue";
      default: return "green";
    }
  }
}