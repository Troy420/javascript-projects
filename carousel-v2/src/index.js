/* 
  @params {object} options - user defined settings for the carousel.
  @params {string} options.elem [options.elem=carousel] - The HTML ID of the carousel container
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
    current = 0,
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
}
