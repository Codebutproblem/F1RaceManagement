import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8085';

const PrizeManagement = () => {
  const [races, setRaces] = useState([]);
  const [prizeStructures, setPrizeStructures] = useState([]);
  const [prizePayments, setPrizePayments] = useState([]);
  const [raceResults, setRaceResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('races');
  const [selectedRace, setSelectedRace] = useState(null);
  const [teams, setTeams] = useState([]);
  const [drivers, setDrivers] = useState([]);
  
  const [paymentForm, setPaymentForm] = useState({
    recipient_type: 'Driver',
    recipient_id: '',
    race_id: '',
    prize_type: '',
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    transaction_reference: '',
    status: 'Pending'
  });
  
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch races
        const racesResponse = await fetch(API_URL+'/api/races');
        const racesData = await racesResponse.json();
        setRaces(racesData);
        
        // Fetch prize structures
        const structuresResponse = await fetch('/api/prize-structures');
        const structuresData = await structuresResponse.json();
        setPrizeStructures(structuresData);
        
        // Fetch prize payments
        const paymentsResponse = await fetch('/api/prize-payments');
        const paymentsData = await paymentsResponse.json();
        setPrizePayments(paymentsData);
        
        // Fetch teams
        const teamsResponse = await fetch('/api/teams');
        const teamsData = await teamsResponse.json();
        setTeams(teamsData);
        
        // Fetch drivers
        const driversResponse = await fetch('/api/drivers');
        const driversData = await driversResponse.json();
        setDrivers(driversData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const fetchRaceDetails = async (raceId) => {
    try {
      const response = await fetch(API_URL+`/api/races/${raceId}`);
      if (response.ok) {
        const data = await response.json();
        setRaceResults(data.results || []);
        return data;
      }
    } catch (error) {
      console.error('Error fetching race details:', error);
    }
    return null;
  };

  const handlePaymentFormChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm({
      ...paymentForm,
      [name]: value
    });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/prize-payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentForm),
      });

      if (response.ok) {
        const newPayment = await response.json();
        setPrizePayments([...prizePayments, newPayment]);
        setPaymentForm({
          recipient_type: 'Driver',
          recipient_id: '',
          race_id: selectedRace ? selectedRace.race_id : '',
          prize_type: '',
          amount: '',
          payment_date: new Date().toISOString().split('T')[0],
          transaction_reference: '',
          status: 'Pending'
        });
        setIsAddingPayment(false);
      } else {
        console.error('Failed to create payment');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  const toggleAddPayment = () => {
    setIsAddingPayment(!isAddingPayment);
    if (!isAddingPayment && selectedRace) {
      setPaymentForm({
        ...paymentForm,
        race_id: selectedRace.race_id
      });
    }
  };

  const selectRace = async (race) => {
    const raceDetails = await fetchRaceDetails(race.race_id);
    setSelectedRace(raceDetails || race);
  };

  const getDriverName = (driverId) => {
    const driver = drivers.find(d => d.driver_id === driverId);
    return driver ? `${driver.first_name} ${driver.last_name}` : 'Unknown Driver';
  };

  const getTeamName = (teamId) => {
    const team = teams.find(t => t.team_id === teamId);
    return team ? team.team_name : 'Unknown Team';
  };

  const getRecipientName = (type, id) => {
    if (type === 'Driver') {
      return getDriverName(id);
    } else if (type === 'Team') {
      return getTeamName(id);
    }
    return 'Unknown Recipient';
  };
  
  const getRaceByPaymentId = (raceId) => {
    return races.find(race => race.race_id === raceId);
  };

  const getPaymentsByRaceId = (raceId) => {
    return prizePayments.filter(payment => payment.race_id === raceId);
  };

  const getPrizeStructureByType = (type, position) => {
    return prizeStructures.find(
      structure => structure.prize_category === type && structure.position === position
    );
  };

  const calculateTotalPaidForRace = (raceId) => {
    const racePayments = getPaymentsByRaceId(raceId);
    return racePayments.reduce((total, payment) => total + parseFloat(payment.amount), 0);
  };
  
  const formatStatusBadge = (status) => {
    let bgColor, textColor;
    
    switch(status) {
      case 'Completed':
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        break;
      case 'Pending':
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-800';
        break;
      case 'Failed':
        bgColor = 'bg-red-100';
        textColor = 'text-red-800';
        break;
      default:
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
    }
    
    return (
      <span className={`px-2 py-1 rounded text-xs ${bgColor} ${textColor}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Prize Management</h1>
      
      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 ${activeTab === 'races' ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('races')}
          >
            Races
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'prize-structure' ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('prize-structure')}
          >
            Prize Structure
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'payments' ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('payments')}
          >
            Payments
          </button>
        </div>
      </div>

      {activeTab === 'races' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">F1 Races</h2>
            {selectedRace && (
              <button 
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                onClick={toggleAddPayment}
              >
                {isAddingPayment ? 'Cancel' : 'Add Prize Payment'}
              </button>
            )}
          </div>

          {isAddingPayment && selectedRace && (
            <form onSubmit={handlePaymentSubmit} className="bg-gray-100 p-4 rounded mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Race</label>
                  <input
                    type="text"
                    value={`${selectedRace.race_name} (${selectedRace.race_date})`}
                    className="w-full p-2 border rounded bg-gray-50"
                    disabled
                  />
                  <input type="hidden" name="race_id" value={selectedRace.race_id} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Type</label>
                  <select
                    name="recipient_type"
                    value={paymentForm.recipient_type}
                    onChange={handlePaymentFormChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="Driver">Driver</option>
                    <option value="Team">Team</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
                  <select
                    name="recipient_id"
                    value={paymentForm.recipient_id}
                    onChange={handlePaymentFormChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select a recipient</option>
                    {paymentForm.recipient_type === 'Driver' ?
                      drivers.map(driver => (
                        <option key={driver.driver_id} value={driver.driver_id}>
                          {driver.first_name} {driver.last_name} (#{driver.driver_number})
                        </option>
                      )) :
                      teams.map(team => (
                        <option key={team.team_id} value={team.team_id}>
                          {team.team_name}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prize Type</label>
                  <select
                    name="prize_type"
                    value={paymentForm.prize_type}
                    onChange={handlePaymentFormChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select prize type</option>
                    {paymentForm.recipient_type === 'Driver' ? (
                      <>
                        <option value="Race Position">Race Position</option>
                        <option value="Fastest Lap">Fastest Lap</option>
                      </>
                    ) : (
                      <option value="Constructor Position">Constructor Position</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={paymentForm.amount}
                    onChange={handlePaymentFormChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                  <input
                    type="date"
                    name="payment_date"
                    value={paymentForm.payment_date}
                    onChange={handlePaymentFormChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Reference</label>
                  <input
                    type="text"
                    name="transaction_reference"
                    value={paymentForm.transaction_reference}
                    onChange={handlePaymentFormChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={paymentForm.status}
                    onChange={handlePaymentFormChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  Process Payment
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {races.map((race) => (
              <div 
                key={race.race_id} 
                className={`border rounded shadow p-4 ${
                  selectedRace && selectedRace.race_id === race.race_id ? 'ring-2 ring-purple-500' : ''
                } ${race.status === 'Completed' ? 'bg-white' : 'bg-gray-50'}`}
                onClick={() => selectRace(race)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold mb-2">{race.race_name}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    race.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {race.status}
                  </span>
                </div>
                <p><span className="font-medium">Circuit:</span> {race.circuit_name}</p>
                <p><span className="font-medium">Location:</span> {race.location}, {race.country}</p>
                <p><span className="font-medium">Date:</span> {new Date(race.race_date).toLocaleDateString()}</p>
                
                {calculateTotalPaidForRace(race.race_id) > 0 && (
                  <div className="mt-3 pt-2 border-t">
                    <p><span className="font-medium">Total Prize Money Paid:</span> ${calculateTotalPaidForRace(race.race_id).toLocaleString()}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {selectedRace && (
            <div className="mt-6 border rounded shadow p-4">
              <h3 className="text-lg font-bold mb-4">Race Results: {selectedRace.race_name}</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Position</th>
                      <th className="py-2 px-4 border-b">Driver</th>
                      <th className="py-2 px-4 border-b">Team</th>
                      <th className="py-2 px-4 border-b">Points</th>
                      <th className="py-2 px-4 border-b">Fastest Lap</th>
                      <th className="py-2 px-4 border-b">Prize Money</th>
                    </tr>
                  </thead>
                  <tbody>
                    {raceResults.map((result) => {
                      const driverPayments = prizePayments.filter(
                        payment => payment.race_id === selectedRace.race_id && 
                                  payment.recipient_type === 'Driver' &&
                                  payment.recipient_id === result.driver_id
                      );
                      
                      const totalDriverPrize = driverPayments.reduce(
                        (total, payment) => total + parseFloat(payment.amount), 0
                      );
                      
                      return (
                        <tr key={result.result_id}>
                          <td className="py-2 px-4 border-b text-center">{result.finish_position}</td>
                          <td className="py-2 px-4 border-b">{getDriverName(result.driver_id)}</td>
                          <td className="py-2 px-4 border-b">{getTeamName(result.team_id)}</td>
                          <td className="py-2 px-4 border-b text-center">{result.points}</td>
                          <td className="py-2 px-4 border-b text-center">
                            {result.fastest_lap ? 'Yes' : 'No'}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {totalDriverPrize > 0 ? 
                              `$${totalDriverPrize.toLocaleString()}` : 
                              <span className="text-gray-400">Not paid</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <h3 className="text-lg font-bold mt-6 mb-4">Team Results</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Team</th>
                      <th className="py-2 px-4 border-b">Drivers</th>
                      <th className="py-2 px-4 border-b">Prize Money</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team) => {
                      // Find team drivers in this race
                      const teamDrivers = raceResults
                        .filter(result => result.team_id === team.team_id)
                        .map(result => getDriverName(result.driver_id));
                      
                      if (teamDrivers.length === 0) return null;
                      
                      const teamPayments = prizePayments.filter(
                        payment => payment.race_id === selectedRace.race_id && 
                                  payment.recipient_type === 'Team' &&
                                  payment.recipient_id === team.team_id
                      );
                      
                      const totalTeamPrize = teamPayments.reduce(
                        (total, payment) => total + parseFloat(payment.amount), 0
                      );
                      
                      return (
                        <tr key={team.team_id}>
                          <td className="py-2 px-4 border-b">{team.team_name}</td>
                          <td className="py-2 px-4 border-b">{teamDrivers.join(', ')}</td>
                          <td className="py-2 px-4 border-b">
                            {totalTeamPrize > 0 ? 
                              `$${totalTeamPrize.toLocaleString()}` : 
                              <span className="text-gray-400">Not paid</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'prize-structure' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Prize Structure</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border rounded shadow p-4">
              <h3 className="text-lg font-bold mb-2 text-purple-700">Driver Positions</h3>
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="py-2 text-left">Position</th>
                    <th className="py-2 text-right">Prize Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {prizeStructures
                    .filter(prize => prize.prize_category === 'Race Position')
                    .sort((a, b) => a.position - b.position)
                    .map(prize => (
                      <tr key={prize.structure_id}>
                        <td className="py-1">{prize.position}</td>
                        <td className="py-1 text-right">${parseFloat(prize.amount).toLocaleString()}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            
            <div className="border rounded shadow p-4">
              <h3 className="text-lg font-bold mb-2 text-purple-700">Constructor Positions</h3>
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="py-2 text-left">Position</th>
                    <th className="py-2 text-right">Prize Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {prizeStructures
                    .filter(prize => prize.prize_category === 'Constructor Position')
                    .sort((a, b) => a.position - b.position)
                    .map(prize => (
                      <tr key={prize.structure_id}>
                        <td className="py-1">{prize.position}</td>
                        <td className="py-1 text-right">${parseFloat(prize.amount).toLocaleString()}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            
            <div className="border rounded shadow p-4">
              <h3 className="text-lg font-bold mb-2 text-purple-700">Bonus Prizes</h3>
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="py-2 text-left">Category</th>
                    <th className="py-2 text-right">Prize Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {prizeStructures
                    .filter(prize => prize.prize_category !== 'Race Position' && prize.prize_category !== 'Constructor Position')
                    .map(prize => (
                      <tr key={prize.structure_id}>
                        <td className="py-1">{prize.prize_category}</td>
                        <td className="py-1 text-right">${parseFloat(prize.amount).toLocaleString()}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'payments' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Prize Payments</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Race</th>
                  <th className="py-2 px-4 border-b">Recipient</th>
                  <th className="py-2 px-4 border-b">Type</th>
                  <th className="py-2 px-4 border-b">Amount</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Reference</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {prizePayments.map((payment) => {
                  const race = getRaceByPaymentId(payment.race_id);
                  return (
                    <tr key={payment.payment_id}>
                      <td className="py-2 px-4 border-b">
                        {race ? race.race_name : `Race ID: ${payment.race_id}`}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {getRecipientName(payment.recipient_type, payment.recipient_id)}
                      </td>
                      <td className="py-2 px-4 border-b">{payment.prize_type}</td>
                      <td className="py-2 px-4 border-b">${parseFloat(payment.amount).toLocaleString()}</td>
                      <td className="py-2 px-4 border-b">
                        {payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : 'Not paid'}
                      </td>
                      <td className="py-2 px-4 border-b">{payment.transaction_reference || '-'}</td>
                      <td className="py-2 px-4 border-b">
                        {formatStatusBadge(payment.status)}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {payment.status !== 'Completed' && (
                          <button 
                            className="text-purple-600 hover:text-purple-800"
                            onClick={() => {
                              // Logic to update payment status to completed
                              console.log('Mark as completed:', payment.payment_id);
                            }}
                          >
                            Mark Completed
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrizeManagement;