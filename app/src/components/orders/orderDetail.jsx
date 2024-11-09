import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const sampleProductDetails = [
  { productId: 'PROD001', name: 'Sản phẩm Aa', quantity: 2, price: 500000 },
  { productId: 'PROD002', name: 'Sản phẩm B', quantity: 1, price: 100000 },
  { productId: 'PROD003', name: 'Sản phẩm C', quantity: 2, price: 500000 },
  { productId: 'PROD004', name: 'Sản phẩm D', quantity: 1, price: 350000 },
];

const OrderDetail = ({ order, onClose }) => {
  const [productDetails, setProductDetails] = useState(sampleProductDetails);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const updatedTotal = productDetails.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setTotal(updatedTotal);
  }, [productDetails]);

  const handleDeleteProduct = (index) => {
    setProductDetails((prevDetails) => prevDetails.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-3xl relative">
        
        {/* Header Section */}
        <div className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white">
          <h3 className="text-lg font-semibold">Chi tiết đơn hàng - {order.orderId}</h3>
          <button onClick={onClose} className="text-white">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Order Information */}
        <div className="p-6 space-y-2">
          <p><span className="font-semibold">Khách hàng:</span> {order.customerName}</p>
          <p><span className="font-semibold">Ngày đặt hàng:</span> {order.orderDate}</p>
          <p><span className="font-semibold">Phương thức thanh toán:</span> {order.paymentMethod}</p>
          <p><span className="font-semibold">Tổng cộng:</span> {total.toLocaleString()} VND</p>
        </div>

        {/* Product Details Table */}
        <div className="px-6 pb-6">
          <h4 className="text-md font-semibold mb-4">Chi tiết sản phẩm:</h4>
          <table className="w-full bg-white border border-gray-200 text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-gray-800">
                <th className="px-3 py-2 text-left font-semibold border-r">Mã sản phẩm</th>
                <th className="px-3 py-2 text-left font-semibold border-r">Tên sản phẩm</th>
                <th className="px-3 py-2 text-right font-semibold border-r">Giá (VND)</th>
                <th className="px-3 py-2 text-center font-semibold border-r">Số lượng</th>
                <th className="px-3 py-2 text-right font-semibold border-r">Tổng</th>
                <th className="px-3 py-2 text-center font-semibold">Xóa</th>
              </tr>
            </thead>
            <tbody>
              {productDetails.map((product, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-3 py-2 border-r">{product.productId}</td>
                  <td className="px-3 py-2 border-r">{product.name}</td>
                  <td className="px-3 py-2 text-right border-r">{product.price.toLocaleString()}</td>
                  <td className="px-3 py-2 text-center border-r">{product.quantity}</td>
                  <td className="px-3 py-2 text-right border-r">
                    {(product.price * product.quantity).toLocaleString()} VND
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => handleDeleteProduct(index)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <XMarkIcon className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Close Button */}
        <div className="px-6 py-4 border-t bg-gray-100 text-right">
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
