// Array of images
// const images = [""];

/** -------------------------------------------------- VARIABLES */
const track = document.querySelector(".carousel__track");
// console.log(track);
let slides = [...track.children];
// console.log(slides); // Array of Nodes
const nextBtn = document.querySelector(".carousel__button--right");
const prevBtn = document.querySelector(".carousel__button--left");
const dottedNav = document.querySelector(".carousel__nav");

// Another way of making Array of Nodes
let dots = Array.from(dottedNav.children);
// console.log(dots);

let index = 0;

// Getting the width of the slide
const slideWidth = slides[0].getBoundingClientRect().width;
// console.log(slideWidth);
/** -------------------------------------------------- CLONING */
let cloneArrayForNext = [];
let cloneArrayForBefore = [];
slides.forEach(function (slide) {
  cloneArrayForNext.push(slide.cloneNode(true));
  cloneArrayForNext[0].classList.remove("current-slide");
  cloneArrayForBefore.push(slide.cloneNode(true));
  // cloneArrayForBefore[0].classList.remove("current-slide");
});

// Cloning the >>> slide
const firstSlideClone = cloneArrayForNext[0];
const secondSlideClone = cloneArrayForNext[1];
const thirdSlideClone = cloneArrayForNext[2];
const fourthSlideClone = cloneArrayForNext[3];

// Gives the clone an ID
firstSlideClone.id = "first-slide-clone";
secondSlideClone.id = "second-slide-clone";
thirdSlideClone.id = "third-slide-clone";
fourthSlideClone.id = "fourth-slide-clone";

// Appending >>> to track
track.append(
  firstSlideClone,
  secondSlideClone,
  thirdSlideClone,
  fourthSlideClone
);

// Cloning the <<< slide
const lastSlideClone = cloneArrayForBefore[3];
const secondLastSlideClone = cloneArrayForBefore[2];
const thirdLastSlideClone = cloneArrayForBefore[1];
const fourthLastSlideClone = cloneArrayForBefore[0];

// Gives the clone and ID
lastSlideClone.id = "last-slide-clone";
secondLastSlideClone.id = "second-last-slide-clone";
thirdLastSlideClone.id = "third-last-slide-clone";
fourthLastSlideClone.id = "fourth-last-slide-clone";

// Prepending <<< to track
track.prepend(
  fourthLastSlideClone,
  thirdLastSlideClone,
  secondLastSlideClone,
  lastSlideClone
);

// CLONING DOTS
const firstDotClone = dots[0].cloneNode(true);
const lastDotClone = dots[dots.length - 1].cloneNode(true);
// Gives the clone an ID
firstDotClone.id = "first-dot-clone";
firstDotClone.classList.remove("current-slide");
lastDotClone.id = "last-dot-clone";
// then append it to carousel track

dottedNav.append(firstDotClone);
dottedNav.prepend(lastDotClone);
// console.log(slides);

// set position of the first clones after the original last image
setSlidePosition(firstSlideClone, slides.length);
setSlidePosition(secondSlideClone, slides.length + 1);
setSlidePosition(thirdSlideClone, slides.length + 2);
setSlidePosition(fourthSlideClone, slides.length + 3);
// set position of the last clones before the original first image
setSlidePosition(lastSlideClone, slides.length - 5);
setSlidePosition(secondLastSlideClone, slides.length - 6);
setSlidePosition(thirdLastSlideClone, slides.length - 7);
setSlidePosition(fourthLastSlideClone, slides.length - 8);

/** -------------------------------------------------- FUNCTIONS */
// Setting the position for each of the slides
function setSlidePosition(slide, index) {
  slide.style.left = `${slideWidth * index}px`;
}
slides.forEach(setSlidePosition);

function moveSlide(currentSlide, targetSlide) {
  track.style.transition = "transform 500ms";
  // track.style.transform = `translateX(-${slideWidth * index}px)`;
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
}

function updateDots(currentDot, targetDot) {
  if (currentDot != targetDot) {
    currentDot.classList.remove("current-slide");
  }
  targetDot.classList.add("current-slide");
}

