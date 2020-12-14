const WINDOW_WIDTH = 1024
const WINDOW_HEIGHT = 400
const RADIUS = 8
const MARGIN_TOP = 60
const MARGIN_LEFT = 30

let endTime = new Date(2020, 12, 29, 23, 59, 59)
let curSecond = 0
let balls = []
const colors = ['chartreuse', 'red', 'aqua', 'bule', 'yellowgreen', 'black', 'green']
window.onload = function () {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')
  canvas.width = WINDOW_WIDTH
  canvas.height = WINDOW_HEIGHT
  curSecond = getCurSecond()
  setInterval(() => {
    render(context)
    update()
  }, 50);

}
function getCurSecond () {
  let curTime = new Date()
  let ret = Math.round((endTime.getTime() - curTime.getTime()) / 1000)
  return ret > 0 ? ret : 0
}
function update () {
  let nextSecond = getCurSecond()
  const hour = parseInt(curSecond / 3600)
  const minute = parseInt((curSecond - hour * 3600) / 60)
  const second = curSecond % 60
  const _hour = parseInt(nextSecond / 3600)
  const _minute = parseInt((nextSecond - _hour * 3600) / 60)
  const _second = nextSecond % 60
  if (_second != second) {
    if (parseInt(_hour / 10) != parseInt(hour / 10)) {
      addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(hour / 10))
    }
    if (parseInt(_hour % 10) != parseInt(hour % 10)) {
      addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hour % 10))
    }
    if (parseInt(_minute / 10) != parseInt(minute / 10)) {
      addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minute / 10))
    }
    if (parseInt(_minute % 10) != parseInt(minute % 10)) {
      addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minute % 10))
    }
    if (parseInt(_second / 10) != parseInt(second / 10)) {
      addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(second / 10))
    }
    if (parseInt(_second % 10) != parseInt(second % 10)) {
      addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(second % 10))
    }
    curSecond = nextSecond
  }
  updateBalls()
}
function updateBalls () {
  console.log('11111111', balls.length);
  for (let i = 0; i < balls.length; i++) {
    balls[i].x += balls[i].vx
    balls[i].y += balls[i].vy
    balls[i].vy += balls[i].g
    if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
      balls[i].y = WINDOW_HEIGHT - RADIUS
      balls[i].vy = -balls[i].vy * 0.5
    }
    // if (balls[i].x >= WINDOW_WIDTH - RADIUS) {
    //   balls[i].x = WINDOW_WIDTH - RADIUS
    //   balls[i].vx = -balls[i].vx
    // }
  }
  let ballNum = 0
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH) {
      balls[ballNum++] = balls[i]
      console.log('2222222222222222', balls.length);
    }
  }
  while (balls.length > Math.min(300, ballNum)) {
    balls.pop()
  }
}
function addBalls (x, y, num) {
  for (let i = 0; i < digit[num].length; i++)
    for (let j = 0; j < digit[num][i].length; j++)
      if (digit[num][i][j] == 1) {
        let aBall = {
          x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
          y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
          g: 1.5 + Math.random(),
          vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
          vy: -5,
          color: colors[Math.floor(Math.random() * colors.length)]
        }
        balls.push(aBall)
      }
}

function render (cxt) {
  cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
  const hour = parseInt(curSecond / 3600)
  const minute = parseInt((curSecond - hour * 3600) / 60)
  const second = curSecond % 60
  renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hour / 10), cxt)
  renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hour % 10), cxt)
  renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt)
  renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minute / 10), cxt)
  renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minute % 10), cxt)
  renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt)
  renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(second / 10), cxt)
  renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(second % 10), cxt)
  for (let i = 0; i < balls.length; i++) {
    cxt.fillStyle = balls[i].color
    cxt.beginPath()
    cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true)
    cxt.closePath()
    cxt.fill()
  }

}
function renderDigit (x, y, num, cxt) {
  cxt.fillStyle = 'rgb(0,102,153)'
  for (let i = 0; i < digit[num].length; i++)
    for (let j = 0; j < digit[num][i].length; j++)
      if (digit[num][i][j] == 1) {
        cxt.beginPath()
        cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
        cxt.closePath()
        cxt.fill()
      }
}

