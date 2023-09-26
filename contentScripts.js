const link = document.querySelectorAll('a');
const apiKey = 'AIzaSyC4_ToUySpg0UxJ0gzkNm6pFpHKBjAz2OE';
const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
          console.log(request.message);
  }
);




// const witam = (request, sender, sendResponse) => {
//   if( request.message === "start" ) {
//       console.log(request.message)
//       console.log(request.fun)
//       return request.fun
//   }
// }

function api (color) {
  link.forEach(e => {
    let link_href = e.getAttribute('href')

    const requestData = {
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
        chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse) {
                  console.log(request.message);
                  if (data.matches && data.matches.length > 0) e.style.color = request.message;
                }
          );
      })
      .catch(error => {
        console.error('Wystąpił błąd:', error);
      })
  })
}

api();


async function conncet () {
  // const getColorz = await getColor();
  // await api(getColor);
  // console.log(getColorz);
}

conncet();




// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log('dziala1')
//     if(request.greeting === "hello"){
//       alert('siema')
//       console.log('dziala2')
//     }
//   }
// )


// for now it only check links that are staticly added by developer throught html



// This is a pretty basic expression for testing domain names:
// @^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$@i

// Should match:

// domain.com
// www.domain.com
// http://domain.com
// https://domain.com