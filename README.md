# ReSell Hub – Client (Frontend)

ReSell Hub is a modern, responsive, and secure online web application that allows users to buy and sell pre-owned products efficiently. This directory contains the client-side code built using the **Next.js App Router** framework.

---

## 🔗 Project Links
- **Live URL**: [ReSell Hub Live](https://resell-hub-client-liard.vercel.app)
- **Client Code Repository**: [GitHub Client Repo](https://github.com/mdsadrulhasandider/resell-hub-client)
- **Server Code Repository**: [GitHub Server Repo](https://github.com/mdsadrulhasandider/resell-hub-server)

---

## 🔑 Test Credentials (for Assignment Evaluation)

To test the role-based dashboards, please use the following credentials or sign up a new account and manually change the role in the database.

| Role | Email | Password | Access Dashboard |
|---|---|---|---|
| **Admin** | `admin@resellhub.com` | `Pass1234` | User Moderation, Product Management, Site Settings |
| **Seller** | `seller@resellhub.com` | `Pass1234` | Product Listing, Order Management, Sales Analytics |
| **Buyer** | `buyer@resellhub.com` | `Pass1234` | Orders, Wishlist, Payment History |

---

## 🚀 Key Features

### 🌟 1. Core Marketplace Experience
- **Next.js App Router**: Optimized performance with server component rendering and layout management.
- **Dynamic Category Browsing**: Clean categories filtering (`Electronics`, `Furniture`, `Fashion`, `Mobile Phones`, `Vehicles`, etc.) with responsive dynamic routes (`/categories/[category]`).
- **Advanced Search & Sorting**: Instant keyword search, condition filter (`excellent`, `good`, `fair`), and sorting by price or upload date.
- **Interactive Review System**: Buyers can leave verified product ratings and reviews.
- **Product Wishlist**: Save items to personal wishlist for future purchases.

### 🛡️ 2. Secure Authentication & Role-Based Access
- **Better Auth Integration**: Highly secure password-based and Google Social login flows.
- **JWT Authorization**: All private routes and backend REST APIs are secured using JSON Web Tokens (JWT) verified via request headers.
- **Role-Based Dashboards**:
  - **Buyer**: View activity summary, manage/cancel orders, save wishlists, and view payment transaction history.
  - **Seller**: Track products, add new listings (with full title, price, images, description, condition), handle orders, and view sales analytics.
  - **Admin**: Moderation panel to manage users, approve/reject products, and monitor all transactions.

### 💳 3. Stripe Payment Gateway Integration
- **Stripe Checkout**: Fully integrated Stripe checkout page session redirection.

### ✨ 4. Advanced UI & Aesthetics
- **Dark/Light Theme Toggle**: Seamless persistent color scheme selection that saves theme states (using DaisyUI themes).
- **Framer Motion Animations**: Micro-interactions, hover effects, and slide-ins on Hero, Product Cards, and statistics.
- **Loading & Skeleton States**: Premium Tailwind/DaisyUI skeletons and spinners.

---

## 📦 NPM Packages Used
- `next` (Next.js Framework)
- `react` / `react-dom`
- `better-auth` (Authentication Client)
- `axios` (HTTP Requests)
- `framer-motion` (Fluid UI animations)
- `react-icons` (Icon packs)
- `react-hot-toast` (Interactive alerts)
- `tailwindcss` / `daisyui` (Modern CSS components)

---

## 🛠️ Environment Configuration

Create a `.env.local` file in the root of the client folder:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:5000
```
