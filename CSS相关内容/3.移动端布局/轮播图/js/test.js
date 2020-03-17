(function() {

  // 实现轮播图
  // 1.实现定时轮播的效果  2.实现无缝轮播 3.实现触屏轮播

  bannerFl();

  function bannerFl() {
    let banner = document.querySelector(".floatBanner")
    let ul = document.querySelector(".floatBanner ul")
    let width = banner.offsetWidth;
    console.log(ul)
    console.log(width)
    // 要是实现动画，首要的是需要找到一个变量与做动画的之间的关系
    let index = 1; //index最好是1 因为第一张是假图片，此时的ul为了将真正的第一张图片放在baner的位置已经移动了一个width的宽度了
    let timer = setInterval(function() {
      index--
      console.log(index)
      ul.style.transition = "transform .3s"
      ul.style.transform = `translateX(-${(index * width)}px)`

      if (index >= 9) {
        index = 1;
        ul.style.transition = "none"
        ul.style.transform = `translateX(-${(index * width)}px)`
        
      }
      if (index < 0) {
        index = 8;
        ul.style.transition = "none"
        ul.style.transform = `translateX(-${(index * width)}px)`
      }
    },1000)

  }

})();