import LevelManager from "./levelManager.js";
import InputHandler from "./InputHandler.js";
import CollisionManager from "./collisionManager.js";
import PlayerManager from "./playerManager.js";

export default class Game {
  constructor(container) {
    this.container = container;
    this.canvas = null;
    this.ctx = null;

    this.levelManager = new LevelManager(); // Gestionnaire des niveaux
    this.collisionManager = null; // Gestionnaire de collisions
    this.playerManager = null; // Gestionnaire des joueurs

    this.players = [];
    this.goal = null;
    this.obstacles = [];
    this.boosters = [];
    this.teleporters = [];
    this.terrains = [];
  }

  // Démarrage du jeu
  async start() {
    this.container.innerHTML = `<canvas id="game-canvas" width="800" height="600"></canvas>`;
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");

    const levelData = await this.levelManager.loadCurrentLevel();
    if (!levelData) {
      console.error("Erreur : Aucun niveau à charger !");
      return;
    }

    this.initializeGame(levelData);
    this.attachInputHandler();
    this.loop();
  }

  // Chargement du niveau suivant
  async loadNextLevel() {
    console.log("Passage au niveau suivant...");
    const levelData = await this.levelManager.loadNextLevel();
    if (!levelData) {
      console.log("Fin des niveaux !");
      this.showVictoryScreen();
      return;
    }
    this.initializeGame(levelData);
  }

  // Initialisation des paramètres pour un niveau
  initializeGame(levelData) {
    if (!levelData || !levelData.start) {
      console.error("Erreur : Données de niveau invalides !");
      return;
    }

    // Création des joueurs (balles)
    this.players = [
      { x: levelData.start.x, y: levelData.start.y, color: "red", vx: 0, vy: 0, visible: true, finished: false },
      { x: levelData.start.x, y: levelData.start.y + 50, color: "blue", vx: 0, vy: 0, visible: true, finished: false }
    ];

    // Initialisation des composants
    this.goal = levelData.goal;
    this.obstacles = levelData.obstacles || [];
    this.boosters = levelData.boosters || [];
    this.teleporters = levelData.teleporters || [];
    this.terrains = levelData.terrains || [];
    this.collisionManager = new CollisionManager(this.goal, this.players, this.obstacles, this.boosters, this.teleporters, this.terrains, this.canvas.width, this.canvas.height);

    // Gestionnaire des joueurs
    this.playerManager = new PlayerManager(this.players, this.collisionManager);
    this.playerManager.resetPlayers(levelData.start);

    // Définir une callback pour passer au niveau suivant
    this.playerManager.levelCompleteCallback = () => this.loadNextLevel();
  }

  // Gestion des entrées
  attachInputHandler() {
    new InputHandler(this.canvas, (angle, power) => {
      this.playerManager.handlePlayerShot(angle, power);
    });
  }

  // Mise à jour du jeu
  update() {
    this.playerManager.updatePlayers();
  }

  // Affichage des éléments graphiques
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Goal
    this.ctx.beginPath();
    this.ctx.arc(this.goal.x, this.goal.y, this.goal.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = "black";
    this.ctx.fill();

    // Obstacles
    this.obstacles.forEach(obstacle => {
      this.ctx.beginPath();
      this.ctx.arc(obstacle.x, obstacle.y, obstacle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = "gray";
      this.ctx.fill();
    });

      // Boosters
    this.boosters.forEach(booster => {
      this.ctx.beginPath();
      this.ctx.arc(booster.x, booster.y, booster.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = "green"; // Couleur pour les boosters
      this.ctx.fill();
      this.ctx.strokeStyle = "darkgreen";
      this.ctx.stroke();
    });

    // Téléporteurs (entrée et sortie)
    this.teleporters.forEach(teleporter => {
      // Entrée du téléporteur
      this.ctx.beginPath();
      this.ctx.arc(teleporter.entry.x, teleporter.entry.y, teleporter.entry.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = "blue";
      this.ctx.fill();
      this.ctx.strokeStyle = "darkblue";
      this.ctx.stroke();

      // Sortie du téléporteur
      this.ctx.beginPath();
      this.ctx.arc(teleporter.exit.x, teleporter.exit.y, teleporter.entry.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = "purple";
      this.ctx.fill();
      this.ctx.strokeStyle = "darkpurple";
      this.ctx.stroke();
    });

    this.terrains.forEach(terrain => {
      this.ctx.fillStyle = terrain.type === "sand" ? "yellow" :
                           terrain.type === "sticky" ? "brown" :
                           terrain.type === "wind" ? "lightblue" : "green";
    
      this.ctx.fillRect(terrain.x, terrain.y, terrain.width, terrain.height);
    });
    
    // Obstacles rebondissants
    this.obstacles.forEach(obstacle => {
      this.ctx.beginPath();
      this.ctx.arc(obstacle.x, obstacle.y, obstacle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = obstacle.bouncy ? "orange" : "gray";
      this.ctx.fill();
    });

    // Joueurs (balles)
    this.players.forEach(player => {
      if (player.visible) {
        this.ctx.beginPath();
        this.ctx.arc(player.x, player.y, 10, 0, Math.PI * 2);
        this.ctx.fillStyle = player.color;
        this.ctx.fill();
      }
    });
  }

  // Affichage de l'écran de victoire
  showVictoryScreen() {
    this.container.innerHTML = `
      <div style="text-align: center; color: white; font-size: 24px; margin-top: 50px;">
        <h1>🎉 Victoire 🎉</h1>
        <p>Vous avez terminé tous les niveaux !</p>
        <button onclick="window.location.reload()">Rejouer</button>
      </div>
    `;
  }

  // Boucle principale du jeu
  loop() {
    this.update();
    this.render();
    requestAnimationFrame(() => this.loop());
  }
}