import { useEffect, useState } from "react";
import { fetchSanpham } from "../../../service/sanphamService.js";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import '../../style.css'
export default function AddProductQuantity(){
    const [sanPham, setSanpham] = useState([]);
     const [filteredCategoryId, setFilteredCategoryId] = useState(null);
   const [lockedCategories, setLockedCategories] = useState([]);
   const [searchKeyword, setSearchKeyword] = useState('');
   const [categories, setCategories] = useState([]);
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
     const increaseQuantity = async (id) => {
        try {
          const response = await fetch("http://localhost:3000/api/addproductquantity", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productId: id,
              quantityToAdd: 1,  // Add 1 to the quantity (you can change this value as needed)
            }),
          });
    
          if (response.ok) {
            const updatedProduct = await response.json();
            setSanpham((prevSanpham) =>
              prevSanpham.map((item) =>
                item.id === id ? { ...item, soluong: updatedProduct.newQuantity } : item
              )
            );
            Swal.fire("Thành công!", "Số lượng đã được cập nhật.", "success");
          } else {
            throw new Error("Cập nhật thất bại");
          }
        } catch (error) {
          Swal.fire("Lỗi!", error.message, "error");
        }
      };
      
     return(
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
    
        {/* Bảng dành cho desktop */}
        <div className="table-responsive d-none d-md-block">
          <table className="table table-bordered m-2">
            <thead className="table-dark">
              <tr>
                <th className="text-center align-middle " scope="col">ID</th>
                <th className="text-center align-middle " scope="col">Mã sản phẩm</th>
                <th className="text-center align-middle " scope="col">Tên sản phẩm</th>
                <th className="text-center align-middle " scope="col">Hình ảnh</th>
                <th className="text-center align-middle " scope="col">Số lượng</th>
                <th className="text-center align-middle " scope="col">Trạng thái</th>
              </tr>
            </thead>
            
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((sanpham, index) => {
                
                  return (
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
        
                      <td className="align-middle">
                      <div className="d-flex align-items-center justify-content-center">
                        <button
                        
                          className="btn btn-danger btn-sm mx-1"
                          disabled={sanpham.soluong <= 0} // Disable if quantity is 0
                        >
                          -
                        </button>
                        {sanpham.soluong}
                        <button
                          onClick={() => increaseQuantity(sanpham.id)}
                          className="btn btn-success btn-sm mx-1"
                        >
                          +
                        </button>
                      </div>
                    </td>
                      
                      <td className="align-middle">còn hàng</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">Không có sản phẩm nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
    
        {/* Slider dành cho mobile */}
        <div className="slider-container d-md-none">
          {filteredItems.length > 0 ? (
            filteredItems.map((sanpham, index) => {
           
              return (
                <div key={index} className="product-card">
                  <img
                    src={`/img/sanpham/${sanpham.hinh_anh.chinh}`}
                    alt={sanpham.ten_sp}
                    className="product-img"
                  />
                  <div className="product-details">
                    <h5>{sanpham.ten_sp}</h5>
                    <p><strong>Giá:</strong> {sanpham.gia_sp}</p>                
                    <p className="align-middle">
                      <div className="d-flex align-items-center justify-content-center">
                        <button
                        
                          className="btn btn-danger btn-sm mx-1"
                          disabled={sanpham.soluong <= 0} // Disable if quantity is 0
                        >
                          -
                        </button>
                        {sanpham.soluong}
                        <button
                          onClick={() => increaseQuantity(sanpham.id)}
                          className="btn btn-success btn-sm mx-1"
                        >
                          +
                        </button>
                      </div>
                    </p>
                  
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center">Không có sản phẩm nào</div>
          )}
        </div>
      </>
    )
}