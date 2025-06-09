document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.scroll-fade, .fade-in-element');
    const checkVisibility = () => {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = (rect.top < window.innerHeight && rect.bottom >= 0);
            if (isVisible) { element.classList.add('visible'); }
        });
    };
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);

    const musicaFundo = document.getElementById('musicaFundo');
    const playMusicaBtn = document.getElementById('playMusicaBtn'); // Pega o novo botão

    if (musicaFundo && playMusicaBtn) {
        musicaFundo.volume = 0.3; // Define o volume

        playMusicaBtn.addEventListener('click', () => {
            // Tenta tocar a música quando o botão é clicado
            const playPromise = musicaFundo.play();

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    console.log("Música tocando via botão!");
                    // Opcional: Mudar o texto do botão ou escondê-lo depois de tocar
                    // playMusicaBtn.textContent = "🎶 Música Tocando 🎶";
                    // playMusicaBtn.disabled = true; // Desabilita o botão após o primeiro play
                }).catch(error => {
                    console.error("Erro ao tentar tocar a música via botão:", error);
                    // Isso não deveria acontecer se a interação do usuário ocorreu (o clique)
                });
            }
        });
    }
    // --- Fim do código do fade-in e música ---
    const tituloPrincipal = document.getElementById('tituloPrincipal');
    if (tituloPrincipal && typeof anime === 'function') {
        // Mantenha a animação do título se estiver funcionando
        anime({
            targets: tituloPrincipal,
            translateY: [-20, 0], opacity: [0, 1], duration: 3000,
            easing: 'easeOutExpo', delay: 500
        });
    } else if (typeof anime !== 'function') {
        console.error("Anime.js (para título) NÃO carregou ou 'anime' não é uma função.");
    }

    onload = () =>{
        document.body.classList.remove("container");
};
});