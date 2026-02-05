document.addEventListener("DOMContentLoaded", () => {
  const btnStart = document.getElementById("btnStart");
  const btnUniverse = document.getElementById("btnUniverse");
  const screenIntro = document.querySelector(".screen-intro");
  const screenCake = document.querySelector(".screen-cake");
  const mainUniverse = document.getElementById("main-universe");
  const navMenu = document.getElementById("side-menu");

  // 1. TRANSIÇÃO: INTRO -> BOLO
  btnStart.addEventListener("click", () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#bb9af7', '#ffffff', '#7aa2f7', '#ff00ff']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#bb9af7', '#ffffff', '#7aa2f7', '#ff00ff']
      });
      if (Date.now() < animationEnd) requestAnimationFrame(frame);
    };
    frame();

    screenIntro.style.opacity = "0";
    setTimeout(() => {
      screenIntro.classList.remove("active");
      screenCake.classList.add("active");
    }, 1000);
  });

  // 2. TRANSIÇÃO: BOLO -> UNIVERSO (AQUI ESTAVA O ERRO)
  if (btnUniverse) {
    btnUniverse.addEventListener("click", () => {
      screenCake.style.opacity = "0";

      setTimeout(() => {
        screenCake.classList.remove("active");
        screenCake.style.display = "none";
        
        // Exibe o universo
        mainUniverse.style.display = "block";
        setTimeout(() => {
          mainUniverse.style.opacity = "1";
          
          // LIBERA O SCROLL E ATIVA AS FUNÇÕES
          document.body.style.overflowY = "auto";
          document.documentElement.style.overflowY = "auto";
          
          revealOnScroll();      
          drawConstellationLines();
          
          initImageRotation();   
          initLetters();
          initPlaylist();
          startAmbientShootingStars();
          
          document.querySelector('#welcome').classList.add('reveal');
        }, 50);

        if (navMenu) navMenu.classList.add("visible");
      }, 1000);
    });
  }
});

// --- FUNÇÕES DE APOIO (MANTENHA-AS ABAIXO) ---

const revealOnScroll = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('reveal');
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.section-content').forEach(section => observer.observe(section));
};

const initImageRotation = () => {
  const images = document.querySelectorAll('.rotating-image');
  images.forEach(img => {
    const imagesList = img.getAttribute('data-images');
    if (!imagesList) return;
    const srcArray = imagesList.split(',');
    let currentIndex = 0;
    if (srcArray.length > 1) {
      setInterval(() => {
        img.style.opacity = '0.2';
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % srcArray.length;
          img.src = srcArray[currentIndex].trim();
          img.style.opacity = '1';
        }, 500);
      }, 3000);
    }
  });
};

function drawConstellationLines() {
    const svg = document.getElementById('constellation-svg');
    const nodes = document.querySelectorAll('.star-node');
    if (!svg || nodes.length < 2) return;
    svg.innerHTML = '';
    for (let i = 0; i < nodes.length - 1; i++) {
        const start = nodes[i];
        const end = nodes[i + 1];
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", start.style.left);
        line.setAttribute("y1", start.style.top);
        line.setAttribute("x2", end.style.left);
        line.setAttribute("y2", end.style.top);
        line.setAttribute("class", "constellation-line");
        svg.appendChild(line);
    }
}

// Lógica do Modal (Memórias)
// --- Lógica Completa do Modal (Memórias) ---
const modal = document.getElementById('memory-modal');
const closeModal = document.querySelector('.close-modal');

// 1. ABRIR: Ao clicar nas estrelas
document.querySelectorAll('.star-node').forEach(node => {
    node.addEventListener('click', () => {
        const title = node.getAttribute('data-title');
        const text = node.getAttribute('data-text');
        const img = node.getAttribute('data-img');

        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-text').innerText = text;
        
        const imageElement = document.getElementById('modal-img');
        if (imageElement && img) {
            imageElement.src = img;
            imageElement.style.display = 'block';
        }

        modal.style.display = 'flex';
        // Pequeno delay para a transição de opacidade funcionar
        setTimeout(() => modal.style.opacity = '1', 10);
    });
});

