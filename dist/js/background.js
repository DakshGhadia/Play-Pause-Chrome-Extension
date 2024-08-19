let focusChangeListenerActive = false;

function updateFocusChangeListener(isChecked) {
  if (isChecked && !focusChangeListenerActive) {
    chrome.windows.onFocusChanged.addListener(handleFocusChange);
    focusChangeListenerActive = true;
  } else if (!isChecked && focusChangeListenerActive) {
    chrome.windows.onFocusChanged.removeListener(handleFocusChange);
    focusChangeListenerActive = false;
  }
}

function handleFocusChange(windowId) {
  chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
    if (tabs[0]) {
      const action =
        windowId === chrome.windows.WINDOW_ID_NONE
          ? "pauseVideo"
          : "resumeVideo";
      chrome.tabs.sendMessage(tabs[0].id, { action: action });
    }
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (typeof message.isChecked === "boolean") {
    updateFocusChangeListener(message.isChecked);
  }
});

chrome.storage.local.get(["checked"], (result) => {
  updateFocusChangeListener(result.checked ?? false);
});
