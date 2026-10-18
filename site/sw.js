/* Build-time substitutions are generated from the complete static release. */
const PRECACHE = ["assets/index-CYtbLcL2.css","assets/index-npLBGz8G.js","favicon.svg","icons/apple-touch-icon.png","icons/icon-192.png","icons/icon-512.png","icons/maskable-512.png","index.html","manifest.webmanifest","question-bank-template.json"];
const VERSION = "611ab52030f1e92af6d8";
const SCOPE = self.registration.scope;
const PREFIX = `home-atlas:${encodeURIComponent(SCOPE)}:`;
const CACHE = PREFIX + VERSION;
const urls = PRECACHE.map((name) => new URL(name, SCOPE).href);

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE);
        // Bypass HTTP cache so a CDN refresh cannot silently reuse an older shell.
        await cache.addAll(
          urls.map((url) => new Request(url, { cache: "reload" })),
        );
      } catch (error) {
        await caches.delete(CACHE);
        throw error;
      }
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const owned = (await caches.keys()).filter((name) =>
        name.startsWith(PREFIX),
      );
      const previous = owned.filter((name) => name !== CACHE).slice(-1);
      await Promise.all(
        owned
          .filter((name) => name !== CACHE && !previous.includes(name))
          .map((name) => caches.delete(name)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "APPLY_UPDATE") event.waitUntil(self.skipWaiting());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || !url.href.startsWith(SCOPE)) return;
  const name = url.pathname.slice(new URL(SCOPE).pathname.length);
  if (name === "release.json" || name === "sw.js") return;
  event.respondWith(
    (async () => {
      const current = await caches.open(CACHE);
      const key =
        request.mode === "navigate"
          ? new URL("index.html", SCOPE).href
          : request;
      // Static public files have identical bytes even when a server varies on
      // Origin and a module request carries different headers than its preload.
      const cached = await current.match(key, {
        ignoreSearch: true,
        ignoreVary: true,
      });
      if (cached) return cached;
      // A still-open older tab may request one of the previous build's hashed assets.
      for (const old of (await caches.keys())
        .filter((key) => key.startsWith(PREFIX) && key !== CACHE)
        .reverse()) {
        const response = await (
          await caches.open(old)
        ).match(request, { ignoreSearch: true, ignoreVary: true });
        if (response) return response;
      }
      return fetch(request);
    })(),
  );
});
