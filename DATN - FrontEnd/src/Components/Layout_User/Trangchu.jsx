import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchSanpham } from "../../../service/sanphamService";
import { fetchDanhmuc } from "../../../service/danhmucService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatBox from "./ChatBox";
import "/public/css/trangchu.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
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
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const { user } = useAuth();

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/wishlist/${user.username}`
          );
          setWishlist(response.data);
        } catch (error) {
          console.error("Lỗi khi lấy danh sách yêu thích:", error);
        }
      }
    };

    fetchWishlist();
  }, [user]);

  const handleAddToWishlist = async (product) => {
    if (!user) {
      toast.warning(
        "Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích!",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      return;
    }

    const isProductInWishlist = wishlist.some((item) => item.id === product.id);

    if (isProductInWishlist) {
      toast.info("Sản phẩm đã có trong danh sách yêu thích!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/wishlist/add", {
        username: user.username,
        product,
      });

      setWishlist([...wishlist, product]);
      toast.success("Đã thêm sản phẩm vào danh sách yêu thích!");
    } catch (error) {
      console.error("Lỗi khi thêm vào danh sách yêu thích:", error);
      toast.error("Có lỗi xảy ra khi thêm sản phẩm vào danh sách yêu thích!");
    }
  };

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
          "http://localhost:3000/api/sanPham/khuyen-mai"
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
    if (sanPhamMoi.trang_thai !== "Còn hàng") {
      Swal.fire("Thông báo", "Sản phẩm đã hết hàng", "warning");
      return;
    }

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

    navigate("/thanhtoan");
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

  // Thêm hàm tính % giảm giá
  const calculateDiscount = (originalPrice, discountedPrice) => {
    const original = parseInt(originalPrice.replace(/\./g, ""));
    const discounted = parseInt(discountedPrice.replace(/\./g, ""));
    const discount = Math.round(((original - discounted) / original) * 100);
    return discount;
  };

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
                  <div
                    className="pic-product"
                    data-tooltip={`sticky${product.id}`}
                  >
                    <Link
                      to={`/chitietsp/sanPham/${product.id}`}
                      className="d-block"
                      title={product.ten_sp}
                    >
                      <img
                        src={`/img/sanpham/${product.hinh_anh.chinh}`}
                        alt={product.ten_sp}
                        className="w100 trans03"
                      />
                    </Link>

                    <div className="hot-icon blink" />
                    <div className="desc-product">
                      <div>
                        <ul>
                          {product.id_danhmuc === 1 ? (
                            // Laptop specs
                            <>
                              <li>{product.cau_hinh.cpu}</li>
                              <li>{product.cau_hinh.ram}</li>
                              <li>{product.cau_hinh.ocung}</li>
                              <li>{product.cau_hinh.vga}</li>
                              <li>{product.cau_hinh.man_hinh}</li>
                            </>
                          ) : product.id_danhmuc === 2 ? (
                            // PC specs
                            <>
                              <li>Mainboard: {product.cau_hinh.mainboard}</li>
                              <li>CPU: {product.cau_hinh.cpu}</li>
                              <li>RAM: {product.cau_hinh.ram}</li>
                              <li>VGA: {product.cau_hinh.vga}</li>
                              <li>HDD: {product.cau_hinh.hdd}</li>
                              <li>SSD: {product.cau_hinh.ssd}</li>
                              <li>PSU: {product.cau_hinh.psu}</li>
                              <li>Case: {product.cau_hinh.case}</li>
                            </>
                          ) : (
                            // Monitor specs
                            <>
                              <li>
                                Kiểu màn hình: {product.cau_hinh.kieu_man_hinh}
                              </li>
                              <li>Kích thước: {product.cau_hinh.kich_thuoc}</li>
                              <li>
                                Độ phân giải: {product.cau_hinh.do_phan_giai}
                              </li>
                              <li>
                                Tần số quét: {product.cau_hinh.tan_so_quet}
                              </li>
                              <li>Tấm nền: {product.cau_hinh.tam_nen}</li>
                            </>
                          )}
                        </ul>
                        <p>&nbsp;</p>
                        <div className="baohanh">{product.bao_hanh}</div>
                      </div>
                    </div>
                  </div>
                  <div className="info-product">
                    <Link
                      to={`/chitietsp/sanPham/${product.id}`}
                      className="name-product text-split"
                      title={product.ten_sp}
                    >
                      {product.ten_sp}
                    </Link>
                    <div
                      className="price-product d-flex justify-content-between"
                      style={{ margin: "8px 0", textAlign: "left" }}
                    >
                      {product.giam_gia ? (
                        <div
                          className="price-wrapper"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                          }}
                        >
                          <div
                            style={{
                              textDecoration: "line-through",
                              color: "#707070",
                              fontSize: "14px",
                              fontWeight: "normal",
                            }}
                          >
                            {product.gia_sp}đ
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <div
                              style={{
                                color: "#d70018",
                                fontSize: "16px",
                                fontWeight: "500",
                              }}
                            >
                              {product.giam_gia}đ
                            </div>
                            <div
                              style={{
                                color: "#fff",
                                fontSize: "12px",
                                background: "#d70018",
                                padding: "0 6px",
                                borderRadius: "3px",
                                fontWeight: "500",
                                height: "20px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              -
                              {calculateDiscount(
                                product.gia_sp,
                                product.giam_gia
                              )}
                              %
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span
                          style={{
                            color: "#d70018",
                            fontSize: "16px",
                            fontWeight: "500",
                          }}
                        >
                          {product.gia_sp}đ
                        </span>
                      )}
                      <button
                        className="wishlist-btn "
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToWishlist(product);
                        }}
                        title="Thêm vào yêu thích"
                      >
                        <i
                          style={{ color: "red", fontSize: "25px" }}
                          className={`fas fa-heart ${
                            wishlist.some((w) => w.id === product.id)
                              ? "active"
                              : ""
                          }`}
                        ></i>
                      </button>
                    </div>
                    <div
                      className="cart-product d-flex flex-wrap justify-content-between align-items-center"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <span
                        className="status-pro sts2"
                        style={{
                          fontSize: "13px",
                          color:
                            product.trang_thai === "Còn hàng"
                              ? "#32CD32"
                              : "red",
                          fontWeight: "400",
                          position: "relative",
                          paddingLeft: "15px",
                          border: `1px solid ${
                            product.trang_thai === "Còn hàng"
                              ? "#32CD32"
                              : "red"
                          }`,
                          borderRadius: "4px",
                          padding: "4px 8px 4px 20px",
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor:
                              product.trang_thai === "Còn hàng"
                                ? "#32CD32"
                                : "red",
                            position: "absolute",
                            left: "8px",
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                        ></span>
                        {product.trang_thai}
                      </span>

                      <span
                        className="mua_giohang"
                        onClick={() => handleAddToCart(product)}
                      >
                        Mua ngay
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
                          <div
                            className="price-product d-flex justify-content-between"
                            style={{ margin: "8px 0", textAlign: "left" }}
                          >
                            {sanpham.giam_gia ? (
                              <div
                                className="price-wrapper"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "2px",
                                }}
                              >
                                <div
                                  style={{
                                    textDecoration: "line-through",
                                    color: "#707070",
                                    fontSize: "14px",
                                    fontWeight: "normal",
                                  }}
                                >
                                  {sanpham.gia_sp}đ
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#d70018",
                                      fontSize: "16px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {sanpham.giam_gia}đ
                                  </div>
                                  <div
                                    style={{
                                      color: "#fff",
                                      fontSize: "12px",
                                      background: "#d70018",
                                      padding: "0 6px",
                                      borderRadius: "3px",
                                      fontWeight: "500",
                                      height: "20px",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    -
                                    {calculateDiscount(
                                      sanpham.gia_sp,
                                      sanpham.giam_gia
                                    )}
                                    %
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <span
                                style={{
                                  color: "#d70018",
                                  fontSize: "16px",
                                  fontWeight: "500",
                                }}
                              >
                                {sanpham.gia_sp}đ
                              </span>
                            )}
                            <button
                              className="wishlist-btn "
                              onClick={(e) => {
                                e.preventDefault();
                                handleAddToWishlist(sanpham);
                              }}
                              title="Thêm vào yêu thích"
                            >
                              <i
                                style={{ color: "red", fontSize: "20px" }}
                                className={`fas fa-heart ${
                                  wishlist.some((w) => w.id === sanpham.id)
                                    ? "active"
                                    : ""
                                }`}
                              ></i>
                            </button>
                          </div>
                          <div
                            className="cart-product d-flex flex-wrap justify-content-between align-items-center"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <span
                              className="status-pro sts2"
                              style={{
                                fontSize: "13px",
                                color:
                                  sanpham.trang_thai === "Còn hàng"
                                    ? "#32CD32"
                                    : "red",
                                fontWeight: "400",
                                position: "relative",
                                paddingLeft: "15px",
                                border: `1px solid ${
                                  sanpham.trang_thai === "Còn hàng"
                                    ? "#32CD32"
                                    : "red"
                                }`,
                                borderRadius: "4px",
                                padding: "4px 8px 4px 20px",
                                display: "inline-flex",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "50%",
                                  backgroundColor:
                                    sanpham.trang_thai === "Còn hàng"
                                      ? "#32CD32"
                                      : "red",
                                  position: "absolute",
                                  left: "8px",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                }}
                              ></span>
                              {sanpham.trang_thai}
                            </span>

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
                          <div
                            className="price-product d-flex justify-content-between"
                            style={{ margin: "8px 0", textAlign: "left" }}
                          >
                            {sanpham.giam_gia ? (
                              <div
                                className="price-wrapper"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "2px",
                                }}
                              >
                                <div
                                  style={{
                                    textDecoration: "line-through",
                                    color: "#707070",
                                    fontSize: "14px",
                                    fontWeight: "normal",
                                  }}
                                >
                                  {sanpham.gia_sp}đ
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#d70018",
                                      fontSize: "16px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {sanpham.giam_gia}đ
                                  </div>
                                  <div
                                    style={{
                                      color: "#fff",
                                      fontSize: "12px",
                                      background: "#d70018",
                                      padding: "0 6px",
                                      borderRadius: "3px",
                                      fontWeight: "500",
                                      height: "20px",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    -
                                    {calculateDiscount(
                                      sanpham.gia_sp,
                                      sanpham.giam_gia
                                    )}
                                    %
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <span
                                style={{
                                  color: "#d70018",
                                  fontSize: "16px",
                                  fontWeight: "500",
                                }}
                              >
                                {sanpham.gia_sp}đ
                              </span>
                            )}
                            <button
                              className="wishlist-btn "
                              onClick={(e) => {
                                e.preventDefault();
                                handleAddToWishlist(sanpham);
                              }}
                              title="Thêm vào yêu thích"
                            >
                              <i
                                style={{ color: "red", fontSize: "20px" }}
                                className={`fas fa-heart ${
                                  wishlist.some((w) => w.id === sanpham.id)
                                    ? "active"
                                    : ""
                                }`}
                              ></i>
                            </button>
                          </div>
                          <div
                            className="cart-product d-flex flex-wrap justify-content-between align-items-center"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <span
                              className="status-pro sts2"
                              style={{
                                fontSize: "13px",
                                color:
                                  sanpham.trang_thai === "Còn hàng"
                                    ? "#32CD32"
                                    : "red",
                                fontWeight: "400",
                                position: "relative",
                                paddingLeft: "15px",
                                border: `1px solid ${
                                  sanpham.trang_thai === "Còn hàng"
                                    ? "#32CD32"
                                    : "red"
                                }`,
                                borderRadius: "4px",
                                padding: "4px 8px 4px 20px",
                                display: "inline-flex",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "50%",
                                  backgroundColor:
                                    sanpham.trang_thai === "Còn hàng"
                                      ? "#32CD32"
                                      : "red",
                                  position: "absolute",
                                  left: "8px",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                }}
                              ></span>
                              {sanpham.trang_thai}
                            </span>
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
                          <div
                            className="price-product d-flex justify-content-between"
                            style={{ margin: "8px 0", textAlign: "left" }}
                          >
                            {sanpham.giam_gia ? (
                              <div
                                className="price-wrapper"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "2px",
                                }}
                              >
                                <div
                                  style={{
                                    textDecoration: "line-through",
                                    color: "#707070",
                                    fontSize: "14px",
                                    fontWeight: "normal",
                                  }}
                                >
                                  {sanpham.gia_sp}đ
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#d70018",
                                      fontSize: "16px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {sanpham.giam_gia}đ
                                  </div>
                                  <div
                                    style={{
                                      color: "#fff",
                                      fontSize: "12px",
                                      background: "#d70018",
                                      padding: "0 6px",
                                      borderRadius: "3px",
                                      fontWeight: "500",
                                      height: "20px",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    -
                                    {calculateDiscount(
                                      sanpham.gia_sp,
                                      sanpham.giam_gia
                                    )}
                                    %
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <span
                                style={{
                                  color: "#d70018",
                                  fontSize: "16px",
                                  fontWeight: "500",
                                }}
                              >
                                {sanpham.gia_sp}đ
                              </span>
                            )}
                            <button
                              className="wishlist-btn "
                              onClick={(e) => {
                                e.preventDefault();
                                handleAddToWishlist(sanpham);
                              }}
                              title="Thêm vào yêu thích"
                            >
                              <i
                                style={{ color: "red", fontSize: "20px" }}
                                className={`fas fa-heart ${
                                  wishlist.some((w) => w.id === sanpham.id)
                                    ? "active"
                                    : ""
                                }`}
                              ></i>
                            </button>
                          </div>
                          <div
                            className="cart-product d-flex flex-wrap justify-content-between align-items-center"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <span
                              className="status-pro sts2"
                              style={{
                                fontSize: "13px",
                                color:
                                  sanpham.trang_thai === "Còn hàng"
                                    ? "#32CD32"
                                    : "red",
                                fontWeight: "400",
                                position: "relative",
                                paddingLeft: "15px",
                                border: `1px solid ${
                                  sanpham.trang_thai === "Còn hàng"
                                    ? "#32CD32"
                                    : "red"
                                }`,
                                borderRadius: "4px",
                                padding: "4px 8px 4px 20px",
                                display: "inline-flex",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "50%",
                                  backgroundColor:
                                    sanpham.trang_thai === "Còn hàng"
                                      ? "#32CD32"
                                      : "red",
                                  position: "absolute",
                                  left: "8px",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                }}
                              ></span>
                              {sanpham.trang_thai}
                            </span>
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
        <ChatBox />
      </div>
    </>
  );
}
