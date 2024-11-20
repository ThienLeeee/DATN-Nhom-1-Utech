const url = 'http://localhost:3000/api'

// ... existing code ...
export const fetchSanpham = async () => {
  try {
    const response = await fetch(`${url}/sanPham`)
    if (!response.ok) {
      throw new Error('Mạng không ổn')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Lỗi rồi:', error)
    throw error
  }
}
export const fetchSanPhamTheoSearch = async (keyword) => {
  try {
    const response = await fetch(`${url}/sanpham?keyword=${keyword}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm sản phẩm:", error);
    return [];
  }
};

export const fetchSanPhamTheoDanhMucVaThuongHieu = async (id_danhmuc, thuong_hieu) => {
  try {
    const response = await fetch(`${url}/sanPham/id_danhmuc/${id_danhmuc}/thuong_hieu/${thuong_hieu}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm sản phẩm theo danh mục và thương hiệu:", error);
    return { message: 'Không thể tải dữ liệu', products: [] };
  }
};


// Api chi tiết sản phẩm
export const fetchSanphamIddm = async id => {
  // Ví dụ sử dụng fetch để gọi API
  const response = await fetch(`${url}/sanPham/${id}`)
  const data = await response.json()
  return data
}

// Api sản phẩm theo danh mục
export const fetchSanPhamTheoDm = async id => {
  try {
    const response = await fetch(`${url}/sanPham/id_danhmuc/${id}`)
    if (!response.ok) {
      throw new Error('Mạng không ổn')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Lỗi rồi:', error)
    throw error
  }
}
