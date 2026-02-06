// Variável global para controlar o áudio atual
window.currentAudioGlobal = null;

// Função para dar o Play
window.playSong = function(url, cardElement) {
    // Se já tiver algo tocando, para antes de começar a nova
    if (window.currentAudioGlobal) {
        window.currentAudioGlobal.pause();
        window.currentAudioGlobal.currentTime = 0;
    }
    
    window.currentAudioGlobal = new Audio(url);
    window.currentAudioGlobal.play().catch(err => console.log("Erro ao tocar:", err));

    // Adiciona efeito visual se houver um elemento (como o disco girando)
    if (cardElement) {
        document.querySelectorAll('.playing').forEach(el => el.classList.remove('playing'));
        cardElement.classList.add('playing');
    }
};

// Função para Parar (agora disponível para todo o site)
window.stopSong = function() {
    if (window.currentAudioGlobal) {
        window.currentAudioGlobal.pause();
        window.currentAudioGlobal.currentTime = 0;
        window.currentAudioGlobal = null;
    }
    document.querySelectorAll('.playing').forEach(el => el.classList.remove('playing'));
};

// --- O PULO DO GATO ---
// Este trecho vigia o fechamento dos modais automaticamente
document.addEventListener('click', (e) => {
    // Se clicou no botão de fechar (X) ou fora do modal (overlay)
    if (e.target.classList.contains('close-modal') || e.target.classList.contains('modal-overlay')) {
        window.stopSong();
    }
});