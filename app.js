const rainContainer = document.getElementById('rainContainer');
const raindrops = [];
const maxRaindrops = 100;

class Raindrop {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'raindrop';

        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight - window.innerHeight;
        this.width = Math.random() * 50 + 50; // 8-16px
        this.height = this.width * 20;
        this.speed = Math.random() * 1 + 3; // 6-10px per frame
        this.windEffect = Math.random() * 2 - 1; // -1 to 1

        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';

        rainContainer.appendChild(this.element);
    }

    update() {
        this.y += this.speed;
        this.x += this.windEffect * 0.5;

        // Gentle wave effect
        this.windEffect += (Math.random() - 0.5) * 0.2;
        this.windEffect = Math.max(-2, Math.min(2, this.windEffect));

        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x + 'px';

        // Reset if raindrop goes off screen
        if (this.y > window.innerHeight || this.x < -20 || this.x > window.innerWidth + 20) {
            this.reset();
        }
    }

    reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = -20;
        this.speed = Math.random() * 1 + 3;
        this.windEffect = Math.random() * 2 - 1;
    }

    remove() {
        this.element.remove();
    }
}

// Create initial raindrops
function initRain() {
    for (let i = 0; i < maxRaindrops; i++) {
        raindrops.push(new Raindrop());
    }
}

// Animation loop
function animate() {
    raindrops.forEach(raindrop => {
        raindrop.update();
    });
    requestAnimationFrame(animate);
}

// Handle window resize
window.addEventListener('resize', () => {
    // Raindrops will naturally adjust as they reset
});

// Start the rain
initRain();
animate();