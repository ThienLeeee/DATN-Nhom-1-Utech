const url = 'http://localhost:3000/api'

export const fetchDanhmuc = async () => {
  try {
    const response = await fetch(`${url}/danhMuc`)
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

// Lấy thông tin danh mục theo ID
export const fetchDanhMucById = async id => {
  try {
    const response = await fetch(`${url}/danhMuc/${id}`)
    if (!response.ok) {
      throw new Error('Lỗi mạng: Không thể lấy thông tin danh mục')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Lỗi trong fetchDanhMucById:', error)
    throw error
  }
}
