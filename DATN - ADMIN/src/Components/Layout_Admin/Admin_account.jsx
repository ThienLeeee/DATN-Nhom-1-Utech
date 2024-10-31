export default function Admin_account() {
  return (
    <>
      <h4>Quản lý người dùng</h4>
     
    
      <table className="table table-bordered m-2">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tên người dùng</th>
            <th scope="col">Mật khẩu</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <a href="">
                <button type="button" className="btn btn-light">
                  <i className="text-primary bi-pencil-square" />
                  Sửa
                </button>
              </a>
              <a href="">
                <button type="button" className="btn btn-light">
                  <i className="text-warning bi-trash" />
                  Xóa
                </button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
