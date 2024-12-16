export default class LevelManager {
  constructor(totalLevels = 3, levelPath = "src/levels/") {
    this.levelFiles = this.generateLevelPaths(totalLevels, levelPath);
    this.currentLevelIndex = 0;
  }

  generateLevelPaths(total, path) {
    return Array.from({ length: total }, (_, i) => `${path}level${i + 1}.json`);
  }

  getCurrentLevelPath() {
    return this.levelFiles[this.currentLevelIndex];
  }

  async loadCurrentLevel() {
    const levelPath = this.getCurrentLevelPath();
    try {
      const response = await fetch(levelPath);
      if (!response.ok) throw new Error(`Échec du chargement : ${levelPath}`);
      const levelData = await response.json();
      if (!levelData.goal) throw new Error(`Le niveau ${levelPath} n'a pas de goal défini.`);
      return levelData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async loadNextLevel() {
    this.currentLevelIndex++;
    if (this.currentLevelIndex >= this.levelFiles.length) {
      console.log("Fin des niveaux !");
      return null;
    }
    return await this.loadCurrentLevel();
  }

  resetLevels() {
    this.currentLevelIndex = 0;
  }
}