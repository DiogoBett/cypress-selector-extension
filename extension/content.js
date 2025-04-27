document.addEventListener("click", function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const element = event.target;
    const selector = generateCypressSelector(element);

    navigator.clipboard.writeText(selector).then(() => {
        alert(`Cypress Selector copied: ${selector}`);
    });

    document.removeEventListener("click", handleClick);
});

function generateCypressSelector(element) {
    if (element.id) {
        return `#${element.id}`;
    } else if (element.className) {
        const classList = element.className.trim().split(/\s+/).join(".");
        return `.${classList}`;
    } else {
        return element.tagName.toLowerCase();
    }
}