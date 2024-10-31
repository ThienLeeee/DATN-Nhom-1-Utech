import { useEffect, useState } from "react";
import { fetchSanphamIddm } from "../../../service/sanphamService";
import { useParams } from "react-router-dom";

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
                        src={`/img/sanpham/Laptop/${sanpham.hinh_anh.chinh}`}
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
                          src={`/img/sanpham/Laptop/${sanpham.hinh_anh.chinh}`}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: 378,
                            height: 330,
                            transform: "translate(-12px, -77px)",
                          }}
                          alt="Công ty TNHH Phát Triển Tin Học Utech"
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
                                href={`/img/sanpham/Laptop/${sanpham.hinh_anh.phu1}`}
                                rel="zoom-id: Zoomer"
                                className="mz-thumb-selected mz-thumb"
                              >
                                <img
                                  src={`/img/sanpham/Laptop/${sanpham.hinh_anh.phu1}`}
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
                                href={`/img/sanpham/Laptop/${sanpham.hinh_anh.phu2}`}
                                rel="zoom-id: Zoomer"
                                className="mz-thumb"
                              >
                                <img
                                  src={`/img/sanpham/Laptop/${sanpham.hinh_anh.phu2}`}
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
                                href={`/img/sanpham/Laptop/${sanpham.hinh_anh.phu3}`}
                                rel="zoom-id: Zoomer"
                                className="mz-thumb"
                              >
                                <img
                                  src={`/img/sanpham/Laptop/${sanpham.hinh_anh.phu3}`}
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
                                href={`/img/sanpham/Laptop/${sanpham.hinh_anh.phu4}`}
                                rel="zoom-id: Zoomer"
                                className="mz-thumb"
                              >
                                <img
                                  src={`/img/sanpham/Laptop/${sanpham.hinh_anh.phu4}`}
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
                                href={`/img/sanpham/Laptop/${sanpham.hinh_anh.phu5}`}
                                rel="zoom-id: Zoomer"
                                className="mz-thumb"
                              >
                                <img
                                  src={`/img/sanpham/Laptop/${sanpham.hinh_anh.phu5}`}
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
                    <ul>
                      <li>{sanpham.cau_hinh.cpu}</li>
                      <li>{sanpham.cau_hinh.ram}</li>
                      <li>{sanpham.cau_hinh.o_cung}</li>
                      <li>{sanpham.cau_hinh.vga}</li>
                      <li>{sanpham.cau_hinh.man_hinh}</li>
                      <li>{sanpham.cau_hinh_chi_tiet.pin}</li>
                      <li>{sanpham.cau_hinh_chi_tiet.mau_sac}</li>
                      <li>{sanpham.cau_hinh_chi_tiet.trong_luong}</li>
                      <li>{sanpham.cau_hinh_chi_tiet.he_dieu_hanh}</li>
                    </ul>
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
                    <div className="text">
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
                        <tbody style={{ boxSizing: "border-box" }}>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              colSpan={2}
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                background: "rgb(211, 223, 238)",
                                height: 17,
                                width: 541,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <strong
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span
                                    style={{
                                      boxSizing: "border-box",
                                      padding: 0,
                                      marginTop: 0,
                                    }}
                                  >
                                    <span style={{ color: "#335a89" }}>
                                      Bộ vi xử lý (CPU)
                                    </span>
                                  </span>
                                </strong>
                                &nbsp;
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                width: 318,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Tên bộ vi xử lý
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                  marginRight: "-5.4pt",
                                }}
                              >
                                Intel
                                <sup style={{ boxSizing: "border-box" }}>®</sup>
                                &nbsp;Core™&nbsp;
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#ff0000" }}>
                                    <strong
                                      style={{
                                        boxSizing: "border-box",
                                        padding: 0,
                                        marginTop: 0,
                                      }}
                                    >
                                      i3-1305U&nbsp;
                                    </strong>
                                  </span>
                                </span>
                                Processor
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                width: 318,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                Tốc độ, số nhân số luồng
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                  marginBottom: "0in",
                                }}
                              >
                                Up to 4.50GHz, 5 Cores, 6 Threads
                                <br style={{ boxSizing: "border-box" }} />
                                P-Cores: 1 Cores, 2 Threads, 1.60GHz Base,
                                4.50GHz Turbo
                                <br style={{ boxSizing: "border-box" }} />
                                E-Cores: 4 Cores, 4 Threads, 1.30GHz Base,
                                3.30GHz Turbo
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                width: 318,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Bộ nhớ đệm
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                L1: 80K, L2: 1280K, L3: 10MB
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              colSpan={2}
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                background: "rgb(211, 223, 238)",
                                height: 17,
                                width: 541,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <strong
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span
                                    style={{
                                      boxSizing: "border-box",
                                      padding: 0,
                                      marginTop: 0,
                                    }}
                                  >
                                    <span style={{ color: "#335a89" }}>
                                      Bộ nhớ trong (
                                      <a
                                        href="https://www.ankhang.vn/ram-laptop_dm15.html"
                                        style={{
                                          boxSizing: "border-box",
                                          color: "rgb(34, 34, 34)",
                                          textDecorationLine: "none",
                                          transition: "all 0.4s ease 0s",
                                        }}
                                        target="_blank"
                                        title="Ram laptop, ram 4GB  DDr3, Ram notebook"
                                      >
                                        <span
                                          style={{
                                            boxSizing: "border-box",
                                            padding: 0,
                                            marginTop: 0,
                                          }}
                                        >
                                          <span style={{ color: "#335a89" }}>
                                            RAM Laptop
                                          </span>
                                        </span>
                                      </a>
                                      )
                                    </span>
                                  </span>
                                </strong>
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Dung lượng
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <div
                                  style={{
                                    boxSizing: "border-box",
                                    lineHeight: 3,
                                  }}
                                >
                                  <span
                                    style={{
                                      boxSizing: "border-box",
                                      padding: 0,
                                      marginTop: 0,
                                    }}
                                  >
                                    <span style={{ color: "#ff0000" }}>
                                      <strong
                                        style={{
                                          boxSizing: "border-box",
                                          padding: 0,
                                          marginTop: 0,
                                        }}
                                      >
                                        8GB DDR4
                                      </strong>
                                    </span>
                                  </span>
                                  &nbsp;2666MHz (1x8GB)
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Số khe cắm
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                  marginBottom: "0in",
                                }}
                              >
                                2&nbsp;x&nbsp;DDR4 2666MHz Slots &lt;Đã sử dụng
                                1&gt;
                                <br style={{ boxSizing: "border-box" }} />
                                Max 64GB
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              colSpan={2}
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                background: "rgb(211, 223, 238)",
                                height: 17,
                                width: 541,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <strong
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span
                                    style={{
                                      boxSizing: "border-box",
                                      padding: 0,
                                      marginTop: 0,
                                    }}
                                  >
                                    <span style={{ color: "#335a89" }}>
                                      Dung lượng lưu trữ&nbsp;(
                                      <a
                                        href="https://www.ankhang.vn/o-cung-laptop-ssd.html"
                                        style={{
                                          boxSizing: "border-box",
                                          color: "rgb(34, 34, 34)",
                                          textDecorationLine: "none",
                                          transition: "all 0.4s ease 0s",
                                        }}
                                        target="_blank"
                                        title="O cung laptop, HDD laptop, ổ cứng laptop"
                                      >
                                        <span
                                          style={{
                                            boxSizing: "border-box",
                                            padding: 0,
                                            marginTop: 0,
                                          }}
                                        >
                                          <span style={{ color: "#335a89" }}>
                                            SSD Laptop
                                          </span>
                                        </span>
                                      </a>
                                      )
                                    </span>
                                  </span>
                                </strong>
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Dung lượng
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#ff0000" }}>
                                    <strong
                                      style={{
                                        boxSizing: "border-box",
                                        padding: 0,
                                        marginTop: 0,
                                      }}
                                    >
                                      256GB SSD
                                    </strong>
                                  </span>
                                </span>
                                &nbsp;M.2 PCIe NVMe
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Tốc độ vòng quay
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                &nbsp;
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Khả năng lưu trữ
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                1 x M.2 2230/2280 slot for solid-state
                                drive&nbsp;&lt;Đã sử dụng, có thể nhấc ra thay
                                thế&gt;
                                <br style={{ boxSizing: "border-box" }} />
                                No HDD
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              colSpan={2}
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                background: "rgb(211, 223, 238)",
                                height: 17,
                                width: 541,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <strong
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span
                                    style={{
                                      boxSizing: "border-box",
                                      padding: 0,
                                      marginTop: 0,
                                    }}
                                  >
                                    <span style={{ color: "#335a89" }}>
                                      Ổ đĩa quang (ODD)
                                    </span>
                                  </span>
                                </strong>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                &nbsp;
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                None&nbsp;
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              colSpan={2}
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                background: "rgb(211, 223, 238)",
                                height: 17,
                                width: 541,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <strong
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span
                                    style={{
                                      boxSizing: "border-box",
                                      padding: 0,
                                      marginTop: 0,
                                    }}
                                  >
                                    <span style={{ color: "#335a89" }}>
                                      Hiển thị
                                    </span>
                                  </span>
                                </strong>
                                <strong
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span
                                    style={{
                                      boxSizing: "border-box",
                                      padding: 0,
                                      marginTop: 0,
                                    }}
                                  >
                                    <span style={{ color: "#2a4592" }}>
                                      &nbsp;(
                                      <span
                                        style={{
                                          boxSizing: "border-box",
                                          padding: 0,
                                          marginTop: 0,
                                        }}
                                      >
                                        Màn hình Laptop
                                      </span>
                                    </span>
                                  </span>
                                </strong>
                                <strong
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span
                                    style={{
                                      boxSizing: "border-box",
                                      padding: 0,
                                      marginTop: 0,
                                    }}
                                  >
                                    <span style={{ color: "#335a89" }}>)</span>
                                  </span>
                                </strong>
                                &nbsp;
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Màn hình
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#ff0000" }}>
                                    <strong
                                      style={{
                                        boxSizing: "border-box",
                                        padding: 0,
                                        marginTop: 0,
                                      }}
                                    >
                                      14.0Inch FHD&nbsp;WVA&nbsp;
                                    </strong>
                                  </span>
                                </span>
                                Anti-Glare LED Backlit Narrow
                                Border&nbsp;Non-Touch
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Độ phân giải
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                FHD (1920 x 1080)
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              colSpan={2}
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                background: "rgb(211, 223, 238)",
                                height: 17,
                                width: 541,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <strong
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span
                                    style={{
                                      boxSizing: "border-box",
                                      padding: 0,
                                      marginTop: 0,
                                    }}
                                  >
                                    <span style={{ color: "#335a89" }}>
                                      Đồ Họa (VGA)
                                    </span>
                                  </span>
                                </strong>
                                &nbsp;
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Bộ xử lý
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <strong
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span
                                    style={{
                                      boxSizing: "border-box",
                                      padding: 0,
                                      marginTop: 0,
                                    }}
                                  >
                                    <span style={{ color: "#ff0000" }}>
                                      Intel
                                      <sup style={{ boxSizing: "border-box" }}>
                                        ®
                                      </sup>
                                      &nbsp;UHD Graphics
                                    </span>
                                  </span>
                                </strong>
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Công nghệ
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                &nbsp;
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              colSpan={2}
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                background: "rgb(211, 223, 238)",
                                height: 17,
                                width: 541,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <strong
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span
                                    style={{
                                      boxSizing: "border-box",
                                      padding: 0,
                                      marginTop: 0,
                                    }}
                                  >
                                    <span style={{ color: "#335a89" }}>
                                      Kết nối (Network)
                                    </span>
                                  </span>
                                </strong>
                                &nbsp;
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Wireless
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                WiFi&nbsp;802.11ac 1x1
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>Lan</span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                  marginBottom: "0in",
                                }}
                              >
                                1 x RJ45 Ethernet port
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Bluetooth
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                Bluetooth 5.0
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    3G/ Wimax (4G)
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                &nbsp;
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              colSpan={2}
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                color: "rgb(51, 90, 137)",
                                background: "rgb(211, 223, 238)",
                                height: 17,
                                width: 541,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <strong
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <a
                                    href="https://www.ankhang.vn/ban-phim-rieng.html"
                                    style={{
                                      boxSizing: "border-box",
                                      color: "rgb(34, 34, 34)",
                                      textDecorationLine: "none",
                                      transition: "all 0.4s ease 0s",
                                    }}
                                    target="_blank"
                                  >
                                    <span
                                      style={{
                                        boxSizing: "border-box",
                                        padding: 0,
                                        marginTop: 0,
                                      }}
                                    >
                                      <span style={{ color: "#335a89" }}>
                                        Bàn Phím Laptop
                                      </span>
                                    </span>
                                  </a>
                                </strong>
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Kiểu bàn phím
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                Carbon Black English International
                                Keyboard&nbsp;(Không led phím, k bàn phím phụ)
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              colSpan={2}
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                background: "rgb(211, 223, 238)",
                                height: 17,
                                width: 541,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <strong
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span
                                    style={{
                                      boxSizing: "border-box",
                                      padding: 0,
                                      marginTop: 0,
                                    }}
                                  >
                                    <span style={{ color: "#335a89" }}>
                                      Mouse (
                                      <a
                                        href="https://www.ankhang.vn/chuot-rieng.html"
                                        style={{
                                          boxSizing: "border-box",
                                          color: "rgb(34, 34, 34)",
                                          textDecorationLine: "none",
                                          transition: "all 0.4s ease 0s",
                                        }}
                                        target="_blank"
                                      >
                                        <span
                                          style={{
                                            boxSizing: "border-box",
                                            padding: 0,
                                            marginTop: 0,
                                          }}
                                        >
                                          <span style={{ color: "#335a89" }}>
                                            Chuột Laptop
                                          </span>
                                        </span>
                                      </a>
                                    </span>
                                  </span>
                                </strong>
                                <strong
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span
                                    style={{
                                      boxSizing: "border-box",
                                      padding: 0,
                                      marginTop: 0,
                                    }}
                                  >
                                    <span style={{ color: "#335a89" }}>)</span>
                                  </span>
                                </strong>
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                &nbsp;
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                Cảm ứng đa điểm
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              colSpan={2}
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                background: "rgb(211, 223, 238)",
                                height: 17,
                                width: 541,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <strong
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span
                                    style={{
                                      boxSizing: "border-box",
                                      padding: 0,
                                      marginTop: 0,
                                    }}
                                  >
                                    <span style={{ color: "#335a89" }}>
                                      Giao tiếp mở rộng
                                    </span>
                                  </span>
                                </strong>
                                &nbsp;
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Kết nối USB
                                  </span>
                                </span>
                              </div>
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                &nbsp;
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                1 x USB 3.2 Gen 1 port
                                <br style={{ boxSizing: "border-box" }} />
                                1 x USB 2.0 port
                                <br style={{ boxSizing: "border-box" }} />1 x
                                USB 3.2 Gen 1 Type-C
                                <sup style={{ boxSizing: "border-box" }}>®</sup>
                                &nbsp;port&nbsp;
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#ffff00" }}></span>
                                </span>
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Kết nối HDMI/ VGA
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                1 x HDMI 1.4 port
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Khe cắm thẻ nhớ
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                1 x SD-card slot
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Tai nghe
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                1 x Universal audio port
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Camera&nbsp;
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                720p at 30 fps HD RGB camera, single integrated
                                microphone&nbsp;
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#ffff00" }}></span>
                                </span>
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Audio and Speakers
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                Stereo speakers, 2W x 2 = 4W total
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              colSpan={2}
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                background: "rgb(211, 223, 238)",
                                height: 17,
                                width: 541,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#335a89" }}>
                                    <strong
                                      style={{
                                        boxSizing: "border-box",
                                        padding: 0,
                                        marginTop: 0,
                                      }}
                                    >
                                      Pin Laptop
                                    </strong>
                                  </span>
                                </span>
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Dung lượng pin
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <strong
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  3Cell 41WHrs
                                </strong>
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Thời gian sử dụng
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                &nbsp;
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              colSpan={2}
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                background: "rgb(211, 223, 238)",
                                height: 17,
                                width: 541,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <strong
                                    style={{
                                      boxSizing: "border-box",
                                      padding: 0,
                                      marginTop: 0,
                                    }}
                                  >
                                    <span
                                      style={{
                                        boxSizing: "border-box",
                                        padding: 0,
                                        marginTop: 0,
                                      }}
                                    >
                                      <span style={{ color: "#335a89" }}>
                                        Sạc Pin Laptop
                                      </span>
                                    </span>
                                  </strong>
                                </span>
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                &nbsp;
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                Đi kèm
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              colSpan={2}
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                background: "rgb(211, 223, 238)",
                                height: 17,
                                width: 541,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <strong
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span
                                    style={{
                                      boxSizing: "border-box",
                                      padding: 0,
                                      marginTop: 0,
                                    }}
                                  >
                                    <span style={{ color: "#335a89" }}>
                                      Hệ điều hành (Operating System)
                                    </span>
                                  </span>
                                </strong>
                                &nbsp;
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Hệ điều hành đi kèm
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#ff0000" }}>
                                    <strong
                                      style={{
                                        boxSizing: "border-box",
                                        padding: 0,
                                        marginTop: 0,
                                      }}
                                    >
                                      Ubuntu
                                    </strong>
                                  </span>
                                </span>
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 213,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Hệ điều hành tương thích
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                height: 17,
                                width: 328,
                                verticalAlign: "bottom",
                              }}
                            >
                              <div
                                style={{
                                  boxSizing: "border-box",
                                  lineHeight: 3,
                                }}
                              >
                                Windows&nbsp;11
                              </div>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              colSpan={2}
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                width: 541,
                                background: "rgb(211, 223, 238)",
                                height: 17,
                                verticalAlign: "bottom",
                              }}
                            >
                              <p
                                style={{
                                  boxSizing: "border-box",
                                  padding: 0,
                                  lineHeight: 3,
                                }}
                              >
                                <strong
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span
                                    style={{
                                      boxSizing: "border-box",
                                      padding: 0,
                                      marginTop: 0,
                                    }}
                                  >
                                    <span style={{ color: "#335a89" }}>
                                      Thông tin khác
                                    </span>
                                  </span>
                                </strong>
                              </p>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                width: 213,
                                height: 17,
                                verticalAlign: "bottom",
                              }}
                            >
                              <p
                                style={{
                                  boxSizing: "border-box",
                                  padding: 0,
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Trọng Lượng
                                  </span>
                                </span>
                              </p>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                width: 328,
                                height: 17,
                                verticalAlign: "bottom",
                              }}
                            >
                              <p
                                style={{
                                  boxSizing: "border-box",
                                  padding: 0,
                                  lineHeight: 3,
                                }}
                              >
                                1,46 kg
                              </p>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                width: 213,
                                height: 17,
                                verticalAlign: "bottom",
                              }}
                            >
                              <p
                                style={{
                                  boxSizing: "border-box",
                                  padding: 0,
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Màu sắc
                                  </span>
                                </span>
                              </p>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                width: 328,
                                height: 17,
                                verticalAlign: "bottom",
                              }}
                            >
                              <p
                                style={{
                                  boxSizing: "border-box",
                                  padding: 0,
                                  lineHeight: 3,
                                }}
                              >
                                Titan Grey&nbsp;(Xám)
                              </p>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                width: 213,
                                height: 17,
                                verticalAlign: "bottom",
                              }}
                            >
                              <p
                                style={{
                                  boxSizing: "border-box",
                                  padding: 0,
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    <span
                                      style={{
                                        boxSizing: "border-box",
                                        padding: 0,
                                        marginTop: 0,
                                      }}
                                    >
                                      Thiết kế
                                    </span>
                                  </span>
                                </span>
                              </p>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                width: 328,
                                height: 17,
                                verticalAlign: "bottom",
                              }}
                            >
                              <p
                                style={{
                                  boxSizing: "border-box",
                                  padding: 0,
                                  lineHeight: 3,
                                }}
                              >
                                1. Chiều cao: 18,62 mm – 19,48 mm (0,73 inch –
                                0,77 inch)
                                <br style={{ boxSizing: "border-box" }} />
                                2. Chiều rộng: 323,67 mm (12,74 inch)
                                <br style={{ boxSizing: "border-box" }} />
                                3. Chiều sâu: 220,26 mm (8,67 inch)
                              </p>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                width: 213,
                                height: 17,
                                verticalAlign: "bottom",
                              }}
                            >
                              <p
                                style={{
                                  boxSizing: "border-box",
                                  padding: 0,
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Chất liệu vỏ
                                  </span>
                                </span>
                              </p>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                width: 328,
                                height: 17,
                                verticalAlign: "bottom",
                              }}
                            >
                              <p
                                style={{
                                  boxSizing: "border-box",
                                  padding: 0,
                                  lineHeight: 3,
                                }}
                              >
                                Nhựa (mặt A, C, D)
                              </p>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                width: 213,
                                height: 17,
                                verticalAlign: "bottom",
                              }}
                            >
                              <p
                                style={{
                                  boxSizing: "border-box",
                                  padding: 0,
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Bảo mật
                                  </span>
                                </span>
                              </p>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                width: 328,
                                height: 17,
                                verticalAlign: "bottom",
                              }}
                            >
                              <p
                                style={{
                                  boxSizing: "border-box",
                                  padding: 0,
                                  lineHeight: 3,
                                }}
                              >
                                Mật khẩu
                              </p>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                width: 213,
                                height: 17,
                                verticalAlign: "bottom",
                              }}
                            >
                              <p
                                style={{
                                  boxSizing: "border-box",
                                  padding: 0,
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    <span
                                      style={{
                                        boxSizing: "border-box",
                                        padding: 0,
                                        marginTop: 0,
                                      }}
                                    >
                                      Phụ kiện đi kèm
                                    </span>
                                  </span>
                                </span>
                              </p>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                width: 328,
                                height: 17,
                                verticalAlign: "bottom",
                              }}
                            >
                              <p
                                style={{
                                  boxSizing: "border-box",
                                  padding: 0,
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    65W AC Adapter, tài liệu, sách
                                  </span>
                                </span>
                              </p>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box", height: 17 }}>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                width: 213,
                                height: 17,
                                verticalAlign: "bottom",
                              }}
                            >
                              <p
                                style={{
                                  boxSizing: "border-box",
                                  padding: 0,
                                  lineHeight: 3,
                                }}
                              >
                                <span
                                  style={{
                                    boxSizing: "border-box",
                                    padding: 0,
                                    marginTop: 0,
                                  }}
                                >
                                  <span style={{ color: "#000000" }}>
                                    Xuất xứ
                                  </span>
                                </span>
                              </p>
                            </td>
                            <td
                              style={{
                                boxSizing: "border-box",
                                border: "1px solid rgb(204, 204, 204)",
                                padding: "0in 5.4pt",
                                width: 328,
                                height: 17,
                                verticalAlign: "bottom",
                              }}
                            >
                              <p
                                style={{
                                  boxSizing: "border-box",
                                  padding: 0,
                                  lineHeight: 3,
                                }}
                              >
                                China (H+K)
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <a href="#dacdiemnoibat" className="item_tab active">
                    Đặc điểm nổi bật
                  </a>
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
                  <div className="item_sanpham">
                    <div className="img_sp">
                      <a
                        href="san-pham/laptop-dell-inspiron-3530-71043887-9345.html"
                        title="Laptop Dell Inspiron 3530 71043887"
                      >
                        <img
                          src="img/Laptop Dell Inspiron 3530 71043887.jpg"
                          alt="Laptop Dell Inspiron 3530 71043887"
                          className="mw100 trans03"
                        />
                      </a>
                    </div>
                    <div className="nd_sp">
                      <h2>
                        <a
                          href="san-pham/laptop-dell-inspiron-3530-71043887-9345.html"
                          title="Laptop Dell Inspiron 3530 71043887"
                        >
                          Laptop Dell Inspiron 3530 71043887
                        </a>
                      </h2>
                      <div className="gia_sp">
                        <span>15,990,000 VNĐ</span>
                      </div>
                    </div>
                    <div className="clear" />
                  </div>
                  <div className="item_sanpham">
                    <div className="img_sp">
                      <a
                        href="san-pham/laptop-dell-inspiron-3530-71043885-9344.html"
                        title="Laptop Dell Inspiron 3530 71043885"
                      >
                        <img
                          src="img/Laptop Dell Inspiron 3530 71043887.jpg"
                          alt="Laptop Dell Inspiron 3530 71043885"
                          className="mw100 trans03"
                        />
                      </a>
                    </div>
                    <div className="nd_sp">
                      <h2>
                        <a
                          href="san-pham/laptop-dell-inspiron-3530-71043885-9344.html"
                          title="Laptop Dell Inspiron 3530 71043885"
                        >
                          Laptop Dell Inspiron 3530 71043885
                        </a>
                      </h2>
                      <div className="gia_sp">
                        <span>17,290,000 VNĐ</span>
                      </div>
                    </div>
                    <div className="clear" />
                  </div>
                  <div className="item_sanpham">
                    <div className="img_sp">
                      <a
                        href="san-pham/laptop-asus-expertbook-b1-b1402cvank0246-9303.html"
                        title="Laptop Asus ExpertBook B1 B1402CVA-NK0246"
                      >
                        <img
                          src="img/Laptop Dell Inspiron 3530 71043885.jpg"
                          alt="Laptop Asus ExpertBook B1 B1402CVA-NK0246"
                          className="mw100 trans03"
                        />
                      </a>
                    </div>
                    <div className="nd_sp">
                      <h2>
                        <a
                          href="san-pham/laptop-asus-expertbook-b1-b1402cvank0246-9303.html"
                          title="Laptop Asus ExpertBook B1 B1402CVA-NK0246"
                        >
                          Laptop Asus ExpertBook B1 B1402CVA-NK0246
                        </a>
                      </h2>
                      <div className="gia_sp">
                        <span>13,190,000 VNĐ</span>
                      </div>
                    </div>
                    <div className="clear" />
                  </div>
                  <div className="item_sanpham">
                    <div className="img_sp">
                      <a
                        href="san-pham/laptop-asus-expertbook-b1-b1402cvank0952w-9302.html"
                        title="Laptop Asus ExpertBook B1 B1402CVA-NK0952W"
                      >
                        <img
                          src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                          alt="Laptop Asus ExpertBook B1 B1402CVA-NK0952W"
                          className="mw100 trans03"
                        />
                      </a>
                    </div>
                    <div className="nd_sp">
                      <h2>
                        <a
                          href="san-pham/laptop-asus-expertbook-b1-b1402cvank0952w-9302.html"
                          title="Laptop Asus ExpertBook B1 B1402CVA-NK0952W"
                        >
                          Laptop Asus ExpertBook B1 B1402CVA-NK0952W
                        </a>
                      </h2>
                      <div className="gia_sp">
                        <span>13,850,000 VNĐ</span>
                      </div>
                    </div>
                    <div className="clear" />
                  </div>
                  <div className="item_sanpham">
                    <div className="img_sp">
                      <a
                        href="san-pham/laptop-hp-elitebook-640-g11-a7lg9pt-9301.html"
                        title="Laptop HP Elitebook 640 G11 A7LG9PT"
                      >
                        <img
                          src="img/Laptop Dell Inspiron 3530 71043887.jpg"
                          alt="Laptop HP Elitebook 640 G11 A7LG9PT"
                          className="mw100 trans03"
                        />
                      </a>
                    </div>
                    <div className="nd_sp">
                      <h2>
                        <a
                          href="san-pham/laptop-hp-elitebook-640-g11-a7lg9pt-9301.html"
                          title="Laptop HP Elitebook 640 G11 A7LG9PT"
                        >
                          Laptop HP Elitebook 640 G11 A7LG9PT
                        </a>
                      </h2>
                      <div className="gia_sp">
                        <span>24,290,000 VNĐ</span>
                      </div>
                    </div>
                    <div className="clear" />
                  </div>
                  <div className="item_sanpham">
                    <div className="img_sp">
                      <a
                        href="san-pham/laptop-hp-elitebook-640-g11-a7lb4pt-9300.html"
                        title="Laptop HP Elitebook 640 G11 A7LB4PT"
                      >
                        <img
                          src="img/Laptop Dell Inspiron 3530 71043885.jpg"
                          alt="Laptop HP Elitebook 640 G11 A7LB4PT"
                          className="mw100 trans03"
                        />
                      </a>
                    </div>
                    <div className="nd_sp">
                      <h2>
                        <a
                          href="san-pham/laptop-hp-elitebook-640-g11-a7lb4pt-9300.html"
                          title="Laptop HP Elitebook 640 G11 A7LB4PT"
                        >
                          Laptop HP Elitebook 640 G11 A7LB4PT
                        </a>
                      </h2>
                      <div className="gia_sp">
                        <span>29,690,000 VNĐ</span>
                      </div>
                    </div>
                    <div className="clear" />
                  </div>
                  <div className="item_sanpham">
                    <div className="img_sp">
                      <a
                        href="san-pham/laptop-hp-elitebook-640-g11-a7lb1pt-9299.html"
                        title="Laptop HP Elitebook 640 G11 A7LB1PT"
                      >
                        <img
                          src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                          alt="Laptop HP Elitebook 640 G11 A7LB1PT"
                          className="mw100 trans03"
                        />
                      </a>
                    </div>
                    <div className="nd_sp">
                      <h2>
                        <a
                          href="san-pham/laptop-hp-elitebook-640-g11-a7lb1pt-9299.html"
                          title="Laptop HP Elitebook 640 G11 A7LB1PT"
                        >
                          Laptop HP Elitebook 640 G11 A7LB1PT
                        </a>
                      </h2>
                      <div className="gia_sp">
                        <span>23,590,000 VNĐ</span>
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
                              <ul>
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
