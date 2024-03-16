// CONTENT SCRIPTS TO JEST TAKI PLIK KTORY ZOSTANIE ZALADOWANY WRAZ ZE STARTEM STRONY

//tutaj moge brac tylko atrybut href bedzie to o wiele lepsze

const apiKey = "AIzaSyC4_ToUySpg0UxJ0gzkNm6pFpHKBjAz2OE";
const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

function validateLinks() {
  const links = document.querySelectorAll("a");
  links.forEach((e) => {
    let linkHref = e.getAttribute("href");

    if (linkHref === "#") {
      e.style.color = "green";
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
        threatEntries: [{ url: `${linkHref}` }],
      },
    };

    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.matches && data.matches.length > 0) {
          e.style.color = "red";
        } else {
          e.style.color = "green";
        }

        chrome.runtime.onMessage.addListener(function (
          request,
          sender,
          sendResponse
        ) {
          if (data.matches && data.matches.length > 0)
            e.style.color = request.message;
        });
      })
      .catch((error) => {
        console.error("Error occured:", error);
      });
  });
}

validateLinks();

//every DOM update handling

function handleDOMMutations(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList" || mutation.type === "attributes") {
      validateLinks();
    }
  }
}

const config = { childList: true, subtree: true, attributes: true };
const observer = new MutationObserver(handleDOMMutations);

observer.observe(document.body, config);

// czyli za kazdym razem gdy metoda observe cos wykryje, ten nasz obiekt jest zainicjalizowany z funkcja callback, wiec on wie ze wykona funkcje callback
// gdy cokolwiek sie zmieni i do tej funkcji automatycznie idzie mutationList ktore zwraca ten MutationObserver

// returnuje ten observer ta mutationList i automatycznie przekazuje ja do callback funkcji
