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

function drawVector(xto, yto, size) {
    ctx.strokeStyle = '#fff';

    let angle = Math.atan2(yto, xto);
    let angleLeft = angle + Math.PI + (15 * Math.PI / 180);
    let angleRight = angle + Math.PI - (15 * Math.PI / 180);

    ctx.beginPath();
    drawLine(0, 0, xto, yto);
    ctx.stroke();

    ctx.beginPath();
    let arrowX = xto + Math.cos(angleLeft) * size;
    let arrowY = yto + Math.sin(angleLeft) * size;
    drawLine(xto, yto, arrowX, arrowY);
    ctx.stroke();

    ctx.beginPath();
    arrowX = xto + Math.cos(angleRight) * size;
    arrowY = yto + Math.sin(angleRight) * size;
    drawLine(xto, yto, arrowX, arrowY);
    ctx.stroke();
}

function drawRay(ray, size) {
    ctx.strokeStyle = '#aff';

    let angle = Math.atan2(ray.direction.y, ray.direction.x);
    let angleLeft = angle + Math.PI + (15 * Math.PI / 180);
    let angleRight = angle + Math.PI - (15 * Math.PI / 180);

    ctx.beginPath();
    var endPoint = { x: ray.origin.x + ray.direction.x * 0.1, y: ray.origin.y + ray.direction.y * 0.1 };
    drawLine(ray.origin.x, ray.origin.y, endPoint.x, endPoint.y);
    ctx.stroke();

    ctx.beginPath();
    let arrowX = endPoint.x + Math.cos(angleLeft) * size;
    let arrowY = endPoint.y + Math.sin(angleLeft) * size;
    drawLine(endPoint.x, endPoint.y, arrowX, arrowY);
    ctx.stroke();

    ctx.beginPath();
    arrowX = endPoint.x + Math.cos(angleRight) * size;
    arrowY = endPoint.y + Math.sin(angleRight) * size;
    drawLine(endPoint.x, endPoint.y, arrowX, arrowY);
    ctx.stroke();
}

function drawLine(xfrom, yfrom, xto, yto) {
    ctx.moveTo(width * xfrom, height * (1 - yfrom));
    ctx.lineTo(width * xto, height * (1 - yto));
}

window.DrawingFunctions = {
    Setup: (name) => { loadScene(name); },
    DrawPoint: (x, y, size = 3) => { drawPoint(x, y, size); },
    DrawVector: (x, y, size = 0.025) => { drawVector(x, y, size); },
    DrawRay: (ray, size = 0.025) => { drawRay(ray, size); },
};