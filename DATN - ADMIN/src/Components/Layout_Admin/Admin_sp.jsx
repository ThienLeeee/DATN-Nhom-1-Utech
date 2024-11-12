
import { useEffect } from "react";
import { useState } from "react";

import { fetchSanpham } from "../../../service/sanphamService.js";
import { Link } from "react-router-dom";


export default function Admin_sp() {

  const [sanPham, setSanpham] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    const loadSanpham = async () => {
      try {
        const sanPham = await fetchSanpham();
        setSanpham(sanPham);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };
    loadSanpham();
  }, [currentPage]);

  const totalPages = Math.ceil(sanPham.length / itemsPerPage);

  // Lấy các sản phẩm của trang hiện tại
  const currentItems = sanPham.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Hàm chuyển trang
  const goToPage = (page) => {
    setCurrentPage(page);
  };
  const getImagePath = (categoryId) => {
    switch (categoryId) {
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
        return "Khac"; // Default folder for other categories
    }
  };
  return (
    <>
      <h4>Quản lý sản phẩm</h4>
      <div>
        <Link to="/products/add">
        <button className="btn btn-primary">Thêm sản phẩm</button>
        </Link>
      </div>
   
      <table className="table table-bordered m-2">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Mã sản phẩm</th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Giá</th>
            <th scope="col">Danh mục</th>
            <th scope="col">Cấu hình</th>
            <th scope="col">Bảo hành</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        
        <tbody>
      {currentItems.length > 0 ? (
        
        currentItems.map((sanpham,index)=>{
          const imagePath = getImagePath(sanpham.id_danhmuc);
          return( <tr key={index}>
            <td>{sanpham.id}</td>
            <td>{sanpham.ma_san_pham}</td>
            <td>{sanpham.ten_sp}</td>
            <td>
            <img
                           src={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.chinh}`}
                           style={{ width: "150px", height: "auto" }} 
                           alt={sanpham.ten_sp}
                             className="w100 trans03"
                             />
            </td>
            <td>{sanpham.gia_sp}</td>
            <td>{sanpham.id_danhmuc}</td>
            {/* <td>
              CPU: {sanpham.cau_hinh.cpu}
              <br />
              RAM: {sanpham.cau_hinh.ram}
              <br />
              Ổ CỨNG: {sanpham.cau_hinh.o_cung}
              <br />
              VGA: {sanpham.cau_hinh.vga}
              <br />
              MÀN HÌNH: {sanpham.cau_hinh.man_hinh}
  
            </td> */}
            <td>
    {sanpham.cau_hinh.cpu && (
      <>
        <strong>CPU:</strong> {sanpham.cau_hinh.cpu}
        <br />
      </>
    )}
    {sanpham.cau_hinh.ram && (
      <>
        <strong>RAM:</strong> {sanpham.cau_hinh.ram}
        <br />
      </>
    )}
    {sanpham.cau_hinh.o_cung && (
      <>
        <strong>Ổ CỨNG:</strong> {sanpham.cau_hinh.o_cung}
        <br />
      </>
    )}
    {sanpham.cau_hinh.vga && (
      <>
        <strong>VGA:</strong> {sanpham.cau_hinh.vga}
        <br />
      </>
    )}
    {sanpham.cau_hinh.man_hinh && (
      <>
        <strong>MÀN HÌNH:</strong> {sanpham.cau_hinh.man_hinh}
        <br />
      </>
    )}
    {sanpham.cau_hinh.mau_sac && (
      <>
        <strong>MÀU SẮC:</strong> {sanpham.cau_hinh.mau_sac}
        <br />
      </>
    )}
    {sanpham.cau_hinh.ket_noi && (
      <>
        <strong>KẾT NỐI:</strong> {sanpham.cau_hinh.ket_noi}
        <br />
      </>
    )}
    {sanpham.cau_hinh.led && (
      <>
        <strong>LED:</strong> {sanpham.cau_hinh.led}
        <br />
      </>
    )}
    {sanpham.cau_hinh.cam_bien && (
      <>
        <strong>CẢM BIẾN:</strong> {sanpham.cau_hinh.cam_bien}
        <br />
      </>
    )}
    {sanpham.cau_hinh.so_nut && (
      <>
        <strong>SỐ NÚT:</strong> {sanpham.cau_hinh.so_nut}
        <br />
      </>
    )}
    {sanpham.cau_hinh.tuoi_tho && (
      <>
        <strong>TUỔI THỌ:</strong> {sanpham.cau_hinh.tuoi_tho}
        <br />
      </>
    )}
    {sanpham.cau_hinh.DPI && (
      <>
        <strong>DPI:</strong> {sanpham.cau_hinh.DPI}
        <br />
      </>
    )}
    {sanpham.cau_hinh.IPS && (
      <>
        <strong>IPS:</strong> {sanpham.cau_hinh.IPS}
        <br />
      </>
    )}
    {sanpham.cau_hinh.trong_luong && (
      <>
        <strong>TRỌNG LƯỢNG:</strong> {sanpham.cau_hinh.trong_luong}
        <br />
      </>
    )}
    {sanpham.cau_hinh.kieu_man_hinh && (
      <>
        <strong>KIỂU MÀN HÌNH:</strong> {sanpham.cau_hinh.kieu_man_hinh}
        <br />
      </>
    )}
    {sanpham.cau_hinh.kich_thuoc && (
      <>
        <strong>KÍCH THƯỚC:</strong> {sanpham.cau_hinh.kich_thuoc}
        <br />
      </>
    )}
    {sanpham.cau_hinh.tuong_thich_vesa && (
      <>
        <strong>TƯƠNG THÍCH VESA:</strong> {sanpham.cau_hinh.tuong_thich_vesa}
        <br />
      </>
    )}
    {sanpham.cau_hinh.cong_ket_noi && (
      <>
        <strong>CỔNG KẾT NỐI:</strong> {sanpham.cau_hinh.cong_ket_noi}
        <br />
      </>
    )}
    {sanpham.cau_hinh.tan_so_quet && (
      <>
        <strong>TẦN SỐ QUÉT:</strong> {sanpham.cau_hinh.tan_so_quet}
        <br />
      </>
    )}
    {sanpham.cau_hinh.do_phan_giai && (
      <>
        <strong>ĐỘ PHÂN GIẢI:</strong> {sanpham.cau_hinh.do_phan_giai}
        <br />
      </>
    )}
    {sanpham.cau_hinh.tam_nen && (
      <>
        <strong>TẤM NỀN:</strong> {sanpham.cau_hinh.tam_nen}
        <br />
      </>
    )}
    {sanpham.cau_hinh.khong_gian_mau && (
      <>
        <strong>KHÔNG GIAN MÀU:</strong> {sanpham.cau_hinh.khong_gian_mau}
        <br />
      </>
    )}
    {sanpham.cau_hinh.phu_kien_trong_hop && (
      <>
        <strong>PHỤ KIỆN TRONG HỘP:</strong> {sanpham.cau_hinh.phu_kien_trong_hop}
        <br />
      </>
    )}
    {sanpham.cau_hinh.thoi_gian_phan_hoi && (
      <>
        <strong>THỜI GIAN PHẢN HỒI:</strong> {sanpham.cau_hinh.thoi_gian_phan_hoi}
        <br />
      </>
    )}
    {sanpham.cau_hinh.do_sang && (
      <>
        <strong>ĐỘ SÁNG:</strong> {sanpham.cau_hinh.do_sang}
        <br />
      </>
    )}
  </td>
  
            <td>{sanpham.bao_hanh}</td>
            <td>
              <a href="">
                <button type="button" className="btn btn-light">
                  <i className="text-primary bi-pencil-square" />
                  Sửa
                </button>
              </a>
              <a href="">
                <button type="button" className="btn btn-light">
                  <i className="text-warning bi-trash" />
                  Xóa
                </button>
              </a>
            </td>
          </tr>)
         

        })
      ):(
        <tr>
        <td colSpan="9" className="text-center">Đang tải sản phẩm...</td>
      </tr>
      )}
         

        </tbody>
      </table>
       {/* Hiển thị các nút phân trang */}
       <div className="pagination ">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className={`btn ${currentPage === index + 1 ? "btn-primary" : "btn-light"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}
