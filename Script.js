// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA86blD359WSKl8bsehsOV_NVBmEMAbTy0",
    authDomain: "traffic-counting-dishub-kbb.firebaseapp.com",
    projectId: "traffic-counting-dishub-kbb",
    storageBucket: "traffic-counting-dishub-kbb.appspot.com",
    messagingSenderId: "846376752027",
    appId: "1:846376752027:web:57fec68622208801fe473e",
    measurementId: "G-4G14GDP80P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Autentikasi pengguna
    signInWithEmailAndPassword(auth, username, password)
        .then(userCredential => {
            const user = userCredential.user;
            // Cek peran pengguna
            checkUserRole(user);
        })
        .catch(error => {
            console.error("Error logging in: ", error);
        });
}

function checkUserRole(user) {
    // Misalnya, ambil data peran dari Firestore
    const userRef = doc(db, "users", user.uid); // Ganti "users" dengan koleksi yang sesuai
    getDoc(userRef).then(docSnap => {
        if (docSnap.exists()) {
            const userRole = docSnap.data().role; // Pastikan ada field "role" di Firestore
            if (userRole === 'admin') {
                document.getElementById('admin-section').style.display = 'block';
                document.getElementById('client-section').style.display = 'none';
            } else {
                document.getElementById('client-section').style.display = 'block';
                document.getElementById('admin-section').style.display = 'none';
            }
        } else {
            console.log("No such document!");
        }
    }).catch(error => {
        console.error("Error getting document:", error);
    });
}
