# Online-store

Final project for the course **Introduction to Web Applications**.

## Overview

This project demonstrates a basic e-commerce application built with React.
It includes user authentication, product browsing, a shopping cart, and order history functionality.

## Preview

<p align="center">
  <img src="Store.gif" width="800">
</p>

## Technologies Used

### Frontend

- React
- React Router
- Context API
- CSS

### Backend
- API
- JWT-based authentication 

###  Database

The application is connected to a backend server with a database.

All operations performed in the system are stored in the database, including:

- user accounts
- product data
- reviews
- shopping carts
- orders

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

- fetching the list of products (API)
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

## Authors

- Anna Konieczna
- Alicja Czeleń
