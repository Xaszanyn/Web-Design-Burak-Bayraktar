const navigation = document.querySelectorAll("#navigation a");
var active = navigation[0];

const gallery = document.querySelectorAll("#masonry div");
const galleryLeft = document.querySelector("#masonry-left");
const galleryRight = document.querySelector("#masonry-right");
var slide = 0;
var maximum = 4;

window.addEventListener("scroll", () => {
  let ratio = Math.ceil((Math.max(0, window.scrollY) / (document.body.offsetHeight - window.innerHeight)) * 100);

  if (!ratio) document.body.classList.add("initial");
  else document.body.classList.remove("initial");

  if (ratio <= 17) {
    active.classList.remove("active");
    active = navigation[0];
    active.classList.add("active");
  } else if (ratio <= 32) {
    active.classList.remove("active");
    active = navigation[1];
    active.classList.add("active");
  } else if (ratio <= 50) {
    active.classList.remove("active");
    active = navigation[2];
    active.classList.add("active");
  } else if (ratio <= 65) {
    active.classList.remove("active");
    active = navigation[3];
    active.classList.add("active");
  } else if (ratio <= 85) {
    active.classList.remove("active");
    active = navigation[4];
    active.classList.add("active");
  } else {
    active.classList.remove("active");
    active = navigation[5];
    active.classList.add("active");
  }
});

function clamp(num, min, max) {
  return num < min ? min : num > max ? max : num;
}

function moveGallery(direction) {
  slide = direction ? slide - 1 : slide + 1;

  if (slide <= 0) {
    slide = 0;
    galleryLeft.classList.remove("active");
  } else if (slide < maximum) {
    galleryLeft.classList.add("active");
    galleryRight.classList.add("active");
  } else {
    slide = maximum;
    galleryRight.classList.remove("active");
  }

  gallery[0].style.transform = `translateX(-${slide * 15}rem)`;
  setTimeout(() => (gallery[1].style.transform = `translateX(-${slide * 15}rem)`), 100);
  setTimeout(() => (gallery[2].style.transform = `translateX(-${slide * 15}rem)`), 200);
}
