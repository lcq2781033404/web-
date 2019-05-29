一.基础语法
1.所有的php代码都要包裹在<?php ?>内部

2.php使用$声明变量。

3.php中使用.进行字符串的拼接
$num = 123;
echo '<div>'.$num.'</div>';

4.php中''和""是有区别的
''中的变量作为普通的字符串处理
""中的变量会解析成变量的值

5.内容输出
（1）echo         //输出简单数据类型
（2）print_r()    //输出复杂数据类型，如数组
（3）var_dump()   //输出详细信息，如对象、数组

6.数组
php使用array()方法声明数组
$arr = array(1,2,3);
上面这种方式声明的数组是使用数字进行索引的，比如我要访问第一个变量，直接$arr[0]即可，如果要使用字符串作为索引，则这么写：
$arr = array['username'=>'zs','age'=>'18'];
访问的时候和数字索引类似：$arr['username']

7.数据类型
php的数据类型与JavaScript的数据类型是类似的，都是弱类型语言

8.循环遍历
有两种循环遍历的方式
（1）for循环
没什么好说的了，语法和js一样

（2）foreach循环
举例如下：
$arr = array("username"=>"zhangsan","age"=>"12");
foreach($arr as $key => $value){
    echo $key.'===='.$value.'<br>';
}

9.系统函数
（1）gettype() 
gettype() 是内置函数，用来判断变量的类型

（2）count()
count() 是内置函数，用来计算数组的长度

（3）json_encode()
json_encode() 是内置函数，可以把数组或者对象转换成为json形式的字符串

（4）json_decode()
把json形式的字符串转换为数组。

10.预定义变量（表单处理）
服务器从客户端获取数据的方式有两种，分别为get和post
（1）$_GET
客户端通过url地址给服务器传递参数，参数一般写在?后面，比如：www.test.com?flag=1
服务器获取flag变量值的方法如下：
$f = $_GET['flag'];

（2）$_POST
post通过表单传递数据，通过表单中输入框的name属性获取对应的值：
<form action="./page5-post.php" method="post">
    用户名：<input type="text" name="username"><br>
    密码：<input type="text" name="password">
    <input type="submit" value="登录">
</form>
在page5-post.php页面，服务器通过input标签中的name属性获取对应的值：
$uname = $_POST['username'];
$pw = $_POST['password'];

11.http协议的常用请求方式
（1）get
（2）post
（3）put
（4）delete
