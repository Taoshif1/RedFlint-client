# REDFLINT

## Premium Menswear E-Commerce Experience

REDFLINT is a modern luxury fashion platform built to showcase premium menswear through a sophisticated, high-performance digital experience.

The project combines bold typography, premium imagery, elegant layouts & modern frontend technologies to create a shopping experience that reflects the REDFLINT brand identity.

---

## Project Overview

REDFLINT focuses on delivering a luxury-first shopping experience for modern gentlemen.

The website emphasizes:

- Premium product presentation
- Strong visual storytelling
- Luxury brand aesthetics
- Mobile-first responsiveness
- Fast loading performance
- Clean user experience

---

## Core Features

- Firebase Authentication
- Email & Password Registration
- Google Authentication
- JWT Authentication using HttpOnly Cookies
- Protected Routes
- Customer Dashboard
- MongoDB User Management
- Last Login Tracking
- Responsive UI
- DaisyUI + TailwindCSS
- React Router Data API

---

### Premium Navigation

- Fully responsive navbar
- Centered REDFLINT branding
- Product navigation
- Special Edition collection access
- Search functionality
- User authentication entry point
- Shopping cart integration

### Fashion Showcase Banner

- Luxury product gallery
- Featured collection highlight
- Premium call-to-action section
- Responsive image presentation
- Brand storytelling section

### Hero Carousel

- Swiper powered slider
- Promotional campaigns
- Seasonal collections
- Responsive design
- Smooth transitions

### Footer

- Social media integration
- Company information
- Navigation shortcuts
- Brand identity reinforcement

---

## Technology Stack

### Frontend

- React
- Vite
- React Router
- Firebase Authentication
- Axios
- React Hot Toast
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- JWT
- Cookie Parser
- CORS
- Dotenv

### Styling

- Tailwind CSS v4
- DaisyUI v5
- Custom REDFLINT Theme

### Components

- Swiper.js
- Responsive UI Components

---

## Design System

### Brand Colors

Primary Red:

```css
#E50000
```

Secondary Red:

```css
#990000
```

Background:

```css
#000000
```

Text:

```css
#FFFFFF
```

### Typography

- Red Hat Display
- Heavy Weight Headlines
- Luxury Editorial Style

---

## Responsive Design

The website is optimized for:

- Mobile Devices
- Tablets
- Laptops
- Desktop Displays
- Ultra-wide Screens

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

## Production Build

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

---

## 📁 Folder Structure

