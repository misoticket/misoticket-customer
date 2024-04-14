import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCACr_gQLysOsxq6YYPhh2Jfbw-M4iV3y0",
    authDomain: "misoticket-36fc7.firebaseapp.com",
    projectId: "misoticket-36fc7",
    storageBucket: "misoticket-36fc7.appspot.com",
    messagingSenderId: "789449219895",
    appId: "1:789449219895:web:cc4ae64f0965a961f484b2",
    measurementId: "G-6CW035WS70"
};

export default function initFirebase() {
    return initializeApp(firebaseConfig);
}