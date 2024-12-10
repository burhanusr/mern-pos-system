import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/cartContext";

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
      <div className="bg-beige h-full min-h-screen">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />

              <Route element={<RequireAuth />}>
                <Route path="/payment" element={<Payment />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/invoice" element={<Invoice />} />
              </Route>
            </Route>
          </Routes>
        </Router>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
    </AuthProvider>
  );
}

export default App;
