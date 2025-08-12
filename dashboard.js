// // dashboard.js
// import { db, auth } from "./firebase.js";

// // Import Firestore functions separately
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
//   updateDoc
// } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// // Import Auth functions
// import {
//   signOut,
//   onAuthStateChanged
// } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// // now you can safely use `addDoc`, `getDocs`, etc. in this file


// const productForm = document.getElementById("productForm");
// const productList = document.getElementById("productList");
// const logoutBtn = document.getElementById("logoutBtn");

// let editingDocId = null;

// // Auth Guard: redirect if not logged in
// onAuthStateChanged(auth, (user) => {
//   if (!user) {
//     Swal.fire("Unauthorized", "Please login first.", "warning").then(() => {
//       window.location.href = "login.html";
//     });
//   } else {
//     loadProducts(); // Load only if logged in
//   }
// });

// // Logout
// logoutBtn.addEventListener("click", () => {
//   signOut(auth)
//     .then(() => {
//       Swal.fire("Logged Out", "You have been logged out.", "success").then(() => {
//         window.location.href = "login.html";
//       });
//     })
//     .catch((error) => {
//       Swal.fire("Error", error.message, "error");
//     });
// });

// // Add or Update Product
// productForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const image = document.getElementById("productImage").value;
//   const desc = document.getElementById("productDesc").value;
//   const price = document.getElementById("productPrice").value;

//   if (editingDocId) {
//     // Update
//     try {
//       await updateDoc(doc(db, "products", editingDocId), {
//         image,
//         desc,
//         price
//       });
//       Swal.fire("Updated", "Product updated!", "success");
//     } catch (err) {
//       Swal.fire("Error", err.message, "error");
//     }
//     editingDocId = null;
//   } else {
//     // Add
//     try {
//       await addDoc(collection(db, "products"), {
//         image,
//         desc,
//         price,
//         createdAt: new Date()
//       });
//       Swal.fire("Added", "Product added!", "success");
//     } catch (err) {
//       Swal.fire("Error", err.message, "error");
//     }
//   }

//   productForm.reset();
//   document.querySelector("#productModal .btn-close").click();
//   loadProducts();
// });

// // Load Products
// async function loadProducts() {
//   productList.innerHTML = "";
//   const snapshot = await getDocs(collection(db, "products"));

//   snapshot.forEach((docSnap) => {
//     const product = docSnap.data();
//     const card = document.createElement("div");
//     card.className = "col-md-4 mb-3";
//     card.innerHTML = `
//       <div class="card shadow-sm">
//         <img src="${product.image}" class="card-img-top" height="200" style="object-fit:cover">
//         <div class="card-body">
//           <p class="card-text">${product.desc}</p>
//           <h5 class="card-title">PKR. ${product.price}</h5>
//           <div class="d-flex gap-2">
//             <button class="btn btn-sm btn-warning edit-btn" data-id="${docSnap.id}">Edit</button>
//             <button class="btn btn-sm btn-danger delete-btn" data-id="${docSnap.id}">Delete</button>
//           </div>
//         </div>
//       </div>
//     `;
//     productList.appendChild(card);
//   });

//   document.querySelectorAll(".edit-btn").forEach((btn) =>
//     btn.addEventListener("click", () => editProduct(btn.dataset.id))
//   );

//   document.querySelectorAll(".delete-btn").forEach((btn) =>
//     btn.addEventListener("click", () => deleteProduct(btn.dataset.id))
//   );
// }

// // Edit Product
// async function editProduct(id) {
//   const snapshot = await getDocs(collection(db, "products"));
//   snapshot.forEach((docSnap) => {
//     if (docSnap.id === id) {
//       const data = docSnap.data();
//       document.getElementById("productImage").value = data.image;
//       document.getElementById("productDesc").value = data.desc;
//       document.getElementById("productPrice").value = data.price;
//       editingDocId = id;
//       new bootstrap.Modal(document.getElementById("productModal")).show();
//     }
//   });
// }

