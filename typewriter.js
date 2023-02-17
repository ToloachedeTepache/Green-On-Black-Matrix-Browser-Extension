// Animate text as typewriter effect, line-by-line
var textElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, span");

for (var i = 0; i < textElements.length; i++) {
  var text = textElements[i].textContent;
  textElements[i].textContent = "";

  if (text && text.length > 0) {
    for (var j = 0; j < text.length; j++) {
      setTimeout(function() {
        if (textElements[i]) {
          textElements[i].textContent += text[j];
          var event = new Event("typewriter:textAdded");
          document.dispatchEvent(event);
        }
      }, j * 75);
    }
  }
}
