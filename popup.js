const unSafeColorPicker = document.getElementById("input_unsafe");
const unSafeLink = document.querySelector(".unsafe");
let color = 'red';

function setColor (input, link) {

    input.addEventListener("input", () => {
        link.style.cssText = `color: ${input.value};`;
        color = input.value;
    })
}

setColor(unSafeColorPicker, unSafeLink);



function popup() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        const activeTab = tabs[0];
        console.log(siema);
        chrome.tabs.sendMessage(activeTab.id, {message: color});
    });
}

document.getElementById("input_unsafe").addEventListener("input", popup);






// chrome.runtime.sendMessage({greeting: "hello", function(response){
//     console.log(response.farewell)
// }})