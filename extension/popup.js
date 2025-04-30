document.getElementById("simple-selector").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content.js"],
    });
  });
});

const htmlInput = document.getElementById("element-html");
const getSelectorButton = document.getElementById("get-selector");
const selectorOutput = document.getElementById("selector-output");

getSelectorButton.addEventListener("click", () => {
  const htmlSnippet = htmlInput.value;

  if (!htmlSnippet.trim()) {
    selectorOutput.textContent = "Please paste a valid HTML snippet.";
    return;
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlSnippet, "text/html");
    const element = doc.body.firstChild;

    if (!element) {
      selectorOutput.textContent = "Invalid HTML snippet. Please try again.";
      return;
    }

    const selector = generateCypressSelector(element);

    selectorOutput.innerHTML = `<span>Generated Selector:</span> ${selector}`;
    navigator.clipboard.writeText(selector).then(() => {
      console.log("Selector copied to clipboard:", selector);
    });
  } catch (error) {
    console.error("Error parsing HTML snippet:", error);
    selectorOutput.textContent = "An error occurred while processing the HTML. Please try again.";
  }
});

function generateCypressSelector(element) {
  if (element.getAttribute("data-cy")) {
    return `[data-cy="${element.getAttribute("data-cy")}"]`;
  } else if (element.getAttribute("data-test")) {
    return `[data-test="${element.getAttribute("data-test")}"]`;
  } else if (element.getAttribute("data-testid")) {
    return `[data-testid="${element.getAttribute("data-testid")}"]`;
  } else if (element.id) {
    return `#${element.id}`;
  } else if (element.name) {
    return `[name="${element.name}"]`;
  } else if (element.tagName && element.getAttribute("type")) {
    const tagName = element.tagName.toLowerCase();
    const typeValue = element.getAttribute("type");
    if (tagName && typeValue) {
      return `${tagName}[type="${typeValue}"]`;
    }
  } else if (typeof element.className === "string" && element.className.trim()) {
    const classList = element.className.trim().split(/\s+/).join(".");
    return `.${classList}`;
  } else if (["button", "a", "span"].includes(element.tagName.toLowerCase()) && element.textContent.trim()) {
    return `cy.contains("${element.textContent.trim()}")`;
  } else {
    return element.tagName.toLowerCase();
  }
}