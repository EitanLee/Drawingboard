window.οnlοad=function () {  
    document.addEventListener('touchstart',function (event) {  
        if(event.touches.length>1){  
            event.preventDefault();  
        }  
    })  
    var lastTouchEnd=0;  
    document.addEventListener('touchend',function (event) {  
        var now=(new Date()).getTime();  
        if(now-lastTouchEnd<=300){  
            event.preventDefault();  
        }  
        lastTouchEnd=now;  
    },false)  
}
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var startPaint = false;
var lastPoint = { x: undefined, y: undefined };
var lineWidth = 2;
//调整canvas大小
autoSetCanvasSize(canvas);

//监听鼠标事件
listenToUser(canvas);

// function circular(a, b) {
//     ctx.fillStyle = 'green';
//     ctx.beginPath();
//     ctx.arc(a, b, 3, 0, Math.PI * 2);
//     ctx.fill();
// }
function line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

var eraserEnabled = false;
eraser.onclick = function () {
    eraserEnabled = true;
    eraser.classList.add('active');
    brush.classList.remove('active');
}
brush.onclick = function () {
    eraserEnabled = false;
    brush.classList.add('active');
    eraser.classList.remove('active');
}
clear.onclick = function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}
download.onclick = function(){
    var url = canvas.toDataURL("image/png");
    var a = document.createElement('a');
    document.body.appendChild(a)
    a.href = url;
    a.download = 'Image';
    a.click();
}

grey.onclick = function () {
    ctx.strokeStyle = 'grey';
    grey.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    yellow.classList.remove('active');
    green.classList.remove('active');
    black.classList.remove('active');
}

red.onclick = function () {
    ctx.strokeStyle = '#E44034';
    grey.classList.remove('active');
    red.classList.add('active');
    blue.classList.remove('active');
    yellow.classList.remove('active');
    green.classList.remove('active');
    black.classList.remove('active');
}

blue.onclick = function () {
    ctx.strokeStyle = '#3879E6';
    grey.classList.remove('active');
    red.classList.remove('active');
    blue.classList.add('active');
    yellow.classList.remove('active');
    green.classList.remove('active');
    black.classList.remove('active');
}

yellow.onclick = function () {
    ctx.strokeStyle = '#F4B705';
    grey.classList.remove('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    yellow.classList.add('active');
    green.classList.remove('active');
    black.classList.remove('active');
}

green.onclick = function () {
    ctx.strokeStyle = '#33A351';
    grey.classList.remove('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    yellow.classList.remove('active');
    green.classList.add('active');
    black.classList.remove('active');
}

black.onclick = function () {
    ctx.strokeStyle = 'black';
    grey.classList.remove('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    yellow.classList.remove('active');
    green.classList.remove('active');
    black.classList.add('active');
}
thin.onclick = function(){
    lineWidth = 2;
}
thick.onclick = function(){
    lineWidth = 5;
}
function autoSetCanvasSize(canvas) {
    viewSize();
    window.onresize = function () {
        viewSize();
    }
    function viewSize() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}
function listenToUser(canvas) {
    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = function (point) {
            var x = point.touches[0].clientX;
            var y = point.touches[0].clientY;
            startPaint = true;
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10);
            } else {
                lastPoint = { x: x, y: y };
            }
            canvas.ontouchmove = function (point) {
                var x = point.touches[0].clientX;
                var y = point.touches[0].clientY;
                if (!startPaint) { return }
                // circular(x, y);
                if (eraserEnabled) {
                    ctx.clearRect(x - 5, y - 5, 10, 10);
                } else {
                    var newPoint = { x: x, y: y };
                    line(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                    lastPoint = newPoint;
                }
            }
            canvas.ontouchend = function (point) {
                startPaint = false;
            }
        }
    } else {
        canvas.onmousedown = function (point) {
            var x = point.clientX;
            var y = point.clientY;
            startPaint = true;
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10);
            } else {
                lastPoint = { x: x, y: y };
                // circular(x, y);
            }
        }
        canvas.onmousemove = function (point) {
            var x = point.clientX;
            var y = point.clientY;
            if (!startPaint) { return }
            // circular(x, y);
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10);
            } else {
                var newPoint = { x: x, y: y };
                line(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        }
        canvas.onmouseup = function (point) {
            startPaint = false;
        }
    }
}
