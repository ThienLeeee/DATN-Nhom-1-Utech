import '../../../public/css/thongtintaikhoan.css';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

export default function Thongtintaikhoan() {
  const { user, updateUser, logout } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    gioitinh: '',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Fetch user details from backend
      const fetchUserDetails = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:3000/api/user/${user.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const userData = response.data;
          console.log('Dữ liệu người dùng:', userData); // Debug dữ liệu
          setFormData({
            username: userData.username || '',
            gioitinh: userData.gioitinh || '',
            email: userData.email || '',
          });
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setLoading(false);
        }
      };

      fetchUserDetails();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:3000/api/user/${user.id}`,
        { email: formData.email },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage('Cập nhật thành công!');
        setIsEditing(false);
        // Update AuthContext với dữ liệu người dùng mới
        updateUser(response.data.user);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      setMessage('Cập nhật thất bại. Vui lòng thử lại.');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      logout();
      navigate('/');
    }
  };

  if (loading) {
    return <p>Đang tải thông tin người dùng...</p>;
  }

  if (!user) {
    return <p>Vui lòng đăng nhập để xem thông tin tài khoản.</p>;
  }

  return (
    <div className="account-page">
      <div className="sidebar">
        <ul>
      
          <Link to="/Thongtintaikhoan"><li>Thông tin tài khoản</li></Link>
         
          <Link to="/Thongtindonhang">
            <li>Thông tin đơn hàng</li>
          </Link>
          <li>
            <button onClick={handleLogout} className="logout-button">
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
      <div className="content">
        <h2>Thông tin tài khoản</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Họ Tên</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
          </div>
          <div className="form-group">
            <label>Giới tính</label>
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="gioitinh"
                  value="Nam"
                  checked={formData.gioitinh === 'Nam'}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />{' '}
                Nam
              </label>
              <label>
                <input
                  type="radio"
                  name="gioitinh"
                  value="Nữ"
                  checked={formData.gioitinh === 'Nữ'}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />{' '}
                Nữ
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            {!isEditing ? (
              <>
                <input type="email" id="email" value={formData.email} disabled />
                <butto className="edit-button" type="button" onClick={() => setIsEditing(true)}>
                  Thay đổi
                </butto>
              </>
            ) : (
              <>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="save-button">
                  LƯU THAY ĐỔI
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    // Reset form data to original user data
                    setFormData({
                      username: user.username || '',
                      gioitinh: user.gioitinh || '',
                      email: user.email || '',
                    });
                    setMessage('');
                  }}
                  className="cancel-button"
                >
                  Hủy
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}