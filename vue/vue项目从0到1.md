# 一. 简介
这里主要记录一下从0到1搭建一个完整的vue项目，以及项目的一些通用配置方法。

# 二. vue cli初步搭建vue项目步骤
## 1. 输入 npm install -g @vue/cli
这个命令可以在全局安装vue/cli脚手架，如果想安装指定的版本，只需要在后面加上‘@版本号’即可。  
比如
```bash
npm install -g @vue/cli@3
```
## 2. 卸载老版本
如果已经安装了旧版本的 vue-cli (1.x 或 2.x，通过 vue --version 可以查看版本号），需要先通过 npm uninstall vue-cli -g 卸载它，然后再执行第一步的install操作
## 3. 输入 vue create 项目名称
这个命令帮助我们创建一个vue的工程。create后面填写要创建的项目名称，比如
```bash
vue create myPorject
```
上面的操作会在执行该指令的文件夹下创建一个名为myProject的文件，作为我们的项目。  
输入上面的指令后，会询问我们项目的配置，根据个人需要选取默认配置或自定义配置即可。

# 三. 常用组件库安装
## 1. ElementUI 组件库
### （1）npm方式引入
```bash
npm install element-ui -S
```
-S是指只在该项目安装element-ui，而不是安装到全局（全局指操作系统）  
安装成功后，在src/main.js中全局引入element-ui  
```javascript
import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui'; // 引入库文件
import 'element-ui/lib/theme-chalk/index.css'; // 引入样式文件

Vue.use(ElementUI); // 使用

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
```
### （2）cdn方式引入

