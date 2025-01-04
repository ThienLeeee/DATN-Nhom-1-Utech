import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "/public/css/password.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Gửi email xác thực
  const handleSendVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/accounts/forgot-password', { email });
      setMessage("Mã xác thực đã được gửi đến email của bạn");
      setStep(2);
    } catch (error) {
      setError(error.response?.data?.message || "Không thể gửi mã xác thực");
    }
  };

  // Xác thực mã
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/accounts/verify-code', {
        email,
        verificationCode
      });
      setMessage("Mã xác thực hợp lệ");
      setStep(3);
    } catch (error) {
      setError(error.response?.data?.message || "Mã xác thực không hợp lệ");
    }
  };

  // Đặt lại mật khẩu
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/accounts/reset-password', {
        email,
        verificationCode,
        newPassword
      });
      setMessage("Đặt lại mật khẩu thành công");
      setTimeout(() => navigate('/Dangnhap'), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Không thể đặt lại mật khẩu");
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h3 className="reset-password-title">Quên mật khẩu</h3>

        <div className="step-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>1</div>
          <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>2</div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        {step === 1 && (
          <form className="reset-password-form" onSubmit={handleSendVerification}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Gửi mã xác thực
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="reset-password-form" onSubmit={handleVerifyCode}>
            <div className="form-group">
              <label htmlFor="verificationCode">Mã xác thực</label>
              <input
                type="text"
                className="verification-code"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Xác thực
            </button>
          </form>
        )}

        {step === 3 && (
          <form className="reset-password-form" onSubmit={handleResetPassword}>
            <div className="form-group">
              <label htmlFor="newPassword">Mật khẩu mới</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Đặt lại mật khẩu
            </button>
          </form>
        )}

        <div className="back-to-login">
          <Link to="/Dangnhap">Quay lại đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}
