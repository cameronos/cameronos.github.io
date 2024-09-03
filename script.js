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
    const rcorners1Rect = rcorners1.getBoundingClientRect();
    
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
// Define a flag to control navigation
var allowNavigation = false;

// Audio
// Define a flag to control navigation
var allowNavigation = true;

// Function to play audio
function playAudio(url) {
  var audio = new Audio(url);
  audio.play();
  audio.addEventListener('ended', function() {
    allowNavigation = true;
  });
}

// Function to navigate after delay
function navigateAfterDelay(url, delay) {
  setTimeout(function() {
    if (allowNavigation) {
      window.location.href = url;
    }
  }, delay);
}

// Function to handle link clicks on mobile
function handleMobileLinkClick(event, url) {
  event.preventDefault();
  playAudio('pop.mp3');
  navigateAfterDelay(url, 100);
  allowNavigation = false; // Prevent further navigation until audio finishes
}

// Add an event listener to set allowNavigation to false when the page is unloaded
window.addEventListener('beforeunload', function() {
  allowNavigation = false;
});