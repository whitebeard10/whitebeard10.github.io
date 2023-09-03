// Define variables for the slider content and current slide
var sliderContent = document.querySelector(".slider-content");
var currentSlide = 0;

// Define a function to move to the previous slide
function previousSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    sliderContent.style.transform =
      "translateX(-" + (currentSlide * 100) / 5 + "%)";
  }
}

// Define a function to move to the next slide
function nextSlide() {
  if (currentSlide < 3) {
    currentSlide++;
    sliderContent.style.transform =
      "translateX(-" + (currentSlide * 100) / 5 + "%)";
  }
}
