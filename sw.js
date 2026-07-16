// 保存する場所の名前（バージョン管理用）
const CACHE_NAME = 'bosai-app-v1';

// オフラインでも見れるように保存しておきたいファイルのリスト
const urlsToCache = [
  './',
  './index.html',
  './data.js',
  './manifest.json',
  './icon.png',
  './icon-512.png'
];

// ① アプリがインストールされた時、指定したファイルをスマホに保存する
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// ② ユーザーがページを見ようとした時の処理
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 保存されたものがあればそれを返す（圏外でも表示される！）
        if (response) {
          return response;
        }
        // なければ通常通りインターネットから取得する
        return fetch(event.request);
      })
  );
});