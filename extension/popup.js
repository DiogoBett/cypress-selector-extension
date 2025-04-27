document.getElementById("simple-selector").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content.js"],
    });
  });
});

document.getElementById("debug-selector").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    chrome.debugger.attach({ tabId }, "1.3", () => {
      chrome.debugger.sendCommand({ tabId }, "DOM.enable");
      chrome.debugger.sendCommand({ tabId }, "Overlay.enable");
      chrome.debugger.sendCommand({ tabId }, "Overlay.setInspectMode", {
        mode: "searchForNode",
        highlightConfig: { borderColor: { r: 255, g: 0, b: 0, a: 1 }, showInfo: true },
      });

      chrome.debugger.onEvent.addListener(function handleDebugEvent(source, method, params) {
        if (method === "Overlay.inspectNodeRequested") {
          chrome.debugger.sendCommand({ tabId }, "DOM.resolveNode", { nodeId: params.backendNodeId }, (response) => {
            chrome.debugger.sendCommand({ tabId }, "Runtime.evaluate", {
              expression: `document.querySelector('[data-node-id="${response.objectId}"]').outerHTML`,
            }, (result) => {
              const elementHTML = result.result.value;
              const selector = generateCypressSelectorFromHTML(elementHTML);
              navigator.clipboard.writeText(selector).then(() => alert(`Debug Selector copied: ${selector}`));
              chrome.debugger.sendCommand({ tabId }, "Overlay.setInspectMode", { mode: "none" }, () => {
                chrome.debugger.detach({ tabId });
              });
            });
          });
        }
      });
    });
  });
});

function generateCypressSelectorFromHTML(elementHTML) {
  const element = new DOMParser().parseFromString(elementHTML, "text/html").body
    .firstChild;

  if (element.id) {
    return `#${element.id}`;
  } else if (element.name) {
    return `[name="${element.name}"]`;
  } else if (element.className) {
    if (element.className && typeof element.className === "string") {
      const classList = element.className.trim().split(/\s+/).join(".");
      return `.${classList}`;
    }
  } else if (element.getAttribute("data-cy")) {
    return `[data-cy="${element.getAttribute("data-cy")}"]`;
  } else if (element.getAttribute("data-test")) {
    return `[data-test="${element.getAttribute("data-test")}"]`;
  } else if (element.getAttribute("data-testid")) {
    return `[data-testid="${element.getAttribute("data-testid")}"]`;
  } else {
    return element.tagName.toLowerCase();
  }
}
