chrome.runtime.onMessage.addListener((message) => {
  if (message.isChecked) {
    chrome.windows.onFocusChanged.addListener((windowId) => {
      if (windowId === chrome.windows.WINDOW_ID_NONE) {
        // Window lost focus
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "pauseVideo" });
          }
        });
      } else {
        // Window gained focus
        chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
          if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "resumeVideo" });
          }
        });
      }
    });
  }
});
