import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

/* ---------- Public pages ---------- */
import Home from "./Pages/Home";
import CustomisedSaree from "./Pages/CustomisedSaree";
import HandloomSaree from "./Pages/HandloomSaree";
import PattuSaree from "./Pages/PattuSaree";
import Acessosaries from "./Pages/Acessosaries";
import FamilyCombo from "./Pages/FamilyCombo";
import AllProducts from "./Pages/AllProducts";
import SingleProduct from "./Pages/SingleProduct";
import CartPage from "./Pages/CartPage";


/* ---------- Auth Pages ---------- */
import Login from "./Pages/User/Login";
import Register from "./Pages/User/Register";

/* ---------- Admin pages ---------- */
import AdminSidebar from "./Pages/Admin/AdminSidebar";
import Pant from "./Pages/Pant"; // demo admin page
import Dashboard from "./Pages/Admin/Dashboard";
import ProductList from "./Pages/Admin/ProductList";
import ProductForm from "./Pages/Admin/ProductForm"; // used for both Add & Edit
import ShopNowProduct from "./Pages/CheckoutPage";
import CheckoutPage from "./Pages/CheckoutPage";

/* ---------- Public layout ---------- */
const PublicLayout = () => (
  <>
    <Navbar className="fixed top-0 w-full z-50" />
    <Outlet />
    <Footer />
  </>
);

/* ---------- Admin layout ---------- */
const AdminLayout = () => (
  <div className="flex">
    <AdminSidebar />
    <div className="flex-1 min-h-screen bg-gray-100 p-6">
      <Outlet />
    </div>
  </div>
);

/* ---------- Main App routes ---------- */
function App() {
  return (
    <Routes>
      {/* Public routes with layout */}
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="customised-sarees" element={<CustomisedSaree />} />
        <Route path="handloom-saree" element={<HandloomSaree />} />
        <Route path="pattu-saree" element={<PattuSaree />} />
        <Route path="family-combo" element={<FamilyCombo />} />
        <Route path="accessaries" element={<Acessosaries />} />
        <Route path="all" element={<AllProducts />} />
        <Route path="pant" element={<Pant />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Product & Cart */}
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<CartPage />} />

        {/* ✅ Shop Now Page */}
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/add" element={<ProductForm />} />
        <Route path="products/edit/:id" element={<ProductForm />} />
      </Route>
    </Routes>
  );
}

export default App;
