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
let needToReload = false;
setInterval(() => {
  const elms = querySelectorAllLive(document, "[id='content-text']");
  if (elms.length === commentsSize) return;
  commentsSize = elms.length;

  elms.forEach((elem) => {
    if (elem.getAttribute("isChanged") !== "yes") {
      const translateButton = document.createElement("span");
      const text = elem.textContent;
      translateButton.innerHTML = " 🌎 TRANSLATE 🌏 ";
      translateButton.style.cursor = "pointer";
      translateButton.style.color = "#113d4f";
      needToReload = true;
      translateButton.addEventListener("click", () => {
        chrome.storage.local.get(["destination"], function (result) {
          const dest = result.destination ? result.destination : "en";
          fetch("", {
            // ngrok tunneling to my api
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text, dest }),
          })
            .then((response) => response.json())
            .then(({ message }) => {
              elem.textContent = message;
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
      translateButton.style.display = "none";
      elem.parentNode.onmouseover = () => {
        translateButton.style.display = "inline";
      };
      elem.parentNode.onmouseleave = () => {
        translateButton.style.display = "none";
      };
      elem.appendChild(translateButton);
      elem.setAttribute("isChanged", "yes");
    }
  });
}, 2000);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.todo == "reloadPage") {
    if (needToReload) {
      needToReload = false;
      document.location.reload(true);
    }
  }
});

chrome.run;
