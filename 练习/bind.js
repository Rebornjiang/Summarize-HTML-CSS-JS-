window.name = 'reborn'
var a ={

  name : "Cherry",
  fn : function (a,b) {
      console.log( a + b)
      console.log(this.name)
  }
}
var b = a.fn

var newFn = b.bind(window,1,2);
newFn()

a.fn()