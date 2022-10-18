## 1. 背景
在react中可以直接通过import引入样式文件，但是这种方式，引入的样式文件是全局的，不好管理，所以可以使用styled-components插件管理样式。

## 2. 安装
```
npm install styled-components -S
```

## 3. 使用
styled-components可以通过js文件来写css样式，然后再将js文件引入到需要使用的地方即可，这里举一些常见应用场景：

### 3.1 全局样式
全局样式需要引入injectGlobal，使用injectGlobal的样式全局生效
```
// src/style.js
import { injectGlobal } from 'styled-components';

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`
```

### 3.2 组件样式
使用styled-components提供的styled，创建一个div，在div中添加样式，并用这个div包裹需要添加样式的组件，即可实现组件样式。
```
// src/header/style.js
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  height: 50px;
  background: red;
`
```
在组件中引入这个样式
```
// src/header/index.js
import React { Component } from 'react';
import { HeaderWrapper } from './style.js';

class Header extends Component {
  render() {
    return (
      <HeaderWrapper>header</HeaderWrapper>
    )
  }
}

export default Header
```
