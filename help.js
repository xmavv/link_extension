// const isSafe = (e) => {
//     if (e.substring(0, 24) == "https://www.youtube.com/") {
//         return true;
//     } else {
//         return false;
//     }
// };

// if (isSafe(link_href)) {
//     link.style.color = "green";
// } else {
//     link.style.color = "red";
// }

// const apiKey = 'AIzaSyC4_ToUySpg0UxJ0gzkNm6pFpHKBjAz2OE';
// console.log(link_href);
// const urlToCheck = link_href;

// const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

// const requestData = {
//   client: {
//     clientId: 'ID',
//     clientVersion: '1.0.0'
//   },
//   threatInfo: {
//     threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE'],
//     platformTypes: ['ANY_PLATFORM'],
//     threatEntryTypes: ['URL'],
//     threatEntries: [{ url: urlToCheck }]
//   }
// };

// fetch(apiUrl, {
//   method: 'POST',
//   body: JSON.stringify(requestData)
// })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Odpowiedź z API Safe Browsing:', data);
//     if (data.matches && data.matches.length > 0) {
//         console.log('siema');
//     } else {
//         console.log('elo');
//     }
//   })
//   .catch(error => {
//     console.error('Wystąpił błąd:', error);
//   });