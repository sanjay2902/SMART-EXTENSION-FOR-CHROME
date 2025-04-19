let websiteData = {};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ websiteData });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    const domain = new URL(tab.url).hostname;
    if (!websiteData[domain]) {
      websiteData[domain] = { timeSpent: 0 };
    }
    chrome.storage.local.set({ websiteData });
  }
});

chrome.alarms.create("updateTime", { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const domain = new URL(tabs[0].url).hostname;
      if (websiteData[domain]) {
        websiteData[domain].timeSpent += 1;
        chrome.storage.local.set({ websiteData });
      }
    }
  });
});
