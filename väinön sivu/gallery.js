const images = [
    'logo.jpeg',
    'image2.jpeg',
    'image3.jpeg',
    'image4.jpeg',
    'image5.jpeg'
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

// Optional: Auto-advance images every 5 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
}, 10000);
