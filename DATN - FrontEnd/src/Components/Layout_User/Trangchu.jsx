import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchSanpham } from "../../../service/sanphamService";
import { fetchDanhmuc } from "../../../service/danhmucService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "/public/css/trangchu.css";

export default function Trangchu() {
  const [sanPham, setSanpham] = useState([]);
  const [danhMuc, setDanhmuc] = useState([]);
  const [hotProducts, setHotProducts] = useState([]);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const productsPerSlide = 4;
  const totalSlides = Math.ceil(hotProducts.length / productsPerSlide);
  const [promotionalProducts, setPromotionalProducts] = useState([]);
  const [currentPromotionalSlide, setCurrentPromotionalSlide] = useState(0);

  useEffect(() => {
    const loadSanpham = async () => {
      try {
        const sanPhamData = await fetchSanpham();
        setSanpham(sanPhamData);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };
    loadSanpham();
  }, []);

  useEffect(() => {
    const loadDanhmuc = async () => {
      try {
        const danhMucData = await fetchDanhmuc();
        setDanhmuc(danhMucData);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };
    loadDanhmuc();
  }, []);

  useEffect(() => {
    const fetchHotProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/sanPham/ban-chay"
        );
        setHotProducts(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm bán chạy:", error);
      }
    };
    fetchHotProducts();
  }, []);

  useEffect(() => {
    const fetchPromotionalProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/sanPham/khuyen-mai"
        );
        setPromotionalProducts(response.data);
      } catch (error) {
        console.error("Error fetching promotional products:", error);
      }
    };
    fetchPromotionalProducts();
  }, []);
  // Hàm kiểm tra danh mục có bị khóa không
  const isCategoryLocked = (id) => {
    const category = danhMuc.find((danhmuc) => danhmuc.id === id);
    return category ? category.locked : false;
  };

  const handleAddToCart = (sanPhamMoi) => {
    let cartItems = JSON.parse(localStorage.getItem("cartItem")) || [];
    const itemIndex = cartItems.findIndex((item) => item.id === sanPhamMoi.id);

    if (itemIndex > -1) {
      cartItems[itemIndex].quantity += 1;
    } else {
      const priceAsNumber = parseInt(sanPhamMoi.gia_sp.replace(/\./g, ""));
      cartItems.push({ ...sanPhamMoi, gia_sp: priceAsNumber, quantity: 1 });
    }

    localStorage.setItem("cartItem", JSON.stringify(cartItems));

    window.dispatchEvent(new Event("cartUpdated"));

    navigate("/giohang");
  };

  // Lọc sản phẩm theo categoryId
  const sanPhamdm1 = sanPham.filter(
    (sanpham) => sanpham.id_danhmuc === 1 && !isCategoryLocked(1)
  );
  const sanPhamdm2 = sanPham.filter(
    (sanpham) => sanpham.id_danhmuc === 2 && !isCategoryLocked(2)
  );
  const sanPhamdm3 = sanPham.filter(
    (sanpham) => sanpham.id_danhmuc === 3 && !isCategoryLocked(3)
  );



  return (
    <>
      {/* slideshow-banner-container */}
      <div className="slideshow">
        <div className="wrap-content d-flex justify-content-between">
          {/* empty-site */}
          <div className="slideshow-left">
            <div className="show-menu isHome">
              <div className="boxshadown">
                <ul className="box_menu lst-prd">
                  {danhMuc.length > 0 ? (
                    danhMuc.map((danhmuc) => (
                      <li className="mega-dropdown" key={danhmuc.id}>
                        <Link
                          to={`/sanPham/id_danhmuc/${danhmuc.id}`}
                          className="has-child transition"
                          title="DANH MỤC"
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
          </div>

          {/* empty-site end */}
          <div className="slideshow-right d-flex justify-content-between">
            {/* slideshow  */}
            <div className="boxslideshow">
              <div className="slick-slideshow none slick-initialized slick-slider">
                <div aria-live="polite" className="slick-list draggable">
                  <div
                    className="slick-track"
                    style={{
                      opacity: 1,
                      width: 7350,
                      transform: "translate3d(-2205px, 0px, 0px)",
                    }}
                    role="listbox"
                  >
                    <div
                      className="slick-slide slick-cloned"
                      data-slick-index={-1}
                      aria-hidden="true"
                      style={{ width: "100%", maxWidth: 735 }}
                      tabIndex={-1}
                    >
                      <div className="item-slideshow">
                        <img
                          src="/public/img/slideshow/slideshow1.png"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                          data-description=""
                        />
                      </div>
                    </div>
                    <div
                      className="slick-slide"
                      data-slick-index={0}
                      aria-hidden="true"
                      style={{ width: "100%", maxWidth: 735 }}
                      tabIndex={-1}
                      role="option"
                    >
                      <div className="item-slideshow">
                        <img
                          src="thumb/770x492/1/upload/hinhanh/682211129064288vi.jpg"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                          data-description=""
                        />
                      </div>
                    </div>
                    <div
                      className="slick-slide"
                      data-slick-index={1}
                      aria-hidden="true"
                      style={{ width: "100%", maxWidth: 735 }}
                      tabIndex={-1}
                      role="option"
                    >
                      <div className="item-slideshow">
                        <img
                          src="thumb/770x492/1/upload/hinhanh/452540082781020vi0.jpg"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                          data-description=""
                        />
                      </div>
                    </div>
                    <div
                      className="slick-slide slick-current slick-active"
                      data-slick-index={2}
                      aria-hidden="false"
                      style={{ width: "100%", maxWidth: 735 }}
                      tabIndex={-1}
                      role="option"
                    >
                      <div className="item-slideshow">
                        <img
                          src="/public/img/slideshow/slideshow1.png"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                          data-description=""
                        />
                      </div>
                    </div>
                    <div
                      className="slick-slide"
                      data-slick-index={3}
                      aria-hidden="true"
                      style={{ width: "100%", maxWidth: 735 }}
                      tabIndex={-1}
                      role="option"
                    >
                      <div className="item-slideshow">
                        <img
                          src="/public/img/banner/banner2.png"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                          data-description=""
                        />
                      </div>
                    </div>
                    <div
                      className="slick-slide"
                      data-slick-index={4}
                      aria-hidden="true"
                      style={{ width: "100%", maxWidth: 735 }}
                      tabIndex={-1}
                      role="option"
                    >
                      <div className="item-slideshow">
                        <img
                          src="thumb/770x492/1/upload/hinhanh/399585749181554vi.jpg"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                          data-description=""
                        />
                      </div>
                    </div>
                    <div
                      className="slick-slide"
                      data-slick-index={5}
                      aria-hidden="true"
                      style={{ width: "100%", maxWidth: 735 }}
                      tabIndex={-1}
                      role="option"
                    >
                      <div className="item-slideshow">
                        <img
                          src="thumb/770x492/1/upload/hinhanh/937541303659498vi.jpg"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                          data-description=""
                        />
                      </div>
                    </div>
                    <div
                      className="slick-slide"
                      data-slick-index={6}
                      aria-hidden="true"
                      style={{ width: "100%", maxWidth: 735 }}
                      tabIndex={-1}
                      role="option"
                    >
                      <div className="item-slideshow">
                        <img
                          src="thumb/770x492/1/upload/hinhanh/743530950899020vi.jpg"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                          data-description=""
                        />
                      </div>
                    </div>
                    <div
                      className="slick-slide"
                      data-slick-index={7}
                      aria-hidden="true"
                      style={{ width: "100%", maxWidth: 735 }}
                      tabIndex={-1}
                      role="option"
                    >
                      <div className="item-slideshow">
                        <img
                          src="thumb/770x492/1/upload/hinhanh/547755953397676vi.jpg"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                          data-description=""
                        />
                      </div>
                    </div>
                    <div
                      className="slick-slide slick-cloned"
                      data-slick-index={8}
                      aria-hidden="true"
                      style={{ width: "100%", maxWidth: 735 }}
                      tabIndex={-1}
                    >
                      <div className="item-slideshow">
                        <img
                          src="thumb/770x492/1/upload/hinhanh/682211129064288vi.jpg"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                          data-description=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* slideshow end  */}

            {/* banner1 */}
            <div className="boxbannerslide">
              <div className="slick-bannerqc1 none slick-initialized slick-slider slick-vertical">
                <div
                  aria-live="polite"
                  className="slick-list draggable"
                  style={{ height: 476 }}
                >
                  <div
                    className="slick-track"
                    style={{
                      opacity: 1,
                      height: 2380,
                      transform: "translate3d(0px, -952px, 0px)",
                    }}
                    role="listbox"
                  >
                    <div
                      className="slick-slide slick-cloned"
                      data-slick-index={-2}
                      aria-hidden="true"
                      style={{ width: 305 }}
                      tabIndex={-1}
                    >
                      <div className="item-bannerqc1">
                        <img
                          src="/public/img/banner/sale-banner1.png"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                        />
                      </div>
                    </div>
                    <div
                      className="slick-slide slick-cloned"
                      data-slick-index={-1}
                      aria-hidden="true"
                      style={{ width: 305 }}
                      tabIndex={-1}
                    >
                      <div className="item-bannerqc1">
                        <img
                          src="/public/img/banner/sale-banner1.png"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                        />
                      </div>
                    </div>
                    <div
                      className="slick-slide"
                      data-slick-index={0}
                      aria-hidden="true"
                      style={{ width: 305 }}
                      tabIndex={-1}
                      role="option"
                    >
                      <div className="item-bannerqc1">
                        <img
                          src="/public/img/banner/sale-banner1.png"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                        />
                      </div>
                    </div>
                    <div
                      className="slick-slide"
                      data-slick-index={1}
                      aria-hidden="true"
                      style={{ width: 305 }}
                      tabIndex={-1}
                      role="option"
                    >
                      <div className="item-bannerqc1">
                        <img
                          src="/public/img/banner/sale-banner1.png"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                        />
                      </div>
                    </div>
                    <div
                      className="slick-slide slick-current slick-active"
                      data-slick-index={2}
                      aria-hidden="false"
                      style={{ width: 305 }}
                      tabIndex={-1}
                      role="option"
                    >
                      <div className="item-bannerqc1">
                        <img
                          src="/public/img/banner/sale-banner1.png"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                        />
                      </div>
                    </div>
                    <div
                      className="slick-slide slick-active"
                      data-slick-index={3}
                      aria-hidden="false"
                      style={{ width: 305 }}
                      tabIndex={-1}
                      role="option"
                    >
                      <div className="item-bannerqc1">
                        <img
                          src="/public/img/banner/sale-banner2.png"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                        />
                      </div>
                    </div>
                    <div
                      className="slick-slide"
                      data-slick-index={4}
                      aria-hidden="true"
                      style={{ width: 305 }}
                      tabIndex={-1}
                      role="option"
                    >
                      <div className="item-bannerqc1">
                        <img
                          src="thumb/319x242/1/upload/hinhanh/027221691090315vi0.jpg"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                        />
                      </div>
                    </div>
                    <div
                      className="slick-slide"
                      data-slick-index={5}
                      aria-hidden="true"
                      style={{ width: 305 }}
                      tabIndex={-1}
                      role="option"
                    >
                      <div className="item-bannerqc1">
                        <img
                          src="thumb/319x242/1/upload/hinhanh/088809919436930vi0.jpg"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                        />
                      </div>
                    </div>
                    <div
                      className="slick-slide slick-cloned"
                      data-slick-index={6}
                      aria-hidden="true"
                      style={{ width: 305 }}
                      tabIndex={-1}
                    >
                      <div className="item-bannerqc1">
                        <img
                          src="thumb/319x242/1/upload/hinhanh/103253521035061vi0.png"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                        />
                      </div>
                    </div>
                    <div
                      className="slick-slide slick-cloned"
                      data-slick-index={7}
                      aria-hidden="true"
                      style={{ width: 305 }}
                      tabIndex={-1}
                    >
                      <div className="item-bannerqc1">
                        <img
                          src="thumb/319x242/1/upload/hinhanh/672516619237551vi0.jpg"
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* banner end */}
          </div>
        </div>
      </div>

      <div className="slideshow_second">
        <div style={{ padding: "15px" }}>
          <img
            style={{ width: "100%" }}
            src="/public/img/slideshow/slideshow1.png"
            alt="Công ty TNHH Phát Triển Tin Học Utech"
          />
        </div>
      </div>

      {/* slideshow-banner-container end*/}

      {/* bannerqc2 */}
      <div className="bannerqc2">
        <div className="wrap-content">
          <div className="slick-bannerqc2 none slick-initialized slick-slider">
            <div aria-live="polite" className="slick-list draggable">
              <div
                className="slick-track"
                style={{
                  opacity: 1,
                  width: "100%",
                  maxWidth: 1308,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 5,
                  transform: "translate3d(0px, 0px, 0px)",
                }}
                role="listbox"
              >
                <div
                  className="slick-slide slick-current slick-active"
                  data-slick-index={0}
                  aria-hidden="false"
                  style={{ height: 150, maxWidth: 318, width: "100%" }}
                  tabIndex={-1}
                  role="option"
                >
                  <div className="item-bannerqc2 effect-1">
                    <img
                      style={{ width: "100%" }}
                      src="/public/img/banner/bannerqc2-1.png"
                      alt="Công ty TNHH Phát Triển Tin Học Utech"
                    />
                  </div>
                </div>
                <div
                  className="slick-slide slick-active"
                  data-slick-index={1}
                  aria-hidden="false"
                  style={{ height: 150, maxWidth: 318, width: "100%" }}
                  tabIndex={-1}
                  role="option"
                >
                  <div className="item-bannerqc2 effect-1">
                    <img
                      style={{ width: "100%" }}
                      src="/public/img/banner/bannerqc2-2.png"
                      alt="Công ty TNHH Phát Triển Tin Học Utech"
                    />
                  </div>
                </div>
                <div
                  className="slick-slide slick-active"
                  data-slick-index={2}
                  aria-hidden="false"
                  style={{ height: 150, maxWidth: 318, width: "100%" }}
                  tabIndex={-1}
                  role="option"
                >
                  <div className="item-bannerqc2 effect-1">
                    <img
                      style={{ width: "100%" }}
                      src="/public/img/banner/bannerqc2-3.png"
                      alt="Công ty TNHH Phát Triển Tin Học Utech"
                    />
                  </div>
                </div>
                <div
                  className="slick-slide slick-active"
                  data-slick-index={3}
                  aria-hidden="false"
                  style={{ height: 150, maxWidth: 318, width: "100%" }}
                  tabIndex={-1}
                  role="option"
                >
                  <div className="item-bannerqc2 effect-1">
                    <img
                      style={{ width: "100%" }}
                      src="/public/img/banner/bannerqc2-4.png"
                      alt="Công ty TNHH Phát Triển Tin Học Utech"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* bannerqc2 end */}

      {/* content */}

      <div className="wrap-main wrap-home">
        {/* categories-list-content */}
        <div className="wrap-prolistnb">
          <div className="wrap-content">
            <div className="slick-prolistnb none slick-initialized slick-slider">
              <div aria-live="polite" className="slick-list draggable">
                <div
                  className="slick-track"
                  style={{
                    opacity: 1,
                    width: "100%",
                    maxWidth: 1330,
                    display: "flex",
                    transform: "translate3d(0px, 0px, 0px)",
                  }}
                  role="listbox"
                >
                  {danhMuc.length > 0 ? (
                    danhMuc.slice(0, 10).map((danhmuc) => (
                      <div
                        className="slick-slide slick-current slick-active"
                        data-slick-index={0}
                        aria-hidden="false"
                        style={{ height: 125, width: 103 }}
                        tabIndex={-1}
                        role="option"
                        key={danhmuc.id}
                      >
                        <div className="item-prolistnb">
                          <Link
                            to={`/sanPham/id_danhmuc/${danhmuc.id}`}
                            className="prolistnb-img d-inline-block"
                            href="#"
                          >
                            <img
                              src={`/img/danhmuc/${danhmuc.hinhanh}`}
                              alt="hinhanhdm"
                            />
                          </Link>

                          <div className="info-prolistnb">
                            <a
                              className="name-prolistnb d-block"
                              href="#"
                              title=""
                              tabIndex={0}
                            >
                              {danhmuc.tendm}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Đang tải danh mục...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* categories-list-content end*/}

        {/* hot-products */}
        <div className="wrap-bestsell">
          <div className="title-bestsell">SẢN PHẨM BÁN CHẠY</div>
          <div className="bestsell-products">
            {hotProducts.map((product) => (
              <div className="product" key={product.id}>
                <div className="box-product">
                  <div className="pic-product">
                    <Link to={`/chitietsp/sanPham/${product.id}`}>
                    <img
                              src={`/img/sanpham/${product.hinh_anh.chinh}`}
                              alt={`${product.ten_sp}`}
                              className="w100 trans03"
                            />
                    </Link>
                  </div>
                  <div className="info-product">
                    <Link
                      to={`/chitietsp/sanPham/${product.id}`}
                      className="name-product"
                    >
                      {product.ten_sp}
                    </Link>
                    <div className="price-product">{product.gia_sp}đ</div>
                    <div className="cart-product">
                      <span className="status-pro">Còn hàng</span>
                      <span
                        className="mua_giohang"
                        onClick={() => handleAddToCart(product)}
                      >
                        MUA NGAY
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* hot-products end */}

        {/* promotional-products */}

        {/* promotional-products end */}

        {/* products 1 */}
        <div className="sub_main" id="scroll0" style={{ marginBottom: 50 }}>
          <div className="wrap-content">
            <div className="title_main">
              <div>
                <span>LAPTOP</span>
                <ul>
                  {sanPhamdm1.length > 0 &&
                    // Extract unique brand names from sanPhamdm1
                    [
                      ...new Set(
                        sanPhamdm1.map((sanpham) => sanpham.thuong_hieu)
                      ),
                    ].map((brand, index) => (
                      <li key={index}>
                        <Link
                          to={`/sanPham/id_danhmuc/${sanPhamdm1[0].id_danhmuc}/thuong_hieu/${brand}`}
                          title={`Sản phẩm ${brand}`}
                        >
                          {brand}
                        </Link>
                      </li>
                    ))}
                </ul>

               
              </div>
            </div>
            <div className="hidden_tab" id="splist11" rel={11} title="LAPTOP">
              <div className="grid-products">
                {sanPhamdm1.length > 0 ? (
                  sanPhamdm1.map((sanpham, index) => (
                    <div className="product" key={index}>
                      <div className="box-product">
                        <div className="pic-product" data-tooltip="sticky7385">
                          <Link
                            to={`/chitietsp/sanPham/${sanpham.id}`}
                            className="d-block"
                            href=""
                            title={`${sanpham.ten_sp}`}
                          >
                            <img
                              src={`/img/sanpham/${sanpham.hinh_anh.chinh}`}
                              alt={`${sanpham.ten_sp}`}
                              className="w100 trans03"
                            />
                          
                          </Link>

                          <div className="hot-icon blink" />
                          <div className="desc-product">
                            <div>
                              <ul>
                                <li>{sanpham.cau_hinh.cpu}</li>
                                <li>{sanpham.cau_hinh.ram}</li>
                                <li>{sanpham.cau_hinh.ocung}</li>
                                <li>{sanpham.cau_hinh.vga}</li>
                                <li>{sanpham.cau_hinh.man_hinh}</li>
                                {/* <li>{sanpham.cau_hinh_chi_tiet.pin}</li> */}
                                {/* <li>{sanpham.cau_hinh_chi_tiet.mau_sac}</li> */}
                                {/* <li>{sanpham.cau_hinh_chi_tiet.trong_luong}</li> */}
                                {/* <li>
                                  {sanpham.cau_hinh_chi_tiet.he_dieu_hanh}
                                </li> */}
                              </ul>
                              <p>&nbsp;</p>
                              <div className="baohanh ">{sanpham.bao_hanh}</div>
                            </div>
                          </div>
                        </div>
                        <div className="info-product">
                          <Link
                            to={`/chitietsp/sanPham/${sanpham.id}`}
                            className="name-product text-split"
                            href=""
                            title={`${sanpham.ten_sp}`}
                          >
                            {sanpham.ten_sp}
                          </Link>
                          <div className="price-product">
                            <span className="price-new">{sanpham.gia_sp}đ</span>
                          </div>
                          <div className="cart-product d-flex flex-wrap justify-content-between align-items-center">
                            <span className="status-pro sts2">Còn hàng</span>
                            <span
                              className="mua_giohang"
                              rel={7385}
                              data-confirm=""
                              onClick={() => handleAddToCart(sanpham)}
                            >
                              Mua ngay
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Sản phẩm đang trong quá trình cập nhật...</p>
                )}
              </div>
             
            </div>
          </div>
        </div>
        {/* products 1 end*/}

        {/* products 2 */}
        <div className="sub_main" id="scroll0" style={{ marginBottom: 50 }}>
          <div className="wrap-content">
            <div className="title_main">
              <div>
                <span>PC</span>
                <ul>
                  {sanPhamdm2.length > 0 &&
                    // Extract unique brand names from sanPhamdm2
                    [
                      ...new Set(
                        sanPhamdm2.map((sanpham) => sanpham.thuong_hieu)
                      ),
                    ].map((brand, index) => (
                      <li key={index}>
                        <Link
                          to={`/sanPham/id_danhmuc/${sanPhamdm2[0].id_danhmuc}/thuong_hieu/${brand}`}
                          title={`Sản phẩm ${brand}`}
                        >
                          {brand}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="hidden_tab" id="splist11" rel={11} title="LAPTOP">
              <div className="grid-products">
                {sanPhamdm2.length > 0 ? (
                  sanPhamdm2.map((sanpham, index) => (
                    <div className="product" key={index}>
                      <div className="box-product">
                        <div className="pic-product" data-tooltip="sticky7385">
                          <Link
                            to={`/chitietsp/sanPham/${sanpham.id}`}
                            className="d-block"
                            href=""
                            title={`${sanpham.ten_sp}`}
                          >
                            <img
                              src={`/img/sanpham/${sanpham.hinh_anh.chinh}`}
                              alt={`${sanpham.ten_sp}`}
                              className="w100 trans03"
                            />
                          </Link>

                          <div className="hot-icon blink" />
                          <div className="desc-product">
                            <div>
                              <ul>
                                <li>Mainboard: {sanpham.cau_hinh.mainboard}</li>
                                <li>CPU: {sanpham.cau_hinh.cpu}</li>
                                <li>RAM: {sanpham.cau_hinh.ram}</li>
                                <li>VGA: {sanpham.cau_hinh.vga}</li>
                                <li>HDD: {sanpham.cau_hinh.hdd}</li>
                                <li>SSD: {sanpham.cau_hinh.ssd}</li>
                                <li>PSU: {sanpham.cau_hinh.psu}</li>
                                <li>Case: {sanpham.cau_hinh.case}</li>
                                <li>Cooling: {sanpham.cau_hinh.cooling}</li>
                              </ul>
                              <p>&nbsp;</p>
                              <div className="baohanh ">{sanpham.bao_hanh}</div>
                            </div>
                          </div>
                        </div>
                        <div className="info-product">
                          <Link
                            to="/chitietsp"
                            className="name-product text-split"
                            href=""
                            title={`${sanpham.ten_sp}`}
                          >
                            {sanpham.ten_sp}
                          </Link>
                          <div className="price-product">
                            <span className="price-new">{sanpham.gia_sp}đ</span>
                          </div>
                          <div className="cart-product d-flex flex-wrap justify-content-between align-items-center">
                            <span className="status-pro sts2">Còn hàng</span>
                            <span
                              className="mua_giohang"
                              rel={7385}
                              data-confirm=""
                              onClick={() => handleAddToCart(sanpham)}
                            >
                              Mua ngay
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Sản phẩm đang trong quá trình cập nhật...</p>
                )}
              </div>
              {/* <div className="pagination" style={{ marginTop: 0 }}>
                <ul className="my_pagination">
                  <li className="inactive">
                    <span> &lt;&lt; </span>
                  </li>
                  <li className="actived">
                    <a>1</a>
                  </li>
                  <li className="active">
                    <a>2</a>
                  </li>
                  <li className="active">
                    <span> &gt;&gt; </span>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
        {/* products 2 end*/}

        {/* products 3 */}
        <div className="sub_main" id="scroll0" style={{ marginBottom: 50 }}>
          <div className="wrap-content">
            <div className="title_main">
              <div>
                <span>Màn hình</span>
                <ul>
                  {sanPhamdm3.length > 0 &&
                    // Extract unique brand names from sanPhamdm3
                    [
                      ...new Set(
                        sanPhamdm3.map((sanpham) => sanpham.thuong_hieu)
                      ),
                    ].map((brand, index) => (
                      <li key={index}>
                        <Link
                          to={`/sanPham/id_danhmuc/${sanPhamdm3[0].id_danhmuc}/thuong_hieu/${brand}`}
                          title={`Sản phẩm ${brand}`}
                        >
                          {brand}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="hidden_tab" id="splist11" rel={11} title="LAPTOP">
              <div className="grid-products">
                {sanPhamdm3.length > 0 ? (
                  sanPhamdm3.map((sanpham, index) => (
                    <div className="product" key={index}>
                      <div className="box-product">
                        <div className="pic-product" data-tooltip="sticky7385">
                          <Link
                            to={`/chitietsp/sanPham/${sanpham.id}`}
                            className="d-block"
                            href=""
                            title={`${sanpham.ten_sp}`}
                          >
                            <img
                              src={`/img/sanpham/${sanpham.hinh_anh.chinh}`}
                              alt={`${sanpham.ten_sp}`}
                              className="w100 trans03"
                            />
                          </Link>

                          <div className="hot-icon blink" />
                          <div className="desc-product">
                            <div>
                              <ul>
                                <li>
                                  Kiểu màn hình:{" "}
                                  {sanpham.cau_hinh.kieu_man_hinh}
                                </li>
                                <li>
                                  Kích thước: {sanpham.cau_hinh.kich_thuoc}
                                </li>
                                <li>
                                  Tương thích VESA:{" "}
                                  {sanpham.cau_hinh.tuong_thich_vesa}
                                </li>
                                <li>
                                  Cổng kết nối: {sanpham.cau_hinh.cong_ket_noi}
                                </li>
                                <li>
                                  Tần số quét: {sanpham.cau_hinh.tan_so_quet}
                                </li>
                                <li>
                                  Độ phân giải: {sanpham.cau_hinh.do_phan_giai}
                                </li>
                                <li>Tấm nền: {sanpham.cau_hinh.tam_nen}</li>
                                <li>
                                  Không gian màu:{" "}
                                  {sanpham.cau_hinh.khong_gian_mau}
                                </li>
                                <li>
                                  Phụ kiện trong hộp:{" "}
                                  {sanpham.cau_hinh.phu_kien_trong_hop || "N/A"}
                                </li>
                                <li>
                                  Thời gian phản hồi:{" "}
                                  {sanpham.cau_hinh.thoi_gian_phan_hoi}
                                </li>
                                <li>Độ sáng: {sanpham.cau_hinh.do_sang}</li>
                              </ul>
                              <p>&nbsp;</p>
                              <div className="baohanh ">Bảo hành: 12 tháng</div>
                            </div>
                          </div>
                        </div>
                        <div className="info-product">
                          <Link
                            to="/chitietsp"
                            className="name-product text-split"
                            href=""
                            title={`${sanpham.ten_sp}`}
                          >
                            {sanpham.ten_sp}
                          </Link>
                          <div className="price-product">
                            <span className="price-new">{sanpham.gia_sp}đ</span>
                          </div>
                          <div className="cart-product d-flex flex-wrap justify-content-between align-items-center">
                            <span className="status-pro sts2">Còn hàng</span>
                            <span
                              className="mua_giohang"
                              rel={7385}
                              data-confirm=""
                              onClick={() => handleAddToCart(sanpham)}
                            >
                              Mua ngay
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Sản phẩm đang trong quá trình cập nhật...</p>
                )}
              </div>
           
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
