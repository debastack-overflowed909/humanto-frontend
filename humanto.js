const popup = document.getElementById("bookingPopup");
const closePopup = document.getElementById("closePopup");
const bookingButtons = document.querySelectorAll(".r, .bigbutton");
const track = document.querySelector('.monial-track');
const container = document.querySelector('.slider-container');
const lines = document.querySelector('.lines');
const promises = document.querySelector('.promises');





bookingButtons.forEach(button => {

  button.addEventListener("click", () => {

    popup.style.display = "flex";

  });

});


closePopup.addEventListener("click", () => {

  popup.style.display = "none";

});


// Close when clicking outside
popup.addEventListener("click", (e) => {

  if (e.target === popup) {

    popup.style.display = "none";

  }

});


  let position = 0;
  const speed = 2; 
  let isPaused = false;

  function animate() {
    if (!isPaused) {
      position -= speed;

      // Reset position seamlessly when half the track has scrolled past
      const halfWidth = track.scrollWidth / 2;
      if (Math.abs(position) >= halfWidth) {
        position = 0;
      }

      track.style.transform = `translateX(${position}px)`;
    }

    requestAnimationFrame(animate);
  }

  // Pause scrolling on hover
  container.addEventListener('mouseenter', () => isPaused = true);
  container.addEventListener('mouseleave', () => isPaused = false);

  // Start animation
  animate();



  let x = window.innerWidth;

function move() {
    x -= 2;

    promises.style.transform = `translateX(${x}px)`;

    if (x < -promises.offsetWidth) {
        x = window.innerWidth;
    }

    requestAnimationFrame(move);
}

move();