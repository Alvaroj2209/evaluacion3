import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { db } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBSfx2byvlR89KxkVo-dfKlQkzjzVTyt9E",
    authDomain: "evaluacion3-e3d95.firebaseapp.com",
    projectId: "evaluacion3-e3d95",
    storageBucket: "evaluacion3-e3d95.appspot.com",
    messagingSenderId: "402018933690",
    appId: "1:402018933690:web:05ca0c9034368c6eda9b83"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}