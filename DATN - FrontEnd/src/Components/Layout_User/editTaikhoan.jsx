import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '/public/css/taikhoan.css';

export default function EditTaikhoan() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const [formData, setFormData] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    birthday: user?.birthday || '',
    gender: user?.gender || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Chỉ cho phép nhập số
      const phoneNumber = value.replace(/\D/g, '');
      
      // Cập nhật giá trị mà không hiển thị lỗi
      setFormData({
        ...formData,
        [name]: phoneNumber
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    setPasswordError(''); // Xóa thông báo lỗi khi người dùng nhập
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();

    // Kiểm tra số điện thoại khi submit
    const phoneRegex = /^0[3|5|7|8|9][0-9]{8}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      toast.error('Số điện thoại không hợp lệ!');
      setPhoneError('Số điện thoại chưa hợp lệ');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/update/${user.id}`, 
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.success) {
        // Cập nhật thông tin user trong context
        updateUser(response.data.user);
        
        toast.success('Cập nhật thông tin thành công!');
        
        // Đợi toast hiển thị xong rồi mới chuyển trang
        setTimeout(() => {
          navigate('/taikhoan');
        }, 2000);
      } else {
        toast.error(response.data.message || 'Cập nhật thông tin thất bại!');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật:', error);
      toast.error(error.response?.data?.message || 'Lỗi khi cập nhật thông tin!');
    }
  };

  const handleSendVerification = async (type) => {
    try {
      await axios.post('/api/users/send-verification', { email: user.email });
      setVerificationStep(true);
    } catch (error) {
      alert('Lỗi khi gửi mã xác thực');
    }
  };

  const handleVerifyAndUpdate = async (type) => {
    try {
      const data = {
        verificationCode,
        ...(type === 'phone' ? { newPhone } : { newPassword })
      };
      
      const response = await axios.post(`/api/users/verify-and-update/${user.id}`, data);
      if (response.data.success) {
        alert('Cập nhật thành công');
        setShowPhoneModal(false);
        setShowPasswordModal(false);
        setVerificationStep(false);
      }
    } catch (error) {
      alert('Lỗi khi xác thực và cập nhật');
    }
  };

  const handlePasswordChange = async () => {
    try {
      // Kiểm tra mật khẩu mới và xác nhận mật khẩu
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setPasswordError('Mật khẩu mới và xác nhận mật khẩu không khớp');
        return;
      }

      // Kiểm tra mật khẩu hiện tại
      const verifyResponse = await axios.post(
        `http://localhost:3000/api/users/verify-password/${user.id}`,
        { currentPassword: passwordData.currentPassword }
      );

      if (verifyResponse.data.success) {
        // Nếu mật khẩu hiện tại đúng, cập nhật mật khẩu mới
        const updateResponse = await axios.put(
          `http://localhost:3000/api/users/update/${user.id}`,
          { password: passwordData.newPassword }
        );

        if (updateResponse.data.success) {
          setShowPasswordModal(false);
          setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
          toast.success('Mật khẩu đã được thay đổi thành công!', {
            position: "top-right",
            autoClose: 3000
          });
        }
      }
    } catch (error) {
      setPasswordError(error.response?.data?.message || 'Mật khẩu hiện tại không đúng');
    }
  };

  return (
    <div className="account-container">
      <ToastContainer />
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
          <Link to="/chinhsuathongtin" className="menu-item active">
            <i className="fas fa-edit"></i>
            <span>Chỉnh sửa thông tin</span>
          </Link>
          <Link to="/donhang" className="menu-item">
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
          <h2>Chỉnh sửa thông tin</h2>
        </div>
        <div className="edit-form">
          <form onSubmit={handleUpdateInfo}>
            <div className="form-group">
              <label>Tên đăng nhập:</label>
              <input type="text" value={user?.username} disabled />
            </div>
            
            <div className="form-group">
              <label>Họ và tên:</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Ngày sinh:</label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Giới tính:</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange}>
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                Số điện thoại:
                {phoneError && <span className="required-star">*</span>}
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Nhập số điện thoại (VD: 0345678901)"
                maxLength="10"
                className={phoneError ? 'error-input' : ''}
                onFocus={() => setIsPhoneFocused(true)}
                onBlur={() => setIsPhoneFocused(false)}
              />
              {phoneError && (
                <span className="error-message" style={{ color: '#ff4d4f', fontSize: '14px' }}>
                  {phoneError}
                </span>
              )}
              {isPhoneFocused && (
                <small style={{ color: '#666', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                  * Số điện thoại phải bắt đầu bằng số 0, tiếp theo là 3,5,7,8,9 và đủ 10 số
                </small>
              )}
            </div>

            <div className="form-group">
              <label>Địa chỉ:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Mật khẩu:</label>
              <div className="password-input">
                <input type="password" value="********" disabled />
                <button type="button" onClick={() => setShowPasswordModal(true)}>
                  Thay đổi
                </button>
              </div>
            </div>

            <button type="submit" className="update-btn">
              Cập nhật thông tin
            </button>
          </form>
        </div>

        {/* Modal đổi mật khẩu */}
        {showPasswordModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Thay đổi mật khẩu</h3>
              
              <div className="form-group">
                <label>Mật khẩu hiện tại:</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordInputChange}
                  placeholder="Nhập mật khẩu hiện tại"
                />
              </div>
              
              <div className="form-group">
                <label>Mật khẩu mới:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordInputChange}
                  placeholder="Nhập mật khẩu mới"
                />
              </div>

              <div className="form-group">
                <label>Xác nhận mật khẩu mới:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordInputChange}
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>
              
              {passwordError && (
                <div className="error-message">
                  {passwordError}
                </div>
              )}
              
              <div className="modal-buttons">
                <button onClick={handlePasswordChange}>Xác nhận</button>
                <button onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordError('');
                  setPasswordData({ 
                    currentPassword: '', 
                    newPassword: '', 
                    confirmPassword: '' 
                  });
                }}>Hủy</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
