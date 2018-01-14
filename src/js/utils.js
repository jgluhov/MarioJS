export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

export function loadJSON(url) {
    const options = {
       method: 'GET',
       headers: { "Content-Type": "application/json" }
     };

    return fetch(url, options)
        .then(res => res.json());
}
