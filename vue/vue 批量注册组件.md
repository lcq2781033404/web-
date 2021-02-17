批量注册组件使用的核心的方法：require.context
### 1.require.context介绍
require.context函数可以遍历出所有指定规则的文件，我们拿到这些文件循环注册到vue中即可实现批量注册组件的目的

require.context函数接收三个参数:

1.directory {String} -读取文件的路径

2.useSubdirectories {Boolean} -是否遍历文件的子目录

3.regExp {RegExp} -匹配文件的正则

语法: require.context(directory, useSubdirectories = false, regExp = /^.//);

借用webpakc官网的例子
```
require.context('./test', false, /.test.js$/);
```
上面的代码遍历当前目录下的test文件夹的所有.test.js结尾的文件,不遍历子目录

值得注意的是require.context函数执行后返回的是一个函数,并且这个函数有3个属性

resolve {Function} -接受一个参数request,request为test文件夹下面匹配文件的相对路径,返回这个匹配文件相对于整个工程的相对路径

keys {Function} -返回匹配成功模块的名字组成的数组

id {String} -执行环境的id,返回的是一个字符串,主要用在module.hot.accept,应该是热加载?

这三个都是作为函数的属性(注意是作为函数的属性,函数也是对象,有对应的属性)
