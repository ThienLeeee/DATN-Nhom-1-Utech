import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '/public/css/popup.css';

export default function Dangky() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repassword: ''
  });
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/api/accounts/register', formData);
      if (response.status === 200) {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/Dangnhap');
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  const handlePopupClick = () => {
    setShowPopup(false);
    navigate('/Dangnhap');
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n    body {\n      background-color: #f7f7f7;\n    }\n    .register-container {\n      margin-top: 50px;\n    }\n    .register-card {\n      padding: 30px;\n      border-radius: 10px;\n      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);\n      background-color: #fff;\n    }\n    .social-btn {\n      width: 48%;\n    }\n    .footer-text {\n      text-align: center;\n      margin-top: 20px;\n    }\n    .footer-text a {\n      text-decoration: none;\n      color: #007bff;\n    }\n  "
        }}
      />
      <div className="container register-container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="register-card">
              <h3 className="text-center mb-4">Đăng ký tài khoản</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Tên đăng nhập</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Mật khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="repassword" className="form-label">Nhập lại mật khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                    id="repassword"
                    value={formData.repassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Tạo tài khoản</button>
              </form>
              <hr />
              <div className="text-center mb-3">Hoặc đăng ký bằng</div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-danger social-btn">
                  <img
                    src="https://img.icons8.com/color/16/000000/google-logo.png"
                    alt="Google Icon"
                  />{" "}
                  Google
                </button>
                <button className="btn btn-primary social-btn">
                  <img
                    src="https://img.icons8.com/color/16/000000/facebook-new.png"
                    alt="Facebook Icon"
                  />{" "}
                  Facebook
                </button>
              </div>
              <div className="text-center mb-3">
                Bạn đã có tài khoản?<Link to="/Dangnhap">Đăng Nhập</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Link Bootstrap JS */}
      
      {showPopup && (
        <div className="popup-overlay" onClick={handlePopupClick}>
          <div className="popup-content">
            <h3 className="popup-title">Đăng ký thành công!</h3>
            <p className="popup-message">Tài khoản của bạn đã được tạo thành công.</p>
          </div>
        </div>
      )}
    </>
  );
}