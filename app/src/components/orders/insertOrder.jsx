import React, { useState } from 'react';

const AddOrderPage = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    orderDate: '',
    total: '',
    paymentMethod: '',
    status: 'Đang xử lý',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName) newErrors.customerName = "Tên khách hàng không được để trống";
    if (!formData.orderDate) newErrors.orderDate = "Ngày đặt hàng không được để trống";
    if (!formData.total || isNaN(formData.total)) newErrors.total = "Tổng phải là số hợp lệ";
    if (!formData.paymentMethod) newErrors.paymentMethod = "Phương thức thanh toán không được để trống";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Submit form data (API call can be placed here)
      setSuccessMessage('Đơn hàng đã được thêm thành công!');
      // Reset form
      setFormData({
        customerName: '',
        orderDate: '',
        total: '',
        paymentMethod: '',
        status: 'Đang xử lý',
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Thêm đơn hàng</h2>

      {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tên khách hàng</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className={`mt-1 block w-full border ${errors.customerName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2`}
            placeholder="Nhập tên khách hàng"
          />
          {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName}</p>}
        </div>

        {/* Order Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Ngày đặt hàng</label>
          <input
            type="date"
            name="orderDate"
            value={formData.orderDate}
            onChange={handleChange}
            className={`mt-1 block w-full border ${errors.orderDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2`}
          />
          {errors.orderDate && <p className="text-red-500 text-sm">{errors.orderDate}</p>}
        </div>

        {/* Total */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tổng cộng</label>
          <input
            type="text"
            name="total"
            value={formData.total}
            onChange={handleChange}
            className={`mt-1 block w-full border ${errors.total ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2`}
            placeholder="Nhập tổng số tiền"
          />
          {errors.total && <p className="text-red-500 text-sm">{errors.total}</p>}
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phương thức thanh toán</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className={`mt-1 block w-full border ${errors.paymentMethod ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2`}
          >
            <option value="">Chọn phương thức thanh toán</option>
            <option value="Tiền mặt">Tiền mặt</option>
            <option value="Thẻ tín dụng">Thẻ tín dụng</option>
            <option value="Chuyển khoản">Chuyển khoản</option>
          </select>
          {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}
        </div>

        {/* Order Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="Đang xử lý">Đang xử lý</option>
            <option value="Đã hoàn tất">Đã hoàn tất</option>
            <option value="Đã hủy">Đã hủy</option>
          </select>
        </div>

        <button type="submit" className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200">
          Thêm đơn hàng
        </button>
      </form>
    </div>
  );
};

export default AddOrderPage;
