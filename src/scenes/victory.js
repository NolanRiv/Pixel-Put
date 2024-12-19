export default class VictoryScreen {
  constructor(players) {
      this.players = players;
  }

  show() {
      const container = document.getElementById("game-container");
      container.innerHTML = `
          <div id="victory-screen">
              <h1>🎉 Fin de la partie 🎉</h1>
              <table>
                  <thead>
                      <tr>
                          <th>Joueur</th>
                          ${Array.from({ length: this.players[0].scores.length }, (_, i) => `<th>Trou ${i + 1}</th>`).join("")}
                          <th>Total</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${this.players.map(player => {
                          const total = player.scores.reduce((acc, val) => acc + val, 0);
                          return `
                              <tr>
                                  <td>${player.color.toUpperCase()}</td>
                                  ${player.scores.map(score => `<td>${score}</td>`).join("")}
                                  <td>${total}</td>
                              </tr>`;
                      }).join("")}
                  </tbody>
              </table>
              <button id="restart-button">Rejouer</button>
          </div>
      `;

      document.getElementById("restart-button").addEventListener("click", () => {
          window.location.reload();
      });
  }
}