```bash
client
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.svg
│  └─ icons.svg
├─ README.md
├─ src
│  ├─ assets
│  │  ├─ Blue_Plaid.png
│  │  ├─ Desert_Sand.png
│  │  ├─ hero.png
│  │  ├─ Hero1.jpg
│  │  ├─ hero2.jpg
│  │  ├─ hero3.webp
│  │  ├─ Indigo_Blue.png
│  │  ├─ Mint_Pattern.jpg
│  │  ├─ react.svg
│  │  ├─ size-guide.jpg
│  │  ├─ Stone_Gray.png
│  │  └─ vite.svg
│  ├─ components
│  │  ├─ dashboard
│  │  │  ├─ admin
│  │  │  │  ├─ AddProduct.jsx
│  │  │  │  ├─ AdminDashboardHeader.jsx
│  │  │  │  ├─ AdminDashboardSidebar.jsx
│  │  │  │  ├─ AdminOrders.jsx
│  │  │  │  ├─ AdminProducts.jsx
│  │  │  │  ├─ AdminProfile.jsx
│  │  │  │  ├─ AdminStats.jsx
│  │  │  │  ├─ Customers.jsx
│  │  │  │  ├─ LowStockAlert.jsx
│  │  │  │  ├─ RecentOrders.jsx
│  │  │  │  ├─ Settings.jsx
│  │  │  │  ├─ TopProducts.jsx
│  │  │  │  └─ WelcomeCard.jsx
│  │  │  └─ customer
│  │  │     ├─ Account.jsx
│  │  │     ├─ AccountInfo.jsx
│  │  │     ├─ AddressBook.jsx
│  │  │     ├─ DashboardHeader.jsx
│  │  │     ├─ DashboardSidebar.jsx
│  │  │     ├─ DashboardStats.jsx
│  │  │     ├─ Overview.jsx
│  │  │     ├─ RecentOrders.jsx
│  │  │     └─ Wishlist.jsx
│  │  ├─ product
│  │  │  ├─ ProductDescription.jsx
│  │  │  ├─ ProductGallery.jsx
│  │  │  ├─ ProductInfo.jsx
│  │  │  ├─ QuantitySelector.jsx
│  │  │  ├─ SizeGuide.jsx
│  │  │  └─ SizeSelector.jsx
│  │  └─ shared
│  │     ├─ AboutSection.jsx
│  │     ├─ Carousel.jsx
│  │     ├─ FashionBanner.jsx
│  │     ├─ Footer.jsx
│  │     ├─ Logo.jsx
│  │     ├─ Navbar.jsx
│  │     ├─ Product.jsx
│  │     ├─ SearchBar.jsx
│  │     └─ ShoppingCart.jsx
│  ├─ context
│  │  ├─ AuthContext.jsx
│  │  ├─ AuthProvider.jsx
│  │  ├─ CartContext.jsx
│  │  └─ CartProvider.jsx
│  ├─ firebase
│  │  └─ firebase.config.js
│  ├─ hooks
│  │  ├─ useAddresses.js
│  │  ├─ useAdminOrders.js
│  │  ├─ useAuth.js
│  │  ├─ useAxiosSecure.js
│  │  ├─ useCart.js
│  │  ├─ useOrder.js
│  │  ├─ useOrders.js
│  │  ├─ useProducts.js
│  │  ├─ useSettings.js
│  │  ├─ useSpecialProducts.js
│  │  ├─ useUser.js
│  │  ├─ useUsers.js
│  │  └─ useWishlist.js
│  ├─ index.css
│  ├─ layouts
│  │  ├─ AdminDashboardLayout.jsx
│  │  ├─ CustomerDashboardLayout.jsx
│  │  └─ MainLayout.jsx
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ AboutUs.jsx
│  │  ├─ AdminOverview.jsx
│  │  ├─ Checkout.jsx
│  │  ├─ ContactUs.jsx
│  │  ├─ CustomerOverview.jsx
│  │  ├─ Delivery.jsx
│  │  ├─ ErrorPage.jsx
│  │  ├─ Home.jsx
│  │  ├─ Login.jsx
│  │  ├─ OrderDetails.jsx
│  │  ├─ OurMotto.jsx
│  │  ├─ ProductDetails.jsx
│  │  ├─ Products.jsx
│  │  ├─ Register.jsx
│  │  ├─ ReturnPolicy.jsx
│  │  └─ SpecialEdition.jsx
│  ├─ routes
│  │  ├─ AdminRoute.jsx
│  │  ├─ PrivateRoute.jsx
│  │  └─ router.jsx
│  └─ utils
│     └─ uploadImage.js
├─ vercel.json
└─ vite.config.js

```

---

## Authentication Flow

1. User registers using Firebase Authentication.
2. User profile is stored in MongoDB.
3. Firebase authentication state changes.
4. Backend generates a JWT.
5. JWT is stored as an HttpOnly Cookie.
6. Protected API routes validate the JWT.
7. User login updates the `lastLoginAt` timestamp.

---

## Environment Variables

### Client

```env
VITE_apiKey=
VITE_authDomain=
VITE_projectId=
VITE_storageBucket=
VITE_messagingSenderId=
VITE_appId=
```

### Server

```env
PORT=3000

DB_USER=

DB_PASS=

JWT_SECRET=
```

---

## Current Progress

- ✅ Firebase Authentication
- ✅ JWT Authentication
- ✅ MongoDB Integration
- ✅ User Registration
- ✅ Email Login
- ✅ Google Login
- ✅ Dashboard Authentication
- ✅ Secure Axios Instance

---

## Upcoming Features

- Product Management
- Shopping Cart
- Wishlist
- Checkout
- Stripe Payment Gateway
- Admin Dashboard
- Order Management
- Product Reviews
- Search & Filtering
- Address Management

---

## Vision

REDFLINT aims to establish a strong digital presence that reflects the quality, craftsmanship & sophistication of its fashion collections while providing customers with a seamless online shopping experience.

---
