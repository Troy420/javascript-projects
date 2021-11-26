let vals = [4, 8, 9, -3, 2];
console.log(vals);

// function doubler(x) {
//   return x * 2;
// }

// vals = vals.map(doubler);
// console.log(vals);

// ARROW FUNCTION VERSION
vals = vals.map((x) => x * 2);
console.log(vals);

// FILL
// let arr = new Array(100);
// console.log(arr);

function amount() {
  return Math.floor(Math.random() * 10);
}

// arr = arr.fill().map(amount);
// console.log(arr);

let arr = Array(100).fill().map(amount);
console.log(arr);
