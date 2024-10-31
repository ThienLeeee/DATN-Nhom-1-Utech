import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSanPhamTheoDm } from "../../../service/sanphamService";
import { fetchDanhMucById } from "../../../service/danhmucService";

export default function SanPhamTheodm() {
  const [sanPham, setSanpham] = useState([]);

  const [tenDanhMuc, setTenDanhMuc] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const loadSanpham = async () => {
      try {
        const sanPham = await fetchSanPhamTheoDm(id);
        setSanpham(sanPham);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };
    loadSanpham();
  }, [id]);

  useEffect(() => {
    const loadTenDanhMuc = async () => {
      try {
        const danhMucData = await fetchDanhMucById(id);
        setTenDanhMuc(danhMucData.tendm); // Lưu tên danh mục
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };
    loadTenDanhMuc();
  }, [id]);

  // Tìm kiếm tên danh mục tương ứng với ID hiện tại

  return (
    <div className="wrap-main wrap-page">
      <div className="sub_main">
        <div className="title_main">
          <span>{tenDanhMuc ? tenDanhMuc : "Đang tải danh mục..."}</span>
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
                <option value={363}>
                  Integrated - Intel® Iris® Xe Graphics
                </option>
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
                {sanPham.length > 0 ? (
                  sanPham.map((sanpham) => (
                    <div className="product" key={sanpham.id}>
                      <div className="box-product">
                        <div className="pic-product" data-tooltip="sticky9346">
                          <Link
                            className="d-block"
                            to={`/chitietsp/sanPham/${sanpham.id}`}
                            title={sanpham.ten_sp}
                          >
                            <img
                              src={`/img/sanpham/Laptop/${sanpham.hinh_anh.chinh}`}
                              alt={sanpham.ten_sp}
                              className="w100 trans03"
                            />
                          </Link>
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
                              <div className="baohanh">Bảo hành: 12 tháng</div>
                            </div>
                          </div>
                        </div>
                        <div className="info-product">
                          <Link
                            className="name-product text-split"
                            to={`/chitietsp/sanPham/${sanpham.id}`}
                            title={sanpham.ten_sp}
                          >
                            {sanpham.ten_sp}
                          </Link>
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
                              rel={9346}
                              data-confirm=""
                              onClick="new jBox()"
                            >
                              Mua ngay
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Đang tải sản phẩm...</p>
                )}
              </div>

              <div className="clear" />
            </div>
            <div className="clear" />
          </div>
          <div className="clear" />
          <div style={{ align: "center" }} className="show_tool1">
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
  );
}
