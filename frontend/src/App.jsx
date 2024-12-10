import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartProvider";

import MainLayout from "./layout/MainLayout";
import RequireAuth from "./components/RequireAuth";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Invoice from "./pages/Invoice";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="h-full min-h-screen bg-slate-200">
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />

                <Route element={<RequireAuth />}>
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/invoice/:id" element={<Invoice />} />
                </Route>
              </Route>
            </Routes>
          </Router>
          <Toaster position="top-center" reverseOrder={true} />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
