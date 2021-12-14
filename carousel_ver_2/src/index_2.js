/* 
  @params {object} _options - user defined settings for the carousel.
  @params {string} _options.elem [_options.elem=carousel] - The HTML ID of the carousel container
  @params {number} _options.interval [_options.interval=3000] - The interval between slide change.
  @param {(boolean)} [_options.infinite=false] - Enables infinite mode for the carousel.
  @param {(boolean)} [_options.autoplay=false] - Enables auto play for slides.
  @param {number} [_options.interval=3000] - The interval between slide change. @param {number} [_options.show=0] - Index of the slide to start on. Numeration begins at 0.
  @params {(string)} _options.btnPlayText [_options.btnPlayText=Play] - Text for _PLAY_ button.
  @params {(string)} _options.btnStopText [_options.btnStopText=Stop] - Text for _STOP_ button.
  @params {(string)} _options.arrPrevText [_options.arrPrevText=&laquo;] - Text for _PREV_ button.
  @params {(string)} _options.arrNextText [_options.btnStopText=&raquo;] - Text for _NEXT_ button.
*/

const cssClasses = {
  crslClass: "js-Carousel",
  crslArrowPrevClass: "js-Carousel-arrowPrev",
  crslArrowNextClass: "js-Carousel-arrowNext",
  crslDotsClass: "js-Carousel-dots",
  crslButtonStopClass: "js-Carousel-btnStop",
  crslButtonPlayClass: "js-Carousel-btnPlay",
};

/* this is equal to 
  function Carousel(_options) { ... }
*/
class Carousel {
  constructor(_options) {
    // this. =  carousel.
    this.options = _options;
    this.element = document.getElementById(_options.elem || "carousel");
    this.interval = _options.interval || 3000;
    this.count = this.element.querySelectorAll("li").length;
    this.currentIndex = 0;
    this.cycle = null;
    // TEXT
    this.btnPlayText = _options.btnPlayText || "Play";
    this.btnStopText = _options.btnStopText || "Stop";
    this.arrPrevText = _options.arrPrevText || "&laquo;";
    this.arrNextText = _options.arrNextText || "&raquo;";

    this.imgWidth =
      this.element.getElementsByTagName("img")[this.currentIndex].offsetWidth;
  }

  /**
   * Render the carousel if more than one slide.
   * Otherwise just show the single item.
   */
  get render() {
    if (this.count > 1) {
      return this._render();
    }
  }

  /**
   * Render the carousel and all the navigation elements (arrows, dots,
   * play/stop buttons) if needed. Start with a particular slide, if set.
   * If infinite - move the last item to the very beginning and off the display area.
   */
  _render() {
    let actions = {
      /**
       * this - it's a context, in first example function() {} has its own context, but es2015 anonymous function does not have its own context, so this points to context in the upper scope
       */
      dots: () => {
        // console.log("this", this);
        return this._showDots();
      },
      arrows: () => {
        return this._showArrows();
      },
      buttons: () => {
        return this._showButtons();
      },
      autoplay: () => {
        return this._play();
      },
      infinite: () => {
        // 'afterbegin': Just inside the element, before its first child.
        // 'beforeEnd': Just inside the element, after its last child.
        // when infinite is turn on the lastelementchild will be moved to the first element with and offsetwidth of -600
        return this._moveItem(
          this.count - 1,
          `-${this.imgWidth}px`,
          "afterbegin"
        );
      },
      initial: () => {
        let initial =
          0 || this.options.initial >= this.count
            ? this.count
            : this.options.initial;
        return this._show(initial);
      },
    };

    for (let key in actions) {
      // console.log(
      //   "carousel.options.hasOwnProperty(key)",
      //   this.options.hasOwnProperty(key)
      // );
      // console.log("carousel.options[key]", this.options[key]);
      // console.log("actions[key]", actions[key]);
      if (this.options.hasOwnProperty(key) && this.options[key]) {
        // invoke the function according to the keys
        actions[key]();
      }
    }
  }

  /**
   * Create the navigation dots and attach to carousel.
   */
  _showDots() {
    let dotContainer = document.createElement("ul");
    dotContainer.classList.add(cssClasses.crslDotsClass);

    /**
     * Moves the carousel to the desired slide on a navigation dot click.
     *
     * @param {object} e - The clicked dot element.
     */
    dotContainer.addEventListener("click", (e) => {
      // console.log(e); // PointerEvent Object
      if (e.target.tagName === "LI") {
        // gets the value of data-position attribute ex: 0/1/2/3
        this._show(e.target.getAttribute("data-position"));
      }
    });

    for (let i = 0; i < this.count; i++) {
      let dotElement = document.createElement("li");
      // <li data-position="0/1/2/3" >
      dotElement.setAttribute("data-position", i);
      dotContainer.appendChild(dotElement);
    }

    this.element.appendChild(dotContainer);
    this._currentDot();
  }