if (closeModal) {
    closeModal.addEventListener('click', () => {
        fecharModal();
    });
}

if (modal) {
    modal.addEventListener('click', (e) => {
    
        if (e.target === modal) {
            fecharModal();
        }
    });
}
function fecharModal() {
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300); 
}
const closeModalFunc = () => {
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 500);
};

if(closeModal) closeModal.addEventListener('click', closeModalFunc);

const meuBancoDeDados = {
    1: { 
        titulo: "Cause with all these things we do, it don't matter when, I'm coming home to you...", 
        msg: "Mesmo com tudo o que fazemos, com todas as voltas que a vida dá, uma coisa nunca muda: eu sempre volto para você. Não importa quando, não importa o caminho, o meu destino é estar ao seu lado. Não importa o que aconteça ou os problemas que a gente enfrente, você é o lugar onde eu descanso, onde meu coração se sente em casa. E é com você que eu gostaria que fosse, para sempre, o meu lar.", 
        som: "assets/cortes/Gunslinger [3vDetD8cW_o] (mp3cut.net).mp3" 
    },

    2: { titulo: "Yeah I will love you, baby, Always, And I'll be there, forever and a day Always...", 
        msg: "Não existe tempo que diminua o que eu sinto por você. O meu amor é constante, firme, daqueles que ficam. Eu escolho te amar todos os dias, nas fases boas e nas difíceis, sem prazo, sem condição. Quero estar ao seu lado hoje, amanhã e em todos os “sempre” que a vida permitir — presente, cuidando, ficando.", 
        som: "assets/cortes/Always [p__81XMLRvA] (mp3cut.net).mp3" },

    3: { titulo: "I have died every day waiting for you, Darling, don't be afraid, I have loved you, For a thousand years, I'll love you for a thousand more", 
        msg: "Eu te esperei em silêncio, em tempo, em sentimento. Te amei antes mesmo de saber como seria, sem medo, com o coração inteiro. O que eu sinto por você não nasceu ontem e não termina amanhã — é um amor que atravessa fases, medos e o passar dos dias. Eu te amei por muito mais do que parece possível… e continuarei te amando por tudo o que ainda está por vir, se você realmente quiser..", 
        som: "assets/cortes/Christina Perri - A Thousand Years [Official Music Video] [rtOvBOTyX00] (mp3cut.net).mp3" },

    4: { titulo: "But I promise you this, I'll always look out for you, That's what I'll do", 
        msg: "Eu te prometo estar atenta a você, cuidar de você nos detalhes, nos dias fáceis e nos difíceis. Sempre vou olhar por você, te proteger com carinho e presença. Não é só sobre estar junto, é sobre cuidar — e isso é o que eu escolho fazer, hoje e todos os dias.", 
        som: "assets/cortes/Coldplay - Sparks [Ar48yzjn1PE] (mp3cut.net).mp3" },

    5: { titulo: "And I'm highly suspicious that everyone who sees you wants you,I've loved you three summers now, honey, but I want 'em all, Can I go where you go?", 
        msg: "Eu te escolho todos os dias, entre fases e momentos que já vivemos. Quero seguir ao seu lado, ir onde você for e continuar assim: próximos, caminhando juntos, fazendo do outro casa. Porque, no meio de tudo, é com você que eu quero ficar — hoje e sempre.", 
        som: "assets/cortes/Taylor Swift - Lover [tgVYh94QH8k] (mp3cut.net).mp3" },

    6: { titulo: "You're the coffee that I need in the morning, You're my sunshine in the rain when it's pouring, Won't you give yourself to me?", 
        msg: "Você é o que me desperta todos os dias e o que ilumina até quando tudo parece cinza. É conforto, é calma, é aquele sorriso que faz qualquer dia valer a pena. Me deixa ficar com você, dividir a vida, porque no meio de tudo o que existe de bom… você é a melhor parte.", 
        som: "assets/cortes/Daniel Caesar - Best Part (Audio) ft (mp3cut.net).mp3" },

    7: { titulo: "Wise men say, Only fools rush in, But I can't help, Falling in love with you", 
        msg: "Sem perceber, eu fui me entregando. Não foi escolha, foi sentimento. Quanto mais o tempo passa, mais eu entendo que o meu coração simplesmente encontrou o seu caminho até você. Amar você é algo que acontece naturalmente, sem esforço, porque é onde tudo em mim faz sentido.", 
        som: "assets/cortes/Elvis Presley - Can't Help Falling In Love (Official Audio) [vGJTaP6anOU] (1) (mp3cut.net).mp3" },

    8: { titulo: "Thank you for loving me, For being my eyes, When I couldn't see", 
        msg: "Obrigada por me amar e pelos momentos que a gente já viveu. Eu espero que, mesmo no meio de tantos problemas, a gente consiga encontrar uma saída. Que a gente amadureça, aprenda a lidar melhor com as coisas e com um ao outro. Que a gente consiga crescer, ajustar e tentar de novo — não por obrigação, mas porque existe sentimento, porque ambos querem. E se for pra melhorar, que seja por nós. Porque quando existe vontade, vale a pena.", 
        som: "assets/cortes/Bon Jovi - Thank You For Loving Me (Official Music Video) [nddTokI9hHY] (mp3cut.net).mp3" },

    9: { titulo: "I Wanna Be Yours", 
        msg: "Eu quero estar com você nos detalhes, nas fases boas e nas complicadas. Ser apoio, ser cuidado, ser aquele alguém que você sabe que pode contar. Não é sobre ser perfeito, é sobre escolher estar, dividir, somar. Eu só quero ser parte da sua vida, do jeito mais sincero possível.", 
        som: "assets/cortes/I Wanna Be Yours [nyuo9-OjNNg] (mp3cut.net).mp3" },

    10: { titulo: "I do it all because,I love you, I love you, Unconditional, unconditionally, I will love you unconditionally", 
        msg: "Eu te aceitei por inteiro, todos os dias bons e também nos dias difíceis, há mais de quatro anos. Caminhei ao seu lado quando foi leve e quando virou tempestade, segurando a sua mão mesmo quando tudo parecia incerto. E eu caminharia de novo, do mesmo jeito, por mais cinquenta anos se pudesse — porque te amar sempre foi escolha, presença e vontade de ficar.", 
        som: "assets/cortes/Katy Perry - Unconditionally (Lyrics) [uZRvNrAOYH8] (mp3cut.net).mp3" },

    11: { titulo: "Never opened myself this way, Life is ours, we live it our way, All these words I don't just say, And nothing else matters", 
        msg: "Você foi a primeira pessoa com quem eu me abri assim, com quem eu quis algo verdadeiro, mais intenso, algo realmente nosso. A gente construiu essa relação de um jeito conturbado, errando muitas vezes, às vezes acertando, mas sempre aprendendo. E, querendo ou não, todas as vezes que eu tento conversar, não são palavras vazias — é o meu coração falando. No meio de tudo o que existe, de tudo o que pesa e confunde, o que realmente importa é a gente… e o quanto eu amo você.", 
        som: "assets/cortes/Nothing Else Matters [pTYIf2pkxzQ] (mp3cut.net).mp3" },

    12: { titulo: "Still Loving You", 
        msg: "Eu sei que confiar nem sempre é fácil, principalmente depois de tudo. Mas eu continuo aqui, tentando, acreditando no que a gente ainda sente. O meu amor não foi embora, ele permanece, mesmo machucado, mesmo cansado. Eu estou aqui, de verdade, porque o que existe entre nós ainda vive — e ainda escolhe amar você.", 
        som: "assets/cortes/Still Loving You [it9bXaOYqVE] (mp3cut.net).mp3" },

    13: { titulo: "But all the promises we made, From the cradle to the grave, When all I want is you", 
        msg: "Entre tudo o que a gente prometeu, em todas as fases que já atravessamos e nas que ainda virão, o que permanece é isso: a minha escolha por você. No meio de tantas possibilidades, desejos e caminhos, é você quem eu quero. Hoje, amanhã, e em tudo o que a vida ainda guardar pra nós.", 
        som: "assets/cortes/U2 - All I Want Is You (Official Music Video) [k0W_ybghFzg] (mp3cut.net).mp3" },

    14: { titulo: "All I want is to fall with you, So just give me all of you, It feels impossible, Is it impossible? Say that it's possible..", 
        msg: "Tudo o que eu quero é seguir ao seu lado, voar com você quando for leve e cair junto quando não for. Quero você por inteiro, sem metades. Mesmo quando tudo parece impossível, eu gosto de acreditar que a gente pode fazer dar certo. Porque, quando existe vontade dos dois lados, o impossível vira apenas mais um desafio pra gente enfrentar juntos.", 
        som: "assets/cortes/Anne-Marie & James Arthur - Rewrite The Stars [from The Greatest Showman_ Reimagined] [pRfmrE0ToTo] (mp3cut.net).mp3" },

    15: { titulo: "Traveled the world, but it got me nowhere, Nothing could ever compare", 
        msg: "Foi com você que eu conheci novos lugares, senti coisas novas e caminhei por caminhos que eu nunca tinha vivido antes. Você foi o meu primeiro em tudo: nas descobertas, nos sentimentos, nos erros. Tivemos nossos primeiros problemas, nossas primeiras decepções, nossas primeiras mudanças. E mesmo assim, foi com você que eu aprendi o que é amar, crescer e viver de verdade.", 
        som: "assets/cortes/Damiano David - The First Time (Official Visual Video) [n1Hzf_is8tI] (mp3cut.net).mp3" },

    16: { titulo: "I love you, I loved you all along...", 
        msg: "Eu te amo, e sempre te amei, mesmo quando as coisas nos afastaram. Às vezes o tempo pesa, às vezes parece que ficamos longe demais um do outro, entre tantos problemas e dificuldades. A saudade existe, o cansaço aparece, e mesmo assim é inegável o quanto eu queria que desse certo. Porque, apesar de tudo, o sentimento nunca deixou de estar aqui.", 
        som: "assets/cortes/Far Away [fFk4t1Z0iPM] (mp3cut.net).mp3" },

    17: { titulo: "Every moment spent with you, Is a moment I treasure...", 
        msg: "Cada instante ao seu lado tem valor pra mim. São momentos que eu guardo, que ficam, que fazem sentido. Estar com você transforma o tempo em lembrança boa, daquelas que a gente não quer perder nem deixar passar.", 
        som: "assets/cortes/I Don't Want to Miss a Thing (From _Armageddon_ Soundtrack) [GLFp_C0Zi3M] (mp3cut.net).mp3" },

    18: { titulo: "Se Namorar", 
        msg: "Já perdi as contas de quantas vezes a gente se beijou, de quantas vezes a gente se tocou. Mesmo passando por dificuldades em relação a isso, o que permanece pra mim é o carinho do dia a dia, essa vontade constante de estar perto. Amar você, pra mim, continua sendo algo natural, intenso e bom. É assim que o amor se constrói: nos detalhes, na proximidade, no quanto a gente escolhe um ao outro — o tempo todo.", 
        som: "assets/cortes/Ivo Mozart - Se Namorar [Mp9i428TekE] (mp3cut.net).mp3" },

    19: { titulo: "Will you still love me when, I'm no longer young and beautiful?", 
        msg: "Às vezes eu me perguntava se o amor continuava quando o tempo ia passando, quando a gente ia mudando...  Espero que o que existe entre nós seja maior do que fases, tempos ruins e idade.  Que nosso amor verdadeiro, daqueles que permanecem mesmo quando tudo ao redor se transforma.", 
        som: "assets/cortes/Lana Del Rey - Young And Beautiful (Lyrics) [_MWEapW4PaE] (1) (mp3cut.net).mp3" },

    20: { titulo: "My beating heart belongs to you, I walked for miles 'til I found you", 
        msg: "Meu coração sempre foi seu, mesmo antes de eu entender isso. Caminhei por caminhos longos até te encontrar, e hoje eu fico — por escolha, por amor. Mesmo que tudo ao redor desmorone, mesmo que a vida teste a gente, o que eu sinto permanece. Em meio a qualquer caos, todo o meu amor ainda encontra você..", 
        som: "assets/cortes/Last Night on Earth [xg_Y7Or_hWM] (mp3cut.net).mp3" },

    21: { titulo: "When You Came Into My Life", 
        msg: "Quando você entrou na minha vida, tudo ganhou um sentido novo. O seu amor mudou o meu mundo — simples, verdadeiro, sincero. Hoje, ao completar 21 anos, penso em tudo o que te trouxe até aqui e sou grata por estar ao seu lado, celebrando não só o seu aniversário, mas a pessoa incrível que você é. Que essa fase venha com mais amor, mais amadurecimento e mais sonhos — e que eu continue sendo parte do seu caminho.", 
        som: "assets/cortes/Scorpions - When You Came Into My Life (Official Video) [epJG4q3mcqg] (mp3cut.net).mp3" }
};

