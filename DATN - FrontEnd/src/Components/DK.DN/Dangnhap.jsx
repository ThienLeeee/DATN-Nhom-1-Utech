import { Link } from 'react-router-dom';

export default function Dangnhap() {
    return (
        <>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                rel="stylesheet"
            />
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n    body {\n      background-color: #f7f7f7;\n    }\n    .login-container {\n      margin-top: 50px;\n    }\n    .login-card {\n      padding: 30px;\n      border-radius: 10px;\n      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);\n      background-color: #fff;\n    }\n    .social-btn {\n      width: 48%;\n    }\n    .footer-text {\n      text-align: center;\n      margin-top: 20px;\n    }\n    .footer-text a {\n      text-decoration: none;\n      color: #007bff;\n    }\n    .eye-icon {\n      position: absolute;\n      right: 10px;\n      top: 36px;\n      cursor: pointer;\n    }\n  "
                }}
            />
            <div className="container login-container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="login-card">
                            <h3 className="text-center mb-4">Đăng nhập</h3>
                            <form>
                                <div className="mb-3 position-relative">
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
                                <div className="mb-3 position-relative">
                                    <label htmlFor="password" className="form-label">
                                        Mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Mật khẩu"
                                    />
                                    <span className="eye-icon" onclick="togglePassword()">
                                        <img
                                            src="https://img.icons8.com/ios-filled/16/000000/visible.png"
                                            alt="Show Password"
                                        />
                                    </span>
                                </div>
                                <div className="text-end mb-3">
                                    <a href="#">Quên mật khẩu?</a>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Đăng nhập
                                </button>
                            </form>
                            <hr />
                            <div className="text-center mb-3">
                                Bạn chưa có tài khoản? <Link to="/Dangky">Đăng ký</Link>
                            </div>
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
                            <div className="footer-text mt-3">
                                Bạn đã có tài khoản? <a href="#">Đăng nhập!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Link Bootstrap JS */}
        </>
    )
}