var express = require('express');
const nodemailer=require('nodemailer');
var router = express.Router();
const axios = require('axios');
//Gọi thư viện bcryptjs
const bcrypt = require('bcryptjs')
const crypto = require('crypto');
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({extended:true,limit: '50mb'}));
//Gọi thư viện để sử ;
// dụng đc token
const jwt = require('jsonwebtoken')

//Thiết lập nơi lưu trữ và tên file
const multer = require('multer')

//Thực hiện gọi đến model db
const connectDb = require('../models/db')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

//Kiểm tra file upload
function checkFileUpLoad (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Bạn chỉ được upload file ảnh'))
  }
  cb(null, true)
}
//Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad })
var Email_User='tranhieu78295@gmail.com';
var Email_Pass='ildlmfklvdsvgluu'
const sendMail=async({
  email,
  subject,
  html
})=>{
const transporter= nodemailer.createTransport({
  host:'smtp.gmail.com',
  service:"Gmail",
  auth:{
    user:Email_User,
    pass:Email_Pass
  }
})
const message={
  from:`'Shop utech'<${Email_User}>`,
  to:email,
  subject:subject,
  html:html
}
const result=await transporter.sendMail(message)
return result;
};


var accessKey = 'F8BBA842ECF85';
var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
router.post('/payment', async (req, res) => {
  // Get data from frontend request
  const { amount, orderInfo, redirectUrl, ipnUrl } = req.body;

  if (!amount || !orderInfo || !redirectUrl || !ipnUrl) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Parameters
  var partnerCode = 'MOMO';
  var requestType = "payWithMethod";
  // var ipnUrl='https://3d31-2402-800-6341-34da-59a9-b6c1-418d-8659.ngrok-free.app/api/callback';
  var orderId = partnerCode + new Date().getTime();
  var requestId = orderId;
  var extraData = '';
  var orderGroupId = '';
  var autoCapture = true;
  var lang = 'vi';

  // Generate raw signature
  var rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);

  // Generate signature
  var signature = crypto.createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);

  // JSON object to send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature
  });

  // Options for axios
  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      'Content-Type': 'application/json',
      'Content-length': Buffer.byteLength(requestBody)
    },
    data: requestBody
  };

  try {
    const result = await axios(options);
    return res.status(200).json(result.data);
  } catch (error) {
    console.error("Error:", error.message || error);
    return res.status(500).json({
      statusCode: 500,
      message: "Server error"
    });
  }
});

router.post("/callback", async (req, res) => {
  const { orderId, resultCode } = req.body;

  try {
    // Kiểm tra đơn hàng dựa trên `orderId`
    const existingOrder = await Order.findOne({ orderId });

    if (existingOrder) {
      console.log(`Đơn hàng ${orderId} đã được xử lý.`);
      return res.status(200).json({ message: "Đơn hàng đã tồn tại." });
    }

    if (resultCode === 0) {
      // Tạo đơn hàng mới nếu thanh toán thành công
      const newOrder = new Order({
        ...req.body, // Hoặc map các trường cần thiết
        status: "Đã thanh toán",
        createdAt: new Date(),
      });

      await newOrder.save();
      console.log(`Đơn hàng ${orderId} được tạo thành công.`);
      return res.status(200).json({ message: "Đơn hàng xử lý thành công." });
    } else {
      console.error(`Thanh toán thất bại: ${req.body}`);
      return res.status(400).json({ message: "Thanh toán thất bại." });
    }
  } catch (error) {
    console.error("Lỗi callback:", error);
    return res.status(500).json({ message: "Lỗi xử lý callback." });
  }
});


router.post("/transaction-status",async(req,res)=>{
  const{orderId}=req.body;
  const rawSignature=`accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`

  const signature=crypto
          .createHmac("sha256",secretKey)
          .update(rawSignature)
          .digest('hex');
  const requestBody = JSON.stringify({
          partnerCode:"MOMO",
          requestId:orderId,
          orderId,
          signature,
          lang:'vi'
        }) 
  //options for axios
  const options={
    method: "POST",
    url: 'https://test-payment.momo.vn/v2/gateway/api/query',
    headers: {
      'Content-Type': "application/json"
    },
    data: requestBody
  }          
  let result = await axios(options);
  return res.status(200).json(result.data);   
})

//show danh mục
router.get('/danhMuc', async (req, res, next) => {
  const db = await connectDb()
  const danhMucCollection = db.collection('danhMuc')
  const danhMuc = await danhMucCollection.find().toArray()
  if (danhMuc) {
    res.status(200).json(danhMuc)
  } else {
    res.status(404).json({ message: 'Không tìm thấy danh mục !' })
  }
})

//Hiển thị 1 danh mục theo id
router.get('/danhMuc/:id', async (req, res, next) => {
  let id = req.params.id
  const db = await connectDb()
  const danhMucCollection = db.collection('danhMuc')
  const danhmuc = await danhMucCollection.findOne({ id: parseInt(id) })
  if (danhmuc) {
    res.status(200).json(danhmuc)
  } else {
    res.status(404).json({ message: 'Không tìm thấy danh mục !' })
  }
})

//lock
router.put('/danhMuc/lock/:id', async (req, res) => {
  const { id } = req.params;
  const db = await connectDb();
  const danhMucCollection = db.collection('danhMuc');
  const category = await danhMucCollection.findOne({ id: parseInt(id) });

  if (category) {
    const updatedCategory = await danhMucCollection.updateOne(
      { id: parseInt(id) },
      { $set: { locked: !category.locked } }
    );
    res.status(200).json(updatedCategory);
  } else {
    res.status(404).json({ message: 'Danh mục không tồn tại!' });
  }
});

//Chức năng thêm danh mục
// router.post('/categories', upload.single('img'), async(req, res,next) => {
//   const db = await connectDb();
//   const categoriesCollection = db.collection('categories');
//   let {name} = req.body;
//   let img = req.file.originalname;
//   let lastCategory = await categoriesCollection.find().sort({id:-1}).limit(1).toArray();
//   let id = lastCategory[0] ? lastCategory[0].id + 1 :1;
//   let newCategory={id,name,img};
//   await categoriesCollection.insertOne(newCategory);
//   if(newCategory){
//     res.status(200).json(newCategory);
//   }else{
//     res.status(404).json({message:"Add category not successful"})
//   }
// })

//Chức năng thêm danh mục
router.post('/danhMuc', upload.single('hinhanh'), async (req, res) => {
  const db = await connectDb();
  const categoriesCollection = db.collection('danhMuc');
  // Extract data from the request body
  const { tendm } = req.body;
  const fileName = req.file ? req.file.filename : null;
  // Kiểm tra nếu thiếu tên danh mục
  if (!tendm) {
    return res.status(400).json({ message: 'Tên danh mục là bắt buộc.' });
  }
  try {
    // Lấy danh mục có `id` lớn nhất để tăng `id` lên 1 cho danh mục mới
    const lastCategory = await categoriesCollection
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray();
    const id = lastCategory[0] ? lastCategory[0].id + 1 : 1;
    // Tạo đối tượng danh mục mới
    const newCategory = { id, tendm, hinhanh: fileName };
    // Thêm danh mục vào cơ sở dữ liệu
    await categoriesCollection.insertOne(newCategory);
    // Phản hồi thành công
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Thêm danh mục không thành công', error });
  }
});


//Sửa danh mục
router.put("/danhMuc/:id", upload.single("hinhanh"), async (req, res) => {
  const id = req.params.id; // id là string
  const db = await connectDb();
  const danhMucCollection = db.collection('danhMuc');
let {tendm}=req.body;
let hinhanh = {};
if (req.file) {
    hinhanh = req.file.originalname; // Lưu tên hình ảnh mới
} else {
    let category = await danhMucCollection.findOne({ id: parseInt(id) });
    hinhanh= category.hinhanh; // Giữ lại hình ảnh cũ nếu không có hình ảnh mới
}
let editCategory={
  tendm,
  hinhanh
};
const result = await danhMucCollection.updateOne(
  { id: parseInt(id) },
  { $set: editCategory }
);
if (result.matchedCount === 0) {
  return res.status(404).json({ message: 'Không tìm thấy sản phẩm để cập nhật.' });
}

if (result.modifiedCount > 0) {
  res.status(200).json(editCategory);
} else {
  res.status(404).json({ message: 'Sửa sản phẩm không thành công hoặc không có thay đổi nào.' });
}
});

//xóa danh mục
// Assuming `connectDb` is a function that connects to your MongoDB
router.delete('/danhMuc/:id', async (req, res) => {
  const id = parseInt(req.params.id); // Chuyển id sang số nguyên
  const db = await connectDb();
  const categoriesCollection = db.collection('danhMuc');
  const sanPhamCollection = db.collection('sanPham'); // Bộ sưu tập sản phẩm, thay thế nếu cần

  try {
    // Kiểm tra xem danh mục có sản phẩm nào liên quan không
    const hasProducts = await sanPhamCollection.findOne({ id_danhmuc: id });
    console.log("ID cần xóa:", id);
    console.log("Danh mục có sản phẩm liên quan:", hasProducts);

    if (hasProducts) {
      return res.status(400).json({ message: 'Không thể xóa danh mục vì có chưa sản phẩm' });
    }

    // Xóa danh mục nếu không có sản phẩm liên quan
    const result = await categoriesCollection.deleteOne({ id });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Xóa thành công' });
    } else {
      res.status(404).json({ message: 'Danh mục không tồn tại' });
    }
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ message: 'Lỗi khi xóa danh mục' });
  }
});


module.exports = router;


//show sp
router.get('/sanPham', async (req, res, next) => {
  try {
    const db = await connectDb();
    const sanPhamCollection = db.collection('sanPham');

    // Lấy từ khóa tìm kiếm từ query string
    const { keyword, page = 1, limit = 100 } = req.query;

    let filter = {}; // Mặc định không lọc gì, trả về toàn bộ sản phẩm

    // Kiểm tra nếu có từ khóa tìm kiếm
    if (keyword && keyword.trim() !== '') {
     
      const regex = new RegExp(keyword.trim(), 'i'); // 'i' để tìm kiếm không phân biệt hoa/thường
      filter = { ten_sp: regex }; // Giả sử 'ten_sp' là trường tên sản phẩm trong collection
    }

    // Pagination logic: skip = (page - 1) * limit, limit = số sản phẩm mỗi trang
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const products = await sanPhamCollection.find(filter).skip(skip).limit(parseInt(limit)).toArray();

    // Kiểm tra nếu có sản phẩm nào tìm thấy
    if (products.length > 0) {
      res.status(200).json(products); // Trả về danh sách sản phẩm tìm được
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm nào!' });
    }
  } catch (error) {
    // In lỗi ra console và trả về phản hồi lỗi với status 500
    console.error('Lỗi khi tìm kiếm sản phẩm:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi xử lý yêu cầu!', error: error.message });
  }
});
// //cập nhật sl sp
// router.put("/sanPham/update/:id", async (req, res) => {
//   try {
//     const db = await connectDb();
//     const sanPhamCollection = db.collection('sanPham');
//     const { soluong } = req.body; // Cập nhật số lượng

