var express = require('express')
var router = express.Router()

//Gọi thư viện bcryptjs
const bcrypt = require('bcryptjs')

//Gọi thư viện để sử dụng đc token
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
  const id = parseInt(req.params.id); // Make sure id is parsed as an integer
  const db = await connectDb();
  const categoriesCollection = db.collection('danhMuc');
  try {
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
  let { ma_san_pham, ten_sp, gia_sp, bao_hanh, thuong_hieu, id_danhmuc, cau_hinh } = req.body;
  try {
    cau_hinh = JSON.parse(cau_hinh);  // Chuyển cau_hinh thành đối tượng nếu nó là chuỗi JSON
  } catch (error) {
    return res.status(400).json({ message: 'Cấu hình sản phẩm không hợp lệ.' });
  }
  // Parse id_danhmuc as an integer and determine the folder based on category ID
  const categoryId = parseInt(id_danhmuc);
  const folder = getImagePath(categoryId);
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
    hinh_anh 
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
  let id = req.params.id
  const db = await connectDb()
  const sanPhamCollection = db.collection('sanPham')
  let product = await sanPhamCollection.deleteOne({ id: parseInt(id) })
  if (product) {
    res.status(200).json({ message: 'Xóa thành công' })
  } else {
    res.status(404).json({ message: 'Xóa ko thành công' })
  }
})

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
      trangThai: "Chờ xử lý"
    };

    await donHangCollection.insertOne(newOrder);
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
    const { trangThai } = req.body;
    const db = await connectDb();
    const donHangCollection = db.collection('donHang');
    
    const result = await donHangCollection.updateOne(
      { id: parseInt(id) },
      { $set: { trangThai } }
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

module.exports = router
