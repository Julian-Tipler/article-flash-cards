console.log("background.js 🥷🥷");

chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    switch (request.action) {
      case "saveWiseFlashcardsSessionToken":
        saveWiseFlashcardsSessionToken(request.token);
        if (request.token) {
          sendResponse({ success: true, message: "Token has been received" });
        } else {
          sendResponse({ success: false, message: "Token is empty" });
        }
        break;
      case "removeWiseFlashcardsSessionToken":
        removeWiseFlashcardsSessionToken();
        sendResponse({ success: true, message: "Token has been removed" });
        break;
    }
    return true;
  }
);

function saveWiseFlashcardsSessionToken(token) {
  chrome.storage.local.set(
    { wiseFlashcardsSessionToken: token },
    function() {}
  );
}

function removeWiseFlashcardsSessionToken() {
  chrome.storage.local.set({ wiseFlashcardsSessionToken: null }, function() {});
}

// Logout user upon unauthorized request
chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    const isUnauthorized = details.statusCode === 401;

    if (isUnauthorized) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "removeWiseFlashcardsSessionToken",
        });
      });
    }

    return { responseHeaders: details.responseHeaders };
  },
  {
    urls: ["<all_urls>"],
    types: ["main_frame"],
  },
  ["responseHeaders"]
);