//     // Tìm sản phẩm bằng id
//     const product = await sanPhamCollection.findOne({ id: parseInt(req.params.id) });  // đảm bảo rằng id là một số nguyên

//     if (!product) return res.status(404).json({ message: "Sản phẩm không tìm thấy" });

//     // Cập nhật số lượng sản phẩm
//     const updatedProduct = await sanPhamCollection.updateOne(
//       { id: parseInt(req.params.id) },  // Tìm sản phẩm theo id
//       { $set: { soluong: soluong } }   // Cập nhật số lượng
//     );

//     if (updatedProduct.modifiedCount === 0) {
//       return res.status(400).json({ message: "Số lượng sản phẩm không thay đổi" });
//     }

//     res.json({ message: "Số lượng sản phẩm đã được cập nhật", soluong: soluong });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });



//show 12 sp
// router.get('/sanPham',async (req, res, next) => {
//   const db = await connectDb();
//   const sanPhamCollection = db.collection('sanPham');

//   // Limit query to retrieve only 12 sanPham
//   const limit = parseInt(req.query.limit) || 50; // Default to 8 if no limit specified

//   try {
//     const sanPham = await sanPhamCollection.find().limit(limit).toArray();

//     if (sanPham.length > 0) {
//       res.status(200).json(sanPham);
//     } else {
//       res.status(204).json({ message: 'No sanPham found' }); // Use 204 for no content
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error retrieving sanPham' });
//   }
// });
const getImagePath = (id_danhmuc) => {
  switch (id_danhmuc) {
    case 1:
      return "Laptop";
    case 2:
      return "PC";
    case 3:
      return "Manhinh";
    case 4:
      return "Chuot";
    case 5:
      return "Banphim";
    default:
      return "Khac"; // Default folder for other categories
  }
};

// Chức năng thêm sản phẩm
router.post('/sanPham',upload.fields([
  { name: 'hinh_anh[chinh]', maxCount: 1 },
  { name: 'hinh_anh[phu1]', maxCount: 1 },
  { name: 'hinh_anh[phu2]', maxCount: 1 },
  { name: 'hinh_anh[phu3]', maxCount: 1 },
  { name: 'hinh_anh[phu4]', maxCount: 1 },
  { name: 'hinh_anh[phu5]', maxCount: 1 }
]), async (req, res, next) => {
  const db = await connectDb();
  const sanPhamCollection = db.collection('sanPham');
  let { ma_san_pham, ten_sp, gia_sp, bao_hanh, thuong_hieu, id_danhmuc, cau_hinh,soluong } = req.body;
  try {
    cau_hinh = JSON.parse(cau_hinh);  // Chuyển cau_hinh thành đối tượng nếu nó là chuỗi JSON
  } catch (error) {
    return res.status(400).json({ message: 'Cấu hình sản phẩm không hợp lệ.' });
  }
  // Parse id_danhmuc as an integer and determine the folder based on category ID
  const categoryId = parseInt(id_danhmuc);
  const folder = getImagePath(categoryId);
   // Kiểm tra giá trị soluong
  // Kiểm tra mã sản phẩm đã tồn tại trong cơ sở dữ liệu chưa
  const existingProductByCode = await sanPhamCollection.findOne({ ma_san_pham });
  if (existingProductByCode) {
    return res.status(400).json({ message: 'Mã sản phẩm đã tồn tại.' });
  }

  // Kiểm tra tên sản phẩm đã tồn tại trong cơ sở dữ liệu chưa
  const existingProductByName = await sanPhamCollection.findOne({ ten_sp });
  if (existingProductByName) {
    return res.status(400).json({ message: 'Tên sản phẩm đã tồn tại.' });
  }
  // Construct hinh_anh object to include the single uploaded image with folder path
  let hinh_anh = {
    chinh: req.files['hinh_anh[chinh]'] ? `${req.files['hinh_anh[chinh]'][0].originalname}` : '',
    phu1: req.files['hinh_anh[phu1]'] ? `${req.files['hinh_anh[phu1]'][0].originalname}` : '',
    phu2: req.files['hinh_anh[phu2]'] ? `${req.files['hinh_anh[phu2]'][0].originalname}` : '',
    phu3: req.files['hinh_anh[phu3]'] ? `${req.files['hinh_anh[phu3]'][0].originalname}` : '',
    phu4: req.files['hinh_anh[phu4]'] ? `${req.files['hinh_anh[phu4]'][0].originalname}` : '',
    phu5: req.files['hinh_anh[phu5]'] ? `${req.files['hinh_anh[phu5]'][0].originalname}` : ''
  };
  // Find the last product to generate a new ID
  let lastProduct = await sanPhamCollection
    .find()
    .sort({ id: -1 })
    .limit(1)
    .toArray();
  let id = lastProduct[0] ? lastProduct[0].id + 1 : 1;
  // tùy chỉnh cấu hình 
  let customCauHinh;
  switch (categoryId) {
    case 1: // Laptop
      customCauHinh = {
        cpu: cau_hinh.cpu,
        ram: cau_hinh.ram,
        o_cung:cau_hinh.o_cung,
        vga: cau_hinh.vga,
        man_hinh: cau_hinh.man_hinh,
        // Thêm các cấu hình khác cho Laptop
      };
      break;
    case 2: // PC
      customCauHinh = {
        cpu: cau_hinh.cpu,
        ram: cau_hinh.ram,
        vga: cau_hinh.vga,
       
        // Thêm các cấu hình khác cho PC
      };
      break;
    case 3: // Màn hình
      customCauHinh = {
        kieu_man_hinh:cau_hinh.kieu_man_hinh,
        kich_thuoc: cau_hinh.kich_thuoc,
        tuong_thich_vesa: cau_hinh.tuong_thich_vesa,
        cong_ket_noi: cau_hinh.cong_ket_noi,
        do_phan_giai: cau_hinh.do_phan_giai,
        tan_so_quet: cau_hinh.tan_so_quet,
        tam_nen: cau_hinh.tam_nen,
        khong_gian_mau: cau_hinh.khong_gian_mau,
        phu_kien_trong_hop: cau_hinh.phu_kien_trong_hop,
        thoi_gian_phan_hoi: cau_hinh.thoi_gian_phan_hoi,
        do_sang: cau_hinh.do_sang,
        // Thêm các cấu hình khác cho màn hình
      };
      break;
    case 4: // Chuột
      customCauHinh = {
        mau_sac: cau_hinh.mau_sac,
        ket_noi: cau_hinh.ket_noi,
        led: cau_hinh.led,
        cam_bien: cau_hinh.cam_bien,
        so_nut: cau_hinh.so_nut,
        tuoi_tho: cau_hinh.tuoi_tho,
        DPI: cau_hinh.DPI,
        IPS: cau_hinh.IPS,
        trong_luong: cau_hinh.trong_luong,
        // Thêm các cấu hình khác cho chuột
      };
      break;
    case 5: // Bàn phím
      customCauHinh = {
        ket_noi: cau_hinh.ket_noi,
        switch: cau_hinh.switch,
        led: cau_hinh.led,
        kich_thuoc: cau_hinh.kich_thuoc,
        trong_luong: cau_hinh.trong_luong,
        // Thêm các cấu hình khác cho bàn phím
      };
    
    default:
      customCauHinh = {
        ...cau_hinh,
        custom: cau_hinh.custom || {}, // Thêm trường custom nếu không có
      };
      break;
  }
  // Create the new product object
  let newProduct = { 
    id, 
    ma_san_pham, 
    ten_sp, 
    gia_sp, 
    bao_hanh, 
    thuong_hieu, 
    id_danhmuc: categoryId, 
    cau_hinh: customCauHinh, 
    hinh_anh,
    soluong
  };
  // Insert the new product into the database
  await sanPhamCollection.insertOne(newProduct);
  if (newProduct) {
    res.status(200).json(newProduct);
  } else {
    res.status(404).json({ message: 'Add product not successful' });
  }
});

