export default class CollisionManager {
  constructor(goal, players = [], boosters = [], teleporters = [], terrains = [], canvasWidth = 800, canvasHeight = 600, obstacleManager, assetsManager) {
    this.goal = goal;
    this.players = players;
    this.boosters = boosters;
    this.teleporters = teleporters;
    this.terrains = terrains;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.obstacleManager = obstacleManager;
    this.assetsManager = assetsManager;
  }


  checkWallCollision(player) {
    const radius = player.radius || 10;

    if (player.x - radius < 0) {
      this.handleWallBounce(player, "x", radius);
      this.playSound("hit");
    }
    if (player.x + radius > this.canvasWidth) {
      this.handleWallBounce(player, "x", this.canvasWidth - radius);
      this.playSound("hit");
    }
    if (player.y - radius < 0) {
      this.handleWallBounce(player, "y", radius);
      this.playSound("hit");
    }
    if (player.y + radius > this.canvasHeight) {
      this.handleWallBounce(player, "y", this.canvasHeight - radius);
      this.playSound("hit");
    }
  }

  handleWallBounce(player, axis, limit) {
    player[axis] = limit;
    if (axis === "x") player.vx = -player.vx * 0.8;
    if (axis === "y") player.vy = -player.vy * 0.8;
  }

  checkBoosterCollision(player) {
    this.boosters.forEach(booster => {
      if (this.isColliding(player, booster)) {
        player.vx *= booster.boostFactor;
        player.vy *= booster.boostFactor;
        this.playSound("booster");
        console.log(`${player.color} a été boosté !`);
      }
    });
  }

  checkTeleporterCollision(player) {
    this.teleporters.forEach(teleporter => {
      if (this.isColliding(player, teleporter.entry)) {
        player.x = teleporter.exit.x;
        player.y = teleporter.exit.y;
        this.playSound("teleporter");
        console.log(`${player.color} a été téléporté !`);
      }
    });
  }

  checkTerrainEffect(player) {
    this.terrains.forEach(terrain => {
      if (this.isInsideRect(player, terrain)) {
        switch (terrain.type) {
          case "sand":
            player.vx *= 0.8; player.vy *= 0.8; break;
          case "sticky":
            player.vx *= 0.5; player.vy *= 0.5; break;
          case "wind":
            player.vx += terrain.forceX || 0; player.vy += terrain.forceY || 0; break;
        }
        console.log(`${player.color} est affecté par ${terrain.type}`);
      }
    });
  }

  checkBallCollision(player, otherPlayer) {
    const dx = player.x - otherPlayer.x;
    const dy = player.y - otherPlayer.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
  
    if (distance < player.radius + otherPlayer.radius) {
      const angle = Math.atan2(dy, dx);
      const overlap = player.radius + otherPlayer.radius - distance;
  
      // Repositionner les balles pour éviter le chevauchement
      player.x += Math.cos(angle) * overlap / 2;
      player.y += Math.sin(angle) * overlap / 2;
      otherPlayer.x -= Math.cos(angle) * overlap / 2;
      otherPlayer.y -= Math.sin(angle) * overlap / 2;
  
      // Simuler le rebond des balles
      const impulse = 0.5; // Facteur pour ajuster la force du rebond
      player.vx += Math.cos(angle) * impulse;
      player.vy += Math.sin(angle) * impulse;
      otherPlayer.vx -= Math.cos(angle) * impulse;
      otherPlayer.vy -= Math.sin(angle) * impulse;
  
      this.playSound("hit");
      console.log("Collision entre deux balles !");
    }
  }  

  checkGoalCollision(player) {
    if (this.isColliding(player, this.goal)) {
      player.vx = 0; player.vy = 0;
      player.finished = true; player.visible = false;
      this.playSound("goal");
      console.log(`${player.color} a atteint le goal !`);
      return true;
    }
    return false;
  }

  checkObstacleCollision(player) {
    this.obstacleManager.checkCollisions(player);
  }

  playSound(soundName) {
    const sound = this.assetsManager.getSound(soundName);
    if (sound) sound.play();
  }

  getDistance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return { dx, dy, distance: Math.sqrt(dx * dx + dy * dy) };
  }

  isColliding(a, b) {
    const { distance } = this.getDistance(a, b);
    return distance < (a.radius + b.radius);
  }

  isInsideRect(player, rect) {
    return (
      player.x > rect.x &&
      player.x < rect.x + rect.width &&
      player.y > rect.y &&
      player.y < rect.y + rect.height
    );
  }
}