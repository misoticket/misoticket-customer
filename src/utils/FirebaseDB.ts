import { getFirestore } from "firebase/firestore";
import initFirebase from "./FirebaseConfig";

const app = initFirebase();
const db = getFirestore(app);
export default db;