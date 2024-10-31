import { useState } from "react";
import { Link } from "react-router-dom";
import "/public/css/dangnhap.css";
export default function Dangnhap() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "123") {
      setShowAlert(true);
      setError("");
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
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
                  <label htmlFor="fullname" className="form-label">
                    Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <div className="text-end mb-3">
                  <a href="#">Quên mật khẩu?</a>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Đăng nhập
                </button>
              </form>
              <hr />
              <div className="text-center mb-3">
                Bạn chưa có tài khoản? <Link to="/Dangky">Đăng ký</Link>
              </div>
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
              <div className="footer-text mt-3">
                Bạn đã có tài khoản? <a href="#">Đăng nhập!</a>
              </div>
            </div>
          </div>
        </div>

        {/* Thông báo chào mừng dạng pop-up */}
        {showAlert && (
          <div className="modal-popup">
          <div className="modal-content">
              {/* Dấu "X" để đóng pop-up */}
              <span className="close-button" onClick={() => setShowAlert(false)}>
                  &times; {/* Ký tự đại diện cho dấu X */}
              </span>
      
              <img
                  src="/public/img/logo/logo_no_bg.png"
                  alt="Welcome Icon"
                  className="modal-image"
              />
            
              <button
                  className="modal-button"
                  onClick={() => (window.location.href = "http://localhost:5174/")}
              >
                  Đi đến trang Admin
              </button>
          </div>
      </div>
      
        )}
      </div>
    </>
  );
}
