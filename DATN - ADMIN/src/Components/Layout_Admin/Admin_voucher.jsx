import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './styles/Admin_voucher.css';

export default function Admin_voucher() {
  const [vouchers, setVouchers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discount_type: 'percent',
    discount_value: '',
    min_order_value: '',
    max_discount: '',
    quantity: '',
    start_date: new Date(),
    end_date: new Date(),
    description: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [defaultVoucher, setDefaultVoucher] = useState(null);

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/vouchers');
      setVouchers(response.data);
      
      const defaultVoucher = response.data.find(v => v.code === 'UTECHCHAOBANMOI');
      setDefaultVoucher(defaultVoucher);
    } catch (error) {
      toast.error('Lỗi khi lấy danh sách voucher');
    }
  };

  const createDefaultVoucher = async () => {
    try {
      const defaultVoucherData = {
        code: 'UTECHCHAOBANMOI',
        discount_type: 'percent',
        discount_value: 10,
        min_order_value: 100000,
        max_discount: 50000,
        quantity: 100,
        start_date: new Date(),
        end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        description: 'Voucher chào mừng thành viên mới',
        is_default: true,
        one_time_use: true
      };

      await axios.post('http://localhost:3000/api/vouchers', defaultVoucherData);
      toast.success('Đã tạo voucher mặc định');
      fetchVouchers();
    } catch (error) {
      toast.error('Lỗi khi tạo voucher mặc định');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.patch(`http://localhost:3000/api/vouchers/${editingId}`, formData);
        toast.success('Cập nhật voucher thành công');
      } else {
        await axios.post('http://localhost:3000/api/vouchers', formData);
        toast.success('Tạo voucher thành công');
      }
      resetForm();
      fetchVouchers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const handleEdit = (voucher) => {
    setFormData({
      code: voucher.code,
      discount_type: voucher.discount_type,
      discount_value: voucher.discount_value,
      min_order_value: voucher.min_order_value,
      max_discount: voucher.max_discount,
      quantity: voucher.quantity,
      start_date: new Date(voucher.start_date),
      end_date: new Date(voucher.end_date),
      description: voucher.description
    });
    setEditingId(voucher.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa voucher này?')) {
      try {
        await axios.delete(`http://localhost:3000/api/vouchers/${id}`);
        toast.success('Xóa voucher thành công');
        fetchVouchers();
      } catch (error) {
        toast.error('Lỗi khi xóa voucher');
      }
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/vouchers/${id}/toggle`);
      toast.success('Cập nhật trạng thái thành công');
      fetchVouchers();
    } catch (error) {
      toast.error('Lỗi khi cập nhật trạng thái');
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      discount_type: 'percent',
      discount_value: '',
      min_order_value: '',
      max_discount: '',
      quantity: '',
      start_date: new Date(),
      end_date: new Date(),
      description: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="admin-voucher">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">Quản lý Voucher</h5>
          <div>
            {!defaultVoucher && (
              <button
                className="btn btn-info me-2"
                onClick={createDefaultVoucher}
              >
                Tạo Voucher Mặc Định
              </button>
            )}
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              Thêm Voucher Mới
            </button>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="voucher-form mb-4">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Mã voucher</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Loại giảm giá</label>
                <select
                  className="form-select"
                  value={formData.discount_type}
                  onChange={(e) => setFormData({...formData, discount_type: e.target.value})}
                >
                  <option value="percent">Phần trăm</option>
                  <option value="fixed">Số tiền cố định</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label>Giá trị giảm</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.discount_value}
                  onChange={(e) => setFormData({...formData, discount_value: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Giá trị đơn hàng tối thiểu</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.min_order_value}
                  onChange={(e) => setFormData({...formData, min_order_value: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Giảm tối đa</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.max_discount}
                  onChange={(e) => setFormData({...formData, max_discount: e.target.value})}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Số lượng</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Ngày bắt đầu</label>
                <DatePicker
                  selected={formData.start_date}
                  onChange={(date) => setFormData({...formData, start_date: date})}
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Ngày kết thúc</label>
                <DatePicker
                  selected={formData.end_date}
                  onChange={(date) => setFormData({...formData, end_date: date})}
                  className="form-control"
                  dateFormat="dd/MM/yyyy"
                  required
                />
              </div>
              <div className="col-12 mb-3">
                <label>Mô tả</label>
                <textarea
                  className="form-control"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>
            <div className="mt-3">
              <button type="submit" className="btn btn-primary me-2">
                {editingId ? 'Cập nhật' : 'Tạo voucher'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Hủy
              </button>
            </div>
          </form>
        )}

        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Mã</th>
                  <th>Loại</th>
                  <th>Giá trị</th>
                  <th>Đơn tối thiểu</th>
                  <th>Giảm tối đa</th>
                  <th>Còn lại</th>
                  <th>Thời hạn</th>
                  <th>Loại voucher</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map(voucher => (
                  <tr key={voucher.id}>
                    <td>{voucher.code}</td>
                    <td>{voucher.discount_type === 'percent' ? 'Phần trăm' : 'Cố định'}</td>
                    <td>
                      {voucher.discount_type === 'percent' 
                        ? `${voucher.discount_value}%`
                        : `${voucher.discount_value.toLocaleString('vi-VN')}đ`
                      }
                    </td>
                    <td>{voucher.min_order_value.toLocaleString('vi-VN')}đ</td>
                    <td>
                      {voucher.max_discount 
                        ? `${voucher.max_discount.toLocaleString('vi-VN')}đ`
                        : '-'
                      }
                    </td>
                    <td>{voucher.quantity - voucher.used_count}</td>
                    <td>
                      {new Date(voucher.start_date).toLocaleDateString('vi-VN')}
                      <br />
                      đến
                      <br />
                      {new Date(voucher.end_date).toLocaleDateString('vi-VN')}
                    </td>
                    <td>
                      {voucher.is_default ? (
                        <span className="badge bg-info">Mặc định</span>
                      ) : (
                        <span className="badge bg-secondary">Thường</span>
                      )}
                    </td>
                    <td>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={voucher.active}
                          onChange={() => handleToggleStatus(voucher.id)}
                          disabled={voucher.is_default}
                        />
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() => handleEdit(voucher)}
                        disabled={voucher.is_default}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(voucher.id)}
                        disabled={voucher.is_default}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
