var $box = $(".box"),
	$allPieces,
	bgs = [
		"./imgs/p1.jpg",
		"./imgs/p2.jpg",
		"./imgs/p3.jpg",
		"./imgs/p4.jpg",
		"./imgs/p5.jpg",
	];
$(document).ready(init());
function init() {
	$box.aniCount = 0;
	$box.index = 0;
	$box.aniState = 0;
	$box.cX = $box.width() / 2;
	$box.cY = $box.height() / 2;
	$box.r = ($box.width() + $box.height()) / 4 + 50;
	$box.total = 160;
	createPieces();
	setAllPiecesStyle();
	changeAllBG();
	$(document).on("mousemove", onmousemove);
	$(document).on("click", onclick);
}

function onclick() {
	if (!$box.aniState) {
		$box.aniState++;
		$box.addClass("out");
	}
	console.log($box.aniState);
	// setTimeout(() => {
	// 	changeAllBG();
	// 	setAllPiecesStyle();
	// 	$box.removeClass("out");
	// 	$box.addClass("in");
	// 	setTimeout(() => {
	// 		$box.removeClass("in");
	// 	}, 500);
	// }, 1000);
}

function onTransitionEnd() {
	console.log("1111111111111111111");
	if (++$box.aniCount == $allPieces.length) {
		if ($box.aniState == 1) {
			$box.aniState++;
			changeAllBG();
			setAllPiecesStyle();
			$box.removeClass("out");
			$box.addClass("in");
		} else if ($box.aniState == 2) {
			$box.aniState = 0;
			$box.removeClass("in");
		}
		$box.aniCount = 0;
	}
}

function createPieces() {
	var $piece, i;
	for (let i = 0; i < $box.total; i++) {
		$piece = $('<div class="piece"></div>');
		$box.append($piece);
		$piece.on("animationend", onTransitionEnd);
	}
	$allPieces = $(".piece");
}

function setAllPiecesStyle() {
	var r = $box.r,
		levels = 5,
		nums,
		minR,
		maxR,
		w;
	nums = Math.floor($allPieces.length / levels);
	for (var i = 0; i < levels; ++i) {
		for (var j = 0; j < nums; ++j) {
			var $this = $($allPieces.get(i * nums + j));
			maxR = (r / levels) * (i + 1);
			minR = (r / levels) * i;
			w = r / (i + 1);
			setPieceStyle($this, minR, maxR, w, i);
		}
		console.log("minR,maxR,w= " + minR + " " + maxR + " " + w);
	}
}

function setPieceStyle($this, minR, maxR, maxW, z) {
	var deg, r, w, h, top, left, z;
	w = randomInt(maxW * 0.8, maxW);
	h = randomInt(maxW * 0.8, maxW);
	deg = randomInt(0, 360);
	r = randomInt(minR, maxR);
	top = $box.cY + Math.sin(deg) * r - h / 2;
	left = $box.cX + Math.cos(deg) * r - w / 2;
	$this.css({
		width: w + "",
		height: h + "",
		top: top + "px",
		left: left + "px",
		backgroundPosition: -left + "px " + -top + "px",
		animationDelay: Math.random() * 1 + "s",
	});
	$this[0].top = top;
	$this[0].left = left;
	$this[0].z = z;
}

function changeAllBG() {
	$allPieces.each(function () {
		var $this = $(this);
		$this.css({
			backgroundImage: "url(" + bgs[$box.index] + ")",
		});
	});
	if (++$box.index == bgs.length) {
		$box.index = 0;
	}
}

function onmousemove(e) {
	$box.mx = $(window).width() / 2 - e.clientX;
	$box.my = $(window).height() / 2 - e.clientY;
	$allPieces.each(move);
}
function randomInt(begin, end) {
	return Math.round(Math.random() * (end - begin) + begin);
}
function move() {
	var $this = $(this);
	var left = $this[0].left + $box.mx * 0.02 + $this[0].z;
	var top = $this[0].top + $box.my * 0.02 + $this[0].z;
	$this.css({
		top: top,
		left: left,
	});
}
