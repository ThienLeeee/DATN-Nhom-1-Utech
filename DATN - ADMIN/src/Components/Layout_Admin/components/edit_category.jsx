import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
export default function EditCategory() {
  const [formData, setFormData] = useState({
    tendm: "", // Tên danh mục
    hinhanh: null, // Tệp hình ảnh
  });
  const [previewUrl, setPreviewUrl] = useState(null); // URL hình ảnh xem trước
  const [error, setError] = useState(""); // Thông báo lỗi
  const { id } = useParams(); // Lấy ID danh mục từ URL
  const navigate = useNavigate();

  // Tải dữ liệu danh mục từ API khi component mount
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/danhMuc/${id}`);
        const data = await response.json();
        if (response.ok) {
          setFormData({
            tendm: data.tendm, // Tên danh mục
            hinhanh: null, // Không tải hình ảnh ngay ban đầu
          });
          setPreviewUrl(data.hinhanhUrl || null); // URL xem trước của hình ảnh
        } else {
          throw new Error(data.message || "Không tìm thấy danh mục");
        }
      } catch (error) {
        setError(error.message);
        Swal.fire("Lỗi!", error.message, "error");
      }
    };
    fetchCategory();
  }, [id]);

  // Hàm xử lý khi có thay đổi ở trường tên danh mục
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Hàm xử lý khi chọn tệp hình ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        hinhanh: file, // Lưu tệp đã chọn
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // Cập nhật URL xem trước
      };
      reader.readAsDataURL(file); // Đọc tệp hình ảnh
    }
  };

  // Hàm xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tendm  ) {
        return Swal.fire("Lỗi!", "Vui lòng điền đầy đủ thông tin sản phẩm.", "error");
      }
    // Kiểm tra tên danh mục có hợp lệ
    const formDataToSend = new FormData();
    formDataToSend.append("tendm", formData.tendm);
    if (formData.hinhanh) {
      formDataToSend.append("hinhanh", formData.hinhanh);
    }

    try {
      const response = await fetch(`http://localhost:3000/api/danhMuc/${id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire("Thành công!", "Danh mục đã được sửa.", "success");
        navigate("/admin-dm"); // Chuyển hướng sau khi thành công
      } else {
        throw new Error(result.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      setError(error.message);
      Swal.fire("Lỗi!", error.message, "error");
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Sửa Danh Mục</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Tên Danh Mục */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label" htmlFor="tendm">
                Tên Danh Mục
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="tendm"
                  name="tendm"
                  type="text"
                  value={formData.tendm}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Hình Ảnh */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label" htmlFor="hinhanh">
                Hình Ảnh
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="hinhanh"
                  name="hinhanh"
                  type="file"
                  onChange={handleFileChange}
                />
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      paddingTop: "10px",
                    }}
                  />
                )}
              </div>
            </div>

            {/* Thông báo lỗi */}
            {error && <p className="text-danger">{error}</p>}

            {/* Nút Cập Nhật */}
            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary">
                  Cập Nhật Danh Mục
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <a className="btn btn-secondary" href="/admin-dm" role="button">
                  Hủy
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
