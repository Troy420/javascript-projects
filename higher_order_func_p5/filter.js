function randomNumber() {
  return Math.floor(Math.random() * 10);
}

let arr = Array(5).fill().map(randomNumber);
console.log(arr);

function isEven(num) {
  if (num % 2 == 0) {
    return true;
  } else {
    return false;
  }
  // TERNARY OPERATOR
  // (num % 2 == 0) ? true : false;

  // ARROW FUNCTION
  // num => num % 2 == 0
}

let newArr = arr.filter((num) => num % 2 == 0);
console.log(newArr);
