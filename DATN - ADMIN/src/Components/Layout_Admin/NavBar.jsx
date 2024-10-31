import { Link } from "react-router-dom";
export default function NavBar(){
    return (
        <>
         {/* NavBar */}
         <div>
          <Link to="/" className="text-decoration-none text-white">
            <h3 className="text-center">
              <span className="text-primary">U</span>
              <span>TECH</span>
            </h3>
          </Link>
          <hr />
          <p>
            <i className="bi bi-pie-chart-fill me-2" />
            <Link
              to="/admin-thonge"
              className="text-decoration-none text-white"
              
            >
              Quản lý thống kê
            </Link>
          </p>
          <p>
            <i className="bi bi-tag-fill me-2" />
            <Link
              to="/admin-dm"
              className="text-decoration-none text-white"
            
            >
              Quản lý danh mục
            </Link>
          </p>
          <p>
            <i className="bi bi-box-seam me-2" />
            <Link to="/admin-sp" className="text-decoration-none text-white">
              Quản lý sản phẩm
            </Link>
          </p>
          <p>
            <i className="bi bi-people-fill me-2" />
            <Link
              to="/admin-account"
              className="text-decoration-none text-white"
            >
              Quản lý người dùng
            </Link>
          </p>
          <p>
            <i className="bi bi-cart-fill me-2" />
            <Link to="/admin-bill" className="text-decoration-none text-white">
              Quản lý đơn hàng
            </Link>
          </p>
          <p>
            <i className="bi bi-chat-left-text-fill me-2" />
            <Link
              to="/admin-comment"
              className="text-decoration-none text-white"
            >
              Quản lý bình luận
            </Link>
          </p>
          <hr />
          <div className="text-center">
            <Link to="http://localhost:5173/" className="btn btn-primary">
              Đăng xuất
            </Link>
          </div>
        </div>
        {/* NavBar end*/}
        </>
    )
}