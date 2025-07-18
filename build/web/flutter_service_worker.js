'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "5ce172d5ef7f05f7313a4d2428aebbe2",
"assets/AssetManifest.bin.json": "d02885a4bf3a2dd194e90bfbcca75800",
"assets/AssetManifest.json": "a460f9e58fc920f179a7119e7b049106",
"assets/assets/4fc293cc": "ee20438da7b22f39533026396fb28136",
"assets/assets/8b7cb033": "a27dd3f01b86fd316276839e1a63c175",
"assets/assets/a394113": "c8ff4819905c18300c3dc435027d097f",
"assets/assets/b120ee7b": "ac923e16073ec11233be3ced148fb3ef",
"assets/assets/ballon2.png": "8958d8a4f3a88c0f4806bc13231d96ed",
"assets/assets/ballon4.png": "a27dd3f01b86fd316276839e1a63c175",
"assets/assets/congratulate.png": "ee20438da7b22f39533026396fb28136",
"assets/assets/empty.jpg": "ac923e16073ec11233be3ced148fb3ef",
"assets/assets/empty.svg": "7dee2930eae7487e6cf0404c8f6bbc6a",
"assets/assets/f5d63e42": "0681345ff5c2f6aa4a1f8f9b5c876cdd",
"assets/assets/f855a4a6": "8958d8a4f3a88c0f4806bc13231d96ed",
"assets/assets/fonts/Roboto-Regular.ttf": "df7b648ce5356ea1ebce435b3459fd60",
"assets/assets/image/EmailIcon.png": "5b09516a959173711c2767368f001639",
"assets/assets/image/EmailIcon.svg": "8f485bf93e3dd5c71eb8b48c48fd052f",
"assets/assets/image/EyeIcon.png": "568e9718d477b27ee6e0a5a1f87aa999",
"assets/assets/image/EyeIcon.svg": "b3f1f0423542c648e69ce5b130a5c416",
"assets/assets/image/lockIcon.png": "241723ebea3d05ef0a94a5b2d6da081d",
"assets/assets/image/lockIcon.svg": "1974cb6c806c2609db8f084eee29c616",
"assets/assets/logo.png": "0681345ff5c2f6aa4a1f8f9b5c876cdd",
"assets/assets/logo.svg": "59d42d55b3ee169dc72c0c3d27315409",
"assets/assets/pkkq.jpg": "c8ff4819905c18300c3dc435027d097f",
"assets/assets/topic/1547619d": "03bb1cf1ea2b93390843a5d5c4bccd5c",
"assets/assets/topic/18818215": "b0005d158cb3cc261e7160373e978701",
"assets/assets/topic/38bdbfbd": "7c7f58b4efd5a3881c78079a8e1546c4",
"assets/assets/topic/38cd2ec0": "2960c39d07a303ab1745845814f2be14",
"assets/assets/topic/55c50b77": "59ab0116a36f1518a71b47143747dbb5",
"assets/assets/topic/60c9ed00": "bb6294aa982282c1bb6da8e9ca9326b8",
"assets/assets/topic/66887954": "a3e39566d0c0c78ea0b2e67a7b5d10eb",
"assets/assets/topic/6ef91296": "7420bf1bffbee09394e3e959ecf181aa",
"assets/assets/topic/70ba3bae": "0b25273ef21956d7028fce5d72ffff6b",
"assets/assets/topic/7fd80757": "2326ba2cff025578eb8fe853efd670c8",
"assets/assets/topic/92bef0c8": "b00ed10e9e77950f10b481e07f3155b5",
"assets/assets/topic/9ea48097": "3f298a24cf436cca35623bb1ccc2e948",
"assets/assets/topic/a184f758": "043f4e85c1bdd374bea9aa6ee78cf14c",
"assets/assets/topic/a2980b8f": "c6d669c5e790dddccabe3d6926a53da0",
"assets/assets/topic/a36f6f70": "386453d48de9dc4c2684db08bbbe1613",
"assets/assets/topic/b0ec9009": "9f75a349dd6316dd7e94b29c11effbe0",
"assets/assets/topic/cb4ee23c": "665befe8947e0fedbc2f0b22e5c469f6",
"assets/assets/topic/cc6493ff": "cf53e9e83bb5f8acdf172529040e0023",
"assets/assets/topic/d8b04b7d": "872c7d6db2acfa618c26e4614090240f",
"assets/assets/topic/da75cd56": "4a6aaa841e786d1775a00e6d13375b36",
"assets/assets/topic/e946a23b": "2a651abeab894269233a2670ac107355",
"assets/assets/topic/fe86f7cd": "5032f21624ceb0483b816ce90e4a9109",
"assets/assets/topic/image1.jpg": "043f4e85c1bdd374bea9aa6ee78cf14c",
"assets/assets/topic/image10.jpg": "3f298a24cf436cca35623bb1ccc2e948",
"assets/assets/topic/image11.jpg": "b00ed10e9e77950f10b481e07f3155b5",
"assets/assets/topic/image12.jpg": "665befe8947e0fedbc2f0b22e5c469f6",
"assets/assets/topic/image13.jpg": "2960c39d07a303ab1745845814f2be14",
"assets/assets/topic/image14.jpg": "59ab0116a36f1518a71b47143747dbb5",
"assets/assets/topic/image15.jpg": "c6d669c5e790dddccabe3d6926a53da0",
"assets/assets/topic/image16.jpg": "a3e39566d0c0c78ea0b2e67a7b5d10eb",
"assets/assets/topic/image17.jpg": "7420bf1bffbee09394e3e959ecf181aa",
"assets/assets/topic/image18.jpg": "2a651abeab894269233a2670ac107355",
"assets/assets/topic/image19.jpg": "0b25273ef21956d7028fce5d72ffff6b",
"assets/assets/topic/image2.jpg": "03bb1cf1ea2b93390843a5d5c4bccd5c",
"assets/assets/topic/image20.jpg": "5032f21624ceb0483b816ce90e4a9109",
"assets/assets/topic/image21.jpg": "872c7d6db2acfa618c26e4614090240f",
"assets/assets/topic/image22.jpg": "2326ba2cff025578eb8fe853efd670c8",
"assets/assets/topic/image3.jpg": "7c7f58b4efd5a3881c78079a8e1546c4",
"assets/assets/topic/image4.jpg": "4a6aaa841e786d1775a00e6d13375b36",
"assets/assets/topic/image5.jpg": "9f75a349dd6316dd7e94b29c11effbe0",
"assets/assets/topic/image6.jpg": "386453d48de9dc4c2684db08bbbe1613",
"assets/assets/topic/image7.jpg": "cf53e9e83bb5f8acdf172529040e0023",
"assets/assets/topic/image8.jpg": "bb6294aa982282c1bb6da8e9ca9326b8",
"assets/assets/topic/image9.jpg": "b0005d158cb3cc261e7160373e978701",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"assets/fonts/MaterialIcons-Regular.otf": "26c4a7993c02592acce62fd32bdae906",
"assets/NOTICES": "d9a37ad4c9a46bbace1ef1b248afd4f3",
"assets/packages/awesome_dialog/assets/flare/error.flr": "e3b124665e57682dab45f4ee8a16b3c9",
"assets/packages/awesome_dialog/assets/flare/info.flr": "bc654ba9a96055d7309f0922746fe7a7",
"assets/packages/awesome_dialog/assets/flare/info2.flr": "21af33cb65751b76639d98e106835cfb",
"assets/packages/awesome_dialog/assets/flare/info_without_loop.flr": "cf106e19d7dee9846bbc1ac29296a43f",
"assets/packages/awesome_dialog/assets/flare/question.flr": "1c31ec57688a19de5899338f898290f0",
"assets/packages/awesome_dialog/assets/flare/succes.flr": "ebae20460b624d738bb48269fb492edf",
"assets/packages/awesome_dialog/assets/flare/succes_without_loop.flr": "3d8b3b3552370677bf3fb55d0d56a152",
"assets/packages/awesome_dialog/assets/flare/warning.flr": "68898234dacef62093ae95ff4772509b",
"assets/packages/awesome_dialog/assets/flare/warning_without_loop.flr": "c84f528c7e7afe91a929898988012291",
"assets/packages/awesome_dialog/assets/rive/error.riv": "e74e21f8b53de4b541dd037c667027c1",
"assets/packages/awesome_dialog/assets/rive/info.riv": "2a425920b11404228f613bc51b30b2fb",
"assets/packages/awesome_dialog/assets/rive/info_reverse.riv": "c6e814d66c0e469f1574a2f171a13a76",
"assets/packages/awesome_dialog/assets/rive/question.riv": "00f02da4d08c2960079d4cd8211c930c",
"assets/packages/awesome_dialog/assets/rive/success.riv": "73618ab4166b406e130c2042dc595f42",
"assets/packages/awesome_dialog/assets/rive/warning.riv": "0becf971559a68f9a74c8f0c6e0f8335",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "4769f3245a24c1fa9965f113ea85ec2a",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "3ca5dc7621921b901d513cc1ce23788c",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "a2eb084b706ab40c90610942d98886ec",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "86e461cf471c1640fd2b461ece4589df",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/chromium/canvaskit.js": "34beda9f39eb7d992d46125ca868dc61",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"flutter_bootstrap.js": "babac9e7a834718a68a90171d11fc761",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "a77bc22fe28d710992537e349408668b",
"/": "a77bc22fe28d710992537e349408668b",
"main.dart.js": "8e3ee4bf610b576937e79c747584345a",
"manifest.json": "e596a81c8cfad629957833453c4f964d",
"version.json": "184c0e1f529acb6ec47763234d0b4273"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
