import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy ID từ URL
  const [formData, setFormData] = useState({
    ma_san_pham: "",
    hoten: "",
    ngaysinh: "",
    gioitinh: "",
    sdt: "",
    email: "",
    diachi: "",
  });
  const [error, setError] = useState("");

  // Hàm tải thông tin người dùng
  const loadUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/${id}`);
      const userData = await response.json();
      if (response.ok) {
        setFormData(userData);
      } else {
        setError("Không tìm thấy người dùng.");
      }
    } catch (error) {
      console.error("Lỗi khi tải người dùng:", error);
      setError("Có lỗi xảy ra khi tải thông tin người dùng.");
    }
  };

  // Hàm xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.ma_san_pham ||
      !formData.hoten ||
      !formData.ngaysinh ||
      !formData.gioitinh ||
      !formData.sdt ||
      !formData.email ||
      !formData.diachi
    ) {
      return Swal.fire("Lỗi!", "Vui lòng điền đầy đủ thông tin.", "error");
    }

    try {
      const res = await fetch(`http://localhost:3000/api/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();
      if (res.ok) {
        Swal.fire("Thành công!", "Thông tin người dùng đã được cập nhật.", "success");
        navigate("/admin-account"); // Chuyển hướng sau khi thành công
      } else {
        throw new Error(responseData.message || "Có lỗi xảy ra khi cập nhật thông tin.");
      }
    } catch (error) {
      setError(error.message);
      Swal.fire("Lỗi!", error.message, "error");
    }
  };

  useEffect(() => {
    loadUser(); // Tải thông tin người dùng khi component được mount
  }, []);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Edit User</h2>
          <form onSubmit={handleSubmit}>
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
              </div>
            </div>

            {/* Họ tên */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label" htmlFor="hoten">Họ Tên</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="hoten"
                  name="hoten"
                  type="text"
                  value={formData.hoten}
                  onChange={(e) => setFormData({ ...formData, hoten: e.target.value })}
                />
              </div>
            </div>

            {/* Ngày sinh */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label" htmlFor="ngaysinh">Ngày Sinh</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="ngaysinh"
                  name="ngaysinh"
                  type="date"
                  value={formData.ngaysinh}
                  onChange={(e) => setFormData({ ...formData, ngaysinh: e.target.value })}
                />
              </div>
            </div>

            {/* Giới tính */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label" htmlFor="gioitinh">Giới Tính</label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  id="gioitinh"
                  name="gioitinh"
                  value={formData.gioitinh}
                  onChange={(e) => setFormData({ ...formData, gioitinh: e.target.value })}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
            </div>

            {/* Số điện thoại */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label" htmlFor="sdt">Số Điện Thoại</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="sdt"
                  name="sdt"
                  type="text"
                  value={formData.sdt}
                  onChange={(e) => setFormData({ ...formData, sdt: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label" htmlFor="email">Email</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Địa chỉ */}
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label" htmlFor="diachi">Địa Chỉ</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="diachi"
                  name="diachi"
                  type="text"
                  value={formData.diachi}
                  onChange={(e) => setFormData({ ...formData, diachi: e.target.value })}
                />
              </div>
            </div>

            {/* Thông báo lỗi */}
            {error && <p className="text-danger">{error}</p>}

            {/* Nút Submit */}
            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
              <div className="col-sm-4 d-grid">
                <a className="btn btn-secondary" href="/admin-account">Cancel</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