function getTheNewClonedSlideLists() {
  return [...track.children];
}
function getTheNewClonedDotLists() {
  return [...dottedNav.children];
}

/** ------------------------------------------------- EVENT LISTENERS */
// When I click right, move slides to the right
nextBtn.addEventListener("click", function () {
  index++;
  console.log(index);
  slides[0].classList.remove("current-slide");
  console.log(slides);
  // Update the Slides Array
  slides = getTheNewClonedSlideLists();
  dots = getTheNewClonedDotLists();

  const currentSlide = track.querySelector(".current-slide");
  let targetSlide = currentSlide.nextElementSibling;

  if (targetSlide.id === firstSlideClone.id) {
    targetSlide = track.firstElementChild.nextElementSibling;
  }

  let currentDot = dottedNav.querySelector(".current-slide");
  let nextDot = currentDot.nextElementSibling;
  if (nextDot.id === firstDotClone.id) {
    // currentDot.classList.remove("current-slide");
    nextDot = dottedNav.firstElementChild.nextElementSibling;
  }

  track.style.transform = `translateX(-${slideWidth * index}px)`;
  moveSlide(currentSlide, targetSlide);
  updateDots(currentDot, nextDot);
});

// When I click left, move slides to the left
prevBtn.addEventListener("click", function () {
  // Update the Slides Array
  slides = getTheNewClonedSlideLists();
  // console.log(slides);
  index = 2;
  // console.log(index);
  const currentSlide = slides[2];
  // currentSlide.classList.add("current-slide");
  // console.log(currentSlide);
  const targetSlide = currentSlide.previousElementSibling;
  index--;
  // if (index < 0) {
  //   index = index * -3; // (3)
  // }
  // console.log(index);
  // console.log(slides);

  // dots = getTheNewClonedDotLists();
  // console.log(slides);

  // const currentSlide = track.querySelector(".current-slide");
  // const currentDot = dottedNav.querySelector(".current-slide");
  // const prevDot = currentDot.previousElementSibling;
  // const amountToMove = prevSlide.style.left;

  track.style.transform = `translateX(${slideWidth * index}px)`;
  moveSlide(currentSlide, targetSlide);
  // updateDots(currentDot, prevDot);
});

// When I click the nav indicators, move to that slides
dottedNav.addEventListener("click", function (e) {
  index++;
  // event.currentTarget() refers to the element to which the event handler has been attached, in this case its carousel__nav
  // console.log(e.currentTaret);

  // event.target()
  // console.log(e.target);

  // Element.closest()
  const targetDot = e.target.closest("button");
  // console.log(targetDot);
  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dottedNav.querySelector(".current-slide");

  // Find the index of the carousel__indicator
  const targetIndex = dots.findIndex(function (dot) {
    return dot === targetDot;
  });
  // Target the slide according to the chosen index
  const targetSlide = slides[targetIndex];

  moveSlide(currentSlide, targetSlide);

  updateDots(currentDot, targetDot);
});

track.addEventListener("transitionend", function () {
  slides = getTheNewClonedSlideLists();
  // dots = getTheNewClonedDotLists();
  // console.log(slides); // now it returns 12 nodeList
  // console.log(dots);

  // console.log(index);
  // console.log(slides.length);
  // console.log(slides[index].attributes[1]);

  if (slides[index].id === "stop-trans") {
    track.style.transition = "none";
    if (index >= 4) {
      index = 1;
    }
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }
  // if (dots[index].id === firstDotClone.id) {
  //   if (index >= dots.length - 2) {
  //     index = 1;
  //   }
  // }
  // if (slides[index].id === lastSlideClone.id) {
  //   track.style.transition = "none";
  //   // why - 2? because the new nodeList have 6 nodes, the last node is a clone of the first node. this means that the last node is at the 4th index
  //   index = slides.length;
  //   track.style.transform = `translateX(${slideWidth * index}px})`;
  //   // moveSlide();
  // }
});
