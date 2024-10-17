import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from '../src/router'
import { initializeApp } from "firebase/app";
import './api'

const firebaseConfig = {
    apiKey: "AIzaSyBAMCY0J8IEBVOLKY_ylQspir1bNPB-Axk",
    authDomain: "commentary-work.firebaseapp.com",
    projectId: "commentary-work",
    storageBucket: "commentary-work.appspot.com",
    messagingSenderId: "323303385534",
    appId: "1:323303385534:web:b02fa3de1bde543c80b1ef"
};

initializeApp(firebaseConfig);

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
