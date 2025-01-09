import { useEffect, useState } from "react";
import { fetchSanpham } from "../../../service/sanphamService.js";
import Swal from 'sweetalert2';
import '../../style.css'

export default function AddProductQuantity(){
    const [sanPham, setSanpham] = useState([]);
    const [filteredCategoryId, setFilteredCategoryId] = useState(null);
    const [lockedCategories, setLockedCategories] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newQuantity, setNewQuantity] = useState('');
    const [showModal, setShowModal] = useState(false);
    const openModal = (product) => {
      setSelectedProduct(product);
      setNewQuantity(product.soluong);
      setShowModal(true);
  };
  
    const filteredItems = sanPham.filter((item) => {
        const isCategoryMatched = !filteredCategoryId || item.id_danhmuc === filteredCategoryId;
        const isNotLocked = !lockedCategories.includes(item.id_danhmuc);
        const isNameMatched = item.ten_sp.toLowerCase().includes(searchKeyword.toLowerCase());
        return isCategoryMatched && isNotLocked && isNameMatched;
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/danhMuc");
                const categoriesData = await response.json();
                setCategories(categoriesData);
  
                // Lấy danh sách danh mục bị khóa
                const locked = categoriesData.filter(category => category.locked).map(category => category.id);
                setLockedCategories(locked);
            } catch (error) {
                console.error("Lỗi khi fetch danh mục:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const loadSanpham = async () => {
            try {
                const sanPhamData = await fetchSanpham();
                setSanpham(sanPhamData);
            } catch (error) {
                console.error("Lỗi:", error);
            }
        };
        loadSanpham();
    }, []); 

    const updateQuantity = async () => {
      try {
          const quantityToAdd = parseInt(newQuantity) - selectedProduct.soluong;
  
          // Hiển thị cảnh báo xác nhận với SweetAlert
          const result = await Swal.fire({
              title: 'Xác nhận',
              text: `Bạn có muốn cập nhật thêm ${quantityToAdd} sản phẩm không?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Có',
              cancelButtonText: 'Không'
          });
  
          if (result.isConfirmed) {
              const response = await fetch("http://localhost:3000/api/addproductquantity", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                      productId: selectedProduct.id,
                      quantityToAdd // Đúng khóa để phù hợp với máy chủ
                  }),
              });
  
              if (response.ok) {
                  const updatedProduct = await response.json();
                  setSanpham((prevSanpham) =>
                      prevSanpham.map((item) =>
                          item.id === selectedProduct.id ? { ...item, soluong: updatedProduct.newQuantity, trang_thai: updatedProduct.newStatus } : item
                      )
                  );
                  Swal.fire("Thành công!", "Số lượng đã được cập nhật.", "success");
                  setShowModal(false);
              } else {
                  if (response.status === 404) {
                      throw new Error("API không tồn tại. Vui lòng kiểm tra URL.");
                  } else {
                      throw new Error("Cập nhật thất bại");
                  }
              }
          }
      } catch (error) {
          Swal.fire("Lỗi!", error.message, "error");
      }
  };
  
  
  

  return (
    <>
        <h1 className="text-center">Quản lý số lượng sản phẩm</h1>

        <div className="d-flex justify-content-between">
            <div className="my-3 d-flex align-items-center">
                <label className="me-2 fw-bold">Chọn danh mục: </label>
                <select
                    className="form-select"
                    style={{ width: 'auto' }}
                    onChange={(e) => setFilteredCategoryId(Number(e.target.value))}
                >
                    <option value="">Tất cả</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.tendm}
                        </option>
                    ))}
                </select>
            </div>
            <div className="my-3 d-flex align-items-center">
                <label className="me-2 fw-bold">Tìm kiếm: </label>
                <input
                    type="text"
                    className="form-control"
                    style={{ width: 'auto' }}
                    placeholder="Nhập tên sản phẩm..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
            </div>
        </div>

        <div className="table-responsive d-none d-md-block">
            <table className="table table-bordered m-2">
                <thead className="table-dark">
                    <tr>
                        <th className="text-center align-middle" scope="col">ID</th>
                        <th className="text-center align-middle" scope="col">Mã sản phẩm</th>
                        <th className="text-center align-middle" scope="col">Tên sản phẩm</th>
                        <th className="text-center align-middle" scope="col">Hình ảnh</th>
                        <th className="text-center align-middle" scope="col">Số lượng</th>
                        <th className="text-center align-middle" scope="col">Trạng thái</th>
                        <th className="text-center align-middle" scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((sanpham, index) => (
                            <tr key={index}>
                                <td className="align-middle">{sanpham.id}</td>
                                <td className="align-middle">{sanpham.ma_san_pham}</td>
                                <td className="align-middle">{sanpham.ten_sp}</td>
                                <td>
                                    <img
                                        src={`/img/sanpham/${sanpham.hinh_anh.chinh}`}
                                        style={{ width: "150px", height: "auto" }}
                                        alt={sanpham.ten_sp}
                                        className="w100 trans03"
                                    />
                                </td>
                                <td style={{textAlign:"center"}} className="align-middle">{sanpham.soluong}</td>
                                <td style={{textAlign:"center"}}  className="align-middle">{sanpham.trang_thai}</td>
                                <td style={{textAlign:"center"}}  className="align-middle">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => openModal(sanpham)}
                                    >
                                        Cập nhật
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">Không có sản phẩm nào</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        {showModal && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                    <h2>Cập nhật số lượng sản phẩm</h2>
     
                    <img src={`/img/sanpham/${selectedProduct.hinh_anh.chinh}`} alt={selectedProduct.ten_sp} className="w100 trans03" style={{ width: '150px', height: 'auto', marginLeft:'30px' }} />
                    <p> {selectedProduct.ten_sp}</p>
                    <p>Mã sản phẩm: {selectedProduct.ma_san_pham}</p>
                    <p>Số lượng hiện tại: {selectedProduct.soluong}</p>
                    <input 
                        type="number" 
                        value={newQuantity} 
                        onChange={(e) => setNewQuantity(e.target.value)} 
                        className="form-control" 
                    />
                    <button 
                        className="btn btn-success mt-3" 
                        onClick={updateQuantity}
                    >
                        Cập nhật
                    </button>
                </div>
            </div>
        )}
    </>
);

}
