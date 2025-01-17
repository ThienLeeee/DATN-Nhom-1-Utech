import Header from "./Layout_User/Header";
import Trangchu from "./Layout_User/Trangchu";
import Footer from "./Layout_User/Footer";

import Gioithieu from "./Layout_User/Gioithieu";
import LienHe from "./Layout_User/Lienhe";
import Chitietsanpham from "./Layout_User/Chitietsanpham";
import SanPhamTheodm from "./Layout_User/Sanphamtheodm";
import Giohang from "./Layout_User/Giohang";
import Thanhtoan from "./Layout_User/Thanhtoan";
import Dangnhap from "./DK.DN/Dangnhap";
import Dangky from "./DK.DN/Dangky";
import { AuthProvider } from "../context/AuthContext";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "/public/css/style.css";
import "/public/css/owl/owl.carousel.css";
import "/public/css/owl/owl.transition.css";
import "/public/css/owl/owl.theme.css";

import "/public/css/fonts.css";
import "/public/css/jBox.css";
import "/public/css/jBox.Confirm.css";
import "/public/css/jquery-ui.css";

import "/public/css/font_awesome/font-awesome.min.css";
import "/public/css/menu/jquery.mmenu.all.css";
import "/public/css/raty/jquery.raty.css";
import "/public/css/magiczoomplus/magiczoomplus.css";
import "/public/css/simplyscroll/jquery.simplyscroll.css";
import "/public/css/wow/animate.min.css";
import "/public/css/fancybox2/jquery.fancybox.css";

import "/public/css/slick/slick.css";
import "/public/css/slick/slick-theme.css";
import "/public/css/slick/slick-style.css";

import "/public/js/bootstrap/bootstrap.min.js"
import SanPhamSearch from "./Layout_User/SanPhamSearch";
import SanPhamThuongHieu from "./Layout_User/Sanphamtheoth";
import Taikhoan from "./Layout_User/taikhoan";
import Thongtindonhang from "./Layout_User/Thongtindonhang";
import EditTaikhoan from "./Layout_User/editTaikhoan";
import ForgotPassword from "./DK.DN/ForgotPassword";
import Tintuc from "./Layout_User/tintuc";
import SuccessPage from "./Layout_User/SuccessPage";
import Yeuthich from "./Layout_User/yeuthich";
import ErrorBoundary from "./ErrorBoundary";
import Voucher from "./Layout_User/Voucher";

export default function Index() {
  return (
    <AuthProvider>
      <Router>
        <Header/>
        <Routes>         
            <Route path="/" element={<Trangchu></Trangchu>}></Route>
            <Route path="/gioithieu" element={<Gioithieu></Gioithieu>}></Route>
            <Route path="/lienhe" element={<LienHe></LienHe>}></Route>
            <Route path="/chitietsp/sanPham/:id" element={<Chitietsanpham></Chitietsanpham>}></Route>
            <Route path="/sanPham/id_danhmuc/:id" element={<SanPhamTheodm></SanPhamTheodm>}></Route>
            <Route path="/giohang"  element={<Giohang></Giohang>}></Route>
            <Route path="/Dangnhap" element={<Dangnhap></Dangnhap>}></Route>
            <Route path="/Dangky" element={<Dangky></Dangky>}></Route>
            <Route path="/sanPham"  element={<SanPhamSearch></SanPhamSearch>}></Route>
            <Route path="/sanPham/id_danhmuc/:id_danhmuc/thuong_hieu/:thuong_hieu" element={<SanPhamThuongHieu></SanPhamThuongHieu>}></Route>
            <Route path="/thanhtoan" element={<Thanhtoan></Thanhtoan>}></Route>
            <Route path="/thanhtoan/SuccessPage" element={<SuccessPage></SuccessPage>}></Route>
            <Route path="/taikhoan" element={<Taikhoan />}></Route>
            <Route path="/donhang" element={<Thongtindonhang />}></Route>
            <Route path="/chinhsuathongtin" element={<EditTaikhoan />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>}></Route>
            <Route path="/tintuc" element={<Tintuc />}></Route>
            <Route path="/yeuthich" element={<Yeuthich />}></Route>
            <Route path="/voucher" element={<ErrorBoundary>
              <Voucher />
            </ErrorBoundary>} />
        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  );
}