//sửa sp
router.put('/sanPham/:id',  upload.fields([ // Sử dụng upload.fields() để xử lý nhiều hình ảnh
  { name: 'hinh_anh[chinh]', maxCount: 1 },
  { name: 'hinh_anh[phu1]', maxCount: 1 },
  { name: 'hinh_anh[phu2]', maxCount: 1 },
  { name: 'hinh_anh[phu3]', maxCount: 1 },
  { name: 'hinh_anh[phu4]', maxCount: 1 },
  { name: 'hinh_anh[phu5]', maxCount: 1 }
]), async (req, res, next) => {
  const id = req.params.id; // id là string
  const db = await connectDb();
  const sanPhamCollection = db.collection('sanPham');
  let { ma_san_pham, ten_sp, gia_sp, bao_hanh, thuong_hieu, id_danhmuc, cau_hinh } = req.body;
  // Kiểm tra cấu hình sản phẩm
  if (typeof cau_hinh !== 'string') {
      return res.status(400).json({ message: 'Cấu hình sản phẩm không hợp lệ.' });
  }
  // Xử lý cấu hình sản phẩm
  try {
      cau_hinh = JSON.parse(cau_hinh);
  } catch (error) {
      return res.status(400).json({ message: 'Cấu hình sản phẩm không hợp lệ.' });
  }
   // Lấy sản phẩm hiện tại
   let product = await sanPhamCollection.findOne({ id: parseInt(id) });
   if (!product) {
     return res.status(404).json({ message: 'Sản phẩm không tồn tại.' });
   }
    // Cập nhật hình ảnh (giữ nguyên nếu không có ảnh mới)
    let hinh_anh = { ...product.hinh_anh }; // Sao chép ảnh hiện tại từ sản phẩm cũ
    const files = req.files;
  
    if (files) {
      if (files['hinh_anh[chinh]']) hinh_anh.chinh = files['hinh_anh[chinh]'][0].originalname;
      if (files['hinh_anh[phu1]']) hinh_anh.phu1 = files['hinh_anh[phu1]'][0].originalname;
      if (files['hinh_anh[phu2]']) hinh_anh.phu2 = files['hinh_anh[phu2]'][0].originalname;
      if (files['hinh_anh[phu3]']) hinh_anh.phu3 = files['hinh_anh[phu3]'][0].originalname;
      if (files['hinh_anh[phu4]']) hinh_anh.phu4 = files['hinh_anh[phu4]'][0].originalname;
      if (files['hinh_anh[phu5]']) hinh_anh.phu4 = files['hinh_anh[phu5]'][0].originalname;
    }
  const categoryId = parseInt(id_danhmuc);
  let customCauHinh;
  // Tùy chỉnh cấu hình
  switch (categoryId) {
      case 1: // Laptop
          customCauHinh = {
              cpu: cau_hinh.cpu,
              ram: cau_hinh.ram,
              o_cung: cau_hinh.o_cung,
              vga: cau_hinh.vga,
              man_hinh: cau_hinh.man_hinh,
          };
          break;
      case 2: // PC
          customCauHinh = {
              cpu: cau_hinh.cpu,
              ram: cau_hinh.ram,
              vga: cau_hinh.vga,
          };
          break;
      case 3: // Màn hình
          customCauHinh = {
              kieu_man_hinh: cau_hinh.kieu_man_hinh,
              kich_thuoc: cau_hinh.kich_thuoc,
              tuong_thich_vesa: cau_hinh.tuong_thich_vesa,
              cong_ket_noi: cau_hinh.cong_ket_noi,
              do_phan_giai: cau_hinh.do_phan_giai,
              tan_so_quet: cau_hinh.tan_so_quet,
              tam_nen: cau_hinh.tam_nen,
              khong_gian_mau: cau_hinh.khong_gian_mau,
              phu_kien_trong_hop: cau_hinh.phu_kien_trong_hop,
              thoi_gian_phan_hoi: cau_hinh.thoi_gian_phan_hoi,
              do_sang: cau_hinh.do_sang,
          };
          break;
      case 4: // Chuột
          customCauHinh = {
              mau_sac: cau_hinh.mau_sac,
              ket_noi: cau_hinh.ket_noi,
              led: cau_hinh.led,
              cam_bien: cau_hinh.cam_bien,
              so_nut: cau_hinh.so_nut,
              tuoi_tho: cau_hinh.tuoi_tho,
              DPI: cau_hinh.DPI,
              IPS: cau_hinh.IPS,
              trong_luong: cau_hinh.trong_luong,
          };
          break;
      case 5: // Bàn phím
          customCauHinh = {
              ket_noi: cau_hinh.ket_noi,
              switch: cau_hinh.switch,
              led: cau_hinh.led,
              kich_thuoc: cau_hinh.kich_thuoc,
              trong_luong: cau_hinh.trong_luong,
          };
          break;
           case 6: // khác
      customCauHinh = {
        custom:cau_hinh.custom,
      };break;

      default:
          customCauHinh = cau_hinh; // Dùng cấu hình mặc định nếu không có trường hợp nào khớp
          break;
  }
  // Tạo đối tượng sản phẩm cần cập nhật
  let editProduct = { 
      ma_san_pham, 
      ten_sp, 
      gia_sp, 
      bao_hanh, 
      thuong_hieu, 
      id_danhmuc: categoryId, 
      cau_hinh: customCauHinh, 
      hinh_anh 
  };
  // Cập nhật sản phẩm trong cơ sở dữ liệu
  const result = await sanPhamCollection.updateOne(
      { id: parseInt(id) },
      { $set: editProduct }
  );
  if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm để cập nhật.' });
  }
  if (result.modifiedCount > 0) {
      res.status(200).json(editProduct);
  } else {
      res.status(404).json({ message: 'Sửa sản phẩm không thành công hoặc không có thay đổi nào.' });
  }
});
//xóa sản phẩm
router.delete('/sanPham/:id', async (req, res) => {
  const id = parseInt(req.params.id); // Chuyển id sản phẩm sang số nguyên
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID không hợp lệ' });
  }

  const db = await connectDb();
  const sanPhamCollection = db.collection('sanPham');
  const donHangCollection = db.collection('donHang'); // Bộ sưu tập đơn hàng

  try {
    // Kiểm tra xem sản phẩm có nằm trong bất kỳ đơn hàng nào không
    const isInOrder = await donHangCollection.findOne({
      sanPham: { $elemMatch: { id: id } }, // Kiểm tra id sản phẩm trong mảng sanPham
    });

    if (isInOrder) {
      return res.status(400).json({
        message: 'Không thể xóa sản phẩm vì sản phẩm đã nằm trong đơn hàng',
      });
    }

    // Xóa sản phẩm nếu không nằm trong bất kỳ đơn hàng nào
    const result = await sanPhamCollection.deleteOne({ id });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Xóa sản phẩm thành công' });
    } else {
      res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa sản phẩm', error: error.message });
  }
});


//Lấy sản phẩm theo mã danh mục
router.get('/sanPham/id_danhmuc/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const db = await connectDb();
  const sanPhamCollection = db.collection('sanPham');
  const danhMucCollection = db.collection('danhMuc');

  try {
    // Kiểm tra trạng thái của danh mục
    const category = await danhMucCollection.findOne({ id: id });

    if (category && category.locked) {
      // Nếu danh mục bị khóa, trả về thông báo thông tin
      return res.status(200).json({
        message: 'Danh mục này đã bị khóa, không thể hiển thị sản phẩm.',
        products: [] // Không có sản phẩm nào để hiển thị
      });
    }

    // Nếu danh mục không bị khóa, tiếp tục lấy sản phẩm
    const sanPham = await sanPhamCollection.find({ id_danhmuc: id }).toArray();

    if (sanPham.length > 0) {
      res.status(200).json(sanPham);
    } else {
      res.status(200).json({
        message: 'Không có sản phẩm nào trong danh mục này.',
        products: [] // Không có sản phẩm trong danh mục
      });
    }
  } catch (error) {
    console.log('error', error);
    res.status(500).send('error');
  }
});

//Lấy sản phẩm theo thương hiệu
router.get('/sanPham/id_danhmuc/:id/thuong_hieu/:thuong_hieu', async (req, res, next) => {
  const id_danhmuc = parseInt(req.params.id); // Chuyển đổi id_danhmuc sang kiểu số
  const thuong_hieu = req.params.thuong_hieu; // Lấy giá trị thương hiệu từ tham số URL

  try {
    const db = await connectDb(); // Kết nối đến database
    const sanPhamCollection = db.collection('sanPham');

    // Tìm kiếm sản phẩm theo id_danhmuc và thương hiệu
    const sanPham = await sanPhamCollection
      .find({
        $and: [
          { id_danhmuc: id_danhmuc }, // Điều kiện theo id_danhmuc
          { thuong_hieu: { $regex: thuong_hieu, $options: 'i' } } // Điều kiện tìm kiếm không phân biệt hoa thường
        ]
      })
      .toArray(); // Chuyển đổi cursor thành mảng

    // Kiểm tra và trả về kết quả
    res.status(200).json({
      message: sanPham.length > 0 ? 'Danh sách sản phẩm theo danh mục và thương hiệu' : 'Không tìm thấy sản phẩm nào theo danh mục và thương hiệu này.',
      products: sanPham
    });
  } catch (error) {
    console.error('Lỗi khi tìm kiếm sản phẩm theo danh mục và thương hiệu:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình tìm kiếm.' });
  }
});
//Lấy sản phẩm theo tên danh mục
router.get('/sanPham/categoryname/:name', async (req, res, next) => {
  const name = req.params.name
  const db = await connectDb()
  const sanPhamCollection = db.collection('sanPham')
  const categoriesCollection = db.collection('categories')
  try {
    let category = await categoriesCollection.findOne({ name: name })
    let cateId = category.id
    const sanPham = await sanPhamCollection
      .find({ categoryId: cateId.id })
      .toArray()
    if (sanPham.length > 0) {
      res.status(200).json(sanPham)
    } else {
      res.status(404).json({ message: 'Product not found.' })
    }
  } catch (error) {
    console.log('error', error)
    req.status(500).send('error!')
  }
})

// Lấy sản phẩm bán chạy
router.get('/sanPham/ban-chay', async (req, res) => {
  try {
    const db = await connectDb();
    const sanPhamCollection = db.collection('sanPham');
    
    // Tìm các sản phẩm có ban_chay = 1
    const bestSellingProducts = await sanPhamCollection
      .find({ ban_chay: 1 }) // Chỉ lấy sản phẩm có ban_chay = 1
      .toArray();

    if (bestSellingProducts.length > 0) {
      res.status(200).json(bestSellingProducts);
    } else {
      res.status(404).json({ 
        message: "Không tìm thấy sản phẩm bán chạy nào",
        products: []
      });
    }
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm bán chạy:", error);
    res.status(500).json({ 
      message: 'Đã xảy ra lỗi khi lấy sản phẩm bán chạy', 
      error: error.message 
    });
  }
});

//Hiển thị 1 sản phẩm theo id
router.get('/sanPham/:id', async (req, res, next) => {
  let id = req.params.id
  const db = await connectDb()
  const sanPhamCollection = db.collection('sanPham')
  const sanPham = await sanPhamCollection.findOne({ id: parseInt(id) })
  if (sanPham) {
    res.status(200).json(sanPham)
  } else {
    res.status(404).json({ message: 'Không tìm thấy sản phẩm' })
  }
})
  // cập nhật soluong sản phẩm
  router.post('/updateProductQuantity', async (req, res) => {
    const { productId, quantityPurchased } = req.body;

    try {
      // Kết nối đến database
      const db = await connectDb();
      const sanPhamCollection = db.collection('sanPham');

      // Lấy thông tin sản phẩm
      const product = await sanPhamCollection.findOne({ id: productId });

      if (!product) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại.' });
      }

      // Kiểm tra số lượng hiện tại
      const newQuantity = product.soluong - quantityPurchased;

      if (newQuantity < 0) {
        return res
          .status(400)
          .json({ message: `Không đủ số lượng sản phẩm: ${product.ten_sp}` });
      }

      // Cập nhật số lượng sản phẩm
      await sanPhamCollection.updateOne(
        { id: productId },
        { $set: { soluong: newQuantity } }
      );

      res
        .status(200)
        .json({ message: `Cập nhật số lượng sản phẩm ${product.ten_sp} thành công.` });
    } catch (error) {
      console.error('Lỗi khi cập nhật số lượng sản phẩm:', error);
      res.status(500).json({ message: 'Lỗi server. Vui lòng thử lại sau.' });
    }
  });

