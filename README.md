# Online-store

Final project for the course **Introduction to Web Applications**.

## Overview

This project demonstrates a basic e-commerce application built with React.
It includes user authentication, product browsing, a shopping cart, and order history functionality.

## Authors

- Anna Konieczna
- Alicja Czeleń

## Preview

<p align="center">
  <img src="Store.gif" width="400">
</p>

## Technologies Used

### Frontend

- React
- React Router
- Context API
- CSS

### Backend (mocked)

- local JSON files
- simulated API
- JWT-based authentication (mock)

### Libraries

- Tailwind CSS
- MUI (Material UI for React)
- Axios
- shadcn/ui


## 📌 Features

### 👤 Users

- user login
- user registration
- session persistence
- user roles:
  - **user** – adding reviews, managing the shopping cart, editing their own reviews
  - **admin** – removing all reviews

### 🛍️ Products

- fetching the list of products (mock API)
- product search by name
- filtering products by name, price, and category
- product details view
- product availability display
- adding reviews (one review per user)

### 🛒 Shopping Cart

- adding products to the cart
- removing products from the cart
- automatic cart value calculation
- placing an order
- cart access only for logged-in users

### 📦 Orders

- user order list
- order history
- detailed view of a single order
