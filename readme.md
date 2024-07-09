# [safeLink]()

### Welcome 👨‍💻

thanks for checking out my first chrome extension!

https://github.com/xmavv/safeLink/assets/129995423/3e17bc70-d999-42a4-8f7a-af8173a534b3

## Overview

### The main subject

main subject was to develop my first chrome extension, which would be able to catch any link on the page, and then check if it's safe throught google api, eventually set color that user declare for safeLink, and unSafeLink

## My process

### Built with

- HTML, CSS, JS
- Safe browsing google api

### What I learned

- sending HTTP POST request, and validating it

- observer object in web API, app is reacting to DOM changes so when extension is changing colors of links (which is DOM manipulation), we are just disconnecting observer and then after colors are set, we connect observer agin

```
Observer.disconnect();
      //we really do not want to check if colors on your webpage has changed so we dissconnect Observer
      links.forEach((link) => {
        if (uniqeAffectedLinks.includes(link.href)) {
          link.style.color = colorUnSafe;
          link.style.border = `1px solid ${colorUnSafe}`;
          link.style.backgroundColor = "black";
          malwareLinks.push(link);
        } else {
          link.style.color = colorSafe;
          safeLinks.push(link);
        }
      });
      Observer.observe(document.body, config);
      //and then we call him again to work, like nothing happend
```

### What may be added

- add some database or data comming from api to expand google database (which isn't that big ;D) https://urlhaus.abuse.ch/
- even better emphasis of danger link in css
- searching not only for hrefs but other normal text that is written by someone
- api requests may be on the background.js side

## How to use

just clone code to new folder and then add it into Chrome Extension in dev mode

## Author

- my github profile - [xmavv](https://github.com/xmavv)
- my behance profile - [mav](https://www.behance.net/mavrgb)
