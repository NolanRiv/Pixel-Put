document.addEventListener("DOMContentLoaded", () => {
  const instructionsScreen = document.createElement("div");
  instructionsScreen.id = "instructions";
  instructionsScreen.className = "menu-screen";
  instructionsScreen.style.display = "none";

  instructionsScreen.innerHTML = `
    <h2>Instructions</h2>
    <p>
      Bienvenue dans Golf Pixel Put !<br/>
      - Cliquez et faites glisser pour tirer.<br/>
      - Atteignez le but avec le moins de coups possible.<br/>
      - Évitez les obstacles et utilisez les boosters pour progresser.<br/>
    </p>
    <button id="back-to-menu">Retour</button>
  `;
  document.body.appendChild(instructionsScreen);

  // Bouton pour revenir au menu principal
  document.getElementById("back-to-menu").addEventListener("click", () => {
    instructionsScreen.style.display = "none";
    document.getElementById("main-menu").style.display = "flex";
  });
});