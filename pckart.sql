-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 23, 2025 at 06:14 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pckart`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `category`) VALUES
(1, 'Gaming Laptop', 'High-performance gaming laptop with RTX 3070.', 84999.99, 'images/gaming-laptop.jpg', 'laptop'),
(2, 'Office Laptop', 'Lightweight laptop with long battery life.', 49999.99, 'images/office-laptop.jpg', 'laptop'),
(3, 'Gaming PC', 'Powerful gaming PC with liquid cooling.', 109999.99, 'images/gaming-pc.jpg', 'pc'),
(4, 'Mini PC', 'Compact PC for work and entertainment.', 39999.99, 'images/mini-pc.jpg', 'pc'),
(5, 'Mechanical Keyboard', 'RGB mechanical keyboard with tactile switches.', 5999.99, 'images/keyboard.jpg', 'accessories'),
(6, 'Gaming Mouse', 'High-precision mouse with customizable DPI.', 2499.99, 'images/mouse.jpg', 'accessories'),
(7, '4K Monitor', '27-inch 4K UHD monitor with HDR support.', 21999.99, 'images/monitor.jpg', 'pc-parts'),
(8, 'SSD 1TB', 'Fast NVMe SSD with 1TB capacity.', 9999.99, 'images/ssd.jpg', 'pc-parts'),
(9, 'Gaming Headset', 'Surround sound headset with noise cancellation.', 4999.99, 'images/headset.jpg', 'accessories'),
(10, 'Graphics Card', 'NVIDIA RTX 4080 with 16GB GDDR6X.', 129999.99, 'images/gpu.jpg', 'pc-parts');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
