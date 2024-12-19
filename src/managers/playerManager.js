export default class PlayerManager {
  constructor(players, collisionManager, canvasWidth, canvasHeight) {
    this.players = players; // Liste des joueurs
    this.currentPlayerIndex = 0; // Joueur actuel
    this.collisionManager = collisionManager; // Gestionnaire de collisions
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.levelCompleteCallback = null; // Callback pour la fin de niveau
    this.currentLevelIndex = 0;
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  // Gère le tir du joueur actuel
  handlePlayerShot(angle, power) {
    const currentPlayer = this.getCurrentPlayer();
    if (!currentPlayer.finished) {
      currentPlayer.vx = Math.cos(angle) * power;
      currentPlayer.vy = Math.sin(angle) * power;
      currentPlayer.shots += 1;
      console.log(`${currentPlayer.color} a tiré avec puissance ${power}`);
      this.passToNextPlayer();
    }
  }

  // Met à jour les joueurs
  updatePlayers() {
    this.players.forEach(player => {
      if (!player.finished) {
        player.update();
        this.handleCollisions(player);
        this.checkGoal(player);
      }
    });
  }

  // Gestion des collisions
  handleCollisions(player) {
    this.collisionManager.checkWallCollision(player, this.canvasWidth, this.canvasHeight);
    this.collisionManager.checkObstacleCollision(player);
    this.collisionManager.checkBoosterCollision(player);
    this.collisionManager.checkTeleporterCollision(player);
    this.collisionManager.checkTerrainEffect(player, this.collisionManager.terrains);

    this.players.forEach(otherPlayer => {
      if (otherPlayer !== player && !otherPlayer.finished) {
        this.collisionManager.checkBallCollision(player, otherPlayer);
      }
    });
  }

  // Vérifie si le joueur a atteint le goal
  checkGoal(player) {
    if (this.collisionManager.checkGoalCollision(player)) {
      player.finished = true;
      player.visible = false;

      if (!player.scores) player.scores = [];
      player.scores.push(player.shots);
      console.log(player.scores)
      
      if (this.allPlayersFinished()) {
        console.log("Tous les joueurs ont terminé ce trou !");
        this.holeIndex += 1;
        if (this.levelCompleteCallback) this.levelCompleteCallback();
      }
    }
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
      player.reset(startPosition.x, startPosition.y + index * 50);
    });

    this.currentPlayerIndex = 0;
    console.log("Les joueurs ont été réinitialisés !");
  }

  nextLevel() {
    this.currentLevelIndex += 1; // Passe au niveau suivant
  }

  // Render des joueurs
  render(ctx) {
    this.players.forEach(player => {
      if (player.visible) {
        player.render(ctx);
      }
    });
  }
}