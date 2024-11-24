import { useEffect, useState } from "react";
import { fetchSanphamIddm, fetchSanPhamTheoDm } from "../../../service/sanphamService";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "/public/css/chitietsp.css";


export default function ChiTietSanPham() {
  
  const { id } = useParams();
  const [sanpham, setSanpham] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false); // Quản lý popup
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [showReplies, setShowReplies] = useState({});
  const [visibleComments, setVisibleComments] = useState(4);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    setUser(userInfo);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sản phẩm chính
        const sanphamData = await fetchSanphamIddm(id);
        setSanpham(sanphamData);
        
        // Fetch sản phẩm cùng danh mục
        const relatedData = await fetchSanPhamTheoDm(sanphamData.id_danhmuc);
        // Lọc bỏ sản phẩm hiện tại và chỉ lấy 3 sản phẩm
        const filtered = relatedData
          .filter(product => product.id !== sanphamData.id)
          .slice(0, 3);
        setRelatedProducts(filtered);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, [id]);

  // Lấy tất cả bình luận
  useEffect(() => {
    fetchComments();
  }, [id]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/binhLuan/${id}`);
      // Lọc bỏ các bình luận bị ẩn
      const visibleComments = response.data.filter(comment => comment.status !== 'hidden');
      setComments(visibleComments);
    } catch (error) {
      console.error('Lỗi khi lấy bình luận:', error);
      setError('Không thể tải bình luận. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Gửi bình luận mới
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    // Kiểm tra đăng nhập
    if (!user) {
      alert('Vui lòng đăng nhập để bình luận');
      return;
    }

    if (!comment.trim()) return;

    try {
      setLoading(true);
      setError(null);

      // Lấy token từ localStorage
      const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:3000/api/binhLuan', 
        {
          productId: parseInt(id),
          comment: comment.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.status === 200 && response.data) {
        setComments(prevComments => [response.data, ...prevComments]);
        setComment('');
        setShowCommentForm(false);
      }
    } catch (error) {
      console.error('Lỗi khi gửi bình luận:', error);
      if (error.response?.status === 401) {
        setError('Vui lòng đăng nhập để bình luận');
      } else {
        setError('Không thể gi bình luận. Vui lòng thử lại sau.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Hàm tăng lượt thích
  const handleLike = async (commentId) => {
    try {
      if (!user) {
        alert('Vui lòng đăng nhập để thực hiện chức năng này');
        return;
      }
      
      await axios.patch(`http://localhost:3000/api/binhLuan/like/${commentId}`);
      fetchComments(); // Refresh danh sách bình luận
    } catch (error) {
      console.error('Lỗi khi like bình luận:', error);
    }
  };

  // Hàm tăng lượt phản hồi
  const handleReply = async (commentId) => {
    if (!user) {
      alert('Vui lòng đăng nhập để thực hiện chức năng này');
      return;
    }
    setReplyingTo(commentId);
  };

  // Hàm submit reply
  const handleSubmitReply = async (commentId) => {
    try {
      if (!replyContent.trim()) return;

      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3000/api/binhLuan/reply/${commentId}`,
        {
          userId: user.id,
          username: user.username,
          content: replyContent
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        setReplyContent('');
        setReplyingTo(null);
        fetchComments(); // Refresh danh sách bình luận
      }
    } catch (error) {
      console.error('Lỗi khi gửi phản hồi:', error);
    }
  };

  const handleAddToCart = (sanPhamMoi) => {
    let cartItems = JSON.parse(localStorage.getItem("cartItem")) || [];
    const itemIndex = cartItems.findIndex((item) => item.id === sanPhamMoi.id);

    if (itemIndex > -1) {
      cartItems[itemIndex].quantity += 1;
    } else {
      const priceAsNumber = parseInt(sanPhamMoi.gia_sp.replace(/\./g, ""));
      cartItems.push({ ...sanPhamMoi, gia_sp: priceAsNumber, quantity: 1 });
    }

    localStorage.setItem("cartItem", JSON.stringify(cartItems));
    
    // Dispatch một custom event để thông báo thay đổi giỏ hàng
    const event = new CustomEvent('cartUpdated');
    window.dispatchEvent(event);
    
    setPopupVisible(true);
  };

  const handleBuyNow = (sanPhamMoi) => {
    let cartItems = JSON.parse(localStorage.getItem("cartItem")) || [];
    const itemIndex = cartItems.findIndex((item) => item.id === sanPhamMoi.id);

    if (itemIndex > -1) {
      cartItems[itemIndex].quantity += 1;
    } else {
      const priceAsNumber = parseInt(sanPhamMoi.gia_sp.replace(/\./g, ""));
      cartItems.push({ ...sanPhamMoi, gia_sp: priceAsNumber, quantity: 1 });
    }

    localStorage.setItem("cartItem", JSON.stringify(cartItems));
    
    // Dispatch một custom event để thông báo thay đổi giỏ hàng
    const event = new CustomEvent('cartUpdated');
    window.dispatchEvent(event);
    
    navigate("/giohang");
  };
  

  const handleClosePopup = () => {
    setPopupVisible(false); // Đóng popup
  };

  const handleContinueShopping = () => {
    setPopupVisible(false); // Đóng popup và tiếp tục mua hàng
  };

  const handleViewCart = () => {
    setPopupVisible(false); // Đóng popup và đi đến giỏ hàng
    navigate("/giohang");
  };

  const handleLoginRedirect = () => {
    // Lưu URL hiện tại vào localStorage để sau khi đăng nhập có thể quay lại
    localStorage.setItem('previousPath', window.location.pathname);
    navigate('/dangnhap');
  };

  if (!sanpham) {
    return <div>Loading...</div>;
  }

  let imagePath = "";
  switch (sanpham.id_danhmuc) {
    case 1:
      imagePath = "Laptop";
      break;
    case 2:
      imagePath = "PC";
      break;
    case 3:
      imagePath = "Manhinh";
      break;
    case 4:
      imagePath = "Chuot";
      break;
    case 5:
      imagePath = "Banphim";
      break;
    default:
      imagePath = "Khac";
  }

  // Tạo mảng chứa tất cả ảnh
  const allImages = sanpham ? [
    {
      src: `/img/sanpham/${imagePath}/${sanpham.hinh_anh.chinh}`,
      alt: `${sanpham.ten_sp} - Ảnh chính`
    },
    {
      src: `/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu1}`,
      alt: `${sanpham.ten_sp} - Ảnh 1`
    },
    {
      src: `/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu2}`,
      alt: `${sanpham.ten_sp} - Ảnh 2`
    },
    {
      src: `/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu3}`,
      alt: `${sanpham.ten_sp} - Ảnh 3`
    },
    {
      src: `/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu4}`,
      alt: `${sanpham.ten_sp} - Ảnh 4`
    },
    {
      src: `/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu5}`,
      alt: `${sanpham.ten_sp} - Ảnh 5`
    }
  ] : [];

  // Hàm điều hướng
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  // Thêm hàm để mở gallery với index cụ thể
  const openGallery = (index) => {
    setCurrentImageIndex(index);
    setShowGallery(true);
  };

  // Thêm hàm để toggle hiển th replies
  const toggleReplies = (commentId) => {
    setShowReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  // Thêm hàm để xử lý việc xem thêm bình luận
  const handleShowMoreComments = () => {
    setShowAllComments(true);
    setVisibleComments(comments.length);
  };

  // Thêm hàm để xử lý việc ẩn bớt bình luận
  const handleShowLessComments = () => {
    setShowAllComments(false);
    setVisibleComments(4);
    // Tự động scroll lên đầu phần bình luận
    document.getElementById('binhluan').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* chitietsanpham-container */}
      <div className="wrap-main wrap-page">
        <div className="sub_main">
          <div
            className="content_main"
            itemScope=""
            itemType="http://schema.org/Product"
          >
            <div className="top_detail">
              <div className="img_detail">
                <div className="main_img_detail">
                  <a onClick={() => {
                    setShowGallery(true);
                    setCurrentImageIndex(0);
                  }}>
                    <img src={allImages[0].src} alt={allImages[0].alt} />
                  </a>
                </div>

                <div id="sub_img_detail">
                  <div className="list_sub_img_detail">
                    <a
                      href="javascript:"
                      title="prev"
                      className="prev_sub_detail transitionAll03"
                    />
                    <a
                      href="javascript:"
                      title="next"
                      className="next_sub_detail transitionAll03"
                    />
                    <div
                      className="owl_img_detail owl-carousel owl-theme"
                      style={{ opacity: 1, display: "block" }}
                    >
                      <div className="owl-wrapper-outer">
                        <div
                          className="owl-wrapper"
                          style={{
                            width: 1330,
                            left: 0,
                            display: "block",
                            transition: "800ms",
                            transform: "translate3d(-95px, 0px, 0px)",
                          }}
                        >
                          {/* anh_phu_1 */}
                          <div className="owl-item" style={{ width: 95 }}>
                            <div className="item_owl_sub">
                              <a onClick={() => openGallery(1)} style={{ cursor: 'pointer' }}>
                                <img
                                  src={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu1}`}
                                  className="w100"
                                  alt={sanpham.ten_sp}
                                />
                              </a>
                            </div>
                          </div>
                          {/* anh_phu_1 end*/}

                          {/* anh_phu_2 */}
                          <div className="owl-item" style={{ width: 95 }}>
                            <div className="item_owl_sub">
                              <a onClick={() => openGallery(2)} style={{ cursor: 'pointer' }}>
                                <img
                                  src={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu2}`}
                                  className="w100"
                                  alt={sanpham.ten_sp}
                                />
                              </a>
                            </div>
                          </div>
                          {/* anh_phu_2 end */}

                          {/* anh_phu_3 */}
                          <div className="owl-item" style={{ width: 95 }}>
                            <div className="item_owl_sub">
                              <a onClick={() => openGallery(3)} style={{ cursor: 'pointer' }}>
                                <img
                                  src={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu3}`}
                                  className="w100"
                                  alt={sanpham.ten_sp}
                                />
                              </a>
                            </div>
                          </div>
                          {/* anh_phu_3 end */}

                          {/* anh_phu_4 */}
                          <div className="owl-item" style={{ width: 95 }}>
                            <div className="item_owl_sub">
                              <a onClick={() => openGallery(4)} style={{ cursor: 'pointer' }}>
                                <img
                                  src={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu4}`}
                                  className="w100"
                                  alt={sanpham.ten_sp}
                                />
                              </a>
                            </div>
                          </div>
                          {/* anh_phu_4 end */}

                          {/* anh_phu_5 */}
                          <div className="owl-item" style={{ width: 95 }}>
                            <div className="item_owl_sub">
                              <a onClick={() => openGallery(5)} style={{ cursor: 'pointer' }}>
                                <img
                                  src={`/img/sanpham/${imagePath}/${sanpham.hinh_anh.phu5}`}
                                  className="w100"
                                  alt={sanpham.ten_sp}
                                />
                              </a>
                            </div>
                          </div>
                          {/* anh_phu_5 end */}
                        </div>
                      </div>
                    </div>
                    {/*owl img detail*/}
                  </div>
                </div>
              </div>

              <div className="info_detail">
                <h1
                  style={{ display: "inline", verticalAlign: "middle" }}
                  className="name_detail"
                  itemProp="name"
                >
                  {sanpham.ten_sp}
                </h1>

                <div className="item_info_detail masp">
                  <strong>
                    Mã SP : <span itemProp="mpn">{sanpham.ma_san_pham}</span>
                  </strong>
                  <strong>
                    Tình trạng :
                    <span style={{ color: "#006fd5" }}>Còn hàng</span>
                  </strong>
                </div>

                <div className="item_info_detail">
                  <div className="mota_detail text" itemProp="description">
                    {sanpham.id_danhmuc === 1 && (
                      <ul>
                        <li>CPU: {sanpham.cau_hinh.cpu}</li>
                        <li>RAM: {sanpham.cau_hinh.ram}</li>
                        <li>Ổ cứng: {sanpham.cau_hinh.o_cung}</li>
                        <li>VGA: {sanpham.cau_hinh.vga}</li>
                        <li>Màn hình: {sanpham.cau_hinh.man_hinh}</li>
                        <li>Pin: {sanpham.cau_hinh_chi_tiet.pin}</li>
                        <li>Màu sắc: {sanpham.cau_hinh_chi_tiet.mau_sac}</li>
                        <li>
                          Trọng lượng: {sanpham.cau_hinh_chi_tiet.trong_luong}
                        </li>
                        <li>
                          Hệ điều hành: {sanpham.cau_hinh_chi_tiet.he_dieu_hanh}
                        </li>
                      </ul>
                    )}
                    {sanpham.id_danhmuc === 2 && (
                      <ul>
                        <li>Mainboard: {sanpham.cau_hinh.mainboard}</li>
                        <li>CPU: {sanpham.cau_hinh.cpu}</li>
                        <li>RAM: {sanpham.cau_hinh.ram}</li>
                        <li>VGA: {sanpham.cau_hinh.vga}</li>
                        <li>HDD: {sanpham.cau_hinh.hdd}</li>
                        <li>SSD: {sanpham.cau_hinh.ssd}</li>
                        <li>PSU: {sanpham.cau_hinh.psu}</li>
                        <li>Case: {sanpham.cau_hinh.case}</li>
                        <li>Cooling: {sanpham.cau_hinh.cooling}</li>
                      </ul>
                    )}
                    {sanpham.id_danhmuc === 3 && (
                      <ul>
                        <li>Kiểu màn hình: {sanpham.cau_hinh.kieu_man_hinh}</li>
                        <li>Kích thước: {sanpham.cau_hinh.kich_thuoc}</li>
                        <li>
                          Tương thích VESA: {sanpham.cau_hinh.tuong_thich_vesa}
                        </li>
                        <li>Cổng kết nối: {sanpham.cau_hinh.cong_ket_noi}</li>
                        <li>Tần số quét: {sanpham.cau_hinh.tan_so_quet}</li>
                        <li>Độ phân giải: {sanpham.cau_hinh.do_phan_giai}</li>
                        <li>Tấm nền: {sanpham.cau_hinh.tam_nen}</li>
                        <li>
                          Không gian màu: {sanpham.cau_hinh.khong_gian_mau}
                        </li>
                        <li>
                          Phụ kiện trong hộp:{" "}
                          {sanpham.cau_hinh.phu_kien_trong_hop || "N/A"}
                        </li>
                        <li>
                          Thời gian phản hồi:{" "}
                          {sanpham.cau_hinh.thoi_gian_phan_hoi}
                        </li>
                        <li>Độ sáng: {sanpham.cau_hinh.do_sang}</li>
                      </ul>
                    )}
                    {sanpham.id_danhmuc === 4 && (
                      <ul>
                        <li>Màu sắc: {sanpham.cau_hinh.mau_sac}</li>
                        <li>Kết nối: {sanpham.cau_hinh.ket_noi}</li>
                        <li>LED: {sanpham.cau_hinh.led}</li>
                        <li>Cảm biến: {sanpham.cau_hinh.cam_bien}</li>
                        <li>Số nút: {sanpham.cau_hinh.so_nut}</li>
                        <li>Tuổi thọ: {sanpham.cau_hinh.tuoi_tho}</li>
                        <li>DPI: {sanpham.cau_hinh.DPI}</li>
                        <li>IPS: {sanpham.cau_hinh.IPS}</li>
                        <li>Trọng lượng: {sanpham.cau_hinh.trong_luong}</li>
                      </ul>
                    )}
                    {sanpham.id_danhmuc === 5 && (
                      <ul>
                        <li>Kết nối: {sanpham.cau_hinh.ket_noi}</li>
                        <li>Switch: {sanpham.cau_hinh.switch}</li>
                        <li>Keycap: {sanpham.cau_hinh.keycap}</li>
                        <li>Tương thích: {sanpham.cau_hinh.tuong_thich}</li>
                        <li>Kích thước: {sanpham.cau_hinh.kich_thuoc}</li>
                        <li>Trọng lượng: {sanpham.cau_hinh.trong_luong}</li>
                      </ul>
                    )}
                    <p></p>
                  </div>
                  <div className="baohanh_detail">
                    <strong>Bảo hành: </strong>12 tháng
                  </div>
                </div>

                <div
                  className="item_info_detail gia_detail"
                  itemProp="offers"
                  itemScope=""
                  itemType="http://schema.org/Offer"
                >
                  <strong>
                    Giá bán (đã bao gồm VAT):
                    <span itemProp="price">{sanpham.gia_sp}</span>
                    <span itemProp="priceCurrency" content="VND">
                      VNĐ
                    </span>
                  </strong>
                  <link
                    itemProp="availability"
                    href="http://schema.org/InStock"
                  />
                </div>
                <div className="item_info_detail">
                  <div className="addthis_inline_share_toolbox" />
                </div>
              </div>

              <div className="chucnang_detail">
                <div className="yentam">
                  <div
                    className="css-zamej5"
                    style={{
                      boxSizing: "border-box",
                      margin: "0px 0px 0.5rem",
                      padding: 0,
                      borderStyle: "none",
                      borderWidth: 1,
                      borderColor: "unset",
                      opacity: 1,
                      textDecorationLine: "unset",
                      fontSize: 15,
                      lineHeight: 2,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: "unset",
                      maxWidth: "unset",
                      minWidth: "unset",
                      transition: "color 0.3s ease 0s",
                      fontFamily: "Roboto, sans-serif",
                    }}
                    type="subtitle"
                  >
                    <strong>Chính sách bán hàng</strong>
                  </div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      fontFamily: "Roboto, sans-serif",
                      fontSize: 14,
                    }}
                  >
                    <div style={{ boxSizing: "border-box" }}>
                      <div
                        className="css-15eranj"
                        style={{
                          boxSizing: "border-box",
                          display: "flex",
                          WebkitBoxAlign: "center",
                          alignItems: "center",
                          marginBottom: 8,
                          gap: 12,
                        }}
                      >
                        <div
                          className="css-1a6hohg"
                          height={24}
                          style={{
                            boxSizing: "border-box",
                            position: "relative",
                            display: "inline-block",
                            overflow: "hidden",
                            height: 24,
                            width: 24,
                            minWidth: 24,
                          }}
                          width={24}
                        >
                          <img
                            alt="Công ty TNHH Phát Triển Tin Học Sáng Tạo"
                            decoding="async"
                            loading="lazy"
                            src="https://lh3.googleusercontent.com/uvWBg1q90XtEWvHkWGDbDemjEaANJ_kX3NEfIywURPTMeaSZTORdttpehuFBNKpYiWQ3jHgito4ciCt9pEJIHH1V4IlPYoE=rw"
                            style={{
                              boxSizing: "border-box",
                              verticalAlign: "middle",
                              width: 24,
                              height: 24,
                            }}
                          />
                        </div>
                        <div
                          className="att-policy-content-0 css-9yb8e7"
                          style={{ boxSizing: "border-box" }}
                        >
                          <p style={{ boxSizing: "border-box", margin: 0 }}>
                            Miễn phí giao hàng cho đơn hàng từ 1 triệu&nbsp;
                            <a
                              href="https://stcom.vn/tin-tuc/chinh-sach-giao-hang-86.html"
                              style={{
                                boxSizing: "border-box",
                                color: "rgb(13, 110, 253)",
                              }}
                            >
                              Xem chi tiết
                            </a>
                          </p>
                        </div>
                      </div>
                      <div
                        className="css-15eranj"
                        style={{
                          boxSizing: "border-box",
                          display: "flex",
                          WebkitBoxAlign: "center",
                          alignItems: "center",
                          marginBottom: 8,
                          gap: 12,
                        }}
                      >
                        <div
                          className="css-1a6hohg"
                          height={24}
                          style={{
                            boxSizing: "border-box",
                            position: "relative",
                            display: "inline-block",
                            overflow: "hidden",
                            height: 24,
                            width: 24,
                            minWidth: 24,
                          }}
                          width={24}
                        >
                          <img
                            alt="Công ty TNHH Phát Triển Tin Học Sáng Tạo"
                            decoding="async"
                            loading="lazy"
                            src="https://lh3.googleusercontent.com/LT3jrA76x0rGqq9TmqrwY09FgyZfy0sjMxbS4PLFwUekIrCA9GlLF6EkiFuKKL711tFBT7f2JaUgKT3--To8zOW4kHxPPHs4=rw"
                            style={{
                              boxSizing: "border-box",
                              verticalAlign: "middle",
                              width: 24,
                              height: 24,
                            }}
                          />
                        </div>
                        <div
                          className="att-policy-content-1 css-9yb8e7"
                          style={{ boxSizing: "border-box" }}
                        >
                          <p style={{ boxSizing: "border-box", margin: 0 }}>
                            Cam kết hàng chính hãng 100%&nbsp;
                          </p>
                        </div>
                      </div>
                      <div
                        className="css-15eranj"
                        style={{
                          boxSizing: "border-box",
                          display: "flex",
                          WebkitBoxAlign: "center",
                          alignItems: "center",
                          marginBottom: 8,
                          gap: 12,
                        }}
                      >
                        <div
                          className="css-1a6hohg"
                          height={24}
                          style={{
                            boxSizing: "border-box",
                            position: "relative",
                            display: "inline-block",
                            overflow: "hidden",
                            height: 24,
                            width: 24,
                            minWidth: 24,
                          }}
                          width={24}
                        >
                          <img
                            alt="Công ty TNHH Phát Triển Tin Học Sáng Tạo"
                            decoding="async"
                            loading="lazy"
                            src="https://lh3.googleusercontent.com/TECKlw8DFChVXu_FAYdNjbCuaDVhmOhbqsKLnayhIgx5Pvv0EX051qHWJR7vUgxiUXN5heAlx4bIDYsoES7X8pby5Pn9LXWN=rw"
                            style={{
                              boxSizing: "border-box",
                              verticalAlign: "middle",
                              width: 24,
                              height: 24,
                            }}
                          />
                        </div>
                        <div
                          className="att-policy-content-2 css-9yb8e7"
                          style={{ boxSizing: "border-box" }}
                        >
                          <p style={{ boxSizing: "border-box", margin: 0 }}>
                            Đổi trả trong vòng 07 ngày&nbsp;&nbsp;
                            <a
                              href="https://stcom.vn/tin-tuc/chinh-sach-doi-tra-88.html"
                              style={{
                                color: "rgb(13, 110, 253)",
                                boxSizing: "border-box",
                              }}
                            >
                              Xem chi tiết
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  className="themgiohang add_giohang"
                  rel={7385}
                  data-confirm=""
                  onClick={() => handleAddToCart(sanpham)}
                >
                  Thêm vào gio hàng
                </a>

                {/* Thay thế phần popup cũ bằng popup mới */}
                {popupVisible && (
                  <div className="popup-overlay">
                    <div className="popup">
                      <button className="popup-close" onClick={handleClosePopup}>&times;</button>
                      <div className="popup-icon">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <div className="popup-title">
                        Đã thêm vào giỏ hàng
                      </div>
                      <div className="popup-buttons">
                        <button 
                          className="popup-button continue-shopping" 
                          onClick={handleContinueShopping}
                        >
                          Mua tiếp
                        </button>
                        <button 
                          className="popup-button view-cart" 
                          onClick={handleViewCart}
                        >
                          Đến giỏ hàng
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <a
                  onClick={() => handleBuyNow(sanpham)}
                  className="muangay mua_giohang"
                  rel={7385}
                  style={{ cursor: "pointer" }}
                >
                  Mua ngay
                </a>
                <div className="hotline_hotro">
                  <div className="title_hotline_hotro">Hỗ trợ mua hàng</div>
                  <div className="content_hotline_hotro">
                    <i className="call-num" />
                    <p>
                      0902 566 839
                      <br />
                      0903 359 388
                      <br />
                      0932 333 667
                      <br />
                    </p>
                    <div className="clear" />
                  </div>
                </div>
              </div>
              <div className="clear" />
            </div>
            <div className="bottom_detail">
              <div className="left_bottom_detail">
                <div className="contain_tab">
                  <a href="#thongsokythuat" className="item_tab active">
                    Thông số kỹ thuật
                  </a>

                  <div className="clear" />

                  <div id="thongsokythuat" className="content_tab active">
                    <div className="table-product-details">
                      <table
                        border={0}
                        cellPadding={0}
                        cellSpacing={0}
                        style={{
                          width: "867.5px",
                          borderCollapse: "collapse",
                          color: "rgb(34, 34, 34)",
                          fontFamily: "Roboto, sans-serif",
                          fontSize: 14,
                        }}
                      >
                        <tbody>
                          {sanpham.id_danhmuc === 1 && (
                            <>
                              <tbody>
                                <tr>
                                  <td>CPU</td>
                                  <td>{sanpham.cau_hinh.cpu}</td>
                                </tr>
                                <tr>
                                  <td>RAM</td>
                                  <td>{sanpham.cau_hinh.ram}</td>
                                </tr>
                                <tr>
                                  <td>Ổ cứng</td>
                                  <td>{sanpham.cau_hinh.o_cung}</td>
                                </tr>
                                <tr>
                                  <td>VGA</td>
                                  <td>{sanpham.cau_hinh.vga}</td>
                                </tr>
                                <tr>
                                  <td>Màn hình</td>
                                  <td>{sanpham.cau_hinh.man_hinh}</td>
                                </tr>
                                <tr>
                                  <td>Pin</td>
                                  <td>{sanpham.cau_hinh_chi_tiet.pin}</td>
                                </tr>
                                <tr>
                                  <td>Màu sắc</td>
                                  <td>{sanpham.cau_hinh_chi_tiet.mau_sac}</td>
                                </tr>
                                <tr>
                                  <td>Trọng lượng</td>
                                  <td>
                                    {sanpham.cau_hinh_chi_tiet.trong_luong}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Hệ điều hành</td>
                                  <td>
                                    {sanpham.cau_hinh_chi_tiet.he_dieu_hanh}
                                  </td>
                                </tr>
                              </tbody>
                            </>
                          )}

                          {sanpham.id_danhmuc === 2 && (
                            <>
                              <tbody>
                                <tr>
                                  <td>Mainboard</td>
                                  <td>{sanpham.cau_hinh.mainboard}</td>
                                </tr>
                                <tr>
                                  <td>HDD</td>
                                  <td>{sanpham.cau_hinh.hdd}</td>
                                </tr>
                                <tr>
                                  <td>SSD</td>
                                  <td>{sanpham.cau_hinh.ssd}</td>
                                </tr>
                                <tr>
                                  <td>PSU</td>
                                  <td>{sanpham.cau_hinh.psu}</td>
                                </tr>
                                <tr>
                                  <td>Case</td>
                                  <td>{sanpham.cau_hinh.case}</td>
                                </tr>
                                <tr>
                                  <td>Cooling</td>
                                  <td>{sanpham.cau_hinh.cooling}</td>
                                </tr>
                              </tbody>
                            </>
                          )}

                          {sanpham.id_danhmuc === 3 && (
                            <>
                              <tbody>
                                <tr>
                                  <td>Kiểu màn hình</td>
                                  <td>{sanpham.cau_hinh.kieu_man_hinh}</td>
                                </tr>
                                <tr>
                                  <td>Kch thước</td>
                                  <td>{sanpham.cau_hinh.kich_thuoc}</td>
                                </tr>
                                <tr>
                                  <td>Tương thích VESA</td>
                                  <td>{sanpham.cau_hinh.tuong_thich_vesa}</td>
                                </tr>
                                <tr>
                                  <td>Cổng kết nối</td>
                                  <td>{sanpham.cau_hinh.cong_ket_noi}</td>
                                </tr>
                                <tr>
                                  <td>Tần số quét</td>
                                  <td>{sanpham.cau_hinh.tan_so_quet}</td>
                                </tr>
                                <tr>
                                  <td>Độ phân giải</td>
                                  <td>{sanpham.cau_hinh.do_phan_giai}</td>
                                </tr>
                                <tr>
                                  <td>Tấm nền</td>
                                  <td>{sanpham.cau_hinh.tam_nen}</td>
                                </tr>
                                <tr>
                                  <td>Không gian màu</td>
                                  <td>{sanpham.cau_hinh.khong_gian_mau}</td>
                                </tr>
                                <tr>
                                  <td>Phụ kiện trong hộp</td>
                                  <td>
                                    {sanpham.cau_hinh.phu_kien_trong_hop ||
                                      "N/A"}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Thời gian phản hồi</td>
                                  <td>{sanpham.cau_hinh.thoi_gian_phan_hoi}</td>
                                </tr>
                                <tr>
                                  <td>Độ sáng</td>
                                  <td>{sanpham.cau_hinh.do_sang}</td>
                                </tr>
                              </tbody>
                            </>
                          )}

                          {sanpham.id_danhmuc === 4 && (
                            <>
                              <tbody>
                                <tr>
                                  <td>Màu sắc</td>
                                  <td>{sanpham.cau_hinh.mau_sac}</td>
                                </tr>
                                <tr>
                                  <td>Kết nối</td>
                                  <td>{sanpham.cau_hinh.ket_noi}</td>
                                </tr>
                                <tr>
                                  <td>LED</td>
                                  <td>{sanpham.cau_hinh.led}</td>
                                </tr>
                                <tr>
                                  <td>Cảm biến</td>
                                  <td>{sanpham.cau_hinh.cam_bien}</td>
                                </tr>
                                <tr>
                                  <td>Số nút</td>
                                  <td>{sanpham.cau_hinh.so_nut}</td>
                                </tr>
                                <tr>
                                  <td>Tuổi thọ</td>
                                  <td>{sanpham.cau_hinh.tuoi_tho}</td>
                                </tr>
                                <tr>
                                  <td>DPI</td>
                                  <td>{sanpham.cau_hinh.DPI}</td>
                                </tr>
                                <tr>
                                  <td>IPS</td>
                                  <td>{sanpham.cau_hinh.IPS}</td>
                                </tr>
                                <tr>
                                  <td>Trọng lượng</td>
                                  <td>{sanpham.cau_hinh.trong_luong}</td>
                                </tr>
                              </tbody>
                            </>
                          )}

                          {sanpham.id_danhmuc === 5 && (
                            <>
                              <tbody>
                                <tr>
                                  <td>Kết nối</td>
                                  <td>{sanpham.cau_hinh.ket_noi}</td>
                                </tr>
                                <tr>
                                  <td>Switch</td>
                                  <td>{sanpham.cau_hinh.switch}</td>
                                </tr>
                                <tr>
                                  <td>Keycap</td>
                                  <td>{sanpham.cau_hinh.keycap}</td>
                                </tr>
                                <tr>
                                  <td>Tương thích</td>
                                  <td>{sanpham.cau_hinh.tuong_thich}</td>
                                </tr>
                                <tr>
                                  <td>Kích thước</td>
                                  <td>{sanpham.cau_hinh.kich_thuoc}</td>
                                </tr>
                                <tr>
                                  <td>Trọng lượng</td>
                                  <td>{sanpham.cau_hinh.trong_luong}</td>
                                </tr>
                              </tbody>
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="clear" />
                  <div id="dacdiemnoibat" className="content_tab active">
                    <div className="text" />
                  </div>
                  <a href="#binhluan" className="item_tab active">
                    Bình luận/ Đánh giá sản phẩm
                  </a>
                  <div className="clear" />
                    <div id="binhluan" className="content_tab active">
                      <div className="comment-section">
                        {/* Comment Statistics */}
                        <div className="comment-stats">
                          <div className="stat-item">
                            <i className="fas fa-comments"></i>
                            <span className="stat-number">{comments.length}</span>
                            <span>Bình luận</span>
                          </div>
                          <div className="stat-item">
                            <i className="fas fa-star"></i>
                            <span className="stat-number">4.5</span>
                            <span>Đánh giá trung bình</span>
                          </div>
                        </div>

                        {/* Nút thêm bình luận */}
                        <button 
                          className="add-comment-btn"
                          onClick={() => setShowCommentForm(!showCommentForm)}
                        >
                          <i className="fas fa-plus"></i>
                          {showCommentForm ? 'Đóng bình luận' : 'Bình luận'}
                        </button>

                        {/* Comment Form */}
                        {showCommentForm && (
                          <div className="comment-form">
                            {user ? (
                              <>
                                <div className="comment-form-header">
                                  <span className="current-user">Đang bình luận với tên: <strong>{user.username}</strong></span>
                                </div>
                                <form onSubmit={handleSubmitComment}>
                                  <textarea 
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Viết bình luận của bạn..."
                                    disabled={loading}
                                    required
                                  />
                                  <button 
                                    type="submit"
                                    disabled={loading || !comment.trim()}
                                  >
                                    {loading ? 'Đang gửi...' : 'Gửi bình luận'}
                                  </button>
                                </form>
                              </>
                            ) : (
                              <div className="login-prompt">
                                <p>
                                  Vui lòng <span 
                                    onClick={handleLoginRedirect} 
                                    style={{ 
                                      color: '#007bff', 
                                      cursor: 'pointer', 
                                      textDecoration: 'underline'
                                    }}
                                  >
                                    đăng nhập
                                  </span> để bình luận
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Hiển thị lỗi nếu có */}
                        {error && (
                          <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
                            {error}
                          </div>
                        )}

                        {/* Comments List */}
                        <div className="comments-list">
                          {loading && <div>Đang tải bình luận...</div>}
                          {comments.slice(0, visibleComments).map((item) => (
                            <div key={item.id} className="comment-item">
                              <div className="comment-content">
                                <div className="comment-header">
                                  <span className="comment-author">{item.username}</span>
                                  <span className="comment-date">
                                    {new Date(item.time).toLocaleString()}
                                  </span>
                                </div>
                                <div className="comment-text">{item.comment}</div>
                                <div className="comment-actions">
                                  <span 
                                    className="comment-action"
                                    onClick={() => handleLike(item.id)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <i className="far fa-thumbs-up"></i>
                                    Thích ({item.like})
                                  </span>
                                  <span 
                                    className="comment-action"
                                    onClick={() => handleReply(item.id)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <i className="far fa-comment"></i>
                                    Trả lời
                                  </span>
                                  {/* Thêm nút xem phản hồi nếu có replies */}
                                  {item.replies && item.replies.length > 0 && (
                                    <span 
                                      className="comment-action view-replies"
                                      onClick={() => toggleReplies(item.id)}
                                      style={{ cursor: 'pointer' }}
                                    >
                                      <i className={`fas ${showReplies[item.id] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                      {showReplies[item.id] ? 'Ẩn phản hồi' : `Xem ${item.replies.length} phản hồi`}
                                    </span>
                                  )}
                                </div>

                                {/* Form trả lời */}
                                {replyingTo === item.id && (
                                  <div className="reply-form">
                                    <textarea
                                      value={replyContent}
                                      onChange={(e) => setReplyContent(e.target.value)}
                                      placeholder="Viết phản hồi của bạn..."
                                    />
                                    <div className="reply-actions">
                                      <button 
                                        onClick={() => handleSubmitReply(item.id)}
                                        disabled={!replyContent.trim()}
                                      >
                                        Gửi
                                      </button>
                                      <button onClick={() => {
                                        setReplyingTo(null);
                                        setReplyContent('');
                                      }}>
                                        Hủy
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {/* Hiển thị các phản hồi */}
                                {item.replies && item.replies.length > 0 && showReplies[item.id] && (
                                  <div className="replies-section">
                                    {item.replies.map((reply, index) => (
                                      <div key={index} className="reply-item">
                                        <div className="reply-header">
                                          <span className="reply-author">{reply.username}</span>
                                          <span className="reply-date">
                                            {new Date(reply.time).toLocaleString()}
                                          </span>
                                        </div>
                                        <div className="reply-text">{reply.content}</div>
                                        <div className="reply-actions">
                                          <span 
                                            className="reply-action"
                                            onClick={() => handleLike(item.id)}
                                            style={{ cursor: 'pointer' }}
                                          >
                                            <i className="far fa-thumbs-up"></i>
                                            Thích ({reply.like || 0})
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}

                          {/* Nút xem thêm/ẩn bớt bình luận */}
                          {comments.length > 4 && (
                            <div className="show-more-comments">
                              {!showAllComments ? (
                                <button 
                                  onClick={handleShowMoreComments}
                                  className="show-more-btn"
                                >
                                  <i className="far fa-comments"></i>
                                  Xem thêm {comments.length - visibleComments} bình luận khác
                                </button>
                              ) : (
                                <button 
                                  onClick={handleShowLessComments}
                                  className="show-less-btn"
                                >
                                  <i className="far fa-comments"></i>
                                  Ẩn bớt bình luận
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                  <div className="clear" />
                </div>
              </div>
              <div className="right_bottom_detail">
                <div className="title_right">Sản phẩm liên quan</div>
                <div className="content_right">
                  {relatedProducts.map((product) => (
                    <div key={product.id} className="item_sanpham">
                      <div className="img_sp">
                        <Link 
                         to={`/chitietsp/sanPham/${sanpham.id}`}
                          title={product.ten_sp}
                        >
                          <img
                            src={`/img/sanpham/${
                              product.id_danhmuc === 1 ? 'Laptop' :
                              product.id_danhmuc === 2 ? 'PC' :
                              product.id_danhmuc === 3 ? 'Manhinh' :
                              product.id_danhmuc === 4 ? 'Chuot' :
                              product.id_danhmuc === 5 ? 'Banphim' : 'Khac'
                            }/${product.hinh_anh.chinh}`}
                            alt={product.ten_sp}
                            className="mw100 trans03"
                          />
                        </Link>
                      </div>
                      <div className="nd_sp">
                        <h2>
                          <Link 
                            to={`/chitietsp/sanpham/${product.id}`} 
                            title={product.ten_sp}
                          >
                            {product.ten_sp}
                          </Link>
                        </h2>
                        <div className="gia_sp">
                          <span>{product.gia_sp} VNĐ</span>
                        </div>
                      </div>
                      <div className="clear" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sp_daxem">
          <div className="title_main">
            <span>Sản phẩm đã xem</span>
          </div>
          <div className="content_daxem">
            <div
              className="owl_daxem owl-carousel owl-theme"
              style={{ opacity: 1, display: "block" }}
            >
              <div className="owl-wrapper-outer">
                <div
                  className="owl-wrapper"
                  style={{
                    width: 520,
                    left: 0,
                    display: "block",
                    transition: "1000ms",
                    transform: "translate3d(0px, 0px, 0px)",
                  }}
                >
                  <div className="owl-item" style={{ width: 260 }}>
                    <div className="product">
                      <div className="box-product">
                        <div className="pic-product" data-tooltip="sticky7385">
                          <a
                            className="d-block"
                            href="san-pham/laptop-dell-vostro-3530-v5i3465w1-7385.html"
                            title={sanpham.ten_sp}
                          >
                            <img
                              src={`/img/sanpham/Laptop/${sanpham.hinh_anh.phu1}`}
                              alt={sanpham.ten_sp}
                              className="w100 trans03"
                            />
                          </a>
                          <div className="btntragop1" />
                          <div className="hot-icon blink" />
                          <div className="desc-product">
                            <div>
                              {/* <ul>
                                <li>{sanpham.cau_hinh.cpu}</li>
                                <li>{sanpham.cau_hinh.ram}</li>
                                <li>{sanpham.cau_hinh.ocung}</li>
                                <li>{sanpham.cau_hinh.vga}</li>
                                <li>{sanpham.cau_hinh.man_hinh}</li>
                                <li>{sanpham.cau_hinh_chi_tiet.pin}</li>
                                <li>{sanpham.cau_hinh_chi_tiet.mau_sac}</li>
                                <li>{sanpham.cau_hinh_chi_tiet.trong_luong}</li>
                                <li>
                                  {sanpham.cau_hinh_chi_tiet.he_dieu_hanh}
                                </li>
                              </ul> */}
                              <p>&nbsp;</p>
                              <div className="baohanh">Bảo hành: 12 tháng</div>
                            </div>
                          </div>
                        </div>
                        <div className="info-product">
                          <a
                            className="name-product text-split"
                            href="san-pham/laptop-dell-vostro-3530-v5i3465w1-7385.html"
                            title={`${sanpham.ten_sp}`}
                          >
                            {sanpham.ten_sp}
                          </a>
                          <div className="price-product">
                            <span className="price-new">
                              {" "}
                              {sanpham.gia_sp} đ
                            </span>
                          </div>
                          <div className="cart-product d-flex justify-content-between align-items-center">
                            <span className="status-pro sts2">Còn hàng</span>
                            <span
                              className="mua_giohang"
                              rel={7385}
                              data-confirm=""
                              onClick={() => handleAddToCart(sanpham)}
                            >
                              Mua ngay
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* chitietsanpham-container */}

      {/* Gallery Lightbox */}
      {showGallery && (
        <div className="gallery-overlay" onClick={() => setShowGallery(false)}>
          <div className="gallery-container" onClick={e => e.stopPropagation()}>
            <button className="gallery-close" onClick={() => setShowGallery(false)}>×</button>
            
            <div className="gallery-main">
              <button className="gallery-nav prev" onClick={prevImage}>‹</button>
              <div className="gallery-image-wrapper">
                <img 
                  src={allImages[currentImageIndex].src} 
                  alt={allImages[currentImageIndex].alt}
                  className="gallery-image"
                />
              </div>
              <button className="gallery-nav next" onClick={nextImage}>›</button>
            </div>

            <div className="gallery-thumbnails">
              {allImages.map((image, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={image.src} alt={image.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
