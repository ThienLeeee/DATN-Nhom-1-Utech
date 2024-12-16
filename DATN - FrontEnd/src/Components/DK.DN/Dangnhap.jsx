import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "/public/css/dangnhap.css";
import "/public/css/popup.css";
import { useAuth } from '../../context/AuthContext';

export default function Dangnhap() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [previousPath, setPreviousPath] = useState(null);

  useEffect(() => {
    const savedPath = localStorage.getItem('previousPath');
    if (savedPath) {
      setPreviousPath(savedPath);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post('http://localhost:3000/api/accounts/login', {
        username,
        password
      });

      const { user, token } = response.data;

      // Kiểm tra role của user
      if (user.role === 'admin') {
        // Nếu là admin, chuyển hướng đến trang admin
        window.location.href = "http://localhost:5174/"; // URL của trang admin
        return;
      }

      // Nếu là user thường, tiếp tục xử lý đăng nhập bình thường
      login(user);
      localStorage.setItem('token', token);
      setShowSuccessPopup(true);
      
      setTimeout(() => {
        setShowSuccessPopup(false);
        if (previousPath) {
          navigate(previousPath);
          localStorage.removeItem('previousPath');
        } else {
          navigate('/');
        }
      }, 2000);

    } catch (error) {
      setError(error.response?.data?.message || "Đăng nhập thất bại!");
    }
  };

  const togglePassword = () => {
    const passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
  };

  const handlePopupClick = () => {
    setShowSuccessPopup(false);
    if (previousPath) {
      navigate(previousPath);
      localStorage.removeItem('previousPath');
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <div className="container login-container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="login-card">
              <h3 className="text-center mb-4">Đăng nhập</h3>
              <form onSubmit={handleLogin}>
                <div className="mb-3 position-relative">
                  <label htmlFor="username" className="form-label">
                    Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 position-relative">
                  <label htmlFor="password" className="form-label">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span className="eye-icon" onClick={togglePassword}>
                    <img
                      src="https://img.icons8.com/ios-filled/16/000000/visible.png"
                      alt="Show Password"
                    />
                  </span>
                </div>
                {error && (
                  <div className="alert alert-danger text-center">{error}</div>
                )}
               
                <button type="submit" className="btn btn-primary w-100">
                  Đăng nhập
                </button>
              </form>
              <hr />
              <div className="text-center mb-3">
                Bạn chưa có tài khoản? <Link to="/Dangky">Đăng ký</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Thông báo chào mừng dạng pop-up cho admin */}
        {showAlert && (
          <div className="modal-popup">
            <div className="modal-content">
              <span className="close-button" onClick={() => setShowAlert(false)}>
                &times;
              </span>
              <img
                src="/public/img/logo/logo_no_bg.png"
                alt="Welcome Icon"
                className="modal-image"
              />
              <button
                className="modal-button"
                onClick={() => {
                  window.location.href = "http://localhost:5174/";
                }}
              >
                Đi đến trang Admin
              </button>
            </div>
          </div>
        )}

        {showSuccessPopup && (
          <div className="popup-overlay" onClick={handlePopupClick}>
            <div className="popup-content">
              <h3 className="popup-title">Đăng nhập thành công!</h3>
              <p className="popup-message">
                {previousPath ? "Đang chuyển bạn về trang trước đó..." : "Chào mừng bạn đã quay trở lại."}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
