/** ------------------------------------ Variables */
const slideContainer = document.querySelector(".slider-container");
const slider = document.querySelector(".slider");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
let slides = document.querySelectorAll(".slide");
// console.log(slides); //4 nodeList

const intervalTime = 3000;
let index = 1;
let slideId;

// Cloning the first slide
const firstClone = slides[0].cloneNode(true);
// console.log(firstClone);

// Cloning the last slide
const lastClone = slides[slides.length - 1].cloneNode(true);
// console.log(lastClone);

// Getting the width of each slides
const slideWidth = slides[index].clientWidth;
// console.log(slideWidth);

firstClone.id = "first-clone";
// console.log(firstClone);
lastClone.id = "last-clone";
// console.log(lastClone);

//Appending the clones to slider
slider.append(firstClone);
slider.prepend(lastClone);

// Initial slide effect
slider.style.transform = `translateX(${-slideWidth * index}px)`;

/** ------------------------------------ FUNCTIONS */

// The ID value returned by setInterval() is used as the parameter for the clearInterval() method.
function startSlide() {
  slideId = setInterval(nextSlide, intervalTime);
}

function getTheNewClonedNodeLists() {
  return document.querySelectorAll(".slide");
}

function nextSlide() {
  if (index >= slides.length - 1) return;
  index++;
  slider.style.transform = `translateX(${-slideWidth * index}px)`;
  slider.style.transition = "all 0.5s linear";
}

function prevSlide() {
  if (index <= 0) return;
  index--;
  slider.style.transform = `translateX(${-slideWidth * index}px)`;
  slider.style.transition = "all 0.5s linear";
}

/** ------------------------------------ EVENT LISTENERS */

slider.addEventListener("transitionend", function () {
  slides = getTheNewClonedNodeLists();
  // console.log(slides); // now it returns 6 nodeList instead of 4
  if (slides[index].id === firstClone.id) {
    slider.style.transition = "none";
    index = 1;
    slider.style.transform = `translateX(${-slideWidth * index}px)`;
  }
  if (slides[index].id === lastClone.id) {
    slider.style.transition = "none";
    // why - 2? because the new nodeList have 6 nodes, the last node is a clone of the first node. this means that the last node is at the 4th index
    index = slides.length - 2;
    slider.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Stops the transition when mouse is inside the slider container
slideContainer.addEventListener("mouseenter", function () {
  clearInterval(slideId);
});

// Resumes the transition when mouse leaves the slider container
slideContainer.addEventListener("mouseleave", startSlide);

// invoke startSlide function
startSlide();