// 2. FUNÇÃO PARA CRIAR OS ENVELOPES NA TELA
function initLetters() {
    const grid = document.getElementById('lettersGrid');
    if (!grid) return;
    grid.innerHTML = ''; 
    
    for (let i = 1; i <= 21; i++) {
        const env = document.createElement('div');
        env.className = 'envelope';
        env.innerHTML = `
            <i class="${i % 2 === 0 ? 'bi-music-note-beamed' : 'bi-envelope-heart'}"></i>
            <span>#${i}</span>
        `;
        env.onclick = () => abrirCartaAgora(i);
        grid.appendChild(env);
    }
}

// <<< COLOQUE O CÓDIGO NOVO AQUI ABAIXO >>>

// Esta parte detecta cliques no fundo do modal
const letterModal = document.getElementById('letter-modal');
if (letterModal) {
    letterModal.addEventListener('click', (e) => {
        // Se o clique for exatamente no fundo (overlay) e não na carta
        if (e.target.id === 'letter-modal') {
            closeLetter(); // Chama a função que já existe no seu código
        }
    });
}

// 3. FUNÇÃO PARA PREENCHER O MODAL E MOSTRAR
function abrirCartaAgora(numero) {
    const dados = meuBancoDeDados[numero];
    if (!dados) return;

    // Conecta com o HTML
    const htmlNum = document.getElementById('modal-num');
    const htmlLyric = document.getElementById('modal-music-lyric');
    const htmlTexto = document.getElementById('modal-text-target'); // Novo ID

    // Preenche as informações
    if (htmlNum) htmlNum.innerText = `#${numero < 10 ? '0' + numero : numero}`;
    if (htmlLyric) htmlLyric.innerText = `"${dados.titulo}"`;
    if (htmlTexto) htmlTexto.innerText = dados.msg; // <--- AQUI O TEXTO ENTRA

    // Toca a música
    if (typeof playSong === 'function') {
        playSong(dados.som);
    }

    // Mostra o Modal
    const modal = document.getElementById('letter-modal');
    modal.style.display = 'flex';
    setTimeout(() => modal.style.opacity = '1', 10);
    document.body.style.overflow = 'hidden';
}

