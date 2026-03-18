# 🎨 AuctionHub Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

AuctionHub Frontend is a high‑performance **React + TypeScript** single‑page application (SPA) for a modern online auction experience.  
It provides a seamless UI for browsing auctions, placing bids, managing your own listings, and performing admin operations.

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
  api/
    axiosInstance.ts        # Axios instance with baseURL & JWT interceptor

  assets/
    ...                     # Static assets (e.g. logos)

  components/
    auction/
      Navbar.tsx
      RequireAdmin.tsx
      UpdatePasswordForm.tsx

  contexts/
    AuthContext.tsx
    AuthProvider.tsx
    useAuth.ts

  pages/
    AdminDashboard.tsx
    AuctionCreate.tsx
    AuctionDetail.tsx
    AuctionEdit.tsx
    AuctionList.tsx
    Login.tsx
    MyAuctions.tsx
    Register.tsx
    UpdatePassword.tsx

  services/
    auctionService.ts       # Auction-related API calls
    authService.ts          # Login / register
    userService.ts          # Update password, user info

  types/
    Types.ts                # Shared DTO interfaces (mirrored from backend)

  utils/
    errorUtils.ts           # getErrorMessage for Axios errors
    TokenHandler.ts         # Read/write JWT token from storage

  App.css
  App.tsx                   # Main routing and layout



## ✨ Key Features

### 👤 User Experience
* **Instant Onboarding**: Automatic login immediately after a successful registration using the same credentials.
* **Auction Tracking**: "My Auctions" page with live status badges (`Live`, `Expired`, `Disabled`).
* **Intuitive Feedback**: 
    * Friendly empty states: *"You haven't created any auctions yet."*
    * In-app password updates with real-time verification via `UpdatePasswordForm`.

### ⚖️ Bidding System
* **Smart Validation**: Server-side logic ensures all bids exceed the starting price/current highest bid and prevents self-bidding.
* **Detailed Insights**: `AuctionDetail` pages feature full bid history, current high bid, and live status updates.
* **Unified Error Handling**: Clear feedback for low bids or closed auctions using a centralized `getErrorMessage` utility.

### 🛡️ Administrative & Security
* **Admin Hub**: Dedicated dashboard (`AdminDashboard.tsx`) for global auction oversight and management.
* **RBAC Protection**: Granular route guarding using `<RequireAdmin>` and `<RequireAuth>`.
* **Secure Access**: Strictly enforces "Admin-only" or "Authenticated-only" access to sensitive routes.

### 📱 Responsive Design
* **Desktop**: High-density multi-column grids for auction cards and admin tables.
* **Mobile**: Fluid single-column layouts with stacked sections and adaptive navigation.

---

## 🛠️ Technical Architecture

### 🌐 API Services Strategy
We use a modular service layer to keep the UI components clean and focused.

| Service | Responsibility | Key Methods |
| :--- | :--- | :--- |
| **`auctionService`** | Listing & Bidding | `getAuctions`, `placeBid`, `createAuction`, `updateAuction` |
| **`authService`** | Identity Management | `login`, `register` (with automated post-reg handshake) |
| **`userService`** | Profile Settings | `updatePassword` (PATCH via `/users/update`) |

### 🔐 Authentication Flow & Utilities
<details>
<summary><b>🔍 View implementation details (Axios, JWT, Error Utils)</b></summary>

#### **1. JWT Management**
On login, `authService.login` receives `{ token, user }`. The `AuthProvider` then syncs this to React state and `localStorage`.

#### **2. Global Axios Interceptor**
`axiosInstance` (via `TokenHandler.ts`) automatically attaches the Bearer token to all outgoing requests:

```ts
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


3. Error Normalization
getErrorMessage extracts readable strings from complex Axios error objects, supporting both plain string responses and { message: string } structures.

</details>




🚀 Getting Started
1️⃣ Install Dependencies
bash
npm install

2️⃣ Configure Environment
Create a .env file in the project root:

bash
VITE_API_BASE_URL=https://localhost:5001/api
Make sure the backend is running and the URL matches this value.

3️⃣ Run Development Server
bash
npm run dev

The app will typically run at:

http://localhost:5173

🔗 Related Backend Project
This frontend consumes the AuctionHub backend API built with ASP.NET Core.

Backend repository:
https://github.com/Qian1507/AuctionHub_backend


🌟 Design Highlights
Clear separation of concerns

API calls live in services/ and api/axiosInstance.ts.

Authentication logic is centralized in AuthContext / AuthProvider and accessed via useAuth().

Typed end‑to‑end with DTOs

Shared TypeScript interfaces in types/Types.ts match backend DTOs, reducing bugs caused by mismatched shapes.

Reusable forms & UI

Auction creation and editing share common logic and layout.

UpdatePasswordForm encapsulates the password change workflow and can be reused on different pages.

Robust loading / error / empty states

Pages like MyAuctions clearly distinguish between loading, error, and “no data” states, giving users immediate feedback.

Unified error handling

getErrorMessage converts Axios errors into user‑friendly strings, so all pages display consistent messages.

JWT‑aware routing

Auth‑only and admin‑only routes are enforced using RequireAuth / RequireAdmin, reading state from AuthContext.


📄 License
MIT License

Developed with ❤️ by Qian Li
