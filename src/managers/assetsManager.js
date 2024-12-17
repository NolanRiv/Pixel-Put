export default class AssetsManager {
    constructor() {
      this.images = {};
    }
  
    loadImages(imagePaths) {
      return Promise.all(
        Object.entries(imagePaths).map(([key, path]) => {
          return new Promise(resolve => {
            const img = new Image();
            img.src = path;
            img.onload = () => {
              this.images[key] = img;
              resolve();
            };
          });
        })
      );
    }
  
    getImage(name) {
      return this.images[name];
    }
  }  