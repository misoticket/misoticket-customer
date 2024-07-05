import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//     apiKey: "AIzaSyCACr_gQLysOsxq6YYPhh2Jfbw-M4iV3y0",
//     authDomain: "misoticket-36fc7.firebaseapp.com",
//     projectId: "misoticket-36fc7",
//     storageBucket: "misoticket-36fc7.appspot.com",
//     messagingSenderId: "789449219895",
//     appId: "1:789449219895:web:cc4ae64f0965a961f484b2",
//     measurementId: "G-6CW035WS70"
// };

const firebaseConfig = {
    apiKey: "AIzaSyB0H92Iss_x73Kg5MsTszB6tO28bdRPa0U",
    authDomain: "misoticket-3d072.firebaseapp.com",
    projectId: "misoticket-3d072",
    storageBucket: "misoticket-3d072.appspot.com",
    messagingSenderId: "418213438875",
    appId: "1:418213438875:web:8581b3f9ee2a9050e2ed3e",
    measurementId: "G-B1LDCSL11Q",
};

export default function initFirebase() {
    return initializeApp(firebaseConfig);
}
