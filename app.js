const link_href = document.querySelector("a").getAttribute("href");
const link = document.querySelector("a");
// console.log(link);

const isSafe = (e) => {
    if (e.substring(0, 24) == "https://www.youtube.com/") {
        return true;
    } else {
        return false;
    }
};

if (isSafe(link_href)) {
    link.style.color = "green";
} else {
    link.style.color = "red";
}