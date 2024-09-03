const backBtn = document.getElementById('backBtn');
const forwardBtn = document.getElementById('forwardBtn');
const addressBar = document.getElementById('addressBar');
const goBtn = document.getElementById('goBtn');
const navButton = document.getElementById('nav-button');
const webContent = document.getElementById('webContent');

let historyStack = [];
let currentHistoryIndex = -1;

function loadPage(url) {
    webContent.src = url;
    if (currentHistoryIndex === -1 || historyStack[currentHistoryIndex] !== url) {
        historyStack = historyStack.slice(0, currentHistoryIndex + 1);
        historyStack.push(url);
        currentHistoryIndex++;
    }
    updateButtons();
}

function updateButtons() {
    backBtn.disabled = currentHistoryIndex <= 0;
    forwardBtn.disabled = currentHistoryIndex >= historyStack.length - 1;
}

backBtn.addEventListener('click', () => {
    if (currentHistoryIndex > 0) {
        currentHistoryIndex--;
        addressBar.value = historyStack[currentHistoryIndex];
        loadPage(historyStack[currentHistoryIndex]);
    }
});

forwardBtn.addEventListener('click', () => {
    if (currentHistoryIndex < historyStack.length - 1) {
        currentHistoryIndex++;
        addressBar.value = historyStack[currentHistoryIndex];
        loadPage(historyStack[currentHistoryIndex]);
    }
});

goBtn.addEventListener('click', () => {
    const url = addressBar.value.trim();
    if (url) {
        loadPage(url);
    }
});

navButton.addEventListener('click', () => {
    window.location.href = '../index.htm'; // Adjust the path as necessary
});

// Initial page load
loadPage(addressBar.value);
