//Refactor the following function into a one-liner:
const printName = (name) => {return "Hi"+name;}
const Name=printName('Vijitha');
console.log(Name);
//Rewrite the following code using template literals->${}Calling,`is template literals
const printBill = (name, bill) => {
    return `Hi ${name}, please pay: ${bill}`;
  }
//Modify the following code such that the object properties are destructured and logged.
const person = {
    Name1: 'Noam Chomsky',
    age: 92
}
const {Name2,age2}=person;
console.log(Name2);
console.log(age2);