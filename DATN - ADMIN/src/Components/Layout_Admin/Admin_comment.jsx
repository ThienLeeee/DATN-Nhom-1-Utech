import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

export default function Admin_comment() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({});
  const [filteredCategoryId, setFilteredCategoryId] = useState('');
  const [users, setUsers] = useState({});
  const [statistics, setStatistics] = useState({
    totalComments: 0,
    totalReplies: 0,
    totalInteractions: 0
  });

  // Fetch tất cả bình luận, sản phẩm và thông tin người dùng khi component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sản phẩm
        const productsResponse = await axios.get('http://localhost:3000/api/sanPham');
        const productsData = productsResponse.data.reduce((acc, product) => {
          acc[product.id] = {
            ten_sp: product.ten_sp,
            id_danhmuc: product.id_danhmuc
          };
          return acc;
        }, {});
        setProducts(productsData);

        // Fetch users
        const usersResponse = await axios.get('http://localhost:3000/api/users');
        const usersData = usersResponse.data.reduce((acc, user) => {
          acc[user.id] = user.username;
          return acc;
        }, {});
        setUsers(usersData);

        // Fetch tất cả bình luận
        const commentsResponse = await axios.get('http://localhost:3000/api/binhLuan');
        const commentsData = commentsResponse.data;
        setComments(commentsData);

        // Tính toán thống kê
        const stats = commentsData.reduce((acc, comment) => {
          // Đếm số bình luận
          acc.totalComments++;
          
          // Đếm số phản hồi
          if (comment.replies && Array.isArray(comment.replies)) {
            acc.totalReplies += comment.replies.length;
          }
          
          // Tính tổng tương tác (like của bình luận + like của phản hồi)
          acc.totalInteractions += comment.like || 0;
          if (comment.replies && Array.isArray(comment.replies)) {
            acc.totalInteractions += comment.replies.reduce((sum, reply) => sum + (reply.like || 0), 0);
          }

          return acc;
        }, {
          totalComments: 0,
          totalReplies: 0,
          totalInteractions: 0
        });

        setStatistics(stats);
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
        text: 'Hành động này sẽ xóa cả các phản hồi của bình luận!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#d33',
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

  // Xử lý xóa phản hồi
  const handleDeleteReply = async (commentId, replyIndex) => {
    try {
      const result = await Swal.fire({
        title: 'Xóa phản hồi?',
        text: 'Bạn có chắc chắn muốn xóa phản hồi này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        confirmButtonColor: '#d33'
      });

      if (result.isConfirmed) {
        // Gọi API xóa phản hồi
        const response = await axios.delete(`http://localhost:3000/api/binhLuan/${commentId}/reply/${replyIndex}`);

        // Cập nhật state với dữ liệu mới từ server
        setComments(comments.map(comment => {
          if (comment.id === commentId) {
            return response.data.updatedComment;
          }
          return comment;
        }));
        
        // Hiển thị lại modal với dữ liệu mới
        const updatedComment = comments.find(c => c.id === commentId);
        if (updatedComment) {
          handleViewDetails(updatedComment);
        }

        Swal.fire(
          'Đã xóa!',
          'Phản hồi đã được xóa thành công.',
          'success'
        );
      }
    } catch (error) {
      console.error('Lỗi khi xóa phản hồi:', error);
      Swal.fire('Lỗi!', 'Không thể xóa phản hồi.', 'error');
    }
  };

  // Xem chi tiết bình luận và phản hồi
  const handleViewDetails = (comment) => {
    const replies = comment.replies || [];
    const repliesHtml = replies.map((reply, index) => `
      <div class="reply-item" style="border: 1px solid #eee; padding: 15px; margin: 10px 0; border-radius: 8px; background: #f8f9fa;">
        <div style="display: flex; justify-content: space-between; align-items: start;">
          <div class="reply-header" style="margin-bottom: 10px;">
            <strong style="color: #0066cc;">${reply.username}</strong>
            <small style="color: #666; display: block;">${new Date(reply.time).toLocaleString()}</small>
          </div>
          <button 
            onclick="handleDeleteReply(${comment.id}, ${index})"
            class="btn btn-sm btn-danger"
            style="padding: 2px 8px;"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
        <div class="reply-content" style="margin: 10px 0;">${reply.content}</div>
        <div class="reply-stats" style="color: #666; font-size: 0.9em;">
          <i class="bi bi-hand-thumbs-up"></i> ${reply.like || 0} lượt thích
        </div>
      </div>
    `).join('');

    Swal.fire({
      title: 'Chi tiết tương tác',
      html: `
        <div class="comment-details" style="text-align: left;">
          <div class="main-comment" style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #ddd;">
            <div style="margin-bottom: 15px;">
              <strong style="color: #0066cc; font-size: 16px;">Người bình luận:</strong> 
              <span style="font-size: 16px;">${comment.username}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Nội dung:</strong><br>
              <div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin-top: 5px;">
                ${comment.comment}
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
              <div>
                <strong style="color: #333;">Thời gian:</strong><br>
                <span style="color: #666;">${new Date(comment.time).toLocaleString()}</span>
              </div>
            </div>

            <div style="display: flex; gap: 20px;">
              <div style="display: flex; align-items: center; gap: 5px;">
                <i class="bi bi-hand-thumbs-up" style="color: #0066cc;"></i>
                <span>${comment.like} lượt thích</span>
              </div>
              <div style="display: flex; align-items: center; gap: 5px;">
                <i class="bi bi-chat-dots" style="color: #0066cc;"></i>
                <span>${comment.cmt} phản hồi</span>
              </div>
            </div>
          </div>

          ${replies.length > 0 ? `
            <div class="replies-section">
              <h5 style="color: #333; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #eee;">
                <i class="bi bi-chat-square-text"></i> 
                Các phản hồi (${replies.length})
              </h5>
              ${repliesHtml}
            </div>
          ` : `
            <div style="text-align: center; color: #666; padding: 20px;">
              <i class="bi bi-chat-square"></i> Chưa có phản hồi nào
            </div>
          `}
        </div>
      `,
      customClass: {
        container: 'comment-details-modal',
        popup: 'comment-details-popup'
      },
      width: '600px',
      showConfirmButton: false,
      showCloseButton: true,
      didOpen: () => {
        // Thêm event listener cho nút xóa phản hồi
        window.handleDeleteReply = (commentId, replyIndex) => {
          handleDeleteReply(commentId, replyIndex);
        };
      },
      willClose: () => {
        // Cleanup
        delete window.handleDeleteReply;
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

      <div className="row mb-4 mt-3">
        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-chat-dots me-2"></i>
                Tổng bình luận
              </h5>
              <p className="card-text h2">{statistics.totalComments}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-reply me-2"></i>
                Tổng phản hồi
              </h5>
              <p className="card-text h2">{statistics.totalReplies}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-hand-thumbs-up me-2"></i>
                Tổng lượt thích
              </h5>
              <p className="card-text h2">{statistics.totalInteractions}</p>
            </div>
          </div>
        </div>
      </div>

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
              <th width="5%" className="text-center">ID</th>
              <th width="10%" className="text-center">Người bình luận</th>
              <th width="20%" className="text-center">Sản phẩm</th>
              <th width="25%" className="text-center">Nội dung</th>
              <th width="15%" className="text-center">Thời gian</th>
              <th width="10%" className="text-center">Tương tác</th>
              <th width="5%" className="text-center">Trạng thái</th>
              <th width="10%" className="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredComments.length > 0 ? (
              filteredComments.map((comment) => (
                <tr key={comment.id} className={comment.status === 'hidden' ? 'table-secondary' : ''}>
                  <td className="text-center align-middle">{comment.id}</td>
                  <td className="align-middle">{comment.username}</td>
                  <td className="align-middle text-truncate" style={{ maxWidth: "200px" }}>
                    {products[comment.productId]?.ten_sp || 'Sản phẩm không tồn tại'}
                  </td>
                  <td className="align-middle">{comment.comment}</td>
                  <td className="text-center align-middle">
                    {new Date(comment.time).toLocaleString()}
                  </td>
                  <td className="text-center align-middle">
                    <div className="d-flex justify-content-center gap-3">
                      <div>
                        <i className="bi bi-hand-thumbs-up text-primary"></i>
                        <span className="ms-1">{comment.like}</span>
                      </div>
                      <div>
                        <i className="bi bi-chat-dots text-success"></i>
                        <span className="ms-1">{comment.cmt}</span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    <span className={`badge ${comment.status === 'hidden' ? 'bg-danger' : 'bg-success'}`}>
                      {comment.status === 'hidden' ? 'Đã ẩn' : 'Hiện'}
                    </span>
                  </td>
                  <td className="text-center align-middle">
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        onClick={() => handleViewDetails(comment)}
                        className="btn btn-light"
                        title="Xem chi tiết tương tác"
                      >
                        <i className="text-info bi-chat-square-text" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(comment)}
                        className={`btn btn-light`}
                        title={comment.status === 'hidden' ? 'Hiện bình luận' : 'Ẩn bình luận'}
                      >
                        <i className={`${comment.status === 'hidden' ? 'bi-eye text-success' : 'bi-eye-slash text-secondary'}`} />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="btn btn-light"
                        title="Xóa"
                      >
                        <i className="text-danger bi-trash" />
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
