import { FirebaseApp, getApp, getApps } from "firebase/app";
import { Firestore, initializeFirestore } from "firebase/firestore";
import initFirebase from "./FirebaseConfig";

const app: FirebaseApp = !getApps().length ? initFirebase() : getApp();
const db: Firestore = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

export default db;
