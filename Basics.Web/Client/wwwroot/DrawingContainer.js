let ctx;
let width;
let height;

function setup(name)
{
    let canvas = document.getElementById(name);
    width = canvas.width;
    height = canvas.height;

    ctx = canvas.getContext('2d');
    clearCanvas();
}

function clearCanvas()
{
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
}

function drawPointNormalized(x, y, size)
{
    drawPoint(width * x, height * y, size);
}

function drawPoint(x, y, size)
{
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x, height - y, size * 0.5, 0, 2 * Math.PI);
    ctx.fill();
}

function drawVectorNormalized(xto, yto, size)
{
    drawVector(width * xto, height * yto, size * width)
}

function drawVector(xto, yto, size)
{
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

function drawRayNormalized(ray, size)
{
    ray.origin.x *= width;
    ray.origin.y *= height;
    ray.direction.x *= height * 0.1;
    ray.direction.y *= height * 0.1;
    
    drawRay(ray, size * width)
}

function drawRay(ray, size)
{
    ctx.strokeStyle = '#aff';

    let angle = Math.atan2(ray.direction.y, ray.direction.x);
    let angleLeft = angle + Math.PI + (15 * Math.PI / 180);
    let angleRight = angle + Math.PI - (15 * Math.PI / 180);

    ctx.beginPath();
    var endPoint = { x: ray.origin.x + ray.direction.x, y: ray.origin.y + ray.direction.y };
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

function drawLineNormalized(xfrom, yfrom, xto, yto)
{
    drawLine(width * xfrom, height * (1 - yfrom), width * xto, height * (1 - yto))
}

function drawLine(xfrom, yfrom, xto, yto)
{
    ctx.moveTo(xfrom, height - yfrom);
    ctx.lineTo(xto, height - yto);
}

window.DrawingFunctions = {
    Setup: (name) => { setup(name); },
    Clear: () => { clearCanvas(); },
    DrawPointNormalized: (x, y, size = 3) => { drawPointNormalized(x, y, size); },
    DrawPoint: (x, y, size = 3) => { drawPoint(x, y, size); },
    DrawPoints: (points, size = 3) =>
    {
        for(let point of points)
            drawPoint(point.x, point.y, size);
    },
    DrawVectorNormalized: (x, y, size = 0.025) => { drawVectorNormalized(x, y, size); },
    DrawVector: (x, y, size = 0.025) => { drawVector(x, y, size); },
    DrawRayNormalized: (ray, size = 0.025) => { drawRayNormalized(ray, size); },
    DrawRay: (ray, size = 0.025) => { drawRay(ray, size); },
    DrawRays: (rays, size = 0.025) =>
    {
        for (let ray of rays)
            drawRay(ray, size);
    },
};