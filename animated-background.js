// Modern animated background for portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Only run this script if we're on the home section
    const homeSection = document.getElementById('home');
    if (!homeSection) return;
    
    // Create and insert the animated background container
    const bgContainer = document.createElement('div');
    bgContainer.className = 'animated-background';
    homeSection.insertBefore(bgContainer, homeSection.firstChild);
    
    // Configuration for particles
    const config = {
        particles: 50,           // Number of particles
        colors: [               // Color palette
            'rgba(56, 189, 248, 0.6)',   // Primary - lighter blue
            'rgba(14, 165, 233, 0.5)',   // Secondary - blue
            'rgba(3, 105, 161, 0.4)',    // Tertiary - darker blue
            'rgba(129, 140, 248, 0.5)',  // Purple accent
            'rgba(34, 211, 238, 0.6)'    // Cyan accent
        ],
        sizes: [4, 6, 8, 10, 12],       // Particle sizes
        minSpeed: 0.2,                  // Minimum movement speed
        maxSpeed: 0.6                   // Maximum movement speed
    };
    
    // Create the particles
    for (let i = 0; i < config.particles; i++) {
        createParticle(bgContainer, config);
    }
});

// Function to create a single particle with random properties
function createParticle(container, config) {
    const particle = document.createElement('div');
    particle.className = 'bg-particle';
    
    // Random position within the container
    const xPos = Math.random() * 100; // percent
    const yPos = Math.random() * 100; // percent
    
    // Random size from the sizes array
    const size = config.sizes[Math.floor(Math.random() * config.sizes.length)];
    
    // Random color from the colors array
    const color = config.colors[Math.floor(Math.random() * config.colors.length)];
    
    // Random movement speeds
    const xSpeed = (Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed) * (Math.random() > 0.5 ? 1 : -1);
    const ySpeed = (Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed) * (Math.random() > 0.5 ? 1 : -1);
    
    // Set the CSS properties
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
    
    // Add particle to the container
    container.appendChild(particle);
    
    // Animate the particle
    animateParticle(particle, xPos, yPos, xSpeed, ySpeed);
}

// Function to animate a particle's movement
function animateParticle(particle, xPos, yPos, xSpeed, ySpeed) {
    // Define the animation frame
    function move() {
        // Update position
        xPos += xSpeed * 0.05;
        yPos += ySpeed * 0.05;
        
        // Boundary check and reversal
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
        
        // Apply updated position
        particle.style.left = `${xPos}%`;
        particle.style.top = `${yPos}%`;
        
        // Continue animation
        requestAnimationFrame(move);
    }
    
    // Start the animation
    requestAnimationFrame(move);
}

// Add subtle parallax effect to the background
document.addEventListener('mousemove', function(e) {
    const bgContainer = document.querySelector('.animated-background');
    if (!bgContainer) return;
    
    const particles = bgContainer.querySelectorAll('.bg-particle');
    
    // Calculate mouse position as percentage of window
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Move particles in opposite direction of mouse movement
    particles.forEach((particle, index) => {
        // Use particle index to create varying movement amounts
        const moveFactor = 0.5 + (index % 5) * 0.1; // Between 0.5 and 0.9
        
        const baseLeft = parseFloat(particle.style.left);
        const baseTop = parseFloat(particle.style.top);
        
        // Apply subtle movement based on mouse position
        const offsetX = (mouseX - 0.5) * moveFactor * -5; // Multiply for more noticeable effect
        const offsetY = (mouseY - 0.5) * moveFactor * -5;
        
        // Don't apply if it would push particle outside boundaries
        if (baseLeft + offsetX > 0 && baseLeft + offsetX < 100) {
            particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        }
    });
});
