import MainMenu from "./mainMenu.js";

export default class Instructions {
  constructor(container) {
    this.container = container;
  }

  display() {
    this.container.innerHTML = `
      <div id="instructions">
        <h1>Instructions</h1>
        <p>1. Ajustez la direction et la force avec la souris.</p>
        <p>2. L'objectif est de mettre la balle dans le trou avec le moins de coups possible.</p>
        <button id="back-btn">Retour</button>
      </div>
    `;

    document.getElementById("back-btn").addEventListener("click", () => {
      const menu = new MainMenu(this.container);
      menu.load();
    });
  }
}