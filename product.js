// Firebase SDK Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

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

let allProducts = []; // Store products globally for filtering

// Fetch Products from Firestore
async function fetchProducts() {
    try {
        const productGrid = document.getElementById("productGrid");
        if (!productGrid) {
            console.error("Product grid element not found");
            return;
        }

        productGrid.innerHTML = "<p>Loading products...</p>";
        const querySnapshot = await getDocs(collection(db, "products"));
        productGrid.innerHTML = "";

        allProducts = []; // Reset product list

        querySnapshot.forEach(doc => {
            const product = doc.data();
            product.id = doc.id; // Store document ID
            allProducts.push(product);
        });

        displayProducts(allProducts); // Show all products initially
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Display Products Based on Filters
function displayProducts(products) {
    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = ""; // Clear existing products

    if (products.length === 0) {
        productGrid.innerHTML = "<p>No products found.</p>";
        return;
    }

    products.forEach(product => {
        const imageUrl = product.imageUrl || "https://via.placeholder.com/150";
        const originalPrice = product.originalPrice ? `₹${product.originalPrice}` : "Not Available";
        const discountPrice = product.discountPrice ? `₹${product.discountPrice}` : "Not Available";

        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${imageUrl}" onerror="this.src='https://via.placeholder.com/150'" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Original Price: ${originalPrice}</p>
            <p>Discounted Price: ${discountPrice}</p>
            <button class="add-to-cart" data-id="${product.id}">Add To Cart</button>
        `;
        productGrid.appendChild(productCard);
    });

    // Add event listeners for "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const productId = event.target.getAttribute("data-id");
            addToCart(productId);
        });
    });
}

// Add to Cart Function
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if already in cart
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}

// Apply Filters
function applyFilters() {
    const searchQuery = document.getElementById("searchBox").value.toLowerCase();
    const categoryFilter = document.getElementById("categoryFilter").value;
    const priceFilter = document.getElementById("priceFilter").value;

    let filteredProducts = allProducts.filter(product => {
        let matchesSearch = product.name.toLowerCase().includes(searchQuery);
        let matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
        let matchesPrice = true;

        if (priceFilter === "low") matchesPrice = product.discountPrice < 10000;
        else if (priceFilter === "mid") matchesPrice = product.discountPrice >= 10000 && product.discountPrice <= 50000;
        else if (priceFilter === "high") matchesPrice = product.discountPrice > 50000;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    displayProducts(filteredProducts);
}

// Event Listeners
document.getElementById("searchBox").addEventListener("input", applyFilters);
document.getElementById("categoryFilter").addEventListener("change", applyFilters);
document.getElementById("priceFilter").addEventListener("change", applyFilters);

// Fetch products on page load
document.addEventListener("DOMContentLoaded", fetchProducts);
