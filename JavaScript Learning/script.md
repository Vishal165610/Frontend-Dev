```js
// // var let const

// // var name = "John"; // function-scoped or globally-scoped
// // let age = 30; // block-scoped
// // const country = "USA"; // block-scoped, cannot be reassigned

// ex - 1

let dulha = "Rohit Sharma";
let dulhan = "Anushka Sharma";

let ganesh =99,100;

// we can change dulha and dulhan values

// but we can't give "let" two values at a time
// for eg; let dulha = "rohit sharma";
//         let dulha = "virat kohli";  // wrong

// but in variables (var) we can do that

// for eg; var dulha = "rohit sharma";
//         var dulha = "virat kohli";  // correct

// This is what differs between var and let

// ex - 2

const pi = 3.14; // constant value
// pi = 3.14159; // This will throw an error because we cannot reassign a const variable


//Reassignment and Redeclaration

// we can do this (Reassignment)

var a = 20;
a = 29;

let b = 80;
b = 33;

// what we can't (Redeclaration)

var c = 99;
var c = 101;

//but with let we can't do like with var

let d = 87;
// let d = 800;

//it will show the error


//Temporal Dead Zone

// utna area jitne me js ko pta to hai ki varaiable exist karta hai par wo apko value nahi de skta it will show this error - Uncaught ReferenceError: Cannot access 'a' before initialization


console.log(a)
let a = 10;

// overall temporal dead zone is basically the space leave above the variable is the temporal dead zone 


const person = {name:Vishal};
person.name = "Sharma";



// Ternary Operator {Very Important}
// ?:

17>13 ? console.log(true) : console.log(false)

// funtion ? if that fnction is true then show this part : otherwise show this part




// if else else-if 

// if(27>12){
//     console.log("true")
// }
// else{
//     console.log("False")
// }

// let loggedin = true;

// if(loggedin && admin){
//     console.log("Admin loggedin if admin is logging in")
// }
// else if(loggedin){
//     console.log("Normal Login has been occured here")
// }




// Switch Case Example

// switch (2) {
//     case 1: 
//     console.log("case 1 Activated");
//     break;
//     case 2:
//     console.log("case 2 Activated");
//     break;
//     case 3:
//     console.log("case 3 Activated");
//     break;
//     default:
// }