// API để tăng số lượng sản phẩm
router.post('/addproductquantity', async (req, res) => {
  const { productId, quantityToAdd } = req.body;

  try {
    // Kết nối đến database
    const db = await connectDb();
    const sanPhamCollection = db.collection('sanPham');

    // Lấy thông tin sản phẩm
    const product = await sanPhamCollection.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại.' });
    }

    // Tăng số lượng sản phẩm
    const newQuantity = product.soluong + quantityToAdd;

    // Cập nhật số lượng sản phẩm trong database
    await sanPhamCollection.updateOne(
      { id: productId },
      { $set: { soluong: newQuantity } }
    );

    res.status(200).json({
      message: `Đã tăng số lượng sản phẩm ${product.ten_sp} thành công.`,
      newQuantity, // Trả về số lượng mới
    });
  } catch (error) {
    console.error('Lỗi khi tăng số lượng sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi server. Vui lòng thử lại sau.' });
  }
});


//Sửa đổi thông tin người dùng
router.put('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const db = await connectDb();
    const usersCollection = db.collection('users');

    // Kiểm tra xem người dùng có tồn tại không
    const existingUser = await usersCollection.findOne({ id: parseInt(id) });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    // Chuẩn bị dữ liệu cập nhật
    const dataToUpdate = {
      fullname: updateData.fullname,
      username: updateData.username,
      email: updateData.email,
      phone: updateData.phone || null,
      birthday: updateData.birthday || null,
      gender: updateData.gender || null
    };

    // Thực hiện cập nhật
    const result = await usersCollection.updateOne(
      { id: parseInt(id) },
      { $set: dataToUpdate }
    );

    if (result.modifiedCount > 0) {
      // Lấy thông tin user sau khi cập nhật
      const updatedUser = await usersCollection.findOne({ id: parseInt(id) });
      res.status(200).json({
        success: true,
        message: 'Cập nhật thông tin thành công',
        user: updatedUser
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Không có thay đổi nào được thực hiện'
      });
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật thông tin người dùng',
      error: error.message
    });
  }
});


//show tài khoản
router.get('/user', async (req, res, next) => {
  const db = await connectDb()
  const accountsCollection = db.collection('users')
  const accounts = await accountsCollection.find().toArray()
  if (accounts) {
    res.status(200).json(accounts)
  } else {
    res.status(404).json({ message: 'Account not found' })
  }
})

// API tìm kiếm người dùng theo id_user
router.get('/user/:id',  async (req, res) => {
  const id = parseInt(req.params.id);
  const db = await connectDb();
  const usersCollection = db.collection('users');

  try {
    const nguoidung = await usersCollection.findOne({ id: id });
    if (nguoidung) {
      res.status(200).json(nguoidung);
    } else {
      res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).send('error');
  }
});

module.exports = router;


// API sửa người dùng theo id_user
router.put('/user/:id', authenToken, async (req, res) => {
  const id = parseInt(req.params.id); // Lấy id từ URL và chuyển sang số nguyên
  const db = await connectDb();
  const usersCollection = db.collection('users'); // Sử dụng đúng collection người dùng

  // Lấy dữ liệu từ body
  const { hoten, ngaysinh, gioitinh, sdt, email, diachi } = req.body;

  // Tạo đối tượng cập nhật
  const editUser = {
    hoten,
    ngaysinh,
    gioitinh,
    sdt,
    email,
    diachi
  };

  try {
    // Thực hiện cập nhật người dùng
    const result = await usersCollection.updateOne(
      { id: id },
      { $set: editUser }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng để cập nhật.' });
    }

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Cập nhật người dùng thành công.', user: editUser });
    } else {
      res.status(200).json({ message: 'Không có thay đổi nào được thực hiện.' });
    }
  } catch (error) {
    console.error('Lỗi cập nhật người dùng:', error);
    res.status(500).json({ message: 'Lỗi máy chủ khi cập nhật người dùng.' });
  }
});


// API xóa người dùng theo id_user
router.delete('/user/:id', async (req, res) => {
  let id = req.params.id
  const db = await connectDb()
  const userCollection = db.collection('users')
  let nguoidung = await userCollection.deleteOne({ id: parseInt(id) })
  if (nguoidung) {
    res.status(200).json({ message: 'Xóa thành công' })
  } else {
    res.status(404).json({ message: 'Xóa ko thành công' })
  }
})


//API đăng ký tài khoản
router.post('/accounts/register', async (req, res) => {
  let { username, email, password, repassword } = req.body;
  const db = await connectDb();
  const usersCollection = db.collection('users');

  try {
    // Kiểm tra username đã tồn tại
    let existingUser = await usersCollection.findOne({ 
      $or: [
        { username: username },
        { email: email }
      ]
    });
    
    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(409).json({ message: 'Tên đăng nhập đã tồn tại' });
      }
      if (existingUser.email === email) {
        return res.status(409).json({ message: 'Email đã tồn ti' });
      }
    }

    // Kiểm tra password và repassword
    if (password !== repassword) {
      return res.status(400).json({ message: 'Mật khẩu không khớp' });
    }

    // Tạo id mới
    let lastUser = await usersCollection.find().sort({ id: -1 }).limit(1).toArray();
    let id = lastUser[0] ? lastUser[0].id + 1 : 1;

    // Mã hóa mật khẩu
    const salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);

    // Tạo user mới
    let newUser = {
      id,
      username,
      email,
      password: hashPassword,
      role: 'user',
      createdAt: new Date(),
      status: 'active',
      profile: {
        fullName: '',
        phone: '',
        address: '',
        avatar: ''
      }
    };

    await usersCollection.insertOne(newUser);
    
    // Trả về thông báo thành công và thông tin user (không bao gồm password)
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role
    };

    res.status(200).json({ 
      message: 'Đăng ký thành công!',
      user: userResponse
    });

  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// API đăng nhập
router.post('/accounts/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = await connectDb();
    const usersCollection = db.collection('users');

    // Tìm user theo username
    const user = await usersCollection.findOne({ username });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Tên đăng nhập không tồn tại!'
      });
    }

    // Kiểm tra mật khẩu
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Mật khẩu không đúng!'
      });
    }

    // Tạo token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      'secretkey',
      { expiresIn: '24h' }
    );

    // Loại bỏ password trước khi gửi về client
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      message: 'Đăng nhập thành cng!',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi đăng nhập!',
      error: error.message
    });
  }
});

//Hàm xác thực token
function authenToken (req, res, next) {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1]
    req.token = bearerToken
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.status(403).json({ message: 'Không có quyền truy cập' })
      } else {
        next()
      }
    })
  } else {
    res.status(403).json({ message: 'Không có quyền truy cập' })
  }
}

// API tạo đơn hàng mới

  router.post('/donHang', async (req, res) => {
    const db = await connectDb();
    const donHangCollection = db.collection('donHang');

    try {
      // Lấy đơn hàng cuối cùng để tạo id mới
      const lastOrder = await donHangCollection
        .find()
        .sort({ id: -1 })
        .limit(1)
        .toArray();
      const id = lastOrder[0] ? lastOrder[0].id + 1 : 1;

      // Tạo đơn hàng mới với id tự động tăng
      const newOrder = {
        id,
        ...req.body,
        ngayDat: new Date(),
        trangThai: 'Chờ xử lý',
      };

      await donHangCollection.insertOne(newOrder);
      const BASE_URL = 'http://localhost:3000';

      // Tính tổng tiền đơn hàng
      const totalAmount = req.body.sanPham.reduce((total, item) => {
        return total + (item.gia_sp * item.soLuong);
      }, 0);
      // Chuẩn bị nội dung email
      const productListHtml = req.body.sanPham
        .map(
          (item) => `
          <div style="margin-bottom: 10px;">
            <p>Tên sản phẩm: <strong>${item.ten_sp}</strong></p>
            <p>Giá: ${item.gia_sp.toLocaleString('vi-VN')} VND</p>
            <p>Số lượng: ${item.soLuong}</p>
          </div>
        `
        )
        .join('');

      const html = `
        <h1>Cảm ơn bạn đã đặt hàng!</h1>
        <p>Mã đơn hàng của bạn: <strong>#${id}</strong></p>
        <p>Ngày đặt: ${new Date().toLocaleString()}</p>
        <p>Trạng thái: đang xử lý</p>
        <p>Chi tiết đơn hàng:</p>
        ${productListHtml}
        <p><strong>Tổng tiền: ${totalAmount.toLocaleString('vi-VN')} VND</strong></p>
      `;

      // Gửi email thông báo đơn hàng
      const email = req.body.email; // Địa chỉ email của khách hàng
      const subject = `Xác nhận đặt hàng #${id}`;

      if (email) {
        await sendMail({ email, subject, html });
      }

      res.status(200).json({ message: 'Đặt hàng thành công', order: newOrder });
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi tạo đơn hàng' });
    }
  });


// Lấy tất cả bình luận
router.get('/binhLuan', async (req, res) => {
  try {
    const db = await connectDb();
    const binhLuanCollection = db.collection('binhLuan');
    
    const comments = await binhLuanCollection
      .find()
      .sort({ time: -1 })
      .toArray();
      
    res.status(200).json(comments);
  } catch (error) {
    console.error('Lỗi khi lấy bình luận:', error);
    res.status(500).json({ 
      message: 'Lấy danh sách bình luận không thành công', 
      error: error.message 
    });
  }
});

// Lấy bình luận theo sản phẩm
router.get('/binhLuan/:productId', async (req, res) => {
  const db = await connectDb();
  const binhLuanCollection = db.collection('binhLuan');
  
  try {
    const productId = parseInt(req.params.productId);
    const comments = await binhLuanCollection
      .find({ productId: productId })
      .sort({ time: -1 })
      .toArray();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Lấy bình luận không thành công', error });
  }
});

