import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Swal from 'sweetalert2';
import "/public/css/dangnhap.css";
import "/public/css/popup.css";
import { useAuth } from "../../context/AuthContext";

export default function Dangnhap() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [previousPath, setPreviousPath] = useState(null);

  useEffect(() => {
    const savedPath = localStorage.getItem("previousPath");
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
        password,
      });
  
      const { user, token } = response.data;
  
      if (user.role === 'admin') {
        window.location.href = "http://localhost:5174/";
        return;
      }
  
      login(user);
      localStorage.setItem('token', token);
  
      // Xóa giỏ hàng theo cấu trúc removeItem
      localStorage.removeItem("cartItem");
  
      // Dispatch event để cập nhật số lượng trong Header
      window.dispatchEvent(new Event("cartUpdated"));
  
      // Hiển thị thông báo đẹp bằng SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Đăng nhập thành công!',
        text: 'Chào mừng bạn đã quay trở lại.',
        showConfirmButton: false,
        timer: 1500
      });
  
      // Chuyển hướng về trang chủ sau khi thông báo biến mất
      setTimeout(() => {
        window.location.href = "http://localhost:5173/";
      }, 1500);
  
    } catch (error) {
      setError(error.response?.data?.message || "Đăng nhập thất bại!");
      
      // Hiển thị thông báo lỗi bằng SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Đăng nhập thất bại!',
        text: error.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.',
      });
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
  const GOOGLE_CLIENT_ID = "961938347086-inarcnt70odddjhmnecu42igfiingl0r.apps.googleusercontent.com";


  // Facebook login
  const responseFacebook = async (response) => {
    if (response.accessToken) {
      try {
        const res = await axios.post('http://localhost:3000/api/facebook-login', {
          accessToken: response.accessToken,
        });
  
        const { user, token } = res.data;
        login(user);
        // Lưu token vào localStorage
        localStorage.setItem('token', token);
  
        // Xóa giỏ hàng khỏi localStorage
        localStorage.removeItem("cartItem");
  
        // Dispatch event để cập nhật số lượng trong Header
        window.dispatchEvent(new Event("cartUpdated"));
  
        // Chuyển hướng về trang chủ
        navigate('/'); // Sử dụng React Router để chuyển hướng
  
        // Hiển thị thông báo đẹp bằng SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công!',
          text: 'Chào mừng bạn đã quay trở lại.',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        console.error('Facebook login failed:', error);
      }
    }
  };
  
  // Google login
  const responseGoogle = async (response) => {
    if (response.credential) {
      try {
        const res = await axios.post('http://localhost:3000/api/auth/google', { token: response.credential });
  
        const { user, token } = res.data;
        login(user);
        // Lưu token vào localStorage
        localStorage.setItem('token', token);
  
        // Xóa giỏ hàng khỏi localStorage
        localStorage.removeItem("cartItem");
  
        // Dispatch event để cập nhật số lượng trong Header
        window.dispatchEvent(new Event("cartUpdated"));
  
        // Chuyển hướng về trang chủ
        navigate('/'); // Sử dụng React Router để chuyển hướng
  
        // Hiển thị thông báo đẹp bằng SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công!',
          text: 'Chào mừng bạn đã quay trở lại.',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        console.error("Error during Google login:", error);
        Swal.fire({
          icon: 'error',
          title: 'Đăng nhập thất bại!',
          text: 'Đã có lỗi xảy ra. Vui lòng thử lại.',
        });
      }
    } else {
      console.error('Google credential is missing!');
      Swal.fire({
        icon: 'error',
        title: 'Đăng nhập thất bại!',
        text: 'Đã có lỗi xảy ra. Vui lòng thử lại.',
      });
    }
  };
  

  const failureGoogle = (error) => {
    console.error('Google login failed:', error);
    alert('Login failed');
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
              <div className="text-center mt-3">
                <p>Hoặc đăng nhập bằng:</p>
                <div className="d-flex justify-content-center">
                  <FacebookLogin
                    appId="1134390881723150" // Thay bằng App ID của bạn
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    textButton=" Facebook"
                    cssClass="btn btn-outline-primary me-3 p-2 flex-grow-1"
                    icon={<i className="fab fa-facebook-f me-2"></i>} // Sử dụng mã HTML của icon
                  />

                  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                    <div>
                      <GoogleLogin
                        onSuccess={responseGoogle}  // Handle successful login
                        onError={failureGoogle}      // Handle login failure
                        useOneTap
                      />
                    </div>
                  </GoogleOAuthProvider>

                  {/* <GoogleLogin
                  clientId="YOUR_GOOGLE_CLIENT_ID" // Thay bằng Google Client ID của bạn
                  buttonText="Google"
                  onSuccess={responseGoogle}
                  onFailure={(error) => console.error("Google login error:", error)}
                  cookiePolicy={"single_host_origin"}
                  className="btn btn-outline-danger flex-grow-1"
                /> */}
                </div>
              </div>
              <hr />
              <div className="text-center mb-3">
                <Link to="/forgot-password" className="text-decoration-none">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="text-center mb-3">
                Bạn chưa có tài khoản? <Link to="/Dangky">Đăng ký</Link>
              </div>
            </div>
          </div>
        </div>

        {showSuccessPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <div className="popup-icon">
                <img
                  src="https://img.icons8.com/ios-filled/50/4CAF50/checkmark.png"
                  alt="Success Icon"
                  className="check-icon"
                />
              </div>
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
