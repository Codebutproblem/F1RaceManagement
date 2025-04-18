import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Edit, Trash2, Search, X, Save, UserPlus, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8080";

const DriversTeamsPage = () => {

  const navigate = useNavigate();
  // State for teams and drivers
  const [teams, setTeams] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for modals
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showDriverModal, setShowDriverModal] = useState(false);
  
  // State for form data
  const [teamForm, setTeamForm] = useState({
    teamName: '',
    teamPrincipal: '',
    nationality: '',
    headquarters: '',
    foundingYear: '',
  });
  
  const [driverForm, setDriverForm] = useState({
    firstName: '',
    lastName: '',
    teamId: '',
    nationality: '',
    dateOfBirth: '',
    driverNumber: '',
    activeStatus: true
  });
  
  // State for editing
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [editingDriverId, setEditingDriverId] = useState(null);
  
  // State for search and filters
  const [teamSearch, setTeamSearch] = useState('');
  const [driverSearch, setDriverSearch] = useState('');
  
  // Tabs for teams/drivers
  const [activeTab, setActiveTab] = useState('teams');

  // Fetch teams and drivers
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [res1, res2] = await Promise.all([
          fetch(`${API_URL}/api/teams`),
          fetch(`${API_URL}/api/drivers`),
        ]);

        if(res1.ok){
          const teamsData = await res1.json();
          setTeams(teamsData);
        }
        if(res2.ok){
          const driversData = await res2.json();
          setDrivers(driversData);
        }
      } catch (error) {
        console.error('Lỗi khi fetch API:', error);
      }
      setLoading(false);
    };
    fetchData()
  }, []);

  // Filter teams and drivers based on search
  const filteredTeams = teams.filter(team => 
    team.team_name.toLowerCase().includes(teamSearch.toLowerCase()) ||
    team.team_principal.toLowerCase().includes(teamSearch.toLowerCase()) ||
    team.nationality.toLowerCase().includes(teamSearch.toLowerCase())
  );
  
  const filteredDrivers = drivers.filter(driver => 
    `${driver.first_name} ${driver.last_name}`.toLowerCase().includes(driverSearch.toLowerCase()) ||
    driver.nationality.toLowerCase().includes(driverSearch.toLowerCase()) ||
    String(driver.driver_number).includes(driverSearch)
  );

  // Handle team form submit
  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    
    const teamData = {
      team_name: teamForm.teamName,
      team_principal: teamForm.teamPrincipal,
      nationality: teamForm.nationality,
      headquarters: teamForm.headquarters,
      founding_year: parseInt(teamForm.foundingYear)
    };
    
    try {
      if (editingTeamId) {
        // Update existing team
        const response = await fetch(`${API_URL}/api/teams/${editingTeamId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(teamData),
        });
        
        if (response.ok) {
          const updatedTeam = await response.json();
          setTeams(teams.map(team => team.team_id === editingTeamId ? updatedTeam : team));
        } else {
          console.error('Failed to update team');
        }
      } else {
        // Add new team
        const response = await fetch(`${API_URL}/api/teams`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(teamData),
        });
        
        if (response.ok) {
          const newTeam = await response.json();
          setTeams([...teams, newTeam]);
        } else {
          console.error('Failed to create team');
        }
      }
      
      // Reset form and close modal
      setTeamForm({
        teamName: '',
        teamPrincipal: '',
        nationality: '',
        headquarters: '',
        foundingYear: '',
      });
      setEditingTeamId(null);
      setShowTeamModal(false);
    } catch (error) {
      console.error('Error submitting team form:', error);
    }
  };

  // Handle driver form submit
  const handleDriverSubmit = async (e) => {
    e.preventDefault();
    
    const driverData = {
      first_name: driverForm.firstName,
      last_name: driverForm.lastName,
      team_id: parseInt(driverForm.teamId),
      nationality: driverForm.nationality,
      date_of_birth: driverForm.dateOfBirth,
      driver_number: parseInt(driverForm.driverNumber),
      active_status: driverForm.activeStatus
    };
    
    try {
      if (editingDriverId) {
        // Update existing driver
        const response = await fetch(`${API_URL}/api/drivers/${editingDriverId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(driverData),
        });
        
        if (response.ok) {
          const updatedDriver = await response.json();
          setDrivers(drivers.map(driver => driver.driver_id === editingDriverId ? updatedDriver : driver));
        } else {
          console.error('Failed to update driver');
        }
      } else {
        // Add new driver
        const response = await fetch(`${API_URL}/api/drivers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(driverData),
        });
        
        if (response.ok) {
          const newDriver = await response.json();
          setDrivers([...drivers, newDriver]);
        } else {
          console.error('Failed to create driver');
        }
      }
      
      // Reset form and close modal
      setDriverForm({
        firstName: '',
        lastName: '',
        teamId: '',
        nationality: '',
        dateOfBirth: '',
        driverNumber: '',
        activeStatus: true
      });
      setEditingDriverId(null);
      setShowDriverModal(false);
    } catch (error) {
      console.error('Error submitting driver form:', error);
    }
  };

  // Edit team
  const editTeam = async (team) => {
    try {
      const response = await fetch(`${API_URL}/api/teams/${team.team_id}`);
      if (response.ok) {
        const teamData = await response.json();
        setTeamForm({
          teamName: teamData.team_name,
          teamPrincipal: teamData.team_principal,
          nationality: teamData.nationality,
          headquarters: teamData.headquarters,
          foundingYear: teamData.founding_year.toString(),
        });
        setEditingTeamId(team.team_id);
        setShowTeamModal(true);
      } else {
        console.error('Failed to fetch team details');
      }
    } catch (error) {
      console.error('Error fetching team details:', error);
      // Fall back to using provided team data
      setTeamForm({
        teamName: team.team_name,
        teamPrincipal: team.team_principal,
        nationality: team.nationality,
        headquarters: team.headquarters,
        foundingYear: team.founding_year.toString(),
      });
      setEditingTeamId(team.team_id);
      setShowTeamModal(true);
    }
  };

  // Delete team
  const deleteTeam = async (teamId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đội đua này?')) {
      try {
        const response = await fetch(`${API_URL}/api/teams/${teamId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          setTeams(teams.filter(team => team.team_id !== teamId));
          
          // Also filter out drivers from this team
          setDrivers(drivers.filter(driver => driver.team_id !== teamId));
        } else {
          console.error('Failed to delete team');
        }
      } catch (error) {
        console.error('Error deleting team:', error);
      }
    }
  };

  // Edit driver
  const editDriver = async (driver) => {
    try {
      const response = await fetch(`${API_URL}/api/drivers/${driver.driver_id}`);
      if (response.ok) {
        const driverData = await response.json();
        setDriverForm({
          firstName: driverData.first_name,
          lastName: driverData.last_name,
          teamId: driverData.team_id.toString(),
          nationality: driverData.nationality,
          dateOfBirth: driverData.date_of_birth,
          driverNumber: driverData.driver_number.toString(),
          activeStatus: driverData.active_status
        });
        setEditingDriverId(driver.driver_id);
        setShowDriverModal(true);
      } else {
        console.error('Failed to fetch driver details');
      }
    } catch (error) {
      console.error('Error fetching driver details:', error);
      // Fall back to using provided driver data
      setDriverForm({
        firstName: driver.first_name,
        lastName: driver.last_name,
        teamId: driver.team_id.toString(),
        nationality: driver.nationality,
        dateOfBirth: driver.date_of_birth,
        driverNumber: driver.driver_number.toString(),
        activeStatus: driver.active_status
      });
      setEditingDriverId(driver.driver_id);
      setShowDriverModal(true);
    }
  };

  // Delete driver
  const deleteDriver = async (driverId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tay đua này?')) {
      try {
        const response = await fetch(`${API_URL}/api/drivers/${driverId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          setDrivers(drivers.filter(driver => driver.driver_id !== driverId));
        } else {
          console.error('Failed to delete driver');
        }
      } catch (error) {
        console.error('Error deleting driver:', error);
      }
    }
  };

  // Get team name by ID
  const getTeamName = (teamId) => {
    const team = teams.find(t => t.team_id === teamId);
    return team ? team.team_name : 'Unknown Team';
  };

  // Load drivers by team (for future use)
  const loadDriversByTeam = async (teamId) => {
    try {
      const response = await fetch(`${API_URL}/api/drivers/team/${teamId}`);
      if (response.ok) {
        const teamDrivers = await response.json();
        return teamDrivers;
      }
    } catch (error) {
      console.error(`Error loading drivers for team ${teamId}:`, error);
      return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
          <button 
            onClick={() => {
              navigate(-1)
              console.log('Navigate back to home')
            }} 
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Quản lý Tay Đua & Đội Đua
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'teams' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('teams')}
            >
              Đội Đua
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'drivers' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('drivers')}
            >
              Tay Đua
            </button>
          </div>
        </div>

        {/* Teams Tab Content */}
        {activeTab === 'teams' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm đội đua..."
                  value={teamSearch}
                  onChange={(e) => setTeamSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                {teamSearch && (
                  <button
                    onClick={() => setTeamSearch('')}
                    className="absolute right-3 top-2.5"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  setTeamForm({
                    teamName: '',
                    teamPrincipal: '',
                    nationality: '',
                    headquarters: '',
                    foundingYear: '',
                  });
                  setEditingTeamId(null);
                  setShowTeamModal(true);
                }}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Thêm Đội Đua
              </button>
            </div>

            {loading ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Đang tải dữ liệu...</p>
              </div>
            ) : (
              <>
                {filteredTeams.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">Không tìm thấy đội đua nào</p>
                  </div>
                ) : (
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {filteredTeams.map((team) => (
                        <li key={team.team_id}>
                          <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <Building className="h-5 w-5 text-gray-400 mr-2" />
                                <h3 className="text-lg font-medium text-blue-600">{team.team_name}</h3>
                              </div>
                              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-500">
                                <div className="col-span-1">
                                  <span className="font-medium text-gray-900">Team Principal:</span> {team.team_principal}
                                </div>
                                <div className="col-span-1">
                                  <span className="font-medium text-gray-900">Nationality:</span> {team.nationality}
                                </div>
                                <div className="col-span-1">
                                  <span className="font-medium text-gray-900">Headquarters:</span> {team.headquarters}
                                </div>
                                <div className="col-span-1">
                                  <span className="font-medium text-gray-900">Founded:</span> {team.founding_year}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => editTeam(team)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                              >
                                <Edit className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => deleteTeam(team.team_id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Drivers Tab Content */}
        {activeTab === 'drivers' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm tay đua..."
                  value={driverSearch}
                  onChange={(e) => setDriverSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                {driverSearch && (
                  <button
                    onClick={() => setDriverSearch('')}
                    className="absolute right-3 top-2.5"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  setDriverForm({
                    firstName: '',
                    lastName: '',
                    teamId: '',
                    nationality: '',
                    dateOfBirth: '',
                    driverNumber: '',
                    activeStatus: true
                  });
                  setEditingDriverId(null);
                  setShowDriverModal(true);
                }}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Thêm Tay Đua
              </button>
            </div>

            {loading ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Đang tải dữ liệu...</p>
              </div>
            ) : (
              <>
                {filteredDrivers.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">Không tìm thấy tay đua nào</p>
                  </div>
                ) : (
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {filteredDrivers.map((driver) => (
                        <li key={driver.driver_id}>
                          <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <div className="bg-blue-100 text-blue-800 h-8 w-8 rounded-full flex items-center justify-center mr-3 font-bold">
                                  {driver.driver_number}
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">
                                  {driver.first_name} {driver.last_name}
                                </h3>
                                {!driver.active_status && (
                                  <span className="ml-2 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                                    Inactive
                                  </span>
                                )}
                              </div>
                              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-500">
                                <div className="col-span-1">
                                  <span className="font-medium text-gray-900">Team:</span> {getTeamName(driver.team_id)}
                                </div>
                                <div className="col-span-1">
                                  <span className="font-medium text-gray-900">Nationality:</span> {driver.nationality}
                                </div>
                                <div className="col-span-1">
                                  <span className="font-medium text-gray-900">Date of Birth:</span> {driver.date_of_birth}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => editDriver(driver)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                              >
                                <Edit className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => deleteDriver(driver.driver_id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Team Modal */}
        {showTeamModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {editingTeamId ? 'Chỉnh sửa Đội Đua' : 'Thêm Đội Đua'}
                </h3>
                <button
                  onClick={() => setShowTeamModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleTeamSubmit}>
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Tên Đội Đua
                      </label>
                      <input
                        type="text"
                        required
                        value={teamForm.teamName}
                        onChange={(e) => setTeamForm({...teamForm, teamName: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Giám đốc Đội
                      </label>
                      <input
                        type="text"
                        required
                        value={teamForm.teamPrincipal}
                        onChange={(e) => setTeamForm({...teamForm, teamPrincipal: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Quốc tịch
                      </label>
                      <input
                        type="text"
                        required
                        value={teamForm.nationality}
                        onChange={(e) => setTeamForm({...teamForm, nationality: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Năm thành lập
                      </label>
                      <input
                        type="number"
                        required
                        value={teamForm.foundingYear}
                        onChange={(e) => setTeamForm({...teamForm, foundingYear: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Trụ sở
                      </label>
                      <input
                        type="text"
                        required
                        value={teamForm.headquarters}
                        onChange={(e) => setTeamForm({...teamForm, headquarters: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="button"
                    onClick={() => setShowTeamModal(false)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingTeamId ? 'Cập nhật' : 'Lưu'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Driver Modal */}
        {showDriverModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {editingDriverId ? 'Chỉnh sửa Tay Đua' : 'Thêm Tay Đua'}
                </h3>
                <button
                  onClick={() => setShowDriverModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleDriverSubmit}>
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Tên
                      </label>
                      <input
                        type="text"
                        required
                        value={driverForm.firstName}
                        onChange={(e) => setDriverForm({...driverForm, firstName: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Họ
                      </label>
                      <input
                        type="text"
                        required
                        value={driverForm.lastName}
                        onChange={(e) => setDriverForm({...driverForm, lastName: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Đội
                      </label>
                      <select
                        required
                        value={driverForm.teamId}
                        onChange={(e) => setDriverForm({...driverForm, teamId: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Chọn đội đua</option>
                        {teams.map(team => (
                          <option key={team.team_id} value={team.team_id}>
                            {team.team_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Quốc tịch
                      </label>
                      <input
                        type="text"
                        required
                        value={driverForm.nationality}
                        onChange={(e) => setDriverForm({...driverForm, nationality: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Số xe
                      </label>
                      <input
                        type="number"
                        required
                        value={driverForm.driverNumber}
                        onChange={(e) => setDriverForm({...driverForm, driverNumber: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Ngày sinh
                      </label>
                      <input
                        type="date"
                        required
                        value={driverForm.dateOfBirth}
                        onChange={(e) => setDriverForm({...driverForm, dateOfBirth: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="col-span-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={driverForm.activeStatus}
                          onChange={(e) => setDriverForm({...driverForm, activeStatus: e.target.checked})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                          Đang hoạt động
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="button"
                    onClick={() => setShowDriverModal(false)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingDriverId ? 'Cập nhật' : 'Lưu'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DriversTeamsPage;