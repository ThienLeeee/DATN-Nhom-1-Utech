import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "/public/css/giohang.css";
export default function Giohang() {
  const [sanPham, setSanpham] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const getImagePath = (idDanhmuc) => {
    switch (idDanhmuc) {
      case 1:
        return "Laptop";
      case 2:
        return "PC";
      case 3:
        return "Manhinh";
      case 4:
        return "Chuot";
      case 5:
        return "Banphim";
      default:
        return "Khac";
    }
  };

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
      totalPrice += item.gia_sp * item.quantity; // Tính toán với gia_sp dạng số
    });

    setTotalQuantity(totalQuantity);
    setTotalPrice(totalPrice);
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedItems = sanPham.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    setSanpham(updatedItems);
    localStorage.setItem("cartItem", JSON.stringify(updatedItems));
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
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = () => {
    if (sanPham.length === 0) {
      alert("Giỏ hàng đã trống!");
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
      setSanpham([]);
      localStorage.removeItem("cartItem");
      setTotalQuantity(0);
      setTotalPrice(0);
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (sanPham.length === 0) {
      alert("Giỏ hàng trống, không thể thanh toán!");
      return;
    }

    // Tạo dữ liệu đơn hàng tạm thời
    const orderData = {
      items: sanPham,
      totalQuantity,
      totalPrice,
      status: "pending", // Đơn hàng chưa hoàn thành
    };

    // Lưu đơn hàng tạm vào localStorage
    localStorage.setItem("checkoutItems", JSON.stringify(orderData));

    // Điều hướng đến trang thanh toán
    navigate("/thanhtoan");
  };

  

  return (
    <div className="wrap-main wrap-page">
      <link href="css/giohang.css" rel="stylesheet" type="text/css" />
      <div className="sub_main">
        <div className="title_main" style={{ marginBottom: 20 }}>
          <span>Giỏ hàng</span>
        </div>
        <div className="content_main">
          <div id="giohang_ct">
            <form name="form1" method="post">
              {sanPham.length === 0 ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <Link to="/">
                    <button className="btnc btn-primary">Mua sản phẩm</button>
                  </Link>
                </div>
              ) : (
                <div className="contain_table_giohang">
                  <table
                    style={{
                      width: "100%",
                      color: "#333",
                      border: "1px solid #e9e9e9",
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#fff" }}>
                        <th
                          style={{
                            textAlign: "center",
                            padding: 5,
                            whiteSpace: "nowrap",
                            fontSize: 13,
                            border: "1px solid #e9e9e9",
                          }}
                        >
                          Hình ảnh
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            padding: 5,
                            whiteSpace: "nowrap",
                            fontSize: 13,
                            border: "1px solid #e9e9e9",
                          }}
                        >
                          Tên
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            padding: 5,
                            whiteSpace: "nowrap",
                            fontSize: 13,
                            border: "1px solid #e9e9e9",
                          }}
                        >
                          Số lượng
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            padding: 5,
                            whiteSpace: "nowrap",
                            fontSize: 13,
                            border: "1px solid #e9e9e9",
                          }}
                        >
                          Tổng tiền
                        </th>
                        <th
                          style={{
                            textAlign: "center",
                            padding: 5,
                            whiteSpace: "nowrap",
                            fontSize: 13,
                            border: "1px solid #e9e9e9",
                          }}
                        >
                          Thao tác
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {sanPham.map((sanpham, index) => {
                        const imagePath = getImagePath(sanpham.id_danhmuc);

                        return (
                          <tr
                            key={index}
                            style={{ borderBottom: "1px solid #ecedef" }}
                          >
                            <td
                              style={{
                                textAlign: "center",
                                padding: "5px",
                                border: "1px solid #e9e9e9",
                              }}
                            >
                              <img
                                src={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.chinh}`}
                                alt={sanpham.ten_sp}
                                width={60}
                              />
                            </td>
                            <td
                              style={{
                                textAlign: "left",
                                padding: "5px",
                                border: "1px solid #e9e9e9",
                              }}
                            >
                              <h3
                                className="name_p_cart"
                                style={{ fontSize: 14, fontWeight: "bold" }}
                              >
                                {sanpham.ten_sp}
                              </h3>
                              <div
                                className="price_p_cart_name"
                                style={{ fontSize: 15, color: "#f00" }}
                              >
                                {sanpham.gia_sp.toLocaleString("vi-VN")} VNĐ
                              </div>
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                padding: "5px",
                                border: "1px solid #e9e9e9",
                              }}
                            >
                              <div
                                className="box_number_cart"
                                style={{
                                  margin: "auto",
                                  width: 100,
                                  display: "flex",
                                  justifyContent: "space-evenly",
                                }}
                              >
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    updateQuantity(
                                      sanpham.id,
                                      sanpham.quantity - 1
                                    );
                                  }}
                                  style={{ width: 20, padding: 2 }}
                                >
                                  <img
                                    src="/img/icon/icon-minus.png"
                                    style={{ marginTop: 6 }}
                                  />
                                </button>
                                <input
                                  type="text"
                                  value={sanpham.quantity}
                                  readOnly
                                  style={{ width: 50, textAlign: "center" }}
                                />
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    updateQuantity(
                                      sanpham.id,
                                      sanpham.quantity + 1
                                    );
                                  }}
                                  style={{ width: 20, padding: 2 }}
                                >
                                  <img
                                    src="/img/icon/icon-plus.png"
                                    style={{ marginTop: 2 }}
                                  />
                                </button>
                              </div>
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                padding: "5px",
                                border: "1px solid #e9e9e9",
                              }}
                            >
                              {(
                                sanpham.gia_sp * sanpham.quantity
                              ).toLocaleString("vi-VN")}{" "}
                              VNĐ
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                padding: "5px",
                                border: "1px solid #e9e9e9",
                              }}
                            >
                              <button
                                onClick={() => removeItem(sanpham.id)}
                                className="btn-delete"
                              >
                                <img
                                  src="/public/img/icon/icon-delete.png"
                                  className="img-delete"
                                />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>

                    <tfoot>
                      <tr>
                        <td colSpan={5} style={{ textAlign: "right" }}>
                          <b>Tổng số lượng: {totalQuantity} sản phẩm</b>
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid #e9e9e9" }}>
                        <td
                          colSpan={5}
                          style={{
                            textAlign: "right",
                            padding: "10px 5px",
                            fontWeight: "bold",
                            color: "#e53c2f",
                            fontSize: 16,
                          }}
                        >
                          Tổng giá:{" "}
                          <span>{totalPrice.toLocaleString("vi-VN")} VNĐ</span>
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan={5}
                          style={{ textAlign: "right", padding: 5 }}
                        >
                          <Link to="/">
                            <button className="btnc btn-primary">
                              Mua tiếp
                            </button>
                          </Link>
                          <button
                            type="button"
                            className="btnc btn-danger"
                            onClick={clearCart}
                          >
                            Xóa tất cả
                          </button>
                          <Link to="/thanhtoan" state={{ cartItems: sanPham }}>
                            <button
                              className="btnc btn-success"
                              onClick={handleCheckout}
                            >
                              Thanh toán
                            </button>
                          </Link>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </form>
          </div>
        </div>
        {/*content main*/}
      </div>

      {/*sub main*/}
    </div>
  );
}
