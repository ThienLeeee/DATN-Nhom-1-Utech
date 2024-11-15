import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Layout_Admin/NavBar";
import Header from "./Layout_Admin/Header";
import Footer from "./Layout_Admin/Footer";
import Trangchu from "./Layout_Admin/Trangchu";
import Admin_dm from "./Layout_Admin/Admin_dm";
import Admin_sp from "./Layout_Admin/Admin_sp";
import Admin_tk from "./Layout_Admin/Admin_tk";
import Admin_account from "./Layout_Admin/Admin_account";
import EditUser from "./Layout_Admin/components/edit_user";
import AddProduct from "./Layout_Admin/components/add_product";
import EditProduct from "./Layout_Admin/components/edit_product";
import AddCategory from "./Layout_Admin/components/add_category";
import EditCategory from "./Layout_Admin/components/edit_category";
export default function Admin_Index() {
  return (
    <div className="row">
      <Router>
      <div className="col-md-2 bg-dark text-white p-4">
        <NavBar />
        </div>

        <div className="col-md-10 p-0">
        <Header />
        <div className="row p-5">
          <Routes>
            <Route path="/" element={<Trangchu />} />
            <Route path="/admin-thongke" element={<Admin_tk />} />
            <Route path="/admin-dm" element={<Admin_dm/>} />
            <Route path="/category/add" element={<AddCategory />} />
            <Route path="/category/edit/:id" element={<EditCategory />} />
            <Route path="/admin-sp" element={<Admin_sp/>} />
            <Route path="/products/add" element={<AddProduct></AddProduct>} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route
              path="/admin-account"
              element={<Admin_account></Admin_account>}
            />
         <Route
              path="user/edit/:id"
              element={<EditUser />}
            />
         
            <Route path="/admin-bill" element={<div>Quản lý đơn hàng</div>} />
            <Route
              path="/admin-comment"
              element={<div>Quản lý bình luận</div>}
            />
          </Routes>
        </div>
        </div>

       

        <Footer />
      </Router>
    </div>
  );
}
