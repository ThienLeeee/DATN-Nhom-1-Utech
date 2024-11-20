import { Link } from "react-router-dom";
import { fetchDanhmuc } from "../../../service/danhmucService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/context/AuthContext';
import '/public/css/header.css';
export default function Header() {
  const [keyword, setKeyword] = useState("");
  const { user, logout } = useAuth();
  const [danhMuc, setDanhmuc] = useState([]);
  const [cartCount, setCartCount] = useState(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItem")) || [];
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  });
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDanhmuc = async () => {
      try {
        const danhMuc = await fetchDanhmuc();
        setDanhmuc(danhMuc);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };
    loadDanhmuc();

    // Lắng nghe sự kiện cartUpdated
    const handleCartUpdate = () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItem")) || [];
      const newCount = cartItems.reduce((total, item) => total + item.quantity, 0);
      setCartCount(newCount);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    // Cleanup
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setShowUserMenu(false);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/sanPham?keyword=${keyword}`);
    }
  };
  return (
    <>
      {/* header */}
      <div
        className="header"
        style={{ position: "relative", left: 0, right: 0, top: 0, zIndex: 100 }}
      >
        <div className="header-top">
          <div className="wrap-content d-flex justify-content-between align-items-center">
            <div className="info-header diachi">
              Huỳnh Thị Hai, Tân Chánh Hiệp, Quận 12
            </div>
            <div className="info-header timeWork">
              Mở cửa: 8:00 đến 18:00 từ Thứ 2 đến Thứ 7
            </div>
            <div className="info-header email">
              <i className="fa fa-envelope-o" aria-hidden="true" /> Email:
              ultratech199@utech.vn
            </div>
            <div className="social-footer d-flex">
              <a
                className="d-block"
                href=""
                target="blank"
              >
                <img src="/public/img/logo/logo facebook.png" alt="Facebook" />
              </a>
              <a className="d-block" href="" target="blank">
              <img src="/public/img/logo/logo instagram.png" alt="Instagram" />
              </a>
              <a
                className="d-block"
                href=""
                target="blank"
              >
                <img src="/public/img/logo/logo youtobe.png" alt="G+" />
              </a>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="wrap-content d-flex justify-content-between align-items-center">
            <a className="logo-header d-inline-block" href="">
              <img
                src="/public/img/logo/logo.png"
                alt="Công ty TNHH Phát Triển Tin Học Utech"
                className="mw100"
              />
            </a>
            <div className="header-bottom-right d-flex justify-content-between align-items-center">
              <div id="timkiem">
              <form
                 onSubmit={handleSubmit}
                 action="tim-kiem.html"
                  method=""
                  name="frm2"
                  className="frm_timkiem"
                >
                  <select className="list">
                    <option value={0}>Tất cả</option>
                    <option value={11}>LAPTOP</option>
                    <option value={14}>MÁY BỘ PC</option>
                    <option value={15}>LINH KIỆN PC</option>
                    <option value={16}>LCD-TIVI</option>
                    <option value={17}>TB VĂN PHÒNG</option>
                    <option value={18}>THIẾT BỊ MẠNG</option>
                    <option value={19}>PHẦN MỀM</option>
                    <option value={22}>LINH PHỤ KIỆN</option>
                    <option value={38}>APPLE</option>
                    <option value={40}>THIẾT BỊ KTS</option>
                  </select>
                  <input
                    onChange={(e) => setKeyword(e.target.value)}
                    type="text"
                    name="timkiem"
                    id="name_tk"
                    className="input ui-autocomplete-input"
                    placeholder="Bạn cần tìm sản phẩm nào ?"
                    autoComplete="off"
                  />

                  <button type="submit" value="" id="btn" className="nut_tim">
                    <img
                      src="/public/img/icon/magnifying-glass-solid.svg"
                      width="22"
                      alt=""
                    />
                  </button>
                </form>
              </div>{" "}

              <div className="hotline-header">
                {user ? (
                  <div className="user-menu-container" style={{ position: 'relative' }}>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="user-button"
                      style={{
                        padding: '10px 20px',
                        border: '2px solid #000',
                        borderRadius: '5px',
                        background: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>
                     <img src="/public/img/icon/user-icon.png" alt="icon user" style={{ width: '32px', height: '32px', borderRadius: '50%' }} /> <p>{user.username}</p>
                    </button>
                    {showUserMenu && (
                      <div className="user-menu" style={{
                        position: 'absolute',
                        top: '100%',
                        right: -45,
                        background: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        padding: '10px',
                        zIndex: 1000
                      }}>
                        <div className="menu-item">
                          <Link to="/Thongtintaikhoan" className="menu-link">Thông tin người dùng</Link>
                        </div>
                        <div className="menu-item">
                          <Link to="/forgot-password" className="menu-link">Quên mật khẩu</Link>
                        </div>
                        <div className="menu-item">
                          <button onClick={handleLogout} className="logout-button">
                            Đăng xuất
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/Dangnhap"
                    className="login-header d-block text-center"
                    style={{
                      padding: '10px 20px',
                      border: '2px solid #000',
                      borderRadius: '5px',
                      textDecoration: 'none',
                      color: '#000',
                      fontWeight: 'bold',
                    }}
                  >
                    <p style={{ marginBottom: 0 }}>Đăng nhập</p>
                  </Link>
                )}
              </div>

              <Link
                to="/giohang"
                className="cart-header d-block d-flex"
                style={{ overflow: "hidden" }}
              >
                <img
                  width="32px"
                  src="/public/img/icon/bag_icon.png"
                  alt=""
                  style={{ float: "left", marginRight: 10 }}
                />
                <p style={{ float: "left" }}>
                  Giỏ hàng (<strong>{cartCount}</strong>)
                </p>
              </Link>
            </div>
          </div>
        </div>
        <h2 className="vcard">Công ty TNHH Phát Triển Tin Học Utech</h2>
        <h3 className="vcard">Công ty TNHH Phát Triển Tin Học Utech</h3>
        <h4 className="vcard">Công ty TNHH Phát Triển Tin Học Utech</h4>
        <h5 className="vcard">Công ty TNHH Phát Triển Tin Học Utech</h5>
        <h6 className="vcard">Công ty TNHH Phát Triển Tin Học Utech</h6>
        <div className="menu">
          <div className="wrap-content">
            <ul className="d-flex align-items-center">
              <li className="danh-muc-sp">
                <span
                  className="has-child  transition"
                  href="san-pham"
                  title="Danh mục sản phẩm"
                >
                  {" "}
                  Danh mục sản phẩm <i />
                </span>
                <div className="show-menu isPage">
                  <div className="boxshadown">
                    <ul className="box_menu lst-prd">

                    {danhMuc.length > 0 ? (
                    danhMuc.map((danhmuc) => (
                      <li className="mega-dropdown" key={danhmuc.id}>
                        <Link
                          to={`/sanPham/id_danhmuc/${danhmuc.id}`}
                          className="has-child transition"
                          title="LAPTOP"
                        >
                          {danhmuc.tendm}
                        </Link>
                        
                        {/* <div className="boxMainDropdown">
                         <ul className="dropdown-prod-lv2">
                         <li>
                          <a
                         className="has-child transition"
                          title="LAPTOP DELL"
                        href="san-pham/laptop-dell-15/"
                       >
                LAPTOP DELL
              </a>
              <ul className="dropdown-prod-lv3">
                <li>
                  <a
                    className="has-child transition"
                    title="DELL VOSTRO "
                    href="san-pham/dell-vostro-385/"
                  >
                    DELL VOSTRO{" "}
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="DELL INSPIRON "
                    href="san-pham/dell-inspiron-387/"
                  >
                    DELL INSPIRON{" "}
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="DELL LATITUDE"
                    href="san-pham/dell-latitude-12/"
                  >
                    DELL LATITUDE
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="DELL GAMING"
                    href="san-pham/dell-gaming-345/"
                  >
                    DELL GAMING
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                className="has-child transition"
                title="LAPTOP HP"
                href="san-pham/laptop-hp-16/"
              >
                LAPTOP HP
              </a>
              <ul className="dropdown-prod-lv3">
                <li>
                  <a
                    className="has-child transition"
                    title="HP 14s"
                    href="san-pham/hp-14s-80/"
                  >
                    HP 14s
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="HP 15s"
                    href="san-pham/hp-15s-81/"
                  >
                    HP 15s
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="HP 240"
                    href="san-pham/hp-240-365/"
                  >
                    HP 240
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="HP PAVILION"
                    href="san-pham/hp-pavilion-82/"
                  >
                    HP PAVILION
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="HP PAVILION X360"
                    href="san-pham/hp-pavilion-x360-267/"
                  >
                    HP PAVILION X360
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="HP PROBOOK"
                    href="san-pham/hp-probook-83/"
                  >
                    HP PROBOOK
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="HP ENVY X360"
                    href="san-pham/hp-envy-x360-84/"
                  >
                    HP ENVY X360
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="HP ELITEBOOK"
                    href="san-pham/hp-elitebook-256/"
                  >
                    HP ELITEBOOK
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="HP VICTUS"
                    href="san-pham/hp-victus-344/"
                  >
                    HP VICTUS
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                className="has-child transition"
                title="LAPTOP ASUS"
                href="san-pham/laptop-asus-18/"
              >
                LAPTOP ASUS
              </a>
              <ul className="dropdown-prod-lv3">
                <li>
                  <a
                    className="has-child transition"
                    title="ASUS ExpertBook"
                    href="san-pham/asus-expertbook-350/"
                  >
                    ASUS ExpertBook
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="ASUS ViVoBook"
                    href="san-pham/asus-vivobook-228/"
                  >
                    ASUS ViVoBook
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="ASUS Zenbook"
                    href="san-pham/asus-zenbook-87/"
                  >
                    ASUS Zenbook
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="ASUS GAMING Series"
                    href="san-pham/asus-gaming-series-90/"
                  >
                    ASUS GAMING Series
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                className="has-child transition"
                title="LAPTOP LENOVO"
                href="san-pham/laptop-lenovo-17/"
              >
                LAPTOP LENOVO
              </a>
              <ul className="dropdown-prod-lv3">
                <li>
                  <a
                    className="has-child transition"
                    title="THINKPAD"
                    href="san-pham/thinkpad-255/"
                  >
                    THINKPAD
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="LENOVO V - S Series"
                    href="san-pham/lenovo-v-s-series-254/"
                  >
                    LENOVO V - S Series
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="THINKBOOK"
                    href="san-pham/thinkbook-376/"
                  >
                    THINKBOOK
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="YOGA SLIM"
                    href="san-pham/yoga-slim-443/"
                  >
                    YOGA SLIM
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                className="has-child transition"
                title="LAPTOP LG"
                href="san-pham/laptop-lg-173/"
              >
                LAPTOP LG
              </a>
              <ul className="dropdown-prod-lv3">
                <li>
                  <a
                    className="has-child transition"
                    title="LG GRAM"
                    href="san-pham/lg-gram-323/"
                  >
                    LG GRAM
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                className="has-child transition"
                title="LINH KIỆN LAPTOP"
                href="san-pham/linh-kien-laptop-214/"
              >
                LINH KIỆN LAPTOP
              </a>
              <ul className="dropdown-prod-lv3">
                <li>
                  <a
                    className="has-child transition"
                    title="RAM LAPTOP"
                    href="san-pham/ram-laptop-418/"
                  >
                    RAM LAPTOP
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="MÀN HÌNH LAPTOP"
                    href="san-pham/man-hinh-laptop-419/"
                  >
                    MÀN HÌNH LAPTOP
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="PIN LAPTOP"
                    href="san-pham/pin-laptop-420/"
                  >
                    PIN LAPTOP
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="ADAPTER LAPTOP"
                    href="san-pham/adapter-laptop-421/"
                  >
                    ADAPTER LAPTOP
                  </a>
                </li>
                <li>
                  <a
                    className="has-child transition"
                    title="PHỤ KIỆN CHO LAPTOP"
                    href="san-pham/phu-kien-cho-laptop-422/"
                  >
                    PHỤ KIỆN CHO LAPTOP
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div> */}
                      </li>
                    ))
                  ) : (
                    <p>Đang tải danh mục...</p>
                  )}
                     
                    </ul>
                  </div>
                </div>
              </li>
              <li className="li-normal">
                <Link to="/" className="" href="" title="Trang chủ">
                  Trang chủ
                </Link>
              </li>
              <li className="li-normal">
                <Link
                  to="/gioithieu"
                  className=""
                  href="gioi-thieu.html"
                  title="Giới thiệu"
                >
                  Giới thiệu
                </Link>
              </li>
              <li className="li-normal">
                <Link className="" to="/tragop" title="Trả góp">
                  Trả góp
                </Link>
              </li>
              <li className="li-normal">
                <a
                  href="bao-gia.html"
                  className="goto-form"
                  title="Yêu cầu báo giá"
                >
                  Yêu cầu báo giá
                </a>
              </li>
              <li className="li-normal">
                <a className="" href="tin-tuc.html" title="Tin tức & sự kiện">
                  Tin tức &amp; Sự kiện
                </a>
              </li>
              <li className="li-normal">
                <Link
                  to="/lienhe"
                  className=""
                  href="lien-he.html"
                  title="Liên hệ"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* header end*/}
    </>
  );
}
