let a =12;
let b = 5;

let arr = [{a,b},{b,a}];

arr.sort((json1,json2)=>json1.a=json2.a);

alert(arr[0].a);

