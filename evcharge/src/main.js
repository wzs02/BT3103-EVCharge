import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/styles' // Global CSS has to be imported
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import router from './router'

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

const app = createApp(App).use(store)

const vuetify = createVuetify() // Replaces new Vuetify()

app.use(router)

app.use(vuetify)

app.mount('#app')
