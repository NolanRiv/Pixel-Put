import Instructions from "./instructions.js";
import Game from "../core/game.js";

export default class MainMenu {
  constructor(container) {
    this.container = container;
  }

  load() {
    this.container.innerHTML = `
      <div id="main-menu">
        <h1>Pixel Put</h1>
        <button id="start-btn">Commencer</button>
        <button id="instructions-btn">Instructions</button>
      </div>
    `;

    document.getElementById("start-btn").addEventListener("click", () => {
      const game = new Game(this.container);
      game.start();
    });

    document.getElementById("instructions-btn").addEventListener("click", () => {
      const instructions = new Instructions(this.container);
      instructions.display();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("game-container");
  const menu = new MainMenu(container);
  menu.load();
});