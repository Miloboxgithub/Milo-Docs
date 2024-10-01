# TypeScript 基础学习

## 1. 介绍
​	TS 是一种由微软开发的开源编程语言，它是JS的超集，为JS添加了**可选的静态类型** 和**面向对象编程**，有助于在开发过程中捕获错误，并使代码更易于维护和理解。[ts官网](https://www.tslang.cn/docs/handbook/basic-types.html) [学习视频](https://www.bilibili.com/video/BV1wR4y1377K/?spm_id_from=333.1007.top_right_bar_window_custom_collection.content.click&vd_source=b9240c0a38a7790f9c77d9ff4ba2408f)

## 2. 安装和配置
### 2.1 安装 Node.js 和 npm
 [Node.js 官网](https://nodejs.org/)

### 2.2 安装 TypeScript
使用 npm 全局安装 TypeScript 编译器：
```bash
npm install -g typescript
```

### 2.3 创建项目
创建一个新的目录，并初始化一个 npm 项目：
```bash
mkdir my-ts-project
cd my-ts-project
npm init -y
```

安装 TypeScript 作为开发依赖：
```bash
npm install --save-dev typescript
```

创建 `tsconfig.json` 配置文件：
```bash
tsc --init
```

## 3. 基本语法
### 3.1 变量声明
```typescript
let name: string = "Alice";
const age: number = 30;
let isStudent: boolean = true;
```

### 3.2 函数
```typescript
function greet(name: string): void {
    console.log(`Hello, ${name}!`);
}

greet("Alice");
```

### 3.3 接口
接口用于定义对象的结构。
```typescript
interface Person {
    name: string;
    age: number;
}

const person: Person = {
    name: "Bob",
    age: 25
};
```

### 3.4 类
```typescript
class Student {
    constructor(public name: string, public age: number) {}

    study(): void {
        console.log(`${this.name} is studying.`);
    }
}

const student = new Student("Charlie", 20);
student.study();
```

### 3.5 泛型
泛型允许你在定义函数、接口或类时使用类型参数。
```typescript
function identity<T>(arg: T): T {
    return arg;
}

const result = identity<string>("Hello, World!");
console.log(result); // 输出: Hello, World!
```

### 3.6 枚举
枚举类型用于定义一组命名的常量。
```typescript
enum Color { Red, Green, Blue }

const c: Color = Color.Green;
console.log(c); // 输出: 1
```

### 3.7 联合类型
联合类型表示值可以是几种类型之一。
```typescript
let value: string | number;
value = "Hello";
value = 42;
```

### 3.8 类型断言
类型断言用于告诉编译器某个值的具体类型。
```typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

## 4. 高级特性
### 4.1 类型别名
类型别名用于给类型起一个新的名字。
```typescript
type StringOrNumber = string | number;

let value: StringOrNumber = "Hello";
value = 42;
```

### 4.2 字符串字面量类型
字符串字面量类型用于限制变量只能取特定的字符串值。
```typescript
type EventName = 'click' | 'mouseover' | 'mouseout';

let eventName: EventName = 'click';
```

### 4.3 只读属性
只读属性用于防止对象的某些属性被修改。
```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}

const point: Point = { x: 10, y: 20 };
// point.x = 30; // 错误: 不能修改只读属性
```

### 4.4 可选属性
可选属性用于表示对象中的某些属性是可选的。
```typescript
interface User {
    name: string;
    age?: number;
}

const user: User = { name: "Alice" };
```

### 4.5 函数重载
函数重载允许为同一个函数提供多个签名。
```typescript
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
    return a + b;
}

console.log(add(1, 2)); // 输出: 3
console.log(add("Hello, ", "World!")); // 输出: Hello, World!
```

## 5. 模块
### 5.1 导出
```typescript
export const PI = 3.14;
export function calculateArea(radius: number): number {
    return PI * radius * radius;
}
```

### 5.2 导入
```typescript
import { PI, calculateArea } from './math';

console.log(calculateArea(5)); // 输出: 78.5
```
