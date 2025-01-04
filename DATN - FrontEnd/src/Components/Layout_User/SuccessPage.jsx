import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function SuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const tempOrder = JSON.parse(localStorage.getItem("tempOrder"));
  
    if (tempOrder && !tempOrder.processed) {
      tempOrder.processed = true;
      localStorage.setItem("tempOrder", JSON.stringify(tempOrder));
  
      // Gửi đơn hàng và cập nhật số lượng
      axios
        .post("http://localhost:3000/api/donHang", tempOrder)
        .then(async (response) => {
          if (response.status === 200) {
            // Gửi yêu cầu trừ số lượng sản phẩm
            try {
              const productUpdates = tempOrder.sanPham.map((item) => {
                return axios.post("http://localhost:3000/api/updateProductQuantity", {
                  productId: item.id,
                  quantityPurchased: item.soLuong,
                });
              });
  
              // Chờ tất cả các yêu cầu hoàn thành
              await Promise.all(productUpdates);
  
              // Xóa dữ liệu cục bộ sau khi xử lý
              localStorage.removeItem("tempOrder");
              localStorage.removeItem("cartItem");
              window.dispatchEvent(new Event("cartUpdated"));
            } catch (error) {
              console.error("Lỗi khi cập nhật số lượng sản phẩm:", error);
              alert("Thanh toán thành công nhưng không thể cập nhật kho.");
            }
          }
        })
        .catch((error) => {
          console.error("Lỗi khi gửi đơn hàng:", error);
          alert("Không thể xử lý đơn hàng. Vui lòng liên hệ hỗ trợ.");
        });
    }
  }, []);
   // Chỉ chạy một lần khi component được mount

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
          <button className="back-home-btn" onClick={() => navigate("/")}>
            <i className="fas fa-home"></i>
            <span>Quay về trang chủ</span>
          </button>
        </div>
      </div>
    </div>
  );
}
