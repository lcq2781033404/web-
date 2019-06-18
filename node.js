一.安装配置
1.官网安装

2.多版本安装方式
安装多个版本的node，方便测试。步骤如下：
（1）卸载以有的node.js
（2）下载nvm
（3）在C盘创建目录dev，并且把nvm包解压进去
（4）配置nvm环境变量
（5）配置nodejs环境变量
（6）把配置好的环境变量加到path中

3.node代码的执行方式
（1）通过REPL（即在cmd中输入node按下回车就可以输入js代码来运行了）执行。
（2）通过将node代码写入js文件中，通过cmd调用。

二.node模块化
1.全局成员概述
（1）__filename        //包含文件名称的完整路径
（2）__dirname         //不包含文件名称的完整路径
...

2.模块化开发
在nodejs的全局成员中，exports、module、require()这三个成员是模块化开发的重点内容。
（1）传统非模块化开发的缺点：
命名冲突
文件依赖：要先引入某些文件，再引入其他文件，功能才能实现。

（2）前端标准的模块化规范
AMD-requirejs
CMD-seajs

（2）服务器端的模块化规范
CommonJS-Node.js

（3）模块化相关规范
如何定义模块：一个js文件就是一个模块，各模块之间的成员是互相独立的，如果想要引用另外一个模块的成员，另外模块的成员要先导出，比如下例：
在a.js中写如下代码：
function sum(a,b){
  return parseInt(a) + parseInt(b);
}
在b.js文件中想要调用a.js的函数，首先引入a.js：
var module = require('a.js');
var ret = module.sum(5,6);

但是这样调用不了a.js的方法，需要在a.js中导出这个方法：
exports.sum = sum;

三.ES6语法（ES6引入了块级作用域）
1.变量声明（使用let和const声明变量）
（1）使用let声明变量
比如：let a = 1;
特点：
let声明的变量不存在预解析
在同一作用域内，let声明的变量不允许重复声明
使用let方式在块内部定义的变量，在块外部访问不到，由大括号包裹的区域就可以称为一个块，比如，if(){}内部的代码就是一个块。

（2）使用const声明变量
比如：const a = 1;
特点：
前三点和let一样
const是用来声明常量的，声明的常量不允许重新赋值
声明常量的时候必需为其赋值

2.变量的解构赋值
（1）数组解构赋值
let [a,b,c] = [1,2,3];
上面的代码等同于：let a=1,b=2,c=3;

（2）对象的解构赋值
let {a,b} = {a:"hello", b:"world"};

（3）字符串的解构赋值
let [a,b,c,d,e] = "hello";
变量a，b，c，d，e的值用脚也能想到了

3.字符串扩展
有三个方法需要掌握
（1）includes()
判断字符串中是否包含指定的字符串。比如：a.includes("s");可以判断a字符串中是否包含s，包含则返回true，否则返回false，这个方法的第二个参数可以填写开始
判断的索引位置。

（2）startsWith()
判断字符串是否以特定字符串开始

（3）endsWidth()
判断字符串是否以特定字符串结尾

（4）字符串模板
字符串模板格式用``进行包裹，变量用${}包裹：
let obj = {
  name: "zhansan",
  age: "12"
};
let tpl = `
  <div>
    <span>${obj.name}<span>
    <span>${obj.age}<span>
  </div>
`;

4.函数扩展
（1）参数默认值
（2）参数结构赋值
（3）rest参数
与扩展运算符互逆，将数字合并为数组
function foo(a, b, ...param) {
  console.log(param);
}
foo(1,2,3,4,5);
输出[3,4,5]
（4）...扩展运算符
拆开数组
let arr1 = [1,2,3];
let arr2 = [4,5,6];
let arr3 = [...arr1, ...arr2];
输出arr3的值为[1,2,3,4,5,6]

（5）箭头函数
let foo = () => console.log(666);
上面的语句等同于：
function foo(){
  console.log(666);
}

