export default function LienHe() {
    return (
        <>
  <div className="wrap-main wrap-page">
    <div className="sub_main">
      <div className="title_main" style={{ marginBottom: 20 }}>
        <span>Liên hệ</span>
      </div>
      <div className="content_main">
        <div className="left_lienhe">
          <div className="text">
            <p
              style={{
                lineHeight: "20.8px",
                margin: 0,
                padding: 0,
                boxSizing: "border-box",
                color: "rgb(0, 0, 0)"
              }}
            >
              <span style={{ color: "rgb(255, 0, 0)" }}>
                <strong>
                  <span style={{ fontSize: 18 }}>
                    CÔNG TY TNHH PHÁT TRIỂN TIN HỌC SÁNG TẠO
                  </span>
                </strong>
              </span>
            </p>
            <p style={{ lineHeight: "20.8px" }}>
              <span style={{ fontSize: 16 }}>
                Địa chỉ:<span style={{ fontSize: 20 }}>&nbsp;</span>
              </span>
              <strong>
                <span style={{ fontSize: 18 }}>
                  168 Nguyễn Thiện Thuật, P.3, Q.3
                </span>
              </strong>
            </p>
            <p style={{ lineHeight: "20.8px" }}>
              <span style={{ fontSize: 16 }}>
                Điện thoại:&nbsp;&nbsp;
                <span
                  style={{
                    color: "rgb(0, 0, 0)",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    textAlign: "center"
                  }}
                >
                  028.38 333 667 - 0902 566 839
                </span>
              </span>
            </p>
            <p style={{ lineHeight: "20.8px" }}>
              <span style={{ fontSize: 16 }}>Email: sangtaoq3@stcom.vn</span>
            </p>
            <p style={{ lineHeight: "20.8px" }}>
              <span style={{ fontSize: 16 }}>Website: www.stcom.vn</span>
            </p>
          </div>
        </div>
        {/*left lien he*/}
        <div className="right_lienhe">
          <form
            method="post"
            name="frm"
            id="frm"
            action="lien-he.html"
            encType="multipart/form-data"
          >
            <div className="tablelienhe" style={{ width: "100%" }}>
              <div className="box_input_contact has_notify">
                <i className="fa fa-user fa-contact" />
                <input
                  name="ten"
                  type="text"
                  className="input input_check_validate"
                  id="ten"
                  size={50}
                  required=""
                  placeholder="Họ và tên"
                />
              </div>
              {/*box input contact*/}
              <div className="box_input_contact has_notify">
                <i className="fa fa-map-marker fa-contact" />
                <input
                  name="diachi"
                  type="text"
                  className="input input_check_validate"
                  size={50}
                  id="diachi"
                  placeholder="Địa chỉ"
                />
              </div>
              {/*box input contact*/}
              <div className="box_input_contact has_notify">
                <i className="fa fa-phone fa-contact" />
                <input
                  name="dienthoai"
                  type="text"
                  className="input input_check_validate"
                  id="dienthoai"
                  size={50}
                  placeholder="Điện thoại"
                />
              </div>
              {/*box input contact*/}
              <div className="box_input_contact has_notify">
                <i className="fa fa-envelope-o fa-contact" />
                <input
                  name="email"
                  type="text"
                  className="input input_check_validate"
                  size={50}
                  id="email"
                  placeholder="Email"
                />
              </div>
              {/*box input contact*/}
              <div className="box_input_contact has_notify">
                <i className="fa fa-share-alt fa-contact" />
                <input
                  name="tieude"
                  type="text"
                  className="input input_check_validate"
                  id="tieude"
                  size={50}
                  placeholder="Tiêu đề"
                />
              </div>
              {/*box input contact*/}
              <div className="box_input_contact">
                <textarea
                  name="noidung"
                  cols={50}
                  rows={7}
                  className="input"
                  style={{ height: 150 }}
                  placeholder="Nội dung"
                  defaultValue={""}
                />
              </div>
              {/*box input contact*/}
              <div className="box_input_contact has_notify">
                <div className="captcha_box">
                  <div
                    className="g-recaptcha"
                    data-sitekey="6LdG50AUAAAAAGIG79FFfb8Fqk61zwTnjf9o2KLU"
                  >
                    <div style={{ width: 304, height: 78 }}>
                      <div>
                        <iframe
                          title="reCAPTCHA"
                          width={304}
                          height={78}
                          role="presentation"
                          name="a-7y95orsgkyjg"
                          frameBorder={0}
                          scrolling="no"
                          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
                          src="https://www.google.com/recaptcha/api2/anchor?ar=1&k=6LdG50AUAAAAAGIG79FFfb8Fqk61zwTnjf9o2KLU&co=aHR0cHM6Ly9zdGNvbS52bjo0NDM.&hl=en&v=aR-zv8WjtWx4lAw-tRCA-zca&size=normal&cb=wp015icnyjyu"
                        />
                      </div>
                      <textarea
                        id="g-recaptcha-response"
                        name="g-recaptcha-response"
                        className="g-recaptcha-response"
                        style={{
                          width: 250,
                          height: 40,
                          border: "1px solid rgb(193, 193, 193)",
                          margin: "10px 25px",
                          padding: 0,
                          resize: "none",
                          display: "none"
                        }}
                        defaultValue={""}
                      />
                    </div>
                    <iframe style={{ display: "none" }} />
                  </div>
                </div>
              </div>
              <div className="box_input_contact">
                <a
                  className="button transitionAll03"
                  onClick="js_submit('frm');"
                >
                  Gửi
                </a>
                <a
                  className="button transitionAll03"
                  onClick="document.frm.reset();"
                >
                  Làm lại
                </a>
              </div>
              {/*box input contact*/}
            </div>
            {/*end table lien he*/}
          </form>
        </div>
        {/*right lien he*/}
        <div className="clear" />
        <div className="contain_map_lienhe">
          <div id="map_contact" style={{ width: "100%", height: 400 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.8895725879721!2d106.67897782918193!3d10.768485417008739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1f7e1f2e2b%3A0x498d49239394d0e0!2zQ8O0bmcgVHkgVG5oaCBQaMOhdCBUcmnhu4NuIFRpbiBI4buNYyBTw6FuZyBU4bqhbw!5e0!3m2!1svi!2s!4v1591065269455!5m2!1svi!2s"
              width="100%"
              height="100%"
              frameBorder={0}
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex={0}
            />
          </div>
        </div>
      </div>
      {/*content main*/}
    </div>
    {/*end sub main*/}
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
                          src="img/Laptop Dell Inspiron 3530 N5i7240W1.jpg"
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
      </div>
    </div>
  </div>
 
</>

    )}