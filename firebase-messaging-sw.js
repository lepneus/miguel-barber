/* Firebase Cloud Messaging service worker - Miguel Barber */
importScripts("https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDkaDl6pxcPVIwMT35yr0tKsvBS4loOatI",
  authDomain: "miguel-barber-bf59f.firebaseapp.com",
  projectId: "miguel-barber-bf59f",
  storageBucket: "miguel-barber-bf59f.firebasestorage.app",
  messagingSenderId: "780950863075",
  appId: "1:780950863075:web:563e16e29b02f207c099d6",
  measurementId: "G-WL7FGT08LK"
});

firebase.messaging();

self.addEventListener("notificationclick", event => {
  event.notification.close();

  const target = new URL("admin.html", self.registration.scope).href;

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true
      })
      .then(list => {
        for (const client of list) {
          if (
            client.url.startsWith(self.registration.scope) &&
            "focus" in client
          ) {
            client.navigate(target);
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(target);
        }
      })
  );
});
