import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import { useAuth } from "./contexts/useAuth";
import RequireAdmin from "./components/RequireAdmin";
// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuctionList from "./pages/AuctionList";
import AuctionDetail from "./pages/AuctionDetail";
import AuctionCreate from "./pages/AuctionCreate";
import MyAuctions from "./pages/MyAuctions";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import AuctionEdit from "./pages/AuctionEdit";
import UpdatePassword from "./pages/UpdatePassword";
import './App.css';

type RequireAuthProps = {
  children: React.ReactElement;
};

function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
function App() {
  

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>

          //User
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/password" element={<UpdatePassword />} />

          //Auction
          <Route path="/auctions" element={<AuctionList />} />
          <Route path="/auctions/:id" element={<AuctionDetail />} />
          <Route path="/auctions/edit/:id" element={<AuctionEdit />} />

          <Route
            path="/auctions/create"
            element={
              <RequireAuth>
                <AuctionCreate />
              </RequireAuth>
            }
          />
          <Route
            path="/my-auctions"
            element={
              <RequireAuth>
                <MyAuctions />
              </RequireAuth>
            }
          />

          <Route
            path="/auctions/edit/:id"
            element={
              <RequireAuth>
                <AuctionEdit />
              </RequireAuth>
            }
          />
           <Route
            path="/users/update"
            element={
              <RequireAuth>
                <UpdatePassword />
              </RequireAuth>
            }
            />

            
           <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          />
   
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
  


export default App;
