"use strict";

let cache = 'studybuddy';
let filesToCache = [
    'index.html',
    'assets/*'
];

self.addEventListener('install', function (e) {
    console.log("install");
    e.waitUntil(
        caches.open(cache).then(function (cache) {
            return cache.addAll(filesToCache).then(() => console.log('Assets added to cache'))
                .catch(err => console.log("Error while fetching assets", err));
        })
    )
});

self.addEventListener("activate", event => {
    console.log("activated");
});

self.addEventListener("fetch", function(event){
    console.log("Fetch", event.request);
});

self.addEventListener("push", event => {
    const title = 'Testnachricht';
    const options = {
        body: event.data.text()
    };
    event.waitUntil(self.registration.showNotification(title,options));
});
