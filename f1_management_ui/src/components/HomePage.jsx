import React from 'react';

const HomePage = () => {
  const navigateTo = (path) => {
    // This function would use router navigation in a real implementation
    console.log(`Navigate to: ${path}`);
    // In a real app with react-router: navigate(path)
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    margin: '15px 0',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease'
  };

  return (
    <div className="p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-800">F1 Management System</h1>
        <p className="text-lg text-gray-600 mt-2">
          Manage teams, drivers, sponsors, and prize payments for Formula 1
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Teams & Drivers Card */}
        <div 
          style={cardStyle} 
          className="bg-white hover:bg-gray-50"
          onClick={() => navigateTo('/teams-drivers')}
        >
          <h2 className="text-xl font-bold mb-3 text-blue-700">Teams & Drivers Management</h2>
          <p className="text-gray-600">
            View and manage Formula 1 teams and their drivers. See team details, driver information,
            and their current standings.
          </p>
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Manage Teams & Drivers
            </button>
          </div>
        </div>

        {/* Sponsors Card */}
        <div 
          style={cardStyle} 
          className="bg-white hover:bg-gray-50"
          onClick={() => navigateTo('/sponsors')}
        >
          <h2 className="text-xl font-bold mb-3 text-blue-700">Sponsorship Management</h2>
          <p className="text-gray-600">
            Handle sponsorship contracts, track payments, and manage relationships with 
            sponsors. Create and monitor sponsorship agreements.
          </p>
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Manage Sponsors
            </button>
          </div>
        </div>

        {/* Prizes Card */}
        <div 
          style={cardStyle} 
          className="bg-white hover:bg-gray-50"
          onClick={() => navigateTo('/prizes')}
        >
          <h2 className="text-xl font-bold mb-3 text-blue-700">Prize Management</h2>
          <p className="text-gray-600">
            Process and track prize payments to teams and drivers. View race results,
            prize structures, and payment history.
          </p>
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
              Manage Prizes
            </button>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-500">
        <p>© 2025 F1 Management System</p>
      </footer>
    </div>
  );
};

export default HomePage;