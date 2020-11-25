## 一. 介绍
pointerEvents是一个css3的属性，指定在什么情况下元素可以成为鼠标事件的target
## 二. 语法
```css
pointer-events: auto | none;
```
| 值 | 描述 |
| ---- | ---- |
| auto | 默认值，效果和没有定义pointer-events属性相同，鼠标不会穿透当前层 |
| none | 元素不再是鼠标事件的目标，鼠标不去监听当前层而去监听下面的层中的元素，但是如果其子元素设置了pointer-events:auto，鼠标还是会监听他的子元素 |
## 三. 兼容性
Firefox 3.6+和chrome 2.0+ 以及safari 4.0+都支持这个CSS3属性，IE6/7/8/9都不支持，Opera在SVG中支持该属性但是HTML中不支持。
## 四. 使用场景
### 1. 页面滚动
手机端使用了一个叫ht for web的框架嵌入到页面中播放动画，给嵌入的元素设置pointer-events:none，可以保证手指在嵌入元素上滑动也可以正常滚动页面。
