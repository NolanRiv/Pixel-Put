import AbstractManager from "./abstractManager.js";
import Obstacle from "../components/obstacle.js";

export default class ObstacleManager extends AbstractManager {
  constructor(obstaclesData, assetsManager) {
    const obstacles = obstaclesData.map(data =>
      new Obstacle(data.x, data.y, data.radius, data.bouncy || false, assetsManager)
    );
    super(obstacles);
    this.assetsManager = assetsManager;
  }

  // Vérification des collisions avec un joueur
  checkCollisions(player) {
    this.update(obstacle => {
      const dx = player.x - obstacle.x;
      const dy = player.y - obstacle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < player.radius + obstacle.radius) {
        const angle = Math.atan2(dy, dx);
        const overlap = player.radius + obstacle.radius - distance;

        // Repositionner la balle
        player.x += Math.cos(angle) * overlap;
        player.y += Math.sin(angle) * overlap;

        // Appliquer le rebond
        const reboundFactor = obstacle.bouncy ? 1.5 : 0.8;
        player.vx = -player.vx * reboundFactor;
        player.vy = -player.vy * reboundFactor;

        console.log(`Collision avec un obstacle ${obstacle.bouncy ? "rebondissant" : "normal"} !`);
        this.assetsManager.getSound("hit");
      }
    });
  }

  // Rendu des obstacles
  render(ctx) {
    super.render(ctx, (ctx, obstacle) => obstacle.render(ctx));
  }
}