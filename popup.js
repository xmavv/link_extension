const unSafeColorPicker = document.getElementById("input_unsafe");
const SafeColorPicker = document.getElementById("input_safe");
const unSafeLink = document.querySelector(".unsafe");
const safeLink = document.querySelector(".safe");
const btnSubmitSettings = document.getElementById("btn");

let safeColor = "#00ff00";
let unsafeColor = "#ff0000";

// to trzeba zmienic na local storage
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["safeColor"]).then((result) => {
    console.log("safe is " + result.safeColor);
    safeColor = result.safeColor;
    SafeColorPicker.value = safeColor;
    safeLink.style.color = safeColor;
  });
  chrome.storage.local.get(["unsafeColor"]).then((result) => {
    console.log("unsafe is " + result.unsafeColor);
    unsafeColor = result.unsafeColor;
    unSafeColorPicker.value = unsafeColor;
    unSafeLink.style.color = unsafeColor;
  });
  // sendMessageToContentscripts();
});

// send message
function sendMessageToContentscripts() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      safeColor,
      unsafeColor,
    });
  });
}

// btn submit settings
btnSubmitSettings.addEventListener("click", () => {
  chrome.storage.local.set({ safeColor }).then(() => {
    console.log("safe is set");
  });

  chrome.storage.local.set({ unsafeColor }).then(() => {
    console.log("unsafecolor is set");
  });

  sendMessageToContentscripts();
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
