// CONTENT SCRIPTS TO JEST TAKI PLIK KTORY ZOSTANIE ZALADOWANY WRAZ ZE STARTEM STRONY

//tutaj moge brac tylko atrybut href bedzie to o wiele lepsze

const apiKey = "AIzaSyC4_ToUySpg0UxJ0gzkNm6pFpHKBjAz2OE";
const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

function api() {
  const link = document.querySelectorAll("a");
  link.forEach((e) => {
    let link_href = e.getAttribute("href");

    const requestData = {
      client: {
        clientId: "ID",
        clientVersion: "1.0.0",
      },
      threatInfo: {
        threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
        platformTypes: ["WINDOWS"],
        threatEntryTypes: ["URL"],
        threatEntries: [{ url: `${link_href}` }],
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

api();

//every DOM update handling

function handleDOMMutations(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList" || mutation.type === "attributes") {
      // Tutaj wykonaj odpowiednie akcje w zależności od wykrytej zmiany
      console.log("Zmieniono zawartość strony");
      console.log(observer);
      api();
    }
  }
}

const config = { childList: true, subtree: true, attributes: true };
const observer = new MutationObserver(handleDOMMutations);

observer.observe(document.body, config);

// czyli za kazdym razem gdy metoda observe cos wykryje, ten nasz obiekt jest zainicjalizowany z funkcja callback, wiec on wie ze wykona funkcje callback
// gdy cokolwiek sie zmieni i do tej funkcji automatycznie idzie mutationList ktore zwraca ten MutationObserver

// returnuje ten observer ta mutationList i automatycznie przekazuje ja do callback funkcji

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log("dziala1");
// });

// for now it only check links that are staticly added by developer throught html

// This is a pretty basic expression for testing domain names:
// @^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$@i

// Should match:

// domain.com
// www.domain.com
// http://domain.com
// https://domain.com
