//ex-1(recursive function)
//Write a program to demonstrate how a function can be passed as a parameter to another function.
function a(n,b){
    return b(n)*2;//15*2
}
function c(n){
    return n*3;//15
}
const res=a(5,c);
console.log(res)
//ex-2
// An arrow function takes two arguments firstName and lastName and returns a 2 letter string that represents the first letter of both the arguments. For the arguments Roger and Waters, the function returns ‘RW’. Write this function.
let functions=(firstName,lastName)=>{
    let func=firstName.charAt(0)+lastName.charAt(0);
    return func;
}
const firstName='Roger';
const lastName='Waters';
const func=functions(firstName,lastName);
console.log(func);