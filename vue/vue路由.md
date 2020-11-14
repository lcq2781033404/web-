## 1.概念
### （1）后端路由
对于普通的网站，所有的超链接都是URL地址，所有的URL地址都对应服务器上对应的资源。 
### （2）前端路由
对于单页面应用程序来说，主要通过URL中的hash（URL中#后面的内容都叫hash）来实现不同页面之间的切换，同时，hash有一个特点：http请求中不会包含hash相关的内容，所以单页面程序 中的页面跳转主要用hash实现。  
在单页面应用程序中，这种通过hash改变来切换页面的方式，称作为前端路由。

## 2.插件安装及使用
直接下载vue-router.js，然后导入到页面中。  
或者输入指令：npm install vue-router

## 3.vue-router基本使用
### （1）创建路由实例并配置路由规则
```javascript
// 导入包：
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const User = {
  template: '<div>User</div>'
}
// 当导入了vue-router包之后，在window全局对象中，就有了一个路由的构造函数，叫做VueRouter，在创建构造函数实例的时候，可以为构造函数，传递一个配置对象。
var routerObj = new VueRouter({
  routes: [                             // 这个配置对象中的routes表示路由的匹配规则，由于路由的匹配规则不止一个，所以这是数组类型
    {path: '/user', component: User}  // 每个路由规则，都是一个对象，这个对象身上有两个必须的属性
                                        // 属性1 是path，表示监听哪个路由链接地址
                                        // 属性2 是component，表示如果路由是属性1匹配到的path，则展示component属性对应的那个组件的模板对象名称
  ]
});
```
### （2）将路由实例和vue实例关联起来
vue实例对象中有一个属性router，可以在这个属性中填写刚刚创建的路由实例名称：
```javascript
const User = {
  template: '<div>User</div>'
}
var routerObj = new VueRouter({
  routes: [                             
    {path: '/user', component: User} 
  ]
});
var vm = new Vue({
  el: "#dv",
  data: {},
  methods: {},
  router: routerObj
});
```
### （3）将切换的组件显示在页面中
通过路由规则匹配的组件显示在<router-view></router-view>中，这个标签是vue-router提供的元素，路由规则匹配到的组件，会展示到这个标签中。
```html
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

### （4）路由跳转标签的使用
在vue.router中，推荐使用<router-link></router-link>标签（在页面中默认会将其渲染为a标签）作为路由跳转的链接，to属性指定跳转的路由地址：
```html
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

### （5）路由重定向的使用
路由的重定向用于页面初始加载的时候为其默认指定一个路由地址，使用redirect完成路由重定向：
```javascript
var routerObj = new VueRouter({
  routes: [    
    {path: '/', redirect: '/login'} 
    {path: '/login', component: login} 
  ]
});
```
### （6）在路由规则中传递参数
有两种方法：
#### ①使用query方式传递参数
可以在路由中，使用查询字符串给路由传递参数，此时不需要修改路由匹配规则也能匹配上
```html
<router-link to="/login?id=10">登录</router-link>
```
```javascript
var routerObj = new VueRouter({
  routes: [    
    {path: '/login', component: login}          //这里依旧能和上面的/login?id=10匹配上
  ]
});
```
如果想要获取到传递的参数，则在显示的组件中使用$route.query即可：
```javascript
var login = {
  template: '<h3>登录</h3>',
  created: function(){
    console.log(this.$route.query.id);
  }
};
```
#### ②使用params方式传递参数
这种方式是在路由规则处加一个冒号占位符，占位符后面填写传递的参数，然后在引用路由url的地方填写传递的实参值：
```html
<router-link to="/login/10">登录</router-link>
```
```javascript
var routerObj = new VueRouter({
  routes: [    
    {path: '/login/:id', component: login}          
  ]
});
```
获取参数值的方法如下：
```javascript
var login = {
  template: '<h3>登录</h3>',
  created: function(){
    console.log(this.$route.params.id);
  }
};
```
**可以在一个路由中设置多段“路径参数”，对应的值都会设置到 $route.params 中。例如：**
| 模式 | 匹配路径 | $route.params |
| :----: | :----: | :----: |
| /user/:username | /user/evan | { username: 'evan' } |
| /user/:username/post/:post_id | /user/evan/post/123 | { username: 'evan', post_id: '123' } |

