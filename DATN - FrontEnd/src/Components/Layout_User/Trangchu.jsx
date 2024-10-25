import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchSanpham } from "../../../service/sanphamService";
import { fetchDanhmuc } from "../../../service/danhmucService";

export default function Trangchu() {
  const [sanPham, setSanpham] = useState([]);
  const navigate = useNavigate();
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

  // Lọc sản phẩm theo categoryId
  const sanPhamdm1 = sanPham.filter((sanpham) => sanpham.id_danhMuc === 1);
  const sanPhamdm2 = sanPham.filter((sanpham) => sanpham.id_danhMuc === 2);

  return (
    <>
      {/* slideshow-banner-container */}
      <div className="slideshow">
        <div className="wrap-content d-flex justify-content-between">
          {/* empty-site */}
          <div className="slideshow-left"></div>
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
                            to="/sanphamtheodm"
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
                <span>LAPTOP</span>
                <ul>
                  <li>
                    <a href="san-pham/laptop-lg-173/" title="LAPTOP LG">
                      LAPTOP LG
                    </a>
                  </li>
                  <li>
                    <a href="san-pham/laptop-asus-18/" title="LAPTOP ASUS">
                      LAPTOP ASUS
                    </a>
                  </li>
                  <li>
                    <a href="san-pham/laptop-lenovo-17/" title="LAPTOP LENOVO">
                      LAPTOP LENOVO
                    </a>
                  </li>
                  <li>
                    <a href="san-pham/laptop-hp-16/" title="LAPTOP HP">
                      LAPTOP HP
                    </a>
                  </li>
                  <li>
                    <a href="san-pham/laptop-dell-15/" title="LAPTOP DELL">
                      LAPTOP DELL
                    </a>
                  </li>
                </ul>
                <a href="san-pham/laptop-11/" className="viewmore">
                  {" "}
                  Xem tất cả
                </a>
              </div>
            </div>
            <div className="hidden_tab" id="splist11" rel={11} title="LAPTOP">
              <div className="grid-products">
                <div className="product ">
                  <div className="box-product">
                    <div className="pic-product" data-tooltip="sticky7385">
                      <Link
                        to="/chitietsp"
                        className="d-block"
                        href=""
                        title="Laptop Dell Vostro 3530 V5I3465W1"
                      >
                        <img
                          src="/public/img/products/Laptop-Dell-Vostro-3530.png"
                          alt="Laptop Dell Vostro 3530 V5I3465W1"
                          className="w100 trans03"
                        />
                      </Link>
                      <div className="btntragop1" />{" "}
                      <div className="hot-icon blink" />
                      <div className="desc-product">
                        <div>
                          <ul>
                            <li>
                              CPU Intel Core i3-1305U (10MB, Up to 4.50GHz)
                            </li>
                            <li>RAM 8GB DDR4 2666MHz (1x8GB)</li>
                            <li>SSD 512GB M.2 PCIe NVMe</li>
                            <li>VGA Intel UHD Graphics</li>
                            <li>Display 15.6Inch FHD WVA Anti-Glare</li>
                            <li>Pin 3Cell 41WHrs</li>
                            <li>Color Titan Grey (Xám)</li>
                            <li>Weight 1.66 kg</li>
                            <li>OS Windows 11 Home + Office HS 2021</li>
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
                        title="Laptop Dell Vostro 3530 V5I3465W1"
                      >
                        Laptop Dell Vostro 3530 V5I3465W1
                      </Link>
                      <div className="price-product">
                        <span className="price-new">11.990.000 đ</span>
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
              </div>
              <div className="pagination" style={{ marginTop: 150 }}>
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

        {/* products 2*/}
        <div className="sub_main" id="scroll1" style={{ marginBottom: 50 }}>
          <div className="wrap-content">
            <div className="title_main">
              <div>
                <span>MÁY BỘ PC</span>
                <ul>
                  <li>
                    <a href="san-pham/may-bo-hp-82/" title="MÁY BỘ HP">
                      MÁY BỘ HP
                    </a>
                  </li>
                  <li>
                    <a
                      href="san-pham/may-bo-asus-mini-31/"
                      title="MÁY BỘ ASUS MINI"
                    >
                      MÁY BỘ ASUS MINI
                    </a>
                  </li>
                  <li>
                    <a href="san-pham/may-bo-dell-30/" title="MÁY BỘ DELL">
                      MÁY BỘ DELL
                    </a>
                  </li>
                  <li>
                    <a href="san-pham/may-bo-lenovo-29/" title="MÁY BỘ LENOVO">
                      MÁY BỘ LENOVO
                    </a>
                  </li>
                </ul>
                <a href="san-pham/may-bo-pc-14/" className="viewmore">
                  {" "}
                  Xem tất cả
                </a>
              </div>
            </div>
            <div
              className="hidden_tab"
              id="splist14"
              rel={14}
              title="MÁY BỘ PC"
            >
              <div className="grid-products">
                <div className="product ">
                  <div className="box-product">
                    <div className="pic-product" data-tooltip="sticky7431">
                      <a
                        className="d-block"
                        href=""
                        title="Máy tính để bàn PC Dell Vostro 3020T 6FM7X11"
                      >
                        <img
                          src="/public/img/products/PC-Dell-Vostro-3020T-6FM7X11.png"
                          alt="Máy tính để bàn PC Dell Vostro 3020T 6FM7X11"
                          className="w100 trans03"
                        />
                      </a>
                      <div className="desc-product">
                        <div>
                          <ul>
                            <li>
                              CPU Intel Core i5-13400 (20MB, Up to 4.50GHz)
                            </li>
                            <li>RAM 8GB DDR4 3200MHz</li>
                            <li>SSD 512GB M.2 PCIe NVMe</li>
                            <li>VGA Intel UHD Graphics 730</li>
                            <li>Color Black (Đen)</li>
                            <li>Wifi ax + BT, SDcard</li>
                            <li>Keyboard &amp; Mouse</li>
                            <li>Weight 7.46 kg</li>
                            <li>OS Windows 11 Home</li>
                          </ul>
                          <div className="baohanh ">Bảo hành: 12 tháng</div>
                        </div>
                      </div>
                    </div>
                    <div className="info-product">
                      <a
                        className="name-product text-split"
                        href=""
                        title="Máy tính để bàn PC Dell Vostro 3020T 6FM7X11"
                      >
                        Máy tính để bàn PC Dell Vostro 3020T 6FM7X11
                      </a>
                      <div className="price-product">
                        <span className="price-new">13.890.000 đ</span>
                      </div>
                      <div className="cart-product d-flex flex-wrap justify-content-between align-items-center">
                        <span className="status-pro sts2">Còn hàng</span>
                        <span
                          className="mua_giohang"
                          rel={7431}
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
              <div className="pagination" style={{ marginTop: 150 }}>
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
      </div>
      {/* content */}
    </>
  );
}
