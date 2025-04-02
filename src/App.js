import { Routes, Route } from "react-router-dom";

// Components
import MyNavbar from "./components/Navbar";

// Pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ListingPage from "./pages/List";
import HomePage from "./pages/Home";
import OrdersPage from "./pages/ViewOrder";
import ViewOrderDetails from "./pages/ViewOrderDetail";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Detail from "./pages/Detail";
import { useFirebase } from "./context/Firebase";

function App() {
  const firebase = useFirebase();

  return (
    <div>
      {firebase?.user?.email && <MyNavbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/medicine/list" element={<ListingPage />} />
        <Route path="/medicine/view/:medicineId" element={<Detail />} />
        <Route path="/medicine/orders" element={<OrdersPage />} />
        <Route path="/medicine/orders/:medicineId" element={<ViewOrderDetails />} />
      </Routes>
    </div>
  );
}

export default App;