### （7）响应路由参数的变化
注意，当使用路由参数时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。  
不过，这也意味着组件的生命周期钩子不会再被调用。  
复用组件时，想对路由参数的变化作出响应的话，可以使用 watch 监听 $route 对象：
```javascript
watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...to是要跳转到的组件对象，from是跳转组件对象
    }
}
// 也可以监听$route.path的变化：
watch: { 
     '$route.path': function(newVal, oldVal){ 
     console.log(newVal + '---------' + oldVal); 
     } 
} 
``` 

## 4.路由的嵌套
很多时候，一个路由里面会嵌套子路由，我们希望展示子路由的同时，他们的父路由也会展示，这是就要用到路由的嵌套：
```html
<div id="app">
  <router-view></router-view>
</div>
```
```javascript
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```
这里的 <router-view> 是最顶层的出口，渲染最高级路由匹配到的组件。同样地，一个被渲染组件同样可以包含自己的嵌套 <router-view>。例如，在 User 组件的模板添加一个 <router-view>：
```javascript
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}
// 要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置：
const router = new VueRouter({
  routes: [
    { 
      path: '/user/:id', 
      component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```
此时，基于上面的配置，当你访问 /user/foo 时，User 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个 空的 子路由：
```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id', component: User,
      children: [
        // 当 /user/:id 匹配成功，
        // UserHome 会被渲染在 User 的 <router-view> 中
        { path: '', component: UserHome },

        // ...其他子路由
      ]
    }
  ]
})
```

## 5.路由的跳转
vue中路由跳转有四种方式：
### （1）router-link
<router-link to='路由地址'>

### （2）this.$router.push({ path:'路由地址'})
当你点击 <router-link> 时，this.$router.push这个方法会在内部调用，所以说，点击 <router-link :to="..."> 等同于调用 this.$router.push。
| 声明式 | 编程式 |
| :----: | :----: |
| \<router-link :to="..."\> | this.$router.push(...) |  
该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：
```javascript
// 字符串
router.push('home')
// 对象
router.push({ path: 'home' })
```
**带有参数传递的路由跳转：**
#### ①query传递参数：
```javascript
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```
#### ②params传递参数
**注意：如果提供了 path参数，则params 会被忽略，需要提供路由的 name 或手写完整的带有参数的 path：**
```javascript
// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})   // -> /user/123
router.push({ path: `/user/${userId: '123'}` })           // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId: '123' }})         // -> /user
```
### （3）this.$router.replace({ path:'路由地址'})
跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

| 声明式	| 编程式 |
| :----: | :----: |
| <router-link :to="..." replace>	| this.$router.replace(...) |

### （4）router.go(n)
这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。
## 6.命名路由
有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 routes 配置中给
某个路由设置名称。
```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})

// 要链接到一个命名路由，可以给 router-link 的 to 属性传一个对象：
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

// 这跟代码调用 router.push() 是一回事：
router.push({ name: 'user', params: { userId: 123 }})

// 这两种方式都会把路由导航到 /user/123 路径。
```

## 7.命名视图
有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 sidebar (侧导航) 和 main (主内容) 两个视图，这个时候命名视图就派上用场了。  
你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default。
```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```
一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置 (带上 s)：
```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```
**使用命名视图实现经典布局**  
所谓经典布局即页面上方是一个头部，下方分为左右两部分。
```html
<body>
  <div id="app">

    <router-view></router-view>
    <div class="container">
      <router-view name="left"></router-view>
      <router-view name="main"></router-view>
    </div>

  </div>

  <script>

    var header = {
      template: '<h1 class="header">Header头部区域</h1>'
    }

    var leftBox = {
      template: '<h1 class="left">Left侧边栏区域</h1>'
    }

    var mainBox = {
      template: '<h1 class="main">mainBox主体区域</h1>'
    }

    // 创建路由对象
    var router = new VueRouter({
      routes: [
        /* { path: '/', component: header },
        { path: '/left', component: leftBox },
        { path: '/main', component: mainBox } */


        {
          path: '/', components: {
            'default': header,
            'left': leftBox,
            'main': mainBox
          }
        }
      ]
    })

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      router
    });
  </script>
</body>
```
