const images = [
    'placeholder.jpg',
      'placeholder.jpg',
        'placeholder.jpg',
          'placeholder.jpg',
            'placeholder.jpg',
];

let currentIndex = 0;

const galleryImage = document.getElementById('gallery-image');
const dots = document.querySelectorAll('.dot');

function updateGallery() {
    galleryImage.src = images[currentIndex];
    
    // Update active dot
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Add click event to each dot
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.getAttribute('data-index'));
        updateGallery();
    });
});

// Initialize gallery with first image
updateGallery();

// Auto-advance images every 10 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
}, 5000);
