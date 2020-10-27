let ctx;
let width;
let height;

function loadScene(name) {
    let canvas = document.getElementById(name);
    width = canvas.width;
    height = canvas.height;

    ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
}

function drawPoint(x, y, size) {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(width * x, height * (1 - y), size * 0.5, 0, 2 * Math.PI);
    ctx.fill();
}

window.DrawingFunctions = {
    Setup: (name) => { loadScene(name); },
    DrawPoint: (x, y, size = 3) => { drawPoint(x, y, size); },
};