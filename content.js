// Inject a stylesheet to apply the green-on-black style and Courier New font
var style = document.createElement("link");
style.rel = "stylesheet";
style.type = "text/css";
style.href = chrome.runtime.getURL("content.css");
document.head.appendChild(style);

// Animate text as typewriter effect, letter-by-letter, from top to bottom, and only once
function animateText(element) {
  var text = element.textContent.trim();
  var lines = text.split('\n');
  element.textContent = "";

  var i = 0;
  var j = 0;
  function addLetter() {
    if (i < lines.length) {
      if (j < lines[i].length) {
        element.textContent += lines[i].charAt(j);
        j++;
        var event = new Event("typewriter:textAdded");
        document.dispatchEvent(event);
        setTimeout(addLetter, 50);
      } else {
        element.textContent += '\n';
        i++;
        j = 0;
        setTimeout(addLetter, 100);
      }
    }
  }

  addLetter();
}

// Replace thumbnails with green placeholders
var thumbnailPlaceholders = document.querySelectorAll(
  "img[src*='i.ytimg.com'], img[src*='googleusercontent.com'], img[src*='google.com/img']"
);
thumbnailPlaceholders.forEach(function(thumbnail) {
  thumbnail.src = chrome.runtime.getURL("green_thumbnail.png");
});

// Animate text in a loop
function animateTextLoop() {
  var textElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, span");
  for (var i = 0; i < textElements.length; i++) {
    animateText(textElements[i]);
  }
}

// Start animating text
animateTextLoop();

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "getTypewriterSoundUrl") {
    // Get the URL of the typewriter sound effect
    var soundUrl = chrome.runtime.getURL("typewriter.mp3");
    sendResponse({ soundUrl: soundUrl });
  }
});

// Play typewriter sound effect when text is added
document.addEventListener("typewriter:textAdded", function() {
  chrome.runtime.sendMessage({ message: "playTypewriterSound" });
});
