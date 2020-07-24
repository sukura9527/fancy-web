var canvas = document.getElementById("canvas"),
	circles = [],
	context = canvas.getContext("2d");
init();
function init() {
	createCirclesInfo();
	setInterval(update, 1000 / 60);
}

function createCirclesInfo() {
	for (var i = 0; i < 100; ++i) {
		r = (Math.random() * 255).toFixed(0);
		g = (Math.random() * 255).toFixed(0);
		b = (Math.random() * 255).toFixed(0);
		a = (0.5 + Math.random() * 0.5).toFixed(1);
		circles[i] = {
			x: context.canvas.width * Math.random(),
			y: context.canvas.width * Math.random(),
			vx: 4 * Math.random() - 2,
			vy: 4 * Math.random() - 2,
			r: 50 * Math.random() + 10,
			color: `rgba(${r},${g},${b},${a})`,
		};
	}
}

function update() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	circles.forEach((circle) => {
		context.beginPath();
		context.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2, false);
		context.fillStyle = circle.color;
		context.fill();
		move(circle);
	});
}
function move(circle) {
	if (
		circle.x + circle.vx + circle.r > context.canvas.width ||
		circle.x + circle.vx + circle.r < 0
	) {
		circle.vx = -circle.vx;
	}
	if (
		circle.y + circle.vy + circle.r > context.canvas.width ||
		circle.y + circle.vy + circle.r < 0
	) {
		circle.vy = -circle.vy;
	}
	circle.x += circle.vx;
	circle.y += circle.vy;
}