// Thêm bình luận mới
router.post('/binhLuan', async (req, res) => {
  try {
    const db = await connectDb();
    const binhLuanCollection = db.collection('binhLuan');
    const usersCollection = db.collection('users');
    
    // Kiểm tra thông tin user từ token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Vui lòng đăng nhập để bình luận'
      });
    }

    // Giải mã token để lấy thông tin user
    const decoded = jwt.verify(token, 'secretkey');
    const user = await usersCollection.findOne({ id: decoded.id });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Người dùng không tồn tại'
      });
    }

    const lastComment = await binhLuanCollection
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray();
    
    const newId = lastComment.length > 0 ? lastComment[0].id + 1 : 1;
    
    const newComment = {
      id: newId,
      userId: user.id,
      username: user.username, // Thêm username để hiển thị
      productId: parseInt(req.body.productId),
      comment: req.body.comment,
      time: new Date(),
      like: 0,
      cmt: 0,
      status: 'visible'
    };

    const result = await binhLuanCollection.insertOne(newComment);
    
    if (result.acknowledged) {
      res.status(200).json(newComment);
    } else {
      throw new Error('Không thể thêm bình luận vào database');
    }
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Thêm bình luận không thành công', 
      error: error.message 
    });
  }
});

// Xóa bình luận
router.delete('/binhLuan/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const db = await connectDb();
    const binhLuanCollection = db.collection('binhLuan');
    
    const result = await binhLuanCollection.deleteOne({ id: id });
    
    if (result.deletedCount > 0) {
      console.log('Bình luận đã được xóa:', id);
      res.status(200).json({ message: 'Xóa bình luận thành công' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy bình luận để xóa' });
    }
  } catch (error) {
    console.error('Lỗi khi xóa bình luận:', error);
    res.status(500).json({ message: 'Xóa bình luận không thành công', error: error.message });
  }
});

// Tìm kiếm sản phẩm theo tên
router.get('/sanPham/search/:keyword', async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const db = await connectDb();
    const sanPhamCollection = db.collection('sanPham');

    const sanPham = await sanPhamCollection
      .find({
        ten_sp: { $regex: keyword, $options: 'i' } // 'i' để không phân biệt hoa thường
      })
      .toArray();

    if (sanPham.length > 0) {
      res.status(200).json(sanPham);
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm phù hợp' });
    }
  } catch (error) {
    console.error('Lỗi tìm kiếm:', error);
    res.status(500).json({ message: 'Lỗi server khi tìm kiếm sản phẩm' });
  }
});

// Cập nhật bình luận
router.put('/binhLuan/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { comment, status } = req.body;
    const db = await connectDb();
    const binhLuanCollection = db.collection('binhLuan');
    
    const updateData = {};
    if (comment !== undefined) updateData.comment = comment;
    if (status !== undefined) updateData.status = status;
    
    const result = await binhLuanCollection.updateOne(
      { id: id },
      { $set: updateData }
    );
    
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Cập nhật bình luận thành công' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy bình luận' });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Cập nhật bình luận không thành công', 
      error: error.message 
    });
  }
});

// Cập nhật trạng thái ẩn/hiện bình luận
router.patch('/binhLuan/toggleStatus/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const db = await connectDb();
    const binhLuanCollection = db.collection('binhLuan');
    
    const result = await binhLuanCollection.updateOne(
      { id: id },
      { $set: { status: status } }
    );
    
    if (result.modifiedCount > 0) {
      res.status(200).json({ 
        message: `Bình luận đã được ${status === 'hidden' ? 'ẩn' : 'hiện'}`,
        status: status 
      });
    } else {
      res.status(404).json({ message: 'Không tìm thấy bình luận' });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Cập nhật trạng thái bình luận không thành công', 
      error: error.message 
    });
  }
});

// Lấy sản phẩm khuyến mãi
router.get('/sanPham/khuyen-mai', async (req, res) => {
  try {
    const db = await connectDb();
    const sanPhamCollection = db.collection('sanPham');
    
    // Tìm các sản phẩm có khuyenmai tồn tại và có giá trị
    const promotionalProducts = await sanPhamCollection
      .find({ 
        khuyenmai: { 
          $exists: true, 
          $ne: null,  // không null
          $ne: "",    // không rỗng
          $type: "string",  // kiểu dữ liệu là string
          $regex: /\S/  // chứa ít nht một ký tự không phải khoảng trắng
        } 
      })
      .toArray();

    if (promotionalProducts.length > 0) {
      res.status(200).json(promotionalProducts);
    } else {
      res.status(404).json({ 
        message: "Không tìm thấy sản phẩm khuyến mãi"
      });
    }
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm khuyến mãi:', error);
    res.status(500).json({ 
      message: 'Đã xảy ra lỗi khi lấy sản phẩm khuyến mãi',
      error: error.message 
    });
  }
});

// API đăng ký người dùng
router.post('/users/register', async (req, res) => {
  try {
    const db = await connectDb();
    const usersCollection = db.collection('users');
    
    // Kiểm tra username và email đã tồn tại chưa
    const existingUser = await usersCollection.findOne({
      $or: [
        { username: req.body.username },
        { email: req.body.email }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Tên đăng nhập hoặc email đã tồn tại!'
      });
    }

    // Mã hóa mật khẩu
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // Tạo user mới
    const lastUser = await usersCollection.find().sort({ id: -1 }).limit(1).toArray();
    const newId = lastUser[0] ? lastUser[0].id + 1 : 1;

    const newUser = {
      id: newId,
      fullname: req.body.fullname,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date()
    };

    await usersCollection.insertOne(newUser);
    
    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi đăng ký!',
      error: error.message
    });
  }
});

// Lấy tất cả đơn hàng
router.get('/donHang', async (req, res) => {
  try {
    const db = await connectDb();
    const donHangCollection = db.collection('donHang');
    const orders = await donHangCollection.find().sort({ ngayDat: -1 }).toArray();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đơn hàng', error });
  }
});

// Cập nhật trạng thái đơn hàng
router.put('/donHang/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { trangThai,lyDoHuy } = req.body;
    const db = await connectDb();
    const donHangCollection = db.collection('donHang');
    
    const result = await donHangCollection.updateOne(
      { id: parseInt(id) },
      { $set: { trangThai, lyDoHuy  } }
    );
    
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Cập nhật trạng thái thành công' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái đơn hàng', error });
  }
});

// Lấy chi tiết đơn hàng
router.get('/donHang/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const donHangCollection = db.collection('donHang');
    const order = await donHangCollection.findOne({ id: parseInt(id) });
    
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy chi tiết đơn hàng', error });
  }
});

// API cập nhật thông tin user
router.put('/users/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const db = await connectDb();
    const usersCollection = db.collection('users');

    // Kiểm tra xem người dùng có tồn tại không
    const existingUser = await usersCollection.findOne({ id: parseInt(id) });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    // Nếu có password mới, mã hóa nó
    if (updateData.password) {
      const salt = bcrypt.genSaltSync(10);
      updateData.password = bcrypt.hashSync(updateData.password, salt);
    }

    // Thực hiện cập nhật
    const result = await usersCollection.updateOne(
      { id: parseInt(id) },
      { $set: updateData }
    );

    if (result.modifiedCount > 0) {
      // Lấy thông tin user sau khi cập nhật (loại bỏ password)
      const updatedUser = await usersCollection.findOne({ id: parseInt(id) });
      const { password, ...userWithoutPassword } = updatedUser;
      
      res.status(200).json({
        success: true,
        message: 'Cập nhật thông tin thành công',
        user: userWithoutPassword
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Không có thay đổi nào được thực hiện'
      });
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật thông tin người dùng',
      error: error.message
    });
  }
});

// API gửi mã xác thực qua email
router.post('/users/send-verification', async (req, res) => {
  try {
    const { email } = req.body;
    // Tạo mã xác thực ngẫu nhiên
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    
    // Lưu mã xác thực vào database (có thể thêm thời gian hết hạn)
    const db = await connectDb();
    const usersCollection = db.collection('users');
    await usersCollection.updateOne(
      { email },
      { $set: { verificationCode, verificationExpires: new Date(Date.now() + 300000) } } // Hết hạn sau 5 phút
    );

    // Gửi email chứa mã xác thực
    // ... Code gửi email ở đây ...

    res.status(200).json({
      success: true,
      message: 'Mã xác thực đã được gửi đến email của bạn'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi gửi mã xác thực',
      error: error.message
    });
  }
});

// API xác thực mã và cập nhật thông tin nhạy cảm (mật khẩu, số điện thoại)
router.post('/users/verify-and-update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { verificationCode, newPassword, newPhone } = req.body;
    
    const db = await connectDb();
    const usersCollection = db.collection('users');
    
    const user = await usersCollection.findOne({
      id: parseInt(id),
      verificationCode: parseInt(verificationCode),
      verificationExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Mã xác thực không hợp lệ hoặc đã hết hạn'
      });
    }

    const updateData = {};
    if (newPassword) {
      const salt = bcrypt.genSaltSync(10);
      updateData.password = bcrypt.hashSync(newPassword, salt);
    }
    if (newPhone) {
      updateData.phone = newPhone;
    }

    await usersCollection.updateOne(
      { id: parseInt(id) },
      { 
        $set: updateData,
        $unset: { verificationCode: "", verificationExpires: "" }
      }
    );

    res.status(200).json({
      success: true,
      message: 'Cập nhật thông tin thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xác thực và cập nhật thông tin',
      error: error.message
    });
  }
});

// API kiểm tra mật khẩu hiện tại
router.post('/users/verify-password/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword } = req.body;
    
    const db = await connectDb();
    const usersCollection = db.collection('users');
    
    const user = await usersCollection.findOne({ id: parseInt(id) });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    // Kiểm tra mật khẩu
    const validPassword = bcrypt.compareSync(currentPassword, user.password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu hiện tại không đúng'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Mật khẩu hợp lệ'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi kiểm tra mật khẩu',
      error: error.message
    });
  }
});

// API lấy tất cả users
router.get('/users', async (req, res) => {
  try {
    const db = await connectDb();
    const usersCollection = db.collection('users');
    const users = await usersCollection.find().toArray();
    
    // Loại bỏ thông tin nhạy cảm trước khi gửi response
    const safeUsers = users.map(user => {
      const { password, verificationCode, verificationExpires, ...safeUser } = user;
      return safeUser;
    });

    res.status(200).json(safeUsers);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách người dùng',
      error: error.message
    });
  }
});

// API xóa user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const usersCollection = db.collection('users');

    // Kiểm tra nếu là admin gốc (ID = 1)
    if (parseInt(id) === 1) {
      return res.status(403).json({
        success: false,
        message: 'Không thể xóa tài khoản Admin gốc!'
      });
    }

    const result = await usersCollection.deleteOne({ id: parseInt(id) });

    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: 'Xóa người dùng thành công'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa người dùng',
      error: error.message
    });
  }
});

