var context;

var i;

function draw(id) {
	var canvas = document.getElementById(id);

	if (canvas == null) return false;

	context = canvas.getContext("2d");

	context.fillStyle = "#EEEEFF";

	context.fillRect(0, 0, 300, 300);

	i = 1;

	setInterval(go, 20);
}

function go() {
	context.strokeStyle = "red";

	context.lineWidth = 2;

	var dig = Math.PI / 256;

	x = 150 + 100 * Math.sin(2 * i * dig);

	y = 150 - 100 * Math.sin(3 * i * dig);

	context.beginPath();

	context.arc(x, y, 3, 0, 2 * Math.PI);

	context.fillStyle = "red";

	context.fill();

	i = i + 1;

	if (i > 512) {
		i = 1;

		context.clearRect(0, 0, 300, 300);
	}
}
