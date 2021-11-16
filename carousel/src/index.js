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
// Cloning the first slide
const firstSlideClone = slides[0].cloneNode(true);
const firstDotClone = dots[0].cloneNode(true);
// Give the first clone an ID
firstSlideClone.id = "first-slide-clone";
firstSlideClone.classList.remove("current-slide");
firstDotClone.id = "first-dot-clone";
firstDotClone.classList.remove("current-slide");
// Cloning the last slide
const lastSlideClone = slides[slides.length - 1].cloneNode(true);
const lastDotClone = dots[dots.length - 1].cloneNode(true);
// Give the last clone an ID
lastSlideClone.id = "last-slide-clone";
lastDotClone.id = "last-dot-clone";
// then append it to carousel track
track.append(firstSlideClone);
dottedNav.append(firstDotClone);
track.prepend(lastSlideClone);
dottedNav.prepend(lastDotClone);

// set position of the last clones behind the origin first image
lastSlideClone.style.left = `${slideWidth * -1}px`;
firstSlideClone.style.left = `${slideWidth * slides.length}px`;

/** -------------------------------------------------- FUNCTIONS */
// Setting the position for each of the slides
function setSlidePosition(slide, index) {
  slide.style.left = `${slideWidth * index}px`;
}
slides.forEach(setSlidePosition);

function moveSlide(currentSlide, targetSlide) {
  track.style.transition = "transform 500ms";
  track.style.transform = `translateX(-${slideWidth * index}px)`;
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
// When I click left, move slides to the left
nextBtn.addEventListener("click", function () {
  index++;
  // console.log(index);
  slides = getTheNewClonedSlideLists();
  dots = getTheNewClonedDotLists();
  // Current slide
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

  // const amountToMove = nextSlide.style.left;
  // Move to the next slide
  // track.style.transform = `translateX(-${amountToMove})`;
  // currentSlide.classList.remove("current-slide");
  // nextSlide.classList.add("current-slide");
  moveSlide(currentSlide, targetSlide);
  updateDots(currentDot, nextDot);
});

// When I click right, move slides to the right
prevBtn.addEventListener("click", function () {
  index--;
  // console.log(index);
  // Current slide
  const currentSlide = track.querySelector(".current-slide");
  const targetSlide = currentSlide.previousElementSibling;
  const currentDot = dottedNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  // const amountToMove = prevSlide.style.left;

  // Move to the previouse slide
  // track.style.transform = `translateX(-${amountToMove})`;
  // currentSlide.classList.remove("current-slide");
  // prevSlide.classList.add("current-slide");
  moveSlide(currentSlide, targetSlide);
  updateDots(currentDot, prevDot);
});

// When I click the nav indicators, move to that slides
dottedNav.addEventListener("click", function (e) {
  index++;
  // event.currentTarget() refers to the element to which the event handler has been attached, in this case its carousel__nav
  // console.log(e.currentTarget);

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
  dots = getTheNewClonedDotLists();
  // console.log(slides); // now it returns 12 nodeList instead of 10
  // console.log(dots);

  if (slides[index].id === firstSlideClone.id) {
    track.style.transition = "none";
    if (index >= slides.length - 2) {
      index = 1;
    }
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }
  if (dots[index].id === firstDotClone.id) {
    if (index >= dots.length - 2) {
      index = 1;
    }
  }
  if (slides[index].id === lastSlideClone.id) {
    track.style.transition = "none";
    // why - 2? because the new nodeList have 6 nodes, the last node is a clone of the first node. this means that the last node is at the 4th index
    index = slides.length - 2;
    track.style.transform = `translateX(-${slideWidth * index}px})`;
    // moveSlide();
  }
});
