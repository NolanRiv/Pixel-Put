export default class Renderer {
    constructor(ctx, game) {
      this.ctx = ctx;
      this.game = game;
    }

    renderHUD() {
        const ctx = this.ctx;
    
        // Dessine le HUD
        const currentPlayer = this.game.playerManager.getCurrentPlayer();
        ctx.save();
        ctx.font = "16px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(`Au tour de : ${currentPlayer.color.toUpperCase()}`, 10, 20);
    
        let yOffset = 40;
        this.game.playerManager.players.forEach(player => {
          ctx.fillText(`${player.color.toUpperCase()} : ${player.shots} coups`, 10, yOffset);
          yOffset += 20;
        });
        ctx.restore();
      }    
      
    renderBackground() {
      const bg = this.game.assetsManager.getImage("level_background");
      if (bg) {
        this.ctx.drawImage(bg, 0, 0, this.game.canvas.width, this.game.canvas.height);
      }
    }      
  
    render() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  
      this.renderBackground();
      this.game.terrainManager.render(this.ctx);
      this.game.boosterManager.render(this.ctx);
      this.game.teleporterManager.render(this.ctx);
      this.game.obstacleManager.render(this.ctx);
      this.game.playerManager.render(this.ctx);

      this.renderHUD(this.ctx, this.game.players, this.game.playerManager.getCurrentPlayer());
  
      // Goal
      this.ctx.beginPath();
      this.ctx.arc(this.game.goal.x, this.game.goal.y, this.game.goal.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = "black";
      this.ctx.fill();
    }
  }  