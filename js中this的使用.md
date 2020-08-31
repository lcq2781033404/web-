# 一.tihs出现在以下位置，分别代表什么：
## 1.在函数中（函数中的this，是由函数调用的时候来确定其指向的）：
this指向windows

## 2.在方法（方法属于一个对象）中：
this指向这个方法所属的对象

## 3.在构造函数中：
this指向构造函数创建的对象

## 4.事件处理函数中：
this指向事件源，这个this在循环的时候尤其重要，比如下例：
```javascript
var links = getElementsByTagName('a');
var show = getElementById('show');
for(var i = 0;i < links.length;i++){
  var link = links[i];
  link.onclick = function(){
    image.src = this.href;        //这里必须使用this，不能使用link，因为在循环注册事件的时候，事件不会执行，而当循环结束后，link就会一直指向
                                    links里面的最后一个元素，所以如果使用了link的话无论点击了哪个a标签都会给其赋值一样的地址。使用this话会一直
                                    指向当前点击的a标签
    return false;                 //取消a标签的跳转行为
  }
}
```
## 5.定时器中：
定时器中的this指向window
```javascript
setInterval(function() {
    console.log(this);
}, 300);
```
# 二.js中改变this指向的方法

## 1.bind方法（有兼容性问题，IE9以上才支持）
函数也是对象，所以函数也有自己的属性和方法，这里讲一下函数的bind()方法。
fn.bind();
bind用于新建一个方法，bind()中第一个参数可以改变函数中this的指向。该方法最后返回一个新的函数（这个方法只是改变了fn函数this的指向，而没有调用函数）
bind的应用（为定时器指向对象）：
```javascript
var obj = {
  name: 'zs',
  fn: function() {
    setInterval(function() {
      console.log(this.name);
    }, 300);
  }
};
obj.fn();
```
此时调用fn函数是不会打印出name的，因为this指向的是window，这时就需要来改变定时器中this的指向，改成如下即可：
```javascript
var obj = {
  name: 'zs',
  fn: function() {
    setInterval(function() {
      console.log(this.name);
    }.bind(obj), 300);
  }
};
obj.fn();
```

## 2.call方法
call()  也能改变函数的this，直接调用函数。
```javascript
fn.call();   //可以直接调用fn函数，如果call()括号里面填了参数，第一个参数可以改变fn中this的指向。后面的参数表示调用fn函数的实参。call的返回值就是函数的返回值
```
call的应用：
使用伪数组调用数组的方法：
```javascript
var obj = {
  0: 1,
  1: 10,
  2: 100,
  length: 3
};
Array.prototype.push.call(obj, 1000);//这样就通过数组的push方法给obj对象添加了一项值为1000的数据
```
## 3.apply方法
直接调用函数，并且可以改变函数的this指向（这点和call一样）
但是apply的第二个参数并不是调用函数的函数本身的参数，而是传入一个数组。可以把传入的数组展开方便后续操作。
