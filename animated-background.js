document.addEventListener('DOMContentLoaded', function() {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;
    
    const bgContainer = document.createElement('div');
    bgContainer.className = 'animated-background';
    homeSection.insertBefore(bgContainer, homeSection.firstChild);
    
    const config = {
        particles: 50,          
        colors: [              
            'rgba(56, 189, 248, 0.6)',   
            'rgba(14, 165, 233, 0.5)',  
            'rgba(3, 105, 161, 0.4)',  
            'rgba(129, 140, 248, 0.5)', 
            'rgba(34, 211, 238, 0.6)'   
        ],
        sizes: [4, 6, 8, 10, 12],    
        minSpeed: 0.2,                 
        maxSpeed: 0.6                  
    };
    
    for (let i = 0; i < config.particles; i++) {
        createParticle(bgContainer, config);
    }
});

function createParticle(container, config) {
    const particle = document.createElement('div');
    particle.className = 'bg-particle';
    
    const xPos = Math.random() * 100; // percent
    const yPos = Math.random() * 100; // percent
    
    const size = config.sizes[Math.floor(Math.random() * config.sizes.length)];
    
    const color = config.colors[Math.floor(Math.random() * config.colors.length)];
    
    const xSpeed = (Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed) * (Math.random() > 0.5 ? 1 : -1);
    const ySpeed = (Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed) * (Math.random() > 0.5 ? 1 : -1);
    
    particle.style.cssText = `
        position: absolute;
        left: ${xPos}%;
        top: ${yPos}%;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: 50%;
        filter: blur(1px);
        opacity: ${Math.random() * 0.5 + 0.3};
        z-index: 1;
    `;
    
    container.appendChild(particle);
    
    animateParticle(particle, xPos, yPos, xSpeed, ySpeed);
}

function animateParticle(particle, xPos, yPos, xSpeed, ySpeed) {
    function move() {
        xPos += xSpeed * 0.05;
        yPos += ySpeed * 0.05;
        
        if (xPos > 100) {
            xPos = 100;
            xSpeed = -xSpeed;
        } else if (xPos < 0) {
            xPos = 0;
            xSpeed = -xSpeed;
        }
        
        if (yPos > 100) {
            yPos = 100;
            ySpeed = -ySpeed;
        } else if (yPos < 0) {
            yPos = 0;
            ySpeed = -ySpeed;
        }
        
        particle.style.left = `${xPos}%`;
        particle.style.top = `${yPos}%`;
        
        requestAnimationFrame(move);
    }
    
    requestAnimationFrame(move);
}

document.addEventListener('mousemove', function(e) {
    const bgContainer = document.querySelector('.animated-background');
    if (!bgContainer) return;
    
    const particles = bgContainer.querySelectorAll('.bg-particle');
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    particles.forEach((particle, index) => {
        const moveFactor = 0.5 + (index % 5) * 0.1; 
        
        const baseLeft = parseFloat(particle.style.left);
        const baseTop = parseFloat(particle.style.top);
        const offsetY = (mouseY - 0.5) * moveFactor * -5;
        
        if (baseLeft + offsetX > 0 && baseLeft + offsetX < 100) {
            particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        }
    });
});
