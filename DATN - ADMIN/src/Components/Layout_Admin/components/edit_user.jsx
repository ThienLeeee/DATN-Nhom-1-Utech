import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "",
  });

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/${id}`);
        const userData = response.data;
        
        // Format date for input type="date"
        if (userData.birthday) {
          userData.birthday = new Date(userData.birthday).toISOString().split('T')[0];
        }
        
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải thông tin người dùng:", error);
        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "Không thể tải thông tin người dùng",
        });
        navigate("/admin-account");
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Hiển thị loading
      Swal.fire({
        title: 'Đang cập nhật...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.put(
        `http://localhost:3000/api/user/${id}`,
        {
          fullname: user.fullname,
          username: user.username,
          email: user.email,
          phone: user.phone,
          birthday: user.birthday,
          gender: user.gender
        }
      );

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Thành công!',
          text: 'Cập nhật thông tin thành công',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate('/admin-account');
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật:', error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: error.response?.data?.message || 'Không thể cập nhật thông tin người dùng'
      });
    }
  };

  if (loading) {
    return <div className="text-center">Đang tải...</div>;
  }

  return (
    <div className="container">
      <h2 className="text-center mb-4">Chỉnh sửa thông tin người dùng</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Họ tên:</label>
          <input
            type="text"
            className="form-control"
            name="fullname"
            value={user.fullname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Số điện thoại:</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={user.phone || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ngày sinh:</label>
          <input
            type="date"
            className="form-control"
            name="birthday"
            value={user.birthday || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Giới tính:</label>
          <select
            className="form-select"
            name="gender"
            value={user.gender || ""}
            onChange={handleChange}
          >
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary me-2">
            Cập nhật
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/admin-account")}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
