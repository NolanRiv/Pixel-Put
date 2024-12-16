export default class CollisionManager {
    constructor(goal, players, obstacles, boosters, teleporters, terrains, canvasWidth, canvasHeight) {
      this.goal = goal;
      this.players = players;
      this.obstacles = obstacles;
      this.boosters = boosters;
      this.teleporters = teleporters;
      this.terrains = terrains;
      this.canvasWidth = canvasWidth; // Largeur du canvas
      this.canvasHeight = canvasHeight; // Hauteur du canvas
    }

    checkWallCollision(player) {
        const radius = player.radius || 10; // Rayon de la balle
      
        // Collision avec le mur gauche
        if (player.x - radius < 0) {
          player.x = radius;
          player.vx = -player.vx * 0.8;
          console.log(`${player.color} a touché le mur gauche !`);
        }
      
        // Collision avec le mur droit
        if (player.x + radius > this.canvasWidth) {
          player.x = this.canvasWidth - radius;
          player.vx = -player.vx * 0.8;
          console.log(`${player.color} a touché le mur droit !`);
        }
     
        // Collision avec le mur du haut
        if (player.y - radius < 0) {
          player.y = radius;
          player.vy = -player.vy * 0.8;
          console.log(`${player.color} a touché le mur du haut !`);
        }
     
        // Collision avec le mur du bas
        if (player.y + radius > this.canvasHeight) {
          player.y = this.canvasHeight - radius;
          player.vy = -player.vy * 0.8;
          console.log(`${player.color} a touché le mur du bas !`);
        }
      }                                      

    checkObstacleCollision(player) {
        this.obstacles.forEach(obstacle => {
          const dx = player.x - obstacle.x;
          const dy = player.y - obstacle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
      
          if (distance < 10 + obstacle.radius) { // Rayon de la balle (10) + rayon de l'obstacle
            const angle = Math.atan2(dy, dx);
            const overlap = 10 + obstacle.radius - distance;
      
            // Repositionner la balle pour éviter le chevauchement
            player.x += Math.cos(angle) * overlap;
            player.y += Math.sin(angle) * overlap;
      
            // Inverser la vitesse pour simuler un rebond
            player.vx = -player.vx * 0.8;
            player.vy = -player.vy * 0.8;
      
            console.log("Collision avec un obstacle !");
          }
        });
      }
      
      checkBoosterCollision(player) {
        this.boosters.forEach(booster => {
          const dx = player.x - booster.x;
          const dy = player.y - booster.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
      
          if (distance < 10 + booster.radius) {
            // Augmenter la vitesse
            player.vx *= booster.boostFactor;
            player.vy *= booster.boostFactor;
      
            console.log(`${player.color} a été boosté ! Vitesse augmentée.`);
          }
        });
      }
      
      checkTeleporterCollision(player) {
        this.teleporters.forEach(teleporter => {
          const dx = player.x - teleporter.entry.x;
          const dy = player.y - teleporter.entry.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
      
          if (distance < 10 + teleporter.entry.radius) {
            // Téléporter le joueur à la position de sortie
            player.x = teleporter.exit.x;
            player.y = teleporter.exit.y;
      
            console.log(`${player.color} a été téléporté de (${teleporter.entry.x}, ${teleporter.entry.y}) à (${teleporter.exit.x}, ${teleporter.exit.y}) !`);
          }
        });
      }    
      
      checkTerrainEffect(player, terrains) {
        terrains.forEach(terrain => {
          // Vérifier si le joueur est sur le terrain
          if (
            player.x > terrain.x &&
            player.x < terrain.x + terrain.width &&
            player.y > terrain.y &&
            player.y < terrain.y + terrain.height
          ) {
            switch (terrain.type) {
              case "sand":
                player.vx *= 0.8; // Réduction de la vitesse
                player.vy *= 0.8;
                console.log(`${player.color} est ralenti par le sable !`);
                break;
      
              case "sticky":
                player.vx *= 0.5; // Forte friction
                player.vy *= 0.5;
                console.log(`${player.color} est collé sur le terrain !`);
                break;
      
              case "wind":
                player.vx += terrain.forceX || 0;
                player.vy += terrain.forceY || 0;
                console.log(`${player.color} est poussé par le vent !`);
                break;
            }
          }
        });
      }
      
      checkBouncyObstacle(player, obstacles) {
        obstacles.forEach(obstacle => {
          const dx = player.x - obstacle.x;
          const dy = player.y - obstacle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
      
          if (distance < player.radius + obstacle.radius) {
            const angle = Math.atan2(dy, dx);
      
            // Appliquer un rebond plus fort
            player.vx = -Math.cos(angle) * Math.abs(player.vx) * 1.5; // Rebond amplifié
            player.vy = -Math.sin(angle) * Math.abs(player.vy) * 1.5;
      
            console.log(`${player.color} a touché un obstacle rebondissant !`);
          }
        });
      }      

      checkBallCollision(player, otherPlayer) {
        const dx = player.x - otherPlayer.x;
        const dy = player.y - otherPlayer.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
      
        if (distance < 20) { // Rayon combiné des deux balles
          const angle = Math.atan2(dy, dx);
          const overlap = 20 - distance;
      
          // Repositionner les balles pour éviter le chevauchement
          player.x += Math.cos(angle) * overlap / 2;
          player.y += Math.sin(angle) * overlap / 2;
          otherPlayer.x -= Math.cos(angle) * overlap / 2;
          otherPlayer.y -= Math.sin(angle) * overlap / 2;
      
          // Ajouter une légère impulsion pour éviter l'arrêt
          player.vx += Math.cos(angle) * 0.5;
          player.vy += Math.sin(angle) * 0.5;
          otherPlayer.vx -= Math.cos(angle) * 0.5;
          otherPlayer.vy -= Math.sin(angle) * 0.5;
      
          console.log("Collision entre les balles !");
        }
      }           
  
      checkGoalCollision(player) {
        if (!this.goal || !player || player.finished) return false; // Vérifier si le joueur a déjà fini
      
        const dx = player.x - this.goal.x;
        const dy = player.y - this.goal.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
      
        if (distance < this.goal.radius + 10) { // Rayon de la balle + goal
          player.vx = 0; // Arrêter le mouvement
          player.vy = 0;
          player.finished = true; // Marquer comme terminé
          player.visible = false; // Rendre la balle invisible
          console.log(`${player.color} a atteint le goal !`);
          return true;
        }
        return false;
      }      
  }  