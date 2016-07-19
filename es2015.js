/**
 * Created by smzdm on 16/7/18.
 */
//找出第一个符合条件的数组成员
let i = [1,4,-5,10].find((n) => n <0 );
console.log(i);
//fill()方法使用给定值，填充一个数组,还可以接受第二个和第三个参数，指定填充的起始位置和结束位置
['a','b','c'].fill(7);
//entries(),keys(),values()用于遍历数组
for(let index of ['a','b'].keys()){
    console.log(index);
}
//数组实例的includes()方法返回一个布尔值，表示某个数组是否包含给定的值
//ES6允许为函数的参数设置默认值
//不能用let，const再次声明函数的参数
//与解构赋值默认值结合使用
function foo({x,y=5}){
    console.log(x,y);
}
//函数参数的默认值是空对象
function m1({x = 0,y = 0} = {}){
    return [x,y];
}



