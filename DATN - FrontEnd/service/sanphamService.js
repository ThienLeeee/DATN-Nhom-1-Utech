const url = 'http://localhost:3000/api'

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
