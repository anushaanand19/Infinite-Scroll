const api_key = '1Dn-8u1ChH7JEErygr9OK0GM9O2umVVFlX0GrB0lbwQ';
//For the first time, load 5 images 
let count = 3;
const apiURL = `https://api.unsplash.com/photos/random?client_id=${api_key}&count=${count}`;
const imageElement = document.getElementById('image-element');
let photos = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
const loaderElement = document.getElementById('loader');

//Load images to the count
function imgLoader() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        imagesLoaded = 0;
        loaderElement.hidden = true;
        //After loading the initial 5 images, increase the subsequent images to be loaded
        count = 10;
    }
}

//Helper function
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    totalImages = photos.length;
    photos.forEach(photo => {
        let item = document.createElement('a');
        setAttributes(item, { href: photo.links.html, target: '_blank'})
        let img = document.createElement('img');
        setAttributes(img, { src: photo.urls.regular, alt: photo.alt_description, title: photo.alt_description });
        item.appendChild(img);
        imageElement.appendChild(item);
        img.addEventListener('load', imgLoader);
        });
}

async function getPhotos() {
    try{
        const response = await fetch(apiURL);
        photos = await response.json();
        displayPhotos();

    }
    catch (err) {
        console.log(err);
    }
}

// Check if the scroll reaches end of page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos();
        ready = false;
    }
})

// On load 

getPhotos();