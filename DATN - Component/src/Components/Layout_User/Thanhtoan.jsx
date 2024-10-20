export default function ThanhToan(){
    return(
        <div className="wrap-main wrap-page">
  <form name="form_giohang" action="index.php?com=thanh-toan" method="get">
    <input type="hidden" name="com" defaultValue="thanh-toan" />
    <input type="hidden" name="pid" />
    <input type="hidden" name="command" />
  </form>
  <link href="css/giohang.css" rel="stylesheet" type="text/css" />
  <div className="sub_main">
    <div className="title_main">
      <span>Thanh toán</span>
    </div>
    <div className="content_main">
      <div className="contain_table_giohang">
        <table
          style={{ width: "100%", color: "#333", border: "1px solid #e9e9e9" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#fff" }}>
              <th
                style={{
                  textAlign: "center",
                  padding: 5,
                  whiteSpace: "nowrap",
                  fontSize: 13,
                  border: "1px solid #e9e9e9"
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
                  border: "1px solid #e9e9e9"
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
                  border: "1px solid #e9e9e9"
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
                  border: "1px solid #e9e9e9"
                }}
              >
                Tổng
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
                  fontSize: 16
                }}
              >
                <b>
                  Tổng giá :
                  <span className="price_all_cart">23.980.000 VNĐ</span>
                </b>
              </td>
            </tr>
          </tfoot>
          {/*footer*/}
          <tbody>
            <tr style={{ borderBottom: "1px solid #ecedef" }}>
              <td
                style={{
                  textAlign: "center",
                  padding: "5px 5px",
                  border: "1px solid #e9e9e9"
                }}
              >
                <img
                  src="http://stcom.vn/upload/product/v5i3465w11-4093_245x245.jpg"
                  width={60}
                  alt="Công ty TNHH Phát Triển Tin Học Sáng Tạo"
                />
              </td>
              <td
                style={{
                  textAlign: "left",
                  padding: "5px 5px",
                  border: "1px solid #e9e9e9"
                }}
              >
                <h3
                  className="name_p_cart"
                  style={{ fontSize: 14, fontWeight: "bold" }}
                >
                  Laptop Dell Vostro 3530 V5I3465W1
                </h3>
                <div
                  className="price_p_cart_name"
                  style={{ fontSize: 15, color: "#f00" }}
                >
                  11.990.000 VNĐ
                </div>
              </td>
              <td
                style={{
                  textAlign: "center",
                  padding: "5px 5px",
                  border: "1px solid #e9e9e9"
                }}
              >
                <div className="box_number_cart">
                  <input
                    type="text"
                    className="number_cart"
                    name="product7385"
                    readOnly="readonly"
                    defaultValue={2}
                    maxLength={3}
                    size={2}
                    style={{
                      background: "#fff",
                      textAlign: "center",
                      borderRadius: 2,
                      border: "none",
                      outline: "none",
                      padding: "5px 0px"
                    }}
                  />
                </div>
                {/*box number cart*/}
              </td>
              <td
                style={{
                  textAlign: "center",
                  padding: "5px 5px",
                  border: "1px solid #e9e9e9"
                }}
              >
                <div
                  className="price_p_cart"
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    color: "#43484d"
                  }}
                >
                  23.980.000 VNĐ
                </div>
              </td>
            </tr>
          </tbody>
          {/*body*/}
        </table>
      </div>
      <div className="thanhtoan_giohang">
        <form
          method="post"
          name="frm_order"
          action="thanh-toan.html"
          encType="multipart/form-data"
          id="frm_order"
        >
          <div className="left_thanhtoan">
            <div className="title_thanhtoan">Thông tin giao hàng</div>
            <div className="tablelienhe" style={{ width: "100%" }}>
              <div className="l50">
                <div className="box_input_contact has_notify">
                  <i className="fa fa-user fa-contact" />
                  <input
                    name="ten_thanhtoan"
                    type="text"
                    className="input input_check_validate"
                    id="ten_thanhtoan"
                    size={50}
                    defaultValue=""
                    required=""
                    placeholder="Họ và tên"
                  />
                </div>
                <div className="box_input_contact has_notify">
                  <i className="fa fa-map-marker fa-contact" />
                  <input
                    name="diachi_thanhtoan"
                    type="text"
                    className="input input_check_validate"
                    size={50}
                    id="diachi_thanhtoan"
                    defaultValue=""
                    required=""
                    placeholder="Địa chỉ"
                  />
                </div>
              </div>
              {/*end l50*/}
              <div className="r50">
                <div className="box_input_contact has_notify">
                  <i className="fa fa-phone fa-contact" />
                  <input
                    name="dienthoai_thanhtoan"
                    type="text"
                    className="input input_check_validate"
                    id="dienthoai_thanhtoan"
                    defaultValue=""
                    required=""
                    size={50}
                    placeholder="Điện thoại"
                  />
                </div>
                <div className="box_input_contact has_notify">
                  <i className="fa fa-envelope-o fa-contact" />
                  <input
                    name="email_thanhtoan"
                    type="email"
                    className="input input_check_validate"
                    id="email_thanhtoan"
                    defaultValue=""
                    required=""
                    size={50}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="clear" />
              <div className="box_input_contact">
                <textarea
                  name="noidung_thanhtoan"
                  cols={50}
                  rows={7}
                  className="input"
                  style={{ height: 120 }}
                  placeholder="Ghi chú"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
          <div className="right_thanhtoan">
            <div className="title_thanhtoan">Hình thức thanh toán</div>
            <div className="checkout-wrapper">
              <div className="payment-checkout-form">
                <ul className="list-group list_payment_method">
                  <li className="list-group-item">
                    <input
                      className="magic-radio js_payment_method"
                      type="radio"
                      id="payment_cod98"
                      name="ht_thanhtoan"
                      defaultChecked=""
                      defaultValue="THANH TOÁN BẰNG CHUYỂN KHOẢN"
                      data-target=".payment_cod_wrap98"
                    />
                    <label htmlFor="payment_cod98">
                      THANH TOÁN BẰNG CHUYỂN KHOẢN
                    </label>
                    <div
                      className="payment_cod_wrap98 payment_collapse_wrap show"
                      style={{}}
                    >
                      Số tài khoản : 220.66.3929 .<br />
                      Ngân Hàng Á Châu-Chi Nhánh TP HCM <br />
                      Chủ tài khoản : CÔNG TY TNHH PHÁT TRIỂN TIN HỌC SÁNG TẠO
                    </div>
                  </li>
                  <li className="list-group-item">
                    <input
                      className="magic-radio js_payment_method"
                      type="radio"
                      id="payment_cod97"
                      name="ht_thanhtoan"
                      defaultValue="THANH TOÁN KHI NHẬN HÀNG"
                      data-target=".payment_cod_wrap97"
                    />
                    <label htmlFor="payment_cod97">
                      THANH TOÁN KHI NHẬN HÀNG
                    </label>
                    <div
                      className="payment_cod_wrap97 payment_collapse_wrap"
                      style={{}}
                    />
                  </li>
                </ul>
              </div>
              <div className="box_input_contact">
                <input
                  id="submit_thanhtoan"
                  className="btn btn-primary"
                  title="Thanh Toán"
                  alt="Thanh Toán"
                  align="right"
                  type="submit"
                  name="next"
                  defaultValue="Thanh Toán"
                  style={{ cursor: "pointer" }}
                />
              </div>
              {/*box input contact*/}
            </div>
          </div>
          <div className="clear" />
        </form>
      </div>
    </div>
  </div>
  <div className="sp_daxem">
    <div className="title_main">
      <span>Sản phẩm đã xem</span>
    </div>
    <div className="content_daxem">
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
              transform: "translate3d(0px, 0px, 0px)"
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
                        src="img/Laptop Dell Inspiron 3530 71043887.jpg"
                        alt="Laptop Dell Vostro 3530 V5I3465W1"
                        className="w100 trans03"
                      />
                    </a>
                    <div className="btntragop1" />
                    <div className="hot-icon blink" />
                    <div className="desc-product">
                      <div>
                        <ul>
                          <li>CPU Intel Core i3-1305U (10MB, Up to 4.50GHz)</li>
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
                        onclick="new jBox()"
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
    </div>
  </div>
</div>


    )
}