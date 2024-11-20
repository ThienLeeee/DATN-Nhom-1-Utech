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
        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  );
}
