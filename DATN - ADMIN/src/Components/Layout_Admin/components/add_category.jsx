import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
export default function AddCategory() {
  const [formData, setFormData] = useState({
    tendm: "",
    hinhanh: null, // Store the actual image file for upload
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        hinhanh: file, // Save the file itself
      });

      // Create a preview URL for the image (optional, for user interface)
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file); // Read the file for preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (!formData.tendm  ) {
        return Swal.fire("Lỗi!", "Vui lòng điền đầy đủ thông tin sản phẩm.", "error");
      }
      if (! formData.hinhanh) {
        return Swal.fire("Lỗi!", "Vui lòng chọn một hình ảnh sản phẩm.", "error");
      }

    const formDataToSend = new FormData();
    formDataToSend.append("tendm", formData.tendm);
    if (formData.hinhanh) {
      formDataToSend.append("hinhanh", formData.hinhanh); // Send the image file
    }

    try {
      const response = await fetch("http://localhost:3000/api/danhMuc", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire("Thành công!", "Danh mục đã được thêm.", "success");
        navigate("/admin-dm"); // Navigate to categories page after success
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
          <h2 className="text-center mb-5">Thêm Danh Mục</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Tên danh mục */}
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

            {/* Hình ảnh */}
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

            {/* Nút Submit */}
            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary">
                  Thêm Danh Mục
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <Link className="btn btn-secondary" to={'/admin-dm'} role="button">
                  Hủy
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
