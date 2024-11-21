import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
export default function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ma_san_pham: '',
    ten_sp: '',
    gia_sp: '',
    bao_hanh: '',
    cau_hinh: {},
    id_danhmuc: '',
  });

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [cauHinhFields, setCauHinhFields] = useState([]); // Dynamic configuration fields

  const loadSanpham = async () => {
    try {
      const sanPhamData = await fetchSanpham();
      setSanpham(sanPhamData);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    }
  };

  useEffect(() => {
    if (formData.id_danhmuc) {
      const categoryId = parseInt(formData.id_danhmuc);
      switch (categoryId) {
        case 1: // Laptop
          setCauHinhFields([
            { name: 'cpu', label: 'CPU' },
            { name: 'ram', label: 'RAM' },
            { name: 'o_cung', label: 'Ổ Cứng' },
            { name: 'vga', label: 'VGA' },
            { name: 'man_hinh', label: 'Màn Hình' },
          ]);
          break;
        case 2: // PC
          setCauHinhFields([
            { name: 'cpu', label: 'CPU' },
            { name: 'ram', label: 'RAM' },
            { name: 'vga', label: 'VGA' },
          ]);
          break;
        case 3: // Màn Hình
          setCauHinhFields([
            { name: 'kieu_man_hinh', label: 'Kiểu Màn Hình' },
            { name: 'kich_thuoc', label: 'Kích Thước' },
            { name: 'do_phan_giai', label: 'Độ Phân Giải' },
            { name: 'tan_so_quet', label: 'Tần Số Quét' },
            { name: 'do_sang', label: 'Độ Sáng' },
            { name: 'thoi_gian_phan_hoi', label: 'Thời Gian Phản Hồi' },
            { name: 'phu_kien_trong_hop', label: 'Phụ Kiện Trong Hộp' },
            { name: 'cong_ket_noi', label: 'Cổng Kết Nối' },
          ]);
          break;
        case 4: // Chuột
          setCauHinhFields([
            { name: 'DPI', label: 'DPI' },
            { name: 'IPS', label: 'IPS' },
            { name: 'ket_noi', label: 'Kết Nối' },
            { name: 'mau_sac', label: 'Màu Sắc' },
            { name: 'trong_luong', label: 'Trọng Lượng' },
            { name: 'cam_bien', label: 'Cảm Biến' },
            { name: 'led', label: 'Led' },
            { name: 'tuoi_tho', label: 'Tuổi Thọ' },
          ]);
          break;
        case 5: // Bàn phím
          setCauHinhFields([
            { name: 'ket_noi', label: 'Kết Nối' },
            { name: 'trong_luong', label: 'Trọng Lượng' },
            { name: 'led', label: 'LED' },
          ]);
          break;
        default:
          setCauHinhFields([]);
          break;
      }
    }
  }, [formData.id_danhmuc]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    if (!formData.ma_san_pham || !formData.ten_sp || !formData.gia_sp || !formData.bao_hanh || !formData.thuong_hieu || !formData.id_danhmuc) {
      return Swal.fire("Lỗi!", "Vui lòng điền đầy đủ thông tin sản phẩm.", "error");
    }

    for (const field of cauHinhFields) {
      if (!formData.cau_hinh[field.name]) {
        return Swal.fire("Lỗi!", `Vui lòng điền đầy đủ thông tin ${field.label}.`, "error");
      }
    }

    if (!file) {
      return Swal.fire("Lỗi!", "Vui lòng chọn một hình ảnh sản phẩm.", "error");
    }
    const data = new FormData();
    data.append('ma_san_pham', formData.ma_san_pham);
    data.append('ten_sp', formData.ten_sp);
    data.append('gia_sp', formData.gia_sp);
    data.append('thuong_hieu', formData.thuong_hieu);
    data.append('bao_hanh', formData.bao_hanh);
    data.append('id_danhmuc', formData.id_danhmuc);
    data.append('cau_hinh', JSON.stringify(formData.cau_hinh)); // Convert configuration to JSON string
    if (file) {
      data.append('hinh_anh', file);
    }

    try {
      const res = await fetch('http://localhost:3000/api/sanPham', {
        method: 'POST',
        body: data,
      });

      const responseData = await res.json();
      console.log('Response from server:', responseData);

      if (res.ok) {
        loadSanpham(); // Reload products after success
        setMessage('Sản phẩm đã được thêm thành công');
        navigate('/admin-sp'); // Redirect after success
      } else {
        setError(responseData.message || 'Có lỗi xảy ra khi thêm sản phẩm.');
        Swal.fire("Lỗi!", responseData.message || 'Có lỗi xảy ra khi thêm sản phẩm.', "error");
      }
    } catch (error) {
      setError('Có lỗi xảy ra khi thêm sản phẩm.');
      Swal.fire("Lỗi!", 'Có lỗi xảy ra khi thêm sản phẩm.', "error");
      console.error('Error during product submission:', error);
    }
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Create Product</h2>
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
                  onChange={handleChange}
                />
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
                  onChange={handleChange}
                />
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
                  onChange={handleChange}
                />
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
                  onChange={handleChange}
                />
              </div>
            </div>
                 {/* thương hiệu */}
                 <div className="row mb-3">
              <label className="col-sm-4 col-form-label" htmlFor="thuong_hieu">Thương Hiệu</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="thuong_hieu"
                  name="thuong_hieu"
                  type="text"
                  value={formData.thuong_hieu}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Danh mục */}
<div className="row mb-3">
  <label className="col-sm-4 col-form-label" htmlFor="id_danhmuc">Danh Mục</label>
  <div className="col-sm-8">
    <select
      className="form-control"
      id="id_danhmuc"
      name="id_danhmuc"
      value={formData.id_danhmuc}
      onChange={handleChange}
    >
      <option value="">-- Chọn danh mục --</option>
      <option value="1">Laptop</option>
      <option value="2">PC</option>
      <option value="3">Màn Hình</option>
      <option value="4">Chuột</option>
      <option value="5">Bàn Phím</option>
    </select>
  </div>
</div>

            
            {/* Dynamic configuration fields */}
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

            {/* Image upload */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label" htmlFor="hinh_anh">Hình Ảnh</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="hinh_anh"
                  name="hinh_anh"
                  type="file"
                  onChange={handleFileChange}
                />
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
              </div>
            </div>

            {/* Error or success messages */}
            {error && <p className="text-danger">{error}</p>}
            {message && <p className="text-success">{message}</p>}

            {/* Submit button */}
            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary">Submit</button>
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

