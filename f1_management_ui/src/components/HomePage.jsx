import React from 'react';
import { Home, Users, DollarSign, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    {
      title: 'Quản lý Tay Đua & Đội Đua',
      description: 'Thêm, sửa, xóa và quản lý thông tin về tay đua và đội đua F1',
      icon: <Users size={48} className="text-blue-600" />,
      path: '/drivers-teams',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Quản lý Nhà Tài Trợ',
      description: 'Quản lý nhà tài trợ và ký kết hợp đồng tài trợ',
      icon: <DollarSign size={48} className="text-green-600" />,
      path: '/sponsors',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Quản lý Giải Thưởng',
      description: 'Quản lý giải thưởng và thanh toán cho tay đua/đội đua',
      icon: <Award size={48} className="text-purple-600" />,
      path: '/races-awards',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Hệ Thống Quản Lý F1
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Quản lý tay đua, đội đua, nhà tài trợ và giải thưởng cho giải đua F1
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              onClick={() => handleNavigation(item.path)}
              className={`${item.bgColor} ${item.borderColor} border-2 rounded-xl p-8 transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer`}
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h2>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tổng Quan Hệ Thống</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Đội Đua & Tay Đua</h3>
              <p className="text-gray-600 mb-2">Quản lý thông tin cơ bản và liên hệ</p>
              <span className="text-blue-600 font-medium">4 đội đua, 8 tay đua</span>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Nhà Tài Trợ</h3>
              <p className="text-gray-600 mb-2">Quản lý hợp đồng và giao dịch</p>
              <span className="text-green-600 font-medium">4 nhà tài trợ, 4 hợp đồng</span>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Giải Đua & Kết Quả</h3>
              <p className="text-gray-600 mb-2">Quản lý kết quả và giải thưởng</p>
              <span className="text-purple-600 font-medium">4 giải đua, 12 kết quả</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;