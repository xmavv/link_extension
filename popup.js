const unSafeColorPicker = document.getElementById("input_unsafe");
const unSafeLink = document.querySelector(".unsafe");

function setColor (input, link) {

    input.addEventListener("input", () => {
        link.style.cssText = `color: ${input.value};`;
    })

    return input.value
}

setColor(unSafeColorPicker, unSafeLink);

chrome.runtime.sendMessage({greeting: "hello", function(response){
    console.log(response.farewell)
}})