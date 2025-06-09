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

    const carousel = document.querySelector('.auto-carousel-slides');
    if (carousel) {
        let currentIndex = 0;
        const slides = carousel.querySelectorAll('img');
        const totalSlides = slides.length;
        const intervalTime = 4000; // Tempo em milissegundos para cada foto (4 segundos)

        const moveToNextSlide = () => {
            // Move para o próximo slide
            currentIndex++;
            
            // Aplica o efeito de transição
            carousel.style.transition = 'transform 0.7s ease-in-out';
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Truque para criar um loop "infinito"
            // Quando a última foto (que é uma cópia da primeira) for exibida,
            // ele volta para a primeira foto real sem animação.
            if (currentIndex === totalSlides) {
                setTimeout(() => {
                    carousel.style.transition = 'none'; // Remove a transição para o pulo
                    currentIndex = 0; // Volta para o índice da primeira foto
                    carousel.style.transform = `translateX(0)`; // Pula de volta para o início
                }, 700); // O tempo precisa ser igual à duração da transição
            }
        };

        // Clona o primeiro slide e o adiciona no final para o efeito de loop infinito
        if (totalSlides > 1) {
            const firstSlideClone = slides[0].cloneNode(true);
            carousel.appendChild(firstSlideClone);

            // Inicia o intervalo para passar os slides automaticamente
            setInterval(moveToNextSlide, intervalTime);
        }
    }

    onload = () =>{
        document.body.classList.remove("container");
};
});