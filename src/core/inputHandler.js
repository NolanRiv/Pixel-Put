export default class InputHandler {
    constructor(canvas, onShootCallback) {
      this.canvas = canvas;
      this.isDragging = false;
      this.startX = 0;
      this.startY = 0;
      this.onShoot = onShootCallback;
  
      // Écouteurs d'événements souris
      this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
      this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
      this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
    }
  
    handleMouseDown(event) {
      this.isDragging = true;
      this.startX = event.offsetX;
      this.startY = event.offsetY;
    }
  
    handleMouseMove(event) {
      if (this.isDragging) {
        const currentX = event.offsetX;
        const currentY = event.offsetY;
        this.drawLine(this.startX, this.startY, currentX, currentY);
      }
    }
  
    handleMouseUp(event) {
      if (this.isDragging) {
        const endX = event.offsetX;
        const endY = event.offsetY;
        this.isDragging = false;
  
        const dx = endX - this.startX;
        const dy = endY - this.startY;
  
        const angle = Math.atan2(dy, dx);
        const power = Math.min(Math.sqrt(dx * dx + dy * dy) / 5, 20); // Limite la puissance à 10
  
        this.onShoot(angle, power);
      }
    }
  
    drawLine(x1, y1, x2, y2) {
      const ctx = this.canvas.getContext("2d");
      ctx.save();
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Supprime le tracé précédent
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }
  }  