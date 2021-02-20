//创建一个元素，放所有的小圆
var circleBox = document.createElement('div');
//获取随机数   from 参数表示从哪个数开始  to参数表示到哪个数结束 from<= num <= to
function randomNum(from, to) {
  from = Number(from);
  to = Number(to);
  var Range = to - from;
  var num = from + Math.round(Math.random() * Range); //四舍五入
  return num;
}

for (var i = 0; i < 40; i++) {
  //创建小圆
  var circle = document.createElement('div');
  // 下面的4个变量 代表小圆随机位置  和 随机持续时间和延迟
  var bottom = randomNum(-300, -250);
  var left = randomNum(-200, 200);
  var duration = randomNum(10, 30) / 10;
  var delay = randomNum(0, 50) / 10;
  //给生成的每个小圆 加上动画和位置属性
  circle.style.cssText += `animation:move ${duration}s linear ${delay}s infinite;bottom:${bottom}px;left:${left}px;`;
  circle.className += 'dot';
  //把每个小圆 都加入这个div
  circleBox.appendChild(circle);
}

var fire = document.querySelector('.fire');
//把有40个随机小圆的 div 加入DOM树
fire.appendChild(circleBox);
