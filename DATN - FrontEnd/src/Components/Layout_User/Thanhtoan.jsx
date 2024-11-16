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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra form
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

    try {
      // Lấy thông tin giỏ hàng và đảm bảo nó là một mảng
      let checkoutItems = JSON.parse(localStorage.getItem("checkoutItems"));
      if (!Array.isArray(checkoutItems)) {
        // Nếu không phải mảng, chuyển đổi thành mảng hoặc tạo mảng rỗng
        checkoutItems = checkoutItems ? [checkoutItems] : [];
      }
      
      // Tính tổng tiền an toàn hơn
      const tongTien = checkoutItems.reduce((total, item) => {
        const soLuong = Number(item.soLuong) || 0;
        const giaSp = Number(item.gia_sp) || 0;
        return total + (giaSp * soLuong);
      }, 0);

      // Tạo đối tượng đơn hàng
      const orderData = {
        hoTen: formData.ten_thanhtoan,
        diaChi: formData.diachi_thanhtoan,
        dienThoai: formData.dienthoai_thanhtoan,
        email: formData.email_thanhtoan,
        ghiChu: formData.noidung_thanhtoan,
        hinhThucThanhToan: formData.ht_thanhtoan,
        sanPham: checkoutItems,
        tongTien: tongTien
      };

      // Gọi API để lưu đơn hàng
      const response = await fetch('http://localhost:3000/api/donHang', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Lỗi khi tạo đơn hàng');
      }

      // Xóa giỏ hàng khỏi localStorage
      localStorage.removeItem("checkoutItems");
      
      // Hiển thị thông báo thành công
      setIsSuccess(true);
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.');
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
