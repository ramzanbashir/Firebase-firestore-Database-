import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDI6La0kegJAMuYWHVElRJznRudOuMTTRQ",
  authDomain: "firbase-auth-6c489.firebaseapp.com",
  projectId: "firbase-auth-6c489",
  storageBucket: "firbase-auth-6c489.firebasestorage.app",
  messagingSenderId: "434961034312",
  appId: "1:434961034312:web:223e5c07c963da433e7c7d",
  measurementId: "G-VYS12DKLSB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


// Sign Up
if (document.querySelector("#sbtn")) {
  document.querySelector("#sbtn").addEventListener("click", function (e) {
    e.preventDefault();
    let name = document.querySelector("#signupName").value.trim();
    let email = document.querySelector("#signupEmail").value.trim();
    let password = document.querySelector("#signupPassword").value.trim();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Swal.fire("Success", "Signup successful!", "success").then(() => {
          window.location.href = "login.html";
        });
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  });
}

// Sign In
if (document.querySelector("#lbtn")) {
  document.querySelector("#lbtn").addEventListener("click", function (e) {
    e.preventDefault();
    let email = document.querySelector("#loginEmail").value.trim();
    let password = document.querySelector("#loginPassword").value.trim();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Swal.fire("Success", "Login successful!", "success").then(() => {
          window.location.href = "dashboard.html";
        });
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  });
}

try {
  const docRef = await addDoc(collection(db, "users"), {
    name: "John Doe",
    email: ""
    
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});


export { db, auth };