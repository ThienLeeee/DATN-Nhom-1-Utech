import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchSanpham } from "../../../service/sanphamService";
import { fetchDanhmuc } from "../../../service/danhmucService";
import { useNavigate } from "react-router-dom";

export default function Trangchu() {
  const [sanPham, setSanpham] = useState([]);

  useEffect(() => {
    const loadSanpham = async () => {
      try {
        const sanPham = await fetchSanpham();
        setSanpham(sanPham);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };
    loadSanpham();
  }, []);

  const [danhMuc, setDanhmuc] = useState([]);

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
  }, []);
  const navigate = useNavigate();
  const handleAddToCart = (sanPham) => {
    localStorage.setItem("cartItem", JSON.stringify(sanPham));
    navigate("/giohang"); // Chuyển hướng sang Giohang.jsx
  };

  // Lọc sản phẩm theo categoryId
  const sanPhamdm1 = sanPham.filter((sanpham) => sanpham.id_danhmuc === 1);
  const sanPhamdm2 = sanPham.filter((sanpham) => sanpham.id_danhmuc === 2);
  const sanPhamdm3 = sanPham.filter((sanpham) => sanpham.id_danhmuc === 3);

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
                      style={{ width: 735 }}
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
                      style={{ width: 735 }}
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
                      style={{ width: 735 }}
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
                      style={{ width: 735 }}
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
                      style={{ width: 735 }}
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
                      style={{ width: 735 }}
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
                      style={{ width: 735 }}
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
                      style={{ width: 735 }}
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
                      style={{ width: 735 }}
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
                      style={{ width: 735 }}
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
                  width: 1308,
                  transform: "translate3d(0px, 0px, 0px)",
                }}
                role="listbox"
              >
                <div
                  className="slick-slide slick-current slick-active"
                  data-slick-index={0}
                  aria-hidden="false"
                  style={{ height: 150, width: 320 }}
                  tabIndex={-1}
                  role="option"
                >
                  <div className="item-bannerqc2 effect-1">
                    <img
                      src="/public/img/banner/bannerqc2-1.png"
                      alt="Công ty TNHH Phát Triển Tin Học Utech"
                    />
                  </div>
                </div>
                <div
                  className="slick-slide slick-active"
                  data-slick-index={1}
                  aria-hidden="false"
                  style={{ height: 150, width: 320 }}
                  tabIndex={-1}
                  role="option"
                >
                  <div className="item-bannerqc2 effect-1">
                    <img
                      src="/public/img/banner/bannerqc2-2.png"
                      alt="Công ty TNHH Phát Triển Tin Học Utech"
                    />
                  </div>
                </div>
                <div
                  className="slick-slide slick-active"
                  data-slick-index={2}
                  aria-hidden="false"
                  style={{ height: 150, width: 320 }}
                  tabIndex={-1}
                  role="option"
                >
                  <div className="item-bannerqc2 effect-1">
                    <img
                      src="/public/img/banner/bannerqc2-3.png"
                      alt="Công ty TNHH Phát Triển Tin Học Utech"
                    />
                  </div>
                </div>
                <div
                  className="slick-slide slick-active"
                  data-slick-index={3}
                  aria-hidden="false"
                  style={{ height: 150, width: 320 }}
                  tabIndex={-1}
                  role="option"
                >
                  <div className="item-bannerqc2 effect-1">
                    <img
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
                    width: 1330,
                    transform: "translate3d(0px, 0px, 0px)",
                  }}
                  role="listbox"
                >
                  {danhMuc.length > 0 ? (
                    danhMuc.slice(0, 5).map((danhmuc) => (
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
                    <p>Đang tải danh mục...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* categories-list-content end*/}

        {/* hot-products */}
        <div className="wrap-bestseller">
          <div className="wrap-content">
            <div className="boxBestseller">
              <div className="title-bestseller">
                <span>Sản phẩm bán chạy</span>
              </div>
              <div
                className="slick-product none slick-initialized slick-slider slick-dotted"
                role="toolbar"
              >
                <div
                  aria-live="polite"
                  className="slick-list draggable"
                  style={{ height: 400 }}
                >
                  <div
                    className="slick-track"
                    style={{ opacity: 1, width: 1336 }}
                    role="listbox"
                  >
                    <div
                      className="product  slick-slide"
                      data-slick-index={8}
                      aria-hidden="true"
                      style={{ height: 250, width: 247 }}
                      tabIndex={-1}
                      role="option"
                      aria-describedby="slick-slide51"
                    >
                      <div className="box-product">
                        <div className="pic-product" data-tooltip="sticky5998">
                          <a
                            className="d-block"
                            href="san-pham/man-hinh-lcd-hp-m24fw-2e2y5aa-5998.html"
                            title="MÀN HÌNH LCD HP M24FW 2E2Y5AA"
                            tabIndex={-1}
                          >
                            <img
                              src="/public/img/products/Laptop-Dell-Vostro-3530.png"
                              alt="MÀN HÌNH LCD HP M24FW 2E2Y5AA"
                              className="w100 trans03"
                            />
                          </a>
                          <div className="hot-icon blink" />
                          <div className="desc-product">
                            <div>
                              <div>Kích thước màn hình: 24 inch</div>
                              <div>Độ phân giải: Full HD (1920×1080)</div>
                              <div>Loại màn hình: Màn hình phẳng</div>
                              <div>Tấm nền: IPS</div>
                              <div>Tần số: 75Hz</div>
                              <div>
                                Kết nối: 1 VGA; 1 HDMI 1.4 (with HDCP support)
                              </div>
                              <div
                                data-original-title=""
                                id="mttContainer"
                                title=""
                              >
                                &nbsp;
                              </div>
                              <div className="baohanh ">Bảo hành: 36 tháng</div>
                            </div>
                          </div>
                        </div>
                        <div className="info-product">
                          <a
                            className="name-product text-split"
                            href="san-pham/man-hinh-lcd-hp-m24fw-2e2y5aa-5998.html"
                            title="MÀN HÌNH LCD HP M24FW 2E2Y5AA"
                            tabIndex={-1}
                          >
                            MÀN HÌNH LCD HP M24FW 2E2Y5AA
                          </a>
                          <div className="price-product">
                            <span className="price-new">Liên hệ</span>
                          </div>
                          <div className="cart-product d-flex justify-content-between align-items-center">
                            <span className="status-pro sts2">Còn hàng</span>
                            <span
                              className="mua_giohang"
                              rel={5998}
                              data-confirm=""
                              onClick="new jBox()"
                            >
                              Mua ngay
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* hot-products end */}

        {/* products 1 */}
        <div className="sub_main" id="scroll0" style={{ marginBottom: 50 }}>
          <div className="wrap-content">
            <div className="title_main">
              <div>
                <span style={{}}>LAPTOP</span>
                <ul>
                  <li>
                    <a href="" title="LAPTOP LG">
                      LAPTOP ASUS
                    </a>
                  </li>
                  <li>
                    <a href="" title="LAPTOP ASUS">
                      LAPTOP ACER
                    </a>
                  </li>
                  <li>
                    <a href="" title="LAPTOP LENOVO">
                      LAPTOP MSI
                    </a>
                  </li>
                  <li>
                    <a href="" title="LAPTOP HP">
                      LAPTOP LENOVO
                    </a>
                  </li>
                  <li>
                    <a href="" title="LAPTOP DELL">
                      LAPTOP DELL
                    </a>
                  </li>
                </ul>

                <Link to="/sanPham/id_danhmuc/1" className="viewmore">
                  Xem tất cả
                </Link>
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
                              src={`/img/sanpham/Laptop/${sanpham.hinh_anh.chinh}`}
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
                                <li>{sanpham.cau_hinh_chi_tiet.pin}</li>
                                <li>{sanpham.cau_hinh_chi_tiet.mau_sac}</li>
                                <li>{sanpham.cau_hinh_chi_tiet.trong_luong}</li>
                                <li>
                                  {sanpham.cau_hinh_chi_tiet.he_dieu_hanh}
                                </li>
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
                              onClick={() => handleAddToCart(sanPham)}
                            >
                              Mua ngay
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Đang tải sản phẩm Laptop...</p>
                )}
              </div>
              <div className="pagination" style={{ marginTop: 0 }}>
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
                  <li>
                    <a href="san-pham/laptop-asus-18/" title="LAPTOP ASUS">
                      PC INTEL
                    </a>
                  </li>

                  <li>
                    <a href="san-pham/laptop-hp-16/" title="LAPTOP HP">
                      PC AMD
                    </a>
                  </li>
                </ul>
                <a href="/sanPham/id_danhmuc/2" className="viewmore">
                  {" "}
                  Xem tất cả
                </a>
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
                              src={`/img/sanpham/PC/${sanpham.hinh_anh.chinh}`}
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
                              onClick="new jBox()"
                            >
                              Mua ngay
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Đang tải sản phẩm PC...</p>
                )}
              </div>
              <div className="pagination" style={{ marginTop: 0 }}>
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
              </div>
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
                  <li>
                    <a href="san-pham/laptop-lg-173/" title="LAPTOP LG">
                      MÀN HÌNH LG
                    </a>
                  </li>
                  <li>
                    <a href="san-pham/laptop-asus-18/" title="LAPTOP ASUS">
                      MÀN HÌNH ASUS
                    </a>
                  </li>
                  <li>
                    <a href="san-pham/laptop-dell-15/" title="LAPTOP DELL">
                      MÀN HÌNH DELL
                    </a>
                  </li>
                </ul>
                <a href="/sanPham/id_danhmuc/3" className="viewmore">
                  {" "}
                  Xem tất cả
                </a>
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
                              src={`/img/sanpham/Manhinh/${sanpham.hinh_anh.chinh}`}
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
                              onClick="new jBox()"
                            >
                              Mua ngay
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Đang tải sản phẩm Màn hình...</p>
                )}
              </div>
              <div className="pagination" style={{ marginTop: 0 }}>
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
              </div>
            </div>
          </div>
        </div>
        {/* products 3 end*/}
      </div>
      {/* content */}
    </>
  );
}
