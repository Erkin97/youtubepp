chrome.runtime.sendMessage({
  todo: "showPageAction"
});

function get_video_id(v_url) {
  if (v_url.indexOf("watch") == -1) {
    return "-1";
  }
  let i = v_url.indexOf("v=");
  if (i == -1) return "-1";
  let ans = "";
  for (i = i + 2; i < v_url.length; i++) {
    if (v_url[i] == '?' || v_url[i] == '/' || v_url[i] == '&') {
      return ans;
    }
    ans += v_url[i];
  }
  return ans;
}

const translateCommentElement = (commentElem) => {
  console.log(commentElem.textContent);
  // translate
  commentElem.textContent = "translate me bro";
};

// reference: https://stackoverflow.com/questions/30578673/is-it-possible-to-make-queryselectorall-live-like-getelementsbytagname
function querySelectorAllLive(element, selector) {
  // Initialize results with current nodes.
  const result = Array.prototype.slice.call(element.querySelectorAll(selector));

  // Create observer instance.
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      [].forEach.call(mutation.addedNodes, function(node) {
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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.todo == "unblockVideo") {
    const page_href = window.location.href;
    const myNode = this.document.getElementById("player-container-outer");
    if (myNode == undefined || myNode.innerHTML == "") {
      const myNode = this.document.getElementById("player-container");
    }
    myNode = myNode.parentNode;
    const player_height = myNode.clientHeight;
    const player_width = myNode.clientWidth;
    new_code = '<iframe class="unblocked" width="' + player_width + '" height="' + player_height + '" src="https://www.youtube.com/embed/' + get_video_id(page_href) + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
    const new_player = this.document.createElement("span");
    new_player.innerHTML = new_code;
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
    new_player.id = "roflancheckme";
    myNode.appendChild(new_player);
    myNode.id = "new_player";
  }
  if (request.todo == "reloadPage") {
    if (document.getElementById("roflancheckme").innerHTML != "" &&
      document.getElementById("roflancheckme").innerHTML != undefined) {
      document.location.reload(true);
    }
  }
  if (request.todo == "parseComments") {
    const elms = querySelectorAllLive(document, "[id='content-text']");
  }
});

setInterval(() => {
  const elms = querySelectorAllLive(document, "[id='content-text']");
  elms.forEach((elem) => {
    if (elem.getAttribute('isChanged') !== 'yes') {
      const translateButton = document.createElement("button");
      translateButton.innerHTML = "Translate";
      translateButton.addEventListener ("click", function() {
        elem.textContent = 'Translated';
      });
      elem.appendChild(translateButton);
      elem.setAttribute('isChanged', 'yes');
    }
  });
}, 1000);

chrome.run