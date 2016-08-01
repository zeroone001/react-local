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
   对象的每一个属性都有一个