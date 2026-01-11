-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Wersja serwera:               9.4.0 - MySQL Community Server - GPL
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Zrzut struktury tabela onlinestore.opinions
CREATE TABLE IF NOT EXISTS `opinions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rating` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `context` text,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Zrzucanie danych dla tabeli onlinestore.opinions: ~0 rows (około)

-- Zrzut struktury tabela onlinestore.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `total` double DEFAULT NULL,
  `createdAt` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Zrzucanie danych dla tabeli onlinestore.orders: ~0 rows (około)

-- Zrzut struktury tabela onlinestore.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL,
  `title` text,
  `description` text,
  `price` double DEFAULT NULL,
  `category` text,
  `image` text,
  `stock` int DEFAULT NULL,
  `rating` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Zrzucanie danych dla tabeli onlinestore.products: ~20 rows 
INSERT INTO `products` (`id`, `title`, `description`, `price`, `category`, `image`, `stock`, `rating`) VALUES
	(1, 'Long sleeve Jacket', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 150, 'women', 'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg', 50, 4),
	(2, 'Jacket with wollen hat', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 65, 'women', 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg', 30, 3),
	(3, 'Compact fashion t-shirt', 'Lorem ipsumドル sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 55.99, 'women', 'https://images.pexels.com/photos/2752045/pexels-photo-2752045.jpeg', 100, 3),
	(4, 'Blue jins', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 50, 'women', 'https://images.pexels.com/photos/1485031/pexels-photo-1485031.jpeg', 75, 3),
	(5, 'Skirts with full setup', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 695, 'women', 'https://images.pexels.com/photos/1631181/pexels-photo-1631181.jpeg', 20, 5),
	(6, 'Yellow Hoody', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 180, 'men', 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg', 40, 4),
	(7, 'Black t-shirt for women', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 20, 'women', 'https://images.pexels.com/photos/2010812/pexels-photo-2010812.jpeg', 120, 2),
	(8, 'Gouwn with Red velvet', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 350, 'women', 'https://images.pexels.com/photos/2233703/pexels-photo-2233703.jpeg', 15, 3),
	(9, 'Pink beauty', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 100, 'women', 'https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg', 25, 3),
	(10, 'Jean\'s stylish Jacket', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 245, 'men', 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg', 35, 5),
	(11, 'Jamdani Saree', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 800, 'women', 'https://images.pexels.com/photos/3363204/pexels-photo-3363204.jpeg', 10, 4),
	(12, 'Black Jacket', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 140, 'men', 'https://images.pexels.com/photos/983497/pexels-photo-983497.jpeg', 45, 3),
	(13, 'Black top with jeans', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 120, 'women', 'https://images.pexels.com/photos/3672825/pexels-photo-3672825.jpeg', 60, 4),
	(14, 'Clothes with bag', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 50, 'kids', 'https://images.pexels.com/photos/36029/aroni-arsa-children-little.jpg', 80, 2),
	(15, 'Stylish jeans in lightblue', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 100, 'women', 'https://images.pexels.com/photos/2738792/pexels-photo-2738792.jpeg', 70, 4),
	(16, 'Unknown horizon', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 350, 'men', 'https://images.pexels.com/photos/2866077/pexels-photo-2866077.jpeg', 25, 4),
	(17, 'Light tops', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 120, 'women', 'https://images.pexels.com/photos/2010925/pexels-photo-2010925.jpeg', 90, 3),
	(18, 'Khakhi jeans', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 190, 'women', 'https://images.pexels.com/photos/3054973/pexels-photo-3054973.jpeg', 65, 4),
	(19, 'Black full sleeve', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 170, 'women', 'https://images.pexels.com/photos/2693849/pexels-photo-2693849.jpeg', 55, 3),
	(20, 'Formal for Men', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non magni facili blanditiis molestias soluta eveniet illum accusantium eius mollitia eligendi, ex iste doloribus magnam.', 490, 'men', 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', 20, 5);

-- Zrzut struktury tabela onlinestore.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Zrzucanie danych dla tabeli onlinestore.users: ~7 rows 
INSERT INTO `users` (`id`, `email`, `password`, `admin`) VALUES
	(1, 'aaaaa@aa.com', '$2b$10$nP0Mm23bOhRzJIcaCqQvxurParBmWHisi6eZBulv5.15VuUpKrl3q', 0),
	(3, 'aaaa@aa.com', '$2b$10$bR3nEFgt85bfpJSwPQEjvOwXpSZAJMWKo0sGYJp8MjRv2b08oPFaC', 0),
	(7, 'kkk@kkk.com', '$2b$10$9r2p6y5XualJKFIP7s84xuMnjEWriBazzSGz21DKFOLKw7AKXqXoW', 0),
	(8, 'll@ll.com', '$2b$10$TCpr5e5IpzyECtuiAjo/suOj16TJbM9SOYT5TWYCyKWmOd/Fi682.', 0),
	(10, 'kkkk@kkk.com', '$2b$10$b572sjP89fe1DFJcnj4DVebWEaSRk/iWbtw/eqUshazASWB.hBUaa', 0),
	(11, 'k@kkk.com', '$2b$10$090qUcBMQdwdsy50Ky25D.9b8zxBV/yu4zhH29ygIQKCOZw6xb2Wa', 0),
	(12, 'marek-czelen@wp.pl', '$2b$10$/7V3xEzebG9ORhhQ5CgY8.Is589sGiP1qDupDklvoRwNJzbO93K.G', 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
