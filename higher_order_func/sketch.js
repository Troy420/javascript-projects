// THIS IS A HIGHER ORDER FUNCTION RETURNING A FUNCTION
function multiplier(factor) {
  return function (x) {
    return x * factor;
  };
  // the arrow function is like this
  // return x => x * factor;
}

let doubler = multiplier(2);

console.log(doubler(4)); // 8

// THIS IS A HIGHER ORDER FUNCTION RECEIVING A FUNCTION - CALLBACK
function sing(callback) {
  console.log("LALALALA");
  if (callback) {
    callback();
  }
}
function meow() {
  console.log("Meow Meow");
}

sing(); // LALALALA
sing(meow); // LALALALA Meow Meow
