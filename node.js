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
