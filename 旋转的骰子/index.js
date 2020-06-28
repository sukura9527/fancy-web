var cube = document.getElementById("cube");
var vertical = document.getElementById("vertical");
var horizontal = document.getElementById("horizontal");
cube.onmousedown = function() {
    //鼠标起始位置
    var xMouseDown = window.event.clientX;
    var yMouseDown = window.event.clientY;
    /*  console.log(xMouseDown, yMouseDown); */
    document.onmouseup = function() {
        var xMouseUp = window.event.clientX;
        var yMouseUp = window.event.clientY;
        /*  console.log(xMouseUp, yMouseUp); */
        x = xMouseUp - xMouseDown;
        y = yMouseUp - yMouseDown;
        if (Math.abs(x) > Math.abs(y)) {
            vertical.classList.remove("vertical");
            console.log("xxxxx");
            if (x < 0) {
                horizontal.classList.add("_horizontal");
                /* horizontal.classList.remove("horizontal"); */
            }
        } else {
            horizontal.classList.remove("horizontal");
            console.log("yyyyyy");
            if (y > 0) {
                vertical.classList.add("_vertical");
                /*   vertical.classList.remove("vertical"); */
            }
        }
        setTimeout(() => {
            vertical.classList.remove("_vertical");
            horizontal.classList.remove("_horizontal");
            horizontal.classList.add("horizontal");
            vertical.classList.add("vertical");
        }, 5000);
    };
};