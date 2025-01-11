import { useState, useEffect } from 'react';
import '/public/css/Admin_dh.css';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';

export default function Revenue() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const calculateTotals = () => { 
    let totalOriginalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalVoucherDiscount = 0;
    let totalRevenue = 0;
    let totalQuantity = 0;

    const filteredOrders = filterOrdersByDateRange();

    filteredOrders.forEach(order => {
      order.sanPham.forEach(sp => {
        totalOriginalPrice += sp.gia_goc * sp.soLuong;
        totalDiscountedPrice += sp.gia_giam * sp.soLuong;
        totalQuantity += sp.soLuong;
      });
      totalVoucherDiscount += order.giamGia;
      totalRevenue += order.tongTien;
    });

    return { totalOriginalPrice, totalDiscountedPrice, totalVoucherDiscount, totalRevenue, totalQuantity };
  };

  const filterOrdersByDateRange = () => {
    if (!startDate || !endDate) return orders;

    const start = new Date(startDate);
    const end = new Date(endDate);
    return orders.filter(order => {
      const orderDate = new Date(order.ngayDat);
      return orderDate >= start && orderDate <= end;
    });
  };

  const { totalOriginalPrice, totalDiscountedPrice, totalVoucherDiscount, totalRevenue, totalQuantity } = calculateTotals();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/donHang');
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    const filteredOrders = filterOrdersByDateRange();
    const excelData = filteredOrders.flatMap(order => 
      order.sanPham.map(sp => ({
        'Mã ĐH': order.id,
        'Ngày đặt': new Date(order.ngayDat).toLocaleDateString('vi-VN'),
        'Tên sản phẩm': sp.ten_sp,
        'Số lượng': sp.soLuong,
        'Giá gốc': sp.gia_goc,
        'Giá đã giảm': sp.gia_giam,
        'Giảm voucher': order.giamGia,
        'Tổng tiền': order.tongTien,
        'Trạng thái thanh toán': order.trangthai_thanhtoan,
        'Hình thức thanh toán': order.hinhThucThanhToan
      }))
    );

    const totals = {
      'Mã ĐH': '',
      'Ngày đặt': '',
      'Tên sản phẩm': 'Tổng cộng:',
      'Số lượng': totalQuantity,
      'Giá gốc': totalOriginalPrice,
      'Giá đã giảm': totalDiscountedPrice,
      'Giảm voucher': totalVoucherDiscount,
      'Tổng tiền': totalRevenue,
      'Trạng thái thanh toán': '',
      'Hình thức thanh toán': ''
    };
    excelData.push(totals);

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Revenue');
    XLSX.writeFile(workbook, 'Revenue.xlsx');
  };

  return (
    <div className="admin-orders">
      <h2 className="page-title">Quản lý doanh thu</h2>

      <div className="date-filter d-flex justify-content-center">
        <label className='d-flex ' style={{marginTop:'10px',marginRight:'10px',marginBottom:'10px'}}>
          <p style={{marginBottom:'7px',marginTop:'7px',marginRight:'10px'}}>
          Ngày bắt đầu
          </p>
          <input style={{borderRadius:'5px',border:"1px solid",width:'112.6px',height:"36.6px"}} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label className='d-flex' style={{marginTop:'10px',marginBottom:'10px'}}>
          <p style={{marginBottom:'7px',marginTop:'7px',marginRight:'10px'}}>
           Ngày kết thúc
          </p>
          <input style={{borderRadius:'5px',border:"1px solid",width:'112.6px',height:"36.6px"}} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button onClick={exportToExcel} style={{marginBottom: '20px', padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer',marginLeft:'20px',marginTop:'9px',height:"40px"}}>
        Xuất Excel
      </button>
      </div>

      

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Mã ĐH</th>
              <th>Ngày đặt</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá gốc</th>
              <th>Giá đã giảm</th>
              <th>Giảm voucher</th>
              <th>Tổng tiền</th>
              <th>Trạng thái thanh toán</th>
              <th>Hình thức thanh toán</th>
            </tr>
          </thead>
          <tbody>
            {filterOrdersByDateRange().map((order) => (
              order.sanPham.map((sp, index) => (
                <tr key={`${order.id}-${index}`}>
                  {index === 0 && (
                    <>
                      <td rowSpan={order.sanPham.length}>#{order.id}</td>
                      <td rowSpan={order.sanPham.length}>{new Date(order.ngayDat).toLocaleDateString('vi-VN')}</td>
                    </>
                  )}
                  <td>{sp.ten_sp}</td>
                  <td>{sp.soLuong}</td>
                  <td>{sp.gia_goc.toLocaleString('vi-VN')}</td>
                  <td>{sp.gia_giam !== 0 ? sp.gia_giam.toLocaleString('vi-VN') : '0'}</td>
                  <td>{order.giamGia.toLocaleString('vi-VN')}</td>
                  {index === 0 && (
                    <>
                      <td rowSpan={order.sanPham.length}>{order.tongTien.toLocaleString('vi-VN')}</td>
                      <td rowSpan={order.sanPham.length}>{order.trangthai_thanhtoan}</td>
                      <td rowSpan={order.sanPham.length}>{order.hinhThucThanhToan}</td>
                    </>
                  )}
                </tr>
              ))
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Tổng cộng:</td>
              <td>{totalQuantity}</td>
              <td>{totalOriginalPrice.toLocaleString('vi-VN')}</td>
              <td>{totalDiscountedPrice.toLocaleString('vi-VN')}</td>
              <td>{totalVoucherDiscount.toLocaleString('vi-VN')}</td>
              <td>{totalRevenue.toLocaleString('vi-VN')}</td>
              
              <td colSpan="2"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
