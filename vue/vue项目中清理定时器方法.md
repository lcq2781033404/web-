在vue项目中我们清理定时器时，通常有两种方法

### 方法一：
#### 1、首先在vue实例的data中定义定时器的名称：
```javascript
export default{
  data(){
    timer: null  
  }
}
```
#### 2、在方法（methods）或者页面初始化（mounted()）的时候使用定时器
```javascript
this.timer = setInterval(()=>{
  // 需要做的事情
},1000);
```
#### 3、然后在页面销毁的生命周期函数（beforeDestroy()）中销毁定时器
```javascript
export default{
  data(){
    timer: null  
  },
  beforeDestroy(){
    clearInterval(this.timer);
    this.timer = null;
  }
}
```
**注： 第一种方法确实是可行的，可是存在的问题是：**  
##### 1、vue实例中需要有这个定时器的实例，感觉有点多余;
##### 2、 创建的定时器代码和销毁定时器的代码没有放在一起，通常很容易忘记去清理这个定时器，不容易维护;

**-------------------------------------------------------------------------------------------------------------------------------------------------------------**

因此，更推荐第二种方法，使用this.$once(‘hook:beforeDestroy’,()=>{});

### 方法二：直接在需要定时器的方法或者生命周期函数中声明并销毁,代码如下：
```javascript
export default{
  methods:{
    fun1(){
      const timer = setInterval(()=>{
      	// 需要做的事情
         console.log(11111);
      },1000);
      this.$once('hook:beforeDestroy',()=>{
        clearInterval(timer);
        timer = null;
      })
    }
  }
}
```
