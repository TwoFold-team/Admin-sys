self.addEventListener("install", e=>self.skipWaiting());
self.addEventListener("activate", e=>e.waitUntil(self.clients.claim()));
self.addEventListener("notificationclick", e=>{
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:"window"}).then(list=>{
    for(const c of list){ if("focus" in c) return c.focus(); }
    if(self.clients.openWindow) return self.clients.openWindow("./admin.html");
  }));
});
self.addEventListener("message", e=>{
  const d=e.data||{};
  if(d.type==="notify"){
    self.registration.showNotification(d.title||"GymHub", {
      body:d.body||"",
      tag:d.tag||"gymhub",
      icon:"./favicon.svg"
    });
  }
});
