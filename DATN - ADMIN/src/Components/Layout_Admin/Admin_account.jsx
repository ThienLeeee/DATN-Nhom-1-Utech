import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchNguoiDung } from "../../../service/sanphamService.js"; // assuming the function is in the same service file
import Swal from 'sweetalert2';

export default function Admin_account() {
  const [users, setUsers] = useState([]);

  // Fetch user data from the API
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userData = await fetchNguoiDung(); // Assuming this fetches the user data
        setUsers(userData);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };
    loadUsers();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa người dùng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:3000/api/user/${id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            setUsers(users.filter((user) => user.id !== id)); // Remove the user from the state
            Swal.fire('Đã xóa!', 'Người dùng đã được xóa thành công.', 'success');
          } else {
            Swal.fire('Lỗi!', 'Xóa không thành công.', 'error');
          }
        } catch (error) {
          console.error("Lỗi:", error);
          Swal.fire('Lỗi!', 'Đã xảy ra lỗi khi xóa người dùng.', 'error');
        }
      }
    });
  };

  return (
    <>
        <h1 className="text-center" >Quản lý người dùng</h1>
      

      <table className="table table-bordered m-2">
        <thead className="table-dark">
          <tr>
            <th className="text-center align-middle "  scope="col">ID</th>
            <th className="text-center align-middle " scope="col">Mã sản phẩm</th>
            <th className="text-center align-middle " scope="col">Tên người dùng</th>
            <th className="text-center align-middle " scope="col">Số điện thoại</th>
            <th className="text-center align-middle " scope="col">Ngày sinh</th>
            <th className="text-center align-middle " scope="col">Giới tính</th>
            <th className="text-center align-middle " scope="col">Email</th>
            <th className="text-center align-middle " scope="col">Địa chỉ</th>
            <th className="text-center align-middle " scope="col">Vai trò</th>
            <th className="text-center align-middle " scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}> {/* Make sure to use 'id_user' as the key */}
                <td className="text-center align-middle ">{user.id}</td>
                <td className="text-center align-middle ">{user.ma_san_pham}</td>
                <td className="text-center align-middle ">{user.hoten}</td>
                <td className="text-center align-middle ">{user.sdt}</td>
                <td className="text-center align-middle ">{user.ngaysinh}</td>
                <td className="text-center align-middle ">{user.gioitinh}</td>
                <td className="text-center align-middle "> {user.email}</td>
                <td className="text-center align-middle ">{user.diachi}</td>
                <td>{user.role}</td>
                <td className="text-center d-flex justify-content-center gap-2   ">
                  {/* Link to the edit user page, using user.id_user as the route parameter */}
                  <Link to={`/user/edit/${user.id}`}>
                    <button type="button" className="btn btn-light">
                      <i className="text-primary bi-pencil-square" />
                      
                    </button>
                  </Link>
                  {/* Delete user button */}
                  <button
                    onClick={() => handleDelete(user.id)} // Trigger delete on button click
                    type="button"
                    className="btn btn-light "
                  >
                    <i className="text-warning bi-trash" />
                    
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">Không có người dùng nào</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