箭头函数的注意事项：
箭头函数中的this取决于函数的定义，而不是函数的调用。箭头函数内部的this和函数外部的this保持一致
箭头函数不可以new
箭头函数不能使用arguments获取参数列表

5.类与继承
在nodejs中使用class声明类：
class Animal{
  //构造函数
  constructor(name){
    this.name = name;
  }
  //普通方法
  showName(){
    console.log(this.name);
  }
  //静态方法
  static showInfo(){
    console.log("静态方法不能由实例成员调用，只能由类来调用");
  }
}
let cat = new Animal("Tom");

类的继承（extends）
class Dog extends Animal{
  constructor(name,color){
    super(name);      //super用来调用父类
    this.color = color;
  }
}

四.nodejs基础
1.Buffer基本操作
Buffer对象是node处理二进制数据的一个接口，它是node原生提供的全局对象，可以直接使用，不需要require("buffer")

（1）实例化
alloc()
let buf1 = Buffer.alloc(5);
from()
let buf2 = Buffer.from("hello");
let buf3 = Buffer.from(array);

（2）静态方法
Buffer.isEncoding()           //判断是否支持该编码
Buffer.isBuffer()             //判断是否为Buffer对象
Buffer.byteLength()           //返回指定编码的字节长度，默认utf8
Buffer.concat()               //将一组Buffer对象合并为一个Buffer对象

（3）实例方法
write()                       //向Buffer对象中写入内容
slice()                       //截取新的Buffer对象，返回截取的Buffer对象
toString()                    //把Buffer对象转换成字符串
toJson()                      //把Buffer对象转换成JSON形式的字符串

2.核心模块API
（1）路径操作
想要使用路径操作的API，先要引入：
const path = require("path");
具体方法见官方文档

（2）文件操作
文件操作涉及到nodejs的一个核心思想：异步I/O处理
在nodejs中，最常用的I/O有两种：文件操作和网络操作
在浏览器中也存在异步操作：
a.定时任务
b.事件处理
c.Ajax回调处理

nodejs中的事件模型与浏览器中的事件模型类似，都是单线程+事件队列
要使用文件操作的API，需要先引入：
const fs = require("fs");

（3）目录操作
a.创建目录
fs.mkdir(path[, mode], callback);

b.读取目录
fs.readdir(path[, options],callback);

五.包管理工具使用
1.初识包概念
多个模块可以形成包，不过要满足特定的规则才能形成规范的包。
2.npm常用命令
npm包的安装有两种方式：本地安装和全局安装（全局安装在本地安装的基础上加-g）
全局安装的包位于Node.js环境的node_modules目录下，全局安装的包一般用于命令行工具。
本地安装的包在当前目录的node_module里面，一般用于实际开发工作。

（1）安装包（版本号可以不指定，如果没有指定版本号，安装最新的版本）
npm install -g 包名称(@版本号)（全局安装）
npm install 包名称(@版本号)（本地安装）
（2）更新包
npm update -g 包名称
npm update 包名称
（3）卸载包
npm uninstall -g 包名称
npm uninstall 包名称

六.nodejs实现服务器配置
1.实现静态服务器功能步骤
（1）.首先引入http模块
const http = require("http");

（2）.创建服务器对象
let server = http.createServer();

（3）.绑定请求事件
server.on("request", (req, res)=>{     //回调函数有两个参数，第一个参数req是Class:http.IncomingMessage的实例对象，代表请求的信息，
                                       //第二个参数res是Class.http.serverResponse的实例对象，代表响应的信息
  res.end("这是响应的结果");
});

（4）.绑定端口
server.listen(3000);
这样，一个简单的服务器就创建好了，在cmd中运行该文件，然后打开浏览器，输入localhost:3000即可访问该页面，上面的代码也可以这么写：
const http = require("http");
http.createServer((req, res)=>{
  res.end("这是响应的结果");
}).listen(3000);

