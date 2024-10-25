import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      {/* header */}
      <div
        className="header"
        style={{ position: "relative", left: 0, right: 0, top: 0, zIndex: 100 }}
      >
        <div className="header-top">
          <div className="wrap-content d-flex justify-content-between align-items-center">
            <div className="info-header diachi">
              Huỳnh Thị Hai, Tân Chánh Hiệp, Quận 12
            </div>
            <div className="info-header timeWork">
              Mở cửa: 8:00 đến 18:00 từ Thứ 2 đến Thứ 7
            </div>
            <div className="info-header email">
              <i className="fa fa-envelope-o" aria-hidden="true" /> Email:
              ultratech199@utech.vn
            </div>
            <div className="social-footer d-flex">
              <a
                className="d-block"
                href=""
                target="blank"
              >
                <img src="img/logo facebook.png" alt="Facebook" />
              </a>
              <a className="d-block" href="" target="blank">
                <img src="img/logo instagram.png" alt="twitter" />
              </a>
              <a
                className="d-block"
                href=""
                target="blank"
              >
                <img src="img/logo youtobe.png" alt="G+" />
              </a>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="wrap-content d-flex justify-content-between align-items-center">
            <a className="logo-header d-inline-block" href="">
              <img
                src="/public/img/logo/logo.png"
                alt="Công ty TNHH Phát Triển Tin Học Utech"
                className="mw100"
              />
            </a>
            <div className="header-bottom-right d-flex justify-content-between align-items-center">
              <div id="timkiem">
                <form
                  action="tim-kiem.html"
                  method=""
                  name="frm2"
                  className="frm_timkiem"
                >
                  <select className="list">
                    <option value={0}>Tất cả</option>
                    <option value={11}>LAPTOP</option>
                    <option value={14}>MÁY BỘ PC</option>
                    <option value={15}>LINH KIỆN PC</option>
                    <option value={16}>LCD-TIVI</option>
                    <option value={17}>TB VĂN PHÒNG</option>
                    <option value={18}>THIẾT BỊ MẠNG</option>
                    <option value={19}>PHẦN MỀM</option>
                    <option value={22}>LINH PHỤ KIỆN</option>
                    <option value={38}>APPLE</option>
                    <option value={40}>THIẾT BỊ KTS</option>
                  </select>
                  <input
                    type="text"
                    name="timkiem"
                    id="name_tk"
                    className="input ui-autocomplete-input"
                    placeholder="Bạn cần tìm sản phẩm nào ?"
                    autoComplete="off"
                  />

                  <button type="submit" value="" id="btn" className="nut_tim">
                    <img
                      src="/public/img/icon/magnifying-glass-solid.svg"
                      width="22"
                      alt=""
                    />
                  </button>
                </form>
              </div>{" "}
              <div className="hotline-header">
                <p>
                  0932 333 667 <br />
                  028.38 333 667{" "}
                </p>
              </div>
              <Link
                to="/giohang"
                className="cart-header d-block"
                href="gio-hang.html"
                style={{ overflow: "hidden" }}
              >
                <img
                  width="32px"
                  src="/public/img/icon/cart-shopping-solid.svg"
                  alt=""
                  style={{ float: "left", marginRight: 10 }}
                />
                <p style={{ float: "left" }}>
                  Giỏ hàng (<strong>0</strong>)
                </p>
              </Link>
            </div>
          </div>
        </div>
        <h2 className="vcard">Công ty TNHH Phát Triển Tin Học Utech</h2>
        <h3 className="vcard">Công ty TNHH Phát Triển Tin Học Utech</h3>
        <h4 className="vcard">Công ty TNHH Phát Triển Tin Học Utech</h4>
        <h5 className="vcard">Công ty TNHH Phát Triển Tin Học Utech</h5>
        <h6 className="vcard">Công ty TNHH Phát Triển Tin Học Utech</h6>
        <div className="menu">
          <div className="wrap-content">
            <ul className="d-flex align-items-center">
              <li className="danh-muc-sp">
                <span
                  className="has-child  transition"
                  href="san-pham"
                  title="Danh mục sản phẩm"
                >
                  {" "}
                  Danh mục sản phẩm <i />
                </span>
                <div className="show-menu isPage">
                  <div className="boxshadown">
                    <ul className="box_menu lst-prd">
                      <li className="mega-dropdown">
                        <Link
                          to="/sanphamtheodm"
                          className="has-child transition"
                          title="LAPTOP"
                        >
                          LAPTOP{" "}
                        </Link>
                        <div className="boxMainDropdown">
                          <ul className="dropdown-prod-lv2">
                            <li>
                              <a
                                className="has-child transition"
                                title="LAPTOP DELL"
                                href="san-pham/laptop-dell-15/"
                              >
                                LAPTOP DELL
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="DELL VOSTRO "
                                    href="san-pham/dell-vostro-385/"
                                  >
                                    DELL VOSTRO{" "}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="DELL INSPIRON "
                                    href="san-pham/dell-inspiron-387/"
                                  >
                                    DELL INSPIRON{" "}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="DELL LATITUDE"
                                    href="san-pham/dell-latitude-12/"
                                  >
                                    DELL LATITUDE
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="DELL GAMING"
                                    href="san-pham/dell-gaming-345/"
                                  >
                                    DELL GAMING
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="LAPTOP HP"
                                href="san-pham/laptop-hp-16/"
                              >
                                LAPTOP HP
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="HP 14s"
                                    href="san-pham/hp-14s-80/"
                                  >
                                    HP 14s
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="HP 15s"
                                    href="san-pham/hp-15s-81/"
                                  >
                                    HP 15s
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="HP 240"
                                    href="san-pham/hp-240-365/"
                                  >
                                    HP 240
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="HP PAVILION"
                                    href="san-pham/hp-pavilion-82/"
                                  >
                                    HP PAVILION
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="HP PAVILION X360"
                                    href="san-pham/hp-pavilion-x360-267/"
                                  >
                                    HP PAVILION X360
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="HP PROBOOK"
                                    href="san-pham/hp-probook-83/"
                                  >
                                    HP PROBOOK
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="HP ENVY X360"
                                    href="san-pham/hp-envy-x360-84/"
                                  >
                                    HP ENVY X360
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="HP ELITEBOOK"
                                    href="san-pham/hp-elitebook-256/"
                                  >
                                    HP ELITEBOOK
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="HP VICTUS"
                                    href="san-pham/hp-victus-344/"
                                  >
                                    HP VICTUS
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="LAPTOP ASUS"
                                href="san-pham/laptop-asus-18/"
                              >
                                LAPTOP ASUS
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="ASUS ExpertBook"
                                    href="san-pham/asus-expertbook-350/"
                                  >
                                    ASUS ExpertBook
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="ASUS ViVoBook"
                                    href="san-pham/asus-vivobook-228/"
                                  >
                                    ASUS ViVoBook
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="ASUS Zenbook"
                                    href="san-pham/asus-zenbook-87/"
                                  >
                                    ASUS Zenbook
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="ASUS GAMING Series"
                                    href="san-pham/asus-gaming-series-90/"
                                  >
                                    ASUS GAMING Series
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="LAPTOP LENOVO"
                                href="san-pham/laptop-lenovo-17/"
                              >
                                LAPTOP LENOVO
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="THINKPAD"
                                    href="san-pham/thinkpad-255/"
                                  >
                                    THINKPAD
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="LENOVO V - S Series"
                                    href="san-pham/lenovo-v-s-series-254/"
                                  >
                                    LENOVO V - S Series
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="THINKBOOK"
                                    href="san-pham/thinkbook-376/"
                                  >
                                    THINKBOOK
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="LAPTOP LG"
                                href="san-pham/laptop-lg-173/"
                              >
                                LAPTOP LG
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="LG GRAM"
                                    href="san-pham/lg-gram-323/"
                                  >
                                    LG GRAM
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="LINH KIỆN LAPTOP"
                                href="san-pham/linh-kien-laptop-214/"
                              >
                                LINH KIỆN LAPTOP
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="RAM LAPTOP"
                                    href="san-pham/ram-laptop-418/"
                                  >
                                    RAM LAPTOP
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="MÀN HÌNH LAPTOP"
                                    href="san-pham/man-hinh-laptop-419/"
                                  >
                                    MÀN HÌNH LAPTOP
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="PIN LAPTOP"
                                    href="san-pham/pin-laptop-420/"
                                  >
                                    PIN LAPTOP
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="ADAPTER LAPTOP"
                                    href="san-pham/adapter-laptop-421/"
                                  >
                                    ADAPTER LAPTOP
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="PHỤ KIỆN CHO LAPTOP"
                                    href="san-pham/phu-kien-cho-laptop-422/"
                                  >
                                    PHỤ KIỆN CHO LAPTOP
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="mega-dropdown">
                        <a
                          className="has-child transition"
                          title="MÁY BỘ PC"
                          href="san-pham/may-bo-pc-14/"
                        >
                          MÁY BỘ PC{" "}
                        </a>
                        <div className="boxMainDropdown">
                          <ul className="dropdown-prod-lv2">
                            <li>
                              <a
                                className="has-child transition"
                                title="MÁY BỘ DELL"
                                href="san-pham/may-bo-dell-30/"
                              >
                                MÁY BỘ DELL
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="DELL  INSPIRON"
                                    href="san-pham/dell-inspiron-98/"
                                  >
                                    DELL INSPIRON
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="DELL VOSTRO"
                                    href="san-pham/dell-vostro-99/"
                                  >
                                    DELL VOSTRO
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="DELL OPTIPLEX"
                                    href="san-pham/dell-optiplex-100/"
                                  >
                                    DELL OPTIPLEX
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="DELL XPS"
                                    href="san-pham/dell-xps-251/"
                                  >
                                    DELL XPS
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="DELL PRECISION"
                                    href="san-pham/dell-precision-309/"
                                  >
                                    DELL PRECISION
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="DELL AIO"
                                    href="san-pham/dell-aio-381/"
                                  >
                                    DELL AIO
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="MÁY BỘ HP"
                                href="san-pham/may-bo-hp-82/"
                              >
                                MÁY BỘ HP
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="HP 280"
                                    href="san-pham/hp-280-227/"
                                  >
                                    HP 280
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="HP PAVILION"
                                    href="san-pham/hp-pavilion-101/"
                                  >
                                    HP PAVILION
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="HP PRODESK"
                                    href="san-pham/hp-prodesk-102/"
                                  >
                                    HP PRODESK
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="HP ELITEDESK"
                                    href="san-pham/hp-elitedesk-103/"
                                  >
                                    HP ELITEDESK
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="HP ALL IN ONE"
                                    href="san-pham/hp-all-in-one-250/"
                                  >
                                    HP ALL IN ONE
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="MÁY BỘ ASUS MINI"
                                href="san-pham/may-bo-asus-mini-31/"
                              >
                                MÁY BỘ ASUS MINI
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CHIP INTEL PENTIUM"
                                    href="san-pham/chip-intel-pentium-333/"
                                  >
                                    CHIP INTEL PENTIUM
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CHIP INTEL CORE i3"
                                    href="san-pham/chip-intel-core-i3-334/"
                                  >
                                    CHIP INTEL CORE i3
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CHIP INTEL CORE i5"
                                    href="san-pham/chip-intel-core-i5-335/"
                                  >
                                    CHIP INTEL CORE i5
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CHIP INTEL CORE i7"
                                    href="san-pham/chip-intel-core-i7-336/"
                                  >
                                    CHIP INTEL CORE i7
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CHIP INTEL CORE i9"
                                    href="san-pham/chip-intel-core-i9-436/"
                                  >
                                    CHIP INTEL CORE i9
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="MÁY BỘ LENOVO"
                                href="san-pham/may-bo-lenovo-29/"
                              >
                                MÁY BỘ LENOVO
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CHIP INTEL CORE i3"
                                    href="san-pham/chip-intel-core-i3-437/"
                                  >
                                    CHIP INTEL CORE i3
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CHIP INTEL CORE i5"
                                    href="san-pham/chip-intel-core-i5-438/"
                                  >
                                    CHIP INTEL CORE i5
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CHIP INTEL CORE i7"
                                    href="san-pham/chip-intel-core-i7-439/"
                                  >
                                    CHIP INTEL CORE i7
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="mega-dropdown">
                        <a
                          className="has-child transition"
                          title="LINH KIỆN PC"
                          href="san-pham/linh-kien-pc-15/"
                        >
                          LINH KIỆN PC{" "}
                        </a>
                        <div className="boxMainDropdown">
                          <ul className="dropdown-prod-lv2">
                            <li>
                              <a
                                className="has-child transition"
                                title="MAINBOARD"
                                href="san-pham/mainboard-42/"
                              >
                                MAINBOARD
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="GIGABYTE SOCKET 1700"
                                    href="san-pham/gigabyte-socket-1700-357/"
                                  >
                                    GIGABYTE SOCKET 1700
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="ASUS SOCKET 1700"
                                    href="san-pham/asus-socket-1700-358/"
                                  >
                                    ASUS SOCKET 1700
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="MAIN SOCKET 1200"
                                    href="san-pham/main-socket-1200-299/"
                                  >
                                    MAIN SOCKET 1200
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="MAIN SOCKET 1151"
                                    href="san-pham/main-socket-1151-26/"
                                  >
                                    MAIN SOCKET 1151
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="MAIN SOCKET 1150"
                                    href="san-pham/main-socket-1150-189/"
                                  >
                                    MAIN SOCKET 1150
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="CPU"
                                href="san-pham/cpu-78/"
                              >
                                CPU
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CPU INTEL THẾ HỆ 12"
                                    href="san-pham/cpu-intel-the-he-12-426/"
                                  >
                                    CPU INTEL THẾ HỆ 12
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CPU INTEL THẾ HỆ 13"
                                    href="san-pham/cpu-intel-the-he-13-427/"
                                  >
                                    CPU INTEL THẾ HỆ 13
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CPU INTEL THẾ HỆ 14"
                                    href="san-pham/cpu-intel-the-he-14-428/"
                                  >
                                    CPU INTEL THẾ HỆ 14
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CPU INTEL SOCKET 1200"
                                    href="san-pham/cpu-intel-socket-1200-301/"
                                  >
                                    CPU INTEL SOCKET 1200
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CPU AMD"
                                    href="san-pham/cpu-amd-195/"
                                  >
                                    CPU AMD
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="TẢN NHIỆT"
                                href="san-pham/tan-nhiet-206/"
                              >
                                TẢN NHIỆT
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="TẢN NHIỆT KHÍ"
                                    href="san-pham/tan-nhiet-khi-440/"
                                  >
                                    TẢN NHIỆT KHÍ
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="TẢN NHIỆT NƯỚC"
                                    href="san-pham/tan-nhiet-nuoc-355/"
                                  >
                                    TẢN NHIỆT NƯỚC
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="KEO TẢN NHIỆT"
                                    href="san-pham/keo-tan-nhiet-441/"
                                  >
                                    KEO TẢN NHIỆT
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="DDRAM 4 "
                                href="san-pham/ddram-4-79/"
                              >
                                DDRAM 4{" "}
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="KINGSTON"
                                    href="san-pham/kingston-29/"
                                  >
                                    KINGSTON
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="G.SKILL"
                                    href="san-pham/gskill-31/"
                                  >
                                    G.SKILL
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CORSAIR"
                                    href="san-pham/corsair-33/"
                                  >
                                    CORSAIR
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="KINGMAX"
                                    href="san-pham/kingmax-30/"
                                  >
                                    KINGMAX
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="GIGABYTE"
                                    href="san-pham/gigabyte-315/"
                                  >
                                    GIGABYTE
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="LEXAR"
                                    href="san-pham/lexar-34/"
                                  >
                                    LEXAR
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="KHÁC"
                                    href="san-pham/khac-196/"
                                  >
                                    KHÁC
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="DDRAM 5"
                                href="san-pham/ddram-5-218/"
                              >
                                DDRAM 5
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="KINGSTON"
                                    href="san-pham/kingston-430/"
                                  >
                                    KINGSTON
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="G.SKILL"
                                    href="san-pham/gskill-431/"
                                  >
                                    G.SKILL
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="Ổ CỨNG SSD"
                                href="san-pham/o-cung-ssd-209/"
                              >
                                Ổ CỨNG SSD
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="SSD WESTERN"
                                    href="san-pham/ssd-western-391/"
                                  >
                                    SSD WESTERN
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="SSD KINGSTON"
                                    href="san-pham/ssd-kingston-392/"
                                  >
                                    SSD KINGSTON
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="SSD LEXAR"
                                    href="san-pham/ssd-lexar-395/"
                                  >
                                    SSD LEXAR
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="SSD SAMSUNG"
                                    href="san-pham/ssd-samsung-396/"
                                  >
                                    SSD SAMSUNG
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="SSD KINGMAX"
                                    href="san-pham/ssd-kingmax-393/"
                                  >
                                    SSD KINGMAX
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="SSD GIGABTYE"
                                    href="san-pham/ssd-gigabtye-394/"
                                  >
                                    SSD GIGABTYE
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="SSD KHÁC"
                                    href="san-pham/ssd-khac-398/"
                                  >
                                    SSD KHÁC
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="Ổ CỨNG HDD "
                                href="san-pham/o-cung-hdd-44/"
                              >
                                Ổ CỨNG HDD{" "}
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="WESTERN"
                                    href="san-pham/western-13/"
                                  >
                                    WESTERN
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="SEAGATE"
                                    href="san-pham/seagate-14/"
                                  >
                                    SEAGATE
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="VGA CARD"
                                href="san-pham/vga-card-43/"
                              >
                                VGA CARD
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="GIGABYTE"
                                    href="san-pham/gigabyte-24/"
                                  >
                                    GIGABYTE
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="ASUS"
                                    href="san-pham/asus-25/"
                                  >
                                    ASUS
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="MSI"
                                    href="san-pham/msi-23/"
                                  >
                                    MSI
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="NVIDIA"
                                    href="san-pham/nvidia-268/"
                                  >
                                    NVIDIA
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="POWER "
                                href="san-pham/power-81/"
                              >
                                POWER{" "}
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="COOLERMASTER"
                                    href="san-pham/coolermaster-200/"
                                  >
                                    COOLERMASTER
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="XIGMATEK"
                                    href="san-pham/xigmatek-201/"
                                  >
                                    XIGMATEK
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CORSAIR"
                                    href="san-pham/corsair-204/"
                                  >
                                    CORSAIR
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="ARROW"
                                    href="san-pham/arrow-202/"
                                  >
                                    ARROW
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="JETEK"
                                    href="san-pham/jetek-207/"
                                  >
                                    JETEK
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="GIGABYTE"
                                    href="san-pham/gigabyte-270/"
                                  >
                                    GIGABYTE
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="ANTEC"
                                    href="san-pham/antec-442/"
                                  >
                                    ANTEC
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="THƯƠNG HIỆU KHÁC"
                                    href="san-pham/thuong-hieu-khac-429/"
                                  >
                                    THƯƠNG HIỆU KHÁC
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="CASE"
                                href="san-pham/case-41/"
                              >
                                CASE
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CASE SAMA"
                                    href="san-pham/case-sama-19/"
                                  >
                                    CASE SAMA
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CASE COOLER MASTER"
                                    href="san-pham/case-cooler-master-18/"
                                  >
                                    CASE COOLER MASTER
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CASE SP"
                                    href="san-pham/case-sp-21/"
                                  >
                                    CASE SP
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CASE DEEPCOOL"
                                    href="san-pham/case-deepcool-15/"
                                  >
                                    CASE DEEPCOOL
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CASE JETEK"
                                    href="san-pham/case-jetek-28/"
                                  >
                                    CASE JETEK
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CASE DELUXE"
                                    href="san-pham/case-deluxe-214/"
                                  >
                                    CASE DELUXE
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CASE XIGMATEK"
                                    href="san-pham/case-xigmatek-326/"
                                  >
                                    CASE XIGMATEK
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="KHÁC"
                                    href="san-pham/khac-271/"
                                  >
                                    KHÁC
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="Ổ CỨNG DI ĐỘNG"
                                href="san-pham/o-cung-di-dong-125/"
                              >
                                Ổ CỨNG DI ĐỘNG
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="WESTERN"
                                    href="san-pham/western-211/"
                                  >
                                    WESTERN
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="SEAGATE"
                                    href="san-pham/seagate-210/"
                                  >
                                    SEAGATE
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="TRANSCEND"
                                    href="san-pham/transcend-212/"
                                  >
                                    TRANSCEND
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="SANDISK"
                                    href="san-pham/sandisk-213/"
                                  >
                                    SANDISK
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="SAMSUNG"
                                    href="san-pham/samsung-217/"
                                  >
                                    SAMSUNG
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="LEXAR"
                                    href="san-pham/lexar-218/"
                                  >
                                    LEXAR
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="mega-dropdown">
                        <a
                          className="has-child transition"
                          title="LCD-TIVI"
                          href="san-pham/lcdtivi-16/"
                        >
                          LCD-TIVI{" "}
                        </a>
                        <div className="boxMainDropdown">
                          <ul className="dropdown-prod-lv2">
                            <li>
                              <a
                                className="has-child transition"
                                title="LCD DELL"
                                href="san-pham/lcd-dell-34/"
                              >
                                LCD DELL
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 19-22 inch"
                                    href="san-pham/man-hinh-1922-inch-239/"
                                  >
                                    Màn hình 19-22 inch
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 24-25 inch "
                                    href="san-pham/man-hinh-2425-inch-425/"
                                  >
                                    Màn hình 24-25 inch{" "}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 27 inch"
                                    href="san-pham/man-hinh-27-inch-240/"
                                  >
                                    Màn hình 27 inch
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 28 inch trở lên"
                                    href="san-pham/man-hinh-28-inch-tro-len-241/"
                                  >
                                    Màn hình 28 inch trở lên
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="LCD HP"
                                href="san-pham/lcd-hp-39/"
                              >
                                LCD HP
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 19-22 inch"
                                    href="san-pham/man-hinh-1922-inch-272/"
                                  >
                                    Màn hình 19-22 inch
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 24-27 inch"
                                    href="san-pham/man-hinh-2427-inch-273/"
                                  >
                                    Màn hình 24-27 inch
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 28 inch trở lên"
                                    href="san-pham/man-hinh-28-inch-tro-len-274/"
                                  >
                                    Màn hình 28 inch trở lên
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="LCD LG"
                                href="san-pham/lcd-lg-33/"
                              >
                                LCD LG
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 22-24 inch"
                                    href="san-pham/man-hinh-2224-inch-237/"
                                  >
                                    Màn hình 22-24 inch
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 27 inch"
                                    href="san-pham/man-hinh-27-inch-238/"
                                  >
                                    Màn hình 27 inch
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 28 inch trở lên"
                                    href="san-pham/man-hinh-28-inch-tro-len-415/"
                                  >
                                    Màn hình 28 inch trở lên
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="LCD SAMSUNG"
                                href="san-pham/lcd-samsung-37/"
                              >
                                LCD SAMSUNG
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 19-24 inch"
                                    href="san-pham/man-hinh-1924-inch-279/"
                                  >
                                    Màn hình 19-24 inch
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 27-28 inch"
                                    href="san-pham/man-hinh-2728-inch-280/"
                                  >
                                    Màn hình 27-28 inch
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 32 inch trở lên"
                                    href="san-pham/man-hinh-32-inch-tro-len-434/"
                                  >
                                    Màn hình 32 inch trở lên
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="LCD PHILIPS"
                                href="san-pham/lcd-philips-35/"
                              >
                                LCD PHILIPS
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 22-24 inch"
                                    href="san-pham/man-hinh-2224-inch-282/"
                                  >
                                    Màn hình 22-24 inch
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 27-32 inch"
                                    href="san-pham/man-hinh-2732-inch-283/"
                                  >
                                    Màn hình 27-32 inch
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 32 inch trở lên"
                                    href="san-pham/man-hinh-32-inch-tro-len-284/"
                                  >
                                    Màn hình 32 inch trở lên
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="LCD VIEWSONIC"
                                href="san-pham/lcd-viewsonic-32/"
                              >
                                LCD VIEWSONIC
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 19-22 inch"
                                    href="san-pham/man-hinh-1922-inch-383/"
                                  >
                                    Màn hình 19-22 inch
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 24 inch"
                                    href="san-pham/man-hinh-24-inch-417/"
                                  >
                                    Màn hình 24 inch
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 27 inch trở lên"
                                    href="san-pham/man-hinh-27-inch-tro-len-435/"
                                  >
                                    Màn hình 27 inch trở lên
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="LCD ASUS"
                                href="san-pham/lcd-asus-40/"
                              >
                                LCD ASUS
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 22-24 inch"
                                    href="san-pham/man-hinh-2224-inch-276/"
                                  >
                                    Màn hình 22-24 inch
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 27 inch trở lên"
                                    href="san-pham/man-hinh-27-inch-tro-len-277/"
                                  >
                                    Màn hình 27 inch trở lên
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="LCD AOC"
                                href="san-pham/lcd-aoc-36/"
                              >
                                LCD AOC
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 22-24 inch"
                                    href="san-pham/man-hinh-2224-inch-289/"
                                  >
                                    Màn hình 22-24 inch
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn hình 27 inch trở lên"
                                    href="san-pham/man-hinh-27-inch-tro-len-290/"
                                  >
                                    Màn hình 27 inch trở lên
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="LCD ACER"
                                href="san-pham/lcd-acer-197/"
                              >
                                LCD ACER
                              </a>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="LCD GIGABYTE"
                                href="san-pham/lcd-gigabyte-180/"
                              >
                                LCD GIGABYTE
                              </a>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="Smart Tivi"
                                href="san-pham/smart-tivi-216/"
                              >
                                Smart Tivi
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="mega-dropdown">
                        <a
                          className="has-child transition"
                          title="TB VĂN PHÒNG"
                          href="san-pham/tb-van-phong-17/"
                        >
                          TB VĂN PHÒNG{" "}
                        </a>
                        <div className="boxMainDropdown">
                          <ul className="dropdown-prod-lv2">
                            <li>
                              <a
                                className="has-child transition"
                                title="MÁY IN "
                                href="san-pham/may-in-90/"
                              >
                                MÁY IN{" "}
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="MÁY IN HP"
                                    href="san-pham/may-in-hp-108/"
                                  >
                                    MÁY IN HP
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="MÁY IN CANON"
                                    href="san-pham/may-in-canon-112/"
                                  >
                                    MÁY IN CANON
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="MÁY IN BROTHER"
                                    href="san-pham/may-in-brother-110/"
                                  >
                                    MÁY IN BROTHER
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="MÁY IN EPSON"
                                    href="san-pham/may-in-epson-432/"
                                  >
                                    MÁY IN EPSON
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="MÁY IN BILL"
                                    href="san-pham/may-in-bill-433/"
                                  >
                                    MÁY IN BILL
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="MỰC IN"
                                href="san-pham/muc-in-142/"
                              >
                                MỰC IN
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="BROTHER"
                                    href="san-pham/brother-226/"
                                  >
                                    BROTHER
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CANON"
                                    href="san-pham/canon-225/"
                                  >
                                    CANON
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="HP"
                                    href="san-pham/hp-224/"
                                  >
                                    HP
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="UPS"
                                href="san-pham/ups-99/"
                              >
                                UPS
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="SANTAK"
                                    href="san-pham/santak-123/"
                                  >
                                    SANTAK
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="APC"
                                    href="san-pham/apc-341/"
                                  >
                                    APC
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="ARES"
                                    href="san-pham/ares-342/"
                                  >
                                    ARES
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="MÁY SCAN"
                                href="san-pham/may-scan-91/"
                              >
                                MÁY SCAN
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Scanner Canon"
                                    href="san-pham/scanner-canon-113/"
                                  >
                                    Scanner Canon
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Scanner Hp"
                                    href="san-pham/scanner-hp-114/"
                                  >
                                    Scanner Hp
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Scanner Brother"
                                    href="san-pham/scanner-brother-294/"
                                  >
                                    Scanner Brother
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Scanner Epson"
                                    href="san-pham/scanner-epson-352/"
                                  >
                                    Scanner Epson
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="THIẾT BỊ TRÌNH CHIẾU"
                                href="san-pham/thiet-bi-trinh-chieu-179/"
                              >
                                THIẾT BỊ TRÌNH CHIẾU
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="ELECOM"
                                    href="san-pham/elecom-306/"
                                  >
                                    ELECOM
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="LOGITECH"
                                    href="san-pham/logitech-303/"
                                  >
                                    LOGITECH
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="CANON"
                                    href="san-pham/canon-305/"
                                  >
                                    CANON
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="SPOTLIGHT"
                                    href="san-pham/spotlight-378/"
                                  >
                                    SPOTLIGHT
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="MÁY CHIẾU"
                                href="san-pham/may-chieu-93/"
                              >
                                MÁY CHIẾU
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Sony"
                                    href="san-pham/sony-118/"
                                  >
                                    Sony
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Panasonic"
                                    href="san-pham/panasonic-119/"
                                  >
                                    Panasonic
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Epson"
                                    href="san-pham/epson-221/"
                                  >
                                    Epson
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="MÀN CHIẾU "
                                href="san-pham/man-chieu-94/"
                              >
                                MÀN CHIẾU{" "}
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn chiếu điện"
                                    href="san-pham/man-chieu-dien-230/"
                                  >
                                    Màn chiếu điện
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn chiếu treo"
                                    href="san-pham/man-chieu-treo-229/"
                                  >
                                    Màn chiếu treo
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Màn chiếu đứng"
                                    href="san-pham/man-chieu-dung-121/"
                                  >
                                    Màn chiếu đứng
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="MÁY HỦY TÀI LIỆU"
                                href="san-pham/may-huy-tai-lieu-95/"
                              >
                                MÁY HỦY TÀI LIỆU
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Silicon"
                                    href="san-pham/silicon-122/"
                                  >
                                    Silicon
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Bingo"
                                    href="san-pham/bingo-235/"
                                  >
                                    Bingo
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="ĐIỆN THOẠI BÀN"
                                href="san-pham/dien-thoai-ban-190/"
                              >
                                ĐIỆN THOẠI BÀN
                              </a>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="MÁY ĐẾM TIỀN"
                                href="san-pham/may-dem-tien-98/"
                              >
                                MÁY ĐẾM TIỀN
                              </a>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="WEBCAM - CAMERA"
                                href="san-pham/webcam-camera-192/"
                              >
                                WEBCAM - CAMERA
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="IMOU"
                                    href="san-pham/imou-424/"
                                  >
                                    IMOU
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="LOGITECH"
                                    href="san-pham/logitech-332/"
                                  >
                                    LOGITECH
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="RAPOO"
                                    href="san-pham/rapoo-343/"
                                  >
                                    RAPOO
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="mega-dropdown">
                        <a
                          className="has-child transition"
                          title="THIẾT BỊ MẠNG"
                          href="san-pham/thiet-bi-mang-18/"
                        >
                          THIẾT BỊ MẠNG{" "}
                        </a>
                        <div className="boxMainDropdown">
                          <ul className="dropdown-prod-lv2">
                            <li>
                              <a
                                className="has-child transition"
                                title="WIFI"
                                href="san-pham/wifi-100/"
                              >
                                WIFI
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="TP-LINK"
                                    href="san-pham/tplink-124/"
                                  >
                                    TP-LINK
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="UNIFI"
                                    href="san-pham/unifi-134/"
                                  >
                                    UNIFI
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="DRAYTEK"
                                    href="san-pham/draytek-128/"
                                  >
                                    DRAYTEK
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="LINKSYS"
                                    href="san-pham/linksys-126/"
                                  >
                                    LINKSYS
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="D-LINK"
                                    href="san-pham/dlink-125/"
                                  >
                                    D-LINK
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="TOTOLINK"
                                    href="san-pham/totolink-127/"
                                  >
                                    TOTOLINK
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="ASUS"
                                    href="san-pham/asus-215/"
                                  >
                                    ASUS
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="APTEK"
                                    href="san-pham/aptek-222/"
                                  >
                                    APTEK
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="UGREEN "
                                    href="san-pham/ugreen-379/"
                                  >
                                    UGREEN{" "}
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="HUB-SWITCH"
                                href="san-pham/hubswitch-105/"
                              >
                                HUB-SWITCH
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="APTEK"
                                    href="san-pham/aptek-403/"
                                  >
                                    APTEK
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="TP-link"
                                    href="san-pham/tplink-138/"
                                  >
                                    TP-link
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="D-Link"
                                    href="san-pham/dlink-139/"
                                  >
                                    D-Link
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Linksys"
                                    href="san-pham/linksys-140/"
                                  >
                                    Linksys
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Totolink"
                                    href="san-pham/totolink-141/"
                                  >
                                    Totolink
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="DrayTek"
                                    href="san-pham/draytek-142/"
                                  >
                                    DrayTek
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Cisco"
                                    href="san-pham/cisco-143/"
                                  >
                                    Cisco
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="CABLE MẠNG"
                                href="san-pham/cable-mang-106/"
                              >
                                CABLE MẠNG
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="AMP"
                                    href="san-pham/amp-144/"
                                  >
                                    AMP
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="DINTEK"
                                    href="san-pham/dintek-146/"
                                  >
                                    DINTEK
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="GOLDEN LINK"
                                    href="san-pham/golden-link-145/"
                                  >
                                    GOLDEN LINK
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Cable mạng bấm sẵn"
                                    href="san-pham/cable-mang-bam-san-147/"
                                  >
                                    Cable mạng bấm sẵn
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="ĐẦU MẠNG"
                                href="san-pham/dau-mang-141/"
                              >
                                ĐẦU MẠNG
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="AMP"
                                    href="san-pham/amp-149/"
                                  >
                                    AMP
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Golden"
                                    href="san-pham/golden-150/"
                                  >
                                    Golden
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Dintek"
                                    href="san-pham/dintek-151/"
                                  >
                                    Dintek
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="AMP (II)"
                                    href="san-pham/amp-ii-152/"
                                  >
                                    AMP (II)
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="UGREEN"
                                    href="san-pham/ugreen-380/"
                                  >
                                    UGREEN
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="mega-dropdown">
                        <a
                          className="has-child transition"
                          title="PHẦN MỀM"
                          href="san-pham/phan-mem-19/"
                        >
                          PHẦN MỀM{" "}
                        </a>
                        <div className="boxMainDropdown">
                          <ul className="dropdown-prod-lv2">
                            <li>
                              <a
                                className="has-child transition"
                                title="PHẦN MỀM WINDOWS"
                                href="san-pham/phan-mem-windows-107/"
                              >
                                PHẦN MỀM WINDOWS
                              </a>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="PHẦN MỀM OFFICE"
                                href="san-pham/phan-mem-office-108/"
                              >
                                PHẦN MỀM OFFICE
                              </a>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="PHẦN MỀM DIỆT VIRUS"
                                href="san-pham/phan-mem-diet-virus-109/"
                              >
                                PHẦN MỀM DIỆT VIRUS
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="mega-dropdown">
                        <a
                          className="has-child transition"
                          title="LINH PHỤ KIỆN"
                          href="san-pham/linh-phu-kien-22/"
                        >
                          LINH PHỤ KIỆN{" "}
                        </a>
                        <div className="boxMainDropdown">
                          <ul className="dropdown-prod-lv2">
                            <li>
                              <a
                                className="has-child transition"
                                title="MOUSE"
                                href="san-pham/mouse-131/"
                              >
                                MOUSE
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Logitech"
                                    href="san-pham/logitech-35/"
                                  >
                                    Logitech
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Genius"
                                    href="san-pham/genius-36/"
                                  >
                                    Genius
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="ASUS"
                                    href="san-pham/asus-316/"
                                  >
                                    ASUS
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Thương hiệu khác"
                                    href="san-pham/thuong-hieu-khac-41/"
                                  >
                                    Thương hiệu khác
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Corsair"
                                    href="san-pham/corsair-402/"
                                  >
                                    Corsair
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="KEYBOARD"
                                href="san-pham/keyboard-132/"
                              >
                                KEYBOARD
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Logitech"
                                    href="san-pham/logitech-42/"
                                  >
                                    Logitech
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Dell"
                                    href="san-pham/dell-43/"
                                  >
                                    Dell
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Corsair"
                                    href="san-pham/corsair-45/"
                                  >
                                    Corsair
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="DareU"
                                    href="san-pham/dareu-377/"
                                  >
                                    DareU
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="ASUS"
                                    href="san-pham/asus-317/"
                                  >
                                    ASUS
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Thương hiệu khác"
                                    href="san-pham/thuong-hieu-khac-48/"
                                  >
                                    Thương hiệu khác
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="KEYBOARD + MOUSE"
                                href="san-pham/keyboard-mouse-133/"
                              >
                                KEYBOARD + MOUSE
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Logitech"
                                    href="san-pham/logitech-49/"
                                  >
                                    Logitech
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Motospeed"
                                    href="san-pham/motospeed-50/"
                                  >
                                    Motospeed
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="HP"
                                    href="san-pham/hp-295/"
                                  >
                                    HP
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Thương hiệu khác"
                                    href="san-pham/thuong-hieu-khac-51/"
                                  >
                                    Thương hiệu khác
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="LOA VI TÍNH"
                                href="san-pham/loa-vi-tinh-191/"
                              >
                                LOA VI TÍNH
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Loa Soundmax"
                                    href="san-pham/loa-soundmax-328/"
                                  >
                                    Loa Soundmax
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Loa Microlab"
                                    href="san-pham/loa-microlab-329/"
                                  >
                                    Loa Microlab
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Loa Creative"
                                    href="san-pham/loa-creative-331/"
                                  >
                                    Loa Creative
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Loa Logitech"
                                    href="san-pham/loa-logitech-330/"
                                  >
                                    Loa Logitech
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="CABLE CHUYỂN ĐỔI"
                                href="san-pham/cable-chuyen-doi-137/"
                              >
                                CABLE CHUYỂN ĐỔI
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="HDMI -> KHÁC"
                                    href="san-pham/hdmi-khac-64/"
                                  >
                                    HDMI -&gt; KHÁC
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Mini Hdmi -> Khác"
                                    href="san-pham/mini-hdmi-khac-66/"
                                  >
                                    Mini Hdmi -&gt; Khác
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Micro HDMI -> Khác"
                                    href="san-pham/micro-hdmi-khac-65/"
                                  >
                                    Micro HDMI -&gt; Khác
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Usb -> Khác"
                                    href="san-pham/usb-khac-63/"
                                  >
                                    Usb -&gt; Khác
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Type C -> Khác"
                                    href="san-pham/type-c-khac-67/"
                                  >
                                    Type C -&gt; Khác
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Mini Displayport -> Khác"
                                    href="san-pham/mini-displayport-khac-68/"
                                  >
                                    Mini Displayport -&gt; Khác
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Displayport -> Khác"
                                    href="san-pham/displayport-khac-231/"
                                  >
                                    Displayport -&gt; Khác
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Vga -> HDMI"
                                    href="san-pham/vga-hdmi-232/"
                                  >
                                    Vga -&gt; HDMI
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="USB-HUB USB"
                                href="san-pham/usbhub-usb-205/"
                              >
                                USB-HUB USB
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="USB KINGSTON"
                                    href="san-pham/usb-kingston-351/"
                                  >
                                    USB KINGSTON
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="PHỤ KIỆN MÁY TÍNH"
                                href="san-pham/phu-kien-may-tinh-138/"
                              >
                                PHỤ KIỆN MÁY TÍNH
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Headphone / Microphone"
                                    href="san-pham/headphone-microphone-70/"
                                  >
                                    Headphone / Microphone
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Khác"
                                    href="san-pham/khac-73/"
                                  >
                                    Khác
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="PHỤ KIỆN ĐIỆN THOẠI"
                                href="san-pham/phu-kien-dien-thoai-139/"
                              >
                                PHỤ KIỆN ĐIỆN THOẠI
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="mega-dropdown">
                        <a
                          className="has-child transition"
                          title="APPLE"
                          href="san-pham/apple-38/"
                        >
                          APPLE{" "}
                        </a>
                        <div className="boxMainDropdown">
                          <ul className="dropdown-prod-lv2">
                            <li>
                              <a
                                className="has-child transition"
                                title="SURFACE"
                                href="san-pham/surface-212/"
                              >
                                SURFACE
                              </a>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="MACBOOK"
                                href="san-pham/macbook-183/"
                              >
                                MACBOOK
                              </a>
                              <ul className="dropdown-prod-lv3">
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Macbook AIR"
                                    href="san-pham/macbook-air-324/"
                                  >
                                    Macbook AIR
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Macbook PRO"
                                    href="san-pham/macbook-pro-325/"
                                  >
                                    Macbook PRO
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="has-child transition"
                                    title="Macbook MINI"
                                    href="san-pham/macbook-mini-366/"
                                  >
                                    Macbook MINI
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="IPHONE"
                                href="san-pham/iphone-181/"
                              >
                                IPHONE
                              </a>
                            </li>
                            <li>
                              <a
                                className="has-child transition"
                                title="IPAD"
                                href="san-pham/ipad-182/"
                              >
                                IPAD
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="mega-dropdown">
                        <a
                          className="has-child transition"
                          title="THIẾT BỊ KTS"
                          href="san-pham/thiet-bi-kts-40/"
                        >
                          THIẾT BỊ KTS{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="li-normal">
                <Link to="/" className="" href="" title="Trang chủ">
                  Trang chủ
                </Link>
              </li>
              <li className="li-normal">
                <Link
                  to="/gioithieu"
                  className=""
                  href="gioi-thieu.html"
                  title="Giới thiệu"
                >
                  Giới thiệu
                </Link>
              </li>
              <li className="li-normal">
                <a className="" href="tra-gop.html" title="Trả góp">
                  Trả góp
                </a>
              </li>
              <li className="li-normal">
                <a
                  href="bao-gia.html"
                  className="goto-form"
                  title="Yêu cầu báo giá"
                >
                  Yêu cầu báo giá
                </a>
              </li>
              <li className="li-normal">
                <a className="" href="tin-tuc.html" title="Tin tức & sự kiện">
                  Tin tức &amp; Sự kiện
                </a>
              </li>
              <li className="li-normal">
                <Link
                  to="/lienhe"
                  className=""
                  href="lien-he.html"
                  title="Liên hệ"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* header end*/}
    </>
  );
}
