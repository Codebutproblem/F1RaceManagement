import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8084'; // Replace with your actual API URL

const TeamDriverManagement = () => {
  const [teams, setTeams] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('teams');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamFormData, setTeamFormData] = useState({
    team_name: '',
    team_principal: '',
    nationality: '',
    headquarters: '',
    founding_year: '',
    bank_account: '',
    bank_details: ''
  });
  const [driverFormData, setDriverFormData] = useState({
    team_id: '',
    first_name: '',
    last_name: '',
    nationality: '',
    date_of_birth: '',
    driver_number: '',
    bank_account: '',
    bank_details: ''
  });
  const [isTeamFormVisible, setIsTeamFormVisible] = useState(false);
  const [isDriverFormVisible, setIsDriverFormVisible] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(API_URL+'/api/teams');
        if (response.ok) {
          const data = await response.json();
          setTeams(data);
        } else {
          console.error('Failed to fetch teams');
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    const fetchDrivers = async () => {
      try {
        const response = await fetch(API_URL+'/api/drivers');
        if (response.ok) {
          const data = await response.json();
          setDrivers(data);
        } else {
          console.error('Failed to fetch drivers');
        }
      } catch (error) {
        console.error('Error fetching drivers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
    fetchDrivers();
  }, []);

  const handleTeamFormChange = (e) => {
    const { name, value } = e.target;
    setTeamFormData({
      ...teamFormData,
      [name]: value
    });
  };

  const handleDriverFormChange = (e) => {
    const { name, value } = e.target;
    setDriverFormData({
      ...driverFormData,
      [name]: value
    });
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL+'/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamFormData),
      });

      if (response.ok) {
        const newTeam = await response.json();
        setTeams([...teams, newTeam]);
        setTeamFormData({
          team_name: '',
          team_principal: '',
          nationality: '',
          headquarters: '',
          founding_year: '',
          bank_account: '',
          bank_details: ''
        });
        setIsTeamFormVisible(false);
      } else {
        console.error('Failed to create team');
      }
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const handleDriverSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL+'/api/drivers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driverFormData),
      });

      if (response.ok) {
        const newDriver = await response.json();
        setDrivers([...drivers, newDriver]);
        setDriverFormData({
          team_id: '',
          first_name: '',
          last_name: '',
          nationality: '',
          date_of_birth: '',
          driver_number: '',
          bank_account: '',
          bank_details: ''
        });
        setIsDriverFormVisible(false);
      } else {
        console.error('Failed to create driver');
      }
    } catch (error) {
      console.error('Error creating driver:', error);
    }
  };

  const toggleTeamForm = () => {
    setIsTeamFormVisible(!isTeamFormVisible);
  };

  const toggleDriverForm = () => {
    setIsDriverFormVisible(!isDriverFormVisible);
  };

  const getTeamDrivers = (teamId) => {
    return drivers.filter(driver => driver.team_id === teamId);
  };

  const selectTeam = (team) => {
    setSelectedTeam(team);
  };

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  const getTeamName = (teamId) => {
    const team = teams.find(t => t.team_id === teamId);
    return team ? team.team_name : 'Unknown Team';
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Teams & Drivers Management</h1>
      
      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 ${activeTab === 'teams' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('teams')}
          >
            Teams
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'drivers' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('drivers')}
          >
            Drivers
          </button>
        </div>
      </div>

      {activeTab === 'teams' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">F1 Teams</h2>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={toggleTeamForm}
            >
              {isTeamFormVisible ? 'Cancel' : 'Add New Team'}
            </button>
          </div>

          {isTeamFormVisible && (
            <form onSubmit={handleTeamSubmit} className="bg-gray-100 p-4 rounded mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                  <input
                    type="text"
                    name="team_name"
                    value={teamFormData.team_name}
                    onChange={handleTeamFormChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Principal</label>
                  <input
                    type="text"
                    name="team_principal"
                    value={teamFormData.team_principal}
                    onChange={handleTeamFormChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                  <input
                    type="text"
                    name="nationality"
                    value={teamFormData.nationality}
                    onChange={handleTeamFormChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Headquarters</label>
                  <input
                    type="text"
                    name="headquarters"
                    value={teamFormData.headquarters}
                    onChange={handleTeamFormChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Founding Year</label>
                  <input
                    type="number"
                    name="founding_year"
                    value={teamFormData.founding_year}
                    onChange={handleTeamFormChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account</label>
                  <input
                    type="text"
                    name="bank_account"
                    value={teamFormData.bank_account}
                    onChange={handleTeamFormChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Details</label>
                <textarea
                  name="bank_details"
                  value={teamFormData.bank_details}
                  onChange={handleTeamFormChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                ></textarea>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Team
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {teams.map((team) => (
              <div 
                key={team.team_id} 
                className={`border rounded shadow p-4 ${selectedTeam && selectedTeam.team_id === team.team_id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => selectTeam(team)}
              >
                <h3 className="text-lg font-bold mb-2">{team.team_name}</h3>
                <p><span className="font-medium">Principal:</span> {team.team_principal}</p>
                <p><span className="font-medium">Nationality:</span> {team.nationality}</p>
                <p><span className="font-medium">Headquarters:</span> {team.headquarters}</p>
                <p><span className="font-medium">Founded:</span> {team.founding_year}</p>
                
                <div className="mt-3 pt-3 border-t">
                  <p className="font-medium mb-1">Drivers:</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {getTeamDrivers(team.team_id).map(driver => (
                      <li key={driver.driver_id}>
                        {driver.first_name} {driver.last_name} (#{driver.driver_number})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'drivers' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">F1 Drivers</h2>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={toggleDriverForm}
            >
              {isDriverFormVisible ? 'Cancel' : 'Add New Driver'}
            </button>
          </div>

          {isDriverFormVisible && (
            <form onSubmit={handleDriverSubmit} className="bg-gray-100 p-4 rounded mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
                  <select
                    name="team_id"
                    value={driverFormData.team_id}
                    onChange={handleDriverFormChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select a team</option>
                    {teams.map(team => (
                      <option key={team.team_id} value={team.team_id}>
                        {team.team_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={driverFormData.first_name}
                    onChange={handleDriverFormChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={driverFormData.last_name}
                    onChange={handleDriverFormChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                  <input
                    type="text"
                    name="nationality"
                    value={driverFormData.nationality}
                    onChange={handleDriverFormChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={driverFormData.date_of_birth}
                    onChange={handleDriverFormChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Driver Number</label>
                  <input
                    type="number"
                    name="driver_number"
                    value={driverFormData.driver_number}
                    onChange={handleDriverFormChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account</label>
                  <input
                    type="text"
                    name="bank_account"
                    value={driverFormData.bank_account}
                    onChange={handleDriverFormChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Details</label>
                <textarea
                  name="bank_details"
                  value={driverFormData.bank_details}
                  onChange={handleDriverFormChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                ></textarea>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Driver
                </button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Number</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Team</th>
                  <th className="py-2 px-4 border-b">Nationality</th>
                  <th className="py-2 px-4 border-b">Date of Birth</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver.driver_id}>
                    <td className="py-2 px-4 border-b text-center">{driver.driver_number}</td>
                    <td className="py-2 px-4 border-b">
                      {driver.first_name} {driver.last_name}
                    </td>
                    <td className="py-2 px-4 border-b">{getTeamName(driver.team_id)}</td>
                    <td className="py-2 px-4 border-b">{driver.nationality}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(driver.date_of_birth).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button className="text-blue-600 hover:text-blue-800 mr-2">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDriverManagement;