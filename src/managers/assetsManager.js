export default class AssetsManager {
    constructor() {
      this.images = {};
      this.sounds = {};
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

    loadSounds(soundPaths) {
      return Promise.all(
        Object.entries(soundPaths).map(([key, path]) => {
          return new Promise(resolve => {
            const audio = new Audio();
            audio.src = path;
            audio.oncanplaythrough = () => {
              this.sounds[key] = audio;
              resolve();
            };
          });
        })
      );
    }

    getSound(name) {
      return this.sounds[name];
    }

    stopSound(soundName) {
      const sound = this.sounds[soundName];
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    }    

    setGlobalVolume(volume) {
      Object.values(this.sounds).forEach(sound => {
        sound.volume = volume;
      });
    }    
  }  