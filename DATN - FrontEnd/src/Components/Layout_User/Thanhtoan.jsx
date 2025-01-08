import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "/public/css/thanhtoan.css";
import axios from "axios";

export default function Thanhtoan() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ten_thanhtoan: "",
    diachi_thanhtoan: "",
    dienthoai_thanhtoan: "",
    email_thanhtoan: "",
    noidung_thanhtoan: "",
    ht_thanhtoan: "",
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        ten_thanhtoan: user.fullname || "",
        diachi_thanhtoan: user.address || "",
        dienthoai_thanhtoan: user.phone || "",
        email_thanhtoan: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (value) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    for (const key in formData) {
      if (key !== "noidung_thanhtoan" && !formData[key]) {
        newErrors[key] = true;
      }
    }

    if (!formData.ht_thanhtoan) {
      newErrors.ht_thanhtoan = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setPopupMessage("Vui lòng không để trống thông tin!");
      setShowPopup(true);
      return;
    }

    try {
      const cartItems = JSON.parse(localStorage.getItem("cartItem")) || [];
      if (cartItems.length > 0) {
        localStorage.removeItem("cartItem");

        window.dispatchEvent(new Event("cartUpdated"));
      }

      const orderData = {
        hoTen: formData.ten_thanhtoan,
        diaChi: formData.diachi_thanhtoan,
        dienThoai: formData.dienthoai_thanhtoan,
        email: formData.email_thanhtoan,
        ghiChu: formData.noidung_thanhtoan,
        hinhThucThanhToan: formData.ht_thanhtoan,
        sanPham: cartItems.map((item) => ({
          id: item.id,
          ten_sp: item.ten_sp,
          gia_sp: item.gia_sp,
          soLuong: item.quantity,
          id_danhmuc: item.id_danhmuc,
          hinh_anh: item.hinh_anh,
        })),
        tongTien: cartItems.reduce(
          (total, item) => total + item.gia_sp * item.quantity,
          0
        ),
        trangThai: "Chờ xử lý",
        ngayDat: new Date(),
      };

      const response = await axios.post(
        "http://localhost:3000/api/donHang",
        orderData
      );
      const orderId = response.data.orderId;

      if (formData.ht_thanhtoan === "THANH TOÁN QUA MOMO") {
        const momoPaymentData = {
          amount: orderData.tongTien,
          orderInfo: `Thanh toán cho đơn hàng với ${orderData.sanPham.length} sản phẩm`,
          redirectUrl: `http://localhost:5173/thanhtoan/SuccessPage?orderId=${orderId}`,
          ipnUrl: `https://3d31-2402-800-6341-34da-59a9-b6c1-418d-8659.ngrok-free.app/api/callback?orderId=${orderId}`,
        };

        const momoResponse = await axios.post(
          "http://localhost:3000/api/payment",
          momoPaymentData
        );

        if (momoResponse.data && momoResponse.data.payUrl) {
          window.location.href = momoResponse.data.payUrl;
        }
      } else if (formData.ht_thanhtoan === "THANH TOÁN QUA COD") {
        setIsSuccess(true);

        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="wrap-main wrap-page">
      {!isSuccess ? (
        <div className="sub_main">
          <div className="title_main">
            <span>Thanh toán</span>
          </div>
          <form className="checkout-form" onSubmit={handleSubmit}>
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
                  className={errors.ten_thanhtoan ? "error" : ""}
                  placeholder="Nhập họ và tên"
                />
                {errors.ten_thanhtoan && (
                  <span className="error-message">
                    <i className="fas fa-exclamation-circle"></i>
                    Họ và tên không được để trống
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="diachi_thanhtoan">Địa chỉ</label>
                <input
                  type="text"
                  id="diachi_thanhtoan"
                  name="diachi_thanhtoan"
                  value={formData.diachi_thanhtoan}
                  onChange={handleChange}
                  className={errors.diachi_thanhtoan ? "error" : ""}
                  placeholder="Nhập địa chỉ"
                />
                {errors.diachi_thanhtoan && (
                  <span className="error-message">
                    <i className="fas fa-exclamation-circle"></i>
                    Địa chỉ không được để trống
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="dienthoai_thanhtoan">Điện thoại</label>
                <input
                  type="text"
                  id="dienthoai_thanhtoan"
                  name="dienthoai_thanhtoan"
                  value={formData.dienthoai_thanhtoan}
                  onChange={handleChange}
                  className={errors.dienthoai_thanhtoan ? "error" : ""}
                  placeholder="Nhập số điện thoại"
                />
                {errors.dienthoai_thanhtoan && (
                  <span className="error-message">
                    <i className="fas fa-exclamation-circle"></i>
                    Điện thoại không được để trống
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email_thanhtoan">Email</label>
                <input
                  type="email"
                  id="email_thanhtoan"
                  name="email_thanhtoan"
                  value={formData.email_thanhtoan}
                  onChange={handleChange}
                  className={errors.email_thanhtoan ? "error" : ""}
                  placeholder="Nhập email"
                />
                {errors.email_thanhtoan && (
                  <span className="error-message">
                    <i className="fas fa-exclamation-circle"></i>
                    Email không được để trống
                  </span>
                )}
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
            <div className="right-thanhtoan">
              <h2 className="section-title">Hình thức thanh toán</h2>
              <div
                className={`form-group payment-method ${
                  errors.ht_thanhtoan ? "error" : ""
                }`}
              >
                <input
                  type="radio"
                  id="payment_momo"
                  name="ht_thanhtoan"
                  value="THANH TOÁN QUA MOMO"
                  onChange={handleChange}
                />
                <label htmlFor="payment_momo">Thanh toán qua momo</label>
              </div>
              <div
                className={`form-group payment-method ${
                  errors.ht_thanhtoan ? "error" : ""
                }`}
              >
                <input
                  type="radio"
                  id="payment_cod"
                  name="ht_thanhtoan"
                  value="THANH TOÁN QUA COD"
                  onChange={handleChange}
                />
                <label htmlFor="payment_cod">Thanh toán khi nhận hàng</label>
              </div>
              {errors.ht_thanhtoan && (
                <span className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  Vui lòng chọn hình thức thanh toán
                </span>
              )}
              <div className="form-group submit-button">
                <button type="submit" className="btn-thanhtoan">
                  Thanh Toán
                </button>
              </div>
            </div>
          </form>

          {/* Popup thông báo lỗi */}
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <div className="delete-popup-icon">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <p>{popupMessage}</p>
                <button onClick={closePopup}>Đóng</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="success-page">
          <div className="success-container">
            <div className="success-content">
              <div className="success-image">
                <img src="/public/img/icon/bangboo-pay.gif" alt="Thank you" />
              </div>

              <h1 className="success-title">THANH TOÁN THÀNH CÔNG!</h1>
              <p className="success-message">
                Cảm ơn bạn đã quan tâm đến sản phẩm của chúng tôi
              </p>

              <button className="back-home-btn" onClick={() => navigate("/")}>
                <i className="fas fa-home"></i>
                <span>Về trang chủ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
