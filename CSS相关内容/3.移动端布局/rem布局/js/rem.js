(function () {
  //动态设置rem的值
  // 在设计稿640px 情况 ，设置1rem = 100px 
  // 推算1rem 在其他屏幕 取值 
  // 根据媒体查询检测当前屏幕宽度，根据宽取设置rem的值   
  //当前值 = 当前屏幕宽度/640*100
  //design 设计稿宽
  

  function setRem(design) {
    let width = window.innerWidth;

    if (width > design) {
      width = design;
    }
    if (width < 320) {
      width = 320;
    }

    document.querySelector("html").style.fontSize = width/design * 10 + "px";
  }
  setRem(750)
  window.addEventListener('resize',() => {
    setRem(750)
  })
  
})();