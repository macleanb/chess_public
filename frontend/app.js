/**
 * Demo taken from:
 * https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events
 * */

function random(number) {
  return Math.floor(Math.random() * number);
}
  
function bgChange() {
  const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
  return rndCol;
}

const container = document.querySelector("#container");

container.addEventListener("click", (event) => {
  event.target.style.backgroundColor = bgChange();
});
