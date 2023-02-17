// Handle messages from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "playTypewriterSound") {
    // Play typewriter sound effect
    var audio = new Audio(request.soundUrl);
    audio.play();
  }
});
