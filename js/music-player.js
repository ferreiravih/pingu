document.addEventListener("DOMContentLoaded", () => {
    // Lógica de tocar música (idêntica à sua)
    let currentAudio = null;
    let currentlyPlayingCard = null;

    window.playSong = function(url, cardElement) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            if (currentlyPlayingCard) currentlyPlayingCard.classList.remove('playing');
        }
        if (currentlyPlayingCard === cardElement) {
            currentlyPlayingCard = null;
            currentAudio = null;
            return;
        }
        currentAudio = new Audio(url);
        currentAudio.play().then(() => {
            cardElement.classList.add('playing');
            currentlyPlayingCard = cardElement;
        }).catch(err => console.log("Erro:", err));
    };

    // A lógica das setas só funcionará se os botões estiverem visíveis (no PC)
    const container = document.getElementById('songsSlider');
    const btnNext = document.getElementById('nextBtn');
    const btnPrev = document.getElementById('prevBtn');

    if (btnNext && btnPrev && window.innerWidth > 768) {
        btnNext.onclick = () => container.scrollBy({ left: 300, behavior: 'smooth' });
        btnPrev.onclick = () => container.scrollBy({ left: -300, behavior: 'smooth' });
    }
});