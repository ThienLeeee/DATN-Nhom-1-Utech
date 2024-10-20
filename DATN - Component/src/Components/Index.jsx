
import Header from './Layout_User/Header';
import Banner from './Layout_User/Trangchu/Banner';
import Footer from './Layout_User/Footer';
import CategoriesListContent from './Layout_User/Trangchu/Categories-List-Content';
import Chitietsanpham from './Layout_User/Chitietsanpham';
import Gioithieu from './Layout_User/Gioithieu';
import LienHe from './Layout_User/Lienhe';
import SanPhamTheodm from './Layout_User/Sanphamtheodm';
import ThanhToan from './Layout_User/Thanhtoan';



import '/public/css/style.css'
import '/public/css/owl/owl.carousel.css'
import '/public/css/owl/owl.transition.css'
import '/public/css/owl/owl.theme.css'

import '/public/css/fonts.css'
import '/public/css/jBox.css'
import '/public/css/jBox.Confirm.css'
import '/public/css/jquery-ui.css'

import '/public/css/font_awesome/font-awesome.min.css'
import '/public/css/menu/jquery.mmenu.all.css'
import '/public/css/raty/jquery.raty.css'
import '/public/css/magiczoomplus/magiczoomplus.css'
import '/public/css/simplyscroll/jquery.simplyscroll.css'
import '/public/css/wow/animate.min.css'
import '/public/css/fancybox2/jquery.fancybox.css'

import '/public/css/slick/slick.css'
import '/public/css/slick/slick-theme.css'
import '/public/css/slick/slick-style.css'

export default function Index() {
  return(
    <>
    <Header></Header>
    <Banner></Banner>
    <CategoriesListContent></CategoriesListContent>
    <Chitietsanpham></Chitietsanpham>
    <SanPhamTheodm></SanPhamTheodm>
    <Gioithieu></Gioithieu>
    <LienHe></LienHe>
    <ThanhToan></ThanhToan>
    <Footer></Footer>
  </>
  )
  
}
