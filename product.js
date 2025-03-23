document.addEventListener("DOMContentLoaded", function () {
    let allProducts = [];

    // Fetch products from the database
    function fetchProducts() {
        fetch("fetch_products.php")
            .then(response => response.json())
            .then(products => {
                allProducts = products;
                displayProducts(products);
            })
            .catch(error => console.error("Error fetching products:", error));
    }

    // Display products in the grid
    function displayProducts(products) {
        const productGrid = document.getElementById("productGrid");
        productGrid.innerHTML = "";

        if (products.length === 0) {
            productGrid.innerHTML = "<p>No products found.</p>";
            return;
        }

        products.forEach(product => {
            const discountPrice = (product.price * 0.8).toFixed(2);

            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p><span class="original-price">₹${product.price}</span> 
                <span class="discount-price">₹${discountPrice}</span></p>
                <button class="view-details" data-id="${product.id}">View Details</button>
            `;

            productGrid.appendChild(productCard);
        });
    }

    // Event delegation for "View Details"
    document.getElementById("productGrid").addEventListener("click", function (event) {
        if (event.target.classList.contains("view-details")) {
            const productId = event.target.getAttribute("data-id");
            const product = allProducts.find(p => p.id == productId);
            if (product) showProductDetails(product);
        }
    });

    // Show product details in the modal
    function showProductDetails(product) {
        const discountPrice = (product.price * 0.8).toFixed(2);

        document.getElementById("modalImage").src = product.image;
        document.getElementById("modalTitle").textContent = product.name;
        document.getElementById("modalDescription").textContent = product.description || "No description available.";
        document.getElementById("modalOriginalPrice").innerHTML = `<s>₹${product.price}</s>`;
        document.getElementById("modalDiscountPrice").textContent = `₹${discountPrice}`;

        document.getElementById("productModal").classList.add("show");
    }

    // Close modal function
    function closeModal() {
        document.getElementById("productModal").classList.remove("show");
    }

    // Close modal when clicking the close button
    document.querySelector(".close-btn").addEventListener("click", closeModal);

    // Close modal when clicking outside of the modal
    window.addEventListener("click", (event) => {
        if (event.target === document.getElementById("productModal")) {
            closeModal();
        }
    });

    // Filter products based on search, category, and price range
    function filterProducts() {
        const searchQuery = document.getElementById("searchBox").value.toLowerCase();
        const selectedCategory = document.getElementById("categoryFilter").value;
        const selectedPrice = document.getElementById("priceFilter").value;

        let filteredProducts = allProducts.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery);
            const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
            const matchesPrice = checkPriceFilter(product.price, selectedPrice);

            return matchesSearch && matchesCategory && matchesPrice;
        });

        displayProducts(filteredProducts);
    }

    function checkPriceFilter(price, filter) {
        if (filter === "low") return price < 10000;
        if (filter === "mid") return price >= 10000 && price <= 50000;
        if (filter === "high") return price > 50000;
        return true;
    }

    // Attach event listeners for search and filter
    document.getElementById("searchBox").addEventListener("input", filterProducts);
    document.getElementById("categoryFilter").addEventListener("change", filterProducts);
    document.getElementById("priceFilter").addEventListener("change", filterProducts);

    // Initialize the page by fetching products
    fetchProducts();
});
