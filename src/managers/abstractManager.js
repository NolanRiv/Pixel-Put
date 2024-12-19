export default class AbstractManager {
    constructor(items = []) {
      this.items = items; // Liste d'éléments gérés
    }
  
    // Appliquer une mise à jour à chaque élément
    update(callback) {
      this.items.forEach(item => callback(item));
    }
  
    // Rendre chaque élément
    render(ctx, renderCallback) {
      this.items.forEach(item => renderCallback(ctx, item));
    }
  
    // Ajouter un nouvel élément
    add(item) {
      this.items.push(item);
    }
  
    // Réinitialiser les éléments
    reset(items = []) {
      this.items = items;
    }
  }  