let count = 0;

const value = document.querySelector("#value");
const btns = document.querySelectorAll(".btn");

// console.log(btns);
// console.log(value);

btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const styles = e.currentTarget.classList;

    if (styles.contains("decrease")) {
      count--;
    } else if (styles.contains("increase")) {
      count++;
    } else {
      count = 0;
    }

    count < 0 ? (value.style.color = "#F2244A") : "";
    count > 0 ? (value.style.color = "#0A8F79") : "";
    count === 0 ? (value.style.color = "#222") : "";
    value.textContent = count;
  });
});
