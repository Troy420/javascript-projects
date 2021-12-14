// SET DATE
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// CLOSE LINKS
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", () => {
  // Element.getBoundingClientRect()
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

// fixed navbar
// window.pageYOffset  is a read-only window property that returns the number of pixels the document has been scrolled vertically.
window.addEventListener("scroll", () => {
  const nav = document.getElementById("nav");
  const navHeight = nav.getBoundingClientRect().height;
  const topLinks = document.querySelector(".top-link");
  const scrollHeight = window.pageYOffset;

  if (scrollHeight > navHeight) {
    nav.classList.add("fixed-nav");
  } else {
    nav.classList.remove("fixed-nav");
  }

  // show to top link button
  if (scrollHeight > 1000) {
    topLinks.classList.add("show-link");
  } else {
    topLinks.classList.remove("show-link");
  }
});

// smooth scroll
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    console.log(element);
  });
});
