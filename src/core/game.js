import InputHandler from "./InputHandler.js";
import LevelManager from "../managers/levelManager.js";
import Renderer from "./render.js";
import PlayerManager from "../managers/playerManager.js";
import TerrainManager from "../managers/terrainManager.js";
import BoosterManager from "../managers/boosterManager.js";
import TeleporterManager from "../managers/teleporterManager.js";
import CollisionManager from "../managers/collisionManager.js";
import ObstacleManager from "../managers/obstacleManager.js";
import Player from "../components/player.js";
import VictoryScreen from "../scenes/victory.js";
import AssetsManager from "../managers/assetsManager.js";

export default class Game {
  constructor(container) {
    this.container = container;
    this.canvas = null;
    this.ctx = null;

    // Gestionnaires principaux
    this.levelManager = null;
    this.obstacleManager = null;
    this.collisionManager = null;
    this.playerManager = null;
    this.terrainManager = null;
    this.boosterManager = null;
    this.teleporterManager = null;
    this.renderer = null;
    this.assetsManager = new AssetsManager();

    // Éléments de jeu
    this.players = [];
    this.goal = null;
    this.obstacles = [];
    this.boosters = [];
    this.teleporters = [];
    this.terrains = [];

    this.backgroundMusic = null;
  }

  async start() {
    
    // Création du canvas
    this.container.innerHTML = `<canvas id="game-canvas" width="800" height="600"></canvas>`;
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
    
    this.assetsManager = new AssetsManager();
    await this.assetsManager.loadImages({
      booster: "src/assets/images/booster.png",
      bouncy: "src/assets/images/obstacle_bouncy.png",
      level_background: "src/assets/images/level_background.png",
      obstacle: "src/assets/images/obstacle.png",
      sand: "src/assets/images/sand.png",
      sticky: "src/assets/images/sticky.png",
      teleporter: "src/assets/images/teleporter.png"
    });
    await this.assetsManager.loadSounds({
      booster: "src/assets/sounds/booster.mp3",
      game_music: "src/assets/sounds/game_music.mp3",
      goal: "src/assets/sounds/goal.mp3",
      hit: "src/assets/sounds/hit.mp3",
      menu_music: "src/assets/sounds/menu_music.mp3",
      shoot: "src/assets/sounds/shoot.mp3",
      teleporter: "src/assets/sounds/teleporter.mp3",
      victory: "src/assets/sounds/victory.mp3",
    });
    
    const gameMusic = this.assetsManager.getSound("game_music");
    if (gameMusic) {
      gameMusic.loop = true;
      gameMusic.volume = 0.1;
      gameMusic.play();
    } else {
      console.error("Impossible de trouver la musique de fond !");
    }

    // Initialisation du LevelManager et chargement du premier niveau
    this.levelManager = new LevelManager(20, "src/levels/");
    const levelData = await this.levelManager.loadCurrentLevel();
    if (levelData) {
      this.initializeGame(levelData);
      this.attachInputHandler();
      this.loop();
    } else {
      console.error("Impossible de charger le premier niveau.");
    }
  }

  initializeGame(levelData) {
    console.log(`Initialisation du niveau : ${this.levelManager.currentLevelIndex + 1}`);

    if (this.players.length > 0) {
      this.playerManager.resetPlayers(levelData.start);
    } else {
      // Création initiale des joueurs uniquement si le tableau est vide
      this.players = [
        new Player(levelData.start.x, levelData.start.y, "red", 10),
        new Player(levelData.start.x, levelData.start.y + 50, "blue", 10)
      ];
    }



    
    // Mise à jour des composants du jeu
    this.goal = levelData.goal;
    this.obstacles = levelData.obstacles || [];
    this.boosters = levelData.boosters || [];
    this.teleporters = levelData.teleporters || [];
    this.terrains = levelData.terrains || [];
    
    // Initialisation des gestionnaires
    this.obstacleManager = new ObstacleManager(this.obstacles, this.assetsManager);
    this.collisionManager = new CollisionManager(
      this.goal,
      this.players,
      this.boosters,
      this.teleporters,
      this.terrains,
      this.canvas.width,
      this.canvas.height,
      this.obstacleManager,
      this.assetsManager
    );
    this.playerManager = new PlayerManager(this.players, this.collisionManager, this.canvas.width, this.canvas.height);
    this.terrainManager = new TerrainManager(this.terrains, this.assetsManager, this.assetsManager);
    this.boosterManager = new BoosterManager(this.boosters, this.assetsManager, this.assetsManager);
    this.teleporterManager = new TeleporterManager(this.teleporters, this.assetsManager);
    this.renderer = new Renderer(this.ctx, this, this.assetsManager);
    
    // Callback pour gérer la fin du niveau
    this.playerManager.levelCompleteCallback = () => this.loadNextLevel();
  }
  
  async loadNextLevel() {
    const levelData = await this.levelManager.loadNextLevel();
    if (levelData) {
      this.initializeGame(levelData);
    } else {
      console.log("Fin des niveaux !");
      this.showVictoryScreen();
    }
  }

  attachInputHandler() {
    new InputHandler(this.canvas, (angle, power) => {
      this.playerManager.handlePlayerShot(angle, power);
    }, this.assetsManager);
  }

  update() {
    // Mise à jour des joueurs et gestion des collisions
    this.playerManager.updatePlayers();

    this.players.forEach(player => {
      if (!player.finished) {
        this.collisionManager.checkWallCollision(player, this.canvas.width, this.canvas.height);
        this.obstacleManager.checkCollisions(player);
      }
    });

    // Appliquer les boosters et téléporteurs
    this.boosterManager.applyBoosters(this.players);
    this.teleporterManager.applyTeleporters(this.players);
  }

  render() {
    this.renderer.render();
  }

  loop() {
    this.update();
    this.render();
    requestAnimationFrame(() => this.loop());
  }

  showVictoryScreen() {
    const victoryScreen = new VictoryScreen(this.players);
    victoryScreen.show();
  }
}