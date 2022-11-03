import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBX-FPGba8n4lhgzxAYsUQ-txrXaDA5ACI",
  authDomain: "evcharge-firebase.firebaseapp.com",
  projectId: "evcharge-firebase",
  storageBucket: "evcharge-firebase.appspot.com",
  messagingSenderId: "168097413066",
  appId: "1:168097413066:web:ba9a178747002a64504133"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app