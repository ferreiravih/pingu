// js/music-player.js
const audioPlayer = new Audio(); 
audioPlayer.volume = 0.5; // Deixa o som na metade da altura padrão
function playSong(fileUrl) {
    // Para a música anterior antes de começar a nova
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    
    audioPlayer.src = fileUrl;
    
    // O play() retorna uma promessa, tratamos o erro caso o navegador bloqueie
    audioPlayer.play().catch(e => {
        console.warn("O som só toca após você clicar na página! Erro:", e);
    });
}

function stopSong() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
}