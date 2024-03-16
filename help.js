const button = document.getElementById("button");
const container = document.getElementById("div1");

button.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = "https://testsafebrowsing.appspot.com/s/malware.html";
  link.innerHTML = "CLICK ME";

  container.appendChild(link);
});
