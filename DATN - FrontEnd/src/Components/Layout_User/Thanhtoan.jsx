import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/public/css/thanhtoan.css";

export default function Thanhtoan() {
  
  const [formData, setFormData] = useState({
    ten_thanhtoan: "",
    diachi_thanhtoan: "",
    dienthoai_thanhtoan: "",
    email_thanhtoan: "",
    noidung_thanhtoan: "",
    ht_thanhtoan: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra nếu thiếu bất kỳ trường nào
    if (
      !formData.ten_thanhtoan ||
      !formData.diachi_thanhtoan ||
      !formData.dienthoai_thanhtoan ||
      !formData.email_thanhtoan ||
      !formData.ht_thanhtoan
    ) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
   // Xóa giỏ hàng khỏi localStorage
  localStorage.removeItem("checkoutItems");

    // Lưu đơn hàng tạm thời vào localStorage
    const checkoutItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];
    const order = {
      ...formData,
      items: checkoutItems,
      orderDate: new Date().toLocaleString(),
    };
    localStorage.setItem("order", JSON.stringify(order));

    // Hiển thị thông báo thành công
    setIsSuccess(true);

    
  };

  return (
    <div className="wrap-main wrap-page">
      {!isSuccess ? (
        <div className="sub_main">
          <div className="title_main">
            <span>Thanh toán</span>
          </div>
          <div className="content_main">
            <div className="checkout-container">
              <form className="checkout-form" onSubmit={handleSubmit}>
                {/* Thông tin giao hàng */}
                <div className="left-thanhtoan">
                  <h2 className="section-title">Thông tin giao hàng</h2>
                  <div className="form-group">
                    <label htmlFor="ten_thanhtoan">Họ và tên</label>
                    <input
                      type="text"
                      id="ten_thanhtoan"
                      name="ten_thanhtoan"
                      value={formData.ten_thanhtoan}
                      onChange={handleChange}
                      placeholder="Nhập họ và tên"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="diachi_thanhtoan">Địa chỉ</label>
                    <input
                      type="text"
                      id="diachi_thanhtoan"
                      name="diachi_thanhtoan"
                      value={formData.diachi_thanhtoan}
                      onChange={handleChange}
                      placeholder="Nhập địa chỉ"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dienthoai_thanhtoan">Điện thoại</label>
                    <input
                      type="text"
                      id="dienthoai_thanhtoan"
                      name="dienthoai_thanhtoan"
                      value={formData.dienthoai_thanhtoan}
                      onChange={handleChange}
                      placeholder="Nhập số điện thoại"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email_thanhtoan">Email</label>
                    <input
                      type="email"
                      id="email_thanhtoan"
                      name="email_thanhtoan"
                      value={formData.email_thanhtoan}
                      onChange={handleChange}
                      placeholder="Nhập email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="noidung_thanhtoan">Ghi chú</label>
                    <textarea
                      id="noidung_thanhtoan"
                      name="noidung_thanhtoan"
                      value={formData.noidung_thanhtoan}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Ghi chú thêm..."
                    />
                  </div>
                </div>
                {/* Hình thức thanh toán */}
                <div className="right-thanhtoan">
                  <h2 className="section-title">Hình thức thanh toán</h2>
                  <div className="form-group payment-method">
                    <input
                      type="radio"
                      id="payment_cod"
                      name="ht_thanhtoan"
                      value="THANH TOÁN KHI NHẬN HÀNG"
                      onChange={handleChange}
                    />
                    <label htmlFor="payment_cod">Thanh toán khi nhận hàng</label>
                  </div>
                  <div className="form-group submit-button">
                    <button type="submit" className="btn-thanhtoan">
                      Thanh Toán
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="popup-overlay">
        <div className="popup-container">
          <h2>Thanh toán thành công!</h2>
          <button
            className="btn-home"
            onClick={() => navigate("/")}
          >
            Về trang chủ
          </button>
        </div>
      </div>
      )}
    </div>
  );
}
