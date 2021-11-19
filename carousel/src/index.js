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
let currentSlide = document.querySelector("current-slide");

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
  cloneArrayForBefore.push(slide.cloneNode(true));
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

// Set current slide
slides[0].classList.add("current-slide");

/** -------------------------------------------------- FUNCTIONS */
// Setting the position for each of the slides
function setSlidePosition(slide, index) {
  slide.style.left = `${slideWidth * index}px`;
}
slides.forEach(setSlidePosition);

function moveSlide(currentSlide, targetSlide) {
  track.style.transition = "transform 500ms";
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
  // Update the Slides Array
  slides = getTheNewClonedSlideLists();
  dots = getTheNewClonedDotLists();

  currentSlide = track.querySelector(".current-slide");
  let targetSlide = currentSlide.nextElementSibling;

  // index is 0
  index++;

  if (currentSlide.id === thirdSlideClone.id) {
    targetSlide = firstSlideClone.previousElementSibling;
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
  slides = getTheNewClonedSlideLists();
  currentSlide = track.querySelector(".current-slide");
  let targetSlide = currentSlide.previousElementSibling;

  // Index is 0
  index--;

  if (currentSlide.id === thirdLastSlideClone.id) {
    targetSlide = lastSlideClone.nextElementSibling;
  }

  console.dir("index: " + index);
  console.dir("currentSlide: " + currentSlide.id);
  console.log("targetSlide: " + targetSlide.id);

  // dots = getTheNewClonedDotLists();
  // console.log(slides);

  // const currentSlide = track.querySelector(".current-slide");
  // const currentDot = dottedNav.querySelector(".current-slide");
  // const prevDot = currentDot.previousElementSibling;
  // const amountToMove = prevSlide.style.left;

  track.style.transform = `translateX(${slideWidth * Math.abs(index)}px)`;
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
  // dots = getTheNewClonedDotLists();
  // console.log(currentSlide.id); // now it returns 12 nodeList
  // console.log(dots);
  // console.log(index);
  // console.log(slides.length);
  // console.log(slides[index].id);

  if (currentSlide.id === firstSlideClone.id) {
    track.style.transition = "none";
    // alert(track.style.transition);
    if (index >= 4) {
      index = 1;
    }
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }

  if (currentSlide.id === thirdLastSlideClone.id) {
    track.style.transition = "none";
    if (index <= -4) {
      index = 0;
    }
    track.style.transform = `translateX(${slideWidth * 0}px)`;
  }

  // if (dots[index].id === firstDotClone.id) {
  //   if (index >= dots.length - 2) {
  //     index = 1;
  //   }
  // }
});
