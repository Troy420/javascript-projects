function randomNumber() {
  return Math.floor(Math.random() * 10);
}

let arr = Array(5).fill().map(randomNumber);
console.log(arr);

// function plus(acc, val) {
//   // console.log(acc);
//   // console.log(val);
//   return acc + val;
// }

// function findMax(acc, val) {
//   // if (val > acc) {
//   //   acc = val;
//   // }
//   // return acc;
//   return val > acc ? val : acc;
// }

let answer = arr.reduce((acc, val) => acc + val);
console.log("sum is " + answer);

let answer2 = arr.reduce((acc, val) => (val > acc ? val : acc));
console.log("findMax is " + answer2);
