export default class Player {
    constructor(x, y, color, radius = 10) {
      this.x = x;               // Position X du joueur
      this.y = y;               // Position Y du joueur
      this.color = color;       // Couleur pour l'affichage
      this.radius = radius;     // Rayon du joueur (balle)
      this.vx = 0;              // Vitesse horizontale
      this.vy = 0;              // Vitesse verticale
      this.visible = true;      // Visibilité (ex. si goal atteint)
      this.finished = false;    // Indique si le joueur a fini
      this.hasPlayed = false;   // Tour joué ou non
      this.shots = 0;
      this.scores = [];
    }

    reset(startX, startY) {
        this.x = startX;
        this.y = startY;
        this.vx = 0;
        this.vy = 0;
        this.finished = false;
        this.visible = true;
        this.shots = 0; // Réinitialise les coups pour le nouveau trou
      }
  
    // Mise à jour de la position
    update() {
      this.x += this.vx;
      this.y += this.vy;
  
      // Appliquer la friction
      this.vx *= 0.98;
      this.vy *= 0.98;
  
      // Arrêter les mouvements si les vitesses sont très faibles
      if (Math.abs(this.vx) < 0.01) this.vx = 0;
      if (Math.abs(this.vy) < 0.01) this.vy = 0;
    }
  
    // Vérifie si le joueur est en mouvement
    isMoving() {
      return this.vx !== 0 || this.vy !== 0;
    }
  
    // Rendu du joueur sur le canvas
    render(ctx) {
      if (this.visible) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }  
  