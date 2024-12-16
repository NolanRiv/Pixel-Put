export default class PlayerManager {
    constructor(players, collisionManager, canvasWidth, canvasHeight) {
      this.players = players; // Liste des joueurs
      this.currentPlayerIndex = 0; // Joueur actuel
      this.collisionManager = collisionManager; // Gestionnaire de collisions
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.levelCompleteCallback = null; // Callback pour la fin de niveau
    }
  
    // Gère le tir du joueur actuel
    handlePlayerShot(angle, power) {
      const currentPlayer = this.players[this.currentPlayerIndex];
  
      // Si le joueur n'a pas terminé, il peut tirer
      if (!currentPlayer.finished) {
        currentPlayer.vx = Math.cos(angle) * power;
        currentPlayer.vy = Math.sin(angle) * power;
        console.log(`${currentPlayer.color} a tiré avec puissance ${power}`);
  
        // Passer immédiatement au prochain joueur
        this.passToNextPlayer();
      }
    }
  
    // Met à jour les joueurs (mouvement et gestion des collisions)
    updatePlayers() {
      this.players.forEach(player => {
        if (!player.finished) {
          // Mise à jour de la position
          player.x += player.vx;
          player.y += player.vy;
  
          // Appliquer la friction pour ralentir
          player.vx *= 0.98;
          player.vy *= 0.98;
  
          // Vérifier les collisions avec les murs
          this.collisionManager.checkWallCollision(player, this.canvasWidth, this.canvasHeight);
          this.collisionManager.checkObstacleCollision(player);
          this.collisionManager.checkBoosterCollision(player);
          this.collisionManager.checkTeleporterCollision(player);
          this.collisionManager.checkBouncyObstacle(player, this.collisionManager.obstacles);
          this.collisionManager.checkTerrainEffect(player, this.collisionManager.terrains);
  
          this.players.forEach(otherPlayer => {
            if (otherPlayer !== player && !otherPlayer.finished) {
              this.collisionManager.checkBallCollision(player, otherPlayer);
            }
          });

          // Vérifier la collision avec le goal
          if (this.collisionManager.checkGoalCollision(player)) {
            player.finished = true;
            player.visible = false;
            console.log(`${player.color} a atteint le goal !`);
  
            // Vérifier si tous les joueurs ont terminé
            if (this.allPlayersFinished()) {
              console.log("Tous les joueurs ont terminé ! Passage au niveau suivant...");
              if (this.levelCompleteCallback) {
                this.levelCompleteCallback(); // Appeler la callback pour charger le niveau suivant
              }
            }
          }
        }
      });
    }
  
    // Passe au joueur suivant
    passToNextPlayer() {
      do {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      } while (this.players[this.currentPlayerIndex].finished);
  
      console.log(`C'est au tour du joueur : ${this.players[this.currentPlayerIndex].color}`);
    }
  
    // Vérifie si tous les joueurs ont terminé
    allPlayersFinished() {
      return this.players.every(player => player.finished);
    }
  
    // Réinitialise les joueurs pour un nouveau niveau
    resetPlayers(startPosition) {
      this.players.forEach((player, index) => {
        player.x = startPosition.x;
        player.y = startPosition.y + (index * 50); // Décalage vertical entre les joueurs
        player.vx = 0;
        player.vy = 0;
        player.finished = false;
        player.visible = true;
      });
  
      this.currentPlayerIndex = 0; // Recommence avec le premier joueur
      console.log("Les joueurs ont été réinitialisés !");
    }
  }  