
import { useEffect } from "react";
import { useState } from "react";

import { fetchSanpham } from "../../../service/sanphamService";


export default function Admin_sp() {

  const [sanPham, setSanpham] = useState([]);

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
  }, []);



  return (
    <>
      <h4>Quản lý sản phẩm</h4>
      <div>
        <a href="/products/add">
          <button className="btn btn-primary">Thêm sản phẩm</button>
        </a>
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
      {sanPham.length > 0 ? (
        sanPham.map((sanpham,index)=>(
          <tr key={index}>
          <td>{sanpham.id}</td>
          <td>{sanpham.ma_san_pham}</td>
          <td>{sanpham.ten_sp}</td>
          <td>
            <img src={`/img/sanpham/${sanpham.hinh_anh.chinh}`} width="100px" />
          </td>
          <td>{sanpham.gia_sp}</td>
          <td>{sanpham.id_danhmuc}</td>
          <td>
            CPU: {sanpham.cau_hinh.cpu}
            <br />
            RAM: {sanpham.cau_hinh.ram}
            <br />
            Ổ CỨNG: {sanpham.cau_hinh.o_cung}
            <br />
            VGA: {sanpham.cau_hinh.vga}
            <br />
            MÀN HÌNH: {sanpham.cau_hinh.man_hinh}

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
        </tr>
        ))
      ):(
        <p>Đang tải sản phẩm...</p>
      )}
         

        </tbody>
      </table>
    </>
  );
}
