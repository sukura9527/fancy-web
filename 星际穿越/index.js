var
    h = window.innerHeight,
    w = window.innerWidth,
    colors = ['#78b6e3', '#fff', '#fffda8', '#fedc00', '#db7000', '#ad3406'];
var sky = document.getElementById("sky");
for (var i = 0; i < 30; i++) {
    var stars = document.createElement("div");
    startAnimation(stars);
    sky.appendChild(stars);
    stars.addEventListener('animationend', function(e) {
        stars.style.animation = '';
        e.target.offsetWidth; // 强制渲染页面，否则动画不会重新启动
        startAnimation(stars);

    });
}

window.onresize = function() {
    w = window.innerWidth;
    h = window.innerHeight;
};

function startAnimation(element) {
    element.style.boxShadow = setBoxShadow();
    element.style.animation = `move 5s  ease-in   infinite`;

}

function setBoxShadow() {
    var boxShadow = "";
    for (var j = 0; j < 30; j++) {
        if (j != 0) boxShadow += ',';
        var color = colors[intRandom(0, 4)],
            x = intRandom(-w, 2 * w),
            y = intRandom(-h, 2 * h),
            blur = intRandom(2, 12),
            spread = intRandom(0, 4);
        boxShadow += `${x}px ${y}px ${blur}px ${spread}px ${color}`;
    }
    return boxShadow;
}



// 生成闭区间随机整数
function intRandom(start, end) {
    if (Object.prototype.toString.call(start) !== '[object Number]')
        throw new TypeError(`${start} is not a number`);
    if (Object.prototype.toString.call(end) !== '[object Number]')
        throw new TypeError(`${end} is not a number`);
    start = Math.floor(start);
    end = Math.floor(end) + 1;
    return Math.floor(Math.random() * (end - start) + start);
}