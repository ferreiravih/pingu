const STAR_COLORS = [
  { r: 255, g: 255, b: 255 },
  { r: 186, g: 140, b: 255 },
  { r: 155, g: 190, b: 255 },
  { r: 130, g: 110, b: 255 },
  { r: 200, g: 170, b: 255 }
];

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 500; // AQUI você controla a insanidade ✨

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createStars() {
  stars = [];

  for (let i = 0; i < STAR_COUNT; i++) {
    const color = STAR_COLORS[
      Math.floor(Math.random() * STAR_COLORS.length)
    ];

    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.4 + 0.3,

      baseOpacity: Math.random() * 0.5 + 0.3, // opacidade média
      twinkle: Math.random() * 0.3 + 0.1,     // intensidade do brilho
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,     // fase inicial

      speed: Math.random() * 0.12 + 0.03,
      color
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(
      ${star.color.r},
      ${star.color.g},
      ${star.color.b},
      ${star.opacity}
    )`;
    ctx.fill();
  });
}

function moveStars() {
  stars.forEach(star => {
    star.y -= star.speed;
    if (star.y < 0) {
      star.y = canvas.height;
      star.x = Math.random() * canvas.width;
    }

    // twinkle suave
    star.phase += star.twinkleSpeed;
    star.opacity =
      star.baseOpacity +
      Math.sin(star.phase) * star.twinkle;
  });
}

function animateStars() {
  drawStars();
  moveStars();
  requestAnimationFrame(animateStars);
}

createStars();
animateStars();

//mouse
// Função para criar o rastro de luz
window.addEventListener("mousemove", (e) => {
  createTrailParticle(e.clientX, e.clientY);
});

function createTrailParticle(x, y) {
  const particle = document.createElement("div");
  
  // Estilização básica via JS para garantir que funcione
  Object.assign(particle.style, {
    position: "fixed",
    left: `${x}px`,
    top: `${y}px`,
    width: "4px",
    height: "4px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: "9999",
    boxShadow: "0 0 10px #b478ff, 0 0 20px #b478ff"
  });

  document.body.appendChild(particle);

  // Animação: a partícula diminui e sobe levemente antes de sumir
  const animation = particle.animate([
    { 
      opacity: 1, 
      transform: 'scale(1) translateY(0)' 
    },
    { 
      opacity: 0, 
      transform: 'scale(0) translateY(-10px)' 
    }
  ], {
    duration: 600, // Tempo que o rastro dura (0.6 segundos)
    easing: 'ease-out'
  });

  // Remove o elemento do navegador assim que a animação termina
  animation.onfinish = () => particle.remove();
}