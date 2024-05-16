const unSafeColorPicker = document.getElementById("input_unsafe");
const SafeColorPicker = document.getElementById("input_safe");
const unSafeLink = document.querySelector(".unsafe");
const safeLink = document.querySelector(".safe");
const btnSubmitSettings = document.getElementById("btn");
const toggle = document.getElementById("toggle");
const toggleOn = document.getElementById("toggle-on");
let isExtensionOn;

let safeColor = "#00ff00";
let unsafeColor = "#ff0000";

// while clicking our safeLink icon
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["safeColor"]).then((result) => {
    safeColor = result.safeColor;
    SafeColorPicker.value = safeColor;
    safeLink.style.color = safeColor;
  });
  chrome.storage.local.get(["unsafeColor"]).then((result) => {
    unsafeColor = result.unsafeColor;
    unSafeColorPicker.value = unsafeColor;
    unSafeLink.style.color = unsafeColor;
  });
  chrome.storage.local.get(["isExtensionOn"]).then((result) => {
    toggle.checked = result.isExtensionOn;
    isExtensionOn = result.isExtensionOn;
    isExtensionOn
      ? (toggleOn.textContent = "ON")
      : (toggleOn.textContent = "OFF");
  });
});

// send message
function sendMessageToContentscripts() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      safeColor,
      unsafeColor,
      isExtensionOn,
    });
  });
}

// btn submit settings
const processSendMessageChange = debounce(() => {
  chrome.storage.local.set({ safeColor }).then(() => {});

  chrome.storage.local.set({ unsafeColor }).then(() => {});

  chrome.storage.local.set({ isExtensionOn }).then(() => {});
  sendMessageToContentscripts();
}, 3000);

btnSubmitSettings.addEventListener("click", processSendMessageChange);

toggle.addEventListener("click", () => {
  isExtensionOn = toggle.checked;

  isExtensionOn
    ? (toggleOn.textContent = "ON")
    : (toggleOn.textContent = "OFF");
});

// popup manipulations
const processChange = debounce((e, link) => {
  link.style.color = e.target.value;
  link.classList[0] === "unsafe"
    ? (unsafeColor = e.target.value)
    : (safeColor = e.target.value);
  // sendMessageToContentscripts(e);
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
