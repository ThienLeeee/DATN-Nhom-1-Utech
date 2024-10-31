export default function Admin_sp() {
  return (
    <>
      <h4>Quản lý sản phẩm</h4>
      <div>
        <a href="/products/add">
          <button className="btn btn-primary">Thêm sản phẩm</button>
        </a>
      </div>
      <table className="table table-bordered m-2">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Giá</th>
            <th scope="col">Danh mục</th>
            <th scope="col">Mô tả</th>
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
