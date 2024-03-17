const apiKey = "AIzaSyC4_ToUySpg0UxJ0gzkNm6pFpHKBjAz2OE";
const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;
let colorSafe;
let colorUnSafe;

function validateLinks(colorSafe = "green", colorUnSafe = "red") {
  const links = document.querySelectorAll("a");
  links.forEach((e) => {
    let linkHref = e.getAttribute("href");

    if (linkHref === "#") {
      e.style.color = colorSafe;
      return;
    }

    const requestData = {
      client: {
        clientId: "ID",
        clientVersion: "1.0.0",
      },
      threatInfo: {
        threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
        platformTypes: ["WINDOWS"],
        threatEntryTypes: ["URL"],
        threatEntries: [{ url: linkHref }],
      },
    };

    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.matches && data.matches.length > 0) {
          e.style.color = colorUnSafe;
        } else {
          e.style.color = colorSafe;
        }
      })
      .catch((error) => {
        console.error("Error occured:", error);
      });
  });
}
validateLinks();

//wait for message from popup.js about color
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  request.input === "input_unsafe"
    ? (colorUnSafe = request.message)
    : (colorSafe = request.message);
});

//every DOM update handling
function handleDOMMutations(mutationsListCallBack, observer) {
  for (let mutation of mutationsListCallBack) {
    if (mutation.type === "childList" || mutation.type === "attributes") {
      console.log("now updating");
      // validateLinks();
    }
  }
}

const config = { childList: true, subtree: true, attributes: true };
const processChange = debounce(handleDOMMutations, 10000);
const observer = new MutationObserver(processChange);

observer.observe(document.body, config);

// czyli za kazdym razem gdy metoda observe cos wykryje, ten nasz obiekt jest zainicjalizowany z funkcja callback, wiec on wie ze wykona funkcje callback
// gdy cokolwiek sie zmieni i do tej funkcji automatycznie idzie mutationList ktore zwraca ten MutationObserver

// returnuje ten observer ta mutationList i automatycznie przekazuje ja do callback funkcji

function debounce(callBack, delay = 1000) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callBack(...args);
    }, delay);
  };
}
