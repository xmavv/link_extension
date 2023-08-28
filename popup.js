const safeColorPicker = document.getElementById("input_safe");
const unSafeColorPicker = document.getElementById("input_unsafe");
const safeLink = document.querySelector(".safe");
const unSafeLink = document.querySelector(".unsafe");

const setColor = (input, link) => {

    input.addEventListener("input", () => {
        link.style.cssText = `color: ${input.value};`;
    })
}

setColor(safeColorPicker, safeLink);
setColor(unSafeColorPicker, unSafeLink);