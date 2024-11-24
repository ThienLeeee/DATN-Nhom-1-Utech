import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

export default function Admin_account() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState('all');

  // Fetch users data
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi tải danh sách người dùng:", error);
      setLoading(false);
    }
  };

  // Xử lý xóa người dùng
  const handleDelete = async (userId) => {
    // Kiểm tra nếu là admin gốc (ID = 1)
    if (userId === 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Không thể xóa',
        text: 'Không thể xóa tài khoản Admin gốc!'
      });
      return;
    }

    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: "Hành động này không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:3000/api/users/${userId}`);
          if (response.data.success) {
            Swal.fire('Đã xóa!', 'Người dùng đã được xóa thành công.', 'success');
            fetchUsers();
          }
        } catch (error) {
          Swal.fire('Lỗi!', 'Không thể xóa người dùng.', 'error');
        }
      }
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // Thêm hàm xử lý cập nhật role
  const handleUpdateRole = async (userId, currentRole) => {
    // Kiểm tra nếu là admin gốc (ID = 1)
    if (userId === 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Không thể thay đổi',
        text: 'Không thể thay đổi quyền của Admin gốc!'
      });
      return;
    }

    const { value: newRole } = await Swal.fire({
      title: 'Chọn quyền người dùng',
      input: 'select',
      inputOptions: {
        'user': 'User',
        'admin': 'Admin'
      },
      inputValue: currentRole || 'user',
      showCancelButton: true,
      confirmButtonText: 'Cập nhật',
      cancelButtonText: 'Hủy',
      inputValidator: (value) => {
        if (!value) {
          return 'Bạn cần chọn quyền!';
        }
      }
    });

    if (newRole) {
      try {
        const response = await axios.put(`http://localhost:3000/api/users/update-role/${userId}`, {
          role: newRole
        });

        if (response.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Thành công!',
            text: response.data.message
          });
          fetchUsers(); // Refresh danh sách
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi!',
          text: 'Không thể cập nhật quyền người dùng'
        });
      }
    }
  };

  // Admin user data
  const adminUser = {
    id: 1, // hoặc ID tiếp theo trong database của bạn
    fullname: "Admin",
    username: "admin",
    email: "admin@gmail.com",
    // Mật khẩu: admin123 (đã được hash)
    password: "$2a$10$vz6.rZkrfy.gM3eWoQNxT.IqQWGj.gH7jgTYwCQNJXMJICBCUGrpC",
    phone: "0123456789",
    gender: "Nam",
    role: "admin",
    isLocked: false,
    createdAt: new Date()
  }

  // Thêm hàm lọc users theo role
  const filteredUsers = users.filter(user => {
    if (selectedRole === 'all') return true;
    return user.role === selectedRole;
  });

  // Hàm xử lý thay đổi role filter
  const handleRoleFilterChange = (e) => {
    setSelectedRole(e.target.value);
  };

  // Thêm hàm handleLogout
  const handleLogout = () => {
    // Xóa tất cả dữ liệu trong localStorage
    localStorage.clear();
    
    // Xóa session storage
    sessionStorage.clear();
    
    // Reload trang để cập nhật trạng thái
    window.location.reload();
    
    // Sau đó mới chuyển hướng về trang đăng nhập
    setTimeout(() => {
      window.location.href = "http://localhost:5173/dangnhap";
    }, 100);
  };

  if (loading) {
    return <div className="text-center">Đang tải...</div>;
  }

  return (
    <div className="container-fluid">
      <h1 className="text-center mb-4">Quản lý người dùng</h1>

      {/* Sửa lại phần filter giống Admin_sp */}
      <div className="d-flex justify-content-between">
        <div className="my-3 d-flex align-items-center">
          <label className="me-2 fw-bold">Lọc theo vai trò: </label>
          <select 
            className="form-select" 
            style={{ width: 'auto' }}
            value={selectedRole}
            onChange={handleRoleFilterChange}
          >
            <option value="all">Tất cả</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="my-3 d-flex align-items-center">
          <span className="badge bg-secondary">
            Tổng số: {filteredUsers.length} người dùng
          </span>
        </div>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th className="text-center align-middle">ID</th>
            <th className="text-center align-middle">Họ tên</th>
            <th className="text-center align-middle">Username</th>
            <th className="text-center align-middle">Email</th>
            <th className="text-center align-middle">Số điện thoại</th>
            <th className="text-center align-middle">Ngày sinh</th>
            <th className="text-center align-middle">Giới tính</th>
            <th className="text-center align-middle">Vai trò</th>
            <th className="text-center align-middle">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers
            .sort((a, b) => {
              if (a.role === 'admin' && b.role !== 'admin') return -1;
              if (a.role !== 'admin' && b.role === 'admin') return 1;
              return a.id - b.id;
            })
            .map((user) => (
              <tr key={user.id}>
                <td className="text-center align-middle">
                  <span className={user.role === 'admin' ? 'fw-bold' : ''}>
                    {user.id}
                  </span>
                </td>
                <td className="text-center align-middle">
                  <span className={user.role === 'admin' ? 'fw-bold' : ''}>
                    {user.fullname}
                  </span>
                </td>
                <td className="text-center align-middle">
                  <span className={user.role === 'admin' ? 'fw-bold' : ''}>
                    {user.username}
                  </span>
                </td>
                <td className="text-center align-middle">
                  <span className={user.role === 'admin' ? 'fw-bold' : ''}>
                    {user.email}
                  </span>
                </td>
                <td className="text-center align-middle">
                  <span className={user.role === 'admin' ? 'fw-bold' : ''}>
                    {user.phone || "Chưa cập nhật"}
                  </span>
                </td>
                <td className="text-center align-middle">
                  <span className={user.role === 'admin' ? 'fw-bold' : ''}>
                    {user.birthday ? formatDate(user.birthday) : "Chưa cập nhật"}
                  </span>
                </td>
                <td className="text-center align-middle">
                  <span className={user.role === 'admin' ? 'fw-bold' : ''}>
                    {user.gender || "Chưa cập nhật"}
                  </span>
                </td>
                <td className="text-center align-middle">
                  <span 
                    className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-info'} cursor-pointer fw-bold`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleUpdateRole(user.id, user.role)}
                  >
                    {user.role || 'User'}
                  </span>
                </td>
                <td className="text-center align-middle">
                  <div className="d-flex justify-content-center gap-2">
                    <Link to={`/user/edit/${user.id}`} className="btn btn-primary btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-danger btn-sm"
                      disabled={user.id === 1}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {filteredUsers.length === 0 && (
        <div className="text-center text-muted mt-4">
          <i className="bi bi-inbox fs-1"></i>
          <p>Không tìm thấy người dùng nào</p>
        </div>
      )}
    </div>
  );
}
