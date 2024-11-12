import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Giohang() {
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

  const [sanPham, setSanpham] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

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
    setSanpham(updatedItems);
    localStorage.setItem("cartItem", JSON.stringify(updatedItems));
  };

  const clearCart = () => {
    setSanpham([]);
    localStorage.removeItem("cartItem");
    setTotalQuantity(0);
    setTotalPrice(0);
  };

  const handleCheckout = () => {
    if (sanPham.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
    } else {
      window.location.href = "/thanhtoan";
    }
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
              <input type="hidden" name="pid" />
              <input type="hidden" name="command" />

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
                                style={{ width: 30, textAlign: "center" }}
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
                            {(sanpham.gia_sp * sanpham.quantity).toLocaleString("vi-VN")} VNĐ
                          </td>

                          <td
                            style={{
                              textAlign: "center",
                              padding: "5px",
                              border: "1px solid #e9e9e9",
                            }}
                          >
                            <button onClick={() => removeItem(sanpham.id)}>
                              Xóa
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
                        <b>
                        <b>Tổng giá: <span>{totalPrice.toLocaleString("vi-VN")} VNĐ</span></b>
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={5}
                        style={{ textAlign: "right", padding: 5 }}
                      >
                        <Link to="/">
                          <input
                            type="button"
                            className="btn btn-primary"
                            value="Mua tiếp"
                          />
                        </Link>

                        <input
                          type="button"
                          className="btn btn-danger"
                          value="Xóa tất cả"
                          onClick={clearCart}
                        />

                        <Link to="/thanhtoan">
                          <input
                            type="button"
                            className="btn btn-success"
                            value="Thanh toán"
                            onClick={handleCheckout}
                          />
                        </Link>
                      </td>
                    </tr>
                  </tfoot>

                  {/*body*/}
                </table>
              </div>

              {/*end contain table gio hang*/}
            </form>
          </div>
        </div>
        {/*content main*/}
      </div>

      {/*sub main*/}

      <div className="sp_daxem">
        <div className="title_main">
          <span>Sản phẩm đã xem</span>
        </div>
        {/* <div className="content_daxem">
          <div
            className="owl_daxem owl-carousel owl-theme"
            style={{ opacity: 1, display: "block" }}
          >
            <div className="owl-wrapper-outer">
              <div
                className="owl-wrapper"
                style={{
                  width: 520,
                  left: 0,
                  display: "block",
                  transition: "1000ms",
                  transform: "translate3d(0px, 0px, 0px)",
                }}
              >
                <div className="owl-item" style={{ width: 260 }}>
                  <div className="product">
                    <div className="box-product">
                      <div className="pic-product" data-tooltip="sticky7385">
                        <a
                          className="d-block"
                          href="san-pham/laptop-dell-vostro-3530-v5i3465w1-7385.html"
                          title="Laptop Dell Vostro 3530 V5I3465W1"
                        >
                          <img
                            src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                            alt="Laptop Dell Vostro 3530 V5I3465W1"
                            className="w100 trans03"
                          />
                        </a>
                        <div className="btntragop1" />
                        <div className="hot-icon blink" />
                        <div className="desc-product">
                          <div>
                            <ul>
                              <li>
                                CPU Intel Core i3-1305U (10MB, Up to 4.50GHz)
                              </li>
                              <li>RAM 8GB DDR4 2666MHz (1x8GB)</li>
                              <li>SSD 512GB M.2 PCIe NVMe</li>
                              <li>VGA Intel UHD Graphics</li>
                              <li>Display 15.6Inch FHD WVA Anti-Glare</li>
                              <li>Pin 3Cell 41WHrs</li>
                              <li>Color Titan Grey (Xám)</li>
                              <li>Weight 1.66 kg</li>
                              <li>OS Windows 11 Home + Office HS 2021</li>
                            </ul>
                            <p>&nbsp;</p>
                            <div className="baohanh">Bảo hành: 12 tháng</div>
                          </div>
                        </div>
                      </div>
                      <div className="info-product">
                        <a
                          className="name-product text-split"
                          href="san-pham/laptop-dell-vostro-3530-v5i3465w1-7385.html"
                          title="Laptop Dell Vostro 3530 V5I3465W1"
                        >
                          Laptop Dell Vostro 3530 V5I3465W1
                        </a>
                        <div className="price-product">
                          <span className="price-new">11.990.000 đ</span>
                        </div>
                        <div className="cart-product d-flex justify-content-between align-items-center">
                          <span className="status-pro sts2">Còn hàng</span>
                          <span
                            className="mua_giohang"
                            rel={7385}
                            data-confirm=""
                            onClick="new jBox()"
                          >
                            Mua ngay
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
