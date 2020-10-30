const textW = 400
const textH = 450
const WINDOW_WIDTH = 800
const WINDOW_HEIGHT = 600
const RADIUS = 2
const coordinates = []
const colors = ['orangered', 'orange']
const canvas = document.getElementById('canvas')
let clickFlag = false
let isBack = false
let outTime = null
let backTime = null
let balls = []
window.onload = function () {
  canvas.width = WINDOW_WIDTH
  canvas.height = WINDOW_HEIGHT
  const cxt = canvas.getContext('2d')
  drawText('S')
  // 显示字母S
  function drawText (text) {
    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
    cxt.fillStyle = '#ff1111'
    cxt.textAlign = 'center'
    cxt.font = 'bold 400px Arial'
    cxt.fillText(text, textW, textH)
    getTextCoordinates()
    // addBall()
    render(cxt)
    // 初始向外扩散
    if (!isBack) {
      addBall()
    }
  }
  ballOut()

  // function stopBubble (e) {
  //   //如果提供了事件对象，则这是一个非IE浏览器 
  //   if (e && e.stopPropagation)
  //     //因此它支持W3C的stopPropagation()方法 
  //     e.stopPropagation();
  //   else
  //     //否则，我们需要使用IE的方式来取消事件冒泡 
  //     window.event.cancelBubble = true;
  // }

  canvas.onclick = function () {
    if (!clickFlag) {
      return
    }
    clickFlag = false
    if (!isBack) {
      addBall()
      ballOut()
    } else {
      backTime = setInterval(() => {
        updateBalls(false)
        render(cxt)
      }, 60)
      setTimeout(() => {
        clearInterval(backTime)
        clickFlag = true
        isBack = false
      }, 1000)
    }
  }

  // window.onkeydown = function (e) {
  //   // cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
  //   const value = document.getElementById('inputText').value
  //   if (e.code == 'Enter') {
  //     console.log(value);
  //     drawText(value)
  //   }
  // }

  // 初始向外扩散
  function ballOut () {
    outTime = setInterval(() => {
      updateBalls(true)
      render(cxt)
    }, 60)
    setTimeout(() => {
      clearInterval(outTime)
      clickFlag = true
      isBack = true
    }, 1000)
  }

  // 显示字母的坐标{x,y}
  function getTextCoordinates () {
    let imgData, x, y
    imgData = cxt.getImageData(0, 0, textW, textH).data
    for (let i = 0; i < imgData.length; i += 4) {
      const element = imgData[i]
      if (element !== 0) {
        x = (i / 4) % textW
        y = Math.floor(i / 4 / textW)
        if (x % (RADIUS * 2 + 3) == 0 && y % (RADIUS * 2 + 3) == 0) {
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
        // balls[i].vy += balls[i].g
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
        // balls[i].vy += balls[i].g
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
        x: coordinates[i].x,
        y: coordinates[i].y,
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