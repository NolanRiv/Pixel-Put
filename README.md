# Pixel Golf Put - README

## Description du Projet
**Pixel Golf Put** est un jeu de golf 2D, multijoueur local, vu du dessus et jouable en tour par tour. Conçu avec une progression en 20 niveaux, il mélange habilement réflexion stratégique et mécaniques de jeu variées telles que les boosters, les téléporteurs et les terrains interactifs.

Le jeu évolue en quatre phases de difficulté, en introduisant progressivement de nouvelles mécaniques :
- **Niveaux 1-5** : Introduction des bases (boosters et obstacles simples).
- **Niveaux 6-10** : Complexité croissante avec téléporteurs.
- **Niveaux 11-16** : Combinaison des mécaniques vues.
- **Niveaux 17-20** : Défis finaux exploitant toutes les mécaniques disponibles.

---

## Fonctionnalités Principales
- **Multijoueur local** : Jouez à deux en tour par tour.
- **Progression de niveaux** : 20 niveaux uniques avec des mécaniques variées.
- **Mécaniques interactives** :
  - Boosters : Accélèrent la balle.
  - Téléporteurs : Déplacent instantanément la balle.
  - Terrains spéciaux : Zones avec du vent ou du sable, influençant la trajectoire.
- **Effets visuels et sonores** :
  - Animations pour les interactions.
  - Bruitages pour les collisions, boosters, etc.
- **Interface claire** : HUD réactif avec affichage des scores.

---

## Instructions pour Jouer
### **Règles du Jeu**
- Chaque joueur joue son tour en visant et tirant la balle.
- Le but est d'atteindre le **trou** avec le moins de coups possible.
- Faites attention aux obstacles et utilisez stratégiquement les éléments interactifs du terrain.

### **Contrôles**
1. **Cliquez et maintenez le clic gauche** sur la balle pour viser.
2. **Relâchez** pour tirer la balle.
3. Les joueurs jouent **alternativement**.

### **Conditions de Victoire**
- Le joueur avec le **score total le plus faible** à la fin des 20 niveaux gagne la partie.

---

## Difficultés Rencontrées & Solutions
### **1. Conception des Niveaux**
- **Problème** : Rendre les niveaux intéressants et progressifs.
- **Solution** :
  - Découpage en phases pour introduire progressivement les mécaniques.
  - Combinaison d'obstacles, terrains et téléporteurs pour varier les stratégies.

### **2. Gestion des Terrains Interactifs**
- **Problème** : Les terrains comme le vent ne produisaient pas d'effet.
- **Solution** :
  - Vérification des collisions entre la balle et les terrains.
  - Application de forces sur la balle en fonction des propriétés du terrain (forceX et forceY).

### **3. Affichage du Tableau des Scores**
- **Problème** : Le tableau des scores débordait de l'écran.
- **Solution** :
  - Utilisation de `table-layout: fixed` et ajustement des styles CSS pour garantir un affichage responsive et propre.

---

## Technologies Utilisées
- **HTML5** : Structure principale.
- **CSS3** : Style et animations.
- **JavaScript (ES6)** : Logique du jeu.
- **GitHub Pages** : Hébergement gratuit du projet.

---

## Hébergement
Le projet est accessible gratuitement via **GitHub Pages** :
[**Lien vers le jeu**](https://NolanRiv.github.io/Pixel-Put/)

---

## Installation Locale
1. **Clonez le projet** :
   ```bash
   git clone https://github.com/NolanRiv/Pixel-Put.git
   ```
2. **Ouvrez `index.html`** dans un navigateur web.
