
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 
"https://www.gstatic.com/firebasejs/11.7.0/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDw8GUkXaoh72p0c4volq3n0Ld8LgvULxw",
    authDomain: "fir-authentication-622ee.firebaseapp.com",
    projectId: "fir-authentication-622ee",
    storageBucket: "fir-authentication-622ee.firebasestorage.app",
    messagingSenderId: "573976493127",
    appId: "1:573976493127:web:56ab468f886b925bee0562"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

const userSignIn = async () => {
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log(user);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}

const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have been signed out!")
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        alert("You are authenticated with Google");
        console.log(user);
    
        
        signInButton.style.display = "none";
        signOutButton.style.display = "inline-block";
    
       
        const displayName = user.displayName || "";
        const email = user.email || "";
    
       
        const [firstName = "", lastName = ""] = displayName.split(" ");
    
        
        document.getElementById("firstName").value = firstName;
        document.getElementById("lastName").value = lastName;
        document.getElementById("exampleInputEmail1").value = email;
    }
})
 
signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);