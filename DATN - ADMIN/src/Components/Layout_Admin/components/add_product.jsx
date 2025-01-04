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
     thuong_hieu: '',
     soluong: '',
    hinh_anh: { chinh: null, phu1: null, phu2: null, phu3: null, phu4: null, phu5: null }, // Thêm các trường hình ảnh
  });

  const [file, setFile] = useState(null);
  const [previewUrls, setPreviewUrls] = useState({
    chinh: null,
    phu1: null,
    phu2: null,
    phu3: null,
    phu4: null,
    phu5: null
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]); // Dynamic categories
  const [cauHinhFields, setCauHinhFields] = useState([]); // Dynamic configuration fields
  const [isCustomConfig, setIsCustomConfig] = useState(false); // Kiểm tra có phải cấu hình tùy chỉnh hay không
  useEffect(() => {
    // Tải danh mục từ API
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/danhMuc");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };

    fetchCategories();
  }, []);
  const loadSanpham = async () => {
    try {
      const sanPhamData = await fetchSanpham();
      setSanpham(sanPhamData);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    }
  };

  useEffect(() => {
    // Khi thay đổi danh mục, sẽ thay đổi trường cấu hình tương ứng
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
          setIsCustomConfig(false);  // Không cần nhập cấu hình tùy chỉnh
          break;
        case 2: // PC
          setCauHinhFields([
            { name: 'cpu', label: 'CPU' },
            { name: 'ram', label: 'RAM' },
            { name: 'vga', label: 'VGA' },
          ]);
          setIsCustomConfig(false);
          break;
        case 3: // Màn Hình
          setCauHinhFields([
            { name: 'kieu_man_hinh', label: 'Kiểu Màn Hình' },
            { name: 'kich_thuoc', label: 'Kích Thước' },
            { name: 'do_phan_giai', label: 'Độ Phân Giải' },
            { name: 'tan_so_quet', label: 'Tần Số Quét' },
            { name: 'do_sang', label: 'Độ Sáng' },
          ]);
          setIsCustomConfig(false);
          break;
        case 4: // Chuột
          setCauHinhFields([
            { name: 'DPI', label: 'DPI' },
            { name: 'IPS', label: 'IPS' },
            { name: 'ket_noi', label: 'Kết Nối' },
            { name: 'mau_sac', label: 'Màu Sắc' },
            { name: 'trong_luong', label: 'Trọng Lượng' },
          ]);
          setIsCustomConfig(false);
          break;
        case 5: // Bàn phím
          setCauHinhFields([
            { name: 'ket_noi', label: 'Kết Nối' },
            { name: 'trong_luong', label: 'Trọng Lượng' },
          ]);
          setIsCustomConfig(false);
          break;
        default:
          setCauHinhFields([]);
          setIsCustomConfig(true);  // Bật chế độ nhập cấu hình tùy chỉnh
          break;
      }
    }
  }, [formData.id_danhmuc]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Kiểm tra xem đây có phải là trường cấu hình không
    if (name.startsWith("cau_hinh")) {
      const field = name.split("[")[1].split("]")[0];
      setFormData(prevData => ({
        ...prevData,
        cau_hinh: {
          ...prevData.cau_hinh,
          [field]: value
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
 // Xử lý thay đổi file
const handleFileChange = (e, type) => {
  const selectedFile = e.target.files[0];

  // Cập nhật hình ảnh trong state
  setFormData((prevData) => ({
    ...prevData,
    hinh_anh: { ...prevData.hinh_anh, [type]: selectedFile },
  }));

  // Cập nhật URL preview
  if (selectedFile) {
    const reader = new FileReader();
    reader.onloadend = () =>
      setPreviewUrls((prevUrls) => ({ ...prevUrls, [type]: reader.result }));
    reader.readAsDataURL(selectedFile);
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    if (!formData.ma_san_pham || !formData.ten_sp || !formData.gia_sp || !formData.bao_hanh || !formData.thuong_hieu|| !formData.soluong || !formData.id_danhmuc) {
      return Swal.fire("Lỗi!", "Vui lòng điền đầy đủ thông tin sản phẩm.", "error");
    }

    for (const field of cauHinhFields) {
      if (!formData.cau_hinh[field.name]) {
        return Swal.fire("Lỗi!", `Vui lòng điền đầy đủ thông tin ${field.label}.`, "error");
      }
      
    }
    if (isCustomConfig && !formData.cau_hinh.custom) {
      return Swal.fire("Lỗi!", "Vui lòng nhập cấu hình cho danh mục này.", "error");
    }

    const hasImage = formData.hinh_anh.chinh || formData.hinh_anh.phu1 || formData.hinh_anh.phu2 || formData.hinh_anh.phu3 || formData.hinh_anh.phu4 || formData.hinh_anh.phu5;
    if (!hasImage) {
      return Swal.fire("Lỗi!", "Vui lòng chọn ít nhất một hình ảnh sản phẩm.", "error");
    }
    const data = new FormData();
    data.append('ma_san_pham', formData.ma_san_pham);
    data.append('ten_sp', formData.ten_sp);
    data.append('gia_sp', formData.gia_sp);
    data.append('thuong_hieu', formData.thuong_hieu);
    data.append('bao_hanh', formData.bao_hanh);
    data.append('soluong', formData.soluong);
    data.append('id_danhmuc', formData.id_danhmuc);
    data.append('cau_hinh', JSON.stringify(formData.cau_hinh)); // Convert configuration to JSON string
    if (formData.hinh_anh.chinh) data.append('hinh_anh[chinh]', formData.hinh_anh.chinh);
  if (formData.hinh_anh.phu1) data.append('hinh_anh[phu1]', formData.hinh_anh.phu1);
  if (formData.hinh_anh.phu2) data.append('hinh_anh[phu2]', formData.hinh_anh.phu2);
  if (formData.hinh_anh.phu3) data.append('hinh_anh[phu3]', formData.hinh_anh.phu3);
  if (formData.hinh_anh.phu4) data.append('hinh_anh[phu4]', formData.hinh_anh.phu4);
  if (formData.hinh_anh.phu5) data.append('hinh_anh[phu5]', formData.hinh_anh.phu5);

    try {
      const res = await fetch('http://localhost:3000/api/sanPham', {
        method: 'POST',
        body: data,
      });

      const responseData = await res.json();
      console.log('Response from server:', responseData);

      if (res.ok) {
        loadSanpham(); // Reload products after success
  Swal.fire("Thành công!", "Sản phẩm đã được thêm.", "success");
        navigate("/admin-sp"); // Navigate to categories page after success
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
          <h2 className="text-center mb-5">Thêm sản phẩm</h2>
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

          {/* Số lượng */}
      <div className="row mb-3">
        <label className="col-sm-4 col-form-label" htmlFor="soluong">Số lượng</label>
        <div className="col-sm-8">
          <input
            className="form-control"
            id="soluong"
            name="soluong"
            type="number"
            value={formData.soluong} // Hiển thị giá trị từ state
            onChange={handleChange} // Gọi hàm khi giá trị thay đổi
            min="1" // Đảm bảo số lượng không dưới 1
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
                              {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                  {cat.tendm}
                                </option>
                              ))}
                </select>
              </div>
            </div>

            
              {/* Các trường cấu hình */}
              {!isCustomConfig && cauHinhFields.map((field) => (
              <div className="row mb-3" key={field.name}>
                <label className="col-sm-4 col-form-label" htmlFor={field.name}>{field.label}</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    id={field.name}
                    name={`cau_hinh[${field.name}]`}
                    type="text"
                    value={formData.cau_hinh[field.name] || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}

                  {/* Cấu hình tùy chỉnh */}
                  {isCustomConfig && (
                    <div className="row mb-3">
                      <label className="col-sm-4 col-form-label" htmlFor="customConfig">Cấu Hình Tùy Chỉnh</label>
                      <div className="col-sm-8">
                        <input
                          className="form-control"
                          id="customConfig"
                          name="cau_hinh[custom]"
                          type="text"
                          value={formData.cau_hinh.custom || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                        {/* Image upload */}
                        {/* Ảnh chính */}
                <div className="row mb-3">
                  <label className="col-sm-4 col-form-label" htmlFor="hinh_anh_chinh">Ảnh Chính</label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      id="hinh_anh_chinh"
                      name="hinh_anh[chinh]"
                      type="file"
                      onChange={(e) => handleFileChange(e, 'chinh')}
                    />
                    {previewUrls.chinh && <img src={previewUrls.chinh} alt="Preview" style={{ width: '100px', height: '100px' }} />}
                  </div>
                </div>

                {/* Ảnh phụ */}
                {['phu1', 'phu2', 'phu3', 'phu4' ,'phu5'].map((type, index) => (
                  <div className="row mb-3" key={type}>
                    <label className="col-sm-4 col-form-label" htmlFor={`hinh_anh_${type}`}>Ảnh Phụ {index + 1}</label>
                    <div className="col-sm-8">
                      <input
                        className="form-control"
                        id={`hinh_anh_${type}`}
                        name={`hinh_anh[${type}]`}
                        type="file"
                        onChange={(e) => handleFileChange(e, type)}
                      />
                      {previewUrls[type] && <img src={previewUrls[type]} alt={`Preview ${type}`} style={{ width: '100px', height: '100px' }} />}
                    </div>
                  </div>
                ))}

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

