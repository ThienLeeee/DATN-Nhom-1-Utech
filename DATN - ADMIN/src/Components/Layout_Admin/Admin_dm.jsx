export default function Admin_dm() {
  return (
    <>
      <h4>Quản lý danh mục</h4>
      <div>
        <a href="/categories/add">
          <button className="btn btn-primary">Thêm danh mục</button>
        </a>
      </div>
    
      <table className="table table-bordered m-2">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tên danh mục</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td>
              <img src="" width="100px" />
            </td>
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
