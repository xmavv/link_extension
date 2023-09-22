// import setColor from './popup.js'

const link = document.querySelectorAll('a');
const apiKey = 'AIzaSyC4_ToUySpg0UxJ0gzkNm6pFpHKBjAz2OE';
const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

link.forEach(e => {
    let link_href = e.getAttribute('href')

const requestData =   {
    client: {
      clientId:      "ID",
      clientVersion: "1.0.0"
    },
    threatInfo: {
      threatTypes:      ["MALWARE", "SOCIAL_ENGINEERING"],
      platformTypes:    ["WINDOWS"],
      threatEntryTypes: ["URL"],
      threatEntries: [
        {url: `${link_href}`}
      ]
    }
  }

  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(requestData)
  })
    .then(response => response.json()) // .json() a nie JSON.parse(), bo .json() wykorzystwyany jest z fetch
    .then(data => {
      console.log(data);
      if (data.matches && data.matches.length > 0) e.style.color = "red"
    })
    .catch(error => {
      console.error('Wystąpił błąd:', error);
    })
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.greeting === "hello")
    sendResponse({farewell: "goodbye"})
  }
)


// for now it only check links that are staticly added by developer throught html



// This is a pretty basic expression for testing domain names:
// @^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$@i

// Should match:

// domain.com
// www.domain.com
// http://domain.com
// https://domain.com