转载自 https://blog.csdn.net/weixin_42970847/article/details/111461518

ES6新语法常见有三种形式

## import … from “…”
```
// A.js
export default 20
// B.js
import A from './A'
上面的代码生效的前提是，只有在A.js中有默认导出的export default语法时才会生效。

这种不使用｛｝来引用模块的情况下，import模块的命名是随意的，即如下三种引用命名都是正确的：
//B.js
import A from './A'
import B from './A'
import Something from './A'
因为它总是会解析到A.js中默认的export default
```

## import {…} from “…”
```
//A.js
export const A = 21
//B.js
import { A } from './A'

代码生效的前提是，只有在模块A.js中有如下命名导出为A的export name的代码,
而且，在明确声明了命名导出后，那么在另一个js中使用{}引用模块时，import时的模块命名是有意义的，如下：
// B.js
import { A } from './A'                 // 正确，因为A.js中有命名为A的export
import { B } from './A'                 // 错误！因为A.js中没有命名为myA的export
import { C } from './A'  
```

```
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}

//------ main.js ------
import { square, diag } from 'lib';				
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```

## import * as from “…”
把一个文件中export 的所有变量，包装成一个对象。

例如：
```
export const sqrt1 = Math.sqrt;
export const sqrt2= Math.sqrt;



import * as sqrtobj from "....."
sqrtobj.sqrt1
sqrtobj.sqrt2
```
