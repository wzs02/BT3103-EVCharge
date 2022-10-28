import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/styles' // Global CSS has to be imported
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import router from './router'
import VueGoogleMaps from '@fawmi/vue-google-maps'

// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
// import { initializeApp } from "firebase/app";

import store from './store'

firebase.initializeApp({
    apiKey: "AIzaSyBX-FPGba8n4lhgzxAYsUQ-txrXaDA5ACI",
    authDomain: "evcharge-firebase.firebaseapp.com",
    projectId: "evcharge-firebase",
    storageBucket: "evcharge-firebase.appspot.com",
    messagingSenderId: "168097413066",
    appId: "1:168097413066:web:ba9a178747002a64504133"
  });

import { onAuthStateChanged, auth } from 'firebase/auth'

const user = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
          unsubscribe();
          resolve(userFirebase);
      }, reject);
  })
};

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !await user()){
    next('signin');
  }else{
    next();
  }
});

const app = createApp(App).use(store)

const vuetify = createVuetify() // Replaces new Vuetify()

app.use(router)

app.use(vuetify)

app.use(VueGoogleMaps, {
  load: {
      key: 'AIzaSyA5HqCAe1kXVPO5mTa4QGwl243GUWxMXDE',
      libraries: "places"
  },
})

app.mount('#app')
