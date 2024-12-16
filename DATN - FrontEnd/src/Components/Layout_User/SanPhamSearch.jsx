import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchSanPhamTheoSearch } from "../../../service/sanphamService";  // API for searching products

export default function SanPhamSearch() {
  const [sanPham, setSanPham] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use useLocation to get the full URL, including the query string
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);  // Parse the query string
  const keyword = queryParams.get('keyword');  // Get the 'keyword' parameter

  useEffect(() => {
    const loadSanPham = async () => {
      if (keyword) {  // Only fetch if keyword exists
        setLoading(true);
        try {
          const response = await fetchSanPhamTheoSearch(keyword);  // Call API with keyword
          setSanPham(response);
        } catch (error) {
          console.error("Error searching products:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadSanPham();
  }, [keyword]);  // Run effect when keyword changes

  return (
    <div className="wrap-main wrap-page">
      <div className="sub_main">
        <div className="title_main">
          <span>Sản phẩm tiềm kiếm theo: {keyword}</span>
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
                        imagePath = "Khac"; // Default folder for other categories
                    }

                    return (
                      <div className="product" key={sanpham.id}>
                        <div className="box-product">
                          <div className="pic-product" data-tooltip="sticky9346">
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
                              <span className="price-new">{sanpham.gia_sp} đ</span>
                            </div>
                            <div className="cart-product d-flex justify-content-between align-items-center">
                              <span className="status-pro sts2">In stock</span>
                              <span className="mua_giohang">Buy now</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No products found matching your search.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
