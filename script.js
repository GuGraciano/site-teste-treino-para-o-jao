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

const navbar          = document.getElementById("navbar");
const btnArquivo      = document.getElementById("btnArquivo");
// btn-scroll genérico — tratado por delegação abaixo
const abrirGaleriaBtn = document.getElementById("abrirGaleriaBtn");
const galeriaModal    = document.getElementById("galeriaModal");
const fecharGaleriaBtn= document.getElementById("fecharGaleria");
const imagemGaleria   = document.getElementById("imagemGaleria");
const contador        = document.getElementById("contador");
const btnAnterior     = document.getElementById("btnAnterior");
const btnProxima      = document.getElementById("btnProxima");
const confirmarBtn    = document.getElementById("confirmarBtn");

// =========================
// COUNTDOWN
// =========================

const dataFesta = new Date("March 16, 2026 19:00:00").getTime();

const countdownInterval = setInterval(() => {
    const agora     = new Date().getTime();
    const distancia = dataFesta - agora;
    const contadorEl = document.getElementById("contadorAniversario");

    if (!contadorEl) return;

    // FIX: se a festa já começou, limpa o intervalo e exibe mensagem
    if (distancia <= 0) {
        clearInterval(countdownInterval);
        contadorEl.innerHTML = "O caos já começou! 🎉🔥";
        return;
    }

    const dias     = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas    = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos  = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    contadorEl.innerHTML = `Tempo restante: ${dias}d ${horas}h ${minutos}m ${segundos}s 💣`;
}, 1000);

// =========================
// GALERIA
// =========================

function atualizarImagem() {
    imagemGaleria.style.opacity = 0;

    setTimeout(() => {
        const src = imagens[indiceAtual];
        imagemGaleria.src = src;
        imagemGaleria.alt = `Foto ${indiceAtual + 1} do Jão`;
        contador.innerText = `${indiceAtual + 1} / ${imagens.length}`;
        imagemGaleria.style.opacity = 1;
    }, 200);
}

// FIX: fallback se imagem quebrar
imagemGaleria.addEventListener("error", () => {
    imagemGaleria.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%231a0033' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' fill='%23a855f7' text-anchor='middle' font-size='20' font-family='sans-serif' dominant-baseline='middle'%3EFoto não encontrada 👀%3C/text%3E%3C/svg%3E";
});

function mudarImagem(direcao) {
    indiceAtual += direcao;
    if (indiceAtual < 0) indiceAtual = imagens.length - 1;
    if (indiceAtual >= imagens.length) indiceAtual = 0;
    atualizarImagem();
}

function abrirGaleria() {
    galeriaModal.style.display = "flex";
    // FIX: trava scroll do body enquanto modal está aberto
    document.body.style.overflow = "hidden";
    atualizarImagem();
}

function fecharGaleria() {
    galeriaModal.style.display = "none";
    // FIX: libera scroll do body ao fechar
    document.body.style.overflow = "";
}

galeriaModal.addEventListener("click", (e) => {
    if (e.target === galeriaModal) fecharGaleria();
});

document.addEventListener("keydown", (e) => {
    if (galeriaModal.style.display === "flex") {
        if (e.key === "Escape")      fecharGaleria();
        if (e.key === "ArrowRight")  mudarImagem(1);
        if (e.key === "ArrowLeft")   mudarImagem(-1);
    }
});

// =========================
// SCROLL
// =========================

function scrollToSection() {
    document.getElementById("dados").scrollIntoView({ behavior: "smooth" });
}

// FIX: scrollNext agora realmente funciona
function scrollNext() {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
}

// =========================
// EVENTOS
// =========================

btnArquivo.addEventListener("click", scrollToSection);

// Scroll para a próxima section — funciona em qualquer btn-scroll da página
document.querySelectorAll(".btn-scroll").forEach(btn => {
    btn.addEventListener("click", () => {
        // sobe até encontrar o <section> pai
        const secaoAtual = btn.closest("section");
        if (!secaoAtual) return;

        // procura a próxima section no DOM
        let next = secaoAtual.nextElementSibling;
        while (next && next.tagName !== "SECTION") {
            next = next.nextElementSibling;
        }

        if (next) {
            next.scrollIntoView({ behavior: "smooth" });
        }
    });
});

abrirGaleriaBtn.addEventListener("click", abrirGaleria);
fecharGaleriaBtn.addEventListener("click", fecharGaleria);
btnAnterior.addEventListener("click", () => mudarImagem(-1));
btnProxima.addEventListener("click",  () => mudarImagem(1));

confirmarBtn.addEventListener("click", () => {
    const numero   = "5519998202217";
    const mensagem = "Fui convocado pelo Dossiê! Confirmo minha presença no caos do dia 16/03. Me passa o local secreto! 🍻🔥";
    const zapLink  = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(zapLink, "_blank");
});

window.addEventListener("scroll", () => {
    navbar.classList.toggle("small", window.scrollY > 50);
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