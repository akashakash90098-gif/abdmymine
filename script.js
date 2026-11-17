const welcome = document.getElementById("welcome");
const birthday = document.getElementById("birthday");
const openButton = document.getElementById("open-surprise");
const heartButton = document.getElementById("heart-button");
const replayButton = document.getElementById("replay");
const toast = document.getElementById("toast");
let toastTimer;

function showSurprise() {
  welcome.classList.add("hidden");
  welcome.setAttribute("aria-hidden", "true");
  birthday.classList.remove("hidden");
  birthday.setAttribute("aria-hidden", "false");
  makeConfetti();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showWelcome() {
  birthday.classList.add("hidden");
  birthday.setAttribute("aria-hidden", "true");
  welcome.classList.remove("hidden");
  welcome.setAttribute("aria-hidden", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function floatHearts(amount = 12) {
  const symbols = ["♥", "♡", "✦"];
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${10 + Math.random() * 80}vw`;
    heart.style.bottom = `${8 + Math.random() * 18}vh`;
    heart.style.fontSize = `${14 + Math.random() * 20}px`;
    heart.style.animationDelay = `${Math.random() * 0.45}s`;
    document.body.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove(), { once: true });
  }
}

function makeConfetti() {
  const holder = document.getElementById("confetti");
  holder.replaceChildren();
  const colors = ["#ff8db7", "#ffd0e0", "#ffe49a", "#c4a7ff", "#fff7fb"];
  for (let i = 0; i < 34; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 1.6}s`;
    piece.style.animationDuration = `${2.5 + Math.random() * 2}s`;
    holder.appendChild(piece);
  }
}

function showToast() {
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

openButton.addEventListener("click", () => {
  showSurprise();
  floatHearts(18);
});
heartButton.addEventListener("click", () => {
  floatHearts(22);
  showToast();
});
replayButton.addEventListener("click", showWelcome);

const musicButton = document.getElementById("music-button");
const birthdayMusic = document.getElementById("birthday-music");
const musicLabel = document.getElementById("music-label");

musicButton.addEventListener("click", async () => {
  if (birthdayMusic.paused) {
    try {
      await birthdayMusic.play();
      musicButton.classList.add("is-playing");
      musicButton.setAttribute("aria-pressed", "true");
      musicLabel.textContent = "Pause birthday music";
    } catch (error) {
      musicLabel.textContent = "Tap to play birthday music";
    }
  } else {
    birthdayMusic.pause();
    musicButton.classList.remove("is-playing");
    musicButton.setAttribute("aria-pressed", "false");
    musicLabel.textContent = "Play birthday music";
  }
});
