import { useEffect, useState } from "react";
import { fetchDanhmuc } from "../../../service/sanphamService.js";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Admin_dm() {
  const [danhMuc, setDanhMuc] = useState([]);

  const loadDanhmuc = async () => {
    try {
      const danhmucData = await fetchDanhmuc();
      setDanhMuc(danhmucData);
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
    }
  };

  useEffect(() => {
    loadDanhmuc();
  }, []);
  const handleDelete = async (id) => {
     Swal.fire({
         title: 'Bạn có chắc chắn muốn xóa danh mục này?',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Xóa',
         cancelButtonText: 'Hủy',
       }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(`http://localhost:3000/api/danhMuc/${id}`, {
              method: 'DELETE',
            });
            const result = await response.json();
        
            if (response.ok) {
              setDanhMuc(danhMuc.filter((item) => item.id !== id));
              Swal.fire('Đã xóa!', 'Danh mục đã được xóa thành công.', 'success');
            } else {
              Swal.fire('Lỗi!', result.message || 'Xóa không thành công.', 'error');
            }
          } catch (error) {
            console.error("Lỗi khi xóa danh mục:", error);
            Swal.fire('Lỗi!', 'Đã xảy ra lỗi khi xóa danh mục.', 'error');
          }
        }
      });
    };
   
  
  // const toggleLock = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/api/danhMuc/lock/${id}`, {
  //       method: 'PUT',
  //     });
  //     if (response.ok) {
  //       loadDanhmuc(); // Refresh category list to reflect the updated lock status
  //       Swal.fire('Thành công!', 'Đã thay đổi trạng thái khóa của danh mục.', 'success');
  //     } else {
  //       Swal.fire('Lỗi!', 'Không thể thay đổi trạng thái khóa.', 'error');
  //     }
  //   } catch (error) {
  //     console.error("Lỗi:", error);
  //     Swal.fire('Lỗi!', 'Có lỗi xảy ra khi thay đổi trạng thái khóa.', 'error');
  //   }
  // };
  

  return (
    <>
       <h1 className="text-center" >Quản lý danh mục</h1>
      
       <div>
  <Link to="/category/add">
    <button className="btn btn-primary btn-sm">Thêm danh mục</button>
  </Link>
</div>


      <table className="table table-bordered m-2">
        <thead className="table-dark">
          <tr className="text-center">
            <th scope="col">ID</th>
            <th scope="col">Tên danh mục</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>

        <tbody>
  {danhMuc.length > 0 ? (
    danhMuc.map((dm) => (
      <tr className="text-center" key={dm.id}>
        <td className="align-middle" data-label="ID">{dm.id}</td>
        <td className="align-middle" data-label="Tên danh mục">{dm.tendm}</td>
        <td data-label="Hình ảnh">
          <img
            src={`/img/danhmuc/${dm.hinhanh}`}
            alt={dm.tendm}
            className="w100 trans03"
          />
        </td>
        <td className="text-center align-middle" data-label="Thao tác">
          <div className="d-flex justify-content-center flex-wrap">
            <Link to={`/category/edit/${dm.id}`} className="btn btn-light mx-1 mb-1">
              <i className="text-primary bi-pencil-square" />
            </Link>
            <button
              onClick={() => handleDelete(dm.id)}
              type="button"
              className="btn btn-light mx-1 mb-1"
            >
              <i className="text-warning bi-trash" />
            </button>
            {/* <button onClick={() => toggleLock(dm.id)} type="button" className="btn btn-light mx-1 mb-1">
              <i className={`bi ${dm.locked ? 'bi-lock-fill text-danger' : 'bi-unlock text-success'}`} />
              {dm.locked ? 'Mở khóa' : 'Khóa'}
            </button> */}
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="text-center">
        Không có danh mục nào
      </td>
    </tr>
  )}
</tbody>

      </table>
    </>
  );
 
}
