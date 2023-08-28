const getLink = () => {
    const link = document.querySelectorAll("a");
    link.forEach(e => {
        let link_href = e.getAttribute("href");
        if (link_href === "https://trojan.com") {
            e.style.color = 'red';
        }
    })
}

getLink();