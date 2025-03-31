// Firebase SDK Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBN7UF7BiP5tq820DREoC0SCupOgYxmFLU",
    authDomain: "pckart-73fe2.firebaseapp.com",
    projectId: "pckart-73fe2",
    storageBucket: "pckart-73fe2.appspot.com",
    messagingSenderId: "466224728088",
    appId: "1:466224728088:web:df5daa00ff9ed5af181b6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle Form Submission
document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get Form Data
    const productName = document.getElementById("productName").value;
    const productDescription = document.getElementById("productDescription").value;
    const originalPrice = parseFloat(document.getElementById("originalPrice").value);
    const discountPrice = parseFloat(document.getElementById("discountPrice").value);
    const imageUrl = document.getElementById("imageUrl").value;
    const category = document.getElementById("category").value;

    try {
        await addDoc(collection(db, "products"), {
            name: productName,
            description: productDescription,
            originalPrice: originalPrice,
            discountPrice: discountPrice,
            imageUrl: imageUrl,
            category: category
        });

        alert("Product added successfully!");
        document.getElementById("productForm").reset();
    } catch (error) {
        console.error("Error adding product:", error);
    }
});
