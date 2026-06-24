const infoPanel = document.getElementById("info-panel");
const solarPanel = document.getElementById("solar-panel");
const space = document.getElementById("space");
const planets = document.querySelectorAll(".planet");
const resetBtn = document.getElementById("resetBtn");
const welcomeScreen = document.getElementById("welcome-screen");
const startBtn = document.getElementById("startBtn");

// Controle de Escala e Posição Global
let currentX = 0;
let currentScale = 1;

// Coordenadas cruciais de limites
let b612UnscaledX = 0;
let earthUnscaledX = 0;

// Guarda qual planeta está ativo para reajustar a câmera nas transições de tamanho
let activePlanetElement = null;

// Variáveis de Arrastar (Drag-to-Scroll)
let isDown = false;
let startX;
let scrollX = 0;
let isDragging = false; 

// BANCO DE DADOS EXPANDIDO COM CRÔNICAS PROFUNDAS
const data = {
    b612: {
        name: "Asteroide B-612 (Pequeno Príncipe)",
        description: "O lar do Príncipe. Onde ele cuida dos seus vulcões e protege sua preciosa Rosa. Representa a pureza, a infância e o nascimento do amor verdadeiro.",
        quote: "\"Foi o tempo que perdeste com a tua rosa que fez a tua rosa tão importante.\"",
        deepStory: "No seu pequeno asteroide, a rotina do Príncipe era severa. Ele limpava cuidadosamente seus três vulcões (dois ativos e um extinto que servia para esquentar o almoço) e arrancava os brotos de Baobás antes que crescessem e quebrassem o planeta. Mas tudo mudou com a chegada da Rosa: uma criatura vaidosa, orgulhosa e fascinante, que nasceu de uma semente misteriosa. Seus caprichos dramáticos e suas pequenas mentiras cansaram o coração do jovem Príncipe, fazendo-o decidir partir em uma jornada de descobertas, sem saber que sua partida traria tanta saudade."
    },
    b325: {
        name: "Asteroide B-325 (O Rei)",
        description: "O primeiro planeta visitado. O monarca vive completamente sozinho, mas acredita piamente que tudo e todos o obedecem. Representa o desejo cego de poder e controle.",
        quote: "\"É preciso exigir de cada um o que cada um pode dar.\"",
        deepStory: "O primeiro planeta continha apenas um Rei absolutista vestido de arminho, sentado em um trono simples e majestoso. Para ele, o universo inteiro era composto por súditos. Quando o Príncipe bocejou de cansaço, o Rei imediatamente ordenou que ele bocejasse. O monarca não tolerava a insubordinação, mas suas ordens eram curiosamente baseadas na razão: só ordenava ao Sol que se pusesse no minuto exato em que ele já iria se pôr naturalmente. Ele tentou subornar o Príncipe com o cargo de Ministro da Justiça para julgar um velho rato, provando como os adultos buscam autoridade vazia sobre coisas insignificantes."
    },
    b326: {
        name: "Asteroide B-326 (O Vaidoso)",
        description: "O segundo planeta. Habitado por um homem egoísta que passa o tempo esperando aclamações e elogios alheios. Representa o egocentrismo e a necessidade fútil de admiração.",
        quote: "\"Os vaidosos só ouvem os elogios.\"",
        deepStory: "O segundo planeta era habitado por um Vaidoso solitário. Para ele, qualquer pessoa que aparecesse pela galáxia era automaticamente um admirador de sua beleza e inteligência. Ele usava um chapéu bizarro e pontudo apenas para saudar quem passasse e o aplaudisse. Ele pediu ao Príncipe que batesse as mãos repetidamente para que pudesse agradecer com elegância. O Príncipe achou a brincadeira divertida por cinco minutos, mas logo percebeu a profunda, monótona e triste solidão de quem vive exclusivamente para alimentar o ego e receber aplausos artificiais."
    },
    b327: {
        name: "Asteroide B-327 (O Bêbado)",
        description: "O terceiro planeta visitado. Uma estadia corta e triste, onde o homem bebe para esquecer a vergonha que sente de beber. Representa os vícios e a fuga desesperada dos próprios problemas.",
        quote: "\"Bebo para esquecer... Esquecer que tenho vergonha de beber.\"",
        deepStory: "A visita ao planeta do Bêbado foi a mais curta de todas, porém deixou o Pequeno Príncipe mergulhado em uma profunda e dolorosa melancolia. O homem passava os dias sentado em silêncio diante de uma imensa coleção de garrafas vazias e cheias. Ao ser questionado pelo garoto sobre o porquê de beber tanto, ele respondeu secamente que era 'para esquecer'. Ao perguntar o que exatamente ele queria esquecer, o homem confessou com a cabeça baixa: 'esquecer que tenho vergonha de beber'. Um ciclo triste e perfeitamente realista sobre os labirintos e armadilhas da mente humana."
    },
    b328: {
        name: "Asteroide B-328 (O Homem de Negócios)",
        description: "O quarto planeta. Um homem excessivamente ocupado somando as estrelas da galáxia, acreditando que contar as riquezas o torna dono delas. Representa a ganância, o materialismo e o capitalismo.",
        quote: "\"Eu as administro. Eu as conto e reconto. É difícil. Mas eu sou um homem sério!\"",
        deepStory: "O Homem de Negócios era tão obcecado por seu trabalho que sequer levantou a cabeça para cumprimentar o Príncipe quando este desembarcou. Ele passava a vida somando números em folhas de papel, alegando possuir 501.622.731 estrelas. Sua lógica de posse era simples: escrevia a quantidade em um pedaço de papel e trancava o papel em uma gaveta com chave. O Príncipe rebateu dizendo que possuía uma flor e três vulcões, e que era útil a eles por cuidar deles diariamente, mas o homem não era de utilidade alguma para as estrelas. O acúmulo de bens sem propósito assustou o garoto."
    },
    b329: {
        name: "Asteroide B-329 (O Acendedor)",
        description: "O quinto planeta. Tão minúsculo que gira uma vez por minuto. O acendedor cumpre seu exaustivo papel de acender e apagar o lampião sem parar. Representa o senso cego de dever, rotina e monotonia.",
        quote: "\"Esse é o único que não me parece ridículo. Talvez porque se ocupe de outra coisa que não de si mesmo.\"",
        deepStory: "O planeta do Acendedor era o menor de todos; havia espaço apenas para ele e um único lampião de rua. A velocidade de rotação do asteroide havia aumentado absurdamente ao longo dos anos, e agora o dia durava apenas um minuto. Por causa de um regulamento antigo e rígido, ele precisava acender a lâmpada no início do minuto e apagá-la no final, sem direito a um segundo de descanso ou sono. O Príncipe sentiu grande simpatia por ele, pois era o único em sua jornada que não parecia ridículo: ele se importava com o bem-estar de algo além de si mesmo. Infelizmente, o planeta era pequeno demais para dois."
    },
    b330: {
        name: "Asteroide B-330 (O Geógrafo)",
        description: "O sexto planeta, dez vezes maior. Um velho escritor de livros massivos que registra mapas, mas nunca viu os próprios oceanos ou montanhas. Representa o conhecimento teórico desprovido de vivência e experiência.",
        quote: "\"O geógrafo é muito importante para estar passeando. Ele não deixa o seu escritório.\"",
        deepStory: "O Geógrafo habitava um planeta majestoso e escrevia livros volumosos com caneta tinteiro. No entanto, ele não conhecia seus próprios mares, rios ou desertos porque se recusava a sair de sua mesa: afirmava que 'geógrafos são importantes demais para passear'. Ele exigia que exploradores viajassem e lhe trouxessem relatos. Foi ele quem explicou ao Príncipe o significado da palavra 'efêmera' (aquilo que corre o risco de desaparecer rápido). Essa definição partiu o coração do garoto, enchendo-o de culpa e arrependimento por ter deixado sua frágil Rosa completamente sozinha contra o mundo."
    },
    earth: {
        name: "Planeta Terra (O Amadurecimento)",
        description: "O último destino. Uma imensidão repleta de complexidade onde ele encontra o aviador, reflete sobre a vida e cativa a sábia Raposa, compreendendo finalmente a profundidade das relações humanas.",
        quote: "\"Tu te tornas eternamente responsável por aquilo que cativas.\"",
        deepStory: "A Terra não era um planeta qualquer; abrigava simultaneamente milhares de reis, geógrafos e vaidosos. Ao chegar no deserto da África, o Príncipe conheceu a Serpente, que falou por enigmas silenciosos e prometeu ajudá-lo a voltar para casa quando sentisse saudades demais. Mais tarde, ele encontrou um jardim repleto de cinco mil rosas idênticas e chorou, achando que sua flor era comum. Foi a sábia Raposa quem o salvou desse vazio, ensinando que o tempo e o amor que investimos em criar laços ('cativar') é exatamente o que torna algo ou alguém absolutamente único no universo inteiro."
    }
};

