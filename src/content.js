chrome.runtime.sendMessage({
  todo: "showPageAction",
});

// reference: https://stackoverflow.com/questions/30578673/is-it-possible-to-make-queryselectorall-live-like-getelementsbytagname
function querySelectorAllLive(element, selector) {
  // Initialize results with current nodes.
  const result = Array.prototype.slice.call(element.querySelectorAll(selector));

  // Create observer instance.
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      [].forEach.call(mutation.addedNodes, function (node) {
        if (node.nodeType === Node.ELEMENT_NODE && node.matches(selector)) {
          result.push(node);
        }
      });
    });
  });

  // Set up observer.
  observer.observe(element, { childList: true, subtree: true });

  return result;
}

// Update comments when new comes
let commentsSize = 0;
setInterval(() => {
  const elms = querySelectorAllLive(document, "[id='content-text']");
  if (elms.length === commentsSize) return;
  commentsSize = elms.length;

  elms.forEach((elem) => {
    if (elem.getAttribute("isChanged") !== "yes") {
      const translateButton = document.createElement("button");
      const text = elem.textContent;
      translateButton.innerHTML = "Translate";
      translateButton.addEventListener("click", () => {
        fetch("https://48911590.ngrok.io/translate", {
          // ngrok tunneling to my api
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        })
          .then((response) => response.json())
          .then(({ message }) => {
            elem.textContent = message;
          })
          .catch((error) => {
            elem.textContent = error;
          });
      });
      elem.appendChild(translateButton);
      elem.setAttribute("isChanged", "yes");
    }
  });
}, 1000);

chrome.run;
