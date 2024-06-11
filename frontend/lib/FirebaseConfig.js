import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAozQMOEoepa_BeeYTcByCalcLTwHjPBPo",
  authDomain: "track-wallet-496c8.firebaseapp.com",
  projectId: "track-wallet-496c8",
  storageBucket: "track-wallet-496c8.appspot.com",
  messagingSenderId: "37418860531",
  appId: "1:37418860531:web:0dd1a46eba0d43918e5c86",
  measurementId: "G-04RM77MCBN"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db};
