import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSanPhamTheoDm } from "../../../service/sanphamService";
import { fetchDanhMucById } from "../../../service/danhmucService";
import { useNavigate } from "react-router-dom";

export default function SanPhamTheodm() {
  const [sanPham, setSanPham] = useState([]);
  const [tenDanhMuc, setTenDanhMuc] = useState("Đang tải danh mục...");
  const [priceRange, setPriceRange] = useState(0);
  const [brandFilter, setBrandFilter] = useState("");
  const [warrantyFilter, setWarrantyFilter] = useState(0);
  const [sortBy, setSortBy] = useState(0);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadSanPham = async () => {
      try {
        const fetchedSanPham = await fetchSanPhamTheoDm(id);
        setSanPham(fetchedSanPham);
        const uniqueBrands = Array.from(new Set(fetchedSanPham.map((sp) => sp.thuong_hieu)));
        setBrands(uniqueBrands);
      } catch (error) {
        console.error("Lỗi tải sản phẩm:", error);
      }
    };

    const loadTenDanhMuc = async () => {
      try {
        const danhMucData = await fetchDanhMucById(id);
        setTenDanhMuc(danhMucData?.tendm || "Danh mục không tồn tại");
      } catch (error) {
        console.error("Lỗi tải tên danh mục:", error);
      }
    };

    loadSanPham();
    loadTenDanhMuc();
  }, [id]);

  // Lọc và sắp xếp sản phẩm
  const filteredProducts = useMemo(() => {
    let products = sanPham.filter((product) => {
      const price = parseInt(product.gia_sp.replace(/\./g, ""));
      const warranty = parseInt(product.bao_hanh); // Giả sử thuộc tính bảo hành là "bao_hanh"

      const matchesPrice = (() => {
        switch (priceRange) {
          case 19:
            return price < 3000000;
          case 20:
            return price < 5000000;
          case 21:
            return price < 8000000;
          case 22:
            return price < 10000000;
          case 49:
            return price < 15000000;
          case 50:
            return price < 20000000;
          case 51:
            return price < 25000000;
          case 52:
            return price >= 25000000;
          default:
            return true;
        }
      })();

      const matchesBrand = brandFilter ? product.thuong_hieu === brandFilter : true;
      const matchesWarranty = warrantyFilter ? warranty === warrantyFilter : true;

      return matchesPrice && matchesBrand && matchesWarranty;
    });

    // Sắp xếp sản phẩm
    if (sortBy === 1) {
      products.sort((a, b) => parseInt(a.gia_sp.replace(/\./g, "")) - parseInt(b.gia_sp.replace(/\./g, "")));
    } else if (sortBy === 2) {
      products.sort((a, b) => parseInt(b.gia_sp.replace(/\./g, "")) - parseInt(a.gia_sp.replace(/\./g, "")));
    } else if (sortBy === 3) {
      products.sort((a, b) => b.luot_xem - a.luot_xem); // Giả sử có thuộc tính "luot_xem"
    }

    return products;
  }, [priceRange, brandFilter, warrantyFilter, sortBy, sanPham]);

  const handlePriceFilter = (event) => {
    setPriceRange(parseInt(event.target.value));
  };

  const handleBrandFilter = (event) => {
    setBrandFilter(event.target.value);
  };

  const handleWarrantyFilter = (event) => {
    setWarrantyFilter(parseInt(event.target.value));
  };

  const handleSortBy = (event) => {
    setSortBy(parseInt(event.target.value));
  };

  const handleAddToCart = (sanPhamMoi) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItem")) || [];
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



  return (
    <div className="wrap-main wrap-page">
      <div className="sub_main">
        <div className="title_main">
          <span>{tenDanhMuc ? tenDanhMuc : "Đang tải danh mục..."}</span>
        </div>
        <div className="title_filter">
          <form id="frm_filter" encType="multipart/form-data">
            <input type="hidden" defaultValue={11} name="id_list" />
            <input type="hidden" defaultValue="" name="id_cat" />
            <input type="hidden" defaultValue="" name="id_item" />
            <div className="item_filter">
            <select onChange={handleBrandFilter} value={brandFilter} className="filter">
              <option value="">Thương hiệu</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
            <div className="item_filter">
              <select 
                name="filter[]" 
                className="filter"
                onChange={handlePriceFilter}
                value={priceRange}
              >
                <option value={0}>Mức giá</option>
                <option value={19}>Dưới 3 triệu</option>
                <option value={20}>Dưới 5 triệu</option>
                <option value={21}>Dưới 8 triệu</option>
                <option value={22}>Dưới 10 triệu</option>
                <option value={49}>Dưới 15 triệu</option>
                <option value={50}>Dưới 20 triệu</option>
                <option value={51}>Dưới 25 triệu</option>
                <option value={52}>Trên 25 triệu</option>
              </select>
            </div>
      
            <div className="item_filter">
            <select onChange={handleWarrantyFilter} value={warrantyFilter} className="filter">
              <option value={0}>Bảo hành</option>
              <option value={12}>12 tháng</option>
              <option value={24}>24 tháng</option>
              <option value={36}>36 tháng</option>
            </select>
          </div>
          
            
          <div className="item_filter">
            <select onChange={handleSortBy} value={sortBy} className="filter">
              <option value={0}>Sắp xếp theo</option>
              <option value={1}>Giá: Thấp -&gt; Cao</option>
              <option value={2}>Giá: Cao -&gt; Thấp</option>
              <option value={3}>Xem nhiều nhất</option>
            </select>
          </div>
            <div className="clear" />
          </form>
        </div>
        <div className="content_main load_sanpham">
          <div className="border_sanpham">
            <div id="results1">
              <div className="grid-products">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((sanpham) => {
                    // Xác định thư mục hình ảnh dựa trên id_danhmuc
                    let imagePath = "";
                    switch (sanpham.id_danhmuc) {
                      case 1:
                        imagePath = "Laptop";
                        break;
                      case 2:
                        imagePath = "PC";
                        break;
                      case 3:
                        imagePath = "Manhinh";
                        break;
                      case 4:
                        imagePath = "Chuot";
                        break;
                      case 5:
                        imagePath = "Banphim";
                        break;
                      default:
                        imagePath = "Khac"; // Thư mục mặc định nếu có danh mục khác
                    }

                    return (
                      <div className="product" key={sanpham.id}>
                        <div className="box-product">
                          <div
                            className="pic-product"
                            data-tooltip="sticky9346"
                          >
                            <Link
                              className="d-block"
                              to={`/chitietsp/sanPham/${sanpham.id}`}
                              title={sanpham.ten_sp}
                            >
                              <img
                                src={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.chinh}`}
                                alt={sanpham.ten_sp}
                                className="w100 trans03"
                              />
                            </Link>
                            <div className="desc-product">
                              <div>
                                <ul>
                                  {/* Hiển thị cấu hình dựa vào id_danhmuc */}
                                  {sanpham.id_danhmuc === 1 && (
                                    <>
                                      <li>CPU: {sanpham.cau_hinh.cpu}</li>
                                      <li>RAM: {sanpham.cau_hinh.ram}</li>
                                      <li>Ổ cứng: {sanpham.cau_hinh.ocung}</li>
                                      <li>VGA: {sanpham.cau_hinh.vga}</li>
                                      <li>
                                        Màn hình: {sanpham.cau_hinh.man_hinh}
                                      </li>
                                      
                                    </>
                                  )}
                                  {sanpham.id_danhmuc === 2 && (
                                    <>
                                      <li>
                                        Mainboard: {sanpham.cau_hinh.mainboard}
                                      </li>
                                      <li>CPU: {sanpham.cau_hinh.cpu}</li>
                                      <li>RAM: {sanpham.cau_hinh.ram}</li>
                                      <li>VGA: {sanpham.cau_hinh.vga}</li>
                                      <li>HDD: {sanpham.cau_hinh.hdd}</li>
                                      <li>SSD: {sanpham.cau_hinh.ssd}</li>
                                      <li>PSU: {sanpham.cau_hinh.psu}</li>
                                      <li>Case: {sanpham.cau_hinh.case}</li>
                                      <li>
                                        Cooling: {sanpham.cau_hinh.cooling}
                                      </li>
                                    </>
                                  )}
                                  {sanpham.id_danhmuc === 3 && (
                                    <>
                                      <li>
                                        Kiểu màn hình:{" "}
                                        {sanpham.cau_hinh.kieu_man_hinh}
                                      </li>
                                      <li>
                                        Kích thước:{" "}
                                        {sanpham.cau_hinh.kich_thuoc}
                                      </li>
                                      <li>
                                        Tương thích VESA:{" "}
                                        {sanpham.cau_hinh.tuong_thich_vesa}
                                      </li>
                                      <li>
                                        Cổng kết nối:{" "}
                                        {sanpham.cau_hinh.cong_ket_noi}
                                      </li>
                                      <li>
                                        Tần số quét:{" "}
                                        {sanpham.cau_hinh.tan_so_quet}
                                      </li>
                                      <li>
                                        Độ phân giải:{" "}
                                        {sanpham.cau_hinh.do_phan_giai}
                                      </li>
                                      <li>
                                        Tấm nền: {sanpham.cau_hinh.tam_nen}
                                      </li>
                                      <li>
                                        Không gian màu:{" "}
                                        {sanpham.cau_hinh.khong_gian_mau}
                                      </li>
                                      <li>
                                        Phụ kiện trong hộp:{" "}
                                        {sanpham.cau_hinh.phu_kien_trong_hop ||
                                          "N/A"}
                                      </li>
                                      <li>
                                        Thời gian phản hồi:{" "}
                                        {sanpham.cau_hinh.thoi_gian_phan_hoi}
                                      </li>
                                      <li>
                                        Độ sáng: {sanpham.cau_hinh.do_sang}
                                      </li>
                                    </>
                                  )}
                                  {sanpham.id_danhmuc === 4 && (
                                    <>
                                      <li>
                                        Màu sắc: {sanpham.cau_hinh.mau_sac}
                                      </li>
                                      <li>
                                        Kết nối: {sanpham.cau_hinh.ket_noi}
                                      </li>
                                      <li>LED: {sanpham.cau_hinh.led}</li>
                                      <li>
                                        Cảm biến: {sanpham.cau_hinh.cam_bien}
                                      </li>
                                      <li>Số nút: {sanpham.cau_hinh.so_nut}</li>
                                      <li>
                                        Tuổi thọ: {sanpham.cau_hinhtuoi_tho}
                                      </li>
                                      <li>DPI: {sanpham.cau_hinh.DPI}</li>
                                      <li>IPS: {sanpham.cau_hinhIPS}</li>
                                      <li>
                                        Trọng lượng:{" "}
                                        {sanpham.cau_hinh.trong_luong}
                                      </li>
                                    </>
                                  )}
                                  {sanpham.id_danhmuc === 5 && (
                                    <>
                                      <li>
                                        Kết nối: {sanpham.cau_hinh.ket_noi}
                                      </li>
                                      <li>Switch: {sanpham.cau_hinh.switch}</li>
                                      <li>Keycap: {sanpham.cau_hinh.keycap}</li>
                                      <li>
                                        Tương thích:{" "}
                                        {sanpham.cau_hinh.tuong_thich}
                                      </li>
                                      <li>
                                        Kích thước:{" "}
                                        {sanpham.cau_hinh.kich_thuoc}
                                      </li>
                                      <li>
                                        Trọng lượng:{" "}
                                        {sanpham.cau_hinh.trong_luong}
                                      </li>
                                    </>
                                  )}
                                </ul>
                                <div className="baohanh">
                                  Bảo hành: {sanpham.bao_hanh}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="info-product">
                            <Link
                              className="name-product text-split"
                              to={`/chitietsp/sanPham/${sanpham.id}`}
                              title={sanpham.ten_sp}
                            >
                              {sanpham.ten_sp}
                            </Link>
                            <div className="price-product">
                              <span className="price-new">
                                {sanpham.gia_sp} đ
                              </span>
                            </div>
                            <div className="cart-product d-flex justify-content-between align-items-center">
                              <span className="status-pro sts2">Còn hàng</span>
                              <span
                                className="mua_giohang"
                                rel={sanpham.id}
                                data-confirm=""
                                onClick={() => handleAddToCart(sanpham)}
                              >
                                Mua ngay
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>Không tìm thấy sản phẩm phù hợp với mức giá đã chọn</p>
                )}
              </div>

              <div className="clear" />
            </div>
            <div className="clear" />
          </div>
          <div className="clear" />
        
        </div>
      </div>
    </div>
  );
}
