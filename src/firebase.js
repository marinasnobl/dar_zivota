import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCKt4D_pXFgi2nvjdkRhaJ6JmXpcEwVDUQ",
    authDomain: "dar-zivota.firebaseapp.com",
    projectId: "dar-zivota",
    storageBucket: "dar-zivota.appspot.com",
    messagingSenderId: "418979044813",
    appId: "1:418979044813:web:6a5305b71a4489d29f7884"
  };

  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { 
    firebaseApp,
    firebaseAuth,
    db
}