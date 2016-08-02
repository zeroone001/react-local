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
    
    
    
    
    
    
    