// MAPEIA A POSIÇÃO DOS EXTREMOS PARA AS BARREIRAS DE SCROLL
function initUniverseBounds() {
    const b612 = document.getElementById("b612");
    const earth = document.querySelector(".earth-planet");
    
    const rectB612 = b612.getBoundingClientRect();
    const rectEarth = earth.getBoundingClientRect();
    
    b612UnscaledX = rectB612.left + rectB612.width / 2;
    earthUnscaledX = rectEarth.left + rectEarth.width / 2;
}

function centerFirstPlanet() {
    const screenCenterX = window.innerWidth / 2;
    currentScale = 1;
    currentX = screenCenterX - b612UnscaledX;
    solarPanel.style.transform = `translateX(${currentX}px) scale(${currentScale})`;
}

startBtn.addEventListener("click", () => {
    welcomeScreen.classList.add("hide");
    initUniverseBounds();
    centerFirstPlanet();
});

// --- SISTEMA DE ARRASTAR COM LIMITES DE DIRETRIZES (CLAMPING) ---
space.addEventListener("mousedown", (e) => {
    isDown = true;
    isDragging = false;
    startX = e.pageX - space.offsetLeft;
    
    const transform = window.getComputedStyle(solarPanel).transform;
    if (transform !== "none") {
        const matrixValues = transform.split('(')[1].split(')')[0].split(',');
        scrollX = parseFloat(matrixValues[4]);
    } else {
        scrollX = currentX;
    }
    solarPanel.style.transition = "none";
});

