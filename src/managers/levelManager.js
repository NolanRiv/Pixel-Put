export default class LevelManager {
  constructor(totalLevels, levelPath = "src/levels/") {
    this.levelFiles = this.generateLevelPaths(totalLevels, levelPath);
    this.currentLevelIndex = 0;
  }

  // Générer les chemins des niveaux
  generateLevelPaths(total, path) {
    return Array.from({ length: total }, (_, i) => `${path}level${i + 1}.json`);
  }

  // Obtenir le chemin du niveau actuel
  getCurrentLevelPath() {
    return this.levelFiles[this.currentLevelIndex];
  }

  // Charger le niveau actuel
  async loadCurrentLevel() {
    const levelPath = this.getCurrentLevelPath();
    try {
      const response = await fetch(levelPath);
      if (!response.ok) throw new Error(`Impossible de charger le niveau : ${levelPath}`);
      
      const levelData = await response.json();
      this.validateLevelData(levelData, levelPath);
      console.log(`Niveau chargé avec succès : ${levelPath}`);
      return levelData;
    } catch (error) {
      console.error(`Erreur lors du chargement : ${error.message}`);
      return null;
    }
  }

  // Passer au niveau suivant
  async loadNextLevel() {
    if (!this.hasNextLevel()) {
      console.log("Tous les niveaux ont été complétés !");
      return null;
    }
    this.currentLevelIndex++;
    return await this.loadCurrentLevel();
  }

  // Vérifier s'il reste des niveaux
  hasNextLevel() {
    return this.currentLevelIndex + 1 < this.levelFiles.length;
  }

  // Réinitialiser les niveaux
  resetLevels() {
    this.currentLevelIndex = 0;
  }

  // Valider les données d'un niveau
  validateLevelData(levelData, levelPath) {
    if (!levelData.start) throw new Error(`Le niveau ${levelPath} doit contenir une position de départ.`);
    if (!levelData.goal) throw new Error(`Le niveau ${levelPath} doit contenir un objectif.`);
  }
}