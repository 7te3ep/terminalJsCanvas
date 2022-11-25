//Canvas.js
const c = document.getElementById("canva");
const ctx = c.getContext("2d");
let canvas = document.getElementById('canva')

canvas.width = 1600;
canvas.height = 1300;
window.devicePixelRatio = 2
ctx.font = "40px Monospace"
ctx.fillStyle = "#D3D7CF"
export {c, ctx};
