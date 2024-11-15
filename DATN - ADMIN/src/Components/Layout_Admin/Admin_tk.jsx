import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

export default function Admin_tk() {
  const [productData, setProductData] = useState([]);
  const [categoryStats, setCategoryStats] = useState({});
  
  // Fetch product data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/sanPham");
        const data = await response.json();
        setProductData(data);
        countProductsByCategory(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  // Count products by category
  const countProductsByCategory = (products) => {
    const stats = products.reduce((acc, product) => {
      const categoryId = product.id_danhmuc;
      acc[categoryId] = (acc[categoryId] || 0) + 1;
      return acc;
    }, {});
    setCategoryStats(stats);
  };

  // Prepare data for the pie chart
  const chartData = {
    labels: Object.keys(categoryStats).map((id) => `Danh mục ${id}`),
    datasets: [
      {
        label: "Sản phẩm theo danh mục",
        data: Object.values(categoryStats),
        backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD"],
      },
    ],
  };

  // Chart options to control the size
  const chartOptions = {
    responsive: true,  // Make it responsive
    maintainAspectRatio: false,  // Allow resizing while controlling the aspect ratio
  };

  return (
    <div>
      <h1 className="text-center" >Quản lý thống kê</h1>
      
      <div className="mt-4">
   
        {productData.length === 0 ? (
          <p>Không có sản phẩm nào.</p>
        ) : (
          <div style={{ position: "relative", height: "300px", width: "300px" }}>
            <Pie data={chartData} options={chartOptions} />
          </div>
        )}
      </div>

      {/* Table showing the category stats */}
      <div className="mt-4">
     
        {Object.keys(categoryStats).length > 0 ? (
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th className="text-center" scope="col">Danh mục</th>
                <th className="text-center" scope="col">Số sản phẩm</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(categoryStats).map((categoryId) => (
                <tr key={categoryId}>
                  <td >{`Danh mục ${categoryId}`}</td>
                  <td>{categoryStats[categoryId]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Không có dữ liệu thống kê.</p>
        )}
      </div>
    </div>
  );
}
