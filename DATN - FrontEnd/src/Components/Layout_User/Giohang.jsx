import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Giohang() {
  const [cartItem, setCartItem] = useState(null);

  useEffect(() => {
    const item = localStorage.getItem("cartItem");
    if (item) {
      setCartItem(JSON.parse(item));
    }
  }, []);

  
  let imagePath = "";
  switch (sanpham.id_danhmuc) {
    case 1:
      imagePath = "Laptop";
      break;
    case 2:
      imagePath = "PC";
      break;
    case 3:
      imagePath = "Manhinh";
      break;
    case 4:
      imagePath = "Chuot";
      break;
    case 5:
      imagePath = "Banphim";
      break;
    default:
      imagePath = "Khac";
  }

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
                        Tổng
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
                  {/*head*/}
                  <tfoot>
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
                          Tổng giá :
                          <span className="price_all_cart"></span>
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={5}
                        style={{ textAlign: "right", padding: 5 }}
                      >
                        <input
                          type="button"
                          className="btn btn-primary"
                          defaultValue="Mua tiếp"
                          onClick="window.location='index.php'"
                        />

                        <input
                          type="button"
                          className="btn btn-danger"
                          defaultValue="Xóa tất cả"
                          onClick="clear_cart()"
                        />

                        <Link to="/thanhtoan">
                          <input
                            type="button"
                            className="btn btn-success"
                            defaultValue="Thanh toán"
                            onClick="window.location='thanh-toan.html'"
                          />
                        </Link>
                      </td>
                    </tr>
                  </tfoot>
                  {/*footer*/}

                  <tbody>
                    {cartItem ? (
                      <tr style={{ borderBottom: "1px solid #ecedef" }}>
                        <td
                          style={{
                            textAlign: "center",
                            padding: "5px 5px",
                            border: "1px solid #e9e9e9",
                          }}
                        >
                          <img
                            src={cartItem.hinh_anh?.chinh}
                            width={60}
                            alt={cartItem.ten_sp}
                          />
                        </td>

                        <td
                          style={{
                            textAlign: "left",
                            padding: "5px 5px",
                            border: "1px solid #e9e9e9",
                          }}
                        >
                          <h3
                            className="name_p_cart"
                            style={{ fontSize: 14, fontWeight: "bold" }}
                          >
                            {cartItem.ten_sp}
                          </h3>
                          <div
                            className="price_p_cart_name"
                            style={{ fontSize: 15, color: "#f00" }}
                          >
                            {cartItem.ten_sp}
                          </div>
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            padding: "5px 5px",
                            border: "1px solid #e9e9e9",
                          }}
                        >
                          <div className="box_number_cart">
                            <button
                              className="minius_cart"
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: "#e1e8ee",
                                borderRadius: 3,
                                border: "none",
                                cursor: "pointer",
                              }}
                              data-action="-"
                              data-id={7385}
                            >
                              <img src="img/icon trừ.jpg" alt="minius cart" />
                            </button>
                            <input
                              type="text"
                              className="number_cart"
                              name="product7385"
                              defaultValue={2}
                              maxLength={3}
                              size={2}
                              style={{
                                background: "#fff",
                                textAlign: "center",
                                borderRadius: 2,
                                border: "none",
                                outline: "none",
                                padding: "5px 0px",
                              }}
                            />
                            <button
                              className="plus_cart"
                              style={{
                                width: 20,
                                height: 20,
                                backgroundColor: "#e1e8ee",
                                borderRadius: 6,
                                border: "none",
                                cursor: "pointer",
                              }}
                              data-action="+"
                              data-id={7385}
                            >
                              <img
                                src="img/icon dấu cộng.jpg"
                                alt="plus cart"
                              />
                            </button>
                          </div>
                          {/*box number cart*/}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            padding: "5px 5px",
                            border: "1px solid #e9e9e9",
                          }}
                        >
                          <div
                            className="price_p_cart"
                            style={{
                              textAlign: "center",
                              fontSize: 16,
                              color: "#43484d",
                            }}
                          >
                           
                          </div>
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            padding: "5px 5px",
                            border: "1px solid #e9e9e9",
                          }}
                        >
                          <a href="javascript:del(7385)">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="currentColor"
                              className="bi bi-x-lg"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>
                          </a>
                        </td>
                      </tr>
                    ) : (
                      <p>Không có sản phẩm trong giỏ hàng</p>
                    )}
                  </tbody>
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
