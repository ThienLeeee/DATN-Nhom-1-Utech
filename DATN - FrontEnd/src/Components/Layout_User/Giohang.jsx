import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "/public/css/giohang.css";
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Giohang() {
  const [sanPham, setSanpham] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const { user } = useAuth();
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [myVouchers, setMyVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [voucherCode, setVoucherCode] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItem")) || [];
    setSanpham(items);
    updateTotal(items);
  }, []);
  

  useEffect(() => {
    updateTotal(sanPham);
  }, [sanPham]);

  const updateTotal = (items) => {
    let totalQuantity = 0;
    let totalPrice = 0;

    items.forEach((item) => {
      totalQuantity += item.quantity;
      const price = item.giam_gia 
        ? parseInt(item.giam_gia.replace(/\./g, ''))
        : typeof item.gia_sp === 'string'
          ? parseInt(item.gia_sp.replace(/\./g, ''))
          : item.gia_sp;
      totalPrice += price * item.quantity;
    });

    setTotalQuantity(totalQuantity);
    setTotalPrice(totalPrice);
    
    const finalPrice = totalPrice - discountAmount;
    setFinalPrice(finalPrice);
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedItems = sanPham.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );

    setSanpham(updatedItems);
    localStorage.setItem("cartItem", JSON.stringify(updatedItems));

    // Dispatch event để cập nhật số lượng trong Header
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id) => {
    const updatedItems = sanPham.filter((item) => item.id !== id);

    // Nếu không còn sản phẩm nào sau khi xóa, xóa luôn cartItem khỏi localStorage
    if (updatedItems.length === 0) {
      localStorage.removeItem("cartItem");
    } else {
      localStorage.setItem("cartItem", JSON.stringify(updatedItems));
    }

    // Cập nhật state sau khi xóa
    setSanpham(updatedItems);

    // Dispatch event để cập nhật số lượng trong Header
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = () => {
    if (sanPham.length === 0) {
      alert("Giỏ hàng đã trống!");
      return;
    }
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    setSanpham([]);
    localStorage.removeItem("cartItem");
    setTotalQuantity(0);
    setTotalPrice(0);
    window.dispatchEvent(new Event("cartUpdated"));
    setShowDeletePopup(false);
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (sanPham.length === 0) {
      toast.error("Giỏ hàng trống, không thể thanh toán!");
      return;
    }

    // Tạo dữ liệu đơn hàng tạm thời
    const orderData = {
      items: sanPham,
      totalQuantity,
      totalPrice,
      discountAmount,
      finalPrice,
      voucher: selectedVoucher,
      status: "pending"
    };

    // Lưu đơn hàng tạm vào localStorage
    localStorage.setItem("checkoutItems", JSON.stringify(orderData));

    // Điều hướng đến trang thanh toán
    navigate("/thanhtoan");
  };

  const calculateDiscountPercent = (originalPrice, discountedPrice) => {
    const original = typeof originalPrice === 'string' 
      ? parseInt(originalPrice.replace(/\./g, ''))
      : originalPrice;
    
    const discounted = typeof discountedPrice === 'string'
      ? parseInt(discountedPrice.replace(/\./g, ''))
      : discountedPrice;

    return Math.round(((original - discounted) / original) * 100);
  };

  // Fetch vouchers của user
  useEffect(() => {
    const fetchUserVouchers = async () => {
      if (!user) return;
      
      try {
        const response = await axios.get(`http://localhost:3000/api/vouchers/user/${user.id}`);
        // Lọc voucher còn hiệu lực và chưa sử dụng
        const validVouchers = response.data.filter(voucher => 
          !voucher.used && 
          new Date(voucher.end_date) >= new Date()
        );
        setMyVouchers(validVouchers);
      } catch (error) {
        console.error('Lỗi khi lấy voucher:', error);
      }
    };

    fetchUserVouchers();
  }, [user]);

  // Hàm tính giảm giá từ voucher
  const calculateVoucherDiscount = (voucher, totalPrice) => {
    if (!voucher || totalPrice < voucher.min_order_value) return 0;

    let discount = 0;
    if (voucher.discount_type === 'percent') {
      discount = Math.floor((totalPrice * voucher.discount_value) / 100);
      if (voucher.max_discount && discount > voucher.max_discount) {
        discount = voucher.max_discount;
      }
    } else {
      discount = Math.min(voucher.discount_value, totalPrice);
    }

    return discount;
  };

  // Hàm áp dụng voucher
  const handleApplyVoucher = async (voucher) => {
    if (totalPrice < voucher.min_order_value) {
      toast.error(`Đơn hàng tối thiểu ${voucher.min_order_value.toLocaleString('vi-VN')}đ`);
      return;
    }

    const discount = calculateVoucherDiscount(voucher, totalPrice);
    setSelectedVoucher(voucher);
    setDiscountAmount(discount);
    setFinalPrice(totalPrice - discount);
    setShowVoucherModal(false);
    toast.success('Áp dụng voucher thành công!');
  };

  // Hàm hủy voucher
  const handleRemoveVoucher = () => {
    setSelectedVoucher(null);
    setDiscountAmount(0);
    setFinalPrice(totalPrice);
    toast.info('Đã hủy áp dụng voucher');
  };

  const handleApplyVoucherCode = async () => {
    if (!voucherCode.trim()) {
      toast.error('Vui lòng nhập mã voucher');
      return;
    }

    setIsChecking(true);
    try {
      // Tìm voucher trong danh sách voucher của user
      const voucher = myVouchers.find(v => v.code.toUpperCase() === voucherCode.toUpperCase());

      // Thêm delay nhỏ để hiển thị loading
      await new Promise(resolve => setTimeout(resolve, 500));

      if (!voucher) {
        toast.error('Mã voucher không hợp lệ hoặc không tồn tại');
        return;
      }

      if (voucher.used) {
        toast.error('Voucher đã được sử dụng');
        return;
      }

      if (new Date(voucher.end_date) < new Date()) {
        toast.error('Voucher đã hết hạn');
        return;
      }

      if (totalPrice < voucher.min_order_value) {
        toast.error(`Đơn hàng tối thiểu ${voucher.min_order_value.toLocaleString('vi-VN')}đ`);
        return;
      }

      // Nếu mọi điều kiện đều hợp lệ, áp dụng voucher
      handleApplyVoucher(voucher);
      setVoucherCode(''); // Reset input field
    } catch (error) {
      toast.error('Có lỗi xảy ra khi kiểm tra voucher');
    } finally {
      setIsChecking(false);
    }
  };

  // Thêm useEffect để lấy danh sách voucher khi component mount
  useEffect(() => {
    const fetchVouchers = async () => {
      if (!user) return;
      
      try {
        const response = await axios.get(`http://localhost:3000/api/vouchers/user/${user.id}`);
        setMyVouchers(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách voucher:', error);
      }
    };

    fetchVouchers();
  }, [user]);

  return (
    <div className="wrap-main wrap-page">
      <link href="css/giohang.css" rel="stylesheet" type="text/css" />
      <div className="sub_main">
        <div className="title_main" style={{ marginBottom: 20 }}>
          <span>Giỏ hàng</span>
        </div>
        <div className="content_main">
          <div id="giohang_ct">
            <form
              name="form1"
              method="post"
              onSubmit={(e) => e.preventDefault()}
            >
              {sanPham.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-cart-content">
                    <img
                      src="/img/icon/bangboo-cart.gif"
                      alt="Bangboo Cart"
                      className="empty-cart-image"
                    />
                    <h2>Giỏ hàng hiện tại đang trống</h2>
                    <p>Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
                    <Link to="/" className="shop-now-btn">
                      <i className="fas fa-shopping-cart"></i>
                      Mua sắm ngay
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="contain_table_giohang">
                  <table className="cart-table">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sanPham.map((sanpham, index) => {
                    
                        return (
                          <tr key={index}>
                            <td>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "16px",
                                }}
                              >
                                <img
                                  src={`/img/sanpham/${sanpham.hinh_anh.chinh}`}
                                  alt={sanpham.ten_sp}
                                  className="cart-product-image"
                                />
                                <div className="cart-product-info">
                                  <div className="cart-product-name">
                                    {sanpham.ten_sp}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="cart-product-price" style={{ textAlign: 'left' }}>
                                {sanpham.giam_gia ? (
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <span style={{ 
                                      textDecoration: 'line-through', 
                                      color: '#707070', 
                                      fontSize: '14px', 
                                      fontWeight: 'normal' 
                                    }}>
                                      {typeof sanpham.gia_sp === 'string' 
                                        ? parseInt(sanpham.gia_sp.replace(/\./g, '')).toLocaleString("vi-VN")
                                        : sanpham.gia_sp.toLocaleString("vi-VN")
                                      } VNĐ
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <span style={{ 
                                        color: '#d70018', 
                                        fontSize: '16px', 
                                        fontWeight: '500' 
                                      }}>
                                        {typeof sanpham.giam_gia === 'string'
                                          ? parseInt(sanpham.giam_gia.replace(/\./g, '')).toLocaleString("vi-VN")
                                          : sanpham.giam_gia.toLocaleString("vi-VN")
                                        } VNĐ
                                      </span>
                                      <span style={{ 
                                        color: '#fff',
                                        fontSize: '12px',
                                        background: '#d70018',
                                        padding: '0 6px',
                                        borderRadius: '3px',
                                        fontWeight: '500',
                                        height: '20px',
                                        display: 'flex',
                                        alignItems: 'center'
                                      }}>
                                        -{calculateDiscountPercent(sanpham.gia_sp, sanpham.giam_gia)}%
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <span style={{ 
                                    color: '#d70018', 
                                    fontSize: '16px', 
                                    fontWeight: '500' 
                                  }}>
                                    {typeof sanpham.gia_sp === 'string'
                                      ? parseInt(sanpham.gia_sp.replace(/\./g, '')).toLocaleString("vi-VN")
                                      : sanpham.gia_sp.toLocaleString("vi-VN")
                                    } VNĐ
                                  </span>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="quantity-controls">
                                <button
                                  className="quantity-btn"
                                  onClick={() =>
                                    updateQuantity(
                                      sanpham.id,
                                      sanpham.quantity - 1
                                    )
                                  }
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                                <input
                                  type="number" // Thay đổi type thành number
                                  className="quantity-input"
                                  value={sanpham.quantity}
                                  onChange={(e) => {
                                    const newValue =
                                      parseInt(e.target.value) || 1; // Đảm bảo giá trị là số, mặc định là 1
                                    if (newValue >= 1) {
                                      // Kiểm tra giá trị tối thiểu
                                      updateQuantity(sanpham.id, newValue);
                                    }
                                  }}
                                  min="1" // Giá trị tối thiểu
                                />
                                <button
                                  className="quantity-btn"
                                  onClick={() =>
                                    updateQuantity(
                                      sanpham.id,
                                      sanpham.quantity + 1
                                    )
                                  }
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                            </td>
                            <td>
                              <div className="cart-total-price">
                                {(sanpham.giam_gia 
                                  ? parseInt(sanpham.giam_gia.replace(/\./g, '')) * sanpham.quantity
                                  : sanpham.gia_sp * sanpham.quantity
                                ).toLocaleString("vi-VN")} VNĐ
                              </div>
                            </td>
                            <td>
                              <button
                                className="cart-delete-btn"
                                onClick={() => removeItem(sanpham.id)}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="cart-summary">
                    <div className="cart-voucher" style={{height:'72.8px'}}>
                      {selectedVoucher ? (
                        <div className="applied-voucher" style={{height:'51.6px'}}>
                          <div className="voucher-info">
                            <span className="voucher-code">{selectedVoucher.code}</span>
                            <span className="voucher-discount">
                              -{discountAmount.toLocaleString('vi-VN')}đ
                            </span>
                          </div>
                          <button 
                            className="remove-voucher-btn"
                            onClick={handleRemoveVoucher}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ) : (
                        <button 
                          className="select-voucher-btn"
                          onClick={() => setShowVoucherModal(true)}
                          disabled={totalPrice === 0}
                        >
                          <i className="fas fa-ticket-alt"></i>
                          Chọn Voucher
                        </button>
                      )}

                      <div className="cart-actions">
                      <Link to="/">
                        <button className="btnc btn-primary">
                          <i className="fas fa-shopping-cart"></i> Mua tiếp
                        </button>
                      </Link>
                      <Link>
                      <button className="btnc btn-danger" onClick={clearCart}>
                        <i className="fas fa-trash"></i> Xóa tất cả
                      </button>
                      </Link>
                     
                      <Link to="/thanhtoan" state={{ cartItems: sanPham }}>
                        <button
                          className="btnc btn-success"
                          onClick={handleCheckout}
                        >
                          <i className="fas fa-check"></i> Thanh toán
                        </button>
                      </Link>
                    </div>
                      
                    
                    </div>
                      
                    <div className="cart-total-info">
                      <div className="cart-total-amount">
                        <div className="subtotal">
                          <span>Tổng số lượng:</span>
                          <span>{totalQuantity} sản phẩm</span>
                        </div>
                        <div className="subtotal">
                          <span>Tạm tính:</span>
                          <span>{totalPrice.toLocaleString("vi-VN")}đ</span>
                        </div>
                        {discountAmount > 0 && (
                          <div className="discount">
                            <span>Giảm giá:</span>
                            <div className="discount-value">
                              -{discountAmount.toLocaleString("vi-VN")}đ
                              {selectedVoucher?.discount_type === 'percent' && (
                                <span className="discount-percent">
                                  ({selectedVoucher.discount_value}%)
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        <div className="total">
                          <span>Thành tiền:</span>
                          <span>{finalPrice.toLocaleString("vi-VN")}đ</span>
                        </div>
                      </div>
                    </div>

                   
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        {/*content main*/}
      </div>

      {/*sub main*/}

      {/* Popup xóa tất cả */}
      {showDeletePopup && (
        <div className="delete-popup-overlay">
          <div className="delete-popup">
            <div className="delete-popup-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2>Xác nhận xóa</h2>
            <p style={{ textAlign: "center" }}>
              Bạn muốn xóa tất cả sản phẩm khỏi giỏ hàng?
            </p>
            <div className="delete-popup-buttons">
              <button className="confirm-delete" onClick={handleConfirmDelete}>
                Xóa tất cả
              </button>
              <button
                className="cancel-delete"
                onClick={() => setShowDeletePopup(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal chọn voucher */}
      {showVoucherModal && (
        <div className="voucher-modal">
          <div className="voucher-modal-content">
            <div className="modal-header">
              <h3>Chọn Voucher</h3>
              <button className="close-btn" onClick={() => setShowVoucherModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="voucher-input-section">
              <div className="voucher-input-wrapper">
                <input
                  type="text"
                  className="voucher-input"
                  placeholder="Nhập mã voucher của bạn"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleApplyVoucherCode();
                    }
                  }}
                />
                <button 
                  className={`apply-code-btn ${isChecking ? 'loading' : ''}`}
                  onClick={handleApplyVoucherCode}
                  disabled={!voucherCode.trim() || isChecking}
                >
                  {isChecking ? '' : 'Áp dụng'}
                </button>
              </div>
              <div className="voucher-input-hint">
                Nhập mã voucher để được giảm giá cho đơn hàng
              </div>
            </div>

            <div className="vouchers-list">
              <h4 className="vouchers-section-title">Voucher có sẵn</h4>
              {myVouchers.length > 0 ? (
                myVouchers.map((voucher) => (
                  <div 
                    key={voucher.id} 
                    className={`voucher-item ${
                      totalPrice < voucher.min_order_value ? 'disabled' : ''
                    }`}
                  >
                    <div className="voucher-details">
                      <h4>
                        {voucher.discount_type === 'percent' 
                          ? `Giảm ${voucher.discount_value}%` 
                          : `Giảm ${voucher.discount_value.toLocaleString('vi-VN')}đ`}
                      </h4>
                      <p className="min-order">
                        Đơn tối thiểu {voucher.min_order_value.toLocaleString('vi-VN')}đ
                      </p>
                      {voucher.max_discount && (
                        <p className="max-discount">
                          Giảm tối đa {voucher.max_discount.toLocaleString('vi-VN')}đ
                        </p>
                      )}
                      <p className="expiry">
                        HSD: {new Date(voucher.end_date).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                    <button
                      className="apply-btn"
                      onClick={() => handleApplyVoucher(voucher)}
                      disabled={totalPrice < voucher.min_order_value}
                    >
                      {totalPrice < voucher.min_order_value ? 'Không đủ điều kiện' : 'Áp dụng'}
                    </button>
                  </div>
                ))
              ) : (
                <div className="no-vouchers">
                  <i className="fas fa-ticket-alt"></i>
                  <p>Bạn chưa có voucher nào</p>
                  <Link 
                    to="/voucher" 
                    className="get-voucher-btn"
                    onClick={() => setShowVoucherModal(false)}
                  >
                    <i className="fas fa-plus"></i>
                    Nhận Voucher Ngay
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
