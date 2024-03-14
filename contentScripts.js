// CONTENT SCRIPTS TO JEST TAKI PLIK KTORY ZOSTANIE ZALADOWANY WRAZ ZE STARTEM STRONY

const link = document.querySelectorAll("a");

//tutaj moge brac tylko atrybut href bedzie to o wiele lepsze

const apiKey = "AIzaSyC4_ToUySpg0UxJ0gzkNm6pFpHKBjAz2OE";
const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

function api() {
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
      .then((response) => response.json()) // .json() a nie JSON.parse(), bo .json() wykorzystwyany jest z fetch
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
