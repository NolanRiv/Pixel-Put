const instructionsScreen = document.createElement("div");
instructionsScreen.id = "instructions";
instructionsScreen.className = "menu-screen";
instructionsScreen.style.display = "none";

instructionsScreen.innerHTML = `
  <div id="instructions-container">
    <h2>Instructions</h2>
    <p>
      Bienvenue dans Pixel Put !<br/>
      - Cliquez et faites glisser pour tirer.<br/>
      - Atteignez le but avec le moins de coups possible.<br/>
      - Évitez les obstacles et utilisez les boosters pour progresser.<br/>
    </p>
    <button id="back-to-menu">Retour</button>
  </div>
`;

// Ajout au DOM
document.body.appendChild(instructionsScreen);

// Gestion du bouton "Retour"
document.getElementById("back-to-menu").addEventListener("click", () => {
  instructionsScreen.style.display = "none";
  const mainMenu = document.getElementById("main-menu");
  if (mainMenu) {
    mainMenu.style.display = "flex";
  }
});