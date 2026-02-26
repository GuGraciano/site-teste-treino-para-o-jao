// =========================
// CONFIG
// =========================

const imagens = [
    "img/aesthetic.jpeg",
    "img/eterno vicio.jpeg",
    "img/jao bixa.jpeg",
    "img/jao com skol, cigarro e oreo.jpeg",
    "img/jao de cabelo rosa.jpeg",
    "img/jao dormindo e fumando.jpeg",
    "img/jao e amigos.jpeg",
    "img/jao e bumblebee.jpeg",
    "img/jao e sua classica camisa de piknik.jpeg",
    "img/jao etec.jpeg",
    "img/jao guitarra.jpeg",
    "img/jao hospital.jpeg",
    "img/jao junino.jpeg",
    "img/jao pose sujestiva.jpeg",
    "img/jao supremo.jpeg",
    "img/jao tesao.jpeg",
    "img/junino.jpeg",
    "img/trio.jpeg",
    "img/namo do jao.jpeg",
    "img/salgadin.jpeg"
];

let indiceAtual = 0;

// =========================
// ELEMENTOS
// =========================

const navbar = document.getElementById("navbar");
const btnArquivo = document.getElementById("btnArquivo");
const abrirGaleriaBtn = document.getElementById("abrirGaleriaBtn");
const galeriaModal = document.getElementById("galeriaModal");
const fecharGaleriaBtn = document.getElementById("fecharGaleria");
const imagemGaleria = document.getElementById("imagemGaleria");
const contador = document.getElementById("contador");
const btnAnterior = document.getElementById("btnAnterior");
const btnProxima = document.getElementById("btnProxima");
const confirmarBtn = document.getElementById("confirmarBtn");


const dataFesta = new Date("March 16, 2026 19:00:00").getTime(); // Coloque o ano e horário da festa

setInterval(() => {
    const agora = new Date().getTime();
    const distancia = dataFesta - agora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    const contadorEl = document.getElementById("contadorAniversario");
    if(contadorEl) {
        contadorEl.innerHTML = `Tempo restante: ${dias}d ${horas}h ${minutos}m ${segundos}s 💣`;
    }
}, 1000);



// =========================
// FUNÇÕES
// =========================

function atualizarImagem() {
    imagemGaleria.style.opacity = 0;

    setTimeout(() => {
        imagemGaleria.src = imagens[indiceAtual];
        imagemGaleria.style.opacity = 1;
        contador.innerText = `${indiceAtual + 1} / ${imagens.length}`;
    }, 200);
}

function mudarImagem(direcao) {
    indiceAtual += direcao;

    if (indiceAtual < 0) indiceAtual = imagens.length - 1;
    if (indiceAtual >= imagens.length) indiceAtual = 0;

    atualizarImagem();
}

function abrirGaleria() {
    galeriaModal.style.display = "flex";
    atualizarImagem();
}

function fecharGaleria() {
    galeriaModal.style.display = "none";
}

galeriaModal.addEventListener("click", (e) => {
    if (e.target === galeriaModal) {
        fecharGaleria();
    }
});

document.addEventListener("keydown", (e) => {
    if (galeriaModal.style.display === "flex") {
        if (e.key === "Escape") fecharGaleria();
        if (e.key === "ArrowRight") mudarImagem(1);
        if (e.key === "ArrowLeft") mudarImagem(-1);
    }
});

function scrollToSection() {
    document.getElementById("dados").scrollIntoView({ behavior: "smooth" });
}

function scrollNext() {
    window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth"
    });
}

// =========================
// EVENTOS
// =========================

btnArquivo.addEventListener("click", scrollToSection);
abrirGaleriaBtn.addEventListener("click", abrirGaleria);
fecharGaleriaBtn.addEventListener("click", fecharGaleria);
btnAnterior.addEventListener("click", () => mudarImagem(-1));
btnProxima.addEventListener("click", () => mudarImagem(1));

confirmarBtn.addEventListener("click", () => {
    // Coloque o DDD e o número aqui. Ex: 5511999999999
    const numero = "5519998202217"; 
    const mensagem = "Fui convocado pelo Dossiê! Confirmo minha presença no caos do dia 16/03. Me passa o local secreto! 🍻🔥";
    
    // Transforma a mensagem num formato de link que o navegador entende
    const zapLink = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(zapLink, "_blank"); // Abre em nova aba
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("small");
    } else {
        navbar.classList.remove("small");
    }
});

// =========================
// SWIPE MOBILE
// =========================

let startX = 0;

galeriaModal.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

galeriaModal.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) mudarImagem(1);
    if (endX - startX > 50) mudarImagem(-1);
});