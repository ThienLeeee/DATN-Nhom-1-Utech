
import { useNavigate } from "react-router-dom";
export default function SuccessPage() {
    const navigate = useNavigate();
  
    return (
      <div className="success-page">
        <div className="success-container">
          <div className="success-content">
            <div className="success-image">
              <img
                src="/public/img/icon/bangboo-pay.gif"
                alt="Thanh toán thành công"
              />
            </div>
            <h1 className="success-title">THANH TOÁN THÀNH CÔNG!</h1>
            <p className="success-message">
              Cảm ơn bạn đã quan tâm đến sản phẩm của chúng tôi.
            </p>
            <button
              className="back-home-btn"
              onClick={() => navigate("/")}
            >
              <i className="fas fa-home"></i>
              <span>Quay về trang chủ</span>
            </button>
          </div>
        </div>
      </div>
    );
  }