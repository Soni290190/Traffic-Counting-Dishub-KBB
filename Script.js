const firebaseConfig = {
    // Konfigurasi Firebase Anda di sini
};

firebase.initializeApp(firebaseConfig);

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Autentikasi pengguna
    firebase.auth().signInWithEmailAndPassword(username, password)
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
    const userRole = // ambil dari Firestore
    if (userRole === 'admin') {
        document.getElementById('admin-section').style.display = 'block';
        document.getElementById('client-section').style.display = 'none';
    } else {
        document.getElementById('client-section').style.display = 'block';
        document.getElementById('admin-section').style.display = 'none';
    }
}
