import { Link } from 'react-router-dom';
export default function Dangky() {
    return (
        <>
        <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n    body {\n      background-color: #f7f7f7;\n    }\n    .register-container {\n      margin-top: 50px;\n    }\n    .register-card {\n      padding: 30px;\n      border-radius: 10px;\n      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);\n      background-color: #fff;\n    }\n    .social-btn {\n      width: 48%;\n    }\n    .footer-text {\n      text-align: center;\n      margin-top: 20px;\n    }\n    .footer-text a {\n      text-decoration: none;\n      color: #007bff;\n    }\n  "
    }}
  />
  <div className="container register-container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="register-card">
          <h3 className="text-center mb-4">Đăng ký tài khoản</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="fullname" className="form-label">
                Họ và tên
              </label>
              <input
                type="text"
                className="form-control"
                id="fullname"
                placeholder="Họ và tên"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Mật khẩu"
              />
            </div>
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="promo" />
              <label className="form-check-label" htmlFor="promo">
                Đăng ký nhận tin khuyến mãi qua Email
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Tạo tài khoản
            </button>
          </form>
          <hr />
          <div className="text-center mb-3">Hoặc đăng ký bằng</div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-danger social-btn">
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google Icon"
              />{" "}
              Google
            </button>
            <button className="btn btn-primary social-btn">
              <img
                src="https://img.icons8.com/color/16/000000/facebook-new.png"
                alt="Facebook Icon"
              />{" "}
              Facebook
            </button>
          </div>
          <div className="text-center mb-3">
                Bạn đã có tài khoản?<Link to="/Dangnhap">Đăng Nhập</Link>
            </div>
        </div>
      </div>
    </div>
  </div>
  {/* Link Bootstrap JS */}
        </>)
}