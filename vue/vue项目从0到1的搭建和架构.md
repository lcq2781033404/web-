## 使用vue cli3搭建vue项目，步骤如下：
### 1.输入 npm install -g @vue/cli
这个命令可以在全局安装vue/cli脚手架，如果想安装指定的版本，只需要在后面加上‘@版本号’即可。  
比如
```bash
npm install -g @vue/cli@3
```
### 2.卸载老版本
如果已经安装了旧版本的 vue-cli (1.x 或 2.x，通过 vue --version 可以查看版本号），需要先通过 npm uninstall vue-cli -g 卸载它，然后再执行第一步的install操作
### 3.输入 vue create 项目名称
这个命令帮助我们创建一个vue的工程。create后面填写要创建的项目名称，比如
```bash
vue create myPorject
```
上面的操作会在执行该指令的文件夹下创建一个名为myProject的文件，作为我们的项目。  
输入上面的指令后，会询问我们项目的配置，根据个人需要选取默认配置或自定义配置即可。
