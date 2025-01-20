// Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'CAPTURE_SCREENSHOT') {
    chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
      // Save to downloads
      chrome.downloads.download({
        url: dataUrl,
        filename: `screenshot-${Date.now()}.png`,
        saveAs: true
      });
      sendResponse({ success: true });
    });
    return true;
  }
});