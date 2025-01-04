import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '/public/css/yeuthich.css';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Yeuthich = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            toast.warning('Vui lòng đăng nhập để xem danh sách yêu thích!');
            localStorage.setItem('previousPath', '/yeuthich');
            navigate('/dangnhap');
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchWishlist = async () => {
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:3000/api/wishlist/${user.username}`);
                    setWishlist(response.data);
                } catch (error) {
                    console.error('Lỗi khi lấy danh sách yêu thích:', error);
                }
            }
        };
        
        fetchWishlist();
    }, [user]);

    if (!user) {
        return null;
    }

    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    const [showConfirm, setShowConfirm] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const removeFromWishlist = async (productId) => {
        try {
            await axios.delete('http://localhost:3000/api/wishlist/remove', {
                data: {
                    username: user.username,
                    productId
                }
            });

            const newWishlist = wishlist.filter(item => item.id !== productId);
            setWishlist(newWishlist);
            toast.success('Đã xóa sản phẩm khỏi danh sách yêu thích!');
            setShowConfirm(false);
            setProductToDelete(null);
        } catch (error) {
            console.error('Lỗi khi xóa khỏi danh sách yêu thích:', error);
            toast.error('Có lỗi xảy ra khi xóa sản phẩm khỏi danh sách yêu thích!');
        }
    };

    const handleShowConfirm = (product) => {
        setProductToDelete(product);
        setShowConfirm(true);
    };

    const handleAddToCart = (sanPhamMoi) => {
        let cartItems = JSON.parse(localStorage.getItem("cartItem")) || [];
        const itemIndex = cartItems.findIndex((item) => item.id === sanPhamMoi.id);
    
        if (itemIndex > -1) {
            cartItems[itemIndex].quantity += 1;
        } else {
            cartItems.push({ ...sanPhamMoi, quantity: 1 });
        }
    
        localStorage.setItem("cartItem", JSON.stringify(cartItems));
        window.dispatchEvent(new Event("cartUpdated"));
        toast.success('Đã thêm sản phẩm vào giỏ hàng!');
    };

    return (
        <div className="container" style={{ paddingTop: '40px', paddingBottom: '2rem' }}>
            <div className="wishlist-container">
                <div className="wishlist-header mb-4">
                    <div className="d-flex align-items-center justify-content-between">
                        <h2 className="section-title">
                            <i className="fas fa-heart me-2" style={{ color: '#ff4444' }}></i>
                            Danh sách yêu thích
                            <span className="ms-2 text-muted" style={{ fontSize: '20px', fontWeight: 'normal' }}>
                                ({wishlist.length})
                            </span>
                        </h2>
                        <Link 
                            to="/" 
                            className="btn btn-light"
                            style={{
                                padding: '8px 20px',
                                borderRadius: '25px',
                                border: '2px solid #e0e0e0',
                                backgroundColor: 'white',
                                color: '#666',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#f8f9fa';
                                e.currentTarget.style.borderColor = '#dee2e6';
                                e.currentTarget.style.color = '#333';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = 'white';
                                e.currentTarget.style.borderColor = '#e0e0e0';
                                e.currentTarget.style.color = '#666';
                            }}
                        >
                            <i className="fas fa-arrow-left" style={{ fontSize: '12px' }}></i>
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                    <div className="section-divider"></div>
                </div>

                {wishlist.length === 0 ? (
                    <div className="empty-wishlist text-center py-4">
                        <div className="empty-wishlist-icon mb-3">
                            <i className="fas fa-heart-broken" style={{
                                fontSize: '50px',
                                color: '#dee2e6'
                            }}></i>
                        </div>
                        <h3 className="mb-3">Danh sách yêu thích trống</h3>
                        <p className="text-muted mb-4">Hãy thêm những sản phẩm bạn yêu thích vào đây</p>
                        <Link to="/" className="btn btn-primary">
                            Khám phá sản phẩm
                        </Link>
                    </div>
                ) : (
                    <div className="wishlist-items">
                        {wishlist.map((sanpham) => (
                            <div className="wishlist-item" key={sanpham.id}>
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <div className="wishlist-item-image">
                                            <img
                                                src={`/img/sanpham/${sanpham.hinh_anh.chinh}`}
                                                alt={sanpham.ten_sp}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="wishlist-item-content">
                                            <h3 className="wishlist-item-title">
                                                <Link to={`/chitietsp/sanPham/${sanpham.id}`}>
                                                    {sanpham.ten_sp}
                                                </Link>
                                            </h3>
                                            <div className="wishlist-item-brand">
                                                <span className="text-muted">Thương hiệu: </span>
                                                {sanpham.thuong_hieu}
                                            </div>
                                            <div className="wishlist-item-price">
                                                {sanpham.gia_sp.toLocaleString('vi-VN')}đ
                                            </div>
                                            <div className="wishlist-item-actions">
                                                <Link 
                                                    to={`/chitietsp/sanPham/${sanpham.id}`}
                                                    className="btn btn-outline-primary btn-sm"
                                                >
                                                    <i className="fas fa-info-circle me-1"></i>
                                                    Chi tiết
                                                </Link>
                                                {/* <button 
                                                    onClick={() => handleAddToCart(sanpham)}
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    <i className="fas fa-shopping-cart me-1"></i>
                                                    Thêm vào giỏ
                                                </button> */}
                                                <button 
                                                    onClick={() => handleShowConfirm(sanpham)}
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    <i className="fas fa-trash me-1"></i>
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showConfirm && (
                <div className="modal show d-block" style={{ 
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1050
                }}>
                    <div className="modal-dialog" style={{
                        maxWidth: '450px',
                        width: '90%',
                        margin: '0',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        animation: 'modalFadeIn 0.3s ease'
                    }}>
                        <div className="modal-content" style={{
                            borderRadius: '20px',
                            border: 'none',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                            overflow: 'hidden'
                        }}>
                            <div className="modal-body text-center" style={{
                                padding: '30px',
                                fontSize: '16px',
                                color: '#666'
                            }}>
                                <p className="mb-4">
                                    Bạn có chắc chắn muốn xóa sản phẩm<br/>
                                    "<span style={{ 
                                        fontWeight: '600', 
                                        color: '#333',
                                        wordBreak: 'break-word'
                                    }}>{productToDelete?.ten_sp}</span>"<br/>
                                    khỏi <span style={{ color: '#ff4444', fontWeight: '500' }}>danh sách yêu thích</span>?
                                </p>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '15px'
                                }}>
                                    <button 
                                        type="button" 
                                        className="btn btn-light"
                                        style={{
                                            padding: '10px 30px',
                                            borderRadius: '10px',
                                            border: '2px solid #dee2e6',
                                            fontSize: '15px',
                                            fontWeight: '500',
                                            transition: 'all 0.2s',
                                            minWidth: '120px'
                                        }}
                                        onClick={() => {
                                            setShowConfirm(false);
                                            setProductToDelete(null);
                                        }}
                                    >
                                        Hủy
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-danger"
                                        style={{
                                            padding: '10px 30px',
                                            borderRadius: '10px',
                                            fontSize: '15px',
                                            fontWeight: '500',
                                            transition: 'all 0.2s',
                                            backgroundColor: '#dc3545',
                                            border: 'none',
                                            minWidth: '120px'
                                        }}
                                        onClick={() => removeFromWishlist(productToDelete.id)}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Yeuthich;
