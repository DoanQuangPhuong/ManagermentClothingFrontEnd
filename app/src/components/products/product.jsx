import { useState } from 'react';
import { PlusIcon, ArrowDownTrayIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ProductTable = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Function to filter products based on search term
  const filteredProducts = products.filter(product => {
    const lowercasedTerm = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(lowercasedTerm) ||
      product.sku.toLowerCase().includes(lowercasedTerm) ||
      product.category.toLowerCase().includes(lowercasedTerm)
    );
  });

  return (
    <main className="flex-1 flex flex-col overflow-hidden" >
      {/* Top bar */}
      <header className="bg-white shadow-sm z-10">
        {/* ... Top bar content ... */}
      </header>

      <div className="flex-1 overflow-auto bg-white-100" >
        <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Danh mục sản phẩm</h1>
            <div className="flex space-x-3">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <PlusIcon className="h-5 w-5 mr-2" />
                Thêm sản phẩm mới
              </button>
              <button className="bg-white text-gray-700 px-4 py-2 rounded-md border border-gray-300 flex items-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Xuất dữ liệu
                <ArrowDownTrayIcon className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex-1 max-w-lg">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Tìm kiếm sản phẩm theo SKU, tên hoặc danh mục"
                      className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                   {searchTerm && (
                        <button
                          onClick={() => setSearchTerm('')}
                          className="absolute right-5 pr-3 mb-2 flex items-center"
                        >
                          <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" aria-hidden="true" />
                        </button>
                  )}

                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Danh mục</label>
                    <select id="category" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Tất cả danh mục</option>
                      <option>Quần áo</option>
                      <option>Điện tử</option>
                      <option>Nội thất</option>
                      <option>Thiết bị gia dụng</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Trạng thái</label>
                    <select id="status" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Tất cả trạng thái</option>
                      <option>Còn hàng</option>
                      <option>Sắp hết hàng</option>
                      <option>Hết hàng</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Giá vốn</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Giá bán</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Tồn kho</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Chỉnh sửa</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.unit}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sku}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{product.cost}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === 'Còn hàng' ? 'bg-green-100 text-green-800' :
                        product.status === 'Sắp hết hàng' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-3">Sửa</a>
                      <button 
                        onClick={() => {
                          // Thêm logic xóa sản phẩm ở đây
                        }} 
                        className="text-red-600 hover:text-red-900"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination component can go here */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductTable;