function closeLetter() {
    if (typeof stopSong === 'function') stopSong();
    const modal = document.getElementById('letter-modal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 500);
}

function closeLetter() {
    if (typeof stopSong === 'function') stopSong();
    const modal = document.getElementById('letter-modal');
    modal.style.opacity = '0';
    setTimeout(() => modal.style.display = 'none', 500);
}

function initPlaylist() {
    const container = document.getElementById('playlistContainer');
    if (!container) return;

    playlistData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'music-card';
        card.innerHTML = `
            <div class="vinyl-wrapper" onclick="togglePlaylistMusic(this, '${item.file}')">
                <div class="vinyl-disk">
                    <div class="vinyl-label" style="background-image: url('${item.cover}')"></div>
                </div>
            </div>
            <div class="music-info">
                <h4>${item.title}</h4>
                <p>"${item.desc}"</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Coloque os nomes exatos que estão na sua pasta assets/cortes

function initPlaylist() {
    const container = document.getElementById('playlistContainer');
    if (!container) return;
    container.innerHTML = ''; 

    playlistData.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'music-card';
        card.onclick = function() { togglePlaylistMusic(this, item.file); };
        
        card.innerHTML = `
            <div class="vinyl-wrapper">
                <div class="vinyl-disk"></div>
            </div>
            <div class="music-info">
                <h4>${item.title}</h4>
                <p>"${item.desc}"</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- DADOS DA PLAYLIST (Corrigido para o nome que as funções usam) ---
const playlistData = [
    { title: "Gunslinger", desc: "Sempre será o meu lar.", file: "assets/cortes/Gunslinger [3vDetD8cW_o] (mp3cut.net).mp3" },
    { title: "Always", desc: "Eu estarei lá, sempre.", file: "assets/cortes/Always [p__81XMLRvA] (mp3cut.net).mp3" },
    { title: "A Thousand Years", desc: "Te amarei por mil anos.", file: "assets/cortes/Christina Perri - A Thousand Years [Official Music Video] [rtOvBOTyX00] (mp3cut.net).mp3" },
    { title: "Sparks", desc: "Você é a faísca.", file: "assets/cortes/Coldplay - Sparks [Ar48yzjn1PE] (mp3cut.net).mp3" },
    { title: "Best Part", desc: "Você é a minha melhor parte.", file: "assets/cortes/Daniel Caesar - Best Part (Audio) ft (mp3cut.net).mp3" },
    { title: "Unconditionally", desc: "Amor incondicional.", file: "assets/cortes/Katy Perry - Unconditionally (Lyrics) [uZRvNrAOYH8] (mp3cut.net).mp3" },
    { title: "Lover", desc: "Para todos os nossos janeiros.", file: "assets/cortes/Taylor Swift - Lover [tgVYh94QH8k] (mp3cut.net).mp3" },
    { title: "Thank You For Loving Me", desc: "Obrigado por me amar.", file: "assets/cortes/Bon Jovi - Thank You For Loving Me (Official Music Video) [nddTokI9hHY] (mp3cut.net).mp3" },
    { title: "I Wanna Be Yours", desc: "Quero ser seu.", file: "assets/cortes/I Wanna Be Yours [nyuo9-OjNNg] (mp3cut.net).mp3" },
    { title: "Nothing Else Matters", desc: "Nada mais importa.", file: "assets/cortes/Nothing Else Matters [pTYIf2pkxzQ] (mp3cut.net).mp3" },
    { title: "Still Loving You", desc: "Ainda amando você.", file: "assets/cortes/Still Loving You [it9bXaOYqVE] (mp3cut.net).mp3" },
    { title: "All I Want Is You", desc: "Tudo que eu quero é você.", file: "assets/cortes/U2 - All I Want Is You (Official Music Video) [k0W_ybghFzg] (mp3cut.net).mp3" },
    { title: "Rewrite The Stars", desc: "Reescrevendo as estrelas.", file: "assets/cortes/Anne-Marie & James Arthur - Rewrite The Stars [from The Greatest Showman_ Reimagined] [pRfmrE0ToTo] (mp3cut.net).mp3" },
    { title: "The First Time", desc: "Como a primeira vez.", file: "assets/cortes/Damiano David - The First Time (Official Visual Video) [n1Hzf_is8tI] (mp3cut.net).mp3" },
    { title: "Can't Help Falling In Love", desc: "Não consigo não te amar.", file: "assets/cortes/Elvis Presley - Can't Help Falling In Love (Official Audio) [vGJTaP6anOU] (1) (mp3cut.net).mp3" },
    { title: "Far Away", desc: "Mesmo longe, estou perto.", file: "assets/cortes/Far Away [fFk4t1Z0iPM] (mp3cut.net).mp3" },
    { title: "I Don't Want to Miss a Thing", desc: "Não quero perder nada.", file: "assets/cortes/I Don't Want to Miss a Thing (From _Armageddon_ Soundtrack) [GLFp_C0Zi3M] (mp3cut.net).mp3" },
    { title: "Se Namorar", desc: "Se namorar fosse bom...", file: "assets/cortes/Ivo Mozart - Se Namorar [Mp9i428TekE] (mp3cut.net).mp3" },
    { title: "Young And Beautiful", desc: "Você ainda me amará?", file: "assets/cortes/Lana Del Rey - Young And Beautiful (Lyrics) [_MWEapW4PaE] (1) (mp3cut.net).mp3" },
    { title: "Last Night on Earth", desc: "Minha última noite na terra.", file: "assets/cortes/Last Night on Earth [xg_Y7Or_hWM] (mp3cut.net).mp3" },
    { title: "When You Came Into My Life", desc: "Quando você chegou...", file: "assets/cortes/Scorpions - When You Came Into My Life (Official Video) [epJG4q3mcqg] (mp3cut.net).mp3" },
    { title: "I See the Light", desc: "Vejo enfim a luz brilhar", file: "assets/cortes/Vejo Enfim a Luz Brilhar [owaY2ih12sM].mp3" }
];

let currentIndex = 0;
const songsPerPage = 7; 

// UNIFICAMOS AS 3 FUNÇÕES EM UMA SÓ QUE FUNCIONA:
function initPlaylist() {
    const grid = document.getElementById('songsGrid');
    const slider = document.getElementById('songsSlider');
    const btnNext = document.getElementById('nextBtn');
    const btnPrev = document.getElementById('prevBtn');

    if (!grid || !slider) return;
    
    // Limpa apenas a lista de músicas, não as setas
    grid.innerHTML = ''; 

    // 1. Adiciona as 21 músicas ao grid
    playlistData.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'music-card show';
        card.onclick = function() { togglePlaylistMusic(this, item.file); };
        card.innerHTML = `
            <div class="vinyl-disk"></div>
            <div class="music-info">
                <h4>${item.title}</h4>
                <p>"${item.desc}"</p>
            </div>
        `;
        grid.appendChild(card);
    });

    // 2. Faz as setas funcionarem (Lógica de clique)
    const scrollAmount = 330; // Ajuste conforme a largura do seu disco + gap

    if (btnNext) {
        btnNext.onclick = () => {
            slider.scrollLeft += scrollAmount;
        };
    }

    if (btnPrev) {
        btnPrev.onclick = () => {
            slider.scrollLeft -= scrollAmount;
        };
    }
}

