chrome.contextMenus.create({
    id: "generateSelector",
    title: "Generate Cypress Selector",
    contexts: ["all"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "generateSelector") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
        });
    }
});