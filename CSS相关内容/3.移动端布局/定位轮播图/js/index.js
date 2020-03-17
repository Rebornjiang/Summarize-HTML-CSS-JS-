// 由于是移动端布局，高度是随着屏幕的变化而变化，不能够写死，需要动态来获取。

(function () {

  function setBannerHeight() {
    document.querySelector(".jd-banner ul").style.height = document.querySelector(".jd-banner ul li img").offsetHeight + 'px'
  }
  setBannerHeight()

  window.addEventListener('resize', e => {
    setBannerHeight()
  })

})();

(function () {
  // 定位轮播图
  bannerP()

  function bannerP() {
    let lis = document.querySelectorAll('.jd-banner ul li')
    let banner = document.querySelector(".jd-banner")
    let points = document.querySelectorAll('.jd-banner ol li')

    let width = banner.offsetWidth;
    // 
    let index = 0;
    let prev = 7;
    let next = 1;

    let direction = '';
    let timer = setInterval(timerFn, 1000)
    function timerFn() {

      lis[prev].style.transform = "translate(0 220%)"
      index++


      if (index > 7) {
        index = 0
      }
      if (index < 0) {
        index = 7
      }

      prev = index - 1;
      next = index + 1;

      if (prev < 0) {
        prev = 7
      }
      if (next > 7) {
        next = 0

      }
      lis[index].style.transition = 'transform .3s'
      lis[prev].style.transition = 'transform .3s'
      lis[next].style.transition = 'none'
      lis[index].style.transform = "translateX(0)"
      lis[prev].style.transform = `translateX(-100%)`
      lis[next].style.transform = `translateX(100%)`

      points.forEach( item => {
        item.classList.remove('current')
      })
      points[index].classList.add('current');


    }

    // 滑动效果
    let startX = 0;
    let moveX = 0;
    let distance = 0;
    banner.addEventListener('touchstart', e => {
      startX = e.targetTouches[0].clientX;
      clearInterval(timer)
      console.log(startX)
    })
    banner.addEventListener('touchmove', e => {
      moveX = e.targetTouches[0].clientX;
      distance = startX - moveX;

      lis[index].style.transition = "none";
      lis[prev].style.transition = "none";
      lis[next].style.transition = "none";

      lis[index].style.transform = `translateX(${-distance}px)`
      lis[prev].style.transform = `translateX(${(-distance + -width)}px)`
      lis[next].style.transform = `translateX(${(-distance + width)}px)`
    })
    banner.addEventListener('touchend', e => {
      if (Math.abs(distance) > width / 3) {
        //移动距离大于屏幕的三分之一，需要切换上一张或是下一张
        if (distance < 0) {
          //向右 ，想看上一张图片,prev取消过渡
          index--
          direction = 'right'
        }
        if (distance > 0) {
          //向左  ，想看下一张图片
          index++

          direction = 'left'
        }
        if (index > 7) {
          index = 0
        }
        if (index < 0) {
          index = 7
        }

        prev = index - 1;
        next = index + 1;

        if (prev < 0) {
          prev = 7
        }
        if (next > 7) {
          next = 0

        }

        lis[index].style.transition = 'transform .3s'
        lis[prev].style.transition = direction == 'right' ? 'none' : 'transform .3s'
        lis[next].style.transition = direction == 'left' ? 'none' : 'transform .3s'

        lis[index].style.transform = `translateX(0px)`
        lis[prev].style.transform = `translateX(${(-width)}px)`
        lis[next].style.transform = `translateX(${(width)}px)`
      }
      lis[index].style.transform = `translateX(0px)`
      lis[prev].style.transform = `translateX(${(-width)}px)`
      lis[next].style.transform = `translateX(${(width)}px)`

      startX = 0;
      moveX = 0;
      distance = 0;
      timer = setInterval(timerFn, 1000)
      //重置


    })

  }
})();