space.addEventListener("mouseleave", () => {
    if (!isDown) return;
    isDown = false;
    solarPanel.style.transition = "transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)";
});

space.addEventListener("mouseup", () => {
    isDown = false;
    solarPanel.style.transition = "transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)";
    setTimeout(() => { isDragging = false; }, 50);
});

space.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    
    const x = e.pageX - space.offsetLeft;
    const walk = x - startX;
    
    if (Math.abs(walk) > 6) isDragging = true;
    
    let targetX = scrollX + walk;
    const screenCenterX = window.innerWidth / 2;
    const padding = 150; 
    
    const limitMax = screenCenterX - (b612UnscaledX * currentScale) + padding;
    const limitMin = screenCenterX - (earthUnscaledX * currentScale) - padding;
    
    if (targetX > limitMax) targetX = limitMax;
    if (targetX < limitMin) targetX = limitMin;
    
    currentX = targetX;
    solarPanel.style.transform = `translateX(${currentX}px) scale(${currentScale})`;
});

// --- SUPORTE A TOQUE (TOUCH EVENTS) PARA CELULARES ---
space.addEventListener("touchstart", (e) => {
    isDown = true;
    isDragging = false;
    startX = e.touches[0].pageX - space.offsetLeft;
    
    const transform = window.getComputedStyle(solarPanel).transform;
    if (transform !== "none") {
        const matrixValues = transform.split('(')[1].split(')')[0].split(',');
        scrollX = parseFloat(matrixValues[4]);
    } else {
        scrollX = currentX;
    }
    solarPanel.style.transition = "none";
}, { passive: true });

space.addEventListener("touchend", () => {
    isDown = false;
    solarPanel.style.transition = "transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)";
    setTimeout(() => { isDragging = false; }, 50);
});

space.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    
    const x = e.touches[0].pageX - space.offsetLeft;
    const walk = x - startX;
    
    if (Math.abs(walk) > 5) isDragging = true;
    
    let targetX = scrollX + walk;
    const screenCenterX = window.innerWidth / 2;
    const padding = 80; // margem menor para telas de celular
    
    const limitMax = screenCenterX - (b612UnscaledX * currentScale) + padding;
    const limitMin = screenCenterX - (earthUnscaledX * currentScale) - padding;
    
    if (targetX > limitMax) targetX = limitMax;
    if (targetX < limitMin) targetX = limitMin;
    
    currentX = targetX;
    solarPanel.style.transform = `translateX(${currentX}px) scale(${currentScale})`;
}, { passive: true });


