const maxNum = 60,
  maxV = 1,
  minV = 0.1,
  R = 2,
  minDis = 200
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let ball = {},
  h,
  w,
  balls = [],
  hasMouse = false,
  mouse_ball = {
    x: 100,
    y: 100,
    vx: 0,
    vy: 0,
    r: R * 2,
    color: '#ffd700',
  }
window.onload = init
function init () {
  canvas.width = w = window.innerWidth
  canvas.height = h = window.innerHeight
  createBalls()
  renderPosition()
  renderBalls()
  renderLines()
  canvas.onmouseenter = mouseenter
  canvas.onmouseleave = mouseleave
  canvas.onmousemove = mousemove
  window.requestAnimationFrame(render)
}
window.onresize = function () {
  init()
}

function render () {
  ctx.clearRect(0, 0, w, h)
  renderPosition()
  renderBalls()
  renderLines()
  window.requestAnimationFrame(render)
}
//创建粒子群
function createBalls () {
  for (let i = 0; i < maxNum; i++) {
    balls.push(create())
  }
}
//创建粒子
function create () {
  // let info = boundary[getRandomInt(0, boundary.length - 1)]
  let info = {
    x: [0, w],
    y: [0, h],
    vx: [-maxV, -minV, minV, maxV],
    vy: [-maxV, -minV, minV, maxV],
    color: 'gray',
  }
  // console.log(info)
  ball = {
    x: getRandomInt(info.x[0], info.x[1]),
    y: getRandomInt(info.y[0], info.y[1]),
    vx: getRandom(info.vx),
    vy: getRandom(info.vy),
    r: R,
    color: 'gray',
  }
  return ball
}
function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //含最大值，含最小值
}
function getRandom (a = []) {
  return a[Math.floor(Math.random() * a.length)]
}
//渲染粒子
function renderBalls () {
  for (i = 0; i < balls.length; ++i) {
    ctx.fillStyle = balls[i].color
    ctx.beginPath()
    ctx.arc(balls[i].x, balls[i].y, balls[i].r, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
  }
}
//更新检查粒子位置
function renderPosition () {
  let activeBalls = []
  for (let i = 0; i < balls.length; i++) {
    ball = balls[i]
    ball.x += ball.vx
    ball.y += ball.vy
    if (
      ball.x > -minDis &&
      ball.x < w + minDis &&
      ball.y > -minDis &&
      ball.y < h + minDis
    ) {
      activeBalls.push(ball)
    }
  }
  balls = activeBalls
  if (balls.length < maxNum) {
    balls.push(create())
  }
}
function renderLines () {
  let f, alpha
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      f = getDisOf(balls[i], balls[j]) / minDis
      if (f < 1) {
        alpha = 1 - f
        renderLine(balls[i].x, balls[i].y, balls[j].x, balls[j].y, alpha)
      }
    }
  }
}
/*线条片段*/
function renderLine (x1, y1, x2, y2, a) {
  ctx.strokeStyle = 'rgba(150,150,150,' + a + ')'
  ctx.lineWidth = 0.8
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.closePath()
}
function getDisOf (a = {}, b = {}) {
  let dx = Math.abs(a.x - b.x),
    dy = Math.abs(a.y - b.y)
  return Math.sqrt(dx * dx + dy * dy)
}
function mouseenter () {
  hasMouse = true
  balls.unshift(mouse_ball)
}
function mouseleave () {
  hasMouse = false
  balls.shift(mouse_ball)
}
function mousemove (e) {
  if (hasMouse) {
    mouse_ball.x = e.clientX
    mouse_ball.y = e.clientY
  }
}