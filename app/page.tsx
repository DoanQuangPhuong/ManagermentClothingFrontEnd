'use client';
import { useState } from 'react';
import { 
  HomeIcon, ShoppingCartIcon, CubeIcon, 
  DocumentTextIcon, ChevronDownIcon, UserIcon, CreditCardIcon, 
  TruckIcon, CogIcon, ChartBarIcon 
} from '@heroicons/react/24/outline';

import ProductPage from './src/components/products/product.jsx';
import OrderPage from './src/components/orders/order.jsx';

export default function QuanLySanPhamDoanhNghiep() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('products'); // Track the active tab

  const products = [
    { sku: 'SP0041', name: 'Áo khoác da cao cấp', unit: 'chiếc', cost: '1.500.000', price: '3.250.000', stock: '50', image: 'https://picsum.photos/seed/1/40/40', category: 'Quần áo', status: 'Còn hàng' },
    { sku: 'SP0052', name: 'Tai nghe chống ồn không dây', unit: 'chiếc', cost: '2.000.000', price: '4.500.000', stock: '30', image: 'https://picsum.photos/seed/2/40/40', category: 'Điện tử', status: 'Sắp hết' },
    { sku: 'SP0063', name: 'Ghế văn phòng công thái học', unit: 'chiếc', cost: '800.000', price: '1.800.000', stock: '100', image: 'https://picsum.photos/seed/3/40/40', category: 'Nội thất', status: 'Còn hàng' },
    { sku: 'SP0074', name: 'Hệ thống an ninh nhà thông minh', unit: 'bộ', cost: '3.000.000', price: '5.500.000', stock: '20', image: 'https://picsum.photos/seed/4/40/40', category: 'Điện tử', status: 'Còn hàng' },
    { sku: 'SP0085', name: 'Máy pha cà phê cao cấp', unit: 'chiếc', cost: '500.000', price: '1.200.000', stock: '5', image: 'https://picsum.photos/seed/5/40/40', category: 'Thiết bị gia dụng', status: 'Sắp hết hàng' },
  ];

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-indigo-800 to-indigo-900 text-white">
        <div className="p-6">
          <div className="flex items-center mb-8">
            <CubeIcon className="h-8 w-8 mr-3 text-indigo-300" />
            <span className="text-2xl font-bold">ADMIN</span>
          </div>
          <nav className="space-y-1">
            <button className="flex items-center w-full px-4 py-3 text-sm rounded-lg hover:bg-indigo-700 transition-colors">
              <HomeIcon className="h-5 w-5 mr-3" />
              Tổng quan
            </button>
            <div>
              <button 
                onClick={() => toggleDropdown('BÁN HÀNG')}
                className="flex items-center justify-between w-full px-4 py-3 text-sm rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <div className="flex items-center">
                  <ShoppingCartIcon className="h-5 w-5 mr-3" />
                  Bán hàng
                </div>
                <ChevronDownIcon className={`h-5 w-5 transform transition ${openDropdown === 'BÁN HÀNG' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'BÁN HÀNG' && (
                <div className="pl-4 space-y-1">
                  <button onClick={() => setActiveTab('products')} className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-600 ${activeTab === 'products' ? 'bg-indigo-600' : ''}`}>
                    Quản lý sản phẩm
                  </button>
                  <button onClick={() => setActiveTab('orders')} className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-indigo-600 ${activeTab === 'orders' ? 'bg-indigo-600' : ''}`}>
                    Quản lý đơn hàng
                  </button>
                </div>
              )}
            </div>
            <button className="flex items-center w-full px-4 py-3 text-sm rounded-lg hover:bg-indigo-700 transition-colors">
              <DocumentTextIcon className="h-5 w-5 mr-3" />
              Báo cáo
            </button>
            <button className="flex items-center w-full px-4 py-3 text-sm rounded-lg hover:bg-indigo-700 transition-colors">
              <UserIcon className="h-5 w-5 mr-3" />
              Khách hàng
            </button>
            <button className="flex items-center w-full px-4 py-3 text-sm rounded-lg hover:bg-indigo-700 transition-colors">
              <CreditCardIcon className="h-5 w-5 mr-3" />
              Thanh toán
            </button>
            <button className="flex items-center w-full px-4 py-3 text-sm rounded-lg hover:bg-indigo-700 transition-colors">
              <TruckIcon className="h-5 w-5 mr-3" />
              Vận chuyển
            </button>
            <button className="flex items-center w-full px-4 py-3 text-sm rounded-lg hover:bg-indigo-700 transition-colors">
              <CogIcon className="h-5 w-5 mr-3" />
              Cài đặt
            </button>
            <button className="flex items-center w-full px-4 py-3 text-sm rounded-lg hover:bg-indigo-700 transition-colors">
              <ChartBarIcon className="h-5 w-5 mr-3" />
              Thống kê
            </button>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-grow pl-6 pr-6 pt-1 overflow-y-auto" style={{ backgroundColor: '#ffffff' }}>
        {activeTab === 'products' && <ProductPage products={products} />}
        {activeTab === 'orders' && <OrderPage />}
      </main>
    </div>
  );
}
