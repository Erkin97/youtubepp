window.onload = function () {
  const element = document.getElementById("translate-language");
  chrome.storage.local.get(['destination'], function(result) {
    element.value = result.destination ? result.destination : "en";
  });
  element.addEventListener("change", function() {
    console.log(element.value);
    chrome.storage.local.set({ destination: element.value });
  }, false);
};