（5）.处理路径分发（即不同的路径下显示不同的内容）
//req.url可以获取URL中的路径（端口之后的路径）
server.on("request", (req, res)=>{
  if(req.url.startsWith("/index")){
    res.end("打开了index.html页面");
  }else if(req.url.startsWith("/about")){
    res.end("打开了about.html页面");
  }...
}
  
判断了url之后，就可以根据不同的url加载不同的页面内容，代码如下：
const http = require("http");
const path = require("path");
const fs = require("fs");
let readFile = (url, res) =>{
  fs.readFile(path.join(__dirname,"www", url), "utf8", (error, fileContent)=>{
    if(error){
      res.end("server error");
    }else{
      res.end(fileContent);
    }
  }); 
}
server.on("request", (req, res)=>{
  if(req.url.startsWith("/index")){
    readFile("index.html", res);
  }else if(req.url.startsWith("/about")){
    readFile("about.html", res);
  }
}
          
上面的代码使用if判断url地址读取不同文件，不够灵活，可以优化：
const http = require("http");
const path = require("path");
const fs = require("fs");
const mime = require("mime.json");
let server = http.createServer();

server.on("request", (req, res)=>{
  fs.readFile(path.join(__dirname, "www", url) ,"utf8", (error, fileContent)=>{
    if(error){
      //设置页面头信息
      res.writeHead(404, {
        "Content-Type":"text/plain; charset=utf8"
      });
      res.end("server error");
    }else{
      //设置默认的头部信息
      let dtype = "text/html";
      //获取请求文件的后缀
      let ext = path.extname(req.url);
      //如果请求的文件后缀合理，就获取到标准的响应格式
      if(mime[ext]){
        dtype = mime[ext];
      }
      //如果响应的内容是文本，就设置成utf8编码
      if(dtype.startsWith("text")){
        dtype += "; charset=utf8";
      }
      //设置响应头信息
      res.wirteHead(200,{
        "Content-Type":dtype
      });
      res.end(fileContent);
    }
  });
}          
server.listen(3000);
  
2.参数传递与获取
（1）get参数处理
get参数的处理在url模块，所以要先引用该模块
const url = require("url");

let str  = "http://www.baidu.com/abc?flag=123&pass=666";
//parse方法可以把字符串转换为对象格式，这样就可以访问url地址中各个部分的内容
let ret = url.parse(str, true);
console.log(ret.query.pass);
//format方法与parse方法互逆，可以将对象转换为url字符串
let str1 = url.format(ret);
  
（2）post参数处理
post参数处理使用querystring模块。
const querystring = require("querystring");
let param = "username=lisi&password=123";
let obj = querystring.parse(param);
console.log(obj.username,obj.password);
//在post方式中，使用stringify方法把对象转换为字符串
let str = querystring.stringify(obj);

传值的具体过程如下：
const http = require("http");
const querystring = require("querystring");
http.createServer((req, res)=>{
  let pdata = '';
  //每次传值的时候都会调用这个函数
  req.on("data", (chunk)=>{
    pdata += chunk;
  });
  req.on("end", ()=>{
    let obj = querystring.parse(pdata);
    res.end(obj);
  });
}).listen(3000, ()=>{
  console.log("running");
})

  
七.Express框架使用
express是一个自身功能极简，完全是由路由和中间件构成的一个web开发框架。从本质上来说，一个express应用就是在调用各种中间件。
1.路由
路由即根据请求路径和请求方式进行路径分发处理。
http的常用请求方式有四种：
post     添加
get      查询
put      更新
delete   删除
  
2.中间件
中间件是一个函数，它可以访问请求对象（req）、响应对象（res）和web应用中处于请求、响应循环流程中的中间件。
（1）应用级中间件
use方法就是一个应用级的中间件，调用app.use("/", (req,res,next)=>{
  next();//next的作用就是把请求传递到下一个中间件
});
 
（2）路由级中间件
