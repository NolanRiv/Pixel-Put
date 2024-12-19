document.addEventListener("DOMContentLoaded", () => {
  const mainMenu = document.createElement("div");
  mainMenu.id = "main-menu";
  mainMenu.innerHTML = `
    <div id="main-container">
      <h1>Pixel Put</h1>
      <button id="start-button">Commencer</button>
      <button id="instructions-button">Instructions</button>
  </div>
  `;

  document.body.appendChild(mainMenu);

  const fadeOutMenu = () => {
      mainMenu.style.animation = "fadeOut 0.5s forwards";
      setTimeout(() => {
          mainMenu.style.display = "none";
      }, 500);
  };

  document.getElementById("start-button").addEventListener("click", () => {
      fadeOutMenu();
      const container = document.getElementById("game-container");

      import("../core/game.js").then(GameModule => {
          const game = new GameModule.default(container);
          game.start();
      });
  });

  document.getElementById("instructions-button").addEventListener("click", () => {
      fadeOutMenu();

      import("../scenes/instructions.js").then(() => {
          const instructionsScreen = document.getElementById("instructions");
          if (instructionsScreen) {
              instructionsScreen.style.display = "flex";
          } else {
              console.error("L'\u00e9cran des instructions est introuvable !");
          }
      });
  });
});