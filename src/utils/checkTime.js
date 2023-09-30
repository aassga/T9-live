var lastTime = new Date().getTime();
var currentTime = new Date().getTime();
var timeOut = 3 * 60 * 1000; //设置超时时间： 30分

window.onload = function () {
  window.document.onmousedown = function () {
    // localStorage.setItem("lastTime", new Date().getTime());
    lastTime = new Date().getTime();
  }
};  
function checkTimeout() {
  currentTime = new Date().getTime(); //更新当前时间
  // lastTime = localStorage.getItem("lastTime");
  if (currentTime - lastTime > timeOut) { //判断是否超时
    console.log("超时");
    var url = window.location.href;
    var newUrl = url.match(/(\S*)#/)[1];
    window.open(newUrl + '#/Loading', '_self');
    lastTime = new Date().getTime();
    console.log('重製',lastTime)
  }
}

window.setInterval(checkTimeout, 1000);