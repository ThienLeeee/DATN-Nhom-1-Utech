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
  const db = await connectDb()
  const sanPhamCollection = db.collection('sanPham')
  const sanPham = await sanPhamCollection.find().toArray()
  if (sanPham) {
    res.status(200).json(sanPham)
  } else {
    res.status(404).json({ message: 'Không tìm thấy sản phẩm !' })
  }
})

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
router.post('/sanPham', upload.single('hinh_anh'), async (req, res, next) => {
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
    chinh: req.file ? `${req.file.originalname}` : ''
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
      break;
    default:
      customCauHinh = cau_hinh; // Dùng cấu hình mặc định nếu không có trường hợp nào khớp
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
router.put('/sanPham/:id', upload.single('hinh_anh'), async (req, res, next) => {
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
  // Lấy hình ảnh mới hoặc giữ hình ảnh cũ
  let hinh_anh = {};
  if (req.file) {
      hinh_anh.chinh = req.file.originalname; // Lưu tên hình ảnh mới
  } else {
      let product = await sanPhamCollection.findOne({ id: parseInt(id) });
      hinh_anh.chinh = product.hinh_anh.chinh; // Giữ lại hình ảnh cũ nếu không có hình ảnh mới
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
  const id = parseInt(req.params.id)
  const db = await connectDb()
  const sanPhamCollection = db.collection('sanPham')

  try {
    const sanPham = await sanPhamCollection.find({ id_danhmuc: id }).toArray()
    if (sanPham.length > 0) {
      res.status(200).json(sanPham)
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm !' })
    }
  } catch (error) {
    console.log('error', error)
    res.status(500).send('error')
  }
})

//Lấy sản phẩm theo thương hiệu
router.get('/sanPham/thuong-hieu/:thuonghieu', async (req, res) => {
  try {
    const thuonghieu = req.params.thuonghieu.toLowerCase();
    const db = await connectDb();
    const sanPhamCollection = db.collection('sanPham');
    
    const sanPham = await sanPhamCollection
      .find({ 
        thuong_hieu: new RegExp(thuonghieu, 'i'),
        id_danhmuc: 1 // Chỉ lấy laptop
      })
      .toArray();

    if (sanPham.length > 0) {
      res.status(200).json(sanPham);
    } else {
      res.status(404).json({ 
        message: `Không tìm thấy sản phẩm thuộc thương hiệu ${thuonghieu}` 
      });
    }
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ message: 'Lỗi server khi tìm sản phẩm' });
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
    const hotProducts = await sanPhamCollection
      .find({ ban_chay: 1 })
      .toArray();

    if (hotProducts.length > 0) {
      res.status(200).json(hotProducts);
    } else {
      res.status(404).json({ 
        message: "Không tìm thấy sản phẩm bán chạy"
      });
    }
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm bán chạy:', error);
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

//Tìm kiếm sản phẩm
router.put('/user/:id', async (req, res) => {
  const id = parseInt(req.params.id); // Lấy id từ URL
  const db = await connectDb();
  const userCollection = db.collection('user');
  
  const { ma_san_pham, hoten, ngaysinh, gioitinh, sdt, email, diachi } = req.body;
  const editUser = { ma_san_pham, hoten, ngaysinh, gioitinh, sdt, email, diachi };

  try {
    const result = await userCollection.updateOne(
      { id }, 
      { $set: editUser }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng để cập nhật.' });
    }

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Cập nhật thành công', user: editUser });
    } else {
      res.status(200).json({ message: 'Không có thay đổi nào.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật', error });
  }
});


//show tài khoản
router.get('/user', async (req, res, next) => {
  const db = await connectDb()
  const accountsCollection = db.collection('user')
  const accounts = await accountsCollection.find().toArray()
  if (accounts) {
    res.status(200).json(accounts)
  } else {
    res.status(404).json({ message: 'Account not found' })
  }
})

// API tìm kiếm người dùng theo id_user
router.get('/user/:id', async (req, res, next) => {
  let  id  = req.params.id; // Lấy id từ URL
  const db = await connectDb()
  const userCollection = db.collection('user')
  const nguoidung= await userCollection.findOne({ id: parseInt(id) })
  if (nguoidung) {
    res.status(200).json(nguoidung)
  } else {
    res.status(404).json({ message: 'Không tìm thấy sản phẩm' })
  }
});

module.exports = router;

// API sửa người dùng theo id_user
router.put('/user/:id', async (req, res, next) => {
  const id = req.params.id; // Lấy id từ URL
  const db = await connectDb();
  const userCollection = db.collection('user')
  let{ma_san_pham,hoten,ngaysinh,gioitinh,sdt,email,diachi}=req.body
  let editUser={
    ma_san_pham,hoten,ngaysinh,gioitinh,sdt,email,diachi
  }
   // Cập nhật sản phẩm trong cơ sở dữ liệu
   const result = await sanPhamCollection.updateOne(
    { id: parseInt(id) },
    { $set: editProduct }
   );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùngđể cập nhật.' });
    }
    if (result.modifiedCount > 0) {
      res.status(200).json(editProduct);
    } else {
      res.status(404).json({ message: 'Sửa người dùng không thành công hoặc không có thay đổi nào.' });
    }
});

// API xóa người dùng theo id_user
router.delete('/user/:id', async (req, res) => {
  let id = req.params.id
  const db = await connectDb()
  const userCollection = db.collection('user')
  let nguoidung = await userCollection.deleteOne({ id: parseInt(id) })
  if (nguoidung) {
    res.status(200).json({ message: 'Xóa thành công' })
  } else {
    res.status(404).json({ message: 'Xóa ko thành công' })
  }
})


//API đăng ký tài khoản
router.post(
  '/accounts/register',
  upload.single('img'),
  async (req, res, next) => {
    let { username, email, password, repassword } = req.body
    const db = await connectDb()
    const accountCollection = db.collection('accounts')
    let account = await accountCollection.findOne({ email: email })
    if (account) {
      res.status(409).json({ message: 'Email đã tồn tại' })
    } else {
      let lastAccount = await accountCollection
        .find()
        .sort({ id: -1 })
        .limit(1)
        .toArray()
      let id = lastAccount[0] ? lastAccount[0].id + 1 : 1
      const salt = bcrypt.genSaltSync(10)
      let hashPassword = bcrypt.hashSync(password, salt)
      let newAccount = {
        id: id,
        username,
        email,
        password: hashPassword,
        repassword: hashPassword,
        role: 0
      }
      try {
        let result = await accountCollection.insertOne(newAccount)
        console.log(result)
        res.status(200).json({ message: 'Đăng ký oke!' })
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Thêm tài khoản lỗi!' })
      }
    }
  }
)

//API đăng nhập tài khoản có sử dụng token
router.post('/accounts/login', upload.single('img'), async (req, res, next) => {
  const db = await connectDb()
  const accountCollection = db.collection('accounts')
  let { username, password } = req.body
  const account = await accountCollection.findOne({ username: username })
  if (account) {
    if (bcrypt.compareSync(password, account.password)) {
      const token = jwt.sign(
        { username: account.username, role: account.role },
        'secretkey',
        { expiresIn: '60s' }
      )
      res.status(200).json({ token: token })
    } else {
      res.status(403).json({ message: 'password ko đúng' })
    }
  } else {
    res.status(403).json({ message: 'tên tk hoặc mk ko đúng' })
  }
})

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
    
    const lastComment = await binhLuanCollection
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray();
    
    const newId = lastComment.length > 0 ? lastComment[0].id + 1 : 1;
    
    const newComment = {
      id: newId,
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
          $regex: /\S/  // chứa ít nhất một ký tự không phải khoảng trắng
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

// API đăng nhập
router.post('/users/login', async (req, res) => {
  try {
    const db = await connectDb();
    const usersCollection = db.collection('users');
    
    // Tìm user theo username
    const user = await usersCollection.findOne({ username: req.body.username });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Tên đăng nhập không tồn tại!'
      });
    }

    // Kiểm tra mật khẩu
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Mật khẩu không đúng!'
      });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      'secretkey',
      { expiresIn: '24h' }
    );

    // Trả về thông tin user (không bao gồm password) và token
    const { password, ...userWithoutPassword } = user;
    
    res.status(200).json({
      success: true,
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

module.exports = router
