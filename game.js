const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const TILE = 100;

// sesler
const captureSound = new Audio('https://actions.google.com/sounds/v1/cartoon/wood_plank_flick.ogg');
const winSound = new Audio('https://actions.google.com/sounds/v1/human_voices/applause.ogg');

let player = { x: 2, y: 5 };
let enemies = [];
let particles = []; 
let currentLevel = 0;
let currentAbility = 'KNIGHT';
let score = 0;
let isStarted = false;
let isVictory = false;

const LEVELS = [
    { name: "PAWN MARCH", enemies: [{x:1, y:0, t:'P'}, {x:3, y:0, t:'P'}] },
    { name: "TACTICAL KNIGHTS", enemies: [{x:0, y:0, t:'N'}, {x:4, y:0, t:'N'}] },
    { name: "BISHOP'S MAZE", enemies: [{x:0, y:0, t:'B'}, {x:4, y:0, t:'B'}] },
    { name: "GRANDMASTER FINALE", enemies: [{x:0, y:0, t:'N'}, {x:2, y:0, t:'B'}, {x:4, y:0, t:'N'}] }
];

function startGame() {
    isStarted = true;
    isVictory = false;
    document.getElementById('overlay').style.display = 'none';
    initLevel();
    draw();
}

function initLevel() {
    const lvl = LEVELS[currentLevel % LEVELS.length];
    enemies = lvl.enemies.map(e => ({...e}));
    player = { x: 2, y: 5 };
    particles = [];
    document.getElementById('level-display').innerText = lvl.name;
}

//İlerlemeyi kontrol etmek
function isValid(px, py, tx, ty, type) {
    const dx = Math.abs(tx - px);
    const dy = Math.abs(ty - py);
    if (tx < 0 || tx > 4 || ty < 0 || ty > 5) return false;
    if (px === tx && py === ty) return false;

    switch(type) {
        case 'P':      return dx === 0 && ty === py + 1; 
        case 'N':      
        case 'KNIGHT': return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
        case 'B':      
        case 'BISHOP': return dx === dy && dx !== 0;
        case 'ROOK':   return (dx === 0 || dy === 0) && (dx !== 0 || dy !== 0);
        default: return false;
    }
}

canvas.addEventListener('click', (e) => {
    if (!isStarted || isVictory) return;
    const rect = canvas.getBoundingClientRect();
    const tx = Math.floor((e.clientX - rect.left) / TILE);
    const ty = Math.floor((e.clientY - rect.top) / TILE);

    if (isValid(player.x, player.y, tx, ty, currentAbility)) {
        player.x = tx;
        player.y = ty;

        // Eğer düşmanı yerseniz.
        const hit = enemies.some(en => en.x === tx && en.y === ty);
        enemies = enemies.filter(en => !(en.x === tx && en.y === ty));
        if (hit) { captureSound.play(); score += 100; }

        moveEnemies();
        checkStatus();
    }
});

function moveEnemies() {
    let nextTaken = []; 
    enemies = enemies.filter(en => {
        let moves = [];
        // Bu figür için olası tüm hareketleri buluyoruz
        for(let r=0; r<6; r++) {
            for(let c=0; c<5; c++) {
                if(isValid(en.x, en.y, c, r, en.t)) {
                    if(!nextTaken.some(p => p.x === c && p.y === r)) moves.push({x:c, y:r});
                }
            }
        }

        // Seçiyoruz: oyuncunun üzerine saldırmak veya sadece mümkün olduğunca aşağı inmek
        let best = moves.find(m => m.x === player.x && m.y === player.y) || 
                   moves.sort((a,b) => b.y - a.y)[0] || {x: en.x, y: en.y + 1};

        // Engelleme, eğer düşman oyuncuya doğru gidiyorsa, o kaybolur
        if (best.x === player.x && best.y === player.y) {
            captureSound.play();
            score += 50;
            return false;
        }

        en.x = best.x;
        en.y = best.y;
        nextTaken.push({x: en.x, y: en.y});
        return true;
    });
    document.getElementById('score').innerText = score;
}

function checkStatus() {
    if (enemies.length === 0) {
        winSound.play();
        if (currentLevel === LEVELS.length - 1) isVictory = true;
        else { currentLevel++; setTimeout(initLevel, 1000); }
    } else if (enemies.some(en => en.y >= 5)) {
        initLevel();
    }
}

function createFirework() {
    for (let i = 0; i < 3; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height,
            vx: (Math.random() - 0.5) * 4,
            vy: -Math.random() * 10 - 5,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            life: 80
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // tahata ve ipucu
    for(let r=0; r<6; r++) {
        for(let c=0; c<5; c++) {
            ctx.fillStyle = (r+c)%2===0 ? '#1a1a1a' : '#111';
            ctx.fillRect(c*TILE, r*TILE, TILE, TILE);
            if (!isVictory && isValid(player.x, player.y, c, r, currentAbility)) {
                ctx.fillStyle = "rgba(212, 175, 55, 0.2)";
                ctx.beginPath(); ctx.arc(c*TILE+50, r*TILE+50, 5, 0, Math.PI*2); ctx.fill();
            }
        }
    }

    if (isVictory) {
        createFirework();
        ctx.fillStyle = "gold";
        ctx.font = "30px Courier New";
        ctx.textAlign = "center";
        ctx.fillText("VICTORY! MASTER OF BTÜ", canvas.width/2, canvas.height/2);
    } else {
        // Игрок
        ctx.font = "60px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#d4af37";
        ctx.fillText('♚', player.x*TILE+50, player.y*TILE+65);
        // düşmanlar
        enemies.forEach(en => {
            ctx.fillStyle = "#ff3333";
            let icon = en.t === 'N' ? '♞' : (en.t === 'B' ? '♝' : '♟');
            ctx.fillText(icon, en.x*TILE+50, en.y*TILE+65);
        });
    }

    particles.forEach((p, i) => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 4, 4);
        p.x += p.vx; p.y += p.vy; p.vy += 0.2; p.life--;
        if(p.life <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(draw);
}

['knight', 'bishop', 'rook'].forEach(id => {
    document.getElementById(id+'-card').onclick = () => {
        currentAbility = id.toUpperCase();
        document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
        document.getElementById(id+'-card').classList.add('active');
    };
});