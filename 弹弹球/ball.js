/* 
屏幕可见的高度
window.innerHeight 
屏幕可见的宽度
window.innerWidth*/

var vx = [],
    vy = [],
    X = [],
    Y = [];
var balls;
const maxWidth = window.innerWidth - 100,
    maxHeight = window.innerHeight - 100;
/* 创建小球 */
document.getElementById("biu").onclick = function () {
    const element = document.createElement("div");
    element.setAttribute("class", "ball");
    document.body.appendChild(element);

    element.style.left =
        parseInt(Math.round(Math.random() * (window.innerWidth - 100))) + "px";
    element.style.top =
        parseInt(Math.round(Math.random() * (window.innerHeight - 100))) + "px";

    /* 随机色 */
    let r = Math.floor(Math.random() * 255),
        g = Math.floor(Math.random() * 255),
        b = Math.floor(Math.random() * 255);
    let ballColor = "rgba(" + r + "," + g + "," + b + ",0.8)";
    element.style.backgroundColor = ballColor;
    /*    getBalls(); */
};
(function getBalls() {
    //获取所有的球
    balls = document.getElementsByClassName("ball");
    for (var i = 0; i < balls.length; i++) {
        const ball = balls[i];
        if (!vx[i]) {
            vx[i] = Math.floor(Math.random() * 20);
            vy[i] = Math.floor(Math.random() * 20);
            X[i] = parseInt(ball.style.left);
            Y[i] = parseInt(ball.style.top);
        }
        moveBall(i, ball);
        /* console.log(vx[i], vy[i], "======", X[i], Y[i]); */
        setTimeout(() => {
            ball.style.display = "none";
        }, 5000);
    }
    requestAnimationFrame(getBalls);
})();

function moveBall(i, ball) {
    console.log(maxHeight, maxWidth);
    X[i] += vx[i];
    Y[i] += vy[i];
    if (X[i] > maxWidth) {
        X[i] = maxWidth;
        vx[i] = -vx[i];
        // console.log(vx[i], vy[i], "======", X[i], Y[i]);
    } else if (X[i] < 0) {
        X[i] = 0;
        vx[i] = -vx[i];
        // console.log(vx[i], vy[i], "======", X[i], Y[i]);
    }
    if (Y[i] > maxHeight) {
        Y[i] = maxHeight;
        vy[i] = -vy[i];
        // console.log(vx[i], vy[i], "======", X[i], Y[i]);
    } else if (Y[i] < 0) {
        Y[i] = 0;
        vy[i] = -vy[i];
        // console.log(vx[i], vy[i], "======", X[i], Y[i]);
    }
    ball.style.left = X[i] + "px";
    ball.style.top = Y[i] + "px";
    /* ball.style.transform = `translateX(${X[i]}px) translateY(${Y[i]}px)`; */
}
