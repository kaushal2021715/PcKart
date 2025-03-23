<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

// Database connection settings
$servername = "localhost"; // Change if necessary
$username = "root"; // Change if necessary
$password = ""; // Change if necessary
$dbname = "Pckart"; // Your actual database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

// Fetch products from the database
$sql = "SELECT id, name, description, price, image, category FROM products";
$result = $conn->query($sql);

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

// Return products as JSON
echo json_encode($products);

$conn->close();
?>
