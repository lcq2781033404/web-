# 一. 简介
vuedraggable 是基于Sortable.js 的 vue 组件库，没有 jQuery 依赖，可以实现视图和数据模型同步更新，并且拥有丰富的 API

# 二. 安装引入
## 1. npm引入
```bash
npm install vuedraggable -S
```
安装好后，在需要的页面组件中引入即可
```javascript
import Draggable from 'vuedraggable';
```

# 三. 一个简单的例子
```vue
<template>
    <div>
        <draggable 
            class="list-group" 
            tag="ul" 
            v-model="list"
            v-bind="{
                animation: 200,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost'
            }"
        >
            <li class="list-group-item" v-for="element in list" :key="element.order">{{ element.name }}</li>
        </draggable>
    </div>
</template>

<script>
import Draggable from 'vuedraggable';
const message = [
  'vue.draggable',
  'draggable',
  'component',
  'for',
  'vue.js 2.0',
  'based',
  'on',
  'Sortablejs',
];
export default {
    components: {
        Draggable
    },
    props: {

    },
    data() {
        return {
            list: message.map((name, index) => {
                return {name: name, order: index + 1}
            })
        }
    },
    computed: {

    },
    created() {
        console.log(this.list)
    },
    beforeDestroy() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {

    }
}
</script>

<style scoped lang="scss">
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
.list-group {
    min-height: 20px;
    list-style: none;
}
.list-group-item {
    cursor: move;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ccc;
}
</style>
```
下面对draggable组件属性做简单说明：
1. tag="ul" 用来指定 draggable 组件渲染出来的 html 标签。  
2. v-model 绑定列表可拖动元素，通常与内部元素 v-for 引用的数组相同。  
3. v-bind 绑定组件的配置项，与 Sortable.js 的配置项相同，下面具体讲解：  
    （1）group：string or object  
        - string：命名，用处是为了设置可以拖放容器时使用  
        - object: {name, pull, put}  
            + name: 同 string 的方法  
            + pull：pull 用来定义从这个列表容器移动出去的设置，可以设置四个值：true/false/'clone'/function  
                * true:列表容器内的列表元素可以被移出；  
                * false：列表容器内的列表元素不可以被移出；  
                * 'clone'：列表元素移出，移动的为该元素的副本；  
                * function：用来进行 pull 的函数判断，可以进行复杂逻辑，在函数中 return false/true 来判断是否移出；
            + put：put 用来定义往这个列表容器放置列表元素的的设置，可以设置四个值：true/false/['foo','bar']/function  
                * true:列表容器可以从其他列表容器内放入列表元素；  
                * false：与 true 相反；  
                * ['foo','bar']：这个可以是一个字符串或者是字符串的数组，代表的是 group 配置项里定义的 name 值；  
                * function：用来进行 put 的函数判断，可以进行复杂逻辑，在函数中 return false/true 来判断是否放入  
    （2）animation: number 单位：ms，定义动画的时间；  
    （3）disabled: boolean 定义此 sortable 对象是否可用，为 true 时 sortable 对象不能拖放排序等功能，为 false 时为可以进行排序，相当于一个开关；  
    （4）ghostClass：selector 格式为简单 css 选择器的字符串，当拖动列表元素时会生成一个副本作为影子元素来模拟被拖动元素排序的情况，此配置项就是来给这个影子元素添加一个 class，我们可以通过这种方式来给影子元素进行编辑样式；  
    （5）sort: boolean 定义是否列表元素是否可以在列表容器内进行拖拽排序；  
    （6）delay: number 定义鼠标选中列表元素可以开始拖动的延迟时间；  
    （7）handle: selector 格式为简单 css 选择器的字符串，使列表元素中符合选择器的元素成为拖动的手柄，只有按住拖动手柄才能使列表元素进行拖动；  
    （8）filter: selector 格式为简单 css 选择器的字符串，定义哪些列表元素不能进行拖放，可设置为多个选择器，中间用“,”分隔  
    （9）draggable：selector 格式为简单 css 选择器的字符串，定义哪些列表元素可以进行拖放  
    （10）chosenClass：selector 格式为简单 css 选择器的字符串，当选中列表元素时会给该元素增加一个 class；  
    （11）forceFallback：boolean 如果设置为 true 时，将不使用原生的 html5 的拖放，可以修改一些拖放中元素的样式等；  
    （12）fallbackClass：string 当 forceFallback 设置为 true 时，拖放过程中鼠标附着元素的样式；  
    （13）scroll：boolean 默认为 true，当排序的容器是个可滚动的区域，拖放可以引起区域滚动
