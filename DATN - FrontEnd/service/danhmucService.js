const url = 'http://localhost:3000/api'

export const fetchDanhmuc = async () => {
    try {
      const response = await fetch(`${url}/danhMuc`);
      if (!response.ok) {
        throw new Error('Mạng không ổn');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Lỗi rồi:', error);
      throw error;
    }
};