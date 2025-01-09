import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '/public/css/taikhoan.css';

export default function Taikhoan() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Hàm format ngày tháng
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mảng chứa các thông tin cần hiển thị
  const userInfo = [
    { label: 'Tên đăng nhập', value: user?.username },
    { label: 'Họ và tên', value: user?.fullname },
    { label: 'Email', value: user?.email },
    { label: 'Ngày sinh', value: formatDate(user?.birthday) },
    { label: 'Giới tính', value: user?.gender },
    { label: 'Số điện thoại', value: user?.phone },
    { label: 'Địa chỉ', value: user?.address }
  ];

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
          <Link to="/taikhoan" className="menu-item active">
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
          <Link to="/voucher" className="menu-item ">
            <i className="fas fa-ticket-alt"></i>
            <span>Voucher của tôi</span>
          </Link>
          <button onClick={handleLogout} className="menu-item logout">
            <i className="fas fa-sign-out-alt"></i>
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      <div className="account-content">
        <div className="content-header">
          <h2>Thông tin tài khoản</h2>
        </div>
        <div className="account-info">
          {userInfo.map((info, index) => (
            // Chỉ hiển thị thông tin nếu có giá trị
            info.value && (
              <div key={index} className="info-group">
                <label>{info.label}:</label>
                <span>{info.value}</span>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
