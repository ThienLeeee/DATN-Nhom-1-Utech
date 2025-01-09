import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchSanPhamTheoSearch } from "../../../service/sanphamService";  // API for searching products
import Swal from 'sweetalert2';
export default function SanPhamSearch() {
  const [sanPham, setSanPham] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use useLocation to get the full URL, including the query string
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);  // Parse the query string
  const keyword = queryParams.get('keyword');  // Get the 'keyword' parameter
   const navigate = useNavigate();
  const handleAddToCart = (sanPhamMoi) => {
    if (sanPhamMoi.trang_thai !== 'Còn hàng') {
           Swal.fire("Thông báo", "Sản phẩm đã hết hàng", "warning");
           return;
       }
   
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
   navigate("/thanhtoan");
 };


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

 // Thêm hàm tính % giảm giá
 const calculateDiscount = (originalPrice, discountedPrice) => {
  const original = parseInt(originalPrice.replace(/\./g, ''));
  const discounted = parseInt(discountedPrice.replace(/\./g, ''));
  const discount = Math.round(((original - discounted) / original) * 100);
  return discount;
};

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
                    //     imagePath = "Khac"; // Default folder for other categories
                    // }

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
                            <div className="price-product d-flex justify-content-between" style={{ margin: '8px 0', textAlign: 'left' }}>
                      {sanpham.giam_gia ? (
                        <div className="price-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '2px',  }}>
                          <div style={{ 
                            textDecoration: 'line-through', 
                            color: '#707070', 
                            fontSize: '14px', 
                            fontWeight: 'normal' 
                          }}>
                            {sanpham.gia_sp}đ
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ 
                              color: '#d70018', 
                              fontSize: '16px', 
                              fontWeight: '500' 
                            }}>
                              {sanpham.giam_gia}đ
                            </div>
                            <div style={{ 
                              color: '#fff',
                              fontSize: '12px',
                              background: '#d70018',
                              padding: '0 6px',
                              borderRadius: '3px',
                              fontWeight: '500',
                              height: '20px',
                              display: 'flex',
                              alignItems: 'center'
                            }}>
                              -{calculateDiscount(sanpham.gia_sp, sanpham.giam_gia)}%
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span style={{ 
                          color: '#d70018', 
                          fontSize: '16px', 
                          fontWeight: '500' 
                        }}>
                          {sanpham.gia_sp}đ
                        </span>
                      )}
                    
                    </div>
                            <div className="cart-product d-flex justify-content-between align-items-center">
                            <span className="status-pro sts2" style={{
                            fontSize: '13px',
                            color: sanpham.trang_thai === 'Còn hàng' ? '#32CD32' : 'red',
                            fontWeight: '400',
                            position: 'relative',
                            paddingLeft: '15px',
                            border: `1px solid ${sanpham.trang_thai === 'Còn hàng' ? '#32CD32' : 'red'}`,
                            borderRadius: '4px',
                            padding: '4px 8px 4px 20px',
                            display: 'inline-flex',
                            alignItems: 'center'
                        }}>
                            <span style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: sanpham.trang_thai === 'Còn hàng' ? '#32CD32' : 'red',
                                position: 'absolute',
                                left: '8px',
                                top: '50%',
                                transform: 'translateY(-50%)'
                            }}></span>
                            {sanpham.trang_thai}
                        </span>
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
