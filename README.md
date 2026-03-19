# 🎨 AuctionHub Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

AuctionHub Frontend is a high‑performance **React + TypeScript** single‑page application (SPA) for a modern online auction experience.  
It provides a seamless UI for browsing auctions, placing bids, managing your own listings, and performing admin operations.

---
## 🔗 Related Backend Project

This frontend application consumes the AuctionHub backend API built with ASP.NET Core.

Backend repository:  
https://github.com/Qian1507/AuctionHub_backend

---


## 🖼️ Project Preview

### User Authentication
<p align="center">
  <img src="Login.png" width="500" alt="Login Screen">
</p>

### Main Dashboard
<p align="center">
  <img src="acution.png" width="900" alt="Main Dashboard">
</p>

---

## 🛠️ Tech Stack

- **Framework:** React 18 (functional components & hooks)  
- **Language:** TypeScript (strict typing)  
- **Build Tool:** Vite (fast dev server & bundling)  
- **State Management:** Context API (`AuthContext` / `AuthProvider`)  
- **Styling:** Tailwind CSS (mobile‑first responsive design)  
- **Networking:** Axios with JWT interceptor  

---

## 📂 Project Structure

```text
src/
├── 🌐 api/
│   └── axiosInstance.ts      # Axios instance with baseURL and request/response interceptors
├── 🎨 assets/
│   └── react.svg             # Static assets (images, icons, etc.)
├── 🧱 components/
│   ├── 🔨 auction/           # Auction-specific UI components
│   │   ├── AuctionBidHistory.tsx
│   │   ├── AuctionCard.tsx
│   │   └── AuctionForm.tsx
│   ├── Navbar.tsx            # Global navigation bar
│   ├── RequireAdmin.tsx      # Route guard for admin-only access
│   └── UpdatePasswordForm.tsx# Reusable password update form
├── 🧠 contexts/
│   ├── AuthContext.ts        # Authentication context definition
│   ├── AuthProvider.tsx      # Authentication state provider
│   └── useAuth.ts            # Custom hook for accessing auth context
├── 📄 pages/
│   ├── AdminDashboard.tsx    # Admin management panel
│   ├── AuctionCreate.tsx     # Create new auction page
│   ├── AuctionDetail.tsx     # Auction item details view
│   ├── AuctionEdit.tsx       # Edit existing auction page
│   ├── AuctionList.tsx       # Main auction gallery/home page
│   ├── Login.tsx             # User login page
│   ├── MyAuctions.tsx        # User's personal auction management
│   ├── Register.tsx          # User registration page
│   └── UpdatePassword.tsx    # Password management page
├── 🛠️ services/
│   ├── auctionService.ts     # Auction-related API service layer
│   ├── authService.ts        # Authentication & Authorization API calls
│   └── userService.ts        # User profile & account management services
├── 🏷️ types/
│   └── Types.ts              # Global TypeScript interfaces and DTOs
├── ⚙️ utils/
│   ├── errorUtils.ts         # Centralized error handling logic
│   └── TokenHandler.ts       # JWT storage and retrieval management
├── 💅 App.css                # Global styles and CSS variables
└── 🔗 App.tsx                # Root component & routing configuration
```
---



## ✨ Key Features

### 👤 User Experience
* **Instant Onboarding**: Automatic login immediately after a successful registration.
* **Auction Tracking**: "My Auctions" page with live status badges (`Live`, `Expired`, `Disabled`).
* **Intuitive Feedback**: 
    * Friendly empty states: *"You haven't created any auctions yet."*
    * In-app password updates with real-time verification via `UpdatePasswordForm`.

---

### ⚖️ Bidding System
* **Smart Validation**: Server-side logic ensures all bids exceed the starting price/current highest bid and prevents self-bidding.
* **Detailed Insights**: `AuctionDetail` pages feature full bid history, current high bid, and live status updates.
* **Unified Error Handling**: Clear feedback for low bids or closed auctions using a centralized `getErrorMessage` utility.

---

### 🛡️ Administrative & Security
* **Admin Hub**: Dedicated dashboard (`AdminDashboard.tsx`) for global auction oversight and management.
* **RBAC Protection**: Granular route guarding using `<RequireAdmin>` and `<RequireAuth>`.
* **Secure Access**: Strictly enforces "Admin-only" or "Authenticated-only" access to sensitive routes.

---

### 📱 Responsive Design
* **Desktop**: High-density multi-column grids for auction cards and admin tables.
* **Mobile**: Fluid single-column layouts with stacked sections and adaptive navigation.

---

## 🛠️ Technical Architecture

### 🌐 API Services Strategy
We use a modular service layer to keep the UI components clean and focused.

| Service | Responsibility | Key Methods |
| :--- | :--- | :--- |
| **`auctionService`** | Listing & Bidding | `getAuctions`, `placeBid`, `createAuction` |
| **`authService`** | Identity Management | `login`, `register` |
| **`userService`** | Profile Settings | `updatePassword` |


## 🔐 Authentication Flow & Utilities
<details> <summary><b>🔍 View implementation details (Axios, JWT, Error Handling)</b></summary>
1️⃣ JWT Handling

Upon successful login, authService.login returns an object containing { token, user }.
The AuthProvider then synchronizes this data with both React state and localStorage, ensuring persistence across sessions.

2️⃣ Global Axios Interceptor

A centralized axiosInstance (configured in TokenHandler.ts) automatically attaches the JWT token to all outgoing requests:

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "https://localhost:5001/api",
});

axiosInstance.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

This ensures that all API calls are authenticated without requiring manual token handling in each request.

3️⃣ Error Handling & Normalization

The getErrorMessage utility extracts user-friendly error messages from Axios responses.
It supports multiple response formats, including:

Plain string responses

Structured objects like { message: string }

This provides consistent and readable error handling across the application.

</details>

---


## 🚀 Getting Started

Follow these steps to run the project locally:

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Configure Environment

Create a `.env` file in the project root and add:

```bash
VITE_API_BASE_URL=https://localhost:5001/api
```

Make sure the backend is running and that the URL matches the API endpoint.

### 3️⃣ Run Development Server
```bash
npm run dev
```

The application will typically be available at:  
http://localhost:5173  

---



## 🌟 Design Highlights

### 🔹 Clear Separation of Concerns
- API calls are organized in `services/` and `api/axiosInstance.ts`.
- Authentication logic is centralized in `AuthContext` / `AuthProvider` and accessed via `useAuth()`.

---

### 🔹 Typed End-to-End with DTOs
- Shared TypeScript interfaces in `types/Types.ts` match backend DTOs.
- This reduces bugs caused by mismatched data structures.

---

### 🔹 Reusable Forms & UI
- Auction creation and editing share common logic and layout.
- `UpdatePasswordForm` encapsulates the password change workflow and can be reused across different pages.

---

### 🔹 Robust Loading / Error / Empty States
- Pages like **MyAuctions** clearly distinguish between:
  - Loading
  - Error
  - Empty state ("no data")
- This provides immediate and clear feedback to users.

---

### 🔹 Unified Error Handling
- `getErrorMessage` converts Axios errors into user-friendly messages.
- Ensures consistent error display across the application.

---

### 🔹 JWT-Aware Routing
- Protected routes (auth-only and admin-only) are handled via:
  - `RequireAuth`
  - `RequireAdmin`
- These components read authentication state from `AuthContext`.


## 📄 License

This project is licensed under the MIT License.

Developed with ❤️ by Qian Li
