#对象的扩展
1. Object.is()用来比较两个值是否严格的相等，与(===)行为基本类似
2. Object.assign(target,source) 用来将源对象的所有的可枚举的属性
    ```
    //为对象添加属性
    class Point{
        constructor(x,y){
            Object.assign(this,x,y);
        }
    }
    //为对象添加方法
    Object.assign(someClass.prototype,{
        someMethod(){
            
        },
        anotherMethod(){}
    });
    
    ```
3. 属性的可枚举性
   对象的每一个属性都有一个描述对象，用于控制该属性的行为getOwnPropertypeDescriptor()
4. 属性的遍历
    for in 循环遍历对象的自身和继承的可枚举的属性
    Object.keys()返回一个数组，包括对象自身的可枚举的属性，不包含继承
    Object.getOwnPropertyNames()
    Object.getOwnPropertySymbols()
    Reflect.ownKeys(obj)
    Reflect.enumerate(obj)
5. __proto__属性
    ```
    var obj = {
        method:function(){}
    }
    obj.__proto__ = someOtherObj;
    ```
    设置原型对象的方法
    ```
    Object.setPrototypeOf(object,prototype)
    //用法
    var o = Object.setPrototypeOf({},null);
    ```
6. 对象的扩展运算符
    Rest参数，用于从一个对象取值，是浅复制，复制的是值的引用，而不是副本
7. Symbol
    ES6新引入的原始数据类型，表示独一无二的值。他是第七种数据类型
    作为属性名的symbol,因为每一个symbol都是不想等的，这意味着，symbol可以作为标志符，用于对象的属性名
    在对象的内部，使用symbol定义属性时，symbol值必须放在方括号中
8. Proxy概述
    用于修改某些操作的默认的行为，等同于在语言层面做出修改
    ```
    var proxy = new Proxy(target,handler);
    
    target表示要拦截的目标对象
    ```
9. 二进制数组
    ArrayBuffer对象，代表内存之中的一段二进制数据
10. Set
     ES6提供了新的数据结构，类似于数组，但是成员都是唯一的，没有重复的值。
     ```
     var s = new Set();
     [2,3,4].map(x => s.add(x));
     for(let i of s){
        console.log(i);
     }
     ```
     Set()函数可以接受一个数组作为参数，用来初始化
     去除数组的重复的成员的方法
     ```
     [...new Set(array)]
     ```
     Array.from方法可以将Set结构转为数组
     数组的map()和filter()方法也可以用于Set了
     
11. WeakSet结构
    与Set类似，但是有两个区别
    WeakSet的成员只能是对象，而不能是其他类型的值，可以接受一个数组或类似数组的对象作为参数。
    无法引用WeakSet的成员，因此他是不可以遍历的
    数组的成员会成为weakset的成员，而不是数组本身
12. Map结构的目的
    JS的对象，本质上是键值对的集合，但是传统上只能用字符串
    ES6提供了Map数据结构，类似于对象，也是键值对的集合，各种类型的值都可以当作键。
    Map提供了值－值的对应，是一种更加完善的hash结构。
    Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。
    这就解决了同名属性碰撞的问题
    Map结构的实例属性：size，返回map结构的成员总数
    set(key,value) set方法设置key所对应的键值,然后返回整个结构。
    set方法返回的是Map本身，因此可以使用链式写法
    get(key)读取key对应的键值，如果找不到，那么返回undefined
    has(key),返回一个布尔值，表示键是否在Map数据结构中
    delete(key)删除某个键
    
        let map = new Map([
          [1, 'one'],
          [2, 'two'],
          [3, 'three'],
        ]);
        
        [...map.keys()]
        // [1, 2, 3]
        
        [...map.values()]
        // ['one', 'two', 'three']
        
        [...map.entries()]
        // [[1,'one'], [2, 'two'], [3, 'three']]
        
        [...map]
        // [[1,'one'], [2, 'two'], [3, 'three']]
    Map转为数组
          使用扩展运算符
    Map可以转为对象，如果所有的键都是字符串，那么可以转为对象
13. Iterator(遍历器）的概念
    遍历器是一种接口，为各种不同的数据结构提供统一的访问机制。
    任何数据结构只要部署接口，就可以完成遍历操作
    数组原生具备Interator接口，但是对象没有
    数组，类似数组的对象，Set和Map结构原生具备Interator接口
    字符串的interator接口，也是原生具有interator接口
14. for ... of 循环
    遍历所有数据结构的统一的方法。一个数据结构只要是部署了Symbol.iterator属性，就被视为具有
15. generator函数
    是异步编程的解决方案，可以理解为是一个状态机，封装了多个内部的状态
    yield语句如果用在一个表达式中，必须放在圆括号里面。
    for ...of 循环可以自动遍历generator函数，且此时不再需要调用next方法
    
    
    
    
    

    
    
    
     
    
    
    
    
    
    
    
    
    