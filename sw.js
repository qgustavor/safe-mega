'use strict';

// based in https://gist.github.com/adactio/4d588bb8a65fa11a3ea3
// Licensed under a CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
// http://creativecommons.org/publicdomain/zero/1.0/

(function() {

  // A cache for core files like CSS and JavaScript
  var staticCacheName = 'static';
  // A cache for pages to store for offline
  var pagesCacheName = 'pages';
  // Update 'version' if you need to refresh the caches
  var version = 'v1::';

  // Store core files in a cache (including a page to display when offline)
  var updateStaticCache = function() {
    return caches.open(version + staticCacheName)
      .then(function (cache) {
        return cache.add('/');
      });
  };

  // Put an item in a specified cache
  var stashInCache = function (cacheName, request, response) {
    caches.open(cacheName)
      .then(function (cache) {
        cache.put(request, response);
      });
  };

  // Remove caches whose name is no longer valid
  var clearOldCaches = function() {
    return caches.keys()
      .then(function (keys) {
        return Promise.all(keys
          .filter(function (key) {
            return key.indexOf(version) !== 0;
          })
          .map(function (key) {
            return caches.delete(key);
          })
        );
      });
  };

  self.addEventListener('install', function (event) {
    event.waitUntil(updateStaticCache()
      .then(function () {
        return self.skipWaiting();
      })
    );
  });

  self.addEventListener('activate', function (event) {
    event.waitUntil(clearOldCaches()
      .then(function () {
        return self.clients.claim();
      })
    );
  });

  self.addEventListener('fetch', function (event) {
    var request = event.request;
    // For non-GET requests, try the network first, fall back to the offline page
    if (request.method !== 'GET') {
      event.respondWith(
        fetch(request)
          .catch(function () {
            return new Response(new Blob(['offline'], {type: 'text/plain'}));
          })
      );
      return;
    }

    // For HTML requests, try the network first, fall back to the cache, finally the offline page
    if (request.headers.get('Accept').indexOf('text/html') !== -1) {
      event.respondWith(
        fetch(request)
          .then(function (response) {
            // NETWORK
            // Stash a copy of this page in the pages cache
            var copy = response.clone();
            var cacheName = version + pagesCacheName;
            stashInCache(cacheName, request, copy);
            return response;
          })
          .catch(function () {
            // CACHE or FALLBACK
            return caches.match(request)
              .then(function (response) {
                return response || Response.redirect(request.url.replace('https://safeme.ga/', 'https://qgustavor.github.io/safe-mega/'));
              });
          })
      );
      return;
    }

    // For non-HTML requests, look in the cache first, fall back to the network
    event.respondWith(
      caches.match(request)
        .then(function (response) {
          return response || fetch(request);
        })
    );
  });
})();