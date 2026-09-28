const popup = document.getElementById("bookingPopup");
const closePopup = document.getElementById("closePopup");
const bookingbuttons = document.querySelectorAll(".booking, .bigbutton");
const track = document.querySelector('.monial-track');
const container = document.querySelector('.slider-container');
const loginForm = document.getElementById("loginForm");

// Open & Close Booking Popup
bookingbuttons.forEach(button => {
  button.addEventListener("click", () => {
    popup.style.display = "flex";
  });
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});

// Testimonial Infinite Slider
let position = 0;
const speed = 2; 
let isPaused = false;

function animate() {
  if (!isPaused && track) {
    position -= speed;
    const halfWidth = track.scrollWidth / 2;
    if (Math.abs(position) >= halfWidth) {
      position = 0;
    }
    track.style.transform = `translateX(${position}px)`;
  }
  requestAnimationFrame(animate);
}

if (container) {
  container.addEventListener('mouseenter', () => isPaused = true);
  container.addEventListener('mouseleave', () => isPaused = false);
}

animate();

// Sequential Notifications
const notifications = [
  { icon: '🚀', text: 'Feature Launch: AI Assistant going live!' },
  { icon: '⚡', text: 'Real-time Analytics v2.0 coming soon.' },
  { icon: '🔮', text: 'Future Update: Web3 Wallet Integration.' },
  { icon: '🔒', text: 'Zero-Knowledge Security protocol updating.' },
  { icon: '🌐', text: 'Global Decentralized Node expansion.' }
];

const notificationContainers = [
  document.getElementById('notifi-1'),
  document.getElementById('notifi-2'),
  document.getElementById('notifi-3')
];

let currentIndex = 0;

function showNextNotification(targetContainer) {
  if (!targetContainer) return;
  const data = notifications[currentIndex];
  currentIndex = (currentIndex + 1) % notifications.length;

  targetContainer.innerHTML = `
    <div class="notifi-card">
      <span class="notifi-icon">${data.icon}</span>
      <span>${data.text}</span>
    </div>
  `;

  targetContainer.classList.add('active');

  setTimeout(() => {
    targetContainer.classList.remove('active');
  }, 3500);
}

function startInfiniteLoop() {
  notificationContainers.forEach((targetContainer, index) => {
    if (targetContainer) {
      setTimeout(() => {
        showNextNotification(targetContainer);
        setInterval(() => showNextNotification(targetContainer), 6000);
      }, index * 1500);
    }
  });
}

startInfiniteLoop();

// Login Form Handling
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error("Login Error:", err);
    }
  });
}