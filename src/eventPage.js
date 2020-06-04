chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.todo == "showPageAction") {
    chrome.pageAction.show(sender.tab.id);
  }
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  var newUrl = changeInfo.url;
  if (newUrl !== undefined && newUrl.indexOf("youtube") !== -1) {
    chrome.tabs.sendMessage(tabId, { todo: "reloadPage" });
  }
});
