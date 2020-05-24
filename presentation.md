# Presentation

### link to YouTube video

https://www.youtube.com/watch?v=N5d6Kx10g8s&feature=youtu.be

### link to Reveal presentation

https://zzvipz-presentation.netlify.app/

### transcript of the presentation

ES6. Let, Const and arrow functions.
Hello. My name is Siarhei and today I’d like to tell you about ES6, let, const and arrow functions.
ES6 refers to version 6 of the ECMA Script programming language, its was published in June 2015. Major web browsers support main features for ES6.

However, it's possible to use software known as a transpiler to convert ES6 code into ES5, which is better supported on most browsers,for example Babel.js. All of the popular javascript libraries and frameworks like Node.js, ReactJS follow ES6.
ES6 is a significant update to JavaScript with many useful features:

let and const keyword
Arrow functions
Exponentiation Operator
Default Parameter Values
Spread / Rest operators
Destructuring
Classes
Many Higher-order functions
Template strings
generators
promises
and many more…
Today we'll talk about let and const keywords, arrow functions.
ES6 specification introduced two new ways of declaring variables in JavaScript with let and const keywords. These keywords allow you to declare variables that are limited in scope to the block, statement, or expression on which it is used.

JavaScript let

Let’s start with let keyword. This keyword enables us to declare block scoped local variables. We can see in examples below :
slide.
Inside of the while loop on line 7 we are declaring new variable "c" using let keyword and this variable has block inside of the while loop for its scope. For this reason line 13 throws ReferenceError since our variable "c" is no longer available in this “higher” scope. If you declare variable with let keyword in a global scope it'll be available in all lower scopes.

JavaScript const

Now let’s look at const keyword. This declaration creates a constant whose scope can be either global or local to the block in which it is declared. An initializer for a constant is required; that is, you must specify its value in the same statement in which it's declared (which makes sense, given that it can't be changed later).

const MY_CONST = 7; // define MY_CONST as a constant and give it the value 7
MY_CONST = 7; // throws TypeError: Assignment to constant variable
const MY_CONST = 20; // throws Identifier 'MY_CONST' has already been declared
let MY_CONST = 20; // this throws an error too

The const declaration creates a read-only reference to a value. It does not mean the value it holds is immutable, just that the variable identifier cannot be reassigned.
We can see in examples below :
slide
So, the variable can’t be reassigned, but the value itself that the variable is referencing can be changed if it is mutable value (like an array).

Arrow functions

Arrow functions are one of the more popular features of ES6. They introduced a new way of writing concise functions. Arrow functions allows a short syntax for writing function expressions. You don't need the function keyword, the return keyword, and the curly brackets.
Variations

One thing you will quickly notice is the variety of syntaxes available in arrow functions. Let’s run through some of the common ones:
slide
In classic function expressions, the this keyword is bound to different values based on the context in which it is called. With arrow functions however, this is lexically bound. It means that it usesthis from the code that contains the arrow function.

For example, look at the Person function below:
slide
When you should use arrow functions

Arrow functions shine best with anything that requires this to be bound to the context, and not the function itself.
slide

Thanks for your attention!
