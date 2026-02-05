document.addEventListener("DOMContentLoaded", () => {
    
    // --- PLAYER DE MÚSICA ---
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
        currentAudio.volume = 1.0;
        currentAudio.play().then(() => {
            cardElement.classList.add('playing');
            currentlyPlayingCard = cardElement;
        }).catch(err => console.log("Erro:", err));
        currentAudio.onended = () => {
            cardElement.classList.remove('playing');
            currentlyPlayingCard = null;
            currentAudio = null;
        };
    };

    // --- ROLAGEM INTELIGENTE (4 em 4) ---
    const container = document.getElementById('playlistContainer');
    const btnNext = document.querySelector('.nav-btn.next');
    const btnPrev = document.querySelector('.nav-btn.prev');

    if (container && btnNext && btnPrev) {
        const newNext = btnNext.cloneNode(true);
        const newPrev = btnPrev.cloneNode(true);
        btnNext.parentNode.replaceChild(newNext, btnNext);
        btnPrev.parentNode.replaceChild(newPrev, btnPrev);

        newNext.addEventListener('click', () => {
            // Rola a largura inteira da visão (que tem 2 colunas)
            // Isso faz pular para o próximo bloco de 4 músicas
            container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
        });

        newPrev.addEventListener('click', () => {
            container.scrollBy({ left: -container.clientWidth, behavior: 'smooth' });
        });
    }
});