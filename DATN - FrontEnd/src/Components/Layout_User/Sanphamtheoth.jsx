import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchSanPhamTheoDanhMucVaThuongHieu } from "../../../service/sanphamService"; // API for fetching products by category and brand

export default function SanPhamThuongHieu() {
  const [sanPham, setSanPham] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get category ID and brand from route params
  const { id_danhmuc, thuong_hieu } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadSanPham = async () => {
      if (id_danhmuc && thuong_hieu) {
        setLoading(true);
        try {
          const response = await fetchSanPhamTheoDanhMucVaThuongHieu(
            id_danhmuc,
            thuong_hieu
          );
          setSanPham(response.products || []); // Đảm bảo dữ liệu chính xác
        } catch (error) {
          console.error(
            "Error fetching products by category and brand:",
            error
          );
        } finally {
          setLoading(false);
        }
      }
    };

    loadSanPham();
  }, [id_danhmuc, thuong_hieu]);
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
  return (
    <div className="wrap-main wrap-page">
      <div className="sub_main">
        <div className="title_main">
          <span>Sản phẩm theo thương hiệu: {thuong_hieu}</span>
        </div>
        
        <div className="content_main load_sanpham">
          <div className="border_sanpham">
            <div id="results1">
              <div className="grid-products">
                {loading ? (
                  <p>Loading...</p>
                ) : sanPham.length > 0 ? (
                  sanPham.map((sanpham) => {
                    // Determine image folder based on the category ID
                    // let imagePath = "";
                    // switch (sanpham.id_danhmuc) {
                    //   case 1:
                    //     imagePath = "Laptop";
                    //     break;
                    //   case 2:
                    //     imagePath = "PC";
                    //     break;
                    //   case 3:
                    //     imagePath = "Manhinh";
                    //     break;
                    //   case 4:
                    //     imagePath = "Chuot";
                    //     break;
                    //   case 5:
                    //     imagePath = "Banphim";
                    //     break;
                    //   default:
                    //     imagePath = "Khac";
                    // }

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
                                src={`/img/sanpham/${sanpham.hinh_anh.chinh}`}
                                alt={sanpham.ten_sp}
                                className="w100 trans03"
                              />
                            </Link>
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
                    );
                  })
                ) : (
                  <p>
                    Không có sản phẩm nào trong danh mục và thương hiệu này.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
