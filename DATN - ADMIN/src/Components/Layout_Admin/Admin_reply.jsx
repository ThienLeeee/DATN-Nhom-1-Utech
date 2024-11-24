import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";

export default function Admin_reply() {
  const { commentId } = useParams();
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState(null);
  const [replies, setReplies] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bình luận gốc và các phản hồi
        const commentResponse = await axios.get(`http://localhost:3000/api/binhLuan/${commentId}`);
        setComment(commentResponse.data);
        setReplies(commentResponse.data.replies || []);

        // Fetch thông tin sản phẩm
        const productResponse = await axios.get(`http://localhost:3000/api/sanPham/${commentResponse.data.productId}`);
        setProduct(productResponse.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        Swal.fire('Lỗi!', 'Không thể tải dữ liệu phản hồi.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [commentId]);

  // Xử lý xóa phản hồi
  const handleDeleteReply = async (replyIndex) => {
    try {
      const result = await Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa phản hồi này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#d33',
      });

      if (result.isConfirmed) {
        // Gọi API xóa phản hồi
        await axios.delete(`http://localhost:3000/api/binhLuan/${commentId}/reply/${replyIndex}`);
        
        // Cập nhật state
        setReplies(replies.filter((_, index) => index !== replyIndex));
        
        Swal.fire('Thành công!', 'Đã xóa phản hồi.', 'success');
      }
    } catch (error) {
      console.error('Lỗi khi xóa phản hồi:', error);
      Swal.fire('Lỗi!', 'Không thể xóa phản hồi.', 'error');
    }
  };

  // Xử lý ẩn/hiện phản hồi
  const handleToggleReplyStatus = async (replyIndex) => {
    try {
      const reply = replies[replyIndex];
      const newStatus = reply.status === 'hidden' ? 'visible' : 'hidden';
      
      const result = await Swal.fire({
        title: `Bạn có chắc muốn ${newStatus === 'hidden' ? 'ẩn' : 'hiện'} phản hồi này?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy'
      });

      if (result.isConfirmed) {
        // Gọi API cập nhật trạng thái
        await axios.patch(`http://localhost:3000/api/binhLuan/${commentId}/reply/${replyIndex}/status`, {
          status: newStatus
        });

        // Cập nhật state
        const updatedReplies = [...replies];
        updatedReplies[replyIndex] = { ...reply, status: newStatus };
        setReplies(updatedReplies);

        Swal.fire('Thành công!', `Đã ${newStatus === 'hidden' ? 'ẩn' : 'hiện'} phản hồi.`, 'success');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
      Swal.fire('Lỗi!', 'Không thể cập nhật trạng thái phản hồi.', 'error');
    }
  };

  if (loading) {
    return <div className="text-center">Đang tải dữ liệu...</div>;
  }

  return (
    <>
      <h1 className="text-center mb-4">Quản lý phản hồi bình luận</h1>

      {/* Thông tin bình luận gốc */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Bình luận gốc</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p><strong>Người bình luận:</strong> {comment?.username}</p>
              <p><strong>Thời gian:</strong> {new Date(comment?.time).toLocaleString()}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Sản phẩm:</strong> {product?.ten_sp}</p>
              <p><strong>Tổng phản hồi:</strong> {replies.length}</p>
            </div>
          </div>
          <div className="mt-3">
            <strong>Nội dung:</strong>
            <p className="mt-2 p-3 bg-light rounded">{comment?.comment}</p>
          </div>
        </div>
      </div>

      {/* Danh sách phản hồi */}
      <div className="card">
        <div className="card-header bg-info text-white">
          <h5 className="mb-0">Danh sách phản hồi</h5>
        </div>
        <div className="card-body">
          {replies.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Người phản hồi</th>
                    <th className="text-center">Nội dung</th>
                    <th className="text-center">Thời gian</th>
                    <th className="text-center">Lượt thích</th>
                    <th className="text-center">Trạng thái</th>
                    <th className="text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {replies.map((reply, index) => (
                    <tr key={index} className={reply.status === 'hidden' ? 'table-secondary' : ''}>
                      <td className="text-center align-middle">{index + 1}</td>
                      <td className="align-middle">{reply.username}</td>
                      <td className="align-middle">{reply.content}</td>
                      <td className="text-center align-middle">
                        {new Date(reply.time).toLocaleString()}
                      </td>
                      <td className="text-center align-middle">
                        <i className="bi bi-hand-thumbs-up text-primary me-1"></i>
                        {reply.like || 0}
                      </td>
                      <td className="text-center align-middle">
                        <span className={`badge ${reply.status === 'hidden' ? 'bg-danger' : 'bg-success'}`}>
                          {reply.status === 'hidden' ? 'Đã ẩn' : 'Hiện'}
                        </span>
                      </td>
                      <td className="text-center align-middle">
                        <div className="btn-group">
                          <button
                            onClick={() => handleToggleReplyStatus(index)}
                            className="btn btn-light"
                            title={reply.status === 'hidden' ? 'Hiện phản hồi' : 'Ẩn phản hồi'}
                          >
                            <i className={`bi ${reply.status === 'hidden' ? 'bi-eye' : 'bi-eye-slash'} ${reply.status === 'hidden' ? 'text-success' : 'text-secondary'}`} />
                          </button>
                          <button
                            onClick={() => handleDeleteReply(index)}
                            className="btn btn-light"
                            title="Xóa"
                          >
                            <i className="bi bi-trash text-danger" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-4">
              <i className="bi bi-chat-square text-muted"></i>
              <p className="mt-2">Chưa có phản hồi nào cho bình luận này</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 