// // Delete Product
// async function deleteProduct(id) {
//   try {
//     await deleteDoc(doc(db, "products", id));
//     Swal.fire("Deleted", "Product removed", "success");
//     loadProducts();
//   } catch (err) {
//     Swal.fire("Error", err.message, "error");
//   }
// }



// dashboard.js
import { db, auth } from "./firebase.js";

// Import Firestore functions separately
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Import Auth functions
import {
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const logoutBtn = document.getElementById("logoutBtn");

let editingDocId = null;

// ✅ Auth Guard: redirect if not logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    Swal.fire("Unauthorized", "Please login first.", "warning").then(() => {
      window.location.href = "login.html";
    });
  } else {
    loadProducts(); // Load only if logged in
  }
});

// ✅ Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      Swal.fire("Logged Out", "You have been logged out.", "success").then(() => {
        window.location.href = "login.html";
      });
    })
    .catch((error) => {
      Swal.fire("Error", error.message, "error");
    });
});

// ✅ Add or Update Product
productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const image = document.getElementById("productImage").value;
  const desc = document.getElementById("productDesc").value;
  const price = document.getElementById("productPrice").value;

  if (!auth.currentUser) {
    Swal.fire("Error", "User not logged in", "error");
    return;
  }

  if (editingDocId) {
    // 🔹 Update
    try {
      await updateDoc(doc(db, "products", editingDocId), {
        image,
        desc,
        price
      });
      Swal.fire("Updated", "Product updated!", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
    editingDocId = null;
  } else {
    // 🔹 Add with UID
    try {
      await addDoc(collection(db, "products"), {
        uid: auth.currentUser.uid, // store logged-in user's ID
        image,
        desc,
        price,
        createdAt: new Date()
      });
      Swal.fire("Added", "Product added!", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  }

  productForm.reset();
  document.querySelector("#productModal .btn-close").click();
  loadProducts();
});

// ✅ Load Products for Logged-in User
async function loadProducts() {
  productList.innerHTML = "";

  if (!auth.currentUser) return;

  // 🔹 Only fetch products of current user
  const q = query(
    collection(db, "products"),
    where("uid", "==", auth.currentUser.uid)
  );

  const snapshot = await getDocs(q);

  snapshot.forEach((docSnap) => {
    const product = docSnap.data();
    const card = document.createElement("div");
    card.className = "col-md-4 mb-3";
    card.innerHTML = `
      <div class="card shadow-sm product-card">
        <img src="${product.image}" class="card-img-top" height="200" style="object-fit:cover">
        <div class="card-body">
          <p class="card-text">${product.desc}</p>
          <h5 class="card-title">PKR. ${product.price}</h5>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-warning edit-btn" data-id="${docSnap.id}">Edit</button>
            <button class="btn btn-sm btn-danger delete-btn" data-id="${docSnap.id}">Delete</button>
          </div>
        </div>
      </div>
    `;
    productList.appendChild(card);
  });

  // 🔹 Add click events for edit/delete
  document.querySelectorAll(".edit-btn").forEach((btn) =>
    btn.addEventListener("click", () => editProduct(btn.dataset.id))
  );

  document.querySelectorAll(".delete-btn").forEach((btn) =>
    btn.addEventListener("click", () => deleteProduct(btn.dataset.id))
  );
}

// ✅ Edit Product
async function editProduct(id) {
  const snapshot = await getDocs(collection(db, "products"));
  snapshot.forEach((docSnap) => {
    if (docSnap.id === id) {
      const data = docSnap.data();
      document.getElementById("productImage").value = data.image;
      document.getElementById("productDesc").value = data.desc;
      document.getElementById("productPrice").value = data.price;
      editingDocId = id;
      new bootstrap.Modal(document.getElementById("productModal")).show();
    }
  });
}

// ✅ Delete Product
async function deleteProduct(id) {
  try {
    await deleteDoc(doc(db, "products", id));
    Swal.fire("Deleted", "Product removed", "success");
    loadProducts();
  } catch (err) {
    Swal.fire("Error", err.message, "error");
  }
}
