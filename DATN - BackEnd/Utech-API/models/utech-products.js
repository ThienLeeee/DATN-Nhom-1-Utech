// Thư viện MongoClient giúp kết nối với MongoDB
const MongoClient = require('mongodb').MongoClient
// URL của cơ sở dữ liệu MongoDB
const url = 'mongodb://localhost:27017'
// Tên database và collection
const dbName = 'Utech-DB'
// Mảng sản phẩm
const sanPham = [
  {
    id: 9,
    id_danhmuc: 1,
    ma_san_pham: 'B13UCX',
    ten_sp: 'Laptop gaming MSI Thin 15 B13UCX',
    gia_sp: "18.490.000",
    hinh_anh: {
      chinh:'B13UCX-chinh.png',    
      phu1: 'B13UCX-phu1.png',
      phu2: 'B13UCX-phu2.png',
      phu3: 'B13UCX-phu3.png',
      phu4: 'B13UCX-phu4.png',
      phu5: 'B13UCX-phu5.png',
    },

    thuong_hieu: 'msi',

    bao_hanh: '24 tháng',

    cau_hinh: {
      cpu: 'Intel Core i5-13420H 2.1GHz up to 4.6GHz 12MB',
      ram: '16GB (2 x 8GB) DDR4 3200MHz (2x SO-DIMM socket, up to 64GB SDRAM)',
      o_cung: '512GB NVMe PCIe SSD Gen3x4',
      vga: 'NVIDIA® GeForce RTX™ 2050 4GB',
      man_hinh: '15.6" FHD (1920 x 1080), 144Hz, IPS-Level, 45% NTSC, 65% sRGB'
    },

    //ko can thiet
    cau_hinh_chi_tiet: {
      cpu: 'Intel® Core™ i5-12450HX, 8C (4P + 4E) / 12T, P-core up to 4.4GHz, E-core up to 3.1GHz, 12MB',
      ram: '16GB (8GB Onboard + 8GB Sodimm) DDR4 3200MHz',
      o_cung: '512GB SSD M.2 2242 PCIe 4.0x4 NVMe',
      vga: 'NVIDIA® GeForce RTX™ 3050 6GB GDDR6, Boost Clock 1732MHz, TGP 95W',
      man_hinh: '15.6" FHD (1920x1080) IPS 300nits Anti-glare, 100% sRGB, 144Hz, G-SYNC®',
      cong_ket_noi: {
       cong_1:'3x USB-A (USB 5Gbps / USB 3.2 Gen 1)',
       cong_2:'1x USB-C® (USB 10Gbps / USB 3.2 Gen 2), with PD 140W and DisplayPort™ 1.4',
       cong_3:'1x HDMI® 2.1, up to 8K/60Hz',
       cong_4:'1x Headphone / microphone combo jack (3.5mm)',
       cong_5:'1x Ethernet (RJ-45)',
       cong_6: '1x Power connector',
      },

      audio: 'Stereo speakers, 2W x2, optimized with Nahimic Audio',
      LAN:'100/1000M',
      wifi_bluetooth: 'Wi-Fi® 6, 11ax 2x2 + BT5.2',
      webcam: 'FHD 1080p with E-shutter',
      he_dieu_hanh: 'Windows 11 Home',
      pin: '3-Cell 52.4 Battery (Whr)',
      trong_luong: '1.86 kg',
      mau_sac: 'Cosmos Gray',
      chat_lieu: 'PC-ABS (Top), PC-ABS (Bottom)',
      kich_thuoc: '359.86 x 258.7 x 21.9-23.9 mm (14.17 x 10.19 x 0.86-0.94 inches)'

    }
  },

]
// Hàm kết nối với MongoDB và thực hiện các thao tác
async function main () {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = client.db(dbName)
  await db.createCollection('sanPham')
  await db.collection('sanPham').insertMany(sanPham)
  client.close()
}
// Gọi hàm main
main().catch(console.error)