function togglePlaylistMusic(element, file) {
    const isPlaying = element.classList.contains('playing');
    document.querySelectorAll('.music-card').forEach(card => card.classList.remove('playing'));
    
    if (typeof stopSong === 'function') stopSong();
    
    if (!isPlaying) {
        if (typeof playSong === 'function') playSong(file);
        element.classList.add('playing');

        // DISPARA AS ESTRELAS CADENTES
        for(let i = 0; i < 5; i++) {
            setTimeout(launchShootingStar, i * 200);
        }
    }
}

// Função para lançar estrelas cadentes de forma aleatória e sutil
function startAmbientShootingStars() {
    const launchLoop = () => {
        // Intervalo curtinho para o sistema checar se lança uma estrela (ex: a cada 1s)
        const checkDelay = Math.random() * 2000 + 500; 

        setTimeout(() => {
            const mainUniverse = document.getElementById("main-universe");
            if (mainUniverse && mainUniverse.style.display === "block") {
                // Sorteia: 70% de chance de lançar uma estrela agora
                if (Math.random() > 0.3) {
                    launchShootingStar();
                }
            }
            launchLoop(); // Continua o ciclo
        }, checkDelay);
    };
    launchLoop();
}
// ESTA FUNÇÃO ESTAVA FALTANDO E É ELA QUE CRIA A ESTRELA NO SITE
function launchShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    
    // 1. POSIÇÃO INICIAL TOTALMENTE ALEATÓRIA
   const startFromTop = Math.random() > 0.5;
    star.style.top = startFromTop ? "-5%" : Math.random() * 800 + "%";
    star.style.left = startFromTop ? Math.random() * 100 + "%" : "105%";
    
    // 2. TAMANHOS DIFERENTES (algumas maiores, outras meros pontos)
 const angle = Math.floor(Math.random() * 800 + 200);
    star.style.setProperty('--rotation', `${angle}deg`);

    // 3. VELOCIDADES DIFERENTES (algumas rápidas, outras lentas)
    const duration = Math.random() * 3 + 1; // Entre 0.5s e 1.5s
    star.style.animationDuration = duration + 's';

    // 4. DISTÂNCIAS DIFERENTES (algumas atravessam a tela, outras somem logo)
    const travelDistance = Math.random() * 400 + 1200; // Entre 400px e 1200px
    star.style.setProperty('--travel-dist', `-${travelDistance}px`);

    document.body.appendChild(star);

    // Remove do HTML após o tempo de animação dela
    setTimeout(() => { star.remove(); }, duration * 5000);
}

