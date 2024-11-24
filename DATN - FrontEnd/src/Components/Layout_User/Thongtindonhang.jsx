import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '/public/css/taikhoan.css';

export default function Thongtindonhang() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleLogout = () => {
    logout();
    navigate('/');
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
        return 'warning';
      case 'Đang giao':
        return 'info';
      case 'Đã giao':
        return 'success';
      case 'Đã hủy':
        return 'danger';
      default:
        return 'secondary';
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
          <Link to="/donhang" className="menu-item active">
            <i className="fas fa-shopping-bag"></i>
            <span>Thông tin đơn hàng</span>
          </Link>
          <button onClick={handleLogout} className="menu-item logout">
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
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Đang tải thông tin đơn hàng...</p>
            </div>
          ) : orders.length > 0 ? (
            <div className="orders-grid">
              {orders.map((order) => (
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
                            src={`/img/sanpham/${
                              item.id_danhmuc === 1 ? 'Laptop' :
                              item.id_danhmuc === 2 ? 'PC' :
                              item.id_danhmuc === 3 ? 'Manhinh' :
                              item.id_danhmuc === 4 ? 'Chuot' :
                              item.id_danhmuc === 5 ? 'Banphim' : 'Khac'
                            }/${item.hinh_anh?.chinh}`}
                            alt={item.ten_sp}
                            onError={(e) => {
                              e.target.src = '/img/icon/default-product.png';
                            }}
                          />
                        </div>
                        <div className="product-details">
                          <h5>{item.ten_sp}</h5>
                          <div className="price-qty">
                            <span className="price">{formatCurrency(item.gia_sp)}</span>
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
                      <label>Tổng tiền:</label>
                      <span>{formatCurrency(order.tongTien)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <img src="/img/icon/empty-order.png" alt="Không có đơn hàng" />
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

      <style jsx>{`
        .order-container {
          padding: 20px;
          background: #fff;
          border-radius: 12px;
          max-width: 1000px;
          margin: 0 auto;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .orders-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .order-box {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }

        .order-box-header {
          padding: 15px 20px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff;
        }

        .order-box-title {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .order-number {
          font-weight: 600;
          color: #2d3748;
        }

        .order-date {
          color: #718096;
          font-size: 0.9em;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .order-status {
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.95em;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .order-status::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-warning {
          background: #fff8e6;
          color: #b45309;
          border: 2px solid #fbbf24;
        }
        .status-warning::before {
          background: #fbbf24;
        }

        .status-info {
          background: #e6f3ff;
          color: #1e40af;
          border: 2px solid #3b82f6;
        }
        .status-info::before {
          background: #3b82f6;
        }

        .status-success {
          background: #ecfdf5;
          color: #065f46;
          border: 2px solid #34d399;
        }
        .status-success::before {
          background: #34d399;
        }

        .status-danger {
          background: #fef2f2;
          color: #991b1b;
          border: 2px solid #f87171;
        }
        .status-danger::before {
          background: #f87171;
        }

        .recipient-info {
          padding: 15px 20px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 200px;
          flex: 1;
        }

        .info-row i {
          color: #64748b;
          width: 16px;
        }

        .info-row div {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .info-row label {
          color: #64748b;
          font-size: 0.9em;
          margin: 0;
          white-space: nowrap;
        }

        .info-row span {
          color: #1e293b;
          font-weight: 500;
        }

        .products-list {
          padding: 20px;
        }

        .list-header {
          margin-bottom: 15px;
        }

        .list-header h4 {
          color: #2d3748;
          font-size: 1em;
          margin: 0;
        }

        .product-item {
          display: flex;
          gap: 15px;
          padding: 10px;
          border: 1px solid #eee;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .product-image {
          width: 80px;
          height: 80px;
          border-radius: 6px;
          overflow: hidden;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-details {
          flex: 1;
        }

        .product-details h5 {
          margin: 0 0 8px 0;
          font-size: 0.95em;
          color: #2d3748;
        }

        .price-qty {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price {
          color: #e53e3e;
          font-weight: 600;
        }

        .quantity {
          color: #718096;
          font-size: 0.9em;
        }

        .order-box-footer {
          padding: 15px 20px;
          background: #f8fafc;
          border-top: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .payment-method {
          color: #4b5563;
          font-weight: 500;
        }

        .total-amount {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .total-amount label {
          color: #4b5563;
          font-weight: 500;
        }

        .total-amount span {
          font-weight: 600;
          color: #e31837;
          font-size: 1.1em;
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
        }

        .empty-state img {
          width: 120px;
          margin-bottom: 20px;
        }

        .shop-now-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #4299e1;
          color: white;
          border-radius: 8px;
          text-decoration: none;
          margin-top: 20px;
          transition: all 0.2s;
        }

        .shop-now-btn:hover {
          background: #3182ce;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .order-box-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .product-item {
            flex-direction: column;
          }

          .product-image {
            width: 100%;
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
}
