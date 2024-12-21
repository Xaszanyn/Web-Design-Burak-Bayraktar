const navigation = document.querySelectorAll("#navigation a");
var active = navigation[0];

const gallery = document.querySelectorAll("#masonry div");
const galleryLeft = document.querySelector("#masonry-left");
const galleryRight = document.querySelector("#masonry-right");
var slide = 0;
var maximum = 4;

const beforeAfters = document.querySelectorAll(".before-after");
const beforeAfterButtons = document.querySelectorAll(".before-after i");

const menuNavigation = document.querySelector("nav");

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

function toggleMenu() {
  menuNavigation.classList.toggle("active");
}

async function sendForm() {
  let data = new FormData();

  data.append(
    "entry.1175482922",
    document.querySelector("#form div:nth-of-type(1) input").value
  );
  data.append(
    "entry.971272702",
    document.querySelector("#form div:nth-of-type(2) input").value
  );
  data.append(
    "entry.769763202",
    document.querySelector("#form div:nth-of-type(3) input").value
  );
  data.append(
    "entry.226975128",
    document.querySelector("#form textarea").value
  );

  try {
    await fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLSc2sGjwnq3h4cM2KR9haC-BQkbaH4KmlExNqNsmSX1i4iWvzg/formResponse",
      {
        method: "POST",
        body: data,
      }
    );
  } catch {}

  location.href = "";
}

let mobile = innerWidth / innerHeight <= 1;

window.addEventListener("scroll", () => {
  let unit = parseInt((scrollY * 100) / innerWidth);

  if (!unit) document.body.classList.add("initial");
  else document.body.classList.remove("initial");

  active.classList.remove("active");

  if (innerWidth / innerHeight > 1) {
    mobile = false;
    if (unit < 50) active = navigation[0];
    else if (unit < 105) active = navigation[1];
    else if (unit < 192.5) active = navigation[2];
    else if (unit < 305) active = navigation[3];
    else if (unit <= 412.5) active = navigation[4];
    else active = navigation[5];
  } else {
    mobile = true;
    if (unit < 150) active = navigation[0];
    else if (unit < 430) active = navigation[1];
    else if (unit < 822.5) active = navigation[2];
    else if (unit < 1370) active = navigation[3];
    else if (unit <= 1917.5) active = navigation[4];
    else active = navigation[5];
  }

  active.classList.add("active");
});

handleBeforeAfters();

document.querySelectorAll("#navigation a").forEach((element) =>
  element.addEventListener("click", () => {
    if (mobile) menuNavigation.classList.remove("active");
  })
);
