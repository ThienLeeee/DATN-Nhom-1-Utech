import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "/public/css/thanhtoan.css";
import axios from "axios";
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    // Lấy thông tin đơn hàng từ localStorage 
    const checkoutData = JSON.parse(localStorage.getItem("checkoutItems")); 
    if (checkoutData) { 
      setFormData((prev) => ({ 
        ...prev, 
        items: checkoutData.items,
        totalQuantity: checkoutData.totalQuantity, 
        totalPrice: checkoutData.totalPrice,
        discountAmount: checkoutData.discountAmount,
        finalPrice: checkoutData.finalPrice, 
        voucher: checkoutData.voucher, 
      })); 
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.ten_thanhtoan) newErrors.ten_thanhtoan = "Vui lòng nhập họ và tên.";
    if (!formData.diachi_thanhtoan) newErrors.diachi_thanhtoan = "Vui lòng nhập địa chỉ.";
    if (!formData.dienthoai_thanhtoan) newErrors.dienthoai_thanhtoan = "Vui lòng nhập số điện thoại.";
    if (!formData.email_thanhtoan) newErrors.email_thanhtoan = "Vui lòng nhập email.";
    if (!formData.ht_thanhtoan) newErrors.ht_thanhtoan = "Vui lòng chọn hình thức thanh toán.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);
    try {
      const checkoutData = JSON.parse(localStorage.getItem("checkoutItems"));
      if (!checkoutData || checkoutData.items.length === 0) {
        alert("Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán.");
        return;
      }

      const { items, totalQuantity, totalPrice, discountAmount, finalPrice, voucher } = checkoutData;

      const updateProductQuantities = async () => {
        for (let item of items) {
          const response = await axios.post("http://localhost:3000/api/updateProductQuantity", {
            productId: item.id,
            quantityPurchased: item.quantity,
          });
          if (response.status !== 200) {
            alert("Cập nhật số lượng sản phẩm thất bại.");
          }
        }
      };

      const orderItems = items.map((item) => ({
        id: item.id,
        ten_sp: item.ten_sp,
        gia_sp: item.giam_gia ? parseInt(item.giam_gia.replace(/\./g, '')) : item.gia_sp,
        soLuong: item.quantity,
        id_danhmuc: item.id_danhmuc,
        hinh_anh: item.hinh_anh,
        gia_goc: item.gia_sp, // Giá gốc
        gia_giam: item.giam_gia ? parseInt(item.giam_gia.replace(/\./g, '')) : 0, // Giá giảm
        giam_gia_voucher: voucher ? voucher.discountAmount : 0 // Giảm giá bằng voucher
      }));

      // Fetch the client's IP address
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const clientIp = ipResponse.data.ip;

      if (formData.ht_thanhtoan === "THANH TOÁN QUA MOMO") {
        const tempOrder = {
          hoTen: formData.ten_thanhtoan,
          diaChi: formData.diachi_thanhtoan,
          dienThoai: formData.dienthoai_thanhtoan,
          email: formData.email_thanhtoan,
          ghiChu: formData.noidung_thanhtoan,
          hinhThucThanhToan: "THANH TOÁN QUA MOMO",
          sanPham: orderItems,
          tongTien: finalPrice,
          giamGia: discountAmount,

          trangthai_thanhtoan:"Đã thanh toán",
          ngayDat: new Date(),
          voucher: voucher,
        };
        localStorage.setItem("tempOrder", JSON.stringify(tempOrder));

        const momoPaymentData = {
          amount: finalPrice,
          orderInfo: `Thanh toán cho đơn hàng với ${items.length} sản phẩm`,
          redirectUrl: `http://localhost:5173/thanhtoan/SuccessPage`,
          ipnUrl: `https://your-server-ipn-url.com/api/callback`,
        };

        const momoResponse = await axios.post("http://localhost:3000/api/payment", momoPaymentData);

        if (momoResponse.data && momoResponse.data.payUrl) {
          window.location.href = momoResponse.data.payUrl;
        } else {
          alert("Không thể tạo liên kết thanh toán. Vui lòng thử lại.");
        }
      } else if (formData.ht_thanhtoan === "THANH TOÁN QUA COD") {
        const orderData = {
          hoTen: formData.ten_thanhtoan,
          diaChi: formData.diachi_thanhtoan,
          dienThoai: formData.dienthoai_thanhtoan,
          email: formData.email_thanhtoan,
          ghiChu: formData.noidung_thanhtoan,
          hinhThucThanhToan: "THANH TOÁN QUA COD",
          sanPham: orderItems,
          tongTien: finalPrice,
          giamGia: discountAmount,

          trangthai_thanhtoan:"Chưa thanh toán",
          ngayDat: new Date(),
          voucher: voucher,
        };

        const response = await axios.post("http://localhost:3000/api/donHang", orderData);

        if (response.status === 200) {
          await updateProductQuantities();
          setIsSuccess(true);
          localStorage.removeItem("cartItem");
          window.dispatchEvent(new Event("cartUpdated"));
        } else {
          alert("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.");
        }
      } else if (formData.ht_thanhtoan === "THANH TOÁN QUA VNPAY") {
        const tempOrder = {
          hoTen: formData.ten_thanhtoan,
          diaChi: formData.diachi_thanhtoan,
          dienThoai: formData.dienthoai_thanhtoan,
          email: formData.email_thanhtoan,
          ghiChu: formData.noidung_thanhtoan,
          hinhThucThanhToan: "THANH TOÁN QUA VNPAY",
          sanPham: orderItems,
          tongTien: finalPrice,
          giamGia: discountAmount,

          trangthai_thanhtoan:"Đã thanh toán",
          ngayDat: new Date(),
          voucher: voucher,
        };
        localStorage.setItem("tempOrder", JSON.stringify(tempOrder));

        const vnp_TmnCode = 'QSZ9YYW5';
        const vnp_HashSecret = 'PNGRD84ZAH8YMQSQW2NEHWHNECCKXZAZ';
        const vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        const vnp_ReturnUrl = 'http://localhost:5173/thanhtoan/SuccessPage';
        const vnp_OrderInfo = `Thanh toán đơn hàng với ${items.length} sản phẩm`;
        const vnp_Amount = finalPrice * 100; // Số tiền (VNPay yêu cầu đơn vị VND * 100)
        const vnp_Locale = 'vn';
        const vnp_IpAddr = clientIp; // Use the fetched client IP address

        const inputData = {
          vnp_Version: '2.1.0',
          vnp_Command: 'pay',
          vnp_TmnCode: vnp_TmnCode,
          vnp_Amount: vnp_Amount,
          vnp_CurrCode: 'VND',
          vnp_TxnRef: new Date().getTime().toString(),
          vnp_OrderInfo: vnp_OrderInfo,
          vnp_OrderType: 'billpayment',
          vnp_Locale: vnp_Locale,
          vnp_ReturnUrl: vnp_ReturnUrl,
          vnp_IpAddr: vnp_IpAddr,
          vnp_CreateDate: new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14),
        };

        const sortedParams = Object.keys(inputData)
          .sort()
          .reduce((obj, key) => {
            obj[key] = inputData[key];
            return obj;
          }, {});

        const queryString = new URLSearchParams(sortedParams).toString();
        const secureHash = CryptoJS.HmacSHA512(queryString, vnp_HashSecret).toString();
        const paymentUrl = `${vnp_Url}?${queryString}&vnp_SecureHash=${secureHash}`;

        // Redirect to VNPay payment URL
        window.location.href = paymentUrl;
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrap-main wrap-page">
      {isLoading && (
        <div className="loading-popup">
          <div className="loading-popup-content">
            <p>Đang tiến hành thanh toán, vui lòng đợi trong vài giây...</p>
            <div className="loading-icon"></div>
          </div>
        </div>
      )}
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
                    />
                    {errors.ten_thanhtoan && <div className="error-message">{errors.ten_thanhtoan}</div>}
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
                    />
                    {errors.diachi_thanhtoan && <div className="error-message">{errors.diachi_thanhtoan}</div>}
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
                    />
                    {errors.dienthoai_thanhtoan && <div className="error-message">{errors.dienthoai_thanhtoan}</div>}
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
                    />
                    {errors.email_thanhtoan && <div className="error-message">{errors.email_thanhtoan}</div>}
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
                      id="payment_momo"
                      name="ht_thanhtoan"
                      value="THANH TOÁN QUA MOMO"
                      onChange={handleChange}
                    />
                    <label htmlFor="payment_momo">Thanh toán qua momo</label>
                   
                  </div>
                  <div className="form-group payment-method">
                    <input
                      type="radio"
                      id="payment_cod"
                      name="ht_thanhtoan"
                      value="THANH TOÁN QUA COD"
                      onChange={handleChange}
                    />
                    <label htmlFor="payment_cod">Thanh toán khi nhận hàng</label>
                  </div>
                  <div className="form-group payment-method">
                    <input
                      type="radio"
                      id="payment_vnpay"
                      name="ht_thanhtoan"
                      value="THANH TOÁN QUA VNPAY"
                      onChange={handleChange}
                    />
                    <label htmlFor="payment_vnpay">Thanh toán qua vnpay</label>
                  </div>
                  {errors.ht_thanhtoan && <div className="error-message">{errors.ht_thanhtoan}</div>}
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
