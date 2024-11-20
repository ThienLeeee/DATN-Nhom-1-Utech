import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy ID từ URL
  const [formData, setFormData] = useState({
    ma_san_pham: '',
    ten_sp: '',
    gia_sp: '',
    bao_hanh: '',
    cau_hinh: {},
    id_danhmuc: '',
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const [cauHinhFields, setCauHinhFields] = useState([]);
  const [categories, setCategories] = useState([]);
  // Hàm để tải thông tin sản phẩm từ API
  const loadProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/sanPham/${id}`);
      const productData = await response.json();
      if (response.ok) {
        setFormData(productData);
        setCauHinhFields(getCauHinhFields(productData.id_danhmuc)); // Thiết lập các trường cấu hình
        setPreviewUrl(`/img/sanpham/${getImagePath(productData.id_danhmuc)}/${productData.hinh_anh.chinh}`); // Thiết lập preview hình ảnh
      } else {
        setError('Không tìm thấy sản phẩm.');
      }
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      setError('Có lỗi xảy ra khi tải sản phẩm.');
    }
  };
  // Hàm để tải danh sách danh mục
const loadCategories = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/danhMuc'); // URL API danh mục
    const data = await response.json();
    if (response.ok) {
      setCategories(data); // Lưu danh mục vào state
    } else {
      throw new Error('Không thể tải danh mục');
    }
  } catch (error) {
    console.error("Lỗi khi tải danh mục:", error);
    setError('Có lỗi xảy ra khi tải danh mục.');
  }
};

  // Hàm để lấy cấu hình dựa trên ID danh mục
  const getCauHinhFields = (categoryId) => {
    switch (categoryId) {
      case 1: // Laptop
        return [
          { name: 'cpu', label: 'CPU' },
          { name: 'ram', label: 'RAM' },
          { name: 'o_cung', label: 'Ổ Cứng' },
          { name: 'vga', label: 'VGA' },
          { name: 'man_hinh', label: 'Màn Hình' },
        ];
      case 2: // PC
        return [
          { name: 'cpu', label: 'CPU' },
          { name: 'ram', label: 'RAM' },
          { name: 'vga', label: 'VGA' },
        ];
      case 3: // Màn Hình
        return [
          { name: 'kieu_man_hinh', label: 'Kiểu Màn Hình' },
          { name: 'kich_thuoc', label: 'Kích Thước' },
          { name: 'do_phan_giai', label: 'Độ Phân Giải' },
          { name: 'tan_so_quet', label: 'Tần Số Quét' },
          { name: 'do_sang', label: 'Độ Sáng' },
          { name: 'thoi_gian_phan_hoi', label: 'Thời Gian Phản Hồi' },
          { name: 'phu_kien_trong_hop', label: 'Phụ Kiện Trong Hộp' },
          { name: 'cong_ket_noi', label: 'Cổng Kết Nối' },
        ];
      case 4: // Chuột
        return [
          { name: 'DPI', label: 'DPI' },
          { name: 'IPS', label: 'IPS' },
          { name: 'ket_noi', label: 'Kết Nối' },
          { name: 'mau_sac', label: 'Màu Sắc' },
          { name: 'trong_luong', label: 'Trọng Lượng' },
          { name: 'cam_bien', label: 'Cảm Biến' },
          { name: 'led', label: 'Led' },
          { name: 'tuoi_tho', label: 'Tuổi THọ' },
        ];
      case 5: // Bàn phím
        return [
            { name: 'ket_noi', label: 'Kết Nối' },
            { name: 'trong_luong', label: 'Trọng Lượng' },
            { name: 'led', label: 'LED' },
          ];
        default:
          return []; // Nếu không có danh mục nào phù hợp, không hiển thị cấu hình
      }
    };
  
    // Hàm để lấy đường dẫn hình ảnh
    const getImagePath = (categoryId) => {
      switch (categoryId) {
        case 1: return 'laptop'; // Thay đổi theo cấu trúc thư mục của bạn
        case 2: return 'pc';
        case 3: return 'manhinh';
        case 4: return 'chuot';
        case 5: return 'banphim';
        default: return '';
      }
    };
  
   // Hàm xử lý gửi form sản phẩm
   const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.ma_san_pham || !formData.ten_sp || !formData.gia_sp || !formData.bao_hanh || !formData.id_danhmuc) {
      return Swal.fire("Lỗi!", "Vui lòng điền đầy đủ thông tin sản phẩm.", "error");
    }
  
    for (const field of cauHinhFields) {
      if (!formData.cau_hinh[field.name]) {
        return Swal.fire("Lỗi!", `Vui lòng điền đầy đủ thông tin ${field.label}.`, "error");
      }
    }
  
    const data = new FormData();
    data.append('ma_san_pham', formData.ma_san_pham);
    data.append('ten_sp', formData.ten_sp);
    data.append('gia_sp', formData.gia_sp);
    data.append('bao_hanh', formData.bao_hanh);
    data.append('id_danhmuc', formData.id_danhmuc);
    data.append('cau_hinh', JSON.stringify(formData.cau_hinh));
  
    // Kiểm tra và thêm file hình ảnh nếu có
    if (file) {
      data.append('hinh_anh', file);
    }
  
    try {
      const res = await fetch(`http://localhost:3000/api/sanPham/${id}`, {
        method: 'PUT',
        body: data,
      });
  
      const responseData = await res.json();
      if (res.ok) {
        Swal.fire("Thành công!", "Sản phẩm đã được cập nhật thành công.", "success");
        const imageUrl = `http://localhost:3000/img/sanpham/${getImagePath(formData.id_danhmuc)}/${responseData.hinh_anh.chinh}`;
        setImageUrl(imageUrl); // Cập nhật trạng thái để hiển thị hình ảnh
  
        navigate('/admin-sp'); // Chuyển hướng sau khi thành công
      } else {
        throw new Error(responseData.message || 'Có lỗi xảy ra khi cập nhật sản phẩm.');
      }
    } catch (error) {
      setError(error.message);
      Swal.fire("Lỗi!", error.message, "error");
      console.error('Error during product update:', error);
    }
  };
  
    useEffect(() => {
      loadCategories();
      loadProduct(); // Tải thông tin sản phẩm khi component được mount
    }, []);
  
    useEffect(() => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result);
        reader.readAsDataURL(file);
      }
    }, [file]);
    const danhMucMapping = {
      1: "Laptop",
      2: "PC",
      3: "Màn Hình",
      4: "Chuột",
      5: "Bàn Phím",
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
    
      if (name === "id_danhmuc") {
        const newIdDanhMuc = parseInt(value, 10);
        setFormData({
          ...formData,
          id_danhmuc: newIdDanhMuc,
          ten_danhmuc: danhMucMapping[newIdDanhMuc] || "", // Lấy tên danh mục
          cau_hinh: {}, // Reset cấu hình khi thay đổi danh mục
        });
    
        setCauHinhFields(getCauHinhFields(newIdDanhMuc)); // Cập nhật trường cấu hình
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    };
        
    return (
      <div className="container my-4">
        <div className="row">
          <div className="col-md-8 mx-auto rounded border p-4">
            <h2 className="text-center mb-5">Edit Product</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Mã sản phẩm */}
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label" htmlFor="ma_san_pham">Mã Sản Phẩm</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    id="ma_san_pham"
                    name="ma_san_pham"
                    type="text"
                    value={formData.ma_san_pham}
                    onChange={(e) => setFormData({ ...formData, ma_san_pham: e.target.value })}
                  />
                  <span className="text-danger"></span>
                </div>
              </div>
  
              {/* Tên sản phẩm */}
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label" htmlFor="ten_sp">Tên Sản Phẩm</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    id="ten_sp"
                    name="ten_sp"
                    type="text"
                    value={formData.ten_sp}
                    onChange={(e) => setFormData({ ...formData, ten_sp: e.target.value })}
                  />
                  <span className="text-danger"></span>
                </div>
              </div>
  
              {/* Giá sản phẩm */}
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label" htmlFor="gia_sp">Giá Sản Phẩm</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    id="gia_sp"
                    name="gia_sp"
                    type="text"
                    value={formData.gia_sp}
                    onChange={(e) => setFormData({ ...formData, gia_sp: e.target.value })}
                  />
                  <span className="text-danger"></span>
                </div>
              </div>
  
              {/* Bảo hành */}
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label" htmlFor="bao_hanh">Bảo Hành</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    id="bao_hanh"
                    name="bao_hanh"
                    type="text"
                    value={formData.bao_hanh}
                    onChange={(e) => setFormData({ ...formData, bao_hanh: e.target.value })}
                  />
                  <span className="text-danger"></span>
                </div>
              </div>
  
        {/* Danh mục */}
        <div className="row mb-3">
  <label className="col-sm-4 col-form-label">Tên Danh Mục</label>
  <div className="col-sm-8">
  <select
  className="form-control"
  id="id_danhmuc"
  name="id_danhmuc"
  value={formData.id_danhmuc}
  onChange={handleChange}
>
  <option value="">-- Chọn danh mục --</option>
  {Object.entries(danhMucMapping).map(([id, name]) => (
    <option key={id} value={id}>
      {name}
    </option>
  ))}
</select>
  </div>
</div>



{/* Các trường cấu hình động */}
{cauHinhFields.map((field, index) => (
  <div className="row mb-3" key={index}>
    <label className="col-sm-4 col-form-label" htmlFor={field.name}>{field.label}</label>
    <div className="col-sm-8">
      <input
        className="form-control"
        id={field.name}
        name={field.name}
        type="text"
        value={formData.cau_hinh[field.name] || ''}
        onChange={(e) => setFormData({
          ...formData,
          cau_hinh: { ...formData.cau_hinh, [field.name]: e.target.value },
        })}
      />
    </div>
  </div>
))}
  
              {/* Hình ảnh */}
              <div className="row mb-3">
  <label className="col-sm-4 col-form-label" htmlFor="hinh_anh">Hình Ảnh</label>
  <div className="col-sm-8">
    <input
      className="form-control"
      id="hinh_anh"
      name="hinh_anh"
      type="file"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          setFile(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewUrl(reader.result); // Cập nhật previewUrl với hình ảnh mới
          };
          reader.readAsDataURL(file); // Đọc tệp hình ảnh
        }
      }}
    />
    
    {/* Hiển thị hình ảnh xem trước */}
    {previewUrl && (
      <img
        src={previewUrl}
        alt="Preview"
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          objectFit: 'cover',
          paddingTop: '10px',
        }}
      />
    )}

    {/* Hiển thị hình ảnh đã tải lên */}
    {imageUrl &&  (
      <img
        src={imageUrl}
        alt="Uploaded Product"
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          objectFit: 'cover',
          paddingTop: '10px',
        }}
      />
    )}
    
    <span className="text-danger"></span>
  </div>
</div>
  
              {/* Thông báo lỗi hoặc thành công */}
              {error && <p className="text-danger">{error}</p>}
             
              {/* Nút Submit */}
              <div className="row">
                <div className="offset-sm-4 col-sm-4 d-grid">
                  <button type="submit" className="btn btn-primary">Update</button>
                </div>
                <div className="col-sm-4 d-grid">
                <Link className="btn btn-secondary" to={'/admin-sp'} role="button">Cancel</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }