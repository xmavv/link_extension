const unSafeColorPicker = document.getElementById("input_unsafe");
const SafeColorPicker = document.getElementById("input_safe");
const unSafeLink = document.querySelector(".unsafe");
let unSafeColor = unSafeColorPicker.value;
let SafeColor = SafeColorPicker.value;

function setColor(input, link) {
  input.addEventListener("input", () => {
    link.style.cssText = `color: ${input.value};`;
    unSafeColor = input.value;
  });
}

setColor(unSafeColorPicker, unSafeLink);

//TO JEST TU MEGA zle zrobione XD ten kod to jakis zart

function popup() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: unSafeColor });
  });
}

popup();

document.document;
unSafeColorPicker.addEventListener("input", popup);
SafeColorPicker.addEventListener("input", popup);

function debounce(callback, delay = 10000) {}

// chrome.runtime.sendMessage({greeting: "hello", function(response){
//     console.log(response.farewell)
// }})