  /**
   * Highlight the corresponding dot of the currently visible carousel item.
   */
  _currentDot() {
    let dotContainer = document.querySelector("." + cssClasses.crslDotsClass);
    let crslDotsClassLI = dotContainer.querySelectorAll("li");
    crslDotsClassLI.forEach((item) => {
      // remove is-active for all li
      item.classList.remove("is-active");
    });
    // add is-active to the current index
    crslDotsClassLI[this.currentIndex].classList.add("is-active");
    // console.log("current index", this.currentIndex);
  }

  /**
   * Move the carousel to the desired slide.
   *
   * @param {number} initial - this.options.initial
   * @public
   */
  _show(initial) {
    let index = this.currentIndex - initial;
    if (index < 0) {
      this._moveByIndex(-index, this._showNext);
    } else {
      this._moveByIndex(index, this._showPrev);
    }
  }

  /**
   * Helper to move the slides by index. THIS IS A CALLBACK FUNCTION
   *
   * @param {number} idx - how many slides to move.
   * @param {function} direction - function to move forward or back.
   */
  _moveByIndex(idx, direction) {
    // console.log("idx", idx);
    for (let i = 0; i < idx; i++) {
      direction.call(this);
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
  _moveItem(i, marginLeft, position) {
    // choose the item to move, depending on the arrow button we click
    // if next is clicked i = 0 (front)
    // if prev is clicked i = 9 (back)
    let itemToMove = this.element.querySelectorAll(
      "." + cssClasses.crslClass + " > ul li"
    )[i];

    // console.log("itemToMove", itemToMove);
    console.log("i", i);

    //give the margin left to "" when next is clicked, and -160 when prev is clicked
    itemToMove.style.marginLeft = marginLeft;

    console.log(marginLeft);

    // remove it because its being move to the back/front
    this.element
      .querySelector("." + cssClasses.crslClass + " > ul")
      .removeChild(itemToMove);

    // when next is clicked position is beforeend
    // when prev is clicked position is afterbegin
    this.element
      .querySelector("." + cssClasses.crslClass + " > ul")
      .insertAdjacentHTML(position, itemToMove.outerHTML);

    console.log("position", position);
  }

  /**
   * Move the carousel forward.
   *
   * @public
   */
  _showNext() {
    if (this.options.infinite) {
      this._showNextInfinite();
    } else {
      this._showNextLinear();
    }

    this._resetInterval();
  }

  /**
   * Helper function to show the next slide for LINEAR carousel.
   * If on the last slide - stop the play and do nothing else.
   */
  _showNextLinear() {
    // stop and do nothing at the end of the slides
    if (this.currentIndex === this.count - 1) {
      this._stop();
      return;
    }

    // _animateNext(item)
    this._animateNext(
      this.element.querySelectorAll("." + cssClasses.crslClass + " > ul li")[
        this.currentIndex
      ]
    );

    // _adjustCurrentIndexTo(val)
    // this.currentIndex += val;
    this._adjustCurrentIndexTo(1);
  }

  /**
   * Helper function to show the next slide for INFINITE carousel.
   * Do the sliding, move the second item to the very end.
   */
  _showNextInfinite() {
    // _animateNext(item)
    // why [1] because [0] is the last index moved to the front
    this._animateNext(
      this.element.querySelectorAll("." + cssClasses.crslClass + " > ul li")[1]
    );

    // move item with index 0 to the end and set margin left to ""
    this._moveItem(0, "", "beforeend"); // i = 0, marginLeft = "", position = before the end

    this._adjustCurrentIndexTo(1);
  }

  /**
   * Move the carousel backward.
   *
   * @public
   */
  _showPrev() {
    if (this.options.infinite) {
      this._showPrevInfinite();
    } else {
      this._showPrevLinear();
    }

    this._resetInterval();
  }

  /**
   * Helper function to show the previous slide for LINEAR carousel.
   * Stop the autoplay if user goes back. If on the first slide - do nothing.
   */
  _showPrevLinear() {
    this._stop();
    if (this.currentIndex === 0) {
      return;
    }
    this._animatePrev(
      this.element.querySelectorAll("." + cssClasses.crslClass + " > ul li")[
        this.currentIndex - 1
      ]
    );
    console.log(
      this.element.querySelectorAll("." + cssClasses.crslClass + " > ul li")[
        this.currentIndex - 1
      ]
    );

    this._adjustCurrentIndexTo(-1);
  }

  /**
   * Helper function to show the previous slide for INFINITE carousel.
   * Do the sliding, move the last item to the very beginning.
   */
  _showPrevInfinite() {
    this._animatePrev(
      this.element.querySelectorAll("." + cssClasses.crslClass + " > ul li")[0]
    );
    this._moveItem(this.count - 1, `-${this.imgWidth}px`, "afterBegin");

    this._adjustCurrentIndexTo(-1);
  }

  /**
   * Adjust _current_ and highlight the respective dot.
   *
   * @param {number} val - defines which way current should be corrected.
   */
  _adjustCurrentIndexTo(val) {
    this.currentIndex += val; // currentIndex = currentIndex + val (val default value is 1)

    // current index is x (starts from 0) than x=0+1 ,, x=1+1,, x=2+1
    switch (this.currentIndex) {
      // if current index is -1 mutate to 9
      case -1:
        this.currentIndex = this.count - 1;
        break;

      // if current index is 10 mutate to 0
      case this.count:
        this.currentIndex = 0;
        break;

      default:
        this.currentIndex = this.currentIndex;
    }

    if (this.options.dots) {
      this._currentDot();
    }
  }

  /**
   * Animate the carousel to go forward 1 slide.
   *
   * @param {object} item - The element to move into view.
   */
  _animateNext(item) {
    // console.log(this.count / 2);
    item.style.marginLeft = `-${this.imgWidth}px`;
  }

  /**
   * Animate the carousel to go back 1 slide. Moves the very first (off-screen)
   * item to the visible area.
   *
   * @param {object} item - The element to move into view.
   */
  _animatePrev(item) {
    item.style.marginLeft = "";
  }

  /**
   * Reset the autoplay interval.
   */
  _resetInterval() {
    if (this.cycle) {
      this._stop();
      this._play();
    }
  }

  /**
   * Start the auto play.
   * If already playing do nothing.
   *
   * @public
   */
  _play() {
    if (this.cycle) {
      return;
    }
    this.cycle = setInterval(this._showNext.bind(this), this.interval);
  }

  /**
   * Stop the auto play.
   *
   * @public
   */
  _stop() {
    clearInterval(this.cycle);
    this.cycle = null;
  }

  /**
   * Shows the Arrow.
   *
   * @public
   */
  _showArrows() {
    const btnPrevTag = document.createElement("button");
    btnPrevTag.innerHTML = this.arrPrevText;
    btnPrevTag.classList.add(cssClasses.crslArrowPrevClass);
    this.element.insertAdjacentElement("afterbegin", btnPrevTag);
    btnPrevTag.addEventListener("click", () => {
      this._showPrev();
    });

    const btnNextTag = document.createElement("button");
    btnNextTag.innerHTML = this.arrNextText;
    btnNextTag.classList.add(cssClasses.crslArrowNextClass);
    this.element.insertAdjacentElement("beforeend", btnNextTag);
    btnNextTag.addEventListener("click", () => {
      console.log("current index", this.currentIndex);
      this._showNext();
    });
  }

  /**
   * Shows the Button.
   *
   * @public
   */
  _showButtons() {
    const btnPlay = document.createElement("button");
    btnPlay.innerHTML = this.btnPlayText;
    btnPlay.classList.add(cssClasses.crslButtonPlayClass);
    this.element.insertAdjacentElement("afterbegin", btnPlay);
    btnPlay.addEventListener("click", () => {
      this._play();
    });

    const btnStop = document.createElement("button");
    btnStop.innerHTML = this.btnStopText;
    btnStop.classList.add(cssClasses.crslButtonStopClass);
    this.element.insertAdjacentElement("beforeend", btnStop);
    btnStop.addEventListener("click", () => {
      this._stop();
    });
  }
}
// let carousel = new Carousel({
//   //these are _options

//   elem: "carousel", // id of the carousel container
//   autoplay: false, // starts the rotation automatically
//   infinite: true, // enables the infinite mode
//   interval: 1500, // interval between slide changes
//   initial: 0, // slide to start with
//   dots: true, // show navigation dots
//   arrows: true, // show navigation arrows
//   buttons: false, // hide play/stop buttons,
//   btnStopText: "Pause", // STOP button text
//   show: 2,
// });

// console.log("render carousel", carousel.render);