// API cập nhật role của user
router.put('/users/update-role/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const db = await connectDb();
    const usersCollection = db.collection('users');

    // Kiểm tra nếu là admin gốc (ID = 1)
    if (parseInt(id) === 1) {
      return res.status(403).json({
        success: false,
        message: 'Không thể thay đổi quyền của Admin gốc!'
      });
    }

    const result = await usersCollection.updateOne(
      { id: parseInt(id) },
      { $set: { role } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: 'Cập nhật quyền thành cng'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật quyền người dùng',
      error: error.message
    });
  }
});

// API lấy thông tin user theo ID
router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const usersCollection = db.collection('users');
    
    const user = await usersCollection.findOne({ id: parseInt(id) });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    // Loại bỏ password và các thông tin nhạy cảm khác
    const { password, verificationCode, verificationExpires, ...safeUser } = user;
    
    res.status(200).json(safeUser);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin người dùng',
      error: error.message
    });
  }
});

// API cập nhật thông tin user
router.put('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const db = await connectDb();
    const usersCollection = db.collection('users');

    // Kiểm tra xem người dùng có tồn tại không
    const existingUser = await usersCollection.findOne({ id: parseInt(id) });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    // Chuẩn bị dữ liệu cập nhật
    const dataToUpdate = {
      fullname: updateData.fullname,
      username: updateData.username,
      email: updateData.email,
      phone: updateData.phone || null,
      birthday: updateData.birthday || null,
      gender: updateData.gender || null
    };

    // Thực hiện cập nhật
    const result = await usersCollection.updateOne(
      { id: parseInt(id) },
      { $set: dataToUpdate }
    );

    if (result.modifiedCount > 0) {
      // Lấy thông tin user sau khi cập nhật
      const updatedUser = await usersCollection.findOne({ id: parseInt(id) });
      res.status(200).json({
        success: true,
        message: 'Cập nhật thông tin thành công',
        user: updatedUser
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Không có thay đổi nào được thực hiện'
      });
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật thông tin người dùng',
      error: error.message
    });
  }
});

// API xử lý like bình luận
router.patch('/binhLuan/like/:id', async (req, res) => {
  try {
    const commentId = parseInt(req.params.id);
    const db = await connectDb();
    const binhLuanCollection = db.collection('binhLuan');
    
    // Tìm và tăng số lượt like
    const result = await binhLuanCollection.updateOne(
      { id: commentId },
      { $inc: { like: 1 } } // Tăng giá trị like lên 1
    );
    
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Đã like bình luận' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy bình luận' });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi khi like bình luận', 
      error: error.message 
    });
  }
});

// API thêm phản hồi cho bình luận
router.post('/binhLuan/reply/:id', async (req, res) => {
  try {
    const commentId = parseInt(req.params.id);
    const { userId, username, content } = req.body;
    const db = await connectDb();
    const binhLuanCollection = db.collection('binhLuan');
    
    // Tạo đối tượng phản hồi mới
    const newReply = {
      userId,
      username,
      content,
      time: new Date(),
      like: 0
    };

    // Thêm phản hồi vào mảng replies và tăng số lượng cmt
    const result = await binhLuanCollection.updateOne(
      { id: commentId },
      { 
        $push: { replies: newReply },
        $inc: { cmt: 1 }
      }
    );
    
    if (result.modifiedCount > 0) {
      res.status(200).json({ 
        message: 'Đã thêm phản hồi',
        reply: newReply
      });
    } else {
      res.status(404).json({ message: 'Không tìm thấy bình luận' });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi khi thêm phản hồi', 
      error: error.message 
    });
  }
});

// API xóa phản hồi của bình luận
router.delete('/binhLuan/:commentId/reply/:replyIndex', async (req, res) => {
  try {
    const { commentId, replyIndex } = req.params;
    const db = await connectDb();
    const binhLuanCollection = db.collection('binhLuan');

    // Tìm bình luận
    const comment = await binhLuanCollection.findOne({ id: parseInt(commentId) });
    if (!comment) {
      return res.status(404).json({ message: 'Không tìm thấy bình luận' });
    }

    // Kiểm tra và xóa phản hồi
    if (!comment.replies || !comment.replies[replyIndex]) {
      return res.status(404).json({ message: 'Không tìm thấy phản hồi' });
    }

    // Xóa phản hồi khỏi mảng replies và giảm số lượng cmt
    comment.replies.splice(replyIndex, 1);
    comment.cmt = comment.cmt - 1;

    // Cập nhật lại document trong database
    const result = await binhLuanCollection.updateOne(
      { id: parseInt(commentId) },
      { 
        $set: { 
          replies: comment.replies,
          cmt: comment.cmt 
        } 
      }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ 
        message: 'Xóa phản hồi thành công',
        updatedComment: comment
      });
    } else {
      res.status(500).json({ message: 'Không thể cập nhật bình luận' });
    }
  } catch (error) {
    console.error('Lỗi khi xóa phản hồi:', error);
    res.status(500).json({ 
      message: 'Lỗi khi xóa phản hồi', 
      error: error.message 
    });
  }
});
// Thêm các API endpoints cho wishlist

// API lấy danh sách yêu thích theo username
router.get('/wishlist/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const db = await connectDb();
    const wishlistCollection = db.collection('wishlist');
    
    const wishlist = await wishlistCollection.findOne({ username });
    res.status(200).json(wishlist?.products || []);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi khi lấy danh sách yêu thích',
      error: error.message 
    });
  }
});

// API thêm sản phẩm vào danh sách yêu thích
router.post('/wishlist/add', async (req, res) => {
  try {
    const { username, product } = req.body;
    const db = await connectDb();
    const wishlistCollection = db.collection('wishlist');
    
    // Tìm wishlist của user
    const userWishlist = await wishlistCollection.findOne({ username });
    
    if (userWishlist) {
      // Kiểm tra sản phẩm đã tồn tại chưa
      const productExists = userWishlist.products.some(p => p.id === product.id);
      
      if (productExists) {
        return res.status(400).json({ message: 'Sản phẩm đã có trong danh sách yêu thích' });
      }
      
      // Thêm sản phẩm mới vào danh sách
      await wishlistCollection.updateOne(
        { username },
        { $push: { products: product } }
      );
    } else {
      // Tạo wishlist mới cho user
      await wishlistCollection.insertOne({
        username,
        products: [product]
      });
    }
    
    res.status(200).json({ message: 'Đã thêm sản phẩm vào danh sách yêu thích' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi khi thêm vào danh sách yêu thích',
      error: error.message 
    });
  }
});

// API xóa sản phẩm khỏi danh sách yêu thích
router.delete('/wishlist/remove', async (req, res) => {
  try {
    const { username, productId } = req.body;
    const db = await connectDb();
    const wishlistCollection = db.collection('wishlist');
    
    await wishlistCollection.updateOne(
      { username },
      { $pull: { products: { id: productId } } }
    );
    
    res.status(200).json({ message: 'Đã xóa sản phẩm khỏi danh sách yêu thích' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi khi xóa khỏi danh sách yêu thích',
      error: error.message 
    });
  }
});

// API quên mật khẩu - gửi mã xác thực
router.post('/accounts/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const db = await connectDb();
    const usersCollection = db.collection('users');

    // Kiểm tra email tồn tại
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email không tồn tại trong hệ thống' });
    }

    // Tạo mã xác thực ngẫu nhiên 6 số
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    
    // Lưu mã xác thực và thời gian hết hạn (5 phút)
    await usersCollection.updateOne(
      { email },
      { 
        $set: { 
          resetCode: verificationCode,
          resetCodeExpires: new Date(Date.now() + 5 * 60000) 
        } 
      }
    );

    // Gửi email chứa mã xác thực
    const html = `
      <h2>Đặt lại mật khẩu</h2>
      <p>Mã xác thực của bạn là: <strong>${verificationCode}</strong></p>
      <p>Mã này sẽ hết hạn sau 5 phút.</p>
    `;

    await sendMail({
      email,
      subject: 'Mã xác thực đặt lại mật khẩu',
      html
    });

    res.status(200).json({ message: 'Mã xác thực đã được gửi đến email của bạn' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi gửi mã xác thực', error: error.message });
  }
});

