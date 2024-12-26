import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "/public/css/giohang.css";
export default function Giohang() {
  const [sanPham, setSanpham] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);


  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItem")) || [];
    setSanpham(items);
    updateTotal(items);
  }, []);
  

  useEffect(() => {
    updateTotal(sanPham);
  }, [sanPham]);

  const updateTotal = (items) => {
    let totalQuantity = 0;
    let totalPrice = 0;

    items.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.gia_sp * item.quantity; // Tính toán với gia_sp dạng số
    });

    setTotalQuantity(totalQuantity);
    setTotalPrice(totalPrice);
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedItems = sanPham.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );

    setSanpham(updatedItems);
    localStorage.setItem("cartItem", JSON.stringify(updatedItems));

    // Dispatch event để cập nhật số lượng trong Header
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id) => {
    const updatedItems = sanPham.filter((item) => item.id !== id);

    // Nếu không còn sản phẩm nào sau khi xóa, xóa luôn cartItem khỏi localStorage
    if (updatedItems.length === 0) {
      localStorage.removeItem("cartItem");
    } else {
      localStorage.setItem("cartItem", JSON.stringify(updatedItems));
    }

    // Cập nhật state sau khi xóa
    setSanpham(updatedItems);

    // Dispatch event để cập nhật số lượng trong Header
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = () => {
    if (sanPham.length === 0) {
      alert("Giỏ hàng đã trống!");
      return;
    }
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    setSanpham([]);
    localStorage.removeItem("cartItem");
    setTotalQuantity(0);
    setTotalPrice(0);
    window.dispatchEvent(new Event("cartUpdated"));
    setShowDeletePopup(false);
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (sanPham.length === 0) {
      alert("Giỏ hàng trống, không thể thanh toán!");
      return;
    }

    // Tạo dữ liệu đơn hàng tạm thời
    const orderData = {
      items: sanPham,
      totalQuantity,
      totalPrice,
      status: "pending", // Đơn hàng chưa hoàn thành
    };

    // Lưu đơn hàng tạm vào localStorage
    localStorage.setItem("checkoutItems", JSON.stringify(orderData));

    // Điều hướng đến trang thanh toán
    navigate("/thanhtoan");
  };

  return (
    <div className="wrap-main wrap-page">
      <link href="css/giohang.css" rel="stylesheet" type="text/css" />
      <div className="sub_main">
        <div className="title_main" style={{ marginBottom: 20 }}>
          <span>Giỏ hàng</span>
        </div>
        <div className="content_main">
          <div id="giohang_ct">
            <form
              name="form1"
              method="post"
              onSubmit={(e) => e.preventDefault()}
            >
              {sanPham.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-cart-content">
                    <img
                      src="/img/icon/bangboo-cart.gif"
                      alt="Bangboo Cart"
                      className="empty-cart-image"
                    />
                    <h2>Giỏ hàng hiện tại đang trống</h2>
                    <p>Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
                    <Link to="/" className="shop-now-btn">
                      <i className="fas fa-shopping-cart"></i>
                      Mua sắm ngay
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="contain_table_giohang">
                  <table className="cart-table">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sanPham.map((sanpham, index) => {
                    
                        return (
                          <tr key={index}>
                            <td>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "16px",
                                }}
                              >
                                <img
                                  src={`/img/sanpham/${sanpham.hinh_anh.chinh}`}
                                  alt={sanpham.ten_sp}
                                  className="cart-product-image"
                                />
                                <div className="cart-product-info">
                                  <div className="cart-product-name">
                                    {sanpham.ten_sp}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="cart-product-price">
                                {sanpham.gia_sp.toLocaleString("vi-VN")} VNĐ
                              </div>
                            </td>
                            <td>
                              <div className="quantity-controls">
                                <button
                                  className="quantity-btn"
                                  onClick={() =>
                                    updateQuantity(
                                      sanpham.id,
                                      sanpham.quantity - 1
                                    )
                                  }
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                                <input
                                  type="number" // Thay đổi type thành number
                                  className="quantity-input"
                                  value={sanpham.quantity}
                                  onChange={(e) => {
                                    const newValue =
                                      parseInt(e.target.value) || 1; // Đảm bảo giá trị là số, mặc định là 1
                                    if (newValue >= 1) {
                                      // Kiểm tra giá trị tối thiểu
                                      updateQuantity(sanpham.id, newValue);
                                    }
                                  }}
                                  min="1" // Giá trị tối thiểu
                                />
                                <button
                                  className="quantity-btn"
                                  onClick={() =>
                                    updateQuantity(
                                      sanpham.id,
                                      sanpham.quantity + 1
                                    )
                                  }
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                            </td>
                            <td>
                              <div className="cart-total-price">
                                {(
                                  sanpham.gia_sp * sanpham.quantity
                                ).toLocaleString("vi-VN")}{" "}
                                VNĐ
                              </div>
                            </td>
                            <td>
                              <button
                                className="cart-delete-btn"
                                onClick={() => removeItem(sanpham.id)}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="cart-footer">
                    <div className="cart-total-info">
                      <div className="cart-total-quantity">
                        Tổng số lượng: {totalQuantity} sản phẩm
                      </div>
                      <div className="cart-total-amount">
                        Tổng tiền: {totalPrice.toLocaleString("vi-VN")} VNĐ
                      </div>
                    </div>
                    <div className="cart-actions">
                      <Link to="/">
                        <button className="btnc btn-primary">
                          <i className="fas fa-shopping-cart"></i> Mua tiếp
                        </button>
                      </Link>
                      <button className="btnc btn-danger" onClick={clearCart}>
                        <i className="fas fa-trash"></i> Xóa tất cả
                      </button>
                      <Link to="/thanhtoan" state={{ cartItems: sanPham }}>
                        <button
                          className="btnc btn-success"
                          onClick={handleCheckout}
                        >
                          <i className="fas fa-check"></i> Thanh toán
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        {/*content main*/}
      </div>

      {/*sub main*/}

      {/* Popup xóa tất cả */}
      {showDeletePopup && (
        <div className="delete-popup-overlay">
          <div className="delete-popup">
            <div className="delete-popup-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2>Xác nhận xóa</h2>
            <p style={{ textAlign: "center" }}>
              Bạn muốn xóa tất cả sản phẩm khỏi giỏ hàng?
            </p>
            <div className="delete-popup-buttons">
              <button className="confirm-delete" onClick={handleConfirmDelete}>
                Xóa tất cả
              </button>
              <button
                className="cancel-delete"
                onClick={() => setShowDeletePopup(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
