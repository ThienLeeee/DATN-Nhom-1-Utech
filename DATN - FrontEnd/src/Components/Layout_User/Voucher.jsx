import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';
import '/public/css/taikhoan.css';

export default function Voucher() {
  const { user,logout } = useAuth();
  const navigate = useNavigate();
  const [availableVouchers, setAvailableVouchers] = useState([]); 
  const [myVouchers, setMyVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('my-vouchers');
  const [isReceiving, setIsReceiving] = useState(false);
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
    const fetchVouchers = async () => {
      if (!user) {
        navigate('/Dangnhap');
        return;
      }

      try {
        // Lấy tất cả voucher có sẵn
        const vouchersResponse = await axios.get('http://localhost:3000/api/vouchers');
        
        // Lấy voucher của user
        const myVouchersResponse = await axios.get(`http://localhost:3000/api/vouchers/user/${user.id}`);

        // Lọc voucher còn hiệu lực và chưa nhận
        const activeVouchers = vouchersResponse.data.filter(voucher => {
          const isActive = voucher.active;
          const isValid = new Date(voucher.end_date) >= new Date();
          const hasQuantity = voucher.quantity > voucher.used_count;
          const notReceived = !myVouchersResponse.data.some(mv => mv.id === voucher.id);
          
          return isActive && isValid && hasQuantity && notReceived;
        });

        // Lọc voucher của user để loại bỏ những voucher không còn tồn tại trong database
        const validUserVouchers = myVouchersResponse.data.filter(userVoucher => 
          vouchersResponse.data.some(v => v.id === userVoucher.id)
        );

        setAvailableVouchers(activeVouchers);
        setMyVouchers(validUserVouchers);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách voucher:', error);
        toast.error('Có lỗi xảy ra khi tải voucher');
      } finally {
        setLoading(false);
      }
    };

    // Gọi lần đầu khi component mount
    fetchVouchers();

    // Thiết lập interval để poll mỗi 30 giây
    const intervalId = setInterval(fetchVouchers, 30000);

    // Cleanup khi component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [user, navigate]);



  const handleReceiveVoucher = async (voucherId) => {
    if (isReceiving) return;
    
    setIsReceiving(true);
    try {
      const response = await axios.post('http://localhost:3000/api/vouchers/receive', {
        userId: user.id,
        voucherId: voucherId
      });

      if (response.data.success) {
        // Cập nhật lại danh sách voucher có sẵn
        setAvailableVouchers(prev => 
          prev.filter(v => v.id !== voucherId)
        );

        // Thêm voucher mới vào danh sách voucher của tôi
        setMyVouchers(prev => [...prev, response.data.userVoucher]);

        // Hiển thị thông báo thành công
        toast.success('Nhận voucher thành công!');

        // Chuyển sang tab voucher của tôi
        setActiveTab('my-vouchers');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Lỗi khi nhận voucher';
      toast.error(errorMessage);
    } finally {
      setIsReceiving(false);
    }
  };

  const copyVoucherCode = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success('Đã sao chép mã voucher!');
    }).catch(() => {
      toast.error('Không thể sao chép mã voucher');
    });
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
          <Link to="/donhang" className="menu-item">
            <i className="fas fa-shopping-bag"></i>
            <span>Thông tin đơn hàng</span>
          </Link>
          <Link to="/voucher" className="menu-item active">
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
          <h2>Voucher</h2>
        </div>

        <div className="voucher-tabs">
          <button 
            className={`tab-btn ${activeTab === 'my-vouchers' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-vouchers')}
          >
            Voucher của tôi
          </button>
          <button 
            className={`tab-btn ${activeTab === 'available-vouchers' ? 'active' : ''}`}
            onClick={() => setActiveTab('available-vouchers')}
          >
            Nhận Voucher
          </button>
        </div>

        <div className="vouchers-container">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Đang tải voucher...</p>
            </div>
          ) : activeTab === 'my-vouchers' ? (
            myVouchers.length > 0 ? (
              <div className="vouchers-grid">
                {myVouchers.map((voucher) => (
                  <div key={voucher.id} className="voucher-box">
                    <div className="voucher-content">
                      <div className="voucher-info">
                        <h3 className="voucher-value">
                          {voucher.discount_type === 'percent' 
                            ? `Giảm ${voucher.discount_value}%` 
                            : `Giảm ${voucher.discount_value?.toLocaleString('vi-VN') || 0}đ`}
                        </h3>
                        <p className="min-order">
                          Đơn tối thiểu {voucher.min_order_value?.toLocaleString('vi-VN') || 0}đ
                        </p>
                        {voucher.max_discount && (
                          <p className="max-discount">
                            Giảm tối đa {voucher.max_discount?.toLocaleString('vi-VN') || 0}đ
                          </p>
                        )}
                        <p className="expiry">
                          HSD: {new Date(voucher.end_date).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                      <div className="voucher-code">
                        <span>{voucher.code}</span>
                        <button onClick={() => copyVoucherCode(voucher.code)}>
                          <i className="fas fa-copy"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-vouchers">
                <span className="voucher-icon">
                  <i className="fas fa-ticket-alt"></i>
                </span>
                <p>Bạn chưa có voucher nào</p>
                <button 
                  className="get-voucher-btn"
                  onClick={() => setActiveTab('available-vouchers')}
                >
                  Nhận Voucher Ngay
                </button>
              </div>
            )
          ) : (
            availableVouchers.length > 0 ? (
              <div className="vouchers-grid">
                {availableVouchers.map((voucher) => (
                  <div key={voucher.id} className="voucher-box available">
                    <div className="voucher-content">
                      <div className="voucher-info">
                        <h3 className="voucher-value">
                          {voucher.discount_type === 'percent' 
                            ? `Giảm ${voucher.discount_value}%` 
                            : `Giảm ${voucher.discount_value?.toLocaleString('vi-VN') || 0}đ`}
                        </h3>
                        <p className="min-order">
                          Đơn tối thiểu {voucher.min_order_value?.toLocaleString('vi-VN') || 0}đ
                        </p>
                        {voucher.max_discount && (
                          <p className="max-discount">
                            Giảm tối đa {voucher.max_discount?.toLocaleString('vi-VN') || 0}đ
                          </p>
                        )}
                        <p className="expiry">
                          HSD: {new Date(voucher.end_date).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                      <button 
                        className="receive-btn"
                        onClick={() => handleReceiveVoucher(voucher.id)}
                        disabled={isReceiving}
                      >
                        {isReceiving ? 'Đang xử lý...' : 'Nhận'}
                      </button>
                    </div>
                    <div className="voucher-footer">
                      <span className="remaining">
                        Còn lại: {(voucher.quantity - (voucher.used_count || 0)) || 0}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-vouchers">
                <span className="voucher-icon">
                  <i className="fas fa-ticket-alt"></i>
                </span>
                <p>Hiện không có voucher nào khả dụng</p>
              </div>
            )
          )}

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
      </div>
    </div>
  );
}
