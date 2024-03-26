const button = document.getElementById("button");

button.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = "https://testsafebrowsing.appspot.com/s/malware.html";
  link.innerHTML = "CLICK ME";

  document.body.appendChild(link);
});
