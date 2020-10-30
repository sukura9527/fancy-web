const textW = 450
const textH = 450
const WINDOW_WIDTH = 800
const WINDOW_HEIGHT = 600
const RADIUS = 2
const TIME = 1000

const colors = ['orangered', 'orange']
const canvas = document.getElementById('canvas')
const textCanvas = document.getElementById('textCanvas')
let isBacked = true
let outTime = null
let backTime = null
let balls = []
let entered = false
let coordinates = []
window.onload = function () {
  canvas.width = WINDOW_WIDTH
  canvas.height = WINDOW_HEIGHT
  const cxt = canvas.getContext('2d')
  const cxtText = canvas.getContext('2d')
  drawText('S')  // 显示字母S
  ballOut()
  setTimeout(() => {
    ballBack()
  }, 2 * TIME);
  function drawText (text) {
    cxtText.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
    cxtText.fillStyle = '#ff1111'
    cxtText.textAlign = 'center'
    cxtText.font = 'bold 400px Arial'
    cxtText.fillText(text, 300, 300)
    getTextCoordinates()
    render(cxt)
    addBall()
  }

  // 按下回车
  window.onkeydown = function (e) {
    if (entered) {
      return
    }
    if (isBacked) {
      cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
      coordinates = []
      balls = []
      const value = document.getElementById('inputText').value
      if (e.code == 'Enter') {
        console.log(value, coordinates, balls);
        drawText(value)
        ballOut()
        setTimeout(() => {
          ballBack()
        }, 2 * TIME);
      }
    } else {
      ballBack()
      setTimeout(() => {
        cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
        coordinates = []
        balls = []
        const value = document.getElementById('inputText').value
        if (e.code == 'Enter') {
          console.log(value, coordinates, balls);
          drawText(value)
          ballOut()
          setTimeout(() => {
            ballBack()
          }, 2 * TIME);
        }
      }, TIME);
    }
    setTimeout(() => {
      entered = false
    }, 2 * TIME);
  }
  //向内聚拢
  function ballBack () {
    clearInterval(backTime)
    backTime = setInterval(() => {
      updateBalls(false)
      render(cxt)
    }, 60)
    setTimeout(() => {
      clearInterval(backTime)
      isBacked = true
    }, TIME)
  }
  // 向外扩散
  function ballOut () {
    clearInterval(outTime)
    outTime = setInterval(() => {
      updateBalls(true)
      render(cxt)
    }, 60)
    setTimeout(() => {
      clearInterval(outTime)
      isBacked = false
    }, TIME)
  }

  // 显示字母的坐标{x,y}
  function getTextCoordinates () {
    let imgData, x, y
    imgData = cxtText.getImageData(0, 0, textW, textH).data
    for (let i = 0; i < imgData.length; i += 4) {
      const element = imgData[i]
      if (element !== 0) {
        x = (i / 4) % textW
        y = Math.floor(i / 4 / textW)
        if (x % (RADIUS * 2 + 4) == 0 && y % (RADIUS * 2 + 4) == 0) {
          coordinates.push({ x: x, y: y })
        }
      }
    }
  }

  // 元素渲染
  function render (cxt) {
    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
    for (let i = 0; i < balls.length; i++) {
      cxt.fillStyle = balls[i].color
      cxt.beginPath()
      cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI)
      cxt.closePath()
      cxt.fill()
    }
    console.log(balls.length)
  }

  // 小球状态更新
  function updateBalls (value) {
    if (value == true) {
      for (let i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx
        balls[i].y += balls[i].vy
        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
          balls[i].y = WINDOW_HEIGHT - RADIUS
          balls[i].vy = -balls[i].vy * 0.5
        }
        if (balls[i].x >= WINDOW_WIDTH - RADIUS) {
          balls[i].x = WINDOW_WIDTH - RADIUS
          balls[i].vx = -balls[i].vx * 0.5
        }
      }
    } else if (value == false) {
      for (let i = 0; i < balls.length; i++) {
        balls[i].x -= balls[i].vx
        balls[i].y -= balls[i].vy
        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
          balls[i].y = WINDOW_HEIGHT - RADIUS
          balls[i].vy = -balls[i].vy * 0.5
        }
        if (balls[i].x >= WINDOW_WIDTH - RADIUS) {
          balls[i].x = WINDOW_WIDTH - RADIUS
          balls[i].vx = -balls[i].vx * 0.5
        }
      }
    }
  }
  //添加小球
  function addBall () {
    balls = []
    for (let i = 0; i < coordinates.length; i++) {
      let aBall = {
        x: coordinates[i].x + 10,
        y: coordinates[i].y + 10,
        vx: Math.floor(
          Math.random() *
          8 *
          Math.pow(-1, Math.floor(Math.random() * 1000))
        ),
        vy: Math.floor(
          Math.random() *
          10 *
          Math.pow(-1, Math.floor(Math.random() * 1000))
        ),
        // endX: Math.floor(Math.random() * 800),
        // endY: Math.floor(Math.random() * 600),
        // time: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      }
      balls.push(aBall)
    }
  }
}