// API xác thực mã
router.post('/accounts/verify-code', async (req, res) => {
  try {
    const { email, verificationCode } = req.body;
    const db = await connectDb();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({
      email,
      resetCode: parseInt(verificationCode),
      resetCodeExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Mã xác thực không hợp lệ hoặc đã hết hạn' });
    }

    res.status(200).json({ message: 'Mã xác thực hợp lệ' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xác thực mã', error: error.message });
  }
});

// API đặt lại mật khẩu
router.post('/accounts/reset-password', async (req, res) => {
  try {
    const { email, verificationCode, newPassword } = req.body;
    const db = await connectDb();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({
      email,
      resetCode: parseInt(verificationCode),
      resetCodeExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Yêu cầu không hợp lệ' });
    }

    // Mã hóa mật khẩu mới
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    // Cập nhật mật khẩu và xóa mã reset
    await usersCollection.updateOne(
      { email },
      { 
        $set: { password: hashedPassword },
        $unset: { resetCode: "", resetCodeExpires: "" }
      }
    );

    res.status(200).json({ message: 'Đặt lại mật khẩu thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đặt lại mật khẩu', error: error.message });
  }
});

// API endpoints for discounts

// Get all discounts
router.get('/discounts', async (req, res) => {
  try {
    const db = await connectDb();
    const discountsCollection = db.collection('discounts');
    const discounts = await discountsCollection.find().toArray();
    res.status(200).json(discounts);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách giảm giá', error: error.message });
  }
});

// Create new discount
router.post('/discounts', async (req, res) => {
  try {
    const { type, itemId, discountType, discountValue } = req.body;
    const db = await connectDb();
    const discountsCollection = db.collection('discounts');
    const sanPhamCollection = db.collection('sanPham');

    // Tạo ID mới
    const lastDiscount = await discountsCollection.find().sort({ id: -1 }).limit(1).toArray();
    const newId = lastDiscount.length > 0 ? lastDiscount[0].id + 1 : 1;

    const product = await sanPhamCollection.findOne({ id: parseInt(itemId) });
    if (!product && type === 'product') {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    const originalPrice = type === 'product' 
      ? parseFloat(product.gia_sp.replace(/\./g, ''))
      : 0;
    
    let discountedPrice = 0;
    if (type === 'product') {
      if (discountType === 'percent') {
        discountedPrice = originalPrice * (1 - discountValue / 100);
      } else {
        discountedPrice = originalPrice - discountValue;
      }
    }

    const newDiscount = {
      id: newId,
      type,
      itemId: parseInt(itemId),
      discountType,
      discountValue: parseFloat(discountValue),
      active: true,
      createdAt: new Date(),
      originalPrice,
      currentPrice: Math.round(discountedPrice),
      discountHistory: type === 'product' ? [{
        type: discountType,
        value: parseFloat(discountValue),
        priceBeforeDiscount: originalPrice,
        priceAfterDiscount: Math.round(discountedPrice),
        appliedAt: new Date()
      }] : []
    };

    await discountsCollection.insertOne(newDiscount);

    // Apply discount to products
    if (type === 'product') {
      await applyDiscountToProduct(itemId, discountType, discountValue);
    } else {
      await applyDiscountToCategory(itemId, discountType, discountValue);
    }

    res.status(201).json(newDiscount);
  } catch (error) {
    console.error('Error creating discount:', error);
    res.status(500).json({ 
      message: 'Lỗi khi tạo giảm giá', 
      error: error.message,
      stack: error.stack 
    });
  }
});

// Toggle discount status
router.patch('/discounts/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const discountsCollection = db.collection('discounts');
    
    const discount = await discountsCollection.findOne({ id: parseInt(id) });
    if (!discount) {
      return res.status(404).json({ message: 'Không tìm thấy giảm giá' });
    }

    const result = await discountsCollection.updateOne(
      { id: parseInt(id) },
      { $set: { active: !discount.active } }
    );

    // Update product prices based on new status
    if (discount.type === 'product') {
      if (!discount.active) {
        await applyDiscountToProduct(discount.itemId, discount.discountType, discount.discountValue);
      } else {
        await removeDiscountFromProduct(discount.itemId);
      }
    } else {
      if (!discount.active) {
        await applyDiscountToCategory(discount.itemId, discount.discountType, discount.discountValue);
      } else {
        await removeDiscountFromCategory(discount.itemId);
      }
    }

    res.status(200).json({ message: 'Cập nhật trạng thái thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái', error: error.message });
  }
});

// Delete discount
router.delete('/discounts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const discountsCollection = db.collection('discounts');
    
    const discount = await discountsCollection.findOne({ id: parseInt(id) });
    if (!discount) {
      return res.status(404).json({ message: 'Không tìm thấy giảm giá' });
    }

    // Remove discount from products first
    if (discount.type === 'product') {
      await removeDiscountFromProduct(discount.itemId);
    } else {
      await removeDiscountFromCategory(discount.itemId);
    }

    await discountsCollection.deleteOne({ id: parseInt(id) });
    res.status(200).json({ message: 'Xóa giảm giá thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa giảm giá', error: error.message });
  }
});

// Helper functions
async function applyDiscountToProduct(productId, discountType, discountValue) {
  const db = await connectDb();
  const sanPhamCollection = db.collection('sanPham');
  
  const product = await sanPhamCollection.findOne({ id: productId });
  if (!product) return;

  // Bỏ dấu chấm từ giá gốc để tính toán
  const originalPrice = parseFloat(product.gia_sp.replace(/\./g, ''));
  let discountedPrice;

  if (discountType === 'percent') {
    discountedPrice = originalPrice * (1 - discountValue / 100);
  } else {
    discountedPrice = originalPrice - discountValue;
  }

  // Làm tròn số và định dạng với dấu chấm trước khi lưu
  const formattedPrice = Math.round(discountedPrice)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  await sanPhamCollection.updateOne(
    { id: productId },
    { $set: { giam_gia: formattedPrice } }
  );
}

async function applyDiscountToCategory(categoryId, discountType, discountValue) {
  const db = await connectDb();
  const sanPhamCollection = db.collection('sanPham');
  
  const products = await sanPhamCollection.find({ id_danhmuc: categoryId }).toArray();
  
  for (const product of products) {
    await applyDiscountToProduct(product.id, discountType, discountValue);
  }
}

async function removeDiscountFromProduct(productId) {
  const db = await connectDb();
  const sanPhamCollection = db.collection('sanPham');
  
  await sanPhamCollection.updateOne(
    { id: productId },
    { $unset: { giam_gia: "" } } // Đổi từ giamgia thành giam_gia
  );
}

async function removeDiscountFromCategory(categoryId) {
  const db = await connectDb();
  const sanPhamCollection = db.collection('sanPham');
  
  await sanPhamCollection.updateMany(
    { id_danhmuc: categoryId },
    { $unset: { giam_gia: "" } } // Đổi từ giamgia thành giam_gia
  );
}

// Thêm hàm formatCurrency
function formatCurrency(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Cập nhật API endpoint
router.patch('/discounts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { discountType, discountValue, finalPrice, totalDiscountValue, originalPrice } = req.body;
    const db = await connectDb();
    const discountsCollection = db.collection('discounts');
    const sanPhamCollection = db.collection('sanPham');
    
    const currentDiscount = await discountsCollection.findOne({ id: parseInt(id) });
    if (!currentDiscount) {
      return res.status(404).json({ message: 'Không tìm thấy giảm giá' });
    }

    // Tạo entry mới cho lịch sử
    const historyEntry = {
      type: discountType,
      value: parseFloat(discountValue),
      priceBeforeDiscount: currentDiscount.currentPrice,
      priceAfterDiscount: finalPrice,
      appliedAt: new Date(),
      discountPercent: parseFloat(discountValue) // Lưu % giảm của lần này
    };

    // Cập nhật discount
    await discountsCollection.updateOne(
      { id: parseInt(id) },
      {
        $set: {
          discountType,
          discountValue: totalDiscountValue, // Lưu tổng % giảm
          currentPrice: finalPrice,
          lastUpdated: new Date()
        },
        $push: {
          discountHistory: historyEntry
        }
      }
    );

    // Cập nhật giá sản phẩm
    await sanPhamCollection.updateOne(
      { id: currentDiscount.itemId },
      { $set: { giam_gia: formatCurrency(finalPrice) } }
    );

    res.status(200).json({
      message: 'Cập nhật giảm giá thành công',
      totalDiscountPercent: totalDiscountValue,
      historyEntry: {
        ...historyEntry,
        description: `Giảm ${discountValue}%`
      }
    });

  } catch (error) {
    console.error('Error updating discount:', error);
    res.status(500).json({ 
      message: 'Lỗi khi cập nhật giảm giá', 
      error: error.message 
    });
  }
});

// Thêm route để xóa lịch sử giảm giá
router.patch('/discounts/:id/history', async (req, res) => {
  try {
    const { id } = req.params;
    const { historyIndex, updatedHistory } = req.body;
    
    const db = await connectDb();
    const discountsCollection = db.collection('discounts');
    
    // Tìm discount cần cập nhật
    const discount = await discountsCollection.findOne({ id: parseInt(id) });
    if (!discount) {
      return res.status(404).json({ message: 'Không tìm thấy giảm giá' });
    }

    // Tính lại giá và tổng giảm giá từ đầu
    let newPrice = parseFloat(discount.originalPrice);
    let totalDiscountValue = 0;
    let lastDiscountAmount = 0;

    // Áp dụng lại từng lịch sử giảm giá theo thứ tự
    for (const history of updatedHistory) {
      const currentPrice = newPrice;
      
      if (history.type === 'percent') {
        // Tính giảm giá theo phần trăm
        lastDiscountAmount = newPrice * (parseFloat(history.value) / 100);
        newPrice = newPrice - lastDiscountAmount;
        totalDiscountValue += parseFloat(history.value);
      } else {
        // Tính giảm giá theo số tiền
        lastDiscountAmount = parseFloat(history.value);
        const percentValue = (lastDiscountAmount / discount.originalPrice) * 100;
        totalDiscountValue += percentValue;
        newPrice = newPrice - lastDiscountAmount;
      }

      // Cập nhật giá trước và sau cho mỗi lịch sử
      history.priceBeforeDiscount = Math.round(currentPrice);
      history.priceAfterDiscount = Math.round(newPrice);
    }

    // Cập nhật discount với lịch sử mới và giá mới
    const updateResult = await discountsCollection.updateOne(
      { id: parseInt(id) },
      { 
        $set: {
          discountHistory: updatedHistory,
          currentPrice: Math.round(newPrice),
          totalDiscountValue: parseFloat(totalDiscountValue.toFixed(2)),
          discountValue: parseFloat(totalDiscountValue.toFixed(2))
        }
      }
    );

    // Cập nhật giá giảm cho sản phẩm
    const sanPhamCollection = db.collection('sanPham');
    await sanPhamCollection.updateOne(
      { id: discount.itemId },
      { $set: { giam_gia: formatCurrency(Math.round(newPrice)) } }
    );

    // Lấy discount đã cập nhật
    const updatedDiscount = await discountsCollection.findOne({ id: parseInt(id) });

    res.status(200).json({ 
      message: 'Cập nhật lịch sử giảm giá thành công',
      updatedDiscount
    });

  } catch (error) {
    console.error('Error updating discount history:', error);
    res.status(500).json({ 
      message: 'Lỗi khi cập nhật lịch sử giảm giá', 
      error: error.message 
    });
  }
});

