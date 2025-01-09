import { Link } from "react-router-dom";
import { fetchDanhmuc } from "../../../service/danhmucService";
import { fetchSanPhamTheoSearch } from "../../../service/sanphamService";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "/public/css/header.css";
export default function Header() {
  const [keyword, setKeyword] = useState("");
  const { user, logout } = useAuth();
  const [danhMuc, setDanhmuc] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("cartItem");
    logout();
    navigate("/");
    window.location.reload();
  };

  const closeLogoutPopup = () => {
    setShowLogoutPopup(false);
  };
  const handleClick = () => {
    setIsActive(!isActive);
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [cartCount, setCartCount] = useState(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItem")) || [];
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  });
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    setIsActive(false);
    setIsOpen(false);
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
      const newCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setCartCount(newCount);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    // Cleanup
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setShowUserMenu(false);
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  // Tìm kiếm
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (value.trim() !== "") {
      try {
        const results = await fetchSanPhamTheoSearch(value);
        console.log(results);

        setSearchResults(results);
        setIsDropdownVisible(true);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm sản phẩm:", error);
        setSearchResults([]);
        setIsDropdownVisible(false);
      }
    } else {
      setSearchResults([]);
      setIsDropdownVisible(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword) {
      window.location.href = `/sanPham?keyword=${keyword}`;
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
          <div className="wrap-content">
            <div className="header-top-content">
              <div className="header-top-left">
                <div className="info-header location">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Huỳnh Thị Hai, Tân Chánh Hiệp, Quận 12</span>
                </div>
                <div className="info-header working-hours">
                  <i className="far fa-clock"></i>
                  <span>Giờ làm việc: 8:00 - 18:00 (T2 - T7)</span>
                </div>
              </div>
              <div className="header-top-right">
                <div className="info-header contact">
                  <a href="mailto:ultratech199@utech.vn">
                    <i className="far fa-envelope"></i>
                    <span>ultratech199@utech.vn</span>
                  </a>
                </div>
                <div className="social-links">
                  <a href="#" className="social-link">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-link">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="social-link">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-bottom">
          <div className="wrap-content d-flex justify-content-between align-items-center">
            <a className="logo-header" href="">
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
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="timkiem"
                    id="name_tk"
                    className="input ui-autocomplete-input"
                    placeholder="Bạn cần tìm sản phẩm nào ?"
                    autoComplete="off"
                    value={keyword}
                  />
                  <button type="submit" value="" id="btn" className="nut_tim">
                    <img
                      src="/public/img/icon/magnifying-glass-solid.svg"
                      width="22"
                      alt=""
                    />
                  </button>
                </form>
                {isDropdownVisible && searchResults.length > 0 && (
                  <ul className="dropdown-results">
                    {searchResults.map((item, index) => (
                      <li key={index} className="dropdown-item">
                        <Link
                          to={`/chitietsp/sanPham/${item.id}`}
                          className="dropdown-link"
                        >
                          <div
                            className="dropdown-product"
                            onClick={() => setIsDropdownVisible(false)}
                          >
                            <img
                              src={`/img/sanpham/${item.hinh_anh.chinh}`}
                              alt={item.ten_sp}
                              className="product-image"
                            />
                            <div className="product-info">
                              <p className="product-name">{item.ten_sp}</p>
                              <p className="product-price">
                                Giá:{" "}
                                <strong>{item.gia_sp.toLocaleString()}</strong>{" "}
                                VNĐ
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="hotline-header">
                {user ? (
                  <div className="user-menu-container" ref={menuRef}>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="user-button"
                    >
                      <img src="/public/img/icon/user-icon.png" alt="User" />
                      <span className="username">{user.username}</span>
                      <i className="fas fa-chevron-down"></i>
                    </button>

                    {showUserMenu && (
                      <div
                        className={`user-menu ${showUserMenu ? "active" : ""}`}
                      >
                        <div className="welcome-message">
                          <p>Xin chào, {user.fullname || user.username}!</p>
                        </div>
                        <div className="menu-items">
                          <Link
                            to="/taikhoan"
                            className="menu-link"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <i className="fas fa-user-circle"></i>
                            <span>Thông tin tài khoản</span>
                          </Link>
                          <Link
                            to="/donhang"
                            className="menu-link"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <i className="fas fa-shopping-bag"></i>
                            <span>Thông tin đơn hàng</span>
                          </Link>
                          <div className="menu-separator"></div>
                          <button
                            onClick={() => {
                              handleLogout();
                              setShowUserMenu(false);
                            }}
                            className="logout-button"
                          >
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Đăng xuất</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/dangnhap")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 12px",
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      cursor: "pointer",
                      height: "36px",
                      minWidth: "140px",
                      maxWidth: "200px",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src="/public/img/icon/user-icon.png"
                      alt="Login"
                      style={{
                        width: "24px",
                        height: "24px",
                        objectFit: "contain",
                        flexShrink: 0,
                        marginRight: "2px",
                      }}
                    />
                    <span
                      style={{
                        color: "#333",
                        fontSize: "14px",
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: "24px",
                      }}
                    >
                      Đăng nhập
                    </span>
                  </button>
                )}
              </div>

              <Link to="/giohang" className="cart-header">
                <img width="32px" src="/public/img/icon/bag_icon.png" alt="" />
                <p>Giỏ hàng</p>

                <span className="cart-count">{cartCount}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="menu">
          <div className="wrap-content">
            <ul className="d-flex align-items-center justify-content-between">
              <li className="danh-muc-sp">
                <span
                  className="has-child  transition"
                  href="san-pham"
                  title="Danh mục sản phẩm"
                  onClick={() => toggleMenu()}
                >
                  Danh mục sản phẩm
                  <i
                    className="fas fa-chevron-down"
                    style={{ marginLeft: "8px" }}
                  ></i>
                </span>
                <div
                  className={`show-menu isPage ${
                    isOpen ? "open-danhmuc" : "close-danhmuc"
                  }`}
                >
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
              <ul className="menu_second d-flex align-items-center justify-content-between">
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
                  <Link to="/tintuc">Tin tức & Sự kiện</Link>
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
              <li
                className={`submenu ${isActive ? "active" : ""}`}
                onClick={() => handleClick()}
              >
                <img
                  width={45}
                  height={45}
                  src="/public/img/icon/menu (1).png"
                  alt=""
                />
                <ul>
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
                    <Link to="/tintuc">Tin tức & Sự kiện</Link>
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
              </li>
            </ul>
          </div>
        </div>
        {showLogoutPopup && (
          <div className="logout-popup-overlay">
            <div className="logout-popup">
              <div className="popup-header">
                <i
                  className="fas fa-sign-out-alt fa-2x"
                  style={{ color: "#0000a3" }}
                ></i>
                <h2 style={{ color: "#0000a3" }}>Đăng xuất</h2>
              </div>
              <p>Bạn có chắc chắn muốn đăng xuất?</p>
              <div className="logout-popup-buttons">
                <button onClick={confirmLogout} className="btn-logout">
                  Đăng xuất
                </button>
                <button onClick={closeLogoutPopup} className="btn-cancel">
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* header end*/}
    </>
  );
}
