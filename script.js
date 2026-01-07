// easterEgg.js

//cursor start
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
if (!isMobile) {
    const cursorCircle = document.getElementById('cursor-circle');
    const lagFactor = 0.2; // Adjust the lag factor as needed

    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        currentX += (x - currentX) * lagFactor;
        currentY += (y - currentY) * lagFactor;

        cursorCircle.style.left = `${currentX}px`;
        cursorCircle.style.top = `${currentY}px`;

        const rcorners1 = document.getElementById('rcorners1');
        const rcorners1Rect = rcorners1.getBoundingClientRect();

        if (
            currentX >= rcorners1Rect.left &&
            currentX <= rcorners1Rect.right &&
            currentY >= rcorners1Rect.top &&
            currentY <= rcorners1Rect.bottom
        ) {
            cursorCircle.style.borderColor = '#3B5CD5';
        } else {
            cursorCircle.style.borderColor = 'white';
        }
    });
}
//end cursor


//audio
// Add this section to handle "pop" sound on all links
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(event) {
        // Play the pop sound
        var audio = document.getElementById('pop-audio');
        audio.play();
        
        // Delay navigation (if needed)
        navigateAfterDelay(this.href, 300);
        
        // Prevent the default link behavior (optional if you want the delay to be noticed)
        event.preventDefault();
    });
});

// Audio function to handle the navigation delay
var allowNavigation = true;

function navigateAfterDelay(url, delay) {
    setTimeout(function() {
        if (allowNavigation) {
            window.location.href = url;
        }
    }, delay);
}

//keeps music at end, not important to rest of js

document.addEventListener('DOMContentLoaded', function () {
    // --- Easter Egg Image & Audio ---
    const easterEggImage = document.getElementById('easterEggImage');
    const easterEggAudio = document.getElementById('easterEggAudio');

    // Randomly pick sunlogo or asmlogo for the footer image
    const options = ['img/sunlogo.png', 'img/asmlogo.png'];
    easterEggImage.src = options[Math.floor(Math.random() * options.length)];

    // Variable to track whether the audio is playing or paused
    let isAudioPlaying = false;

    // Function to toggle audio playback
    function toggleAudio() {
        if (isAudioPlaying) {
            easterEggAudio.pause();
            isAudioPlaying = false;
            console.log('Audio paused.');
        } else {
            easterEggAudio.play();
            isAudioPlaying = true;
            console.log('Audio played.');
        }
    }

    // Reset state when audio ends
    easterEggAudio.addEventListener('ended', function () {
        isAudioPlaying = false;
        console.log('Audio ended.');
    });

    // Play/pause audio when footer image is clicked
    easterEggImage.addEventListener('click', toggleAudio);
});
