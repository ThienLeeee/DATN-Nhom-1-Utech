export default function SanPhamTheodm() {
    return (
        <div className="wrap-main wrap-page">
  <div className="sub_main">
    <div className="title_main">
      <span>LAPTOP</span>
    </div>
    <div className="title_filter">
      <form id="frm_filter" encType="multipart/form-data">
        <input type="hidden" defaultValue={11} name="id_list" />
        <input type="hidden" defaultValue="" name="id_cat" />
        <input type="hidden" defaultValue="" name="id_item" />
        <div className="item_filter">
          <select name="filter[]" className="filter">
            <option value={0}>Thương hiệu</option>
            <option value={336}>Kingmax</option>
            <option value={335}>G.Skill</option>
            <option value={334}>Lexar</option>
            <option value={165}>Dell</option>
            <option value={166}>HP</option>
            <option value={167}>Asus</option>
            <option value={169}>Lenovo</option>
            <option value={333}>Kingston</option>
            <option value={168}>Acer</option>
            <option value={176}>MSI</option>
            <option value={282}>Samsung</option>
            <option value={184}>LG</option>
            <option value={285}>Philips</option>
            <option value={287}>Viewsonic</option>
            <option value={288}>AOC</option>
            <option value={200}>Gigabyte</option>
            <option value={229}>Canon</option>
            <option value={231}>Epson</option>
            <option value={230}>Brother</option>
          </select>
        </div>
        <div className="item_filter">
          <select name="filter[]" className="filter">
            <option value={0}>Mức giá</option>
            <option value={19}>Dưới 3 triệu</option>
            <option value={20}>Dưới 5 triệu</option>
            <option value={21}>Dưới 8 triệu</option>
            <option value={22}>Dưới 10 triệu</option>
            <option value={49}>Dưới 15 triệu</option>
            <option value={50}>Dưới 20 triệu</option>
            <option value={51}>Dưới 25 triệu</option>
            <option value={52}>Trên 25 triệu</option>
          </select>
        </div>
        <div className="item_filter">
          <select name="filter[]" className="filter">
            <option value={0}>CPU</option>
            <option value={53}>Intel Celeron</option>
            <option value={28}>Intel Pentium</option>
            <option value={24}>Intel Core i3</option>
            <option value={25}>Intel Core i5</option>
            <option value={26}>Intel Core i7</option>
            <option value={290}>Intel Core i9</option>
            <option value={332}>Intel Core Ultra 5</option>
            <option value={357}>Intel Core Ultra 7</option>
            <option value={358}>Intel Core Ultra 9</option>
          </select>
        </div>
        <div className="item_filter">
          <select name="filter[]" className="filter">
            <option value={0}>Bộ nhớ RAM</option>
            <option value={57}>2Gb</option>
            <option value={58}>4Gb</option>
            <option value={59}>6Gb</option>
            <option value={60}>8Gb</option>
            <option value={61}>16Gb</option>
            <option value={62}>32Gb</option>
          </select>
        </div>
        <div className="item_filter">
          <select name="filter[]" className="filter">
            <option value={0}>Dung lượng ổ cứng</option>
            <option value={362}>250 Gb</option>
            <option value={361}>960 Gb</option>
            <option value={360}>480 Gb</option>
            <option value={359}>240 Gb</option>
            <option value={353}>500 Gb</option>
            <option value={145}>128 Gb</option>
            <option value={146}>256 Gb</option>
            <option value={147}>512 Gb</option>
            <option value={149}>1 Tb</option>
            <option value={171}>2 Tb</option>
            <option value={340}>3 Tb</option>
            <option value={342}>4 Tb</option>
            <option value={350}>5 Tb</option>
            <option value={343}>6 Tb</option>
            <option value={344}>Trên 6 Tb</option>
          </select>
        </div>
        <div className="item_filter">
          <select name="filter[]" className="filter">
            <option value={0}>Kích thước màn hình</option>
            <option value={63}>11.6 inch</option>
            <option value={64}>13.3 inch</option>
            <option value={65}>14.0 inch</option>
            <option value={66}>15.6 inch</option>
            <option value={208}>16.0 inch</option>
            <option value={67}>17.3 inch</option>
            <option value={68}>19 inch</option>
            <option value={237}>20 inch</option>
            <option value={235}>22 inch</option>
            <option value={236}>24 inch</option>
            <option value={289}>25 inch</option>
            <option value={366}>26 inch</option>
            <option value={238}>27 inch</option>
            <option value={284}>28 inch</option>
            <option value={279}>29 inch</option>
            <option value={239}>32 inch</option>
            <option value={240}>34 inch</option>
            <option value={241}>38 inch</option>
            <option value={242}>43 inch</option>
            <option value={278}>45 inch</option>
            <option value={277}>48 inch</option>
          </select>
        </div>
        <div className="item_filter">
          <select name="filter[]" className="filter">
            <option value={0}>Bảo hành</option>
            <option value={159}>12 tháng</option>
            <option value={160}>24 tháng</option>
            <option value={161}>36 tháng</option>
          </select>
        </div>
        <div className="item_filter">
          <select name="filter[]" className="filter">
            <option value={0}>Card đồ họa</option>
            <option value={365}>Intel® Graphics</option>
            <option value={364}>Integrated - Intel®Arc™ Graphics</option>
            <option value={363}>Integrated - Intel® Iris® Xe Graphics</option>
            <option value={69}>Integrated - Intel® UHD Graphics</option>
            <option value={70}>VGA rời 2Gb</option>
            <option value={71}>VGA rời 4Gb</option>
            <option value={73}>VGA rời 6Gb</option>
            <option value={74}>VGA rời 8Gb</option>
            <option value={331}>Vga rời 12Gb</option>
            <option value={75}>VGA rời 16Gb</option>
          </select>
        </div>
        <div className="item_filter">
          <select name="filter[]" className="filter">
            <option value={0}>Màu sắc</option>
            <option value={76}>Đen (black)</option>
            <option value={162}>Xám (grey)</option>
            <option value={164}>Bạc (silver)</option>
            <option value={77}>Vàng (gold)</option>
            <option value={170}>Hồng (Pink)</option>
            <option value={163}>Trắng (white)</option>
            <option value={217}>Xanh (Blue)</option>
          </select>
        </div>
        <select name="sort_by" id="sort_by" className="filter">
          <option value={0}>Sắp xếp theo</option>
          <option value={1}>Giá: Thấp -&gt; Cao</option>
          <option value={2}>Giá: Cao -&gt; Thấp</option>
          <option value={3}>Xem nhiều nhất</option>
        </select>
        <div className="clear" />
      </form>
    </div>
    <div className="content_main load_sanpham">
      <div className="border_sanpham">
        <div id="results1">
          <div className="grid-products">
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9346">
                  <a
                    className="d-block"
                    href="san-pham/laptop-dell-inspiron-3530-n5i7240w1-9346.html"
                    title="Laptop Dell Inspiron 3530 N5i7240W1"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop Dell Inspiron 3530 N5i7240W1"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>CPU Intel Core i7-1355U (12MB, Up to 5.0GHz)</li>
                        <li>RAM 16GB DDR4 3200Mhz (2x8GB)</li>
                        <li>SSD 512GB M.2 PCIe NVMe</li>
                        <li>VGA Intel® Iris® Xe Graphics</li>
                        <li>Display 15.6 inch FHD&nbsp;</li>
                        <li>Pin 4Cell 54Whr</li>
                        <li>Color Carbon Black (Đen)</li>
                        <li>Finger Print</li>
                        <li>Weight 1.65 kg</li>
                        <li>OS Windows 11 Home + Office 2021</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-dell-inspiron-3530-n5i7240w1-9346.html"
                    title="Laptop Dell Inspiron 3530 N5i7240W1"
                  >
                    Laptop Dell Inspiron 3530 N5i7240W1
                  </a>
                  <div className="price-product">
                    <span className="price-new">19.890.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9346}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9345">
                  <a
                    className="d-block"
                    href="san-pham/laptop-dell-inspiron-3530-71043887-9345.html"
                    title="Laptop Dell Inspiron 3530 71043887"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop Dell Inspiron 3530 71043887"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>CPU Intel Core i5-1334U (12MB, Up to 4.60GHz)</li>
                        <li>RAM 8GB DDR4 3200MHz</li>
                        <li>SSD 512GB M.2 PCIe NVMe</li>
                        <li>VGA Intel UHD Graphics</li>
                        <li>Display 15.6 inch FHD</li>
                        <li>Pin 3Cell 41WHrs</li>
                        <li>Color Carbon Black (Đen)</li>
                        <li>Weight 1.62 kg</li>
                        <li>Finger Print</li>
                        <li>OS Windows 11 Home + Office 2021</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-dell-inspiron-3530-71043887-9345.html"
                    title="Laptop Dell Inspiron 3530 71043887"
                  >
                    Laptop Dell Inspiron 3530 71043887
                  </a>
                  <div className="price-product">
                    <span className="price-new">15.990.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9345}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9344">
                  <a
                    className="d-block"
                    href="san-pham/laptop-dell-inspiron-3530-71043885-9344.html"
                    title="Laptop Dell Inspiron 3530 71043885"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop Dell Inspiron 3530 71043885"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>CPU Intel Core i5-1334U (12MB, Up to 4.60GHz)</li>
                        <li>RAM 16GB DDR4 3200MHz (2x8GB)</li>
                        <li>SSD 512GB M.2 PCIe NVMe</li>
                        <li>VGA Intel Iris Xe Graphics</li>
                        <li>Display 15.6 inch FHD</li>
                        <li>Pin 3Cell 41WHrs</li>
                        <li>Color Platinum Silver (Bạc)</li>
                        <li>Weight 1.62 kg</li>
                        <li>OS Windows 11 Home + Office 2021</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-dell-inspiron-3530-71043885-9344.html"
                    title="Laptop Dell Inspiron 3530 71043885"
                  >
                    Laptop Dell Inspiron 3530 71043885
                  </a>
                  <div className="price-product">
                    <span className="price-new">17.290.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9344}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9303">
                  <a
                    className="d-block"
                    href="san-pham/laptop-asus-expertbook-b1-b1402cvank0246-9303.html"
                    title="Laptop Asus ExpertBook B1 B1402CVA-NK0246"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop Asus ExpertBook B1 B1402CVA-NK0246"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel Core i5-1335U (12MB Cache, up to 4.60GHz)
                        </li>
                        <li>RAM 16GB DDR4 onboard</li>
                        <li>SSD 512GB M.2 NVMe™ PCIe® 4.0</li>
                        <li>Display 14.0 inch FHD (1920 x 1080)</li>
                        <li>VGA Intel UHD Graphics</li>
                        <li>Pin 3-Cell 42WHrs</li>
                        <li>Color Star Black (Đen)</li>
                        <li>FingerPrint</li>
                        <li>Weight 1.46 kg</li>
                        <li>OS No OS</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 24 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-asus-expertbook-b1-b1402cvank0246-9303.html"
                    title="Laptop Asus ExpertBook B1 B1402CVA-NK0246"
                  >
                    Laptop Asus ExpertBook B1 B1402CVA-NK0246
                  </a>
                  <div className="price-product">
                    <span className="price-new">13.190.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9303}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9302">
                  <a
                    className="d-block"
                    href="san-pham/laptop-asus-expertbook-b1-b1402cvank0952w-9302.html"
                    title="Laptop Asus ExpertBook B1 B1402CVA-NK0952W"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop Asus ExpertBook B1 B1402CVA-NK0952W"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel Core i5-1335U (12MB Cache, up to 4.60GHz)
                        </li>
                        <li>RAM 8GB DDR4</li>
                        <li>SSD 512GB M.2 NVMe™ PCIe® 4.0</li>
                        <li>Display 14 inch FHD(1920 x 1080)</li>
                        <li>VGA Intel UHD Graphics</li>
                        <li>Pin 3Cell 42WHrs</li>
                        <li>Color Star Blue (Xanh)</li>
                        <li>FingerPrint</li>
                        <li>Weight 1.46 kg</li>
                        <li>OS Windows 11</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 24 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-asus-expertbook-b1-b1402cvank0952w-9302.html"
                    title="Laptop Asus ExpertBook B1 B1402CVA-NK0952W"
                  >
                    Laptop Asus ExpertBook B1 B1402CVA-NK0952W
                  </a>
                  <div className="price-product">
                    <span className="price-new">13.850.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9302}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9301">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-elitebook-640-g11-a7lg9pt-9301.html"
                    title="Laptop HP Elitebook 640 G11 A7LG9PT"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop HP Elitebook 640 G11 A7LG9PT"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel® Core™ Ultra 5-125U (12MB, up to 4.30GHz)
                        </li>
                        <li>RAM 16GB DDR5-5600 (1x16GB)</li>
                        <li>SSD 512GB PCIe NVMe</li>
                        <li>VGA Intel® Graphics</li>
                        <li>Display 14 inch WUXGA Touch, IPS</li>
                        <li>Pin 3-cell 56Wh</li>
                        <li>Fingerprint</li>
                        <li>Color Silver (Bạc)</li>
                        <li>Weight 1.39 kg</li>
                        <li>OS Windows 11 Home SL</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-elitebook-640-g11-a7lg9pt-9301.html"
                    title="Laptop HP Elitebook 640 G11 A7LG9PT"
                  >
                    Laptop HP Elitebook 640 G11 A7LG9PT
                  </a>
                  <div className="price-product">
                    <span className="price-new">24.290.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9301}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9300">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-elitebook-640-g11-a7lb4pt-9300.html"
                    title="Laptop HP Elitebook 640 G11 A7LB4PT"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop HP Elitebook 640 G11 A7LB4PT"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel® Core™ Ultra 7-165U (12MB, up to 4.90GHz)
                        </li>
                        <li>RAM 16GB DDR5-5600 (1x16GB)</li>
                        <li>SSD 512GB PCIe NVMe</li>
                        <li>VGA Intel® Graphics</li>
                        <li>Display 14 inch WUXGA, IPS</li>
                        <li>Pin 3-cell 56Wh</li>
                        <li>Fingerprint</li>
                        <li>Color Silver (Bạc)</li>
                        <li>Weight 1.39 kg</li>
                        <li>OS Windows 11 Home SL</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-elitebook-640-g11-a7lb4pt-9300.html"
                    title="Laptop HP Elitebook 640 G11 A7LB4PT"
                  >
                    Laptop HP Elitebook 640 G11 A7LB4PT
                  </a>
                  <div className="price-product">
                    <span className="price-new">29.690.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9300}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9299">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-elitebook-640-g11-a7lb1pt-9299.html"
                    title="Laptop HP Elitebook 640 G11 A7LB1PT"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop HP Elitebook 640 G11 A7LB1PT"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel® Core™ Ultra 5-125U (12MB, up to 4.30GHz)
                        </li>
                        <li>RAM 16GB DDR5-5600 (1x16GB)</li>
                        <li>SSD 512GB PCIe NVMe</li>
                        <li>VGA Intel® Graphics</li>
                        <li>Display 14 inch WUXGA, IPSPin 3-cell 56Wh</li>
                        <li>Fingerprint</li>
                        <li>Color Silver (Bạc)</li>
                        <li>Weight 1.39 kg</li>
                        <li>OS Windows 11 Home SL</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-elitebook-640-g11-a7lb1pt-9299.html"
                    title="Laptop HP Elitebook 640 G11 A7LB1PT"
                  >
                    Laptop HP Elitebook 640 G11 A7LB1PT
                  </a>
                  <div className="price-product">
                    <span className="price-new">23.590.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9299}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9298">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-elitebook-640-g11-a7la3pt-9298.html"
                    title="Laptop HP Elitebook 640 G11 A7LA3PT"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop HP Elitebook 640 G11 A7LA3PT"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="hot-icon blink" />
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel® Core™ Ultra 7-165U (12MB, up to 4.90GHz)
                        </li>
                        <li>RAM 16GB DDR5-5600 (1x16GB)</li>
                        <li>SSD 512GB PCIe NVMe</li>
                        <li>VGA Intel® Graphics</li>
                        <li>Display 14 inch WUXGA Touch, IPS</li>
                        <li>Pin 3-cell 56Wh</li>
                        <li>Fingerprint</li>
                        <li>Color Silver (Bạc)</li>
                        <li>Weight 1.39 kg</li>
                        <li>OS Windows 11 Home SL</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-elitebook-640-g11-a7la3pt-9298.html"
                    title="Laptop HP Elitebook 640 G11 A7LA3PT"
                  >
                    Laptop HP Elitebook 640 G11 A7LA3PT
                  </a>
                  <div className="price-product">
                    <span className="price-new">30.690.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9298}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9297">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-elitebook-630-g10-9j0f2pa-9297.html"
                    title="Laptop HP Elitebook 630 G10 9J0F2PA"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop HP Elitebook 630 G10 9J0F2PA"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>CPU Intel® Core™ i7-1355U (12MB, up to 5.00GHz)</li>
                        <li>RAM 16GB DDR4 3200MHz</li>
                        <li>SSD 512GB PCIe NVMe</li>
                        <li>VGA Intel UHD Graphics</li>
                        <li>Display 13.3 inch FHD (1920x1080) IPS</li>
                        <li>Pin 3Cell 42WHrs</li>
                        <li>Color Silver (Bạc)</li>
                        <li>LED Keyboard, Vỏ Alu</li>
                        <li>Fingerprint</li>
                        <li>Weight 1.22 kg</li>
                        <li>OS Windows 11 Home SL</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-elitebook-630-g10-9j0f2pa-9297.html"
                    title="Laptop HP Elitebook 630 G10 9J0F2PA"
                  >
                    Laptop HP Elitebook 630 G10 9J0F2PA
                  </a>
                  <div className="price-product">
                    <span className="price-new">23.390.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9297}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9296">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-elitebook-840-g10-875x3pa-9296.html"
                    title="Laptop HP Elitebook 840 G10 875X3PA"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop HP Elitebook 840 G10 875X3PA"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>CPU Intel Core i5-1335U (12MB, Up to 4.60GHz)</li>
                        <li>RAM 16GB DDR5 5200MHz (1x16GB)</li>
                        <li>SSD 512GB PCIe NVMe</li>
                        <li>VGA Intel Iris Xe Graphics</li>
                        <li>Display 14 inch WUXGA TOUCH</li>
                        <li>Pin 3Cell 51WHrs</li>
                        <li>Finger Print, SmartCard, NFC</li>
                        <li>Color Silver (Bạc)</li>
                        <li>Weight 1.36 kg</li>
                        <li>OS Windows 11 Pro 64</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 36 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-elitebook-840-g10-875x3pa-9296.html"
                    title="Laptop HP Elitebook 840 G10 875X3PA"
                  >
                    Laptop HP Elitebook 840 G10 875X3PA
                  </a>
                  <div className="price-product">
                    <span className="price-new">32.890.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9296}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9295">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-spectre-x360-14eu0051tu-a2nl3pa-9295.html"
                    title="Laptop HP Spectre X360 14-eu0051TU A2NL3PA"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop HP Spectre X360 14-eu0051TU A2NL3PA"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel® Core™ Ultra 7-155H Processor (24MB Cache,
                          up to 4.8 GHz)
                        </li>
                        <li>RAM 16GB LPDDR5x-7467 Onboard</li>
                        <li>SSD 1TB Gen4 NVMe™ TLC M.2</li>
                        <li>VGA Intel® Arc™ Graphics</li>
                        <li>Display 14 inch OLED 2.8K Touch, 120Hz</li>
                        <li>Pin 4-cell 68Wh</li>
                        <li>Vỏ ALU, PEN</li>
                        <li>Led Keyboard, IR, FingerPrint</li>
                        <li>Weight 1.45kg</li>
                        <li>Color Slate Blue (Xanh)</li>
                        <li>OS Windows 11 Home SL</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-spectre-x360-14eu0051tu-a2nl3pa-9295.html"
                    title="Laptop HP Spectre X360 14-eu0051TU A2NL3PA"
                  >
                    Laptop HP Spectre X360 14-eu0051TU A2NL3PA
                  </a>
                  <div className="price-product">
                    <span className="price-new">51.090.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9295}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9294">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-envy-x360-14fc0085tu-a19bvpa-9294.html"
                    title="Laptop HP Envy X360 14-fc0085TU A19BVPA"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop HP Envy X360 14-fc0085TU A19BVPA"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel® Core™ Ultra 7-155U Processor (12MB Cache,
                          up to 4.80GHz)
                        </li>
                        <li>RAM 32GB LPDDR5-6400 Onboard</li>
                        <li>SSD 512GB PCIe® Gen4 NVMe™ M.2</li>
                        <li>VGA Intel® Graphics</li>
                        <li>Display 14 inch OLED 2.8K Touch, 120Hz</li>
                        <li>Pin 3-cell 59Wh</li>
                        <li>Vỏ ALU, PEN, Led Keyboard, IR</li>
                        <li>Weight 1.39kg</li>
                        <li>Color Atmospheric Blue (Xanh)</li>
                        <li>OS Windows 11 Home SL</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-envy-x360-14fc0085tu-a19bvpa-9294.html"
                    title="Laptop HP Envy X360 14-fc0085TU A19BVPA"
                  >
                    Laptop HP Envy X360 14-fc0085TU A19BVPA
                  </a>
                  <div className="price-product">
                    <span className="price-new">31.390.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9294}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9293">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-envy-x360-14fc0084tu-a19btpa-9293.html"
                    title="Laptop HP Envy X360 14-fc0084TU A19BTPA"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop HP Envy X360 14-fc0084TU A19BTPA"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel® Core™ Ultra 7-155U Processor (12MB Cache,
                          up to 4.80GHz)
                        </li>
                        <li>RAM 32GB LPDDR5-6400 Onboard</li>
                        <li>SSD 1TB PCIe® Gen4 NVMe™ M.2</li>
                        <li>VGA Intel® Graphics</li>
                        <li>Display 14 inch OLED 2.8K Touch, 120Hz</li>
                        <li>Pin 3-cell 59Wh</li>
                        <li>Vỏ ALU, PEN, Led Keyboard, IR</li>
                        <li>Weight 1.39kg</li>
                        <li>Color Meteor Silver (Bạc)</li>
                        <li>OS Windows 11 Home SL</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-envy-x360-14fc0084tu-a19btpa-9293.html"
                    title="Laptop HP Envy X360 14-fc0084TU A19BTPA"
                  >
                    Laptop HP Envy X360 14-fc0084TU A19BTPA
                  </a>
                  <div className="price-product">
                    <span className="price-new">32.590.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9293}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9292">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-envy-x360-14fc0088tu-a19bypa-9292.html"
                    title="Laptop HP Envy X360 14-fc0088TU A19BYPA"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop HP Envy X360 14-fc0088TU A19BYPA"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel® Core™ Ultra 7-155U Processor (12MB Cache,
                          up to 4.8 GHz)
                        </li>
                        <li>RAM 16GB LPDDR5-6400 Onboard</li>
                        <li>SSD 1TB PCIe® Gen4 NVMe™ M.2</li>
                        <li>VGA Intel® Graphics</li>
                        <li>Display 14 inch OLED 2.8K Touch, 120Hz</li>
                        <li>Pin 3-cell 59Wh</li>
                        <li>Vỏ ALU, PEN, Led Keyboard, IR</li>
                        <li>Weight 1.39kg</li>
                        <li>Color Meteor silver (Bạc)</li>
                        <li>OS Windows 11 Home SL</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-envy-x360-14fc0088tu-a19bypa-9292.html"
                    title="Laptop HP Envy X360 14-fc0088TU A19BYPA"
                  >
                    Laptop HP Envy X360 14-fc0088TU A19BYPA
                  </a>
                  <div className="price-product">
                    <span className="price-new">32.090.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9292}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9291">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-envy-x360-14fc0087tu-a19bxpa-9291.html"
                    title="Laptop HP Envy X360 14-fc0087TU A19BXPA"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop HP Envy X360 14-fc0087TU A19BXPA"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel® Core™ Ultra 7-155U Processor (12MB Cache,
                          up to 4.8 GHz)
                        </li>
                        <li>RAM 16GB LPDDR5-6400 Onboard</li>
                        <li>SSD 1TB PCIe® Gen4 NVMe™ M.2</li>
                        <li>VGA Intel® Graphics</li>
                        <li>Display 14 inch OLED 2.8K Touch, 120Hz</li>
                        <li>Pin 3-cell 59Wh</li>
                        <li>Vỏ ALU, PEN, Led Keyboard, IR</li>
                        <li>Weight 1.39kg</li>
                        <li>Color Atmospheric Blue (Xanh)</li>
                        <li>OS Windows 11 Home SL</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-envy-x360-14fc0087tu-a19bxpa-9291.html"
                    title="Laptop HP Envy X360 14-fc0087TU A19BXPA"
                  >
                    Laptop HP Envy X360 14-fc0087TU A19BXPA
                  </a>
                  <div className="price-product">
                    <span className="price-new">31.290.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9291}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9290">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-envy-x360-14fc0094tu-a19c4pa-9290.html"
                    title="Laptop HP Envy X360 14-fc0094TU A19C4PA"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop HP Envy X360 14-fc0094TU A19C4PA"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel® Core™ Ultra 5-125U Processor (12MB Cache,
                          up to 4.30GHz)
                        </li>
                        <li>RAM 16GB LPDDR5-6400 Onboard</li>
                        <li>SSD 512GB PCIe® Gen4 NVMe™ M.2</li>
                        <li>VGA Intel® Graphics</li>
                        <li>Display 14 inch OLED 2.8K Touch, 120Hz</li>
                        <li>Pin 3-cell 59Wh</li>
                        <li>Vỏ ALU, PEN, Led Keyboard, IR</li>
                        <li>Weight 1.39kg</li>
                        <li>Color Meteor silver (Bạc)</li>
                        <li>OS Windows 11 Home SL</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-envy-x360-14fc0094tu-a19c4pa-9290.html"
                    title="Laptop HP Envy X360 14-fc0094TU A19C4PA"
                  >
                    Laptop HP Envy X360 14-fc0094TU A19C4PA
                  </a>
                  <div className="price-product">
                    <span className="price-new">26.590.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9290}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9289">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-envy-x360-14fc0092tu-a19c2pa-9289.html"
                    title="Laptop HP Envy X360 14-fc0092TU A19C2PA"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop HP Envy X360 14-fc0092TU A19C2PA"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel® Core™ Ultra 5-125U Processor (12MB Cache,
                          up to 4.30GHz)
                        </li>
                        <li>RAM 16GB LPDDR5-6400 Onboard</li>
                        <li>SSD 1TB PCIe® Gen4 NVMe™ M.2</li>
                        <li>VGA Intel® Graphics</li>
                        <li>Display 14 inch OLED 2.8K Touch, 120Hz</li>
                        <li>Pin 3-cell 59Wh</li>
                        <li>Vỏ ALU, PEN, Led Keyboard, IR</li>
                        <li>Weight 1.39kg</li>
                        <li>Color Meteor silver (Bạc)</li>
                        <li>OS Windows 11 Home SL</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-envy-x360-14fc0092tu-a19c2pa-9289.html"
                    title="Laptop HP Envy X360 14-fc0092TU A19C2PA"
                  >
                    Laptop HP Envy X360 14-fc0092TU A19C2PA
                  </a>
                  <div className="price-product">
                    <span className="price-new">27.690.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9289}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9288">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-probook-460-g11-a74mqpt-9288.html"
                    title="Laptop HP ProBook 460 G11 A74MQPT"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop HP ProBook 460 G11 A74MQPT"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel Core Ultra 5-125H (18MB, up to 4.5 GHz)
                        </li>
                        <li>RAM 16GB DDR5-5600 (1x16GB)</li>
                        <li>SSD 512GB PCIe NVMe</li>
                        <li>Display 16 inch WUXGA Touch, IPS</li>
                        <li>VGA Intel® Arc™ Graphics</li>
                        <li>Pin 3-cell 56Wh</li>
                        <li>FingerPrint, LED Keyboard</li>
                        <li>Color Silver (Bạc)</li>
                        <li>Weight 1.74 kg</li>
                        <li>OS Windows 11 Home SL</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-probook-460-g11-a74mqpt-9288.html"
                    title="Laptop HP ProBook 460 G11 A74MQPT"
                  >
                    Laptop HP ProBook 460 G11 A74MQPT
                  </a>
                  <div className="price-product">
                    <span className="price-new">23.390.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9288}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9287">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-probook-460-g11-a74c3pt-9287.html"
                    title="Laptop HP ProBook 460 G11 A74C3PT"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop HP ProBook 460 G11 A74C3PT"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel Core Ultra 7-155H (24MB, up to 4.8 GHz)
                        </li>
                        <li>RAM 16GB DDR5-5600 (1x16GB)</li>
                        <li>SSD 512GB PCIe NVMe</li>
                        <li>Display 16 inch WUXGA Touch, IPS</li>
                        <li>VGA Intel® Arc™ Graphics</li>
                        <li>Pin 3-cell 56Wh</li>
                        <li>FingerPrint, LED Keyboard</li>
                        <li>Color Silver (Bạc)</li>
                        <li>Weight 1.74 kg</li>
                        <li>OS Windows 11 Home SL</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-probook-460-g11-a74c3pt-9287.html"
                    title="Laptop HP ProBook 460 G11 A74C3PT"
                  >
                    Laptop HP ProBook 460 G11 A74C3PT
                  </a>
                  <div className="price-product">
                    <span className="price-new">27.790.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9287}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9286">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-probook-440-g11-a74bmpt-9286.html"
                    title="Laptop Hp ProBook 440 G11 A74BMPT"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop Hp ProBook 440 G11 A74BMPT"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel Core Ultra 7-155H (24MB, Up to 4.8 GHz)
                        </li>
                        <li>RAM 16GB DDR5-5600 (1x16GB)</li>
                        <li>SSD 512GB PCIe® NVMe™</li>
                        <li>Display 14 inch WUXGA, IPS</li>
                        <li>VGA Intel® Arc™ Graphics</li>
                        <li>Pin 3-cell 56Wh</li>
                        <li>FingerPrint</li>
                        <li>Color Silver (Bạc)</li>
                        <li>Weight 1.39 kg</li>
                        <li>OS Windows 11 Pro</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-probook-440-g11-a74bmpt-9286.html"
                    title="Laptop Hp ProBook 440 G11 A74BMPT"
                  >
                    Laptop Hp ProBook 440 G11 A74BMPT
                  </a>
                  <div className="price-product">
                    <span className="price-new">31.390.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9286}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9285">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-probook-440-g11-a74bhpt-9285.html"
                    title="Laptop Hp ProBook 440 G11 A74BHPT"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop Hp ProBook 440 G11 A74BHPT"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel Core Ultra 7-155U (12MB, Up to 4.8 GHz)
                        </li>
                        <li>RAM 16GB DDR5-5600 (1x16GB)</li>
                        <li>SSD 512GB PCIe® NVMe™</li>
                        <li>Display 14 inch WUXGA, IPS</li>
                        <li>VGA Intel® Graphics</li>
                        <li>Pin 3-cell 56Wh</li>
                        <li>FingerPrint</li>
                        <li>Color Silver (Bạc)</li>
                        <li>Weight 1.39 kg</li>
                        <li>OS Windows 11 Home SL</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-probook-440-g11-a74bhpt-9285.html"
                    title="Laptop Hp ProBook 440 G11 A74BHPT"
                  >
                    Laptop Hp ProBook 440 G11 A74BHPT
                  </a>
                  <div className="price-product">
                    <span className="price-new">25.390.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9285}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9284">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-probook-440-g11-a74bbpt-9284.html"
                    title="Laptop Hp ProBook 440 G11 A74BBPT"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop Hp ProBook 440 G11 A74BBPT"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel Core Ultra 5-125H (18MB, Up to 4.5 GHz)
                        </li>
                        <li>RAM 16GB DDR5-5600 (1x16GB)</li>
                        <li>SSD 512GB PCIe® NVMe™</li>
                        <li>Display 14 inch WUXGA, IPS</li>
                        <li>VGA Intel® Arc™ Graphics</li>
                        <li>Pin 3-cell 56Wh</li>
                        <li>FingerPrint</li>
                        <li>Color Silver (Bạc)</li>
                        <li>Weight 1.39 kg</li>
                        <li>OS Windows 11 Pro</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-probook-440-g11-a74bbpt-9284.html"
                    title="Laptop Hp ProBook 440 G11 A74BBPT"
                  >
                    Laptop Hp ProBook 440 G11 A74BBPT
                  </a>
                  <div className="price-product">
                    <span className="price-new">26.690.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9284}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9283">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-probook-440-g11-a74b5pt-9283.html"
                    title="Laptop Hp ProBook 440 G11 A74B5PT"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop Hp ProBook 440 G11 A74B5PT"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel Core Ultra 5-125U (12MB, Up to 4.3 GHz)
                        </li>
                        <li>RAM 16GB DDR5-5600 (1x16GB)</li>
                        <li>SSD 512GB PCIe® NVMe™</li>
                        <li>Display 14 inch WUXGA, IPS</li>
                        <li>VGA Intel® Graphics</li>
                        <li>Pin 3-cell 56Wh</li>
                        <li>FingerPrint</li>
                        <li>Color Silver (Bạc)</li>
                        <li>Weight 1.39 kg</li>
                        <li>OS Windows 11 Home SL</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-probook-440-g11-a74b5pt-9283.html"
                    title="Laptop Hp ProBook 440 G11 A74B5PT"
                  >
                    Laptop Hp ProBook 440 G11 A74B5PT
                  </a>
                  <div className="price-product">
                    <span className="price-new">21.490.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9283}
                      data-confirm=""
                      onclick="new jBox()"
                    >
                      Mua ngay
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product">
              <div className="box-product">
                <div className="pic-product" data-tooltip="sticky9282">
                  <a
                    className="d-block"
                    href="san-pham/laptop-hp-probook-440-g11-a74b4pt-9282.html"
                    title="Laptop Hp ProBook 440 G11 A74B4PT"
                  >
                    <img
                      src="img/Laptop Asus ExpertBook B1 B1402CVA-NK0952W.jpg"
                      alt="Laptop Hp ProBook 440 G11 A74B4PT"
                      className="w100 trans03"
                    />
                  </a>
                  <div className="desc-product">
                    <div>
                      <ul>
                        <li>
                          CPU Intel Core Ultra 5-125U (12MB, Up to 4.3 GHz)
                        </li>
                        <li>RAM 8GB DDR5-5600 (1x8GB)</li>
                        <li>SSD 512GB PCIe® NVMe™</li>
                        <li>Display 14 inch WUXGA, IPS</li>
                        <li>VGA Intel® Graphics</li>
                        <li>Pin 3-cell 56Wh</li>
                        <li>FingerPrint</li>
                        <li>Color Silver (Bạc)</li>
                        <li>Weight 1.39 kg</li>
                        <li>OS Windows 11 Home SL</li>
                      </ul>
                      <div className="baohanh">Bảo hành: 12 tháng</div>
                    </div>
                  </div>
                </div>
                <div className="info-product">
                  <a
                    className="name-product text-split"
                    href="san-pham/laptop-hp-probook-440-g11-a74b4pt-9282.html"
                    title="Laptop Hp ProBook 440 G11 A74B4PT"
                  >
                    Laptop Hp ProBook 440 G11 A74B4PT
                  </a>
                  <div className="price-product">
                    <span className="price-new">21.390.000 đ</span>
                  </div>
                  <div className="cart-product d-flex justify-content-between align-items-center">
                    <span className="status-pro sts2">Còn hàng</span>
                    <span
                      className="mua_giohang"
                      rel={9282}
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
          <div className="clear" />
        </div>
        <div className="clear" />
      </div>
      <div className="clear" />
      <div align="center" className="show_tool1">
        <button
          className="load_more"
          data-page={0}
          data-id={1}
          data-total={354}
        >
          Xem thêm <i className="fa fa-arrow-down" aria-hidden="true" />
        </button>
        <div className="animation_image1" style={{ display: "none" }}>
          <i className="fa fa-spinner fa-spin fa-3x" />
        </div>
      </div>
    </div>
  </div>
</div>

    )}