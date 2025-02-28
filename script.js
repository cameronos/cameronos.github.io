// easterEgg.js

document.addEventListener('DOMContentLoaded', function () {
    // Get references to the image and audio elements
    const easterEggImage = document.getElementById('easterEggImage');
    const easterEggAudio = document.getElementById('easterEggAudio');

    // Variable to track whether the audio is playing or paused
    let isAudioPlaying = false;

    // Function to toggle audio playback
    function toggleAudio() {
        if (isAudioPlaying) {
            if (easterEggAudio.currentTime === 0) {
                // If the current time is at the beginning, it's a restart
                easterEggAudio.pause();
                console.log('Audio paused and restarted.');
            } else {
                // If the current time is not at the beginning, just pause
                easterEggAudio.pause();
                console.log('Audio paused.');
            }
            isAudioPlaying = false;
        } else {
            easterEggAudio.play();
            console.log('Audio played.');
            isAudioPlaying = true;
        }
    }

    // Add an event listener to the audio element to detect when it has finished playing
    easterEggAudio.addEventListener('ended', function() {
        console.log('Audio ended.');
        isAudioPlaying = false; // Reset the playback state when the audio finishes
    });

    // Add a click event listener to the image
    easterEggImage.addEventListener('click', toggleAudio);
});

//cursor start
const cursorCircle = document.getElementById('cursor-circle');
const lagFactor = 0.2; // Adjust the lag factor as needed

let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    // Update the circle's position to follow the cursor
    const x = e.clientX;
    const y = e.clientY;

    // Apply the lag effect by interpolating between the current and target positions
    currentX += (x - currentX) * lagFactor;
    currentY += (y - currentY) * lagFactor;

    // Update the circle's position
    cursorCircle.style.left = `${currentX}px`;
    cursorCircle.style.top = `${currentY}px`;

    // Check if the circle is within #rcorners1
    const rcorners1 = document.getElementById('rcorners1');
    //const rcorners1Rect = rcorners1.getBoundingClientRect();
    
    if (
        currentX >= rcorners1Rect.left &&
        currentX <= rcorners1Rect.right &&
        currentY >= rcorners1Rect.top &&
        currentY <= rcorners1Rect.bottom
    ) {
        // Change the circle's border color when it is inside #rcorners1
        cursorCircle.style.borderColor = '#3B5CD5'; // Change to the desired color
    } else {
        // Reset the circle's border color when it is outside #rcorners1
        cursorCircle.style.borderColor = 'white'; // Change to the default color
    }
});
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