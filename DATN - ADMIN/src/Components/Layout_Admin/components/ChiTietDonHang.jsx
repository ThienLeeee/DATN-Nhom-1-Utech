import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '/public/css/ChiTietDonHang.css';

export default function ChiTietDonHang() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [imageErrors, setImageErrors] = useState({});

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

  // const formatCurrency = (amount) => {
  //   return new Intl.NumberFormat('vi-VN', {
  //     style: 'currency',
  //     currency: 'VND'
  //   }).format(amount);
  // };

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
 // Hàm format tiền tệ
 const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

  // const calculateTotal = () => {
  //   if (!order.sanPham) return 0;
    
  //   return order.sanPham.reduce((total, product) => {
  //     if (!product.items) return total;
      
  //     const productTotal = product.items.reduce((sum, item) => {
  //       return sum + (item.gia_sp * item.quantity);
  //     }, 0);
      
  //     return total + productTotal;
  //   }, 0);
  // };

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
            <p><p><strong>Trạng thái:</strong> 
              <span className={`status-badge ${order.trangThai?.toLowerCase()}`}>
                {order.trangThai}
              </span>
            </p>

            {order.trangThai === "Hủy" && (
              <div className="cancel-reason">
                <p><strong>Lý do hủy:</strong> {order.lyDoHuy || "Không có lý do"}</p>
              </div>
            )}

            {order.trangThai === "Hoàn thành" && order.danhGia && (
              <div className="completion-review">
           
               
                <p><strong>Đánh giá sao:</strong>  <span>{'⭐'.repeat(order.danhGia)}</span></p>
              </div>
            )}

           
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
  
      {order.sanPham && (
        <div className="order-products">
          <h3>Thông tin sản phẩm</h3>
          <div className="products-list">
            {order.sanPham.map((item, index) => (
              <div key={index} className="product-item">
                <div className="product-image">
                  <img 
                    src={`/img/sanpham/${item.hinh_anh?.chinh}`} 
                    alt={item.ten_sp} 
                    onError={(e) => { e.target.src = '/img/icon/default-product.png'; }}
                  />
                </div>
                <div className="product-details">
                  <h4 style={{marginTop:"17px"}}>{item.ten_sp}</h4>
                  <div className="price-qty">
                           <div className="summary-item">
                           <p><strong>Giá sản phẩm:</strong></p>
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
                           </div>
                            
                            <div className="summary-item">
                            <p><strong>Số lượng:</strong></p>
                            <span className="quantity"> {item.soLuong}</span>
                            </div>
                            
                          </div>
                 
           
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
  
  <div className="order-summary">
      <h3>Tóm tắt đơn hàng</h3>
     
      <div className="summary-item">
        <p><strong>Giảm giá:</strong></p>
        <p>{formatCurrency(order.giamGia)}</p>
      </div>
      <div className="summary-item">
        <p><strong>Tổng tiền hàng:</strong></p>
        <p>{formatCurrency(order.tongTien)}</p>
      </div>
      <div className="summary-item">
        <p><strong>Trạng thái thanh toán:</strong></p>
        <p>{order.trangthai_thanhtoan}</p>
      </div>
      <div className="summary-item">
        <p><strong>Hình thức thanh toán:</strong></p>
        <p>{order.hinhThucThanhToan}</p>
      </div>
    </div>
  
     
    </div>
  );
  
} 