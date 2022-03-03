class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.img = new Image();
    this.img.src = "./starryNight.jpeg";

    window.addEventListener("resize", this.resize.bind(this));
    this.resize();

    this.img.onload = () => {
      this.ctx.drawImage(this.img, 0, 0);
    };

    this.canvas.addEventListener("mousemove", (e) => this.pick(e, "moveColor"));
    this.canvas.addEventListener("click", (e) => this.pick(e, "selectedColor"));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    this.ctx.drawImage(this.img, 0, 0);
  }

  pick(event, message) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx.drawImage(this.img, 0, 0);
    const x = event.layerX;
    const y = event.layerY;
    const pixel = this.ctx.getImageData(x, y, 1, 1);
    const data = pixel.data;

    const rgba = `rgba(${data[0]},${data[1]},${data[2]},${data[3] / 255})`;
    this.ctx.font = "40px serif";
    this.ctx.fillStyle = `${rgba}`;
    this.ctx.fillText(`${message}: ${rgba}`, 10, this.img.height + 50);
  }
}

window.onload = () => {
  new App();
};
