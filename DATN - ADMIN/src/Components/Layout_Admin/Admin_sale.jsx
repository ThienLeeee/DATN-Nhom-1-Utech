import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/Admin_sale.css';
import Swal from 'sweetalert2';
import Select from 'react-select';

export default function Admin_sale() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [discountedItems, setDiscountedItems] = useState([]);
  const [selectedType, setSelectedType] = useState('product'); // 'product' or 'category'
  const [selectedItem, setSelectedItem] = useState('');
  const [discountType, setDiscountType] = useState('percent'); // 'percent' or 'fixed'
  const [discountValue, setDiscountValue] = useState('');
  const [valueError, setValueError] = useState('');
  const [selectedProductInfo, setSelectedProductInfo] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);    
  const [selectedCategoryDetails, setSelectedCategoryDetails] = useState(null);
  const [showDiscountHistory, setShowDiscountHistory] = useState(false);
  const [selectedDiscountHistory, setSelectedDiscountHistory] = useState(null);
  const [categoryDiscounts, setCategoryDiscounts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Tạo options cho select box sản phẩm
  const productOptions = products.map(product => ({
    value: product.id.toString(),
    label: product.ten_sp,
    product: product // lưu thông tin sản phẩm để dùng khi cần
  }));

  // Custom styles cho react-select để match với giao diện hiện tại
  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '38px',
      height: '38px',
      borderColor: '#dee2e6',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#dee2e6'
      }
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '38px',
      padding: '0 8px'
    }),
    input: (provided) => ({
      ...provided,
      margin: '0px'
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '38px'
    })
  };

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, discountsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/sanPham'),
          axios.get('http://localhost:3000/api/danhMuc'),
          axios.get('http://localhost:3000/api/discounts')
        ]);
        
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
        setDiscountedItems(discountsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Lỗi khi tải dữ liệu');
      }
    };
    fetchData();
  }, []);

  // Thêm useEffect để khởi tạo danh sách danh mục với giảm giá 0%
  useEffect(() => {
    if (categories.length > 0) {
      // Tạo danh sách categoryDiscounts từ tất cả danh mục
      const initialCategoryDiscounts = categories.map(category => ({
        categoryId: category.id,
        discountValue: 0,
        active: false,
        createdAt: new Date()
      }));

      // Cập nhật state categoryDiscounts
      setCategoryDiscounts(initialCategoryDiscounts);
    }
  }, [categories]);

  const checkExistingDiscount = (itemId, type) => {
    return discountedItems.find(
      item => item.itemId === parseInt(itemId) && 
      item.type === type && 
      item.active === true
    );
  };

  const showConfirmDialog = async (originalPrice, currentDiscountedPrice, currentStepDiscount, newDiscountValue, newDiscountedPrice) => {
    const result = await Swal.fire({
      title: 'Xác nhận giảm giá',
      html: `
        <div class="confirm-content">
          <div class="confirm-row">
            <span class="confirm-label">Giá gốc:</span>
            <span class="confirm-value confirm-price">${formatCurrency(originalPrice)}đ</span>
          </div>
          <div class="confirm-row">
            <span class="confirm-label">Giá hiện tại:</span>
            <span class="confirm-value confirm-price">${formatCurrency(currentDiscountedPrice)}đ</span>
          </div>
          <div class="confirm-row">
            <span class="confirm-label">Giảm thêm:</span>
            <span class="confirm-value confirm-discount">${currentStepDiscount}%</span>
          </div>
          <div class="confirm-row">
            <span class="confirm-label">Tổng giảm:</span>
            <span class="confirm-value confirm-discount">${newDiscountValue.toFixed(2)}%</span>
          </div>
          <div class="confirm-row">
            <span class="confirm-label">Giá sau giảm:</span>
            <span class="confirm-value confirm-price">${formatCurrency(newDiscountedPrice)}đ</span>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
      reverseButtons: true
    });

    return result.isConfirmed;
  };

  const showFixedDiscountDialog = async (originalPrice, currentDiscountedPrice, discountAmount, newDiscountedPrice) => {
    // Tính phần trăm giảm
    const currentDiscountPercent = ((originalPrice - currentDiscountedPrice) / originalPrice * 100).toFixed(2);
    const newDiscountPercent = ((originalPrice - newDiscountedPrice) / originalPrice * 100).toFixed(2);
    const stepDiscountPercent = (discountAmount / originalPrice * 100).toFixed(2);
    
    // Format phần trăm để bỏ .00 nếu là số nguyên
    const formatPercent = (percent) => {
      return percent.endsWith('.00') ? Math.round(parseFloat(percent)) : percent;
    };

    const result = await Swal.fire({
      title: 'Xác nhận giảm giá',
      html: `
        <div class="confirm-content">
          <div class="confirm-row">
            <span class="confirm-label">Giá gốc:</span>
            <span class="confirm-value confirm-price">${formatCurrency(originalPrice)}đ</span>
          </div>
          <div class="confirm-row">
            <span class="confirm-label">Giá hiện tại:</span>
            <span class="confirm-value confirm-price">${formatCurrency(currentDiscountedPrice)}đ</span>
          </div>
          <div class="confirm-row">
            <span class="confirm-label">Giảm thêm:</span>
            <span class="confirm-value">
              <span class="confirm-price">${formatCurrency(discountAmount)}đ</span>
              <span class="confirm-discount">(${formatPercent(stepDiscountPercent)}%)</span>
            </span>
          </div>
          <div class="confirm-row">
            <span class="confirm-label">Tổng giảm:</span>
            <span class="confirm-value">
              <span class="confirm-price">${formatCurrency(originalPrice - newDiscountedPrice)}đ</span>
              <span class="confirm-discount">(${formatPercent(newDiscountPercent)}%)</span>
            </span>
          </div>
          <div class="confirm-row">
            <span class="confirm-label">Giá sau giảm:</span>
            <span class="confirm-value confirm-price">${formatCurrency(newDiscountedPrice)}đ</span>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
      reverseButtons: true
    });

    return result.isConfirmed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedItem || !discountValue) {
      toast.warning('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      if (selectedType === 'category') {
        // Lấy danh sách sản phẩm thuộc danh mục
        const productsInCategory = products.filter(p => p.id_danhmuc === parseInt(selectedItem));
        
        if (productsInCategory.length === 0) {
          toast.warning('Không có sản phẩm nào trong danh mục này');
          return;
        }

        // Xử lý giảm giá cho từng sản phẩm trong danh mục
        for (const product of productsInCategory) {
          const originalPrice = parseFloat(product.gia_sp.replace(/\./g, ''));
          const existingDiscount = checkExistingDiscount(product.id, 'product');

          if (existingDiscount) {
            // Nếu sản phẩm đã có giảm giá, cộng thêm % mới
            const currentDiscountPercent = ((originalPrice - existingDiscount.currentPrice) / originalPrice) * 100;
            const newDiscountValue = currentDiscountPercent + parseFloat(discountValue);
            const newDiscountedPrice = originalPrice * (1 - newDiscountValue / 100);

            if (newDiscountedPrice <= 0) {
              toast.error(`Không thể giảm giá sản phẩm ${product.ten_sp} vì giá sau giảm sẽ <= 0`);
              continue;
            }

            // Cập nhật giảm giá hiện có
            await axios.patch(`http://localhost:3000/api/discounts/${existingDiscount.id}`, {
              discountType: 'percent',
              discountValue: parseFloat(discountValue),
              finalPrice: Math.round(newDiscountedPrice),
              totalDiscountValue: newDiscountValue,
              originalPrice
            });
          } else {
            // Nếu sản phẩm chưa có giảm giá, tạo mới
            const discountedPrice = originalPrice * (1 - parseFloat(discountValue) / 100);
            
            if (discountedPrice <= 0) {
              toast.error(`Không thể giảm giá sản phẩm ${product.ten_sp} vì giá sau giảm sẽ <= 0`);
              continue;
            }

            await axios.post('http://localhost:3000/api/discounts', {
              type: 'product',
              itemId: product.id,
              discountType: 'percent',
              discountValue: parseFloat(discountValue),
              originalPrice: originalPrice,
              currentPrice: Math.round(discountedPrice)
            });
          }
        }

        // Refresh danh sách giảm giá
        const discountsRes = await axios.get('http://localhost:3000/api/discounts');
        setDiscountedItems(discountsRes.data);

        toast.success(`Đã áp dụng giảm giá ${discountValue}% cho ${productsInCategory.length} sản phẩm`);
        
        // Reset form
        setDiscountValue('');
        setSelectedItem('');
        setSelectedProductInfo(null);
        setValueError('');

        // Cập nhật categoryDiscounts
        setCategoryDiscounts(prev => prev.map(item => 
          item.categoryId === parseInt(selectedItem)
            ? { ...item, discountValue: parseFloat(discountValue), active: true }
            : item
        ));
      } else {
        // Xử lý giảm giá cho sản phẩm đơn lẻ (giữ nguyên code cũ)
        const existingDiscount = checkExistingDiscount(selectedItem, selectedType);
        const product = products.find(p => p.id === parseInt(selectedItem));
        
        if (existingDiscount) {
          let newDiscountedPrice;
          let newDiscountValue;
          const originalPrice = parseFloat(product.gia_sp.replace(/\./g, ''));
          const currentDiscountedPrice = existingDiscount.currentPrice;

          if (discountType === 'percent') {
            // Tính tổng phần trăm giảm giá mới
            const currentStepDiscount = parseFloat(discountValue);
            
            // Nếu giảm giá trước đó là theo tiền
            if (existingDiscount.discountType === 'fixed') {
              // Tính % giảm giá hiện tại
              const currentDiscountPercent = ((originalPrice - currentDiscountedPrice) / originalPrice) * 100;
              // Cộng thêm % mới
              newDiscountValue = currentDiscountPercent + currentStepDiscount;
            } else {
              // Nếu cùng là giảm theo %, cộng trực tiếp
              newDiscountValue = existingDiscount.discountValue + currentStepDiscount;
            }
            
            // Tính giá mới dựa trên giá gốc và tổng phần trăm
            newDiscountedPrice = Math.round(originalPrice * (1 - newDiscountValue / 100));

            if (newDiscountedPrice <= 0) {
              toast.error('Giá sau khi giảm không thể bằng 0 hoặc âm');
              return;
            }

            const confirmed = await showConfirmDialog(
              originalPrice,
              currentDiscountedPrice,
              currentStepDiscount,
              newDiscountValue,
              newDiscountedPrice
            );

            if (confirmed) {
              const response = await axios.patch(
                `http://localhost:3000/api/discounts/${existingDiscount.id}`, 
                { 
                  discountType,
                  discountValue: currentStepDiscount, // Gửi chính xác giá trị giảm của lần này
                  finalPrice: newDiscountedPrice,
                  totalDiscountValue: newDiscountValue,
                  originalPrice
                }
              );

              // Tạo entry mới cho lịch sử
              const historyEntry = {
                type: discountType,
                value: currentStepDiscount,
                priceBeforeDiscount: currentDiscountedPrice,
                priceAfterDiscount: newDiscountedPrice,
                appliedAt: new Date(),
                description: `Giảm ${currentStepDiscount}%`,
                currentDiscount: currentStepDiscount, // Lưu chính xác % giảm của lần này
                totalDiscount: newDiscountValue
              };

              // Cập nhật state
              const updatedItems = discountedItems.map(item => 
                item.id === existingDiscount.id 
                  ? { 
                      ...item, 
                      discountType,
                      discountValue: newDiscountValue,
                      currentPrice: newDiscountedPrice,
                      totalDiscountPercent: newDiscountValue,
                      discountHistory: [
                        ...(item.discountHistory || []),
                        historyEntry
                      ]
                    }
                  : item
              );
              setDiscountedItems(updatedItems);

              // Nếu đang xem chi tiết, cập nhật thông tin chi tiết
              if (selectedDiscountHistory && selectedDiscountHistory.id === existingDiscount.id) {
                setSelectedDiscountHistory(prev => ({
                  ...prev,
                  discountType,
                  discountValue: newDiscountValue,
                  currentPrice: newDiscountedPrice,
                  totalDiscountPercent: newDiscountValue,
                  discountHistory: [
                    ...(prev.discountHistory || []),
                    historyEntry
                  ]
                }));
              }

              toast.success('Đã cập nhật giảm giá thành công');
            }
          } else {
            // Xử lý giảm theo giá tiền
            const discountAmount = parseFloat(discountValue);
            newDiscountedPrice = currentDiscountedPrice - discountAmount;

            if (newDiscountedPrice <= 0) {
              toast.error('Giá sau khi giảm không thể bằng 0 hoặc âm');
              return;
            }

            const confirmed = await showFixedDiscountDialog(
              originalPrice,
              currentDiscountedPrice,
              discountAmount,
              newDiscountedPrice
            );

            if (confirmed) {
              const response = await axios.patch(
                `http://localhost:3000/api/discounts/${existingDiscount.id}`, 
                { 
                  discountType,
                  discountValue: parseFloat(discountValue),
                  finalPrice: Math.round(newDiscountedPrice)
                }
              );

              const historyEntry = {
                type: discountType,
                value: parseFloat(discountValue),
                priceBeforeDiscount: currentDiscountedPrice,
                priceAfterDiscount: Math.round(newDiscountedPrice),
                appliedAt: new Date(),
                description: `Giảm thêm ${formatCurrency(discountValue)}đ`,
                currentDiscount: parseFloat(discountValue),
                totalDiscount: parseFloat(discountValue)
              };

              // Cập nhật state tương tự như phần percent
              setDiscountedItems(discountedItems.map(item => 
                item.id === existingDiscount.id 
                  ? { 
                      ...item, 
                      discountType,
                      discountValue: parseFloat(discountValue),
                      currentPrice: Math.round(newDiscountedPrice),
                      totalDiscountPercent: parseFloat(discountValue),
                      discountHistory: [
                        ...(item.discountHistory || []),
                        historyEntry
                      ]
                    }
                  : item
              ));

              if (selectedDiscountHistory && selectedDiscountHistory.id === existingDiscount.id) {
                setSelectedDiscountHistory(prev => ({
                  ...prev,
                  discountType,
                  discountValue: parseFloat(discountValue),
                  currentPrice: Math.round(newDiscountedPrice),
                  totalDiscountPercent: parseFloat(discountValue),
                  discountHistory: [
                    ...(prev.discountHistory || []),
                    historyEntry
                  ]
                }));
              }

              toast.success('Đã cập nhật giảm giá thành công');
            }
          }
        } else {
          // Xử lý thêm mới giảm giá
          const payload = {
            type: selectedType,
            itemId: parseInt(selectedItem),
            discountType,
            discountValue: parseFloat(discountValue)
          };

          const response = await axios.post('http://localhost:3000/api/discounts', payload);
          setDiscountedItems([...discountedItems, response.data]);
          toast.success('Thêm giảm giá thành công');
        }
        
        // Sau khi xử lý giảm giá thành công
        toast.success('Đã cập nhật giảm giá thành công');
        
        // Reset form và thông tin sản phẩm
        setDiscountValue('');
        setSelectedItem('');
        setSelectedProductInfo(null); // Ẩn thông tin sản phẩm
        setValueError('');
        
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Có lỗi xảy ra khi cập nhật giảm giá');
    }
  };

  const handleToggleDiscount = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/discounts/${id}/toggle`);
      
      setDiscountedItems(discountedItems.map(item => 
        item.id === id ? { ...item, active: !item.active } : item
      ));
      
      toast.success('Cập nhật trạng thái thành công');
    } catch (error) {
      toast.error('Lỗi khi cập nhật trạng thái');
    }
  };

  const handleDeleteDiscount = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa giảm giá này?')) {
      try {
        await axios.delete(`http://localhost:3000/api/discounts/${id}`);
        setDiscountedItems(discountedItems.filter(item => item.id !== id));
        toast.success('Xóa giảm giá thành công');
      } catch (error) {
        toast.error('Lỗi khi xóa giảm giá');
      }
    }
  };

  const validateDiscountValue = (value) => {
    if (discountType === 'percent') {
      return value >= 0 && value <= 100;
    }
    // For fixed price, check if it's less than original price
    if (discountType === 'fixed' && selectedType === 'product') {
      const product = products.find(p => p.id === parseInt(selectedItem));
      return value >= 0 && value < parseFloat(product?.gia_sp.replace(/\./g, ''));
    }
    return value >= 0;
  };

  // Cập nhật hàm formatCurrency để xử lý số và chuỗi
  const formatCurrency = (value) => {
    // Nếu giá trị là chuỗi có dấu chấm, chuyển về số
    if (typeof value === 'string') {
      value = value.replace(/\./g, '');
    }
    
    // Chuyển về số và làm tròn
    const number = Math.round(Number(value));
    
    // Chuyển số thành chuỗi và thêm dấu chấm
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleDiscountValueChange = (e) => {
    let value = e.target.value;
    
    // Loại bỏ ký tự % nếu có
    value = value.replace('%', '');
    
    if (discountType === 'percent') {
      // Kiểm tra giá trị phần trăm
      if (value > 100) {
        setValueError('Giảm giá không được vượt quá 100%');
      } else if (value < 0) {
        setValueError('Giảm giá không được nhỏ hơn 0%');
      } else {
        setValueError('');
      }
    } else {
      // Kiểm tra giá trị tiền
      if (value < 0) {
        setValueError('Giá giảm không được nhỏ hơn 0');
      } else if (selectedType === 'product' && selectedItem) {
        const product = products.find(p => p.id === parseInt(selectedItem));
        if (product && value >= parseFloat(product.gia_sp.replace(/\./g, ''))) {
          setValueError('Giá giảm phải thấp hơn giá gốc');
        } else {
          setValueError('');
        }
      } else {
        setValueError('');
      }
    }

    setDiscountValue(value);
  };

  const handleItemSelect = (e) => {
    const value = e.target.value;
    setSelectedItem(value);
    
    if (selectedType === 'product' && value) {
      // Khi chọn sản phẩm mới, hiển thị thông tin
      const product = products.find(p => p.id === parseInt(value));
      setSelectedProductInfo(product);
    } else {
      // Khi bỏ chọn hoặc chọn danh mục, ẩn thông tin
      setSelectedProductInfo(null);
    }
  };

  const getProductsByCategory = (categoryId) => {
    return products.filter(product => product.id_danhmuc === categoryId);
  };

  // Cập nhật hàm xử lý khi thay đổi loại (sản phẩm/danh mục)
  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedType(newType);
    setSelectedItem('');
    setSelectedProductInfo(null); // Ẩn thông tin khi đổi loại
    
    if (newType === 'category') {
      setDiscountType('percent');
    }
    
    setDiscountValue('');
    setValueError('');
  };

  const handleViewCategoryDetails = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    
    // Chỉ lấy những sản phẩm đang được giảm giá và active
    const discountedProductsInCategory = discountedItems.filter(item => {
      const product = products.find(p => p.id === item.itemId);
      return product && 
             product.id_danhmuc === categoryId && 
             item.active === true; // Thêm điều kiện active
    });

    if (category) {
      setSelectedCategoryDetails({
        category,
        products: discountedProductsInCategory.map(item => {
          const product = products.find(p => p.id === item.itemId);
          return {
            ...product,
            discountValue: item.discountValue,
            currentPrice: item.currentPrice
          };
        })
      });
      setShowModal(true);
    }
  };

  const handleViewDiscountHistory = (item) => {
    setSelectedDiscountHistory(item);
    setShowDiscountHistory(true);
  };

  // Thêm hàm format phần trăm tổng giảm
  const formatTotalPercentage = (originalPrice, currentPrice) => {
    const percentage = ((originalPrice - currentPrice) / originalPrice) * 100;
    return percentage.toFixed(2);
  };

  // Thêm hàm format phần trăm chung
  const formatPercentage = (originalPrice, currentPrice) => {
    const percent = ((originalPrice - currentPrice) / originalPrice * 100).toFixed(2);
    // Nếu là số nguyên, bỏ phần thập phân
    return percent.endsWith('.00') ? Math.round((originalPrice - currentPrice) / originalPrice * 100) : percent;
  };

  // Thêm state để kiểm tra form hợp lệ
  const isFormValid = selectedItem && discountValue && !valueError;

  // Sửa lại hàm xử lý toggle danh mục
  const handleToggleCategoryDiscount = async (categoryId) => {
    try {
      // Cập nhật trạng thái active trong state
      setCategoryDiscounts(prev => prev.map(item => 
        item.categoryId === categoryId 
          ? { ...item, active: !item.active }
          : item
      ));

      // Lấy thông tin danh mục giảm giá
      const categoryDiscount = categoryDiscounts.find(item => item.categoryId === categoryId);
      const isActive = !categoryDiscount.active; // Trạng thái mới

      // Lấy danh sách sản phẩm thuộc danh mục
      const productsInCategory = products.filter(p => p.id_danhmuc === categoryId);
      
      // Lấy các giảm giá của sản phẩm thuộc danh mục này
      const productDiscounts = discountedItems.filter(item => 
        item.type === 'product' && 
        productsInCategory.some(p => p.id === item.itemId)
      );

      // Cập nhật trạng thái active cho từng sản phẩm
      for (const discount of productDiscounts) {
        await axios.patch(
          `http://localhost:3000/api/discounts/${discount.id}/toggle`,
          { active: isActive }
        );
      }

      // Refresh danh sách giảm giá
      const discountsRes = await axios.get('http://localhost:3000/api/discounts');
      setDiscountedItems(discountsRes.data);
      
      toast.success('Đã cập nhật trạng thái giảm giá danh mục');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Có lỗi xảy ra khi cập nhật trạng thái');
    }
  };

  // Sửa lại hàm xử lý xóa danh mục giảm giá
  const handleDeleteCategoryDiscount = async (categoryId) => {
    try {
      if (!window.confirm('Bạn có chắc muốn xóa giảm giá danh mục này?')) {
        return;
      }

      // Gọi API xóa giảm giá danh mục
      await axios.delete(`http://localhost:3000/api/discounts/category/${categoryId}`);

      // Xóa danh mục khỏi danh sách quản lý
      setCategoryDiscounts(prev => prev.filter(item => item.categoryId !== categoryId));

      // Refresh danh sách giảm giá
      const discountsRes = await axios.get('http://localhost:3000/api/discounts');
      setDiscountedItems(discountsRes.data);

      toast.success('Đã xóa giảm giá danh mục');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Có lỗi xảy ra khi xóa giảm giá danh mục');
    }
  };

  // Thêm hàm xử lý xóa lịch sử giảm giá
  const handleDeleteDiscountHistory = async (discountId, historyIndex) => {
    try {
      if (!window.confirm('Bạn có chắc muốn xóa lịch sử giảm giá này?')) {
        return;
      }

      const discount = discountedItems.find(item => item.id === discountId);
      if (!discount) {
        toast.error('Không tìm thấy thông tin giảm giá');
        return;
      }

      // Tính lại giá sau khi xóa lịch sử giảm giá
      const originalPrice = discount.originalPrice;
      let newPrice = originalPrice;
      let totalDiscountValue = 0;

      // Tính lại giá dựa trên các lịch sử còn lại
      const updatedHistory = discount.discountHistory.filter((_, index) => index !== historyIndex);
      for (const history of updatedHistory) {
        if (history.type === 'percent') {
          const discountAmount = newPrice * (history.value / 100);
          newPrice -= discountAmount;
          totalDiscountValue += history.value;
        } else {
          const percentValue = (history.value / originalPrice) * 100;
          totalDiscountValue += percentValue;
          newPrice -= history.value;
        }
      }

      // Kiểm tra nếu tổng giảm giá = 0% hoặc giá mới = giá gốc
      if (totalDiscountValue <= 0 || newPrice >= originalPrice) {
        // Xóa sản phẩm khỏi danh sách giảm giá
        await axios.delete(`http://localhost:3000/api/discounts/${discountId}`);
        
        // Cập nhật state
        setDiscountedItems(prev => prev.filter(item => item.id !== discountId));
        
        // Đóng modal chi tiết nếu đang mở
        if (selectedDiscountHistory && selectedDiscountHistory.id === discountId) {
          setShowDiscountHistory(false);
        }

        toast.success('Đã xóa giảm giá sản phẩm do không còn được giảm');
        return;
      }

      // Nếu còn giảm giá thì cập nhật thông tin
      await axios.patch(`http://localhost:3000/api/discounts/${discountId}/history`, {
        historyIndex,
        updatedHistory,
        newPrice: Math.round(newPrice),
        totalDiscountValue
      });

      // Cập nhật state
      const updatedItems = discountedItems.map(item => 
        item.id === discountId 
          ? {
              ...item,
              discountHistory: updatedHistory,
              currentPrice: Math.round(newPrice),
              totalDiscountValue: totalDiscountValue
            }
          : item
      );
      setDiscountedItems(updatedItems);

      // Cập nhật chi tiết đang xem
      if (selectedDiscountHistory && selectedDiscountHistory.id === discountId) {
        setSelectedDiscountHistory(prev => ({
          ...prev,
          discountHistory: updatedHistory,
          currentPrice: Math.round(newPrice),
          totalDiscountValue: totalDiscountValue
        }));
      }

      toast.success('Đã xóa lịch sử giảm giá');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Có lỗi xảy ra khi xóa lịch sử giảm giá');
    }
  };

  // Thêm hàm xử lý chọn tất cả
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = discountedItems
        .filter(item => item.type === 'product')
        .map(item => item.id);
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  };

  // Thêm hàm xử lý chọn từng item
  const handleSelectItem = (id) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Thêm hàm xử lý xóa nhiều
  const handleDeleteMultiple = async () => {
    if (selectedItems.length === 0) {
      toast.warning('Vui lòng chọn ít nhất một sản phẩm');
      return;
    }

    if (window.confirm(`Bạn có chắc muốn xóa ${selectedItems.length} sản phẩm khỏi danh sách giảm giá?`)) {
      try {
        // Xóa từng item đã chọn
        for (const id of selectedItems) {
          await axios.delete(`http://localhost:3000/api/discounts/${id}`);
        }

        // Refresh danh sách
        const discountsRes = await axios.get('http://localhost:3000/api/discounts');
        setDiscountedItems(discountsRes.data);
        
        // Reset danh sách đã chọn
        setSelectedItems([]);
        
        toast.success('Đã xóa các sản phẩm đã chọn');
      } catch (error) {
        console.error('Error:', error);
        toast.error('Có lỗi xảy ra khi xóa sản phẩm');
      }
    }
  };

  // Thêm biến kiểm tra có sản phẩm giảm giá không
  const hasDiscountedProducts = discountedItems.some(item => item.type === 'product');

  // Thêm hàm kiểm tra danh mục đã có giảm giá chưa
  const checkExistingCategoryDiscount = (categoryId) => {
    return categoryDiscounts.some(item => item.categoryId === parseInt(categoryId));
  };

  // Thêm hàm xử lý thay đổi bộ lọc
  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  // Thêm hàm highlight text
  const highlightMatch = (text, searchQuery) => {
    if (!searchQuery) return text;
    
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) => 
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <strong key={index} style={{ fontWeight: '700' }}>{part}</strong>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  // Tùy chỉnh component Option của react-select
  const CustomOption = ({ innerProps, label, data, selectProps }) => {
    const searchQuery = selectProps.inputValue;
    return (
      <div
        {...innerProps}
        style={{
          padding: '8px 12px',
          cursor: 'pointer',
          ':hover': {
            backgroundColor: '#f8f9fa'
          }
        }}
      >
        {highlightMatch(label, searchQuery)}
      </div>
    );
  };

  return (
    <div className="container admin-sale">
      <h2 className="mb-4">Quản lý giảm giá</h2>
      
      {/* Discount Form */}
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Loại giảm giá</label>
                <select 
                  className="form-select"
                  value={selectedType}
                  onChange={handleTypeChange}
                >
                  <option value="product">Sản phẩm</option>
                  <option value="category">Danh mục</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  {selectedType === 'product' ? 'Chọn sản phẩm' : 'Chọn danh mục'}
                </label>
                {selectedType === 'product' ? (
                  <Select
                    value={productOptions.find(option => option.value === selectedItem)}
                    onChange={(option) => {
                      handleItemSelect({ target: { value: option.value } });
                    }}
                    options={productOptions}
                    styles={customStyles}
                    components={{ Option: CustomOption }}
                    placeholder="Tìm kiếm hoặc chọn sản phẩm..."
                    noOptionsMessage={() => "Không tìm thấy sản phẩm"}
                    isSearchable={true}
                    className="basic-single"
                    classNamePrefix="select"
                  />
                ) : (
                  <select
                    className="form-select"
                    value={selectedItem}
                    onChange={handleItemSelect}
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.tendm}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Kiểu giảm giá</label>
                <select 
                  className="form-select"
                  value={discountType}
                  onChange={(e) => {
                    setDiscountType(e.target.value);
                    setDiscountValue('');
                    setValueError('');
                  }}
                  disabled={selectedType === 'category'} // Disable nếu đang chọn danh mục
                >
                  <option value="percent">Theo phần trăm (%)</option>
                  {selectedType === 'product' && ( // Chỉ hiện option này khi chọn sản phẩm
                    <option value="fixed">Theo giá tiền (VNĐ)</option>
                  )}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Giá trị giảm</label>
                <div className="input-group">
                  <input 
                    type="number"
                    className={`form-control ${valueError ? 'is-invalid' : ''}`}
                    value={discountValue}
                    onChange={handleDiscountValueChange}
                    min="0"
                    max={discountType === 'percent' ? "100" : undefined}
                    placeholder={discountType === 'percent' ? 'Nhập % giảm giá' : 'Nhập số tiền giảm'}
                  />
                  {discountType === 'percent' && (
                    <span className="input-group-text">%</span>
                  )}
                  {discountType === 'fixed' && (
                    <span className="input-group-text">đ</span>
                  )}
                </div>
                {valueError && (
                  <div className="invalid-feedback d-block">
                    {valueError}
                  </div>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              className={`btn ${isFormValid ? 'btn-primary' : 'btn-secondary'}`}
              disabled={!isFormValid}
            >
              Áp dụng giảm giá
            </button>
          </form>
        </div>
      </div>

      {/* Hiển thị thông tin sản phẩm hoặc danh mục được chọn */}
      {selectedProductInfo ? (
        <div className="card mb-3">
          <div className="card-body">
            <h6 className="card-subtitle mb-3 text-muted">Thông tin sản phẩm</h6>
            <div className="row">
              <div className="col-md-4">
                <img 
                  src={`/img/sanpham/${selectedProductInfo.hinh_anh.chinh}`}
                  alt={selectedProductInfo.ten_sp}
                  className="img-fluid rounded"
                  style={{ maxHeight: '150px', objectFit: 'contain' }}
                />
              </div>
              <div className="col-md-8">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td className="fw-bold" style={{width: '150px'}}>ID:</td>
                      <td>{selectedProductInfo.id}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold" style={{width: '150px'}}>Mã sản phẩm:</td>
                      <td>{selectedProductInfo.ma_san_pham}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Tên sản phẩm:</td>
                      <td>{selectedProductInfo.ten_sp}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Giá gốc:</td>
                      <td>{formatCurrency(selectedProductInfo.gia_sp)}đ</td>
                    </tr>
                    {selectedProductInfo.giam_gia && (
                      <tr>
                        <td className="fw-bold">Giá đã giảm:</td>
                        <td className="text-danger">{formatCurrency(selectedProductInfo.giam_gia)}đ</td>
                      </tr>
                    )}
                    <tr>
                      <td className="fw-bold">Danh mục:</td>
                      <td>
                        {categories.find(c => c.id === selectedProductInfo.id_danhmuc)?.tendm}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : selectedType === 'category' && selectedItem && (
        <div className="card mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="card-subtitle text-muted">
                Danh sách sản phẩm thuộc danh mục: {categories.find(c => c.id === parseInt(selectedItem))?.tendm}
              </h6>
              <button 
                className="btn btn-outline-primary btn-sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Thu gọn' : 'Xem tất cả'}
              </button>
            </div>

            <div className={`category-products ${isExpanded ? 'expanded' : ''}`}>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Mã SP</th>
                      <th>Tên sản phẩm</th>
                      <th>Hình ảnh</th>
                      <th>Giá gốc</th>
                      <th>Giá đã giảm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getProductsByCategory(parseInt(selectedItem)).map(product => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.ma_san_pham}</td>
                        <td>{product.ten_sp}</td>
                        <td>
                          <img 
                            src={`/img/sanpham/${product.hinh_anh.chinh}`}
                            alt={product.ten_sp}
                            style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                          />
                        </td>
                        <td>{formatCurrency(product.gia_sp)}đ</td>
                        <td>
                          {product.giam_gia ? (
                            <span className="text-danger">
                              {formatCurrency(product.giam_gia)}đ
                            </span>
                          ) : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Danh sách giảm giá theo sản phẩm */}
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="card-title m-0">Danh sách giảm giá theo sản phẩm</h5>
            <div className="d-flex align-items-center gap-3">
              {/* Thêm nút xóa tất cả */}
              {selectedItems.length > 0 && (
                <button 
                  className="btn btn-danger"
                  onClick={handleDeleteMultiple}
                >
                  Xóa ({selectedItems.length})
                </button>
              )}
              {/* Select filter danh mục */}
              <select 
                className="form-select"
                value={filterCategory}
                onChange={handleFilterChange}
                style={{ width: 'auto', minWidth: '200px' }}
              >
                <option value="all">Tất cả danh mục</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.tendm}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="product-discount-table-container">
            <table className="product-discount-table">
              <thead>
                <tr>
                  {hasDiscountedProducts && (
                    <th>
                      <input
                        type="checkbox"
                        className="form-check-input select-checkbox"
                        checked={selectedItems.length === discountedItems.filter(item => item.type === 'product').length}
                        onChange={handleSelectAll}
                      />
                    </th>
                  )}
                  <th>ID</th>
                  <th>Danh mục</th>
                  <th>Tên sản phẩm</th>
                  <th>Giảm giá</th>
                  <th>Giá gốc</th>
                  <th>Giá sau giảm</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {discountedItems
                  .filter(item => item.type === 'product')
                  .filter(item => {
                    if (filterCategory === 'all') return true;
                    const product = products.find(p => p.id === item.itemId);
                    return product?.id_danhmuc === parseInt(filterCategory);
                  })
                  .map(item => {
                    const product = products.find(p => p.id === item.itemId);
                    const category = categories.find(c => c.id === product?.id_danhmuc);
                    const originalPrice = product ? parseFloat(product.gia_sp.replace(/\./g, '')) : 0;
                    const totalDiscountPercent = formatTotalPercentage(originalPrice, item.currentPrice);

                    return (
                      <tr key={item.id}>
                        {hasDiscountedProducts && (
                          <td>
                            <input
                              type="checkbox"
                              className="form-check-input select-checkbox"
                              checked={selectedItems.includes(item.id)}
                              onChange={() => handleSelectItem(item.id)}
                            />
                          </td>
                        )}
                        <td>{item.id}</td>
                        <td>{category?.tendm || 'N/A'}</td>
                        <td>{product?.ten_sp}</td>
                        <td>{`${totalDiscountPercent}%`}</td>
                        <td>{formatCurrency(originalPrice)}đ</td>
                        <td className="text-danger">
                          {formatCurrency(item.currentPrice)}đ
                        </td>
                        <td className="d-none d-md-table-cell">
                          <div className="form-check form-switch status-switch d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={item.active}
                              onChange={() => handleToggleDiscount(item.id)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex gap-2 justify-content-center">
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDeleteDiscount(item.id)}
                            >
                              Xóa
                            </button>
                            <button
                              type="button"
                              className="btn btn-info btn-sm text-white"
                              onClick={() => handleViewDiscountHistory(item)}
                            >
                              Xem chi tiết
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
                {/* Hiển thị thông báo khi không có sản phẩm */}
                {!hasDiscountedProducts && (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Không có sản phẩm nào được giảm giá
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Danh sách giảm giá theo danh mục */}
      <div className="card mt-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="card-title m-0">Quản lý giảm giá danh mục</h5>
          </div>
          <div className="category-discount-table-container">
            <table className="category-discount-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên danh mục</th>
                  <th>Sản phẩm đang giảm giá</th>
                  <th>Tắt trạng thái giảm giá</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(category => {
                  const categoryDiscount = categoryDiscounts.find(d => d.categoryId === category.id) || {
                    discountValue: 0,
                    active: false
                  };
                  const productsInCategory = products.filter(p => p.id_danhmuc === category.id);
                  // Chỉ đếm những sản phẩm có giảm giá và đang active
                  const discountedProducts = discountedItems.filter(d => 
                    d.type === 'product' && 
                    d.active === true && // Thêm điều kiện active
                    productsInCategory.some(p => p.id === d.itemId)
                  );

                  return (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.tendm}</td>
                      <td>{discountedProducts.length}</td>
                      <td>
                        <div className="form-check form-switch status-switch d-flex justify-content-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={categoryDiscount.active}
                            onChange={() => handleToggleCategoryDiscount(category.id)}
                          />
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-info"
                          onClick={() => handleViewCategoryDetails(category.id)}
                        >
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && selectedCategoryDetails && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Chi tiết giảm giá danh mục: {selectedCategoryDetails.category.tendm}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="modal-body">
                {selectedCategoryDetails.products.length > 0 ? (
                  <div className="table-responsive" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    <table className="table table-bordered">
                      <thead className="sticky-top bg-white">
                        <tr>
                          <th>ID</th>
                          <th>Mã SP</th>
                          <th>Tên sản phẩm</th>
                          <th>Hình ảnh</th>
                          <th>Giá gốc</th>
                          <th>Giảm giá</th>
                          <th>Giá sau giảm</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedCategoryDetails.products.map(product => {
                          const discountInfo = discountedItems.find(item => item.itemId === product.id);
                          const originalPrice = parseFloat(product.gia_sp.replace(/\./g, ''));
                          
                          return (
                            <tr key={product.id}>
                              <td>{product.id}</td>
                              <td>{product.ma_san_pham}</td>
                              <td>{product.ten_sp}</td>
                              <td>
                                <img 
                                  src={`/img/sanpham/${product.hinh_anh.chinh}`}
                                  alt={product.ten_sp}
                                  style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                                />
                              </td>
                              <td>{formatCurrency(originalPrice)}đ</td>
                              <td className="text-primary fw-bold">
                                {formatTotalPercentage(originalPrice, discountInfo.currentPrice)}%
                              </td>
                              <td className="text-danger">
                                {formatCurrency(discountInfo.currentPrice)}đ
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="alert alert-info">
                    Không có sản phẩm nào đang được giảm giá trong danh mục này
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowModal(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDiscountHistory && selectedDiscountHistory && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Chi tiết giảm giá: {products.find(p => p.id === selectedDiscountHistory.itemId)?.ten_sp}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDiscountHistory(false)}
                />
              </div>
              <div className="modal-body">
                <div className="alert alert-info">
                  <div className="row">
                    <div className="col-md-4">
                      <strong>Giá gốc:</strong> {formatCurrency(selectedDiscountHistory.originalPrice)}đ
                    </div>
                    <div className="col-md-4">
                      <strong>Giá hiện tại:</strong> {formatCurrency(selectedDiscountHistory.currentPrice)}đ
                    </div>
                    <div className="col-md-4">
                      <strong>Tổng giảm:</strong> {formatTotalPercentage(
                        selectedDiscountHistory.originalPrice,
                        selectedDiscountHistory.currentPrice
                      )}%
                    </div>
                  </div>
                </div>

                <h6 className="mb-3">Lịch sử giảm giá:</h6>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Thời gian</th>
                        <th>Chi tiết giảm giá</th>
                        <th>Giá trước giảm</th>
                        <th>Giá sau giảm</th>
                        <th>Phần trăm giảm</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedDiscountHistory?.discountHistory?.map((history, index) => {
                        // Hàm format phần trăm
                        const formatPercentage = (value) => {
                          if (history.type === 'fixed') {
                            // Nếu là giảm theo giá tiền, làm tròn 2 chữ số thập phân
                            const percent = (value * 100).toFixed(2);
                            // Nếu là số nguyên, bỏ phần thập phân
                            return percent.endsWith('.00') ? Math.round(value * 100) : percent;
                          }
                          // Nếu là giảm theo phần trăm, giữ nguyên giá trị
                          return value;
                        };

                        return (
                          <tr key={index}>
                            <td>{new Date(history.appliedAt).toLocaleString('vi-VN')}</td>
                            <td>
                              {history.type === 'percent' 
                                ? `Giảm ${history.value}%`
                                : `Giảm ${formatCurrency(history.value)}đ`
                              }
                            </td>
                            <td>{formatCurrency(history.priceBeforeDiscount)}đ</td>
                            <td className="text-danger">{formatCurrency(history.priceAfterDiscount)}đ</td>
                            <td>
                              {history.type === 'percent' 
                                ? `${history.value}%`
                                : `${formatPercentage((history.value / selectedDiscountHistory.originalPrice))}%`
                              }
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteDiscountHistory(selectedDiscountHistory.id, index)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowDiscountHistory(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
