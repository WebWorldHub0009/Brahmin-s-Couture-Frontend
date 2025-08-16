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
import CheckoutPage from "./Pages/CheckoutPage";

/* ---------- Auth Pages ---------- */
import Login from "./Pages/User/Login";
import Register from "./Pages/User/Register";

/* ---------- Admin pages ---------- */
import AdminSidebar from "./Pages/Admin/AdminSidebar";
import Dashboard from "./Pages/Admin/Dashboard";
import ProductList from "./Pages/Admin/ProductList";
import ProductForm from "./Pages/Admin/ProductForm";
import Pant from "./Pages/Pant"; // demo admin page

/* ---------- User Dashboard Pages ---------- */
import Sidebar from "./Components/UserDashboard/Sidebar"; // layout with sidebar
import UserDashboardHome from "./Components/UserDashboard/UserDashboardHome";
import Profile from "./Components/UserDashboard/Profile";
import Orders from "./Components/UserDashboard/Orders";
import AddressBook from "./Components/UserDashboard/AddressBook";
import AdminOrders from "./Pages/Admin/AdminOrders";
import TermsAndConditions from "./Pages/Others/TermsAndConditions";
import CancellationRefund from "./Pages/Others/CancellationRefund";
import ShippingDelivery from "./Pages/Others/ShippingDelivery";
import PrivacyPolicy from "./Pages/Others/PrivacyPolicy";

/* ---------- Layouts ---------- */
const PublicLayout = () => (
  <>
    <Navbar className="fixed top-0 w-full z-50" />
    <Outlet />
    <Footer />
  </>
);

const AdminLayout = () => (
  <div className="flex">
    <AdminSidebar />
    <div className="flex-1 min-h-screen bg-gray-100 p-6">
      <Outlet />
    </div>
  </div>
);

const UserLayout = () => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <Outlet />
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="customised-sarees" element={<CustomisedSaree />} />
        <Route path="handloom-saree" element={<HandloomSaree />} />
        <Route path="pattu-saree" element={<PattuSaree />} />
        <Route path="family-combo" element={<FamilyCombo />} />
        <Route path="accessaries" element={<Acessosaries />} />
        <Route path="all" element={<AllProducts />} />
        <Route path="pant" element={<Pant />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/tnc" element={<TermsAndConditions />} />
        <Route path="/refund" element={<CancellationRefund />} />  
        <Route path="/shipping" element={<ShippingDelivery />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="orders" element={<AdminOrders />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/add" element={<ProductForm />} />
        <Route path="products/edit/:id" element={<ProductForm />} />
      </Route>

      {/* User Dashboard Routes */}
      <Route path="/user" element={<UserLayout />}>
        <Route path="dashboard" element={<UserDashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<Orders />} />
        <Route path="address" element={<AddressBook />} />
      </Route>
    </Routes>
  );
}

export default App;
