import { useState, useEffect } from 'react';
import '/public/css/Admin_dh.css';
import { useNavigate } from 'react-router-dom';

export default function Admin_dh() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/donHang');
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Lấy đơn hàng hiện tại
      const currentOrder = orders.find((order) => order.id === orderId);
  
      // Lấy chỉ số của trạng thái hiện tại và trạng thái mới
      const currentStatusIndex = validStatusOrder.indexOf(currentOrder.trangThai);
      const newStatusIndex = validStatusOrder.indexOf(newStatus);
  
      // Kiểm tra nếu trạng thái mới không hợp lệ (quay ngược lại trạng thái trước)
      if (newStatusIndex < currentStatusIndex) {
        alert("Bạn không thể quay lại trạng thái trước đó.");
        return;
      }
  
      // Gửi yêu cầu cập nhật trạng thái lên server
      const response = await fetch(
        `http://localhost:3000/api/donHang/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ trangThai: newStatus }),
        }
      );
  
      if (response.ok) {
        // Cập nhật danh sách đơn hàng sau khi thay đổi trạng thái
        fetchOrders();
      } else {
        console.error("Lỗi khi cập nhật trạng thái:", await response.text());
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };
  

  const filterOrders = () => {
    if (selectedStatus === 'all') return orders;
    return orders.filter(order => order.trangThai === selectedStatus);
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }
  const validStatusOrder = [
    "Đang xử lý",
    "Đang vận chuyển",
    "Hoàn thành",
    "Hủy",
  ];
  
  return (
    <div className="admin-orders">
      <h2 className="page-title">Quản lý đơn hàng</h2>
      
      <div className="filters">
        <select 
          value={selectedStatus} 
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="status-filter"
        >
          <option value="all">Tất cả đơn hàng</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Đang giao hàng">Đang vận chuyển</option>
          <option value="Đã giao hàng">Hoàn thành</option>
          <option value="Đã hủy">Hủy</option>
        </select>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Mã ĐH</th>
              <th>Ngày đặt</th>
              <th>Khách hàng</th>
              <th>Thông tin liên hệ</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filterOrders().map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{formatDate(order.ngayDat)}</td>
                <td>
                  <div>{order.hoTen}</div>
                  <div className="address">{order.diaChi}</div>
                </td>
                <td>
                  <div>ĐT: {order.dienThoai}</div>
                  <div>Email: {order.email}</div>
                </td>
                <td className="price">{formatCurrency(order.tongTien)}</td>
                <td>
                  <span className={`status-badge ${order.trangThai?.toLowerCase()}`}>
                    {order.trangThai}
                  </span>
                </td>
                <td>
                  <select
                    value={order.trangThai}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đang vận chuyển">Đang vận chuyển</option>
                    <option value="Hoàn thành">Hoàn Thành</option>
                    <option value="Hủy">Hủy</option>
                  </select>
                  <button 
                    className="view-detail-btn"
                    onClick={() => navigate(`/admin-dh/${order.id}`)}
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
