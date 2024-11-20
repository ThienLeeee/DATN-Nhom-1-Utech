import "/public/css/gioithieu.css";

export default function Gioithieu() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Giới thiệu</h1>
        <div className="header-line"></div>
      </div>

      <div className="about-content">
        <div className="company-intro">
          <div className="section-title">
            <h2>GIỚI THIỆU CHUNG</h2>
          </div>
          
          <div className="company-info">
            <div className="info-item">
              <i className="fas fa-building"></i>
              <div>
                <h3>Tên Đăng Ký</h3>
                <p>CÔNG TY TNHH PHÁT TRIỂN TIN UTECH</p>
              </div>
            </div>

            <div className="info-item">
              <i className="fas fa-file-alt"></i>
              <div>
                <h3>Giấy phép kinh doanh</h3>
                <p>0313929826 do Sở KH ĐT TP HCM Cấp ngày 1/10/2024</p>
              </div>
            </div>

            <div className="info-item">
              <i className="fas fa-phone-alt"></i>
              <div>
                <h3>Liên hệ</h3>
                <p>0822104408 - 0906733731</p>
              </div>
            </div>
          </div>

          <div className="company-description">
            <p>
              <strong>Utech utechcom.vn</strong> trãi qua trên 10 năm hoạt động kinh doanh và phát triển, 
              đã và đang hoàn thiện bằng tất cả nỗ lực và uy tín về chất lượng sản phẩm hàng hoá, 
              dịch vụ đến với người tiêu dùng.
            </p>
            
            <div className="business-highlight">
              <span className="highlight-text">BÁN LẺ - GIÁ SỈ</span>
              <p>Nhằm đảm bảo được tất cả các sản phẩm đều đến được với tất cả người tiêu dùng cuối.</p>
            </div>

            <p className="mission">
              <strong>Phương châm:</strong>
              <span>&ldquo;Cung cấp sản phẩm, dịch vụ tốt nhất với giá cả cạnh tranh nhất&rdquo;</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}