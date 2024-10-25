    function submitFormR() {
        var username = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirm-password").value;
        
        var checkSubmitR = true;
        // Xóa thông báo trước khi kiểm tra các điều kiện
        document.getElementById("alert-username").innerText = "";
        document.getElementById("alert-email").innerText = "";
        document.getElementById("alert-password").innerText = "";
        document.getElementById("alert-password-length").innerText = "";
        document.getElementById("alert-password-special-character").innerText = "";
        document.getElementById("alert-password-number").innerText = "";
        document.getElementById("alert-confirm-password").innerText = "";
        
        if (username == "") {
            document.getElementById("alert-username").innerText = "*Vui lòng nhập họ.";
            checkSubmitR = false;
        } else if (isNaN(username) == false) {
            document.getElementById("alert-username").innerText = "*Không được nhập số";
            checkSubmitR = false;
        } else {
            document.getElementById("alert-username").innerText = "";
        }
        if (email == "") {
            document.getElementById("alert-email").innerText = "*Vui lòng nhập Email";
            checkSubmitR = false;
        } else if (!email.endsWith("@gmail.com")) {
            document.getElementById("alert-email").innerText = "*Địa chỉ email phải kết thúc bằng @gmail.com";
            checkSubmitR = false;
        } else {
            document.getElementById("alert-email").innerText = "";
        }

        if (password == "") {
            document.getElementById("alert-password").innerText = "*Vui lòng nhập mật khẩu";
            checkSubmitR = false;
        } else {
            // Kiểm tra điều kiện và xóa thông báo nếu điều kiện thỏa mãn
            if (password.length < 5) {
                document.getElementById("alert-password-length").innerText = "*Mật khẩu phải có 1->5 kí tự thường";
                checkSubmitR = false;
            } else {
                document.getElementById("alert-password-length").innerText = "";
            }

            if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
                document.getElementById("alert-password-special-character").innerText = "*Mật khẩu phải có ít nhất 1 kí tự đặc biệt";
                checkSubmitR = false;
            } else {
                document.getElementById("alert-password-special-character").innerText = "";
            }

            if ((password.match(/\d/g) || []).length < 8) {
                document.getElementById("alert-password-number").innerText = "*Mật khẩu phải ít nhất có 8 chữ số";
                checkSubmitR = false;
            } else {
                document.getElementById("alert-password-number").innerText = "";
            }

            if (confirmPassword == "") {
                document.getElementById("alert-confirm-password").innerText = "*Vui lòng nhập lại mật khẩu";
                checkSubmitR = false;
            } else if (confirmPassword !== password) {
                document.getElementById("alert-confirm-password").innerText = "*Mật khẩu không trùng khớp";
                checkSubmitR = false;
            } else {
                document.getElementById("alert-confirm-password").innerText = "";
            }
        }

        if (checkSubmitR) {
            var userData = {
                username: username,
                password: password,
                email: email,
            };
            localStorage.setItem('userData', JSON.stringify(userData));

            window.location.href = "http://localhost:3009/accounts/login";
        }

    }

    function TpToLogin() {
        window.location.href = "http://localhost:3009/accounts/login";
    }
