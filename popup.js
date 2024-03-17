const unSafeColorPicker = document.getElementById("input_unsafe");
const SafeColorPicker = document.getElementById("input_safe");
const unSafeLink = document.querySelector(".unsafe");
const safeLink = document.querySelector(".safe");
let color;

// send message
function sendMessageToContentscripts(e) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      message: color,
      input: e.target.id,
    });
  });
}

// popup manipulations
const processChange = debounce((e, link) => {
  sendMessageToContentscripts(e);
  link.style.color = e.target.value;
  color = e.target.value;
});

// listeners
unSafeColorPicker.addEventListener("input", (e) =>
  processChange(e, unSafeLink)
);
SafeColorPicker.addEventListener("input", (e) => processChange(e, safeLink));

function debounce(callBack, delay = 1000) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callBack(...args);
    }, delay);
  };
}
