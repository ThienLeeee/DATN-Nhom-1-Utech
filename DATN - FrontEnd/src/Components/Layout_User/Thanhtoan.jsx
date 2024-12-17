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

  const [isSuccess, setIsSuccess] = useState(false);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cartItems = JSON.parse(localStorage.getItem("cartItem")) || [];
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

      await axios.post("http://localhost:3000/api/donHang", orderData);
      localStorage.removeItem("cartItem");
      window.dispatchEvent(new Event("cartUpdated"));
      setIsSuccess(true);
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.");
    }
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
                      placeholder={user?.fullname ? "" : "Nhập họ và tên"}
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
                      placeholder={user?.address ? "" : "Nhập địa chỉ"}
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
                      placeholder={user?.phone ? "" : "Nhập số điện thoại"}
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
                      placeholder={user?.email ? "" : "Nhập email"}
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
                    <label htmlFor="payment_cod">
                      Thanh toán khi nhận hàng
                    </label>
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
