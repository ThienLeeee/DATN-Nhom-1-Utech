import { useEffect, useState } from "react";
import { fetchSanpham } from "../../../service/sanphamService.js";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import '../../style.css';

export default function Admin_sp() {
  const [sanPham, setSanpham] = useState([]);
  const [filteredCategoryId, setFilteredCategoryId] = useState(null);
  const [lockedCategories, setLockedCategories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [categories, setCategories] = useState([]);

  const filteredItems = sanPham.filter((item) => {
    const isCategoryMatched = !filteredCategoryId || item.id_danhmuc === filteredCategoryId;
    const isNotLocked = !lockedCategories.includes(item.id_danhmuc);
    const isNameMatched = item.ten_sp.toLowerCase().includes(searchKeyword.toLowerCase());
    return isCategoryMatched && isNotLocked && isNameMatched;
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/danhMuc");
        const categoriesData = await response.json();
        setCategories(categoriesData);

        const locked = categoriesData.filter(category => category.locked).map(category => category.id);
        setLockedCategories(locked);
      } catch (error) {
        console.error("Lỗi khi fetch danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const loadSanpham = async () => {
      try {
        const sanPhamData = await fetchSanpham();
        setSanpham(sanPhamData);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };
    loadSanpham();
  }, []);

  // const handleDelete = async (id) => {
  //   Swal.fire({
  //     title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Xóa',
  //     cancelButtonText: 'Hủy',
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         const response = await fetch(`http://localhost:3000/api/sanPham/${id}`, {
  //           method: 'DELETE',
  //         });

  //         const resultData = await response.json();

  //         if (response.ok) {
  //           setSanpham(sanPham.filter((item) => item.id !== id));
  //           Swal.fire('Đã xóa!', 'Sản phẩm đã được xóa thành công.', 'success');
  //         } else {
  //           Swal.fire('Lỗi!', resultData.message || 'Xóa không thành công.', 'error');
  //         }
  //       } catch (error) {
  //         console.error("Lỗi:", error);
  //         Swal.fire('Lỗi!', 'Đã xảy ra lỗi khi xóa sản phẩm.', 'error');
  //       }
  //     }
  //   });
  // };
// Định nghĩa cấu hình cho từng danh mục
const categoryConfigurations = {
  1: [ // Laptop
    { name: 'cpu', label: 'CPU' },
    { name: 'ram', label: 'RAM' },
    { name: 'o_cung', label: 'Ổ CỨNG' },
    { name: 'vga', label: 'VGA' },
    { name: 'man_hinh', label: 'MÀN HÌNH' },
  ],
  2: [ // PC
    { name: 'cpu', label: 'CPU' },
    { name: 'ram', label: 'RAM' },
    { name: 'vga', label: 'VGA' },
  ],
  3: [ // Màn Hình
    { name: 'kieu_man_hinh', label: 'KIỂU MÀN HÌNH' },
    { name: 'kich_thuoc', label: 'KÍCH THƯỚC' },
    { name: 'tuong_thich_vesa', label: 'TƯƠNG THÍCH VESA' },
    { name: 'tan_so_quet', label: 'TẦN SỐ QUÉT' },
    { name: 'do_phan_giai', label: 'ĐỘ PHÂN GIẢI' },
    { name: 'tam_nen', label: 'TẤM NỀN' },
    { name: 'khong_gian_mau', label: 'KHÔNG GIAN MÀU' },
    { name: 'phu_kien_trong_hop', label: 'PHỤ KIỆN TRONG HỘP' },
    { name: 'thoi_gian_phan_hoi', label: 'THỜI GIAN PHẢN HỒI' },
    { name: 'do_sang', label: 'ĐỘ SÁNG' },
  ],
  4: [ // Chuột
    { name: 'mau_sac', label: 'MÀU SẮC' },
    { name: 'ket_noi', label: 'KẾT NỐI' },
    { name: 'led', label: 'LED' },
    { name: 'cam_bien', label: 'CẢM BIẾN' },
    { name: 'so_nut', label: 'SỐ NÚT' },
    { name: 'tuoi_tho', label: 'TUỔI THỌ' },
    { name: 'DPI', label: 'DPI' },
  ],
  5: [ // Bàn phím
    { name: 'mau_sac', label: 'MÀU SẮC' },
    { name: 'ket_noi', label: 'KẾT NỐI' },
    { name: 'led', label: 'LED' },
    { name: 'so_nut', label: 'SỐ NÚT' },
    { name: 'tuoi_tho', label: 'TUỔI THỌ' },
    { name: 'DPI', label: 'DPI' },
    { name: 'IPS', label: 'IPS' },
    { name: 'trong_luong', label: 'TRỌNG LƯỢNG' },
  ],
  6: [ // khác
    { name: 'custom', label: 'cấu hình mới' },
   
  ],

};

const toggleVisibility = async (id, currentStatus) => {
  // Hiển thị hộp thoại xác nhận
  const confirmResult = await Swal.fire({
    title: currentStatus ? 'Bạn có muốn ẩn sản phẩm này không?' : 'Bạn có muốn hiện sản phẩm này không?',
    text: currentStatus
      ? 'Sản phẩm sẽ không còn hiển thị trên trang.'
      : 'Sản phẩm sẽ được hiển thị trên trang.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Đồng ý',
    cancelButtonText: 'Hủy',
  });

  // Kiểm tra nếu người dùng xác nhận
  if (confirmResult.isConfirmed) {
    try {
      const response = await fetch(`http://localhost:3000/api/sanPham/${id}/toggleVisibility`, {
        method: 'POST',
      });

      const resultData = await response.json();

      if (response.ok) {
        // Cập nhật trạng thái hiển thị/ẩn cho sản phẩm trong state
        setSanpham(sanPham.map(item => 
          item.id === id ? { ...item, is_hidden: !currentStatus } : item
        ));
        Swal.fire('Thành công!', resultData.message, 'success');
      } else {
        Swal.fire('Lỗi!', resultData.message || 'Không thể cập nhật trạng thái hiển thị.', 'error');
      }
    } catch (error) {
      console.error("Lỗi:", error);
      Swal.fire('Lỗi!', 'Đã xảy ra lỗi khi cập nhật trạng thái hiển thị.', 'error');
    }
  } else {
    // Người dùng hủy hành động
    Swal.fire('Hủy!', 'Hành động đã bị hủy.', 'info');
  }
};

  // Hàm render cấu hình cho từng danh mục
const renderConfig = (cau_hinh, id_danhmuc) => {
  // Kiểm tra xem danh mục có tồn tại trong cấu hình không, nếu không thì mặc định là danh mục "khác"
  const configFields = categoryConfigurations[id_danhmuc] || categoryConfigurations[6];
  
  return configFields.map((field) => (
    cau_hinh[field.name] && (
      <div key={field.name}>
        <strong>{field.label}:</strong> {cau_hinh[field.name]}
      </div>
    )
  ));
};
  return (
    <>
      <h1 className="text-center">Quản lý sản phẩm</h1>

      <div>
        <Link to="/products/add">
          <button className="btn btn-primary">Thêm sản phẩm</button>
        </Link>
      </div>
    
      <div className="d-flex justify-content-between">
        <div className="my-3 d-flex align-items-center">
          <label className="me-2 fw-bold">Chọn danh mục: </label>
          <select
            className="form-select"
            style={{ width: 'auto' }}
            onChange={(e) => setFilteredCategoryId(Number(e.target.value))}
          >
            <option value="">Tất cả</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.tendm}
              </option>
            ))}
          </select>
        </div>
        <div className="my-3 d-flex align-items-center">
          <label className="me-2 fw-bold">Tìm kiếm: </label>
          <input
            type="text"
            className="form-control"
            style={{ width: 'auto' }}
            placeholder="Nhập tên sản phẩm..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive d-none d-md-block">
        <table className="table table-bordered m-2">
          <thead className="table-dark">
            <tr>
              <th className="text-center align-middle" scope="col">ID</th>
              <th className="text-center align-middle" scope="col">Mã sản phẩm</th>
              <th className="text-center align-middle" scope="col">Tên sản phẩm</th>
              <th className="text-center align-middle" scope="col">Hình ảnh</th>
              <th className="text-center align-middle" scope="col">Giá</th>
              <th className="text-center align-middle" scope="col">Danh mục</th>
              <th className="text-center align-middle" scope="col">Cấu hình</th>
              <th className="text-center align-middle" scope="col">Thương hiệu</th>
              <th className="text-center align-middle" scope="col">Bảo hành</th>
              <th className="text-center align-middle" scope="col">Thao tác</th>
            </tr>
          </thead>
          
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((sanpham, index) => {
                return (
                  <tr key={index}>
                    <td className="align-middle">{sanpham.id}</td>
                    <td className="align-middle">{sanpham.ma_san_pham}</td>
                    <td className="align-middle">{sanpham.ten_sp}</td>
                    <td>
                      <img
                        src={`/img/sanpham/${sanpham.hinh_anh.chinh}`}
                        style={{ width: "150px", height: "auto" }}
                        alt={sanpham.ten_sp}
                        className="w100 trans03"
                      />
                    </td>
                    <td className="align-middle">{sanpham.gia_sp}</td>
                    <td className="align-middle">{sanpham.id_danhmuc}</td>
                    <td className="align-middle text-left">
                      {renderConfig(sanpham.cau_hinh, sanpham.id_danhmuc)}
                    </td>
                    <td className="align-middle">{sanpham.thuong_hieu}</td>
                    <td className="align-middle">{sanpham.bao_hanh}</td>
                    <td className="text-center align-middle d-flex justify-content-center gap-2 pt-5">
                      <Link to={`/products/edit/${sanpham.id}`} className="btn btn-light">
                        <i className="text-primary bi-pencil-square" />
                      </Link>
                      {/* <button
                        onClick={() => handleDelete(sanpham.id)}
                        type="button"
                        className="btn btn-light"
                      >
                        <i className="text-warning bi-trash" />
                      </button> */}
                      <button style={{
                        backgroundColor:' #f8f9fa',
                        border: '#f8f9fa',
                        width:' 31px',
                    }}
                      onClick={() => toggleVisibility(sanpham.id, sanpham.is_hidden)}
                      className={`btn ${sanpham.is_hidden ? 'btn-success' : 'btn-danger'}`}
                    >
                      <i style={{color:'#0d6efd'}} className={`me-2 bi ${sanpham.is_hidden ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                      
                    </button>

                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="text-center">Không có sản phẩm nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
