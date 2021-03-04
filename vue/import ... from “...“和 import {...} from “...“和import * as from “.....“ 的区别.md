ES6新语法常见有三种形式
## import … from “…”
```
// A.js
export default 20
// B.js
import A from './A'

// 上面的代码生效的前提是，只有在A.js中有默认导出的export default语法时才会生效。

// 这种不使用｛｝来引用模块的情况下，import模块的命名是随意的，即如下三种引用命名都是正确的：

//B.js
import A from './A'
import B from './A'
import Something from './A'
因为它总是会解析到A.js中默认的export default
```