function revealFinalCard() {
    const card = document.getElementById('final-birthday-card');
    
    // 1. Apenas faz o card aparecer (caso esteja com opacity 0)
    card.classList.remove('hidden-card');
    card.classList.add('show-card');

    // 2. Rola a tela suavemente até o Card
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // 3. Joga os confetes
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.8 },
            colors: ['#bb9af7', '#ff8dfb', '#ffffff']
        });
    }
}

// Função para VOLTAR para a carta
function scrollToCard() {
    const card = document.getElementById('final-birthday-card');
    card.classList.remove('hidden-card');
    card.classList.add('show-card');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (window.confetti) {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.8 },
            colors: ['#ffffff', '#ff8dfb', '#bb9af7']
        });
    }
}

function returnToLetter() {
    document.getElementById('final-letter-content').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const sectionCarta = document.getElementById('final-love');
    const musica = document.getElementById('background-music-carta');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Entrou na seção: Toca a música
                musica.volume = 1.0; 
                musica.play().catch(e => console.log("Aguardando interação..."));
            } else {
                // Saiu da seção: Pausa a música
                // Vamos baixar o volume gradualmente antes de pausar para ficar bonito
                let fadeOut = setInterval(() => {
                    if (musica.volume > 0.1) {
                        musica.volume -= 0.1;
                    } else {
                        clearInterval(fadeOut);
                        musica.pause();
                        musica.volume = 1.0; // Reseta o volume para a próxima vez
                    }
                }, 50); // Velocidade do fade-out
            }
        });
    }, { 
        threshold: 0.2 // A música para se menos de 20% da carta estiver visível
    });

    observer.observe(sectionCarta);
});