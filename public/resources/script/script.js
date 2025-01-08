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

(function handleBeforeAfters() {
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
})();

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

document.querySelectorAll("#navigation a").forEach((element) =>
  element.addEventListener("click", () => {
    if (mobile) menuNavigation.classList.remove("active");
  })
);

(async function handleLanguage() {
  let language;

  if (navigator.language.includes("tr")) language = "turkish";
  else if (navigator.language.includes("en")) language = "english";
  else if (navigator.language.includes("de")) language = "german";

  if (location.href.includes("language=turkish")) language = "turkish";
  else if (location.href.includes("language=english")) language = "english";
  else if (location.href.includes("language=german")) language = "german";

  language = await fetch(`resources/languages/${language}.txt`)
    .then((response) => response.text())
    .then((response) => response.split("\r\n\r\n"));

  content = language[0].split("\r\n");
  document.querySelectorAll("#navigation a").forEach((text, index) => {
    text.textContent = content[index];
  });

  content = language[1].split("\r\n");
  document.querySelector(
    "header h2"
  ).innerHTML = `${content[0]}<br><span>${content[1]}</span><br>${content[2]}`;

  document.querySelector("header p").textContent = language[2];

  document.querySelector("#about-us + h3").textContent = language[3];

  content = language[4].split("\r\n");
  document.querySelector(
    "#about-us + h3 + .content > div"
  ).innerHTML = `<p>${content[0]}</p><p><b>${content[1]}</b></p><ul><li>${content[2]}</li><li>${content[3]}</li><li>${content[4]}</li></ul><p><b>${content[5]}</b></p><ul><li>${content[6]}</li><li>${content[7]}</li><li>${content[8]}</li></ul>`;

  document.querySelector("#rhinoplasty + h3").textContent = language[5];

  document.querySelector(
    "#rhinoplasty + h3 + .content div:nth-of-type(1)"
  ).innerHTML = `<p>${language[6]}</p>`;

  document.querySelector("#rhinoplasty + h3 + .content h4").textContent =
    language[7];

  content = language[8].split("\r\n");
  document.querySelector(
    "#rhinoplasty + h3 + .content div:nth-of-type(2)"
  ).innerHTML = `<p>${content[0]}</p><p>${content[1]}</p>`;

  document.querySelector("#botox + h3").textContent = language[9];

  content = language[10].split("\r\n");
  document.querySelector(
    "#botox + h3 + .content div:nth-of-type(1)"
  ).innerHTML = `<p>${content[0]}</p><p>${content[1]}</p><ul><li><b>${content[2]}</b> ${content[3]}</li><li><b>${content[4]}</b> ${content[5]}</li><li><b>${content[6]}</b> ${content[7]}</li></ul>`;

  content = language[11].split("\r\n");
  document.querySelector(
    "#botox + h3 + .content div:nth-of-type(2)"
  ).innerHTML = `<p>${content[0]}</p><ul><li><b>${content[1]}</b> ${content[2]}</li><li><b>${content[3]}</b> ${content[4]}</li></ul><p>${content[5]}</p><ul><li>${content[6]}</li><li>${content[7]}</li></ul>`;

  content = language[12].split("\r\n");
  document.querySelector(
    "#botox + h3 + .content div:nth-of-type(3)"
  ).innerHTML = `<p><b>${content[0]}</b> ${content[1]}</p><p>${content[2]}</p>`;

  document.querySelector("#gallery + h3").textContent = language[13];

  document.querySelector("#gallery + h3 + h4").textContent = language[14];

  document.querySelector("#contact + h3").textContent = language[15];

  document.querySelector("#address p").textContent = language[16];

  content = language[17].split("\r\n");
  document.querySelector(
    "#form"
  ).innerHTML = `<p><b>${content[0]}</b></p><span>${content[1]}</span><div><i class="fa-solid fa-user"></i><input type="text" placeholder="${content[2]}"></div><span>${content[3]}</span><div><i class="fa-solid fa-envelope"></i><input type="email" placeholder="${content[4]}"></div><span>${content[5]}</span><div><i class="fa-solid fa-phone"></i><input type="tel" placeholder="${content[6]}"></div><span>${content[7]}</span><textarea rows="5"></textarea><button onclick="sendForm()"><i class="fa-solid fa-check"></i> ${content[8]}</button>`;

  content = language[18].split("\r\n");
  document.querySelectorAll("footer div a").forEach((text, index) => {
    text.textContent = content[index];
  });
})();
