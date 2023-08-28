// const link = document.querySelectorAll('a');

// const apiKey = 'AIzaSyC4_ToUySpg0UxJ0gzkNm6pFpHKBjAz2OE';
// const urlToCheck = "https://www.trojan.com";

// const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

// link.forEach(e => {
//     let link_href = e.getAttribute('href')

// const requestData =   {
//     client: {
//       clientId:      "yourcompanyname",
//       clientVersion: "1.5.2"
//     },
//     threatInfo: {
//       threatTypes:      ["MALWARE", "SOCIAL_ENGINEERING"],
//       platformTypes:    ["WINDOWS"],
//       threatEntryTypes: ["URL"],
//       threatEntries: [
//         {url: `${link_href}`}
//       ]
//     }
//   }

//   fetch(apiUrl, {
//     method: 'POST',
//     body: JSON.stringify(requestData)
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       if (data.matches && data.matches.length > 0) {
//           console.log('Strona zawiera potencjalne zagrożenia:');
//           e.style.color = "black"
        
//           for (const match of data.matches) {
//             console.log('Typ zagrożenia:', match.threatType);
//             console.log('Platforma zagrożenia:', match.platformType);
//             console.log('Źródło zagrożenia:', match.threatEntryType);
//             console.log('Zagrożony URL:', match.threat.url);
//           }
        
//         } else {
//           console.log('Strona jest bezpieczna.');
//         }
//     })
//     .catch(error => {
//       console.error('Wystąpił błąd:', error);
//     })
// })