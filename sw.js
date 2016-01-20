importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('avinash').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/styles.css',
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
        'https://fonts.googleapis.com/css?family=Alegreya:400,700italic',
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
        'http://www.gravatar.com/avatar/de9b289df9e03630a6c186fb6bf54672?s=330'
      ]).then(function() {
        return self.skipWaiting();
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
