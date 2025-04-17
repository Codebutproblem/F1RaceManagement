import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8082';

const SponsorManagement = () => {
  const [sponsors, setSponsors] = useState([]);
  const [sponsorshipTypes, setSponsorshipTypes] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('sponsors');
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);
  
  const [sponsorForm, setSponsorForm] = useState({
    sponsor_name: '',
    industry: '',
    contact_person: '',
    contact_email: '',
    contact_phone: ''
  });
  
  const [contractForm, setContractForm] = useState({
    sponsor_id: '',
    type_id: '',
    season_year: new Date().getFullYear(),
    start_date: '',
    end_date: '',
    contract_value: '',
    payment_terms: '',
    status: 'Draft'
  });
  
  const [paymentForm, setPaymentForm] = useState({
    contract_id: '',
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: 'Bank Transfer',
    transaction_reference: '',
    notes: ''
  });
  
  const [isAddingSponsor, setIsAddingSponsor] = useState(false);
  const [isAddingContract, setIsAddingContract] = useState(false);
  const [isAddingPayment, setIsAddingPayment] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sponsors
        const sponsorsResponse = await fetch(API_URL+'/api/sponsors');
        const sponsorsData = await sponsorsResponse.json();
        setSponsors(sponsorsData);
        
        // Fetch sponsorship types
        const typesResponse = await fetch(API_URL+'/api/sponsorship-types');
        const typesData = await typesResponse.json();
        setSponsorshipTypes(typesData);
        
        // Fetch contracts
        const contractsResponse = await fetch(API_URL+'/api/sponsorship-contracts');
        const contractsData = await contractsResponse.json();
        setContracts(contractsData);
        
        // Fetch payments
        const paymentsResponse = await fetch(API_URL+'/api/sponsorship-payments');
        const paymentsData = await paymentsResponse.json();
        setPayments(paymentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleSponsorFormChange = (e) => {
    const { name, value } = e.target;
    setSponsorForm({
      ...sponsorForm,
      [name]: value
    });
  };

  const handleContractFormChange = (e) => {
    const { name, value } = e.target;
    setContractForm({
      ...contractForm,
      [name]: value
    });
  };

  const handlePaymentFormChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm({
      ...paymentForm,
      [name]: value
    });
  };

  const handleSponsorSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL+'/api/sponsors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sponsorForm),
      });

      if (response.ok) {
        const newSponsor = await response.json();
        setSponsors([...sponsors, newSponsor]);
        setSponsorForm({
          sponsor_name: '',
          industry: '',
          contact_person: '',
          contact_email: '',
          contact_phone: ''
        });
        setIsAddingSponsor(false);
      } else {
        console.error('Failed to create sponsor');
      }
    } catch (error) {
      console.error('Error creating sponsor:', error);
    }
  };

  const handleContractSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL+'/api/sponsorship-contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contractForm),
      });

      if (response.ok) {
        const newContract = await response.json();
        setContracts([...contracts, newContract]);
        setContractForm({
          sponsor_id: '',
          type_id: '',
          season_year: new Date().getFullYear(),
          start_date: '',
          end_date: '',
          contract_value: '',
          payment_terms: '',
          status: 'Draft'
        });
        setIsAddingContract(false);
      } else {
        console.error('Failed to create contract');
      }
    } catch (error) {
      console.error('Error creating contract:', error);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL+'/api/sponsorship-payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentForm),
      });

      if (response.ok) {
        const newPayment = await response.json();
        setPayments([...payments, newPayment]);
        setPaymentForm({
          contract_id: '',
          amount: '',
          payment_date: new Date().toISOString().split('T')[0],
          payment_method: 'Bank Transfer',
          transaction_reference: '',
          notes: ''
        });
        setIsAddingPayment(false);
      } else {
        console.error('Failed to create payment');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  const toggleAddSponsor = () => {
    setIsAddingSponsor(!isAddingSponsor);
  };

  const toggleAddContract = () => {
    setIsAddingContract(!isAddingContract);
  };

  const toggleAddPayment = () => {
    setIsAddingPayment(!isAddingPayment);
  };

  const getSponsorName = (sponsorId) => {
    const sponsor = sponsors.find(s => s.sponsor_id === sponsorId);
    return sponsor ? sponsor.sponsor_name : 'Unknown Sponsor';
  };

  const getTypeName = (typeId) => {
    const type = sponsorshipTypes.find(t => t.type_id === typeId);
    return type ? type.type_name : 'Unknown Type';
  };

  const getContractById = (contractId) => {
    return contracts.find(c => c.contract_id === contractId);
  };

  const selectSponsor = (sponsor) => {
    setSelectedSponsor(sponsor);
    setSelectedContract(null);
  };

  const selectContract = (contract) => {
    setSelectedContract(contract);
  };

  const getContractsBySponsorId = (sponsorId) => {
    return contracts.filter(contract => contract.sponsor_id === sponsorId);
  };

  const getPaymentsByContractId = (contractId) => {
    return payments.filter(payment => payment.contract_id === contractId);
  };

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Sponsorship Management</h1>
      
      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 ${activeTab === 'sponsors' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('sponsors')}
          >
            Sponsors
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'contracts' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('contracts')}
          >
            Contracts
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'payments' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('payments')}
          >
            Payments
          </button>
        </div>
      </div>

      {activeTab === 'sponsors' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Sponsors</h2>
            <button 
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={toggleAddSponsor}
            >
              {isAddingSponsor ? 'Cancel' : 'Add New Sponsor'}
            </button>
          </div>

          {isAddingSponsor && (
            <form onSubmit={handleSponsorSubmit} className="bg-gray-100 p-4 rounded mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sponsor Name</label>
                  <input
                    type="text"
                    name="sponsor_name"
                    value={sponsorForm.sponsor_name}
                    onChange={handleSponsorFormChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                  <input
                    type="text"
                    name="industry"
                    value={sponsorForm.industry}
                    onChange={handleSponsorFormChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    name="contact_person"
                    value={sponsorForm.contact_person}
                    onChange={handleSponsorFormChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                  <input
                    type="email"
                    name="contact_email"
                    value={sponsorForm.contact_email}
                    onChange={handleSponsorFormChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    name="contact_phone"
                    value={sponsorForm.contact_phone}
                    onChange={handleSponsorFormChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save Sponsor
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {sponsors.map((sponsor) => (
              <div 
                key={sponsor.sponsor_id} 
                className={`border rounded shadow p-4 ${selectedSponsor && selectedSponsor.sponsor_id === sponsor.sponsor_id ? 'ring-2 ring-green-500' : ''}`}
                onClick={() => selectSponsor(sponsor)}
              >
                <h3 className="text-lg font-bold mb-2">{sponsor.sponsor_name}</h3>
                <p><span className="font-medium">Industry:</span> {sponsor.industry}</p>
                <p><span className="font-medium">Contact:</span> {sponsor.contact_person}</p>
                <p><span className="font-medium">Email:</span> {sponsor.contact_email}</p>
                <p><span className="font-medium">Phone:</span> {sponsor.contact_phone}</p>
                
                <div className="mt-3 pt-3 border-t">
                  <p className="font-medium mb-1">Active Contracts:</p>
                  {getContractsBySponsorId(sponsor.sponsor_id).length > 0 ? (
                    <ul className="list-disc list-inside text-gray-600">
                      {getContractsBySponsorId(sponsor.sponsor_id).map(contract => (
                        <li key={contract.contract_id}>
                          {getTypeName(contract.type_id)} - ${contract.contract_value.toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">No active contracts</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'contracts' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Sponsorship Contracts</h2>
            <button 
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={toggleAddContract}
            >
              {isAddingContract ? 'Cancel' : 'Add New Contract'}
            </button>
          </div>

          {isAddingContract && (
            <form onSubmit={handleContractSubmit} className="bg-gray-100 p-4 rounded mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sponsor</label>
                  <select
                    name="sponsor_id"
                    value={contractForm.sponsor_id}
                    onChange={handleContractFormChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select a sponsor</option>
                    {sponsors.map(sponsor => (
                      <option key={sponsor.sponsor_id} value={sponsor.sponsor_id}>
                        {sponsor.sponsor_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sponsorship Type</label>
                  <select
                    name="type_id"
                    value={contractForm.type_id}
                    onChange={handleContractFormChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select a type</option>
                    {sponsorshipTypes.map(type => (
                      <option key={type.type_id} value={type.type_id}>
                        {type.type_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Season Year</label>
                  <input
                    type="number"
                    name="season_year"
                    value={contractForm.season_year}
                    onChange={handleContractFormChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    name="start_date"
                    value={contractForm.start_date}
                    onChange={handleContractFormChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    name="end_date"
                    value={contractForm.end_date}
                    onChange={handleContractFormChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contract Value</label>
                  <input
                    type="number"
                    name="contract_value"
                    value={contractForm.contract_value}
                    onChange={handleContractFormChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={contractForm.status}
                    onChange={handleContractFormChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="Draft">Draft</option>
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Terminated">Terminated</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                <textarea
                  name="payment_terms"
                  value={contractForm.payment_terms}
                  onChange={handleContractFormChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                ></textarea>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save Contract
                </button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Sponsor</th>
                  <th className="py-2 px-4 border-b">Type</th>
                  <th className="py-2 px-4 border-b">Season</th>
                  <th className="py-2 px-4 border-b">Period</th>
                  <th className="py-2 px-4 border-b">Value</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract) => (
                  <tr 
                    key={contract.contract_id} 
                    className={selectedContract && selectedContract.contract_id === contract.contract_id ? 'bg-green-50' : ''}
                    onClick={() => selectContract(contract)}
                  >
                    <td className="py-2 px-4 border-b">{getSponsorName(contract.sponsor_id)}</td>
                    <td className="py-2 px-4 border-b">{getTypeName(contract.type_id)}</td>
                    <td className="py-2 px-4 border-b">{contract.season_year}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(contract.start_date).toLocaleDateString()} - {new Date(contract.end_date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">${parseFloat(contract.contract_value).toLocaleString()}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded text-xs ${
                        contract.status === 'Active' ? 'bg-green-100 text-green-800' :
                        contract.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                        contract.status === 'Expired' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {contract.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button 
                        className="text-blue-600 hover:text-blue-800 mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Edit contract logic
                        }}
                      >
                        Edit
                      </button>
                      <button 
                        className="text-green-600 hover:text-green-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPaymentForm({
                            ...paymentForm,
                            contract_id: contract.contract_id
                          });
                          setIsAddingPayment(true);
                          setActiveTab('payments');
                        }}
                      >
                        Add Payment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'payments' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Sponsorship Payments</h2>
            <button 
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={toggleAddPayment}
            >
              {isAddingPayment ? 'Cancel' : 'Add New Payment'}
            </button>
          </div>

          {isAddingPayment && (
            <form onSubmit={handlePaymentSubmit} className="bg-gray-100 p-4 rounded mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contract</label>
                  <select
                    name="contract_id"
                    value={paymentForm.contract_id}
                    onChange={handlePaymentFormChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select a contract</option>
                    {contracts.map(contract => (
                      <option key={contract.contract_id} value={contract.contract_id}>
                        {getSponsorName(contract.sponsor_id)} - {getTypeName(contract.type_id)} (${parseFloat(contract.contract_value).toLocaleString()})
                      </option>
                    ))}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <select
                    name="payment_method"
                    value={paymentForm.payment_method}
                    onChange={handlePaymentFormChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Wire Transfer">Wire Transfer</option>
                    <option value="Check">Check</option>
                    <option value="Cash">Cash</option>
                  </select>
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
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={paymentForm.notes}
                  onChange={handlePaymentFormChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                ></textarea>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Record Payment
                </button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Contract</th>
                  <th className="py-2 px-4 border-b">Amount</th>
                  <th className="py-2 px-4 border-b">Payment Date</th>
                  <th className="py-2 px-4 border-b">Method</th>
                  <th className="py-2 px-4 border-b">Reference</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => {
                  const contract = getContractById(payment.contract_id);
                  return (
                    <tr key={payment.payment_id}>
                      <td className="py-2 px-4 border-b">
                        {contract ? `${getSponsorName(contract.sponsor_id)} - ${getTypeName(contract.type_id)}` : 'Unknown Contract'}
                      </td>
                      <td className="py-2 px-4 border-b">${parseFloat(payment.amount).toLocaleString()}</td>
                      <td className="py-2 px-4 border-b">{new Date(payment.payment_date).toLocaleDateString()}</td>
                      <td className="py-2 px-4 border-b">{payment.payment_method}</td>
                      <td className="py-2 px-4 border-b">{payment.transaction_reference}</td>
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

export default SponsorManagement;