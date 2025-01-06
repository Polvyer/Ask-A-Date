const container = document.getElementById("container");
const imageOne = document.querySelector(".image-1");
const imageTwo = document.querySelector(".image-2");
const btnYes = document.querySelector(".btn-yes");
const btnNo = document.querySelector(".btn-no");

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Ensure the "No" button doesn't freeze
btnNo.addEventListener("mouseover", (event) => {
  const containerHeight = container.getBoundingClientRect().height;
  const containerWidth = container.getBoundingClientRect().width;
  const btnHeight = btnNo.getBoundingClientRect().height;
  const btnWidth = btnNo.getBoundingClientRect().width;

  // Ensure the button stays within container bounds
  const newTop = getRandomNumber(0, containerHeight - btnHeight);
  const newLeft = getRandomNumber(0, containerWidth - btnWidth);

  btnNo.style.top = `${newTop}px`;
  btnNo.style.left = `${newLeft}px`;
});

// Add touch support for mobile
btnNo.addEventListener("touchstart", (event) => {
  const containerHeight = container.getBoundingClientRect().height;
  const containerWidth = container.getBoundingClientRect().width;
  const btnHeight = btnNo.getBoundingClientRect().height;
  const btnWidth = btnNo.getBoundingClientRect().width;

  const newTop = getRandomNumber(0, containerHeight - btnHeight);
  const newLeft = getRandomNumber(0, containerWidth - btnWidth);

  btnNo.style.top = `${newTop}px`;
  btnNo.style.left = `${newLeft}px`;
});

// Handle "Yes" button click
btnYes.addEventListener("click", (e) => {
  btnNo.classList.add("hide");
  imageOne.classList.add("hide");
  imageTwo.classList.remove("hide");
});