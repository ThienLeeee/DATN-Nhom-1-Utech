import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function Admin_thongke() {
  const [stats, setStats] = useState({
    products: [],
    categories: [],
    users: [],
    comments: [],
    orders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [productsRes, categoriesRes, usersRes, commentsRes, ordersRes] = await Promise.all([
          axios.get('http://localhost:3000/api/sanPham'),
          axios.get('http://localhost:3000/api/danhMuc'),
          axios.get('http://localhost:3000/api/user'),
          axios.get('http://localhost:3000/api/binhLuan'),
          axios.get('http://localhost:3000/api/donHang')
        ]);

        setStats({
          products: productsRes.data,
          categories: categoriesRes.data,
          users: usersRes.data,
          comments: commentsRes.data,
          orders: ordersRes.data
        });
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Dữ liệu cho biểu đồ sản phẩm theo danh mục
  const productsByCategoryData = {
    labels: stats.categories.map(cat => cat.tendm),
    datasets: [{
      data: stats.categories.map(cat => 
        stats.products.filter(prod => prod.id_danhmuc === cat.id).length
      ),
      backgroundColor: [
        '#5E72E4', // Primary
        '#2DCE89', // Success
        '#11CDEF', // Info
        '#FB6340', // Warning
        '#F5365C'  // Danger
      ]
    }]
  };

  // Dữ liệu cho biểu đồ comments theo tháng
  const getCommentsChartData = () => {
    const monthlyComments = new Array(12).fill(0);
    stats.comments.forEach(comment => {
      const month = new Date(comment.time).getMonth();
      monthlyComments[month]++;
    });

    return {
      labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
      datasets: [{
        label: 'Số lượng bình luận',
        data: monthlyComments,
        backgroundColor: '#5E72E4',
        borderColor: '#5E72E4',
        borderWidth: 2
      }]
    };
  };

  // Thêm hàm tính toán dữ liệu cho biểu đồ đơn hàng
  const getOrdersChartData = () => {
    const statusCounts = {
      'Chờ xử lý': 0,
      'Đang xử lý': 0,
      'Đang giao hàng': 0,
      'Đã giao hàng': 0,
      'Đã hủy': 0
    };

    stats.orders.forEach(order => {
      if (statusCounts.hasOwnProperty(order.trangThai)) {
        statusCounts[order.trangThai]++;
      }
    });

    return {
      labels: Object.keys(statusCounts),
      datasets: [{
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(251, 99, 64, 0.8)',   // Chờ xử lý
          'rgba(94, 114, 228, 0.8)',  // Đang xử lý
          'rgba(17, 205, 239, 0.8)',  // Đang giao hàng
          'rgba(45, 206, 137, 0.8)',  // Đã giao hàng
          'rgba(245, 54, 92, 0.8)'    // Đã hủy
        ],
        borderWidth: 1
      }]
    };
  };

  if (loading) {
    return <div className="text-center p-5">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="container-fluid py-4">
      {/* Stats Cards Row */}
      <div className="row">
        <div className="col-xl-3 col-sm-6 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2 bg-gradient-primary position-relative">
              <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                <i className="bi bi-box-seam opacity-10"></i>
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize text-white">Tổng sản phẩm</p>
                <h4 className="mb-0 text-white">{stats.products.length}</h4>
              </div>
            </div>
            <div className="card-footer p-3">
              <p className="mb-0">
                <span className="text-success text-sm font-weight-bolder">+55% </span>
                so với tuần trước
              </p>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2 bg-gradient-success position-relative">
              <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                <i className="bi bi-list-ul opacity-10"></i>
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize text-white">Tổng danh mục</p>
                <h4 className="mb-0 text-white">{stats.categories.length}</h4>
              </div>
            </div>
            <div className="card-footer p-3">
              <p className="mb-0">
                <span className="text-success text-sm font-weight-bolder">+3% </span>
                so với tháng trước
              </p>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2 bg-gradient-info position-relative">
              <div className="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute">
                <i className="bi bi-people opacity-10"></i>
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize text-white">Tổng người dùng</p>
                <h4 className="mb-0 text-white">{stats.users.length}</h4>
              </div>
            </div>
            <div className="card-footer p-3">
              <p className="mb-0">
                <span className="text-success text-sm font-weight-bolder">+12% </span>
                so với tháng trước
              </p>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2 bg-gradient-warning position-relative">
              <div className="icon icon-lg icon-shape bg-gradient-warning shadow-warning text-center border-radius-xl mt-n4 position-absolute">
                <i className="bi bi-chat-dots opacity-10"></i>
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize text-white">Tổng bình luận</p>
                <h4 className="mb-0 text-white">{stats.comments.length}</h4>
              </div>
            </div>
            <div className="card-footer p-3">
              <p className="mb-0">
                <span className="text-success text-sm font-weight-bolder">+8% </span>
                so với tuần trước
              </p>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2 bg-gradient-info position-relative">
              <div className="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute">
                <i className="bi bi-cart opacity-10"></i>
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize text-white">Tổng đơn hàng</p>
                <h4 className="mb-0 text-white">{stats.orders.length}</h4>
              </div>
            </div>
            <div className="card-footer p-3">
              <div className="d-flex justify-content-between">
                <div>
                  <span className="text-success text-sm font-weight-bolder">
                    {stats.orders.filter(order => order.trangThai === "Đã giao hàng").length}
                  </span>
                  <span className="text-sm ms-1">đã giao</span>
                </div>
                <div>
                  <span className="text-danger text-sm font-weight-bolder">
                    {stats.orders.filter(order => order.trangThai === "Đã hủy").length}
                  </span>
                  <span className="text-sm ms-1">đã hủy</span>
                </div>
                <div>
                  <span className="text-warning text-sm font-weight-bolder">
                    {stats.orders.filter(order => order.trangThai === "Chờ xử lý").length}
                  </span>
                  <span className="text-sm ms-1">chờ xử lý</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row mt-4">
        <div className="col-lg-6 mb-4">
          <div className="card z-index-2">
            <div className="card-header p-3">
              <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1 mb-3">
                <div className="chart">
                  <Pie 
                    data={productsByCategoryData} 
                    options={{
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            color: '#344767'
                          }
                        }
                      },
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </div>
              <h6 className="ms-2 mt-4 mb-0">Sản phẩm theo danh mục</h6>
              <p className="text-sm ms-2">
                <span className="font-weight-bold">+4% </span>trong năm 2024
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card z-index-2">
            <div className="card-header p-3">
              <div className="bg-gradient-success shadow-success border-radius-lg py-3 pe-1 mb-3">
                <div className="chart">
                  <Bar 
                    data={getCommentsChartData()}
                    options={{
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: false,
                            borderDash: [5, 5],
                            color: 'rgba(255, 255, 255, .2)'
                          },
                          ticks: {
                            stepSize: 1,
                            color: '#fff'
                          }
                        },
                        x: {
                          grid: {
                            display: false
                          },
                          ticks: {
                            color: '#fff'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
              <h6 className="ms-2 mt-4 mb-0">Bình luận theo tháng</h6>
              <p className="text-sm ms-2">
                <span className="font-weight-bold">+10% </span>so với tháng trước
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card z-index-2">
            <div className="card-header p-3">
              <div className="bg-gradient-danger shadow-danger border-radius-lg py-3 pe-1 mb-3">
                <div className="chart">
                  <Pie 
                    data={getOrdersChartData()} 
                    options={{
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            color: '#344767'
                          }
                        }
                      },
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </div>
              <h6 className="ms-2 mt-4 mb-0">Đơn hàng theo trạng thái</h6>
              <p className="text-sm ms-2">
                <span className="font-weight-bold">
                  {((stats.orders.filter(order => order.trangThai === "Đã giao hàng").length / stats.orders.length) * 100).toFixed(1)}%
                </span> tỷ lệ giao hàng thành công
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Row */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header pb-0">
              <h6 className="mb-0">Thống kê chi tiết danh mục</h6>
            </div>
            <div className="card-body px-0 pt-0 pb-2">
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Danh mục</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Số sản phẩm</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Số bình luận</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.categories.map(category => {
                      const productCount = stats.products.filter(p => p.id_danhmuc === category.id).length;
                      const commentCount = stats.comments.filter(c => {
                        const product = stats.products.find(p => p.id === c.productId);
                        return product && product.id_danhmuc === category.id;
                      }).length;

                      return (
                        <tr key={category.id}>
                          <td>
                            <div className="d-flex px-3 py-1">
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">{category.tendm}</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-sm font-weight-bold mb-0">{productCount}</p>
                          </td>
                          <td>
                            <p className="text-sm font-weight-bold mb-0">{commentCount}</p>
                          </td>
                          <td>
                            <span className={`badge badge-sm ${category.locked ? 'bg-gradient-danger' : 'bg-gradient-success'}`}>
                              {category.locked ? 'Đã khóa' : 'Hoạt động'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thêm bảng thống kê đơn hàng */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header pb-0">
              <h6 className="mb-0">Thống kê đơn hàng theo trạng thái</h6>
            </div>
            <div className="card-body px-0 pt-0 pb-2">
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Trạng thái</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Số lượng</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Tổng giá trị</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Tỷ lệ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Chờ xử lý', 'Đang xử lý', 'Đang giao hàng', 'Đã giao hàng', 'Đã hủy'].map(status => {
                      const ordersWithStatus = stats.orders.filter(order => order.trangThai === status);
                      const totalValue = ordersWithStatus.reduce((sum, order) => sum + order.tongTien, 0);
                      const percentage = ((ordersWithStatus.length / stats.orders.length) * 100).toFixed(1);
                      
                      return (
                        <tr key={status}>
                          <td>
                            <div className="d-flex px-3 py-1">
                              <div className="d-flex flex-column justify-content-center">
                                <span className={`badge badge-sm bg-gradient-${
                                  status === 'Đã giao hàng' ? 'success' :
                                  status === 'Đã hủy' ? 'danger' :
                                  status === 'Chờ xử lý' ? 'warning' :
                                  status === 'Đang giao hàng' ? 'info' : 'primary'
                                }`}>
                                  {status}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-sm font-weight-bold mb-0">{ordersWithStatus.length}</p>
                          </td>
                          <td>
                            <p className="text-sm font-weight-bold mb-0">
                              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalValue)}
                            </p>
                          </td>
                          <td>
                            <p className="text-sm font-weight-bold mb-0">{percentage}%</p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}