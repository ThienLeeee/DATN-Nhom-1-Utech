import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

export default function Admin_comment() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({});
  const [filteredCategoryId, setFilteredCategoryId] = useState('');

  // Fetch tất cả bình luận và sản phẩm khi component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sản phẩm để lấy thông tin tên sản phẩm
        const productsResponse = await axios.get('http://localhost:3000/api/sanPham');
        const productsData = productsResponse.data.reduce((acc, product) => {
          acc[product.id] = {
            ten_sp: product.ten_sp,
            id_danhmuc: product.id_danhmuc
          };
          return acc;
        }, {});
        setProducts(productsData);

        // Fetch tất cả bình luận
        const commentsResponse = await axios.get('http://localhost:3000/api/binhLuan');
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        Swal.fire('Lỗi!', 'Không thể tải dữ liệu bình luận.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Lọc bình luận theo danh mục
  const filteredComments = comments.filter(comment => {
    const product = products[comment.productId];
    if (!product) return false;
    return !filteredCategoryId || product.id_danhmuc === Number(filteredCategoryId);
  });

  // Xử lý xóa bình luận
  const handleDeleteComment = async (commentId) => {
    try {
      const result = await Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa bình luận này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3000/api/binhLuan/${commentId}`);
        setComments(comments.filter(comment => comment.id !== commentId));
        Swal.fire('Đã xóa!', 'Bình luận đã được xóa thành công.', 'success');
      }
    } catch (error) {
      console.error('Lỗi khi xóa bình luận:', error);
      Swal.fire('Lỗi!', 'Không thể xóa bình luận.', 'error');
    }
  };

  // Xử lý chỉnh sửa bình luận
  const handleEditComment = (comment) => {
    Swal.fire({
      title: 'Chỉnh sửa bình luận',
      input: 'textarea',
      inputValue: comment.comment,
      showCancelButton: true,
      confirmButtonText: 'Lưu',
      cancelButtonText: 'Hủy',
      inputValidator: (value) => {
        if (!value.trim()) {
          return 'Nội dung bình luận không được để trống!';
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:3000/api/binhLuan/${comment.id}`, {
            comment: result.value
          });
          
          setComments(comments.map(c => 
            c.id === comment.id ? { ...c, comment: result.value } : c
          ));
          
          Swal.fire('Thành công!', 'Bình luận đã được cập nhật.', 'success');
        } catch (error) {
          console.error('Lỗi khi cập nhật bình luận:', error);
          Swal.fire('Lỗi!', 'Không thể cập nhật bình luận.', 'error');
        }
      }
    });
  };

  // Xử lý ẩn/hiện bình luận
  const handleToggleStatus = async (comment) => {
    try {
      const newStatus = comment.status === 'hidden' ? 'visible' : 'hidden';
      const result = await Swal.fire({
        title: `Bạn có chắc muốn ${newStatus === 'hidden' ? 'ẩn' : 'hiện'} bình luận này?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy'
      });

      if (result.isConfirmed) {
        await axios.patch(`http://localhost:3000/api/binhLuan/toggleStatus/${comment.id}`, {
          status: newStatus
        });

        // Cập nhật state local
        setComments(comments.map(c => 
          c.id === comment.id ? { ...c, status: newStatus } : c
        ));

        Swal.fire(
          'Thành công!',
          `Bình luận đã được ${newStatus === 'hidden' ? 'ẩn' : 'hiện'}.`,
          'success'
        );
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
      Swal.fire('Lỗi!', 'Không thể cập nhật trạng thái bình luận.', 'error');
    }
  };

  return (
    <>
      <h1 className="text-center">Quản lý bình luận</h1>

      <div className="my-3 d-flex align-items-center">
        <label className="me-2 fw-bold">Chọn danh mục bình luận: </label>
        <select 
          className="form-select" 
          style={{ width: 'auto' }} 
          onChange={(e) => setFilteredCategoryId(e.target.value)}
        >
          <option value="">Tất cả</option>
          <option value="1">Laptop</option>
          <option value="2">PC</option>
          <option value="3">Màn hình</option>
          <option value="4">Chuột</option>
          <option value="5">Bàn phím</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center">Đang tải dữ liệu...</div>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Sản phẩm</th>
              <th className="text-center">Nội dung</th>
              <th className="text-center">Thời gian</th>
              <th className="text-center">Lượt thích</th>
              <th className="text-center">Phản hồi</th>
              <th className="text-center">Trạng thái</th>
              <th className="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredComments.length > 0 ? (
              filteredComments.map((comment) => (
                <tr key={comment.id} className={comment.status === 'hidden' ? 'table-secondary' : ''}>
                  <td className="text-center align-middle">{comment.id}</td>
                  <td className="align-middle">
                    {products[comment.productId]?.ten_sp || 'Sản phẩm không tồn tại'}
                  </td>
                  <td className="align-middle">{comment.comment}</td>
                  <td className="text-center align-middle">
                    {new Date(comment.time).toLocaleString()}
                  </td>
                  <td className="text-center align-middle">{comment.like}</td>
                  <td className="text-center align-middle">{comment.cmt}</td>
                  <td className="text-center align-middle">
                    <span className={`badge ${comment.status === 'hidden' ? 'bg-danger' : 'bg-success'}`}>
                      {comment.status === 'hidden' ? 'Đã ẩn' : 'Hiện'}
                    </span>
                  </td>
                  <td className="text-center align-middle">
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        onClick={() => handleEditComment(comment)}
                        className="btn btn-light"
                        title="Chỉnh sửa"
                      >
                        <i className="text-primary bi-pencil-square" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(comment)}
                        className="btn btn-light"
                        title={comment.status === 'hidden' ? 'Hiện bình luận' : 'Ẩn bình luận'}
                      >
                        <i className={`bi ${comment.status === 'hidden' ? 'bi-eye' : 'bi-eye-slash'} ${comment.status === 'hidden' ? 'text-success' : 'text-secondary'}`} />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="btn btn-light"
                        title="Xóa"
                      >
                        <i className="text-warning bi-trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  Không có bình luận nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
}
