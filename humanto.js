const popup = document.getElementById("bookingPopup");
const closePopup = document.getElementById("closePopup");
const bookingButtons = document.querySelectorAll(".r, .bigbutton");
const track = document.querySelector('.monial-track');
const container = document.querySelector('.slider-container');




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



// Sample notifications for your future section
const notifications = [
  { icon: '🚀', text: 'Feature Launch: AI Assistant going live!' },
  { icon: '⚡', text: 'Real-time Analytics v2.0 coming soon.' },
  { icon: '🔮', text: 'Future Update: Web3 Wallet Integration.' },
  { icon: '🔒', text: 'Zero-Knowledge Security protocol updating.' },
  { icon: '🌐', text: 'Global Decentralized Node expansion.' }
];

const containers = [
  document.getElementById('notifi-1'),
  document.getElementById('notifi-2'),
  document.getElementById('notifi-3')
];

let currentIndex = 0;

function showNextNotification(container) {
  // Get current item data
  const data = notifications[currentIndex];
  currentIndex = (currentIndex + 1) % notifications.length;

  // Insert popup HTML
  container.innerHTML = `
    <div class="notifi-card">
      <span class="notifi-icon">${data.icon}</span>
      <span>${data.text}</span>
    </div>
  `;


  container.classList.add('active');

 
  setTimeout(() => {
    container.classList.remove('active');
  }, 3500);
}

// Start infinite popup sequence across the 3 divs
function startInfiniteLoop() {
  containers.forEach((container, index) => {
    // Stagger the initial start times so they popup sequentially
    setTimeout(() => {
      showNextNotification(container);
      // Repeat infinitely every 4.5 seconds
      setInterval(() => showNextNotification(container), 6000);
    }, index * 1500); 
  });
}


startInfiniteLoop();