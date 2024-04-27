const unSafeColorPicker = document.getElementById("input_unsafe");
const SafeColorPicker = document.getElementById("input_safe");
const unSafeLink = document.querySelector(".unsafe");
const safeLink = document.querySelector(".safe");
const btnSubmitSettings = document.getElementById("btn");

let safeColor = "green";
let unsafeColor = "red";

document.addEventListener("DOMContentLoaded", () => {
  const colors = JSON.parse(localStorage.getItem("colors")) || {
    unsafeColor,
    safeColor,
  };
  safeLink.style.color = colors.safeColor;
  unSafeLink.style.color = colors.unsafeColor;
  SafeColorPicker.value = colors.safeColor;
  unSafeColorPicker.value = colors.unsafeColor;

  safeColor = colors.safeColor;
  unsafeColor = colors.unsafeColor;
  sendMessageToContentscripts();
});
sendMessageToContentscripts();

// send message
function sendMessageToContentscripts() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      message: safeColor,
      message2: unsafeColor,
    });
  });

  chrome.storage.sync.set({ unsafe: unsafeColor });
  chrome.storage.sync.set({ safe: safeColor });
}

// btn submit settings
btnSubmitSettings.addEventListener("click", () => {
  chrome.storage.local.set({ key: "value" }).then(() => {
    console.log("value is set");
  });
});

// popup manipulations
const processChange = debounce((e, link) => {
  link.style.color = e.target.value;
  link === "input__unsafe"
    ? (unsafeColor = e.target.value)
    : (safeColor = e.target.value);
  sendMessageToContentscripts(e);
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
