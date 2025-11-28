# JavaScript Basics: Functions and Semicolons

This guide covers the fundamentals of JavaScript functions and semicolons. These concepts are essential for understanding and modifying the game code in this repository.

---

## Table of Contents

- [Function Definitions](#function-definitions)
  - [Function Declarations](#function-declarations)
  - [Function Expressions](#function-expressions)
  - [Arrow Functions](#arrow-functions)
  - [Method Definitions](#method-definitions)
- [Function Invocations](#function-invocations)
  - [Basic Function Calls](#basic-function-calls)
  - [Method Calls](#method-calls)
  - [Callback Functions](#callback-functions)
- [Semicolons in JavaScript](#semicolons-in-javascript)
  - [When to Use Semicolons](#when-to-use-semicolons)
  - [Automatic Semicolon Insertion (ASI)](#automatic-semicolon-insertion-asi)
- [MDN Documentation Links](#mdn-documentation-links)

---

## Function Definitions

A **function definition** (also called a function declaration or function statement) creates a named function that can be called later. There are several ways to define functions in JavaScript.

### Function Declarations

A function declaration defines a named function using the `function` keyword. These are **hoisted**, meaning they can be called before they appear in the code.

**Syntax:**
```javascript
function functionName(parameter1, parameter2) {
  // function body
  return result;
}
```

**Example from this game:**
```javascript
// Function declaration to check collision between two objects
function checkCollision(dino, obstacle) {
  return (
    dino.x < obstacle.x + obstacle.width &&
    dino.x + dino.width > obstacle.x &&
    dino.y < obstacle.y + obstacle.height &&
    dino.y + dino.height > obstacle.y
  );
}
```

📖 **MDN Reference:** [Function Declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)

---

### Function Expressions

A function expression defines a function as part of a larger expression, typically assigning it to a variable. These are **not hoisted**.

**Syntax:**
```javascript
const functionName = function(parameter1, parameter2) {
  // function body
  return result;
};
```

**Example:**
```javascript
// Function expression assigned to a variable
const calculateScore = function(baseScore, multiplier) {
  return baseScore * multiplier;
};
```

📖 **MDN Reference:** [Function Expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)

---

### Arrow Functions

Arrow functions provide a shorter syntax for writing functions. They are always anonymous and have a lexical `this` binding.

**Syntax:**
```javascript
// With multiple parameters
const functionName = (param1, param2) => {
  // function body
  return result;
};

// With single parameter (parentheses optional)
const square = x => x * x;

// With no parameters
const greet = () => console.log('Hello!');
```

**Example from this game:**
```javascript
// Arrow function used as a callback
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault();
    dino.jump();
  }
});

// Arrow function with forEach
clouds.forEach(cloud => {
  cloud.update();
  cloud.draw();
});
```

📖 **MDN Reference:** [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

---

### Method Definitions

Methods are functions defined as properties of an object. They can be defined using shorthand syntax in modern JavaScript.

**Syntax:**
```javascript
const object = {
  // Method shorthand (modern)
  methodName() {
    // method body
  },

  // Traditional method definition
  anotherMethod: function() {
    // method body
  }
};
```

**Example from this game:**
```javascript
// The dino object with method definitions
const dino = {
  x: 50,
  y: 150,
  width: 40,
  height: 44,

  // Method using shorthand syntax
  draw() {
    if (trexImg.complete) {
      ctx.drawImage(trexImg, this.x, this.y, this.width, this.height);
    }
  },

  // Another method
  jump() {
    if (this.grounded && !this.jumping) {
      this.dy = this.jumpPower;
      this.jumping = true;
    }
  }
};
```

📖 **MDN Reference:** [Method Definitions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions)

---

## Function Invocations

**Function invocation** (also called "calling" a function) is how you execute a function and use its code.

### Basic Function Calls

To call a function, use the function name followed by parentheses containing any arguments.

**Syntax:**
```javascript
functionName(argument1, argument2);
```

**Example from this game:**
```javascript
// Calling a function with no arguments
spawnObstacle();

// Calling a function with arguments
checkCollision(dino, obstacle);

// Storing the return value
const isColliding = checkCollision(dino, obstacle);
```

📖 **MDN Reference:** [Calling Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#calling_functions)

---

### Method Calls

To call a method, use the object name, a dot, and then the method name with parentheses.

**Syntax:**
```javascript
object.methodName(argument1, argument2);
```

**Example from this game:**
```javascript
// Calling methods on the dino object
dino.update();
dino.draw();
dino.jump();

// Calling methods on obstacle instances
obstacle.update();
obstacle.draw();

// Calling methods on built-in objects
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillRect(this.x, this.y, this.width, this.height);
```

📖 **MDN Reference:** [Object Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects#defining_methods)

---

### Callback Functions

#### What is a Callback?

A **callback** is a function that you give to another function, so that the other function can run it later. Think of it like leaving a note for someone saying "call me back when you're done" – hence the name "callback."

**Why do we need callbacks?**

JavaScript often needs to do things that take time (like waiting for a button click, loading an image, or running code for each item in a list). Instead of stopping everything and waiting, JavaScript uses callbacks to say: "Here's what to do when that thing happens."

#### Simple Analogy

Imagine you're at a restaurant:
1. You give the waiter your order (this is like passing a callback)
2. You don't stand in the kitchen waiting – you go back to your table
3. When your food is ready, the waiter brings it to you (the callback gets executed)

In code terms:
- **You** = your main program
- **The order** = the callback function
- **The waiter** = the function that accepts callbacks
- **Food arriving** = the callback being executed

#### Basic Callback Example

Let's break down a callback step by step:

```javascript
// Step 1: Define a function that we want to run later
function sayHello() {
  console.log('Hello!');
}

// Step 2: Use setTimeout, which accepts a callback
// This says: "Run sayHello after 2000 milliseconds (2 seconds)"
setTimeout(sayHello, 2000);

// The program continues immediately, it doesn't wait!
console.log('This prints first, even though it comes after setTimeout');
```

**What happens:**
1. `setTimeout` receives `sayHello` as a callback
2. JavaScript continues running other code immediately
3. After 2 seconds, `setTimeout` "calls back" and runs `sayHello`

#### Passing Data to Callbacks

Sometimes the function that uses your callback will give it some information. This is done through **parameters**.

```javascript
// This callback receives information about what button was pressed
document.addEventListener('keydown', function(event) {
  // 'event' contains information about the key press
  // JavaScript fills in this value when the callback runs
  console.log('You pressed:', event.code);
});
```

The `event` parameter is provided by `addEventListener` – you don't fill it in yourself. JavaScript says: "When a key is pressed, I'll call your function and give it details about the event."

#### Callbacks with Arrays

One of the most common uses of callbacks is with arrays. The `forEach` method runs your callback once for each item in the array:

```javascript
const fruits = ['apple', 'banana', 'cherry'];

// forEach will call this function 3 times, once for each fruit
fruits.forEach(function(fruit) {
  console.log('I like ' + fruit);
});

// Output:
// I like apple
// I like banana
// I like cherry
```

**How it works:**
1. `forEach` looks at the first item (`'apple'`)
2. It calls your callback function, passing `'apple'` as the `fruit` parameter
3. Your callback runs and prints "I like apple"
4. `forEach` moves to the next item and repeats

#### Three Ways to Write Callbacks

**1. Named function (defined separately):**
```javascript
function handleClick() {
  console.log('Button clicked!');
}
document.getElementById('myButton').addEventListener('click', handleClick);
```

**2. Anonymous function (defined inline):**
```javascript
document.getElementById('myButton').addEventListener('click', function() {
  console.log('Button clicked!');
});
```

**3. Arrow function (shorter syntax):**
```javascript
document.getElementById('myButton').addEventListener('click', () => {
  console.log('Button clicked!');
});
```

All three do the same thing – they're just different ways to write the callback.

#### Callbacks in This Game

Here are real examples from the game code:

**Example 1: Running code for each obstacle**
```javascript
// forEach calls this function for each obstacle in the array
obstacles.forEach((obstacle, index) => {
  obstacle.update();  // Move the obstacle
  obstacle.draw();    // Draw it on screen
});
```
- `obstacle` = the current obstacle being processed
- `index` = which number obstacle this is (0, 1, 2, etc.)
- The callback runs once for each obstacle in the `obstacles` array

**Example 2: Responding to keyboard input**
```javascript
// When ANY key is pressed, run this callback
document.addEventListener('keydown', (e) => {
  // 'e' (event) tells us which key was pressed
  if (e.code === 'Space') {
    dino.jump();  // Make the dinosaur jump!
  }
});
```
- `'keydown'` = the type of event to listen for
- `(e) => { ... }` = the callback that runs when a key is pressed
- `e.code` = which key was pressed (provided by the browser)

**Example 3: Animation loop**
```javascript
// requestAnimationFrame calls gameLoop about 60 times per second
// This creates smooth animation
animationId = requestAnimationFrame(gameLoop);
```
- `gameLoop` is a function defined elsewhere in the code
- The browser calls `gameLoop` when it's ready to draw the next frame

📖 **MDN Reference:** [Callback Functions](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)

---

## Semicolons in JavaScript

Semicolons (`;`) are used to separate statements in JavaScript. While JavaScript has Automatic Semicolon Insertion (ASI), it's generally recommended to use explicit semicolons.

### When to Use Semicolons

**Use semicolons after:**

1. **Variable declarations:**
```javascript
const canvas = document.getElementById('gameCanvas');
let gameRunning = false;
let score = 0;
```

2. **Expressions and assignments:**
```javascript
score++;
gameSpeed += 0.5;
dino.dy = dino.jumpPower;
```

3. **Function expressions:**
```javascript
const square = function(x) {
  return x * x;
};

const double = (x) => x * 2;
```

4. **Return statements:**
```javascript
function getScore() {
  return score;
}
```

5. **Method calls:**
```javascript
console.log('Game started');
ctx.clearRect(0, 0, canvas.width, canvas.height);
jumpSound.play().catch((e) => console.log('Error:', e));
```

**Do NOT use semicolons after:**

1. **Function declarations:**
```javascript
function gameLoop() {
  // function body
} // No semicolon needed here
```

2. **Class declarations:**
```javascript
class Obstacle {
  constructor() {
    this.x = canvas.width;
  }
} // No semicolon needed here
```

3. **Control flow statements (if, for, while, etc.):**
```javascript
if (gameOver) {
  drawGameOver();
} // No semicolon needed here

for (let i = 0; i < 10; i++) {
  console.log(i);
} // No semicolon needed here
```

📖 **MDN Reference:** [Lexical Grammar - Automatic Semicolon Insertion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#automatic_semicolon_insertion)

---

### Automatic Semicolon Insertion (ASI)

JavaScript automatically inserts semicolons in certain situations, but relying on ASI can lead to unexpected behavior.

**Example of ASI pitfall:**
```javascript
// This may NOT work as expected!
return
{
  score: 100
}
// ASI inserts semicolon after 'return', so this returns undefined
```

**Correct way:**
```javascript
return {
  score: 100
};
// Opening brace on same line prevents ASI issues
```

📖 **MDN Reference:** [Automatic Semicolon Insertion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#automatic_semicolon_insertion)

---

## MDN Documentation Links

Here are essential MDN (Mozilla Developer Network) references for learning more about JavaScript:

### Functions
- [Functions Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) - Comprehensive guide to functions
- [Function Declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) - `function` statement reference
- [Function Expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function) - Function expressions
- [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) - Arrow function syntax
- [Method Definitions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions) - Object methods
- [Default Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters) - Setting default values
- [Rest Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) - Handling variable arguments

### Calling Functions
- [Calling Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#calling_functions) - How to invoke functions
- [Callback Functions](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) - Understanding callbacks
- [this Keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) - Context in function calls

### Syntax and Grammar
- [Lexical Grammar](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar) - JavaScript syntax rules
- [Statements and Declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements) - All JavaScript statements
- [Expressions and Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators) - JavaScript operators

### General JavaScript
- [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) - Complete JavaScript tutorial
- [JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) - Full language reference

---

## Practice with This Game

The best way to learn is by practicing! Try these exercises with the game code:

1. **Find function declarations** in `game.js` - look for functions like `checkCollision`, `spawnObstacle`, and `resetGame`

2. **Identify method definitions** - look at how `draw()` and `update()` methods are defined in the `dino` object and the `Obstacle` class

3. **Find arrow functions** - look for the `=>` syntax in event listeners and `forEach` loops

4. **Trace function invocations** - follow how `gameLoop()` calls other functions like `dino.update()` and `obstacle.draw()`

5. **Check semicolon usage** - notice how semicolons are used consistently after statements but not after function/class declarations

---

**Happy coding! 🎮**
