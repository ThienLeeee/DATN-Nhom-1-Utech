import { useEffect, useState } from "react";
import { fetchSanphamIddm } from "../../../service/sanphamService";
import { useParams } from "react-router-dom";
import "/public/css/thongsokt.css";

export default function ChiTietSanPham() {
  const { id } = useParams();
  const [sanpham, setSanpham] = useState(null);

  useEffect(() => {
    // Giả sử bạn có một hàm để lấy dữ liệu sản phẩm theo ID
    fetchSanphamIddm(id).then((sanphamData) => setSanpham(sanphamData));
  }, [id]);

  if (!sanpham) {
    return <div>Loading...</div>;
  }

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
    <>
      {/* chitietsanpham-container */}
      <div className="wrap-main wrap-page">
        <div className="sub_main">
          <div
            className="content_main"
            itemScope=""
            itemType="http://schema.org/Product"
          >
            <div className="top_detail">
              <div className="img_detail">
                <div className="main_img_detail">
                  <a
                    id="Zoomer"
                    href=""
                    className="MagicZoomPlus"
                    rel="zoom-width:300px; zoom-height:300px;selectors-effect-speed: 600; selectors-class: Active;"
                  >
                    <figure className="mz-figure mz-hover-zoom mz-ready">
                      <img
                        itemProp="image"
                        src={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.chinh}`}
                        alt={sanpham.ten_sp}
                        style={{ width: 380, height: 333.2 }}
                      />
                      <div
                        className="mz-lens"
                        style={{
                          top: 0,
                          transform: "translate(-10000px, -10000px)",
                          width: 169,
                          height: 129,
                        }}
                      >
                        <img
                          src={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.chinh}`}
                          alt={sanpham.ten_sp}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: 378,
                            height: 330,
                            transform: "translate(-12px, -77px)",
                          }}
                        />
                      </div>
                      <div className="mz-loading" />
                      <div className="mz-hint mz-hint-hidden">
                        <span className="mz-hint-message">Click to expand</span>
                      </div>
                    </figure>
                  </a>
                </div>

                <div id="sub_img_detail">
                  <div className="list_sub_img_detail">
                    <a
                      href="javascript:"
                      title="prev"
                      className="prev_sub_detail transitionAll03"
                    />
                    <a
                      href="javascript:"
                      title="next"
                      className="next_sub_detail transitionAll03"
                    />
                    <div
                      className="owl_img_detail owl-carousel owl-theme"
                      style={{ opacity: 1, display: "block" }}
                    >
                      <div className="owl-wrapper-outer">
                        <div
                          className="owl-wrapper"
                          style={{
                            width: 1330,
                            left: 0,
                            display: "block",
                            transition: "800ms",
                            transform: "translate3d(-95px, 0px, 0px)",
                          }}
                        >
                          {/* anh_phu_1 */}
                          <div className="owl-item" style={{ width: 95 }}>
                            <div className="item_owl_sub">
                              <a
                                href={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu1}`}
                                rel="zoom-id: Zoomer"
                                className="mz-thumb-selected mz-thumb"
                              >
                                <img
                                  src={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu1}`}
                                  className="w100"
                                  alt={sanpham.ten_sp}
                                />
                              </a>
                            </div>
                          </div>
                          {/* anh_phu_1 end*/}

                          {/* anh_phu_2 */}
                          <div className="owl-item" style={{ width: 95 }}>
                            <div className="item_owl_sub">
                              <a
                                href={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu2}`}
                                rel="zoom-id: Zoomer"
                                className="mz-thumb"
                              >
                                <img
                                  src={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu2}`}
                                  className="w100"
                                  alt={sanpham.ten_sp}
                                />
                              </a>
                            </div>
                          </div>
                          {/* anh_phu_2 end */}

                          {/* anh_phu_3 */}
                          <div className="owl-item" style={{ width: 95 }}>
                            <div className="item_owl_sub">
                              <a
                                src={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu3}`}
                                rel="zoom-id: Zoomer"
                                className="mz-thumb"
                              >
                                <img
                                  src={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu3}`}
                                  className="w100"
                                  alt={sanpham.ten_sp}
                                />
                              </a>
                            </div>
                          </div>
                          {/* anh_phu_3 end */}

                          {/* anh_phu_4 */}
                          <div className="owl-item" style={{ width: 95 }}>
                            <div className="item_owl_sub">
                              <a
                                src={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu4}`}
                                rel="zoom-id: Zoomer"
                                className="mz-thumb"
                              >
                                <img
                                  src={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu4}`}
                                  className="w100"
                                  alt={sanpham.ten_sp}
                                />
                              </a>
                            </div>
                          </div>
                          {/* anh_phu_4 end */}

                          {/* anh_phu_5 */}
                          <div className="owl-item" style={{ width: 95 }}>
                            <div className="item_owl_sub">
                              <a
                                src={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu5}`}
                                rel="zoom-id: Zoomer"
                                className="mz-thumb"
                              >
                                <img
                                  src={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu5}`}
                                  className="w100"
                                  alt={sanpham.ten_sp}
                                />
                              </a>
                            </div>
                          </div>
                          {/* anh_phu_5 end */}
                        </div>
                      </div>
                    </div>
                    {/*owl img detail*/}
                  </div>
                </div>
              </div>

              <div className="info_detail">
                <h1
                  style={{ display: "inline", verticalAlign: "middle" }}
                  className="name_detail"
                  itemProp="name"
                >
                  {sanpham.ten_sp}
                </h1>

                <div className="item_info_detail masp">
                  <strong>
                    Mã SP : <span itemProp="mpn">{sanpham.ma_san_pham}</span>
                  </strong>
                  <strong>
                    Tình trạng :
                    <span style={{ color: "#006fd5" }}>Còn hàng</span>
                  </strong>
                </div>

                <div className="item_info_detail">
                  <div className="mota_detail text" itemProp="description">
                    {sanpham.id_danhmuc === 1 && (
                      <ul>
                        <li>CPU: {sanpham.cau_hinh.cpu}</li>
                        <li>RAM: {sanpham.cau_hinh.ram}</li>
                        <li>Ổ cứng: {sanpham.cau_hinh.o_cung}</li>
                        <li>VGA: {sanpham.cau_hinh.vga}</li>
                        <li>Màn hình: {sanpham.cau_hinh.man_hinh}</li>
                        <li>Pin: {sanpham.cau_hinh_chi_tiet.pin}</li>
                        <li>Màu sắc: {sanpham.cau_hinh_chi_tiet.mau_sac}</li>
                        <li>
                          Trọng lượng: {sanpham.cau_hinh_chi_tiet.trong_luong}
                        </li>
                        <li>
                          Hệ điều hành: {sanpham.cau_hinh_chi_tiet.he_dieu_hanh}
                        </li>
                      </ul>
                    )}
                    {sanpham.id_danhmuc === 2 && (
                      <ul>
                        <li>Mainboard: {sanpham.cau_hinh.mainboard}</li>
                        <li>CPU: {sanpham.cau_hinh.cpu}</li>
                        <li>RAM: {sanpham.cau_hinh.ram}</li>
                        <li>VGA: {sanpham.cau_hinh.vga}</li>
                        <li>HDD: {sanpham.cau_hinh.hdd}</li>
                        <li>SSD: {sanpham.cau_hinh.ssd}</li>
                        <li>PSU: {sanpham.cau_hinh.psu}</li>
                        <li>Case: {sanpham.cau_hinh.case}</li>
                        <li>Cooling: {sanpham.cau_hinh.cooling}</li>
                      </ul>
                    )}
                    {sanpham.id_danhmuc === 3 && (
                      <ul>
                        <li>Kiểu màn hình: {sanpham.cau_hinh.kieu_man_hinh}</li>
                        <li>Kích thước: {sanpham.cau_hinh.kich_thuoc}</li>
                        <li>
                          Tương thích VESA: {sanpham.cau_hinh.tuong_thich_vesa}
                        </li>
                        <li>Cổng kết nối: {sanpham.cau_hinh.cong_ket_noi}</li>
                        <li>Tần số quét: {sanpham.cau_hinh.tan_so_quet}</li>
                        <li>Độ phân giải: {sanpham.cau_hinh.do_phan_giai}</li>
                        <li>Tấm nền: {sanpham.cau_hinh.tam_nen}</li>
                        <li>
                          Không gian màu: {sanpham.cau_hinh.khong_gian_mau}
                        </li>
                        <li>
                          Phụ kiện trong hộp:{" "}
                          {sanpham.cau_hinh.phu_kien_trong_hop || "N/A"}
                        </li>
                        <li>
                          Thời gian phản hồi:{" "}
                          {sanpham.cau_hinh.thoi_gian_phan_hoi}
                        </li>
                        <li>Độ sáng: {sanpham.cau_hinh.do_sang}</li>
                      </ul>
                    )}
                    {sanpham.id_danhmuc === 4 && (
                      <ul>
                        <li>Màu sắc: {sanpham.cau_hinh.mau_sac}</li>
                        <li>Kết nối: {sanpham.cau_hinh.ket_noi}</li>
                        <li>LED: {sanpham.cau_hinh.led}</li>
                        <li>Cảm biến: {sanpham.cau_hinh.cam_bien}</li>
                        <li>Số nút: {sanpham.cau_hinh.so_nut}</li>
                        <li>Tuổi thọ: {sanpham.cau_hinh.tuoi_tho}</li>
                        <li>DPI: {sanpham.cau_hinh.DPI}</li>
                        <li>IPS: {sanpham.cau_hinh.IPS}</li>
                        <li>Trọng lượng: {sanpham.cau_hinh.trong_luong}</li>
                      </ul>
                    )}
                    {sanpham.id_danhmuc === 5 && (
                      <ul>
                        <li>Kết nối: {sanpham.cau_hinh.ket_noi}</li>
                        <li>Switch: {sanpham.cau_hinh.switch}</li>
                        <li>Keycap: {sanpham.cau_hinh.keycap}</li>
                        <li>Tương thích: {sanpham.cau_hinh.tuong_thich}</li>
                        <li>Kích thước: {sanpham.cau_hinh.kich_thuoc}</li>
                        <li>Trọng lượng: {sanpham.cau_hinh.trong_luong}</li>
                      </ul>
                    )}
                    <p>&nbsp;</p>
                  </div>
                  <div className="baohanh_detail">
                    <strong>Bảo hành: </strong>12 tháng
                  </div>
                </div>

                <div
                  className="item_info_detail gia_detail"
                  itemProp="offers"
                  itemScope=""
                  itemType="http://schema.org/Offer"
                >
                  <strong>
                    Giá bán (đã bao gồm VAT):
                    <span itemProp="price">{sanpham.gia_sp}</span>
                    <span itemProp="priceCurrency" content="VND">
                      VNĐ
                    </span>
                  </strong>
                  <link
                    itemProp="availability"
                    href="http://schema.org/InStock"
                  />
                </div>
                <div className="item_info_detail">
                  <div className="addthis_inline_share_toolbox" />
                </div>
              </div>

              <div className="chucnang_detail">
                <div className="yentam">
                  <div
                    className="css-zamej5"
                    style={{
                      boxSizing: "border-box",
                      margin: "0px 0px 0.5rem",
                      padding: 0,
                      borderStyle: "none",
                      borderWidth: 1,
                      borderColor: "unset",
                      opacity: 1,
                      textDecorationLine: "unset",
                      fontSize: 15,
                      lineHeight: 2,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: "unset",
                      maxWidth: "unset",
                      minWidth: "unset",
                      transition: "color 0.3s ease 0s",
                      fontFamily: "Roboto, sans-serif",
                    }}
                    type="subtitle"
                  >
                    <strong>Chính sách bán hàng</strong>
                  </div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      fontFamily: "Roboto, sans-serif",
                      fontSize: 14,
                    }}
                  >
                    <div style={{ boxSizing: "border-box" }}>
                      <div
                        className="css-15eranj"
                        style={{
                          boxSizing: "border-box",
                          display: "flex",
                          WebkitBoxAlign: "center",
                          alignItems: "center",
                          marginBottom: 8,
                          gap: 12,
                        }}
                      >
                        <div
                          className="css-1a6hohg"
                          height={24}
                          style={{
                            boxSizing: "border-box",
                            position: "relative",
                            display: "inline-block",
                            overflow: "hidden",
                            height: 24,
                            width: 24,
                            minWidth: 24,
                          }}
                          width={24}
                        >
                          <img
                            alt="Công ty TNHH Phát Triển Tin Học Sáng Tạo"
                            decoding="async"
                            loading="lazy"
                            src="https://lh3.googleusercontent.com/uvWBg1q90XtEWvHkWGDbDemjEaANJ_kX3NEfIywURPTMeaSZTORdttpehuFBNKpYiWQ3jHgito4ciCt9pEJIHH1V4IlPYoE=rw"
                            style={{
                              boxSizing: "border-box",
                              verticalAlign: "middle",
                              width: 24,
                              height: 24,
                            }}
                          />
                        </div>
                        <div
                          className="att-policy-content-0 css-9yb8e7"
                          style={{ boxSizing: "border-box" }}
                        >
                          <p style={{ boxSizing: "border-box", margin: 0 }}>
                            Miễn phí giao hàng cho đơn hàng từ 1 triệu&nbsp;
                            <a
                              href="https://stcom.vn/tin-tuc/chinh-sach-giao-hang-86.html"
                              style={{
                                boxSizing: "border-box",
                                color: "rgb(13, 110, 253)",
                              }}
                            >
                              Xem chi tiết
                            </a>
                          </p>
                        </div>
                      </div>
                      <div
                        className="css-15eranj"
                        style={{
                          boxSizing: "border-box",
                          display: "flex",
                          WebkitBoxAlign: "center",
                          alignItems: "center",
                          marginBottom: 8,
                          gap: 12,
                        }}
                      >
                        <div
                          className="css-1a6hohg"
                          height={24}
                          style={{
                            boxSizing: "border-box",
                            position: "relative",
                            display: "inline-block",
                            overflow: "hidden",
                            height: 24,
                            width: 24,
                            minWidth: 24,
                          }}
                          width={24}
                        >
                          <img
                            alt="Công ty TNHH Phát Triển Tin Học Sáng Tạo"
                            decoding="async"
                            loading="lazy"
                            src="https://lh3.googleusercontent.com/LT3jrA76x0rGqq9TmqrwY09FgyZfy0sjMxbS4PLFwUekIrCA9GlLF6EkiFuKKL711tFBT7f2JaUgKT3--To8zOW4kHxPPHs4=rw"
                            style={{
                              boxSizing: "border-box",
                              verticalAlign: "middle",
                              width: 24,
                              height: 24,
                            }}
                          />
                        </div>
                        <div
                          className="att-policy-content-1 css-9yb8e7"
                          style={{ boxSizing: "border-box" }}
                        >
                          <p style={{ boxSizing: "border-box", margin: 0 }}>
                            Cam kết hàng chính hãng 100%&nbsp;
                          </p>
                        </div>
                      </div>
                      <div
                        className="css-15eranj"
                        style={{
                          boxSizing: "border-box",
                          display: "flex",
                          WebkitBoxAlign: "center",
                          alignItems: "center",
                          marginBottom: 8,
                          gap: 12,
                        }}
                      >
                        <div
                          className="css-1a6hohg"
                          height={24}
                          style={{
                            boxSizing: "border-box",
                            position: "relative",
                            display: "inline-block",
                            overflow: "hidden",
                            height: 24,
                            width: 24,
                            minWidth: 24,
                          }}
                          width={24}
                        >
                          <img
                            alt="Công ty TNHH Phát Triển Tin Học Sáng Tạo"
                            decoding="async"
                            loading="lazy"
                            src="https://lh3.googleusercontent.com/TECKlw8DFChVXu_FAYdNjbCuaDVhmOhbqsKLnayhIgx5Pvv0EX051qHWJR7vUgxiUXN5heAlx4bIDYsoES7X8pby5Pn9LXWN=rw"
                            style={{
                              boxSizing: "border-box",
                              verticalAlign: "middle",
                              width: 24,
                              height: 24,
                            }}
                          />
                        </div>
                        <div
                          className="att-policy-content-2 css-9yb8e7"
                          style={{ boxSizing: "border-box" }}
                        >
                          <p style={{ boxSizing: "border-box", margin: 0 }}>
                            Đổi trả trong vòng 07 ngày&nbsp;&nbsp;
                            <a
                              href="https://stcom.vn/tin-tuc/chinh-sach-doi-tra-88.html"
                              style={{
                                color: "rgb(13, 110, 253)",
                                boxSizing: "border-box",
                              }}
                            >
                              Xem chi tiết
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  href=""
                  className="themgiohang add_giohang"
                  rel={7385}
                  data-confirm=""
                  onClick="new jBox()"
                >
                  Thêm vào giỏ hàng
                </a>
                <a href="" className="muangay mua_giohang" rel={7385}>
                  Mua ngay
                </a>
                <div className="hotline_hotro">
                  <div className="title_hotline_hotro">Hỗ trợ mua hàng</div>
                  <div className="content_hotline_hotro">
                    <i className="call-num" />
                    <p>
                      0902 566 839
                      <br />
                      0903 359 388
                      <br />
                      0932 333 667
                      <br />
                    </p>
                    <div className="clear" />
                  </div>
                </div>
              </div>
              <div className="clear" />
            </div>
            <div className="bottom_detail">
              <div className="left_bottom_detail">
                <div className="contain_tab">
                  <a href="#thongsokythuat" className="item_tab active">
                    Thông số kỹ thuật
                  </a>

                  <div className="clear" />

                  <div id="thongsokythuat" className="content_tab active">
                    <div className="table-product-details">
                      <table
                        border={0}
                        cellPadding={0}
                        cellSpacing={0}
                        style={{
                          width: "867.5px",
                          borderCollapse: "collapse",
                          color: "rgb(34, 34, 34)",
                          fontFamily: "Roboto, sans-serif",
                          fontSize: 14,
                        }}
                      >
                        <tbody >
                        
                          {sanpham.id_danhmuc === 1 && (
                            <>
                              <tbody>
                                <tr>
                                  <td>CPU</td>
                                  <td>{sanpham.cau_hinh.cpu}</td>
                                </tr>
                                <tr>
                                  <td>RAM</td>
                                  <td>{sanpham.cau_hinh.ram}</td>
                                </tr>
                                <tr>
                                  <td>Ổ cứng</td>
                                  <td>{sanpham.cau_hinh.o_cung}</td>
                                </tr>
                                <tr>
                                  <td>VGA</td>
                                  <td>{sanpham.cau_hinh.vga}</td>
                                </tr>
                                <tr>
                                  <td>Màn hình</td>
                                  <td>{sanpham.cau_hinh.man_hinh}</td>
                                </tr>
                                <tr>
                                  <td>Pin</td>
                                  <td>{sanpham.cau_hinh_chi_tiet.pin}</td>
                                </tr>
                                <tr>
                                  <td>Màu sắc</td>
                                  <td>{sanpham.cau_hinh_chi_tiet.mau_sac}</td>
                                </tr>
                                <tr>
                                  <td>Trọng lượng</td>
                                  <td>
                                    {sanpham.cau_hinh_chi_tiet.trong_luong}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Hệ điều hành</td>
                                  <td>
                                    {sanpham.cau_hinh_chi_tiet.he_dieu_hanh}
                                  </td>
                                </tr>
                              </tbody>
                            </>
                          )}

                          {sanpham.id_danhmuc === 2 && (
                            <>
                              <tbody>
                                <tr>
                                  <td>Mainboard</td>
                                  <td>{sanpham.cau_hinh.mainboard}</td>
                                </tr>
                                <tr>
                                  <td>HDD</td>
                                  <td>{sanpham.cau_hinh.hdd}</td>
                                </tr>
                                <tr>
                                  <td>SSD</td>
                                  <td>{sanpham.cau_hinh.ssd}</td>
                                </tr>
                                <tr>
                                  <td>PSU</td>
                                  <td>{sanpham.cau_hinh.psu}</td>
                                </tr>
                                <tr>
                                  <td>Case</td>
                                  <td>{sanpham.cau_hinh.case}</td>
                                </tr>
                                <tr>
                                  <td>Cooling</td>
                                  <td>{sanpham.cau_hinh.cooling}</td>
                                </tr>
                              </tbody>
                            </>
                          )}

                          {sanpham.id_danhmuc === 3 && (
                            <>
                              <tbody>
                                <tr>
                                  <td>Kiểu màn hình</td>
                                  <td>{sanpham.cau_hinh.kieu_man_hinh}</td>
                                </tr>
                                <tr>
                                  <td>Kích thước</td>
                                  <td>{sanpham.cau_hinh.kich_thuoc}</td>
                                </tr>
                                <tr>
                                  <td>Tương thích VESA</td>
                                  <td>{sanpham.cau_hinh.tuong_thich_vesa}</td>
                                </tr>
                                <tr>
                                  <td>Cổng kết nối</td>
                                  <td>{sanpham.cau_hinh.cong_ket_noi}</td>
                                </tr>
                                <tr>
                                  <td>Tần số quét</td>
                                  <td>{sanpham.cau_hinh.tan_so_quet}</td>
                                </tr>
                                <tr>
                                  <td>Độ phân giải</td>
                                  <td>{sanpham.cau_hinh.do_phan_giai}</td>
                                </tr>
                                <tr>
                                  <td>Tấm nền</td>
                                  <td>{sanpham.cau_hinh.tam_nen}</td>
                                </tr>
                                <tr>
                                  <td>Không gian màu</td>
                                  <td>{sanpham.cau_hinh.khong_gian_mau}</td>
                                </tr>
                                <tr>
                                  <td>Phụ kiện trong hộp</td>
                                  <td>
                                    {sanpham.cau_hinh.phu_kien_trong_hop ||
                                      "N/A"}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Thời gian phản hồi</td>
                                  <td>{sanpham.cau_hinh.thoi_gian_phan_hoi}</td>
                                </tr>
                                <tr>
                                  <td>Độ sáng</td>
                                  <td>{sanpham.cau_hinh.do_sang}</td>
                                </tr>
                              </tbody>
                            </>
                          )}

                          {sanpham.id_danhmuc === 4 && (
                            <>
                             
                              <tbody>
                                <tr>
                                  <td>Màu sắc</td>
                                  <td>{sanpham.cau_hinh.mau_sac}</td>
                                </tr>
                                <tr>
                                  <td>Kết nối</td>
                                  <td>{sanpham.cau_hinh.ket_noi}</td>
                                </tr>
                                <tr>
                                  <td>LED</td>
                                  <td>{sanpham.cau_hinh.led}</td>
                                </tr>
                                <tr>
                                  <td>Cảm biến</td>
                                  <td>{sanpham.cau_hinh.cam_bien}</td>
                                </tr>
                                <tr>
                                  <td>Số nút</td>
                                  <td>{sanpham.cau_hinh.so_nut}</td>
                                </tr>
                                <tr>
                                  <td>Tuổi thọ</td>
                                  <td>{sanpham.cau_hinh.tuoi_tho}</td>
                                </tr>
                                <tr>
                                  <td>DPI</td>
                                  <td>{sanpham.cau_hinh.DPI}</td>
                                </tr>
                                <tr>
                                  <td>IPS</td>
                                  <td>{sanpham.cau_hinh.IPS}</td>
                                </tr>
                                <tr>
                                  <td>Trọng lượng</td>
                                  <td>{sanpham.cau_hinh.trong_luong}</td>
                                </tr>
                              </tbody>
                            </>
                          )}

                          {sanpham.id_danhmuc === 5 && (
                            <>
                             
                              <tbody>
                                <tr>
                                  <td>Kết nối</td>
                                  <td>{sanpham.cau_hinh.ket_noi}</td>
                                </tr>
                                <tr>
                                  <td>Switch</td>
                                  <td>{sanpham.cau_hinh.switch}</td>
                                </tr>
                                <tr>
                                  <td>Keycap</td>
                                  <td>{sanpham.cau_hinh.keycap}</td>
                                </tr>
                                <tr>
                                  <td>Tương thích</td>
                                  <td>{sanpham.cau_hinh.tuong_thich}</td>
                                </tr>
                                <tr>
                                  <td>Kích thước</td>
                                  <td>{sanpham.cau_hinh.kich_thuoc}</td>
                                </tr>
                                <tr>
                                  <td>Trọng lượng</td>
                                  <td>{sanpham.cau_hinh.trong_luong}</td>
                                </tr>
                              </tbody>
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="clear" />
                  <div id="dacdiemnoibat" className="content_tab active">
                    <div className="text" />
                  </div>
                  <a href="#binhluan" className="item_tab active">
                    Bình luận/ Đánh giá sản phẩm
                  </a>
                  <div className="clear" />
                  <div id="binhluan" className="content_tab active">
                    <div className="text">
                      <div
                        className="fb-comments fb_iframe_widget fb_iframe_widget_fluid_desktop"
                        data-href="https://stcom.vn:443/san-pham/laptop-dell-vostro-3530-v5i3465w1-7385.html"
                        data-width="100%"
                        data-numposts={5}
                        style={{ width: "100%" }}
                      >
                        <span
                          style={{
                            verticalAlign: "bottom",
                            width: "100%",
                            height: 200,
                          }}
                        >
                          <iframe
                            name="fe1d4687f64639425"
                            width="1000px"
                            height="100px"
                            data-testid="fb:comments Facebook Social Plugin"
                            title="fb:comments Facebook Social Plugin"
                            frameBorder={0}
                            allowFullScreen="true"
                            scrolling="no"
                            allow="encrypted-media"
                            src="https://www.facebook.com/v2.3/plugins/comments.php?app_id=&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Dfb9e7435f723694fe%26domain%3Dstcom.vn%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fstcom.vn%252Ff791dce3dcce20b43%26relation%3Dparent.parent&container_width=868&height=100&href=https%3A%2F%2Fstcom.vn%2Fsan-pham%2Flaptop-dell-vostro-3530-v5i3465w1-7385.html&locale=vi_VN&numposts=5&sdk=joey&version=v2.3&width="
                            style={{
                              border: "none",
                              visibility: "visible",
                              width: "100%",
                              height: 200,
                            }}
                            className=""
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="clear" />
                </div>
              </div>
              <div className="right_bottom_detail">
                <div className="title_right">Sản phẩm liên quan</div>
                <div className="content_right">
                  <div className="item_sanpham">
                    <div className="img_sp">
                      <a
                        href="san-pham/laptop-dell-inspiron-3530-n5i7240w1-9346.html"
                        title="Laptop Dell Inspiron 3530 N5i7240W1"
                      >
                        <img
                          src="img/Laptop Dell Inspiron 3530 N5i7240W1.jpg"
                          alt="Laptop Dell Inspiron 3530 N5i7240W1"
                          className="mw100 trans03"
                        />
                      </a>
                    </div>
                    <div className="nd_sp">
                      <h2>
                        <a
                          href="san-pham/laptop-dell-inspiron-3530-n5i7240w1-9346.html"
                          title="Laptop Dell Inspiron 3530 N5i7240W1"
                        >
                          Laptop Dell Inspiron 3530 N5i7240W1
                        </a>
                      </h2>
                      <div className="gia_sp">
                        <span>19,890,000 VNĐ</span>
                      </div>
                    </div>
                    <div className="clear" />
                  </div>
                  
                </div>
              </div>
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
                            title={sanpham.ten_sp}
                          >
                            <img
                              src={`/img/sanpham/Laptop/${sanpham.hinh_anh.phu1}`}
                              alt={sanpham.ten_sp}
                              className="w100 trans03"
                            />
                          </a>
                          <div className="btntragop1" />
                          <div className="hot-icon blink" />
                          <div className="desc-product">
                            <div>
                              {/* <ul>
                                <li>{sanpham.cau_hinh.cpu}</li>
                                <li>{sanpham.cau_hinh.ram}</li>
                                <li>{sanpham.cau_hinh.ocung}</li>
                                <li>{sanpham.cau_hinh.vga}</li>
                                <li>{sanpham.cau_hinh.man_hinh}</li>
                                <li>{sanpham.cau_hinh_chi_tiet.pin}</li>
                                <li>{sanpham.cau_hinh_chi_tiet.mau_sac}</li>
                                <li>{sanpham.cau_hinh_chi_tiet.trong_luong}</li>
                                <li>
                                  {sanpham.cau_hinh_chi_tiet.he_dieu_hanh}
                                </li>
                              </ul> */}
                              <p>&nbsp;</p>
                              <div className="baohanh">Bảo hành: 12 tháng</div>
                            </div>
                          </div>
                        </div>
                        <div className="info-product">
                          <a
                            className="name-product text-split"
                            href="san-pham/laptop-dell-vostro-3530-v5i3465w1-7385.html"
                            title={`${sanpham.ten_sp}`}
                          >
                            {sanpham.ten_sp}
                          </a>
                          <div className="price-product">
                            <span className="price-new">
                              {" "}
                              {sanpham.gia_sp} đ
                            </span>
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
      {/* chitietsanpham-container */}
    </>
  );
}
