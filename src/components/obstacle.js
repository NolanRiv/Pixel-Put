export default class Obstacle {
  constructor(x, y, radius = 15, bouncy = false, assetsManager) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.bouncy = bouncy;

    this.image = this.bouncy
      ? assetsManager.getImage("bouncy")
      : assetsManager.getImage("obstacle");
  }

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
      ctx.fillStyle = this.bouncy ? "orange" : "gray";
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.stroke();
    }
  }
}
