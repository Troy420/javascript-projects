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
      autoplay: function () {
        return play();
      },
      infinite: function () {
        // 'afterbegin': Just inside the element, before its first child.
        // 'beforeEnd': Just inside the element, after its last child.
        // when infinite is turn on the lastelementchild will be moved to the first element with and offsetwidth of -600
        return moveItem(count - 1, -element.offsetTop + "px", "afterbegin");
      },
      initial: function () {
        var initial = 0 || options.initial >= count ? count : options.initial;
        return show(initial);
      },
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
   * Helper for moving items - last to be first or first to be the last. Needed
   * for infinite rotation of the carousel.
   *
   * @param {number} i - Position of the list item to move (either first or last).
   * @param {number} marginLeft - Left margin to position the item off-screen
   *        at the beginning or no margin at the end.
   * @param {string} position - Where to insert the item. One of the following -
   *        'afterBegin' or 'beforeEnd'.
   */
  function moveItem(i, marginLeft, position) {
    /*CASE: 
      moveItem({
        index: 0,
        marginLeft: "",
        position: "beforeEnd")
      }
    */

    // choose the item to move, in this case its the index 0
    let itemToMove = element.querySelectorAll("." + crslClass + " > ul li")[i];

    //give the margin left to none if its to the end, and -offsetWidth if its to the front
    itemToMove.style.marginLeft = marginLeft;

    // remove it because its being move to the back/front
    element.querySelector("." + crslClass + " > ul").removeChild(itemToMove);

    //Element.insertAdjacentHTML("beforeEnd/afterBegin", <li></li>);
    element
      .querySelector("." + crslClass + " > ul")
      .insertAdjacentHTML(position, itemToMove.outerHTML);
  }

  /**
   * Create the navigation dots and attach to carousel.
   */
  function showDots() {
    let dotContainer = document.createElement("ul");
    dotContainer.classList.add(crslDotsClass);

    /**
     * Moves the carousel to the desired slide on a navigation dot click.
     *
     * @param {object} e - The clicked dot element.
     */
    dotContainer.addEventListener("click", function (e) {
      // console.log(e); // PointerEvent Object
      if (e.target.tagName === "LI") {
        // gets the value of data-position attribute ex: 0/1/2/3
        show(e.target.getAttribute("data-position"));
      }
    });

    for (let i = 0; i < count; i++) {
      let dotElement = document.createElement("li");
      // <li data-position="0/1/2/3" >
      dotElement.setAttribute("data-position", i);
      dotContainer.appendChild(dotElement);
    }

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

  /**
   * Move the carousel forward.
   *
   * @public
   */
  function showNext() {
    if (options.infinite) {
      showNextInfinite();
    } else {
      showNextLinear();
    }

    resetInterval();
  }

  /**
   * Move the carousel backward.
   *
   * @public
   */
  function showPrev() {
    if (options.infinite) {
      showPrevInfinite();
    } else {
      showPrevLinear();
    }

    resetInterval();
  }

  /**
   * Helper function to show the next slide for LINEAR carousel.
   * If on the last slide - stop the play and do nothing else.
   */
  function showNextLinear() {
    if (currentIndex === count - 1) {
      stop();
      return;
    }

    animateNext(
      element.querySelectorAll("." + crslClass + " > ul li")[currentIndex]
    );

    adjustCurrentIndexTo(1);
  }

  /**
   * Helper function to show the next slide for INFINITE carousel.
   * Do the sliding, move the second item to the very end.
   */
  function showNextInfinite() {
    animateNext(element.querySelectorAll("." + crslClass + " > ul li")[1]);
    moveItem(0, "", "beforeEnd"); // i = 0, marginLeft = "", position = before the end

    adjustCurrentIndexTo(1);
  }

  /**
   * Helper function to show the previous slide for LINEAR carousel.
   * Stop the autoplay if user goes back. If on the first slide - do nothing.
   */
  function showPrevLinear() {
    stop();
    if (currentIndex === 0) {
      return;
    }
    animatePrev(
      element.querySelectorAll("." + crslClass + " > ul li")[currentIndex - 1]
    );

    adjustCurrentIndexTo(-1);
  }

  /**
   * Helper function to show the previous slide for INFINITE carousel.
   * Do the sliding, move the last item to the very beginning.
   */
  function showPrevInfinite() {
    animatePrev(element.querySelectorAll("." + crslClass + " > ul li")[0]);
    moveItem(count - 1, -element.offsetWidth + "px", "afterBegin");

    adjustCurrentIndexTo(-1);
  }

  /**
   * Adjust _current_ and highlight the respective dot.
   *
   * @param {number} val - defines which way current should be corrected.
   */
  function adjustCurrentIndexTo(val) {
    currentIndex += val; // currentIndex = currentIndex + val (val default value is 1)
    console.log(currentIndex); // current index is x (starts from 0) than x=0+1 ,, x=1+1,, x=2+1

    switch (currentIndex) {
      case -1:
        currentIndex = count - 1;
        alert("case is -1");
        break;
      case count: // atm the count is 5
        currentIndex = 0;
        alert("case is count");
        break;
      default:
        // alert("default");
        currentIndex = currentIndex;
    }

    if (options.dots) {
      currentDot();
    }
  }

  /**
   * Animate the carousel to go forward 1 slide.
   *
   * @param {object} item - The element to move into view.
   */
  function animateNext(item) {
    item.style.marginLeft = -element.offsetWidth + "px";
    // width is 600px so.. -600px
  }

  /**
   * Animate the carousel to go back 1 slide. Moves the very first (off-screen)
   * item to the visible area.
   *
   * @param {object} item - The element to move into view.
   */
  function animatePrev(item) {
    item.style.marginLeft = "";
  }

  /**
   * Reset the autoplay interval.
   */
  function resetInterval() {
    if (cycle) {
      stop();
      play();
    }
  }

  /**
   * Start the auto play.
   * If already playing do nothing.
   *
   * @public
   */
  function play() {
    if (cycle) {
      return;
    }
    cycle = setInterval(showNext.bind(this), interval);
  }

  /**
   * Stop the auto play.
   *
   * @public
   */
  function stop() {
    clearInterval(cycle);
    cycle = null;
  }
}
