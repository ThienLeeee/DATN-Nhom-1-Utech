function submitFormL () {
  var username = document.getElementById('username').value
  var password = document.getElementById('password').value

  var storedUserData = JSON.parse(localStorage.getItem('userData'))
  var checkSubmitL = true
  if (storedUserData) {
    if (username === '') {
      document.getElementById('alert-username').innerText =
        '*Vui lòng nhập tài khoản.'
      var checkSubmitL = false
    } else if (
      username === storedUserData.email ||
      username === storedUserData.username
    ) {
      document.getElementById('alert-username').innerText = ''
    } else if (username === 'admin') {
      document.getElementById('alert-username').innerText = ''
    } else {
      document.getElementById('alert-username').innerText =
        '*Tài khoản không tồn tại.'
      var checkSubmitL = false
    }

    if (password === '') {
      document.getElementById('alert-password').innerText =
        '*Vui lòng nhập mật khẩu.'
      var checkSubmitL = false
    } else if (password === storedUserData.password) {
      document.getElementById('alert-password').innerText = ''
    } else if (password === '123456') {
      document.getElementById('alert-password').innerText = ''
    } else {
      document.getElementById('alert-password').innerText =
        '*Mật khẩu không tồn tại'
      var checkSubmitL = false
    }
  }

  if (checkSubmitL === true) {
    window.location.href = 'http://localhost:3009/user'
  }
  if (username === 'admin' && password === '123456') {
    // Chuyển hướng đến trang admin
    window.location.href = 'http://localhost:3009/admin'
  }
}

function TpToRegister () {
  window.location.href = 'http://localhost:3009/accounts/register'
}