// Thêm route để xóa lịch sử giảm giá của danh mục
router.delete('/discounts/category/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const db = await connectDb();
    const discountsCollection = db.collection('discounts');
    const sanPhamCollection = db.collection('sanPham');

    // Lấy tất cả sản phẩm thuộc danh mục
    const products = await sanPhamCollection.find({ id_danhmuc: parseInt(categoryId) }).toArray();
    const productIds = products.map(p => p.id);

    // Lấy các discount của sản phẩm trong danh mục
    const discounts = await discountsCollection.find({
      itemId: { $in: productIds },
      type: 'product'
    }).toArray();

    // Xử lý từng discount
    for (const discount of discounts) {
      if (discount.discountHistory && discount.discountHistory.length > 0) {
        // Xóa lịch sử giảm giá mới nhất
        const updatedHistory = discount.discountHistory.slice(0, -1);
        
        if (updatedHistory.length === 0) {
          // Nếu không còn lịch sử, xóa discount
          await discountsCollection.deleteOne({ id: discount.id });
          continue;
        }

        // Tính lại giá và tổng giảm giá từ đầu
        let newPrice = parseFloat(discount.originalPrice);
        let totalDiscountValue = 0;
        let lastDiscountAmount = 0;

        // Áp dụng lại từng lịch sử giảm giá theo thứ tự
        for (const history of updatedHistory) {
          const currentPrice = newPrice;
          
          if (history.type === 'percent') {
            // Tính giảm giá theo phần trăm
            lastDiscountAmount = newPrice * (parseFloat(history.value) / 100);
            newPrice = newPrice - lastDiscountAmount;
            totalDiscountValue += parseFloat(history.value);
          } else {
            // Tính giảm giá theo số tiền
            lastDiscountAmount = parseFloat(history.value);
            const percentValue = (lastDiscountAmount / discount.originalPrice) * 100;
            totalDiscountValue += percentValue;
            newPrice = newPrice - lastDiscountAmount;
          }

          // Cập nhật giá trước và sau cho mỗi lịch sử
          history.priceBeforeDiscount = Math.round(currentPrice);
          history.priceAfterDiscount = Math.round(newPrice);
        }

        // Cập nhật discount
        await discountsCollection.updateOne(
          { id: discount.id },
          {
            $set: {
              discountHistory: updatedHistory,
              currentPrice: Math.round(newPrice),
              totalDiscountValue: parseFloat(totalDiscountValue.toFixed(2)),
              discountValue: parseFloat(totalDiscountValue.toFixed(2))
            }
          }
        );

        // Cập nhật giá sản phẩm
        await sanPhamCollection.updateOne(
          { id: discount.itemId },
          { $set: { giam_gia: formatCurrency(Math.round(newPrice)) } }
        );
      }
    }

    res.status(200).json({ message: 'Đã xóa giảm giá danh mục thành công' });
  } catch (error) {
    console.error('Error deleting category discount:', error);
    res.status(500).json({ 
      message: 'Lỗi khi xóa giảm giá danh mục',
      error: error.message 
    });
  }
});

// API endpoints for vouchers
const voucherSchema = {
  id: Number,
  code: String,
  discount_type: String, // 'percent' hoặc 'fixed'
  discount_value: Number,
  min_order_value: Number,
  max_discount: Number,
  quantity: Number,
  used_count: Number,
  start_date: Date,
  end_date: Date,
  active: Boolean,
  description: String
};

// Get all vouchers
router.get('/vouchers', async (req, res) => {
  try {
    const db = await connectDb();
    const vouchersCollection = db.collection('vouchers');
    const vouchers = await vouchersCollection.find().toArray();
    res.status(200).json(vouchers);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách voucher', error: error.message });
  }
});

// Create new voucher
router.post('/vouchers', async (req, res) => {
  try {
    const db = await connectDb();
    const vouchersCollection = db.collection('vouchers');

    // Tạo ID mới
    const lastVoucher = await vouchersCollection.find().sort({ id: -1 }).limit(1).toArray();
    const newId = lastVoucher.length > 0 ? lastVoucher[0].id + 1 : 1;

    const newVoucher = {
      id: newId,
      code: req.body.code.toUpperCase(),
      discount_type: req.body.discount_type,
      discount_value: parseFloat(req.body.discount_value),
      min_order_value: parseFloat(req.body.min_order_value),
      max_discount: parseFloat(req.body.max_discount),
      quantity: parseInt(req.body.quantity),
      used_count: 0,
      start_date: new Date(req.body.start_date),
      end_date: new Date(req.body.end_date),
      active: true,
      description: req.body.description,
      created_at: new Date()
    };

    await vouchersCollection.insertOne(newVoucher);
    res.status(201).json(newVoucher);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo voucher', error: error.message });
  }
});

// Update voucher
router.patch('/vouchers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const vouchersCollection = db.collection('vouchers');
    
    const updateData = {
      ...req.body,
      code: req.body.code?.toUpperCase(),
      discount_value: parseFloat(req.body.discount_value),
      min_order_value: parseFloat(req.body.min_order_value),
      max_discount: parseFloat(req.body.max_discount),
      quantity: parseInt(req.body.quantity),
      start_date: req.body.start_date ? new Date(req.body.start_date) : undefined,
      end_date: req.body.end_date ? new Date(req.body.end_date) : undefined
    };

    const result = await vouchersCollection.updateOne(
      { id: parseInt(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy voucher' });
    }

    res.status(200).json({ message: 'Cập nhật voucher thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật voucher', error: error.message });
  }
});

// Delete voucher
router.delete('/vouchers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const vouchersCollection = db.collection('vouchers');
    
    const result = await vouchersCollection.deleteOne({ id: parseInt(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy voucher' });
    }

    res.status(200).json({ message: 'Xóa voucher thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa voucher', error: error.message });
  }
});

// Toggle voucher status
router.patch('/vouchers/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectDb();
    const vouchersCollection = db.collection('vouchers');
    
    const voucher = await vouchersCollection.findOne({ id: parseInt(id) });
    if (!voucher) {
      return res.status(404).json({ message: 'Không tìm thấy voucher' });
    }

    await vouchersCollection.updateOne(
      { id: parseInt(id) },
      { $set: { active: !voucher.active } }
    );

    res.status(200).json({ message: 'Cập nhật trạng thái thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái', error: error.message });
  }
});

// Verify voucher
router.post('/vouchers/verify', async (req, res) => {
  try {
    const { code, orderValue } = req.body;
    const db = await connectDb();
    const vouchersCollection = db.collection('vouchers');
    
    const voucher = await vouchersCollection.findOne({ 
      code: code.toUpperCase(),
      active: true,
      quantity: { $gt: 0 },
      start_date: { $lte: new Date() },
      end_date: { $gte: new Date() }
    });

    if (!voucher) {
      return res.status(400).json({ message: 'Voucher không hợp lệ hoặc đã hết hạn' });
    }

    if (orderValue < voucher.min_order_value) {
      return res.status(400).json({ 
        message: `Giá trị đơn hàng tối thiểu là ${voucher.min_order_value.toLocaleString('vi-VN')}đ`
      });
    }

    let discountAmount;
    if (voucher.discount_type === 'percent') {
      discountAmount = (orderValue * voucher.discount_value) / 100;
      if (voucher.max_discount && discountAmount > voucher.max_discount) {
        discountAmount = voucher.max_discount;
      }
    } else {
      discountAmount = voucher.discount_value;
    }

    res.status(200).json({
      voucher,
      discountAmount: Math.round(discountAmount)
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi kiểm tra voucher', error: error.message });
  }
});

// Schema cho user_vouchers
const userVoucherSchema = {
  id: Number,
  user_id: Number,
  voucher_id: Number,
  received_date: Date,
  used: Boolean,
  used_date: Date
};

// API lấy voucher của user
router.get('/vouchers/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const db = await connectDb();
    const userVouchersCollection = db.collection('user_vouchers');
    const vouchersCollection = db.collection('vouchers');

    // Lấy tất cả voucher của user
    const userVouchers = await userVouchersCollection.find({ 
      user_id: parseInt(userId)
    }).toArray();

    // Lấy thông tin chi tiết của từng voucher
    const voucherDetails = await Promise.all(
      userVouchers.map(async (uv) => {
        const voucher = await vouchersCollection.findOne({ id: uv.voucher_id });
        return {
          ...voucher,
          received_date: uv.received_date,
          used: uv.used,
          used_date: uv.used_date
        };
      })
    );

    res.status(200).json(voucherDetails);
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi khi lấy danh sách voucher của user', 
      error: error.message 
    });
  }
});

// API nhận voucher
router.post('/vouchers/receive', async (req, res) => {
  try {
    const { userId, voucherId } = req.body;
    const db = await connectDb();
    const userVouchersCollection = db.collection('user_vouchers');
    const vouchersCollection = db.collection('vouchers');
    const usersCollection = db.collection('users');

    // Kiểm tra voucher có tồn tại và còn hiệu lực
    const voucher = await vouchersCollection.findOne({ 
      id: parseInt(voucherId),
      active: true,
      end_date: { $gte: new Date() },
      quantity: { $gt: 0 }
    });

    if (!voucher) {
      return res.status(400).json({ 
        success: false,
        message: 'Voucher không hợp lệ hoặc đã hết hạn' 
      });
    }

    // Kiểm tra user đã nhận voucher này chưa
    const existingUserVoucher = await userVouchersCollection.findOne({
      user_id: parseInt(userId),
      voucher_id: parseInt(voucherId)
    });

    if (existingUserVoucher) {
      return res.status(400).json({ 
        success: false,
        message: 'Bạn đã nhận voucher này rồi' 
      });
    }

    // Tạo ID mới cho user_voucher
    const lastUserVoucher = await userVouchersCollection
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray();
    const newId = lastUserVoucher.length > 0 ? lastUserVoucher[0].id + 1 : 1;

    // Thêm voucher cho user
    const userVoucher = {
      id: newId,
      user_id: parseInt(userId),
      voucher_id: parseInt(voucherId),
      received_date: new Date(),
      used: false,
      used_date: null,
      code: voucher.code,
      discount_type: voucher.discount_type,
      discount_value: voucher.discount_value,
      min_order_value: voucher.min_order_value,
      max_discount: voucher.max_discount,
      end_date: voucher.end_date
    };

    await userVouchersCollection.insertOne(userVoucher);

    // Giảm số lượng voucher còn lại
    await vouchersCollection.updateOne(
      { id: parseInt(voucherId) },
      { $inc: { quantity: -1 } }
    );

    // Thêm voucher vào mảng vouchers của user
    await usersCollection.updateOne(
      { id: parseInt(userId) },
      { 
        $push: { 
          vouchers: userVoucher 
        } 
      }
    );

    res.status(200).json({ 
      success: true,
      message: 'Nhận voucher thành công',
      userVoucher 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Lỗi khi nhận voucher', 
      error: error.message 
    });
  }
});

// API sử dụng voucher
router.post('/vouchers/use', async (req, res) => {
  try {
    const { userId, voucherId } = req.body;
    const db = await connectDb();
    const userVouchersCollection = db.collection('user_vouchers');

    // Tìm và cập nhật trạng thái voucher của user
    const result = await userVouchersCollection.updateOne(
      { 
        user_id: parseInt(userId),
        voucher_id: parseInt(voucherId),
        used: false
      },
      { 
        $set: { 
          used: true,
          used_date: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return res.status(400).json({ message: 'Voucher không tồn tại hoặc đã được sử dụng' });
    }

    res.status(200).json({ message: 'Sử dụng voucher thành công' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Lỗi khi sử dụng voucher', 
      error: error.message 
    });
  }
});

module.exports = router
