import "/public/css/lienhe.css";

export default function LienHe() {
  return (
    <div className="lh-container">
      <div className="lh-header">
        <h1>Liên Hệ Với Chúng Tôi</h1>
        <p>Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn sớm nhất</p>
      </div>

      <div className="lh-content">
        <div className="lh-info">
          <div className="lh-company-details">
            <h2>CÔNG TY TNHH PHÁT TRIỂN TIN HỌC UTECH</h2>
            
            <div className="lh-info-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Địa chỉ</h3>
                <p>168 Nguyễn Thiện Thuật, P.3, Q.3, TP.HCM</p>
              </div>
            </div>

            <div className="lh-info-item">
              <i className="fas fa-phone-alt"></i>
              <div>
                <h3>Điện thoại</h3>
                <p>028.38 333 667 - 0902 566 839</p>
              </div>
            </div>

            <div className="lh-info-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>utechq3@utech.vn</p>
              </div>
            </div>

            <div className="lh-info-item">
              <i className="fas fa-globe"></i>
              <div>
                <h3>Website</h3>
                <p>www.utech.vn</p>
              </div>
            </div>
          </div>

          <div className="lh-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.8895725879721!2d106.67897782918193!3d10.768485417008739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1f7e1f2e2b%3A0x498d49239394d0e0!2zQ8O0bmcgVHkgVG5oaCBQaMOhdCBUcmnhu4NuIFRpbiBI4buNYyBTw6FuZyBU4bqhbw!5e0!3m2!1svi!2s!4v1591065269455!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>

        <div className="lh-form">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="lh-form-group">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Họ và tên" required />
            </div>

            <div className="lh-form-group">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" required />
            </div>

            <div className="lh-form-group">
              <i className="fas fa-phone"></i>
              <input type="tel" placeholder="Số điện thoại" required />
            </div>

            <div className="lh-form-group">
              <i className="fas fa-heading"></i>
              <input type="text" placeholder="Tiêu đề" required />
            </div>

            <div className="lh-form-group">
              <i className="fas fa-comment-alt"></i>
              <textarea placeholder="Nội dung tin nhắn" rows="5" required></textarea>
            </div>

            <div className="lh-form-buttons">
              <button type="submit" className="lh-btn-submit">
                <i className="fas fa-paper-plane"></i> Gửi tin nhắn
              </button>
              <button type="reset" className="lh-btn-reset">
                <i className="fas fa-redo"></i> Làm lại
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}