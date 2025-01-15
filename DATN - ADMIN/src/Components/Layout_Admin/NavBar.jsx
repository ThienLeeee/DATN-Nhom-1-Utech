import { Link } from "react-router-dom";
import { useState } from "react";
import "../../style.css";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false); // State to handle sidebar visibility
  const [showStatistics, setShowStatistics] = useState(false);

  const handleStatisticsClick = () => {
    setShowStatistics((prevState) => !prevState);
  };  
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close sidebar when a menu item is clicked (mobile)
  const handleLinkClick = () => {
    setIsOpen(false); // Close the sidebar
  };

  return (
    <>
      {/* NavBar */}
      <div className="container-fluid">
        {/* Logo Section */}
        <div className="d-flex justify-content-between py-3">
          <Link to="/" className="text-decoration-none text-white">
            <h3>
              <span className="text-primary">U</span>
              <span>TECH</span>
            </h3>
          </Link>

          {/* Hamburger Menu (for mobile) */}
          <button
            className="navbar-toggler d-md-none"
            type="button"
            onClick={toggleSidebar}
            aria-controls="navbarNav"
            aria-expanded={isOpen ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <button
              className="navbar-toggler d-md-none"
              type="button"
              onClick={toggleSidebar}
              aria-controls="navbarNav"
              aria-expanded={isOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <i className="bi bi-list"></i>{" "}
              {/* Bootstrap Icon for three horizontal lines */}
            </button>
          </button>
        </div>

        {/* Sidebar Menu for Desktop */}
        <div className="d-none d-md-block">
        <div>
      <p onClick={handleStatisticsClick} style={{ cursor: "pointer" }}>
        <i className="bi bi-pie-chart-fill me-2" />
        <span className="text-decoration-none text-white">
          Quản lý thống kê
        </span>
      </p>

      {showStatistics && (
        <div>
          <p style={{ cursor: "pointer" }}>
            <i className="bi bi-cash-coin me-2"></i>
           <Link to='/Revenue' className="text-decoration-none text-white">
           Quản lí doanh thu
           </Link>
          </p>
          <p style={{ cursor: "pointer" }}>
            <i className="bi bi-plus-slash-minus me-2"></i>
            <Link to='/addproductquantity' className="text-decoration-none text-white">
            Quản lí Số lượng
            </Link>
            
          </p>
          <p style={{ cursor: "pointer" }}>
            <i className="bi bi-tag-fill me-2" />
            <Link to="/admin-sale" className="text-decoration-none text-white">
              Quản lý giảm giá
            </Link>
          </p>
          <p style={{ cursor: "pointer" }}>
            <i className="bi bi-ticket-perforated me-2" />
            <Link
              to="/admin-voucher"
              className="text-decoration-none text-white"
            >
              Quản lý voucher
            </Link>
          </p>
        </div>
      )}
    </div>
          <p>
            <i className="bi bi-tag-fill me-2" />
            <Link to="/admin-dm" className="text-decoration-none text-white">
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
            <Link to="/admin-dh" className="text-decoration-none text-white">
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
        </div>

        {/* Mobile Sidebar Menu */}
        <div
          className={`sidebar d-md-none ${isOpen ? "open" : ""}`}
          id="navbarNav"
        >
          <p>
            <i className="bi bi-pie-chart-fill me-2" />
            <Link
              to="/admin-thongke"
              className="text-decoration-none text-white"
              onClick={handleLinkClick}
            >
              Quản lý thống kê
            </Link>
          </p>
          <p>
            <i className="bi bi-tag-fill me-2" />
            <Link
              to="/admin-dm"
              className="text-decoration-none text-white"
              onClick={handleLinkClick}
            >
              Quản lý danh mục
            </Link>
          </p>
          <p>
            <i className="bi bi-box-seam me-2" />
            <Link
              to="/admin-sp"
              className="text-decoration-none text-white"
              onClick={handleLinkClick}
            >
              Quản lý sản phẩm
            </Link>
          </p>
          <p>
            <i className="bi bi-people-fill me-2" />
            <Link
              to="/admin-account"
              className="text-decoration-none text-white"
              onClick={handleLinkClick}
            >
              Quản lý người dùng
            </Link>
          </p>
          <p>
            <i className="bi bi-cart-fill me-2" />
            <Link
              to="/admin-bill"
              className="text-decoration-none text-white"
              onClick={handleLinkClick}
            >
              Quản lý đơn hàng
            </Link>
          </p>
          <p>
            <i className="bi bi-chat-left-text-fill me-2" />
            <Link
              to="/admin-comment"
              className="text-decoration-none text-white"
              onClick={handleLinkClick}
            >
              Quản lý bình luận
            </Link>
          </p>
        </div>
      </div>

      {/* CSS for Sidebar */}
    </>
  );
}
