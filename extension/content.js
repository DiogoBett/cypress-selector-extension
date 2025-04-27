document.addEventListener("click", function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const element = event.target;
    const selector = generateCypressSelector(element);

    navigator.clipboard.writeText(selector).then(() => {
        showToast(`Cypress Selector: ${selector}`);
    });

    removeCursorStyle();
    document.removeEventListener("click", handleClick);
},
    { once: true }
);

function generateCypressSelector(element) {
    if (element.id) {
        return `#${element.id}`;
    } else if (element.name) {
        return `[name="${element.name}"]`;
    } else if (typeof element.className === "string" && element.className.trim()) {
        const classList = element.className.trim().split(/\s+/).join(".");
        return `.${classList}`;
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

function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.padding = "10px 20px";
    toast.style.backgroundColor = "#333";
    toast.style.color = "#fff";
    toast.style.borderRadius = "5px";
    toast.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    toast.style.zIndex = "9999";
    toast.style.fontFamily = "Arial, sans-serif";
    toast.style.fontSize = "14px";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "1";
    }, 0);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 1000);
}

function addCursorStyle() {
    document.body.style.cursor = "crosshair";
}

function removeCursorStyle() {
    document.body.style.cursor = "";
}

addCursorStyle();