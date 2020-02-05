var canvas, ctx;
var mouseX,
    mouseY,
    mouseDown = 0;
var touchX, touchY;

function drawDot(ctx, x, y, size) {
    r = 0;
    g = 0;
    b = 0;
    a = 255;
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a / 255 + ")";

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function clearCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function sketchpad_mouseDown() {
    mouseDown = 1;
    drawDot(ctx, mouseX, mouseY, 12);
}

function sketchpad_mouseUp() {
    mouseDown = 0;
}

function sketchpad_mouseMove(e) {
    getMousePos(e);
    if (mouseDown == 1) {
        drawDot(ctx, mouseX, mouseY, 12);
    }
}

function getMousePos(e) {
    if (!e) var e = event;

    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    } else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
}

function sketchpad_touchStart() {
    getTouchPos();
    drawDot(ctx, touchX, touchY, 12);
    event.preventDefault();
}

function sketchpad_touchMove(e) {
    getTouchPos(e);
    drawDot(ctx, touchX, touchY, 12);
    event.preventDefault();
}

function getTouchPos(e) {
    if (!e) var e = event;

    if (e.touches) {
        if (e.touches.length == 1) {
            var touch = e.touches[0];
            touchX = touch.pageX - touch.target.offsetLeft;
            touchY = touch.pageY - touch.target.offsetTop;
        }
    }
}

function init() {
    canvas = document.getElementById("sketchpad");
    if (canvas.getContext) ctx = canvas.getContext("2d");
    if (ctx) {
        canvas.addEventListener("mousedown", sketchpad_mouseDown, false);
        canvas.addEventListener("mousemove", sketchpad_mouseMove, false);
        window.addEventListener("mouseup", sketchpad_mouseUp, false);
        canvas.addEventListener("touchstart", sketchpad_touchStart, false);
        canvas.addEventListener("touchmove", sketchpad_touchMove, false);
    }
}

function save() {
	const API_URL = 'receive_img.php';
    var dataURL = canvas.toDataURL();
    
    // Remove this in prod
    console.log(dataURL);


    // Test API
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
            var response = JSON.parse(this.responseText);
           
            // To Remove on prod
            console.log(response.status);

            if (response.status === true) {
                //show success
				clearCanvas(canvas, ctx);
				console.log("Save Ok. Filename: " + response.filename);
				
				var element = document.getElementById("response-correct-container");
                element.classList.remove("reverse-active");
                var element = document.getElementById("response-correct-wrapper");
                element.classList.remove("inactive");
                var element = document.getElementById("response-correct-container");
                element.classList.add("correct-active");
                var element = document.getElementById("response-correct-wrapper");
                element.classList.add("correct-wrapper");
            } else {
                //show try again
				console.log(response.error);
				var element = document.getElementById("response-incorrect-container");
                element.classList.remove("reverse-active");
                var element = document.getElementById("response-incorrect-wrapper");
                element.classList.remove("inactive");
                var element = document.getElementById("response-incorrect-container");
                element.classList.add("incorrect-active");
                var element = document.getElementById("response-incorrect-wrapper");
                element.classList.add("incorrect-wrapper");
            };
        }
    };
    xmlhttp.open("POST", API_URL, true);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify( { imgBase64Data: dataURL } ));
    
    
}
