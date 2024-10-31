var express = require('express');
var router = express.Router();

/* GET users listing. */

//Hiển thị trang userMPage
router.get('/', function(req, res, next) {
  res.render('userPage');
});


module.exports = router;
