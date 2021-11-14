const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");

// Inline callback function
// forEach(function(element, index, array){ ... })
slides.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;

  // console.log(slide);
  // console.log(index);
  // console.log(array);
});

let count = 0;
nextBtn.addEventListener("click", function () {
  count++;
  carousel();
});

prevBtn.addEventListener("click", function () {
  count--;
  carousel();
});

function carousel() {
  slides.forEach(function (slide) {
    if (count > slides.length - 1) {
      count = 0;
    }
    if (count < 0) {
      count = slides.length - 1;
    }

    slide.style.transform = `translateX(-${count * 100}%)`;
    // console.log(slides.length);
    // console.log(slide);
    // console.log(count);
  });
}

setInterval(function () {
  count++;
  carousel();
}, 3000);