function focusPlanetCamera(planetElement, sidePanelWidth) {
    if (!planetElement) return;
    
    solarPanel.style.transition = "transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)";
    const rect = planetElement.getBoundingClientRect();
    
    // Encontra a posição original do planeta
    const unscaledX = (rect.left + rect.width / 2 - currentX) / currentScale;
    const screenCenterX = window.innerWidth / 2;
    
    // Se for celular, aplica menos zoom para o planeta caber melhor na tela menor
    const isMobile = window.innerWidth < 768;
    currentScale = isMobile ? 1.0 : 1.25; 
    
    // Se for celular, o offset é 0 (centralizado), se for PC, joga o planeta para o lado
    const cameraOffset = isMobile ? 0 : (sidePanelWidth / 2); 
    
    currentX = (screenCenterX + cameraOffset) - (unscaledX * currentScale);
    
    solarPanel.style.transform = `translateX(${currentX}px) scale(${currentScale})`;
}


// --- SISTEMA DE NAVEGAÇÃO INTERNA ---
planets.forEach(planet => {
    planet.addEventListener("click", (e) => {
        if (isDragging) return;

        const planetName = planet.dataset.planet;
        activePlanetElement = planet; // Guarda o elemento clicado para referência de câmera
        
        // TELA 1: Resumo Inicial (Painel Estreito - 340px)
        const showSummary = () => {
            infoPanel.classList.remove("expanded"); // Remove largura maior se ela estiver ativa
            
            infoPanel.innerHTML = `
                <h2>✨ Resumo da Viagem</h2>
                <div class="panel-scroll-content">
                    <h3>${data[planetName].name}</h3>
                    <p>${data[planetName].description}</p>
                    <p class="quote">${data[planetName].quote}</p>
                </div>
                <button id="deepDiveBtn" class="panel-btn primary-btn">📖 Viajar na História</button>
                <button id="resetBtn" class="panel-btn secondary-btn">Ver Mapa Inteiro</button>
            `;
            
            document.getElementById("resetBtn").addEventListener("click", resetView);
            document.getElementById("deepDiveBtn").addEventListener("click", showDeepDive);
            
            // Move a câmera considerando o painel normal (340px)
            focusPlanetCamera(activePlanetElement, 340);
        };

        // TELA 2: Crônicas Profundas (Painel Expandido - 650px)
        const showDeepDive = () => {
            infoPanel.classList.add("expanded"); // Aplica a expansão de largura no CSS
            
            infoPanel.innerHTML = `
                <h2>📖 Crônicas do Espaço</h2>
                <div class="panel-scroll-content">
                    <h3>Memórias de ${planetName === 'earth' ? 'Aterrissagem' : 'Visita'}</h3>
                    <p class="deep-story-text">${data[planetName].deepStory}</p>
                </div>
                <button id="backToSummaryBtn" class="panel-btn primary-btn">↩️ Voltar ao Resumo</button>
                <button id="resetBtn" class="panel-btn secondary-btn">Ver Mapa Inteiro</button>
            `;
            
            document.getElementById("resetBtn").addEventListener("click", resetView);
            document.getElementById("backToSummaryBtn").addEventListener("click", showSummary);
            
            // Reajusta a câmera perfeitamente empurrando o planeta mais para a direita (650px)
            focusPlanetCamera(activePlanetElement, 650);
        };

        // Abre o resumo por padrão ao clicar no planeta
        showSummary();
        infoPanel.classList.add("show");
    });
});

function resetView() {
    infoPanel.classList.remove("show");
    infoPanel.classList.remove("expanded");
    
    // Deixamos o 'currentX' em paz para ele continuar exatamente onde estava!
    currentScale = 1.0; // Apenas tira o zoom
    
    solarPanel.style.transition = "transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)";
    solarPanel.style.transform = `translateX(${currentX}px) scale(${currentScale})`;
}

window.addEventListener("resize", () => {
    initUniverseBounds();
    if(infoPanel.classList.contains("show")) {
        // Mantém o foco correto se a tela mudar de tamanho
        const currentWidth = infoPanel.classList.contains("expanded") ? 650 : 340;
        focusPlanetCamera(activePlanetElement, currentWidth);
    } else {
        //centerFirstPlanet();
    }
});

