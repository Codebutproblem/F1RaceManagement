import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Edit, Trash2, Search, X, Save, FileText, DollarSign, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8080";

const SponsorsPage = () => {
  const navigate = useNavigate();
  // State for sponsors and contracts
  const [sponsors, setSponsors] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [sponsorshipTypes, setSponsorshipTypes] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for modals
  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const [showContractModal, setShowContractModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // State for form data
  const [sponsorForm, setSponsorForm] = useState({
    sponsorName: '',
    industry: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: ''
  });

  const [contractForm, setContractForm] = useState({
    sponsorId: '',
    typeId: '',
    seasonYear: new Date().getFullYear(),
    startDate: '',
    endDate: '',
    contractValue: '',
    paymentTerms: '',
    status: 'Active'
  });

  const [paymentForm, setPaymentForm] = useState({
    contractId: '',
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'Bank Transfer',
    transactionReference: '',
    notes: ''
  });

  // State for editing
  const [editingSponsorId, setEditingSponsorId] = useState(null);
  const [editingContractId, setEditingContractId] = useState(null);

  // State for search and filters
  const [sponsorSearch, setSponsorSearch] = useState('');
  const [contractSearch, setContractSearch] = useState('');

  // Tabs for sponsors/contracts
  const [activeTab, setActiveTab] = useState('sponsors');

  // Selected contract for payment
  const [selectedContract, setSelectedContract] = useState(null);

  // Fetch sponsors, contracts, and sponsorship types
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2, res3, res4] = await Promise.all([
          fetch(API_URL + '/api/sponsors'),
          fetch(API_URL + '/api/sponsorship-types'),
          fetch(API_URL + '/api/contracts'),
          fetch(API_URL + '/api/payments')
        ]);

        const mockSponsors = await res1.json();
        const mockSponsorshipTypes = await res2.json();
        const mockContracts = await res3.json();
        const mockPayments = await res4.json();

        setSponsors(mockSponsors);
        setSponsorshipTypes(mockSponsorshipTypes);
        setContracts(mockContracts);
        setPayments(mockPayments);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi fetch API:', error);
      }
    };

    fetchData();
  }, []);

  // Filter sponsors and contracts based on search
  const filteredSponsors = sponsors.filter(sponsor =>
    sponsor.sponsor_name.toLowerCase().includes(sponsorSearch.toLowerCase()) ||
    sponsor.industry.toLowerCase().includes(sponsorSearch.toLowerCase()) ||
    sponsor.contact_person.toLowerCase().includes(sponsorSearch.toLowerCase())
  );

  const filteredContracts = contracts.filter(contract => {
    const sponsor = sponsors.find(s => s.sponsor_id === contract.sponsor_id);
    const sponsorName = sponsor ? sponsor.sponsor_name : '';

    return sponsorName.toLowerCase().includes(contractSearch.toLowerCase()) ||
      contract.status.toLowerCase().includes(contractSearch.toLowerCase()) ||
      contract.season_year.toString().includes(contractSearch);
  });

  // Handle sponsor form submit
  const handleSponsorSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      const sponsorData = {
        sponsor_name: sponsorForm.sponsorName,
        industry: sponsorForm.industry,
        contact_person: sponsorForm.contactPerson,
        contact_email: sponsorForm.contactEmail,
        contact_phone: sponsorForm.contactPhone
      };

      if (editingSponsorId) {
        // Update existing sponsor via API
        response = await fetch(`${API_URL}/api/sponsors/${editingSponsorId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sponsorData)
        });
      } else {
        // Add new sponsor via API
        response = await fetch(`${API_URL}/api/sponsors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sponsorData)
        });
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedSponsor = await response.json();

      if (editingSponsorId) {
        setSponsors(sponsors.map(sponsor =>
          sponsor.sponsor_id === editingSponsorId ? updatedSponsor : sponsor
        ));
      } else {
        setSponsors([...sponsors, updatedSponsor]);
      }

      // Reset form and close modal
      setSponsorForm({
        sponsorName: '',
        industry: '',
        contactPerson: '',
        contactEmail: '',
        contactPhone: ''
      });
      setEditingSponsorId(null);
      setShowSponsorModal(false);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the sponsor.');
    }
  };

  // Edit sponsor
  const editSponsor = async (sponsor) => {
    try {
      // Get the latest sponsor data from API
      const response = await fetch(`${API_URL}/api/sponsors/${sponsor.sponsor_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch sponsor details');
      }

      const sponsorData = await response.json();

      setSponsorForm({
        sponsorName: sponsorData.sponsor_name,
        industry: sponsorData.industry,
        contactPerson: sponsorData.contact_person,
        contactEmail: sponsorData.contact_email,
        contactPhone: sponsorData.contact_phone
      });
      setEditingSponsorId(sponsor.sponsor_id);
      setShowSponsorModal(true);
    } catch (error) {
      console.error('Error fetching sponsor details:', error);
      alert('Failed to load sponsor details');
    }
  };

  // Delete sponsor
  const deleteSponsor = (sponsorId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhà tài trợ này?')) {
      fetch(`${API_URL}/api/sponsors/${sponsorId}`, {
        method: 'DELETE',
      })
        .then(res => {
          if (!res.ok) throw new Error('Xóa thất bại');
          return res.text();
        })
        .then(data => {
          setSponsors(sponsors.filter(sponsor => sponsor.sponsor_id !== sponsorId));
          // Also handle associated contracts
          setContracts(contracts.filter(contract => contract.sponsor_id !== sponsorId));
          console.log('Đã xóa thành công');
        })
        .catch(err => {
          console.error('Lỗi khi xóa:', err);
          alert('Không thể xóa nhà tài trợ. Vui lòng thử lại sau.');
        });
    }
  };

  // Handle contract form submit
  const handleContractSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      const contractData = {
        sponsor_id: parseInt(contractForm.sponsorId),
        type_id: parseInt(contractForm.typeId),
        season_year: parseInt(contractForm.seasonYear),
        start_date: contractForm.startDate,
        end_date: contractForm.endDate,
        contract_value: parseFloat(contractForm.contractValue),
        payment_terms: contractForm.paymentTerms,
        status: contractForm.status
      };

      if (editingContractId) {
        // Update existing contract via API
        response = await fetch(`${API_URL}/api/contracts/${editingContractId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contractData)
        });
      } else {
        // Add new contract via API
        response = await fetch(`${API_URL}/api/contracts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contractData)
        });
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedContract = await response.json();

      if (editingContractId) {
        setContracts(contracts.map(contract =>
          contract.contract_id === editingContractId ? updatedContract : contract
        ));
      } else {
        setContracts([...contracts, updatedContract]);
      }

      // Reset form and close modal
      setContractForm({
        sponsorId: '',
        typeId: '',
        seasonYear: new Date().getFullYear(),
        startDate: '',
        endDate: '',
        contractValue: '',
        paymentTerms: '',
        status: 'Active'
      });
      setEditingContractId(null);
      setShowContractModal(false);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the contract.');
    }
  };

  // payment contract
  const recordPayment = async (contract) =>{
    setSelectedContract(contract);
    setPaymentForm({
      contractId: contract.contract_id,
      amount: '',
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: 'Bank Transfer',
      transactionReference: '',
      notes: ''
    });
    setShowPaymentModal(true);
  }

  // Edit contract
  const editContract = async (contract) => {
    try {
      // Get the latest contract data from API
      const response = await fetch(`${API_URL}/api/contracts/${contract.contract_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch contract details');
      }

      const contractData = await response.json();

      setContractForm({
        sponsorId: contractData.sponsor_id.toString(),
        typeId: contractData.type_id.toString(),
        seasonYear: contractData.season_year,
        startDate: contractData.start_date,
        endDate: contractData.end_date,
        contractValue: contractData.contract_value.toString(),
        paymentTerms: contractData.payment_terms,
        status: contractData.status
      });
      setEditingContractId(contract.contract_id);
      setShowContractModal(true);
    } catch (error) {
      console.error('Error fetching contract details:', error);
      alert('Failed to load contract details');
    }
  };

  // Delete contract
  const deleteContract = (contractId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hợp đồng này?')) {
      fetch(`${API_URL}/api/contracts/${contractId}`, {
        method: 'DELETE',
      })
        .then(res => {
          if (!res.ok) throw new Error('Xóa thất bại');
          return res.text();
        })
        .then(data => {
          setContracts(contracts.filter(contract => contract.contract_id !== contractId));
          // Also handle associated payments
          setPayments(payments.filter(payment => payment.contract_id !== contractId));
          console.log('Đã xóa hợp đồng thành công');
        })
        .catch(err => {
          console.error('Lỗi khi xóa hợp đồng:', err);
          alert('Không thể xóa hợp đồng. Vui lòng thử lại sau.');
        });
    }
  };

  // Handle payment form submit
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    try {
      const paymentData = {
        contract_id: parseInt(paymentForm.contractId),
        amount: parseFloat(paymentForm.amount),
        payment_date: paymentForm.paymentDate,
        payment_method: paymentForm.paymentMethod,
        transaction_reference: paymentForm.transactionReference,
        notes: paymentForm.notes
      };

      // Add new payment via API
      const response = await fetch(`${API_URL}/api/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newPayment = await response.json();
      setPayments([...payments, newPayment]);

      // Reset form and close modal
      setPaymentForm({
        contractId: '',
        amount: '',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: 'Bank Transfer',
        transactionReference: '',
        notes: ''
      });
      setShowPaymentModal(false);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while recording the payment.');
    }
  };

  // Get sponsor name by ID
  const getSponsorName = (sponsorId) => {
    const sponsor = sponsors.find(s => s.sponsor_id === sponsorId);
    return sponsor ? sponsor.sponsor_name : 'Unknown Sponsor';
  };

  // Get sponsorship type name by ID
  const getSponsorshipTypeName = (typeId) => {
    const type = sponsorshipTypes.find(t => t.type_id === typeId);
    return type ? type.type_name : 'Unknown Type';
  };

  // Get total payments for a contract
  const getTotalPaymentsForContract = (contractId) => {
    return payments
      .filter(payment => payment.contract_id === contractId)
      .reduce((sum, payment) => sum + payment.amount, 0);
  };

  // Calculate remaining amount
  const getRemainingAmount = (contract) => {
    const totalPaid = getTotalPaymentsForContract(contract.contract_id);
    return contract.contract_value - totalPaid;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
          <button
            onClick={() => {
              navigate(-1)
              console.log('Navigate back to home');
            }}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Quản lý Nhà Tài Trợ & Hợp Đồng
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'sponsors'
                  ? 'border-b-2 border-green-500 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('sponsors')}
            >
              Nhà Tài Trợ
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'contracts'
                  ? 'border-b-2 border-green-500 text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('contracts')}
            >
              Hợp Đồng Tài Trợ
            </button>
          </div>
        </div>

        {/* Sponsors Tab Content */}
        {activeTab === 'sponsors' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm nhà tài trợ..."
                  value={sponsorSearch}
                  onChange={(e) => setSponsorSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                {sponsorSearch && (
                  <button
                    onClick={() => setSponsorSearch('')}
                    className="absolute right-3 top-2.5"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  setSponsorForm({
                    sponsorName: '',
                    industry: '',
                    contactPerson: '',
                    contactEmail: '',
                    contactPhone: ''
                  });
                  setEditingSponsorId(null);
                  setShowSponsorModal(true);
                }}
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Thêm Nhà Tài Trợ
              </button>
            </div>

            {loading ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Đang tải dữ liệu...</p>
              </div>
            ) : (
              <>
                {filteredSponsors.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">Không tìm thấy nhà tài trợ nào</p>
                  </div>
                ) : (
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {filteredSponsors.map((sponsor) => (
                        <li key={sponsor.sponsor_id}>
                          <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <div className="bg-green-100 text-green-800 p-2 rounded-full mr-3">
                                  <DollarSign className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-medium text-green-600">{sponsor.sponsor_name}</h3>
                                <span className="ml-2 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                  {sponsor.industry}
                                </span>
                              </div>
                              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-500">
                                <div className="col-span-1">
                                  <span className="font-medium text-gray-900">Contact:</span> {sponsor.contact_person}
                                </div>
                                <div className="col-span-1">
                                  <span className="font-medium text-gray-900">Email:</span> {sponsor.contact_email}
                                </div>
                                <div className="col-span-1">
                                  <span className="font-medium text-gray-900">Phone:</span> {sponsor.contact_phone}
                                </div>
                                <div className="col-span-1">
                                  <span className="font-medium text-gray-900">Contracts:</span> {
                                    contracts.filter(c => c.sponsor_id === sponsor.sponsor_id).length
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => editSponsor(sponsor)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                              >
                                <Edit className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => deleteSponsor(sponsor.sponsor_id)}
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

        {/* Contracts Tab Content */}
        {activeTab === 'contracts' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm hợp đồng..."
                  value={contractSearch}
                  onChange={(e) => setContractSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                {contractSearch && (
                  <button
                    onClick={() => setContractSearch('')}
                    className="absolute right-3 top-2.5"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  setContractForm({
                    sponsorId: '',
                    typeId: '',
                    seasonYear: new Date().getFullYear(),
                    startDate: '',
                    endDate: '',
                    contractValue: '',
                    paymentTerms: '',
                    status: 'Active'
                  });
                  setEditingContractId(null);
                  setShowContractModal(true);
                }}
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Thêm Hợp Đồng
              </button>
            </div>

            {loading ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Đang tải dữ liệu...</p>
              </div>
            ) : (
              <>
                {filteredContracts.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">Không tìm thấy hợp đồng nào</p>
                  </div>
                ) : (
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {filteredContracts.map((contract) => {
                        const totalPaid = getTotalPaymentsForContract(contract.contract_id);
                        const remaining = contract.contract_value - totalPaid;
                        const progressPercent = Math.round((totalPaid / contract.contract_value) * 100);

                        return (
                          <li key={contract.contract_id}>
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="bg-green-100 text-green-800 p-2 rounded-full mr-3">
                                    <FileText className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                      {getSponsorName(contract.sponsor_id)}
                                    </h3>
                                    <div className="flex items-center">
                                      <span className="mr-2 text-sm text-gray-500">
                                        {getSponsorshipTypeName(contract.type_id)}
                                      </span>
                                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        contract.status === 'Active'
                                          ? 'bg-green-100 text-green-800'
                                          : 'bg-gray-100 text-gray-800'
                                      }`}>
                                        {contract.status}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => recordPayment(contract)}
                                    className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 flex items-center"
                                  >
                                    <DollarSign className="h-4 w-4 mr-1" />
                                    Thanh Toán
                                  </button>
                                  <button
                                    onClick={() => editContract(contract)}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                                  >
                                    <Edit className="h-5 w-5" />
                                  </button>
                                  <button
                                    onClick={() => deleteContract(contract.contract_id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>

                              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-500">
                                <div className="col-span-1">
                                  <span className="font-medium text-gray-900">Mùa giải:</span> {contract.season_year}
                                </div>
                                <div className="col-span-1">
                                  <span className="font-medium text-gray-900">Giá trị:</span> {formatCurrency(contract.contract_value)}
                                </div>
                                <div className="col-span-1">
                                  <span className="font-medium text-gray-900">Thời hạn:</span> {contract.start_date} - {contract.end_date}
                                </div>
                                <div className="col-span-1">
                                  <span className="font-medium text-gray-900">Điều khoản:</span> {contract.payment_terms}
                                </div>
                              </div>

                              <div className="mt-3">
                                <div className="flex items-center justify-between text-sm">
                                  <div>
                                    <span className="font-medium text-gray-900">Tiến độ thanh toán:</span>
                                  </div>
                                  <div className="text-gray-500">
                                    {formatCurrency(totalPaid)} / {formatCurrency(contract.contract_value)}
                                  </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                                  <div
                                    className="bg-green-600 h-2.5 rounded-full"
                                    style={{ width: `${progressPercent}%` }}
                                  ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                  <div>Đã thanh toán: {progressPercent}%</div>
                                  <div>Còn lại: {formatCurrency(remaining)}</div>
                                </div>
                              </div>

                              {/* Recent payments */}
                              {payments.filter(p => p.contract_id === contract.contract_id).length > 0 && (
                                <div className="mt-3">
                                  <h4 className="text-sm font-medium text-gray-900 mb-1">Lịch sử thanh toán gần đây:</h4>
                                  <div className="space-y-1">
                                    {payments
                                      .filter(p => p.contract_id === contract.contract_id)
                                      .sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date))
                                      .slice(0, 2)
                                      .map(payment => (
                                        <div key={payment.payment_id} className="flex justify-between text-sm">
                                          <div className="flex items-center">
                                            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                                            <span>{payment.payment_date}</span>
                                          </div>
                                          <div className="text-green-600 font-medium">
                                            {formatCurrency(payment.amount)}
                                          </div>
                                        </div>
                                      ))
                                    }
                                  </div>
                                </div>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Sponsor Modal */}
        {showSponsorModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {editingSponsorId ? 'Chỉnh sửa Nhà Tài Trợ' : 'Thêm Nhà Tài Trợ'}
                </h3>
                <button
                  onClick={() => setShowSponsorModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleSponsorSubmit}>
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Tên Nhà Tài Trợ
                      </label>
                      <input
                        type="text"
                        required
                        value={sponsorForm.sponsorName}
                        onChange={(e) => setSponsorForm({ ...sponsorForm, sponsorName: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Ngành nghề
                      </label>
                      <input
                        type="text"
                        required
                        value={sponsorForm.industry}
                        onChange={(e) => setSponsorForm({ ...sponsorForm, industry: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Người liên hệ
                      </label>
                      <input
                        type="text"
                        required
                        value={sponsorForm.contactPerson}
                        onChange={(e) => setSponsorForm({ ...sponsorForm, contactPerson: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={sponsorForm.contactEmail}
                        onChange={(e) => setSponsorForm({ ...sponsorForm, contactEmail: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Số điện thoại
                      </label>
                      <input
                        type="text"
                        required
                        value={sponsorForm.contactPhone}
                        onChange={(e) => setSponsorForm({ ...sponsorForm, contactPhone: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="button"
                    onClick={() => setShowSponsorModal(false)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingSponsorId ? 'Cập nhật' : 'Lưu'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Contract Modal */}
        {showContractModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {editingContractId ? 'Chỉnh sửa Hợp Đồng' : 'Thêm Hợp Đồng'}
                </h3>
                <button
                  onClick={() => setShowContractModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleContractSubmit}>
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Nhà Tài Trợ
                      </label>
                      <select
                        required
                        value={contractForm.sponsorId}
                        onChange={(e) => setContractForm({ ...contractForm, sponsorId: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Chọn nhà tài trợ</option>
                        {sponsors.map(sponsor => (
                          <option key={sponsor.sponsor_id} value={sponsor.sponsor_id}>
                            {sponsor.sponsor_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Loại Tài Trợ
                      </label>
                      <select
                        required
                        value={contractForm.typeId}
                        onChange={(e) => setContractForm({ ...contractForm, typeId: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Chọn loại tài trợ</option>
                        {sponsorshipTypes.map(type => (
                          <option key={type.type_id} value={type.type_id}>
                            {type.type_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Mùa giải
                      </label>
                      <input
                        type="number"
                        required
                        value={contractForm.seasonYear}
                        onChange={(e) => setContractForm({ ...contractForm, seasonYear: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Trạng thái
                      </label>
                      <select
                        required
                        value={contractForm.status}
                        onChange={(e) => setContractForm({ ...contractForm, status: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Terminated">Terminated</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Ngày bắt đầu
                      </label>
                      <input
                        type="date"
                        required
                        value={contractForm.startDate}
                        onChange={(e) => setContractForm({ ...contractForm, startDate: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Ngày kết thúc
                      </label>
                      <input
                        type="date"
                        required
                        value={contractForm.endDate}
                        onChange={(e) => setContractForm({ ...contractForm, endDate: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Giá trị hợp đồng (VND)
                      </label>
                      <input
                        type="number"
                        required
                        value={contractForm.contractValue}
                        onChange={(e) => setContractForm({ ...contractForm, contractValue: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Điều khoản thanh toán
                      </label>
                      <textarea
                        value={contractForm.paymentTerms}
                        onChange={(e) => setContractForm({ ...contractForm, paymentTerms: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="button"
                    onClick={() => setShowContractModal(false)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingContractId ? 'Cập nhật' : 'Lưu'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Ghi nhận thanh toán
                </h3>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handlePaymentSubmit}>
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700">Nhà tài trợ:</div>
                    <div className="mt-1 text-gray-900">{selectedContract ? getSponsorName(selectedContract.sponsor_id) : ''}</div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700">Hợp đồng:</div>
                    <div className="mt-1 text-gray-900">{selectedContract ? getSponsorshipTypeName(selectedContract.type_id) + ' - ' + selectedContract.season_year : ''}</div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700">Tổng giá trị:</div>
                    <div className="mt-1 text-green-600 font-medium">{selectedContract ? formatCurrency(selectedContract.contract_value) : ''}</div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700">Đã thanh toán:</div>
                    <div className="mt-1 text-gray-900">{selectedContract ? formatCurrency(getTotalPaymentsForContract(selectedContract.contract_id)) : ''}</div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700">Còn lại:</div>
                    <div className="mt-1 text-gray-900">{selectedContract ? formatCurrency(getRemainingAmount(selectedContract)) : ''}</div>
                  </div>

                  <div className="grid grid-cols-6 gap-6 mt-6">
                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Số tiền thanh toán (VND)
                      </label>
                      <input
                        type="number"
                        required
                        value={paymentForm.amount}
                        onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Ngày thanh toán
                      </label>
                      <input
                        type="date"
                        required
                        value={paymentForm.paymentDate}
                        onChange={(e) => setPaymentForm({ ...paymentForm, paymentDate: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Phương thức thanh toán
                      </label>
                      <select
                        required
                        value={paymentForm.paymentMethod}
                        onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Wire Transfer">Wire Transfer</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Cash">Cash</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Mã giao dịch
                      </label>
                      <input
                        type="text"
                        value={paymentForm.transactionReference}
                        onChange={(e) => setPaymentForm({ ...paymentForm, transactionReference: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Ghi chú
                      </label>
                      <textarea
                        value={paymentForm.notes}
                        onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                        rows={2}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Xác nhận thanh toán
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

export default SponsorsPage;