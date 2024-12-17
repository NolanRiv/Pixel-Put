export default class Terrain {
    constructor(type, x, y, width, height, properties = {}) {
      this.type = type;       // Type de terrain : sand, sticky, wind
      this.x = x;             // Position X
      this.y = y;             // Position Y
      this.width = width;     // Largeur
      this.height = height;   // Hauteur
      this.properties = properties; // Propriétés supplémentaires (forceX, forceY)
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
      ctx.fillStyle = this.getColor();
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    // Détermine la couleur selon le type
    getColor() {
      switch (this.type) {
        case "sand": return "yellow";
        case "sticky": return "brown";
        case "wind": return "lightblue";
        default: return "green";
      }
    }
  }  