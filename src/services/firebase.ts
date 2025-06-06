import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCT96qJHtVzi1lwjYqAYq6kOubgrFSAwXw",
  authDomain: "waag-61450.firebaseapp.com",
  projectId: "waag-61450",
  storageBucket: "waag-61450.appspot.com", // <-- fixed here
  messagingSenderId: "536190517067",
  appId: "1:536190517067:web:565e107bc20edb3b2732ce"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
