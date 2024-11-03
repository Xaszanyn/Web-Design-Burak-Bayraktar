const navigation = document.querySelectorAll("#navigation a");
var active = navigation[0];

const gallery = document.querySelectorAll("#masonry div");
const galleryLeft = document.querySelector("#masonry-left");
const galleryRight = document.querySelector("#masonry-right");
var slide = 0;
var maximum = 4;

const beforeAfters = document.querySelectorAll(".before-after");
const beforeAfterButtons = document.querySelectorAll(".before-after i");

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
  setTimeout(
    () => (gallery[1].style.transform = `translateX(-${slide * 15}rem)`),
    100
  );
  setTimeout(
    () => (gallery[2].style.transform = `translateX(-${slide * 15}rem)`),
    200
  );
}

function handleBeforeAfters() {
  beforeAfterButtons.forEach((beforeAfterButton) =>
    beforeAfterButton.addEventListener("click", () => {
      if (!beforeAfterButton.parentElement.dataset.manuel)
        beforeAfterButton.parentElement.dataset.manuel = "true";

      renderBeforeAfter(
        beforeAfterButton.parentElement,
        beforeAfterButton.parentElement.dataset.phase
      );
    })
  );
  beforeAfters.forEach((beforeAfter) => {
    beforeAfter.dataset.phase = 1;
    beforeAfter.children[0].classList.add("active");

    setInterval(() => {
      if (beforeAfter.dataset.manuel) return;
      renderBeforeAfter(beforeAfter, parseInt(beforeAfter.dataset.phase));
    }, 2000);
  });

  function renderBeforeAfter(beforeAfter, phase) {
    for (let index = 1; index < beforeAfter.children.length - 1; index++) {
      if (index <= phase) beforeAfter.children[index].classList.add("active");
      else beforeAfter.children[index].classList.remove("active");
    }

    phase++;
    beforeAfter.dataset.phase =
      phase == beforeAfter.children.length - 1 ? 0 : phase;
  }
}

window.addEventListener("scroll", () => {
  let ratio = Math.ceil(
    (Math.max(0, window.scrollY) /
      (document.body.offsetHeight - window.innerHeight)) *
      100
  );

  if (!ratio) document.body.classList.add("initial");
  else document.body.classList.remove("initial");

  active.classList.remove("active");

  if (ratio < 12) active = navigation[0];
  else if (ratio < 23) active = navigation[1];
  else if (ratio < 44) active = navigation[2];
  else if (ratio < 67) active = navigation[3];
  else if (ratio <= 91) active = navigation[4];
  else active = navigation[5];

  active.classList.add("active");
});

handleBeforeAfters();
