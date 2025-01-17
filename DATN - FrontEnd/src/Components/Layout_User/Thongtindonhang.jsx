import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '/public/css/taikhoan.css';
import './components/CssThongtindonhang.css'
import Swal from "sweetalert2";
export default function Thongtindonhang() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const handleLogoutConfirm = () => {
    // Xóa giỏ hàng khỏi localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItem")) || [];
    if (cartItems.length > 0) {
      localStorage.removeItem("cartItem");
    }
    // Dispatch event để cập nhật số lượng trong Header
    window.dispatchEvent(new Event("cartUpdated"));
    // Gọi hàm logout và chuyển hướng trang
    logout();
    navigate("/");
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/donHang');
        // Lọc đơn hàng theo thông tin người dùng đang đăng nhập
        const userOrders = response.data.filter(order => 
          order.email === user.email || order.dienThoai === user.phone
        );
        setOrders(userOrders);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin đơn hàng:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleStatusClick = (status) => {
    setSelectedStatus(status); // Cập nhật trạng thái được chọn
  };

  // Hàm format tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Hàm lấy màu cho trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case 'Chờ xử lý':
        return 'start';
      case 'Đang xử lý':
        return 'warning';
      case 'Đang vận chuyển':
        return 'info';
      case 'Hoàn thành':
        return 'success';
      case 'Hủy':
        return 'danger';
      default:
        return 'secondary';
    }
  };

    const filteredOrders =
    selectedStatus === ""
      ? orders
      : orders.filter((order) => order.trangThai === selectedStatus);


      const handleCancelOrder = async (orderId) => {
        try {
          const { value: reason } = await Swal.fire({
            title: "Xác nhận hủy đơn hàng",
            input: "textarea",
            inputLabel: "Lý do hủy đơn hàng",
            inputPlaceholder: "Nhập lý do của bạn...",
            inputAttributes: {
              "aria-label": "Nhập lý do hủy đơn hàng"
            },
            showCancelButton: true,
            cancelButtonText: "Không",
            confirmButtonText: "Hủy đơn hàng",
          });
      
          if (reason) {
            const response = await axios.put(`http://localhost:3000/api/donHang/${orderId}/status`, {
              trangThai: "Hủy",
              lyDoHuy: reason, // Gửi lý do hủy cùng với trạng thái
            });
      
            if (response.status === 200) {
              setOrders((prevOrders) =>
                prevOrders.map((order) =>
                  order.id === orderId ? { ...order, trangThai: "Hủy", lyDoHuy: reason } : order
                )
              );
              Swal.fire("Thành công!", "Đơn hàng đã được hủy.", "success");
            } else {
              Swal.fire("Lỗi", response.data.message || "Không thể hủy đơn hàng.", "error");
            }
          } else if (reason === "") {
            Swal.fire("Hủy thất bại", "Bạn cần nhập lý do để hủy đơn hàng.", "warning");
          }
        } catch (error) {
          console.error("Lỗi khi hủy đơn hàng:", error);
          Swal.fire("Lỗi", "Đã xảy ra lỗi. Vui lòng thử lại sau!", "error");
        }
      };
      const handleAddRating = async (orderId) => {
        try {
          const { value: rating } = await Swal.fire({
            title: "Đánh giá đơn hàng",
            input: "number",
            inputLabel: "Nhập đánh giá của bạn (1-5 sao):",
            inputAttributes: {
              min: 1,
              max: 5,
              step: 1
            },
            inputPlaceholder: "Nhập từ 1 đến 5",
            showCancelButton: true,
            cancelButtonText: "Hủy",
            confirmButtonText: "Gửi đánh giá",
          });
      
          if (rating) {
            if (rating < 1 || rating > 5) {
              Swal.fire("Lỗi", "Đánh giá phải nằm trong khoảng từ 1 đến 5 sao.", "error");
              return;
            }
      
            const response = await axios.put(`http://localhost:3000/api/donHang/${orderId}/status`, {
              trangThai: "Hoàn thành",
              danhGia: parseInt(rating)
            });
      
            if (response.status === 200) {
              setOrders((prevOrders) =>
                prevOrders.map((order) =>
                  order.id === orderId ? { ...order, danhGia: parseInt(rating) } : order
                )
              );
              Swal.fire("Thành công!", "Đánh giá của bạn đã được gửi.", "success");
            } else {
              Swal.fire("Lỗi", response.data.message || "Không thể gửi đánh giá.", "error");
            }
          }
        } catch (error) {
          console.error("Lỗi khi gửi đánh giá:", error);
          Swal.fire("Lỗi", "Đã xảy ra lỗi. Vui lòng thử lại sau!", "error");
        }
      };
      
      
  return (
    <div className="account-container">
     
      <div className="account-sidebar">
        <div className="user-profile">
          <div className="avatar">
            <img src="/public/img/icon/user-icon.png" alt="User Avatar" />
          </div>
          <h3 className="username">{user?.username}</h3>
        </div>
        
        <div className="menu-list">
         
          <Link to="/taikhoan" className="menu-item">
            <i className="fas fa-user"></i>
            <span>Thông tin tài khoản</span>
          </Link>
         
          <Link to="/chinhsuathongtin" className="menu-item">
            <i className="fas fa-edit"></i>
            <span>Chỉnh sửa thông tin</span>
          </Link>
        
          <Link to="/donhang" className="menu-item active ">
            <i className="fas fa-shopping-bag"></i>
            <span>Thông tin đơn hàng</span>
          </Link>
     
          <Link to="/voucher" className="menu-item ">
            <i className="fas fa-ticket-alt"></i>
            <span>Voucher của tôi</span>
          </Link>
          <button onClick={() => setShowLogoutPopup(true)} className="menu-item logout">
            <i className="fas fa-sign-out-alt"></i>
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      <div className="account-content">
        <div className="content-header">
          <h2>Thông tin đơn hàng của tôi</h2>
        </div>
       
        <div className="order-container">
        <div className="box-category">
            <div className="box-category-header">
              {["Chờ xử lý", "Đang xử lý", "Đang vận chuyển", "Hoàn thành", "Hủy"].map((status, index) => (
                <p
                  key={index}
                  className={`status-option ${
                    selectedStatus === status ? "active" : ""
                  }`}
                  onClick={() => handleStatusClick(status)}
                >
                  {status}
                </p>
              ))}
            </div>
          </div>
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Đang tải thông tin đơn hàng...</p>
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className="orders-grid">
              {filteredOrders.map((order) => (
                <div key={order.id} className="order-box">
                  {/* Header đơn hàng */}
                  <div className="order-box-header">
                    <div className="order-box-title">
                      <span className="order-number">Đơn hàng #{order.id}</span>
                      <span className="order-date">
                        <i className="far fa-calendar-alt"></i>
                        {new Date(order.ngayDat).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <div className={`order-status status-${getStatusColor(order.trangThai)}`}>
                      {order.trangThai}
                    </div>
                  </div>

                  {/* Thông tin người nhận */}
                  <div className="recipient-info">
                    <div className="info-row">
                      <i className="fas fa-user"></i>
                      <div>
                        <label>Người nhận:</label>
                        <span>{order.hoTen}</span>
                      </div>
                    </div>
                    <div className="info-row">
                      <i className="fas fa-phone"></i>
                      <div>
                        <label>SĐT:</label>
                        <span>{order.dienThoai}</span>
                      </div>
                    </div>
                    <div className="info-row">
                      <i className="fas fa-map-marker-alt"></i>
                      <div>
                        <label>Địa chỉ:</label>
                        <span>{order.diaChi}</span>
                      </div>
                    </div>
                  </div>

                  {/* Danh sách sản phẩm */}
                  <div className="products-list">
                    <div className="list-header">
                      <h4>Sản phẩm đã mua</h4>
                    </div>
                    {order.sanPham.map((item, index) => (
                      <div key={index} className="product-item">
                        <div className="product-image">
                          <img 
                            src={`/img/sanpham/${item.hinh_anh?.chinh}`}
                            alt={item.ten_sp}
                            onError={(e) => {
                              e.target.src = '/img/icon/default-product.png';
                            }}
                          />
                        </div>
                        <div className="product-details">
                          <h5>{item.ten_sp}</h5>
                          <div className="price-qty">
                            <div>
                            {item.gia_giam ? (
                          <>
                              <span style={{color: 'silver', textDecoration: 'line-through', opacity: '0.7', marginRight: '5px'}} className="price">
                                  {formatCurrency(item.gia_goc)}
                              </span>
                              <span className="price">{formatCurrency(item.gia_giam)}</span>
                          </>
                      ) : (
                          <span className="price">{formatCurrency(item.gia_goc)}</span>
                      )}

                            </div>
                            
                            <span className="quantity">Số lượng: {item.soLuong}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer đơn hàng */}
                  <div className="order-box-footer">
                    <div className="payment-method">
                      {order.hinhThucThanhToan}
                    </div>
                    <div className="total-amount">
                      <label>Thành tiền:</label>
                      <span>{formatCurrency(order.tongTien)}</span>
                    </div>
                    <div className="total-amount">
                      <label>Giảm gía voucher:</label>
                      <span>{formatCurrency(order.giamGia)}</span>
                     
                    </div>
                    {order.trangThai === "Chờ xử lý" && (
                    <button
                      className="cancel-order-btn"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Hủy đơn hàng
                    </button>
                  )}
                              {order.trangThai === "Hoàn thành" && !order.danhGia && (
                <button
                  className="add-rating-btn"
                  onClick={() => handleAddRating(order.id)}
                >
                  Đánh giá đơn hàng
                </button>
              )}

              {order.danhGia && (
                <div className="order-rating">
                  <label>Đánh giá của bạn:</label>
                  <span>{'⭐'.repeat(order.danhGia)}</span>
                </div>
              )}

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <img src="/img/icon/bangboo-cart.gif" alt="Không có đơn hàng" style={{borderRadius: '100%'}}/>
              <h3>Bạn chưa có đơn hàng nào</h3>
              <p>Hãy tiếp tục mua sắm để có những trải nghiệm tuyệt vời</p>
              <Link to="/" className="shop-now-btn">
                <i className="fas fa-shopping-bag"></i>
                Mua sắm ngay
              </Link>
            </div>
          )}
        </div>
      </div>

      {showLogoutPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <i className="fas fa-question-circle popup-icon" style={{ color: "#0090d0" }}></i>
            <p>Bạn có chắc chắn muốn đăng xuất?</p>
            <div className="popup-buttons">
              <button
                className="popup-button confirm"
                onClick={() => {
                  handleLogoutConfirm();
                  setShowLogoutPopup(false);
                }}
              >
                Đăng xuất
              </button>
              <button
                className="popup-button cancel"
                onClick={() => setShowLogoutPopup(false)}
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
