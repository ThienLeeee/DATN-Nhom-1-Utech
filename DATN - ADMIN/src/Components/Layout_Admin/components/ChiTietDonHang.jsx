import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '/public/css/ChiTietDonHang.css';

export default function ChiTietDonHang() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/donHang/${id}`);
      const data = await response.json();
      console.log('Chi tiết đơn hàng:', data);
      if (data.sanPham && data.sanPham[0] && data.sanPham[0].items) {
        console.log('Đường dẫn hình ảnh:', data.sanPham[0].items[0].hinh_anh);
      }
      setOrder(data);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateTotal = () => {
    if (!order.sanPham) return 0;
    
    return order.sanPham.reduce((total, product) => {
      if (!product.items) return total;
      
      const productTotal = product.items.reduce((sum, item) => {
        return sum + (item.gia_sp * item.quantity);
      }, 0);
      
      return total + productTotal;
    }, 0);
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (!order) return <div className="error">Không tìm thấy đơn hàng</div>;

  return (
    <div className="order-detail-container">
      <div className="order-detail-header">
        <button className="back-button" onClick={() => navigate('/admin-dh')}>
          <i className="fas fa-arrow-left"></i> Quay lại
        </button>
        <h2>Chi tiết đơn hàng #{order.id}</h2>
      </div>

      <div className="order-info-grid">
        <div className="order-info-card">
          <h3>Thông tin đơn hàng</h3>
          <div className="info-group">
            <p><strong>Mã đơn hàng:</strong> #{order.id}</p>
            <p><strong>Ngày đặt:</strong> {formatDate(order.ngayDat)}</p>
            <p><strong>Trạng thái:</strong> 
              <span className={`status-badge ${order.trangThai?.toLowerCase()}`}>
                {order.trangThai}
              </span>
            </p>
            <p><strong>Hình thức thanh toán:</strong> {order.hinhThucThanhToan}</p>
          </div>
        </div>

        <div className="order-info-card">
          <h3>Thông tin khách hàng</h3>
          <div className="info-group">
            <p><strong>Họ tên:</strong> {order.hoTen}</p>
            <p><strong>Địa chỉ:</strong> {order.diaChi}</p>
            <p><strong>Điện thoại:</strong> {order.dienThoai}</p>
            <p><strong>Email:</strong> {order.email}</p>
          </div>
        </div>
      </div>

      <div className="order-products-card">
        <h3>Sản phẩm đã đặt</h3>
        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {order.sanPham && order.sanPham.map((product) => (
                product.items && product.items.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="product-info">
                        <img 
                          src={imageErrors[item._id] 
                            ? '/img/default.jpg' 
                            : `/img/${item.hinh_anh.chinh}`}
                          alt={item.ten_sp}
                          style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                          onError={() => {
                            if (!imageErrors[item._id]) {
                              setImageErrors(prev => ({
                                ...prev,
                                [item._id]: true
                              }));
                            }
                          }}
                        />
                        <div className="product-details">
                          <p className="product-name">{item.ten_sp}</p>
                          <p className="product-code">Mã SP: {item.ma_san_pham}</p>
                        </div>
                      </div>
                    </td>
                    <td>{formatCurrency(item.gia_sp)}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.gia_sp * item.quantity)}</td>
                  </tr>
                ))
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3"><strong>Tổng tiền:</strong></td>
                <td><strong>{formatCurrency(calculateTotal())}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {order.ghiChu && (
        <div className="order-note-card">
          <h3>Ghi chú</h3>
          <p>{order.ghiChu}</p>
        </div>
      )}
    </div>
  );
} 