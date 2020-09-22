import galleryItems from "./gallery-items.js";

const ul = document.querySelector("ul");
let currentIndex;

const arrChange = galleryItems.forEach((el, index) => {
  const li = document.createElement("li");
  li.classList.add("gallery__item");

  const a = document.createElement("a");
  a.classList.add("gallery__link");
  a.setAttribute("href", el.original);

  const img = document.createElement("img");
  img.dataset.index = index;
  img.classList.add("img-small");
  img.setAttribute("src", el.preview);
  img.setAttribute("alt", el.description);
  img.setAttribute("data-source", el.original);

  li.append(a);
  a.append(img);
  ul.appendChild(li);
});
console.log(ul);

const refs = {
  modal: document.querySelector(".js-lightbox"),
  button: document.querySelector('button[data-action="close-lightbox"]'),
  overlay: document.querySelector(".lightbox__overlay"),
  content: document.querySelector(".lightbox__content"),
  imageLarge: document.querySelector(".js-large-image"),
  butright: document.querySelector('button[data-action="move-right"]'),
  butleft: document.querySelector('button[data-action="move-left"]'),
};

ul.addEventListener("click", (e) => {
  e.preventDefault();
  const imgRef = e.target;
  const newurl = imgRef.dataset.source;
  const index = imgRef.dataset.index;

  largeImgUrl(newurl);
  largeImgAlt(imgRef.alt);
  largeImgIndex(index);
  openModal();
  currentIndex = Number(e.target.dataset.index);
});

function largeImgUrl(url) {
  refs.imageLarge.src = url;
}

function largeImgAlt(alt) {
  refs.imageLarge.alt = alt;
}

function largeImgIndex(index) {
  refs.imageLarge.dataset.index = index;
}

function openModal() {
  refs.button.addEventListener("click", closeModal);
  window.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      closeModal();
    }
  });

  refs.overlay.addEventListener("click", onBackdropClick);

  refs.modal.classList.add("is-open");

  function closeModal(e) {
    console.log(e.target);
    refs.imageLarge.src = "";
    refs.modal.classList.remove("is-open");
  }

  function onBackdropClick(event) {
    if (event.target === refs.content) {
      closeModal();
    }
  }
}

refs.butright.addEventListener("click", () => {
  let picsrc = refs.imageLarge.getAttribute("src");
  currentIndex <= 8 ? (currentIndex += 1) : (currentIndex = 0);
  console.log(currentIndex);
  console.log(galleryItems[currentIndex].original);

  picsrc = galleryItems[currentIndex].original;

  largeImgUrl(picsrc);
});

refs.butleft.addEventListener("click", () => {
  let picsrc = refs.imageLarge.getAttribute("src");
  currentIndex > 0 ? (currentIndex -= 1) : (currentIndex = 8);
  console.log(currentIndex);
  console.log(galleryItems[currentIndex].original);

  picsrc = galleryItems[currentIndex].original;

  largeImgUrl(picsrc);
});

const options = {
  rootMargin: "200px",
};

const onEntry = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(entry.target);

      const image = entry.target;
      const src = image.src;
      image.src = src;
      image.classList.add("appear");

      observer.unobserve(image);
    }
  });
};

const observer = new IntersectionObserver(onEntry, options);

const images = document.querySelectorAll("img");
images.forEach((image) => observer.observe(image));
