chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.isChecked) {
    console.log("Toggle state changed:", message.isChecked);
  }
});
