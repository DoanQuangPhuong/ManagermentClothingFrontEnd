import React, { useState } from 'react';
import OrderDetail from './orderDetail'
import {ArrowDownTrayIcon} from '@heroicons/react/24/outline';

// Sample data for demonstration
const sampleOrders = [
  { orderId: 'ORD001', customerName: 'Nguyễn Văn A', orderDate: '2024-10-01', status: 'Đang xử lý', total: '2.500.000', paymentMethod: 'Thẻ tín dụng' },
  { orderId: 'ORD002', customerName: 'Trần Thị B', orderDate: '2024-10-05', status: 'Đã hoàn tất', total: '1.200.000', paymentMethod: 'Chuyển khoản' },
  { orderId: 'ORD003', customerName: 'Lê Văn C', orderDate: '2024-10-10', status: 'Đã hủy', total: '750.000', paymentMethod: 'Tiền mặt' },
];

const OrderPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddOrderForm, setShowAddOrderForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const ordersPerPage = 2;

  const filteredOrders = sampleOrders.filter(order => 
    (statusFilter === 'All' || order.status === statusFilter) &&
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const toggleAddOrderForm = () => {
    setShowAddOrderForm(prev => !prev);
  };

  const handleAddOrder = (newOrder) => {
    // Logic to add the new order to sampleOrders
    console.log(newOrder);
    setShowAddOrderForm(false);
  };

  const handleShowDetail = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDetail = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg relative">
      <h2 className="text-2xl font-semibold mb-4">Quản lý đơn hàng</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên khách hàng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
        />
        <select value={statusFilter} onChange={handleStatusChange} className="border border-gray-300 rounded-lg px-4 py-2 w-full">
          <option value="All">Tất cả trạng thái</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Đã hoàn tất">Đã hoàn tất</option>
          <option value="Đã hủy">Đã hủy</option>
        </select>
      </div>

      {/* Order Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn hàng</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đặt hàng</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng cộng</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phương thức thanh toán</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
            <th className="relative px-6 py-3"><span className="sr-only">Chỉnh sửa</span></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentOrders.map(order => (
            <tr key={order.orderId} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.orderId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.orderDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{order.total}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.paymentMethod}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  order.status === 'Đang xử lý' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'Đã hoàn tất' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => handleShowDetail(order)}className="text-blue-600 hover:text-red-900">Chi Tiết</button>
                <button onClick={() => {/* Logic for deleting order */}} className="text-red-600 hover:text-red-900">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500">Trước</button>
        <span>Trang {currentPage} / {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500">Sau</button>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex justify-between">
        <button onClick={toggleAddOrderForm} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Thêm đơn hàng
        </button>
        <button className="bg-white text-gray-700 px-4 py-2 rounded-md border border-gray-300 flex items-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Xuất báo cáo
          <ArrowDownTrayIcon className="h-4 w-4 ml-2" />
          </button>
      </div>

      {/* Overlay */}
      {showAddOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2"> {/* Set width to 1/2 for half the screen */}
            <h3 className="text-lg font-semibold mb-2">Thêm đơn hàng mới</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newOrder = {
                orderId: `ORD${sampleOrders.length + 1}`,
                customerName: e.target.customerName.value,
                orderDate: e.target.orderDate.value,
                total: e.target.total.value,
                paymentMethod: e.target.paymentMethod.value,
                status: 'Đang xử lý',
              };
              handleAddOrder(newOrder);
            }}>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Tên khách hàng:</label>
                <input type="text" name="customerName" required className="mt-1 border border-gray-300 rounded-lg px-4 py-2 w-full" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Ngày đặt hàng:</label>
                <input type="date" name="orderDate" required className="mt-1 border border-gray-300 rounded-lg px-4 py-2 w-full" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Tổng cộng:</label>
                <input type="text" name="total" required className="mt-1 border border-gray-300 rounded-lg px-4 py-2 w-full" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Phương thức thanh toán:</label>
                <select name="paymentMethod" className="mt-1 border border-gray-300 rounded-lg px-4 py-2 w-full">
                  <option value="Tiền mặt">Tiền mặt</option>
                  <option value="Thẻ tín dụng">Thẻ tín dụng</option>
                  <option value="Chuyển khoản">Chuyển khoản</option>
                </select>
              </div>
              <div className="mt-4">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Thêm đơn hàng</button>
                <button type="button" onClick={toggleAddOrderForm} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 ml-2">Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}

        {selectedOrder && (
        <OrderDetail order={selectedOrder} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default OrderPage;
