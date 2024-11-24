import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "/public/css/popup.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: nhập email, 2: nhập mã, 3: đổi mật khẩu
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Gửi yêu cầu lấy mã xác nhận
  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending request with email:', email);
      
      const response = await axios.post('http://localhost:3000/api/accounts/forgot-password', { 
        email: email 
      });
      
      console.log('Response:', response.data);

      if (response.data.success) {
        setStep(2);
        setError("");
      }
    } catch (error) {
      console.error('Error details:', error.response?.data);
      setError(error.response?.data?.message || "Email không tồn tại trong hệ thống!");
    }
  };

  // Xác nhận mã
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/accounts/verify-code', {
        email,
        code: verificationCode
      });
      if (response.data.success) {
        setStep(3);
        setError("");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Mã xác nhận không đúng!");
    }
  };

  // Đổi mật khẩu mới
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/accounts/reset-password', {
        email,
        code: verificationCode,
        newPassword
      });
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/dangnhap');
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Đổi mật khẩu thất bại!");
    }
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .forgot-container {
              margin-top: 50px;
              margin-bottom: 50px;
            }
            .forgot-card {
              background: #fff;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            }
            .back-link {
              color: #666;
              transition: all 0.3s ease;
              display: inline-flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 20px;
            }
            .back-link:hover {
              color: #007bff;
            }
            .form-label {
              font-weight: 500;
              color: #333;
              margin-bottom: 8px;
            }
            .form-control {
              padding: 12px;
              border: 1px solid #ddd;
              border-radius: 6px;
              transition: all 0.3s ease;
            }
            .form-control:focus {
              border-color: #007bff;
              box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
            }
            .btn-primary {
              padding: 12px;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              transition: all 0.3s ease;
            }
            .btn-primary:hover {
              transform: translateY(-1px);
              box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
            }
            .step-indicator {
              display: flex;
              justify-content: center;
              margin-bottom: 30px;
            }
            .step {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: #e9ecef;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 15px;
              position: relative;
              color: #666;
            }
            .step.active {
              background: #007bff;
              color: #fff;
            }
            .step::after {
              content: '';
              position: absolute;
              width: 30px;
              height: 2px;
              background: #e9ecef;
              right: -30px;
              top: 50%;
            }
            .step:last-child::after {
              display: none;
            }
          `
        }}
      />

      <div className="container forgot-container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="forgot-card">
              <Link to="/dangnhap" className="back-link">
                <i className="fas fa-arrow-left"></i> Quay lại đăng nhập
              </Link>
              
              <h3 className="text-center mb-4">Quên mật khẩu</h3>
              
              <div className="step-indicator">
                <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
                <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
                <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
              </div>

              {error && (
                <div className="alert alert-danger text-center mb-4">{error}</div>
              )}

              {step === 1 && (
                <form onSubmit={handleSendCode}>
                  <div className="mb-4">
                    <label className="form-label">Email của bạn</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Nhập email đã đăng ký"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Gửi mã xác nhận
                  </button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleVerifyCode}>
                  <div className="mb-4">
                    <label className="form-label">Mã xác nhận</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập mã đã gửi đến email của bạn"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Xác nhận
                  </button>
                </form>
              )}

              {step === 3 && (
                <form onSubmit={handleResetPassword}>
                  <div className="mb-4">
                    <label className="form-label">Mật khẩu mới</label>
                    <input
                      type="password"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Xác nhận mật khẩu</label>
                    <input
                      type="password"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Đổi mật khẩu
                  </button>
                </form>
              )}

              {success && (
                <div className="popup-overlay">
                  <div className="popup-content">
                    <h3 className="popup-title">Thành công!</h3>
                    <p className="popup-message">Mật khẩu đã được thay đổi.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
