/* 
  @params {object} options - user defined settings for the carousel.
  @params {string} options.elem [options.elem=carousel] - The HTML ID of the carousel container
  @params {number} options.interval [options.interval=3000] - The interval between slide change.
  @param {(boolean)} [options.infinite=false] - Enables infinite mode for the carousel.
  @param {(boolean)} [options.autoplay=false] - Enables auto play for slides.
  @param {number} [options.interval=3000] - The interval between slide change. @param {number} [options.show=0] - Index of the slide to start on. Numeration begins at 0.
  @params {(string)} options.btnPlayText [options.btnPlayText=Play] - Text for _PLAY_ button.
  @params {(string)} options.btnStopText [options.btnStopText=Stop] - Text for _STOP_ button.
  @params {(string)} options.arrPrevText [options.arrPrevText=&laquo;] - Text for _PREV_ button.
  @params {(string)} options.arrNextText [options.btnStopText=&raquo;] - Text for _NEXT_ button.
*/

/* According to the book "Javascript: the good parts", you should only capitalise the first character of the name of a function when you need to construct the object by "new" keyword.
This is the Constructor Invocation Pattern, but the book says 'the use of this style of constructor functions is not recommended'??
*/
function Carousel(options) {
  let element = document.getElementById(options.elem || "carousel"),
    interval = options.interval || 3000,
    count = element.querySelectorAll("li").length,
    currentIndex = 0,
    cycle = null,
    // TEXT
    btnPlayText = options.btnPlayText || "Play",
    btnStopText = options.btnStopText || "Stop",
    arrPrevText = options.arrPrevText || "&laquo;",
    arrNextText = options.arrNextText || "&raquo;",
    // CLASS
    crslClass = "js-Carousel",
    crslArrowPrevClass = "js-Carousel-arrowPrev",
    crslArrowNextClass = "js-Carousel-arrowNext",
    crslDotsClass = "js-Carousel-dots",
    crslButtonStopClass = "js-Carousel-btnStop",
    crslButtonPlayClass = "js-Carousel-btnPlay";

  /**
   * Render the carousel if more than one slide.
   * Otherwise just show the single item.
   */
  if (count > 1) {
    render();
  }

  /**
   * Render the carousel and all the navigation elements (arrows, dots,
   * play/stop buttons) if needed. Start with a particular slide, if set.
   * If infinite - move the last item to the very beginning and off the display area.
   */
  function render() {
    let actions = {
      dots: function () {
        return showDots();
      },
      // arrows: function () {
      //   return showArrows();
      // },
      // buttons: function () {
      //   return showButtons();
      // },
      // autoplay: function () {
      //   return play();
      // },
      // infinite: function () {
      //   // 'afterbegin': Just inside the element, before its first child.
      //   return moveItem(count - 1, -element.offsetTop + "px", "afterbegin");
      // },
      // initial: function () {
      //   var initial = 0 || options.initial >= count ? count : options.initial;
      //   return show(initial);
      // },
    };

    for (let key in actions) {
      // console.log(key);
      // console.log(options.hasOwnProperty(key));
      // console.log(options[key]);
      if (options.hasOwnProperty(key) && options[key]) {
        // invoke the function according to the keys
        actions[key]();
      }
    }
  }

  /**
   * Create the navigation dots and attach to carousel.
   */
  function showDots() {
    let dotContainer = document.createElement("ul");
    dotContainer.classList.add(crslDotsClass);

    for (let i = 0; i < count; i++) {
      let dotElement = document.createElement("li");
      dotElement.setAttribute("data-position", i);
      dotContainer.appendChild(dotElement);
    }

    /**
     * Moves the carousel to the desired slide on a navigation dot click.
     *
     * @param {object} e - The clicked dot element.
     */
    dotContainer.addEventListener("click", function (e) {
      // console.log(e); // PointerEvent Object
      if (e.target.tagName === "LI") {
        // gets the value of data-position attribute
        show(e.target.getAttribute("data-position"));
        // console.log(e.target);
      }
    });

    element.appendChild(dotContainer);
    currentDot();
  }

  /**
   * Highlight the corresponding dot of the currently visible carousel item.
   */
  function currentDot() {
    let dotContainer = document.querySelector("." + crslDotsClass);
    let crslDotsClassLI = dotContainer.querySelectorAll("li");
    crslDotsClassLI.forEach(function (item) {
      // console.log(item);
      item.classList.remove("is-active");
    });
    crslDotsClassLI[currentIndex].classList.add("is-active");
  }

  /**
   * Move the carousel to the desired slide.
   *
   * @param {number} dataPositionValue - The index of data position.
   * @public
   */
  function show(dataPositionValue) {
    let index = currentIndex - dataPositionValue;
    if (index < 0) {
      moveByIndex(-index, showNext);
    } else {
      moveByIndex(index, showPrev);
    }
  }

  /**
   * Helper to move the slides by index. THIS IS A CALLBACK FUNCTION
   *
   * @param {number} idx - how many slides to move.
   * @param {function} direction - function to move forward or back.
   */
  function moveByIndex(idx, direction) {
    for (let i = 0; i < idx; i++) {
      direction();
    }
  }

  function showNext() {
    console.log("show next");
  }

  function showPrev() {
    console.log("show prev");
  }
}
