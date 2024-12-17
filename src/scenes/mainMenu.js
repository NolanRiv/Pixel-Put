document.addEventListener("DOMContentLoaded", () => {
  const mainMenu = document.createElement("div");
  mainMenu.id = "main-menu";
  mainMenu.className = "menu-screen";
  mainMenu.innerHTML = `
    <h1>Golf Pixel Put</h1>
    <button id="start-button">Commencer</button>
    <button id="instructions-button">Instructions</button>
  `;
  document.body.appendChild(mainMenu);

  // Bouton pour commencer le jeu
  document.getElementById("start-button").addEventListener("click", () => {
    mainMenu.style.display = "none";
    const container = document.getElementById("game-container");
    import("../core/game.js").then(GameModule => {
      const game = new GameModule.default(container);
      game.start();
    });
    // import("../managers/assetsManager.js").then( () => {
    //   const music = this.assetsManager.getSound("menu_music");
    //   if (music) music.play();
    // });
  });

  // Bouton pour les instructions
  document.getElementById("instructions-button").addEventListener("click", () => {
    mainMenu.style.display = "none";
    document.getElementById("instructions").style.display = "flex";
  });
});