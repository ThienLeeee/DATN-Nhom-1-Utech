import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

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
      const response = await axios.post("http://localhost:3000/api/accounts/login", {
        username,
        password,
      });

      const { user, token } = response.data;

      if (user.role === "admin") {
        window.location.href = "http://localhost:5174/";
        return;
      }

      login(user);
      localStorage.setItem("token", token);
      setShowSuccessPopup(true);

      setTimeout(() => {
        window.location.href = "http://localhost:5173/";
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

  // Facebook login
  const responseFacebook = async (response) => {
    if (response.accessToken) {
      try {
        const res = await axios.post('http://localhost:3000/api/facebook-login', {
          accessToken: response.accessToken,
        });

        const { user, token } = res.data;
        console.log('User:', user);
        console.log('Token:', token);
        login(user);
        // Lưu token vào localStorage
        localStorage.setItem('token', token);

        // Chuyển hướng về trang chủ
        navigate('/'); // Sử dụng React Router để chuyển hướng
        alert('Đăng nhập bằng Facebook thành công');
      } catch (error) {
        console.error('Facebook login failed:', error);
      }
    }
  };

  // Google login
  const GOOGLE_CLIENT_ID = "961938347086-inarcnt70odddjhmnecu42igfiingl0r.apps.googleusercontent.com";

  const responseGoogle = async (response) => {
    if (response.credential) {
      try {
        const res = await axios.post('http://localhost:3000/api/auth/google', { token: response.credential });

        console.log("Google login successful:", res.data);
        const { user, token } = res.data;
        console.log('User:', user);
        console.log('Token:', token);
        login(user);
        // Lưu token vào localStorage
        localStorage.setItem('token', token);

        // Chuyển hướng về trang chủ
        navigate('/'); // Sử dụng React Router để chuyển hướng
        alert('Đăng nhập bằng Google thành công');
      } catch (error) {
        console.error("Error during Google login:", error);
        alert('Login failed');
      }
    } else {
      console.error('Google credential is missing!');
      alert('Login failed');
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
