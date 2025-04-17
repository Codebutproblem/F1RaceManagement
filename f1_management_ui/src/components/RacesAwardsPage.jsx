import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Edit, Trash2, Search, X, Save, Award, Calendar, Flag, Trophy, DollarSign, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8080";

const RacesAwardsPage = () => {

    const navigate = useNavigate();


    // State for races, results, and payments
    const [races, setRaces] = useState([]);
    const [results, setResults] = useState([]);
    const [teams, setTeams] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [prizePayments, setPrizePayments] = useState([]);
    const [loading, setLoading] = useState(true);

    // State for modals
    const [showRaceModal, setShowRaceModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    // State for form data
    const [raceForm, setRaceForm] = useState({
        raceName: '',
        circuitName: '',
        location: '',
        country: '',
        raceDate: '',
        raceYear: new Date().getFullYear(),
        status: 'Upcoming'
    });

    const [resultForm, setResultForm] = useState({
        raceId: '',
        driverId: '',
        teamId: '',
        finishPosition: '',
        points: '',
        fastestLap: false
    });

    const [paymentForm, setPaymentForm] = useState({
        raceId: '',
        recipientType: 'driver',  // 'driver' or 'team'
        recipientId: '',
        amount: '',
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: 'Bank Transfer',
        notes: ''
    });

    // State for editing
    const [editingRaceId, setEditingRaceId] = useState(null);
    const [editingResultId, setEditingResultId] = useState(null);

    // State for search and filters
    const [raceSearch, setRaceSearch] = useState('');

    // Tabs for races/results/payments
    const [activeTab, setActiveTab] = useState('races');

    // Selected race for viewing results
    const [selectedRace, setSelectedRace] = useState(null);

    // Prize structure
    const PRIZE_STRUCTURE = {
        1: 25000000, // 1st place
        2: 18000000, // 2nd place
        3: 15000000, // 3rd place
        4: 12000000, // 4th place
        5: 10000000, // 5th place
        6: 8000000,  // 6th place
        7: 6000000,  // 7th place
        8: 4000000,  // 8th place
        9: 2000000,  // 9th place
        10: 1000000, // 10th place
        fastestLap: 3000000 // Bonus for fastest lap
    };

    // Team prize percentage (% of driver prize that goes to team)
    const TEAM_PRIZE_PERCENTAGE = 50;

    // Fetch races, results, teams, drivers
    useEffect(() => {
        // This would be replaced with actual API calls
        // Example: fetch('/api/races').then(res => res.json()).then(data => setRaces(data));

        // Mock data for demonstration
        var mockRaces = [
            { race_id: 1, race_name: 'Bahrain Grand Prix', circuit_name: 'Bahrain International Circuit', location: 'Sakhir', country: 'Bahrain', race_date: '2025-03-02', race_year: 2025, status: 'Completed' },
            { race_id: 2, race_name: 'Saudi Arabian Grand Prix', circuit_name: 'Jeddah Corniche Circuit', location: 'Jeddah', country: 'Saudi Arabia', race_date: '2025-03-09', race_year: 2025, status: 'Completed' },
            { race_id: 3, race_name: 'Australian Grand Prix', circuit_name: 'Albert Park Circuit', location: 'Melbourne', country: 'Australia', race_date: '2025-03-23', race_year: 2025, status: 'Upcoming' },
            { race_id: 4, race_name: 'Japanese Grand Prix', circuit_name: 'Suzuka International Racing Course', location: 'Suzuka', country: 'Japan', race_date: '2025-04-06', race_year: 2025, status: 'Upcoming' }
        ];

        var mockResults = [
            { result_id: 1, race_id: 1, driver_id: 1, team_id: 1, finish_position: 1, points: 25, fastest_lap: 0 },
            { result_id: 2, race_id: 1, driver_id: 3, team_id: 2, finish_position: 2, points: 18, fastest_lap: 0 },
            { result_id: 3, race_id: 1, driver_id: 5, team_id: 3, finish_position: 3, points: 15, fastest_lap: 1 },
            { result_id: 4, race_id: 1, driver_id: 7, team_id: 4, finish_position: 4, points: 12, fastest_lap: 0 },
            { result_id: 5, race_id: 1, driver_id: 2, team_id: 1, finish_position: 5, points: 10, fastest_lap: 0 },
            { result_id: 6, race_id: 1, driver_id: 4, team_id: 2, finish_position: 6, points: 8, fastest_lap: 0 },
            { result_id: 7, race_id: 2, driver_id: 1, team_id: 1, finish_position: 1, points: 25, fastest_lap: 1 },
            { result_id: 8, race_id: 2, driver_id: 2, team_id: 1, finish_position: 2, points: 18, fastest_lap: 0 },
            { result_id: 9, race_id: 2, driver_id: 7, team_id: 4, finish_position: 3, points: 15, fastest_lap: 0 },
            { result_id: 10, race_id: 2, driver_id: 3, team_id: 2, finish_position: 4, points: 12, fastest_lap: 0 },
            { result_id: 11, race_id: 2, driver_id: 4, team_id: 2, finish_position: 5, points: 10, fastest_lap: 0 },
            { result_id: 12, race_id: 2, driver_id: 5, team_id: 3, finish_position: 6, points: 8, fastest_lap: 0 }
        ];

        var mockTeams = [
            { team_id: 1, team_name: 'Red Bull Racing', team_principal: 'Christian Horner', nationality: 'Austrian', headquarters: 'Milton Keynes, UK', founding_year: 2005 },
            { team_id: 2, team_name: 'Mercedes-AMG Petronas', team_principal: 'Toto Wolff', nationality: 'German', headquarters: 'Brackley, UK', founding_year: 1970 },
            { team_id: 3, team_name: 'Scuderia Ferrari', team_principal: 'Frédéric Vasseur', nationality: 'Italian', headquarters: 'Maranello, Italy', founding_year: 1950 },
            { team_id: 4, team_name: 'McLaren Racing', team_principal: 'Andrea Stella', nationality: 'British', headquarters: 'Woking, UK', founding_year: 1966 }
        ];

        var mockDrivers = [
            { driver_id: 1, team_id: 1, first_name: 'Max', last_name: 'Verstappen', nationality: 'Dutch', date_of_birth: '1997-09-30', driver_number: 1, active_status: true },
            { driver_id: 2, team_id: 1, first_name: 'Sergio', last_name: 'Perez', nationality: 'Mexican', date_of_birth: '1990-01-26', driver_number: 11, active_status: true },
            { driver_id: 3, team_id: 2, first_name: 'Lewis', last_name: 'Hamilton', nationality: 'British', date_of_birth: '1985-01-07', driver_number: 44, active_status: true },
            { driver_id: 4, team_id: 2, first_name: 'George', last_name: 'Russell', nationality: 'British', date_of_birth: '1998-02-15', driver_number: 63, active_status: true },
            { driver_id: 5, team_id: 3, first_name: 'Charles', last_name: 'Leclerc', nationality: 'Monegasque', date_of_birth: '1997-10-16', driver_number: 16, active_status: true },
            { driver_id: 6, team_id: 3, first_name: 'Carlos', last_name: 'Sainz', nationality: 'Spanish', date_of_birth: '1994-09-01', driver_number: 55, active_status: true },
            { driver_id: 7, team_id: 4, first_name: 'Lando', last_name: 'Norris', nationality: 'British', date_of_birth: '1999-11-13', driver_number: 4, active_status: true },
            { driver_id: 8, team_id: 4, first_name: 'Oscar', last_name: 'Piastri', nationality: 'Australian', date_of_birth: '2001-04-06', driver_number: 81, active_status: true }
        ];

        // Sample prize payments
        var mockPrizePayments = [
            { payment_id: 1, race_id: 1, recipient_type: 'driver', recipient_id: 1, amount: 25000000, payment_date: '2025-03-03', payment_method: 'Bank Transfer', notes: 'Winner prize for Bahrain GP' },
            { payment_id: 2, race_id: 1, recipient_type: 'team', recipient_id: 1, amount: 12500000, payment_date: '2025-03-03', payment_method: 'Bank Transfer', notes: 'Team prize for Bahrain GP winner' },
            { payment_id: 3, race_id: 1, recipient_type: 'driver', recipient_id: 3, amount: 18000000, payment_date: '2025-03-03', payment_method: 'Bank Transfer', notes: '2nd place prize for Bahrain GP' },
            { payment_id: 4, race_id: 1, recipient_type: 'team', recipient_id: 2, amount: 9000000, payment_date: '2025-03-03', payment_method: 'Bank Transfer', notes: 'Team prize for Bahrain GP 2nd place' },
            { payment_id: 5, race_id: 2, recipient_type: 'driver', recipient_id: 1, amount: 28000000, payment_date: '2025-03-10', payment_method: 'Bank Transfer', notes: 'Winner + fastest lap prize for Saudi Arabian GP' },
            { payment_id: 6, race_id: 2, recipient_type: 'team', recipient_id: 1, amount: 14000000, payment_date: '2025-03-10', payment_method: 'Bank Transfer', notes: 'Team prize for Saudi Arabian GP winner + fastest lap' }
        ];

        var fetchData = async () => {
            try {
                const [res1, res2, res3, res4, res5] = await Promise.all([
                    fetch(API_URL + '/api/races'),
                    fetch(API_URL + '/api/results'),
                    fetch(API_URL + '/api/teams'),
                    fetch(API_URL + '/api/drivers'),
                    fetch(API_URL + '/api/prize-payments')
                ]);

                mockRaces = await res1.json();
                mockResults = await res2.json();
                mockTeams = await res3.json();
                mockDrivers = await res4.json();
                mockPrizePayments = await res5.json();

            } catch (error) {
                console.error('Lỗi khi fetch API:', error);
            }
            setRaces(mockRaces);
            setResults(mockResults);
            setTeams(mockTeams);
            setDrivers(mockDrivers);
            setPrizePayments(mockPrizePayments);
            setLoading(false);
        };

        fetchData();
    }, []);

    // Filter races based on search
    const filteredRaces = races.filter(race =>
        race.race_name.toLowerCase().includes(raceSearch.toLowerCase()) ||
        race.circuit_name.toLowerCase().includes(raceSearch.toLowerCase()) ||
        race.country.toLowerCase().includes(raceSearch.toLowerCase()) ||
        race.status.toLowerCase().includes(raceSearch.toLowerCase())
    );

    // Handle race form submit
    const handleRaceSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingRaceId) {
                // Update existing race via API
                const response = await fetch(`${API_URL}/api/races/${editingRaceId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        race_name: raceForm.raceName,
                        circuit_name: raceForm.circuitName,
                        location: raceForm.location,
                        country: raceForm.country,
                        race_date: raceForm.raceDate,
                        race_year: parseInt(raceForm.raceYear),
                        status: raceForm.status,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to update race');
                }

                const updatedRace = await response.json();
                const updatedRaces = races.map(race =>
                    race.race_id === editingRaceId ? updatedRace : race
                );
                setRaces(updatedRaces);
            } else {
                // Add new race via API
                const response = await fetch(`${API_URL}/api/races`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        race_name: raceForm.raceName,
                        circuit_name: raceForm.circuitName,
                        location: raceForm.location,
                        country: raceForm.country,
                        race_date: raceForm.raceDate,
                        race_year: parseInt(raceForm.raceYear),
                        status: raceForm.status,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to add new race');
                }

                const newRace = await response.json();
                setRaces([...races, newRace]);
            }

            // Reset form and close modal
            setRaceForm({
                raceName: '',
                circuitName: '',
                location: '',
                country: '',
                raceDate: '',
                raceYear: new Date().getFullYear(),
                status: 'Upcoming',
            });
            setEditingRaceId(null);
            setShowRaceModal(false);
        } catch (error) {
            console.error('Error submitting race:', error);
            alert('Đã xảy ra lỗi khi gửi dữ liệu. Vui lòng thử lại.');
        }
    };

    // Handle result form submit
    const handleResultSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (editingResultId) {
                // Update existing result via API
                const response = await fetch(`${API_URL}/api/results/${editingResultId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        race_id: parseInt(resultForm.raceId),
                        driver_id: parseInt(resultForm.driverId),
                        team_id: parseInt(resultForm.teamId),
                        finish_position: parseInt(resultForm.finishPosition),
                        points: parseInt(resultForm.points),
                        fastest_lap: resultForm.fastestLap ? 1 : 0
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to update result');
                }

                const updatedResult = await response.json();
                const updatedResults = results.map(result =>
                    result.result_id === editingResultId ? updatedResult : result
                );
                setResults(updatedResults);
            } else {
                // Add new result via API
                const response = await fetch(`${API_URL}/api/results`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        race_id: parseInt(resultForm.raceId),
                        driver_id: parseInt(resultForm.driverId),
                        team_id: parseInt(resultForm.teamId),
                        position: parseInt(resultForm.finishPosition),
                        points: parseInt(resultForm.points),
                        fastest_lap: resultForm.fastestLap ? 1 : 0
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to add new result');
                }

                const newResult = await response.json();
                setResults([...results, newResult]);
            }

            // Reset form and close modal
            setResultForm({
                raceId: selectedRace?.race_id.toString() || '',
                driverId: '',
                teamId: '',
                finishPosition: '',
                points: '',
                fastestLap: false
            });
            setEditingResultId(null);
            setShowResultModal(false);
        } catch (error) {
            console.error('Error submitting result:', error);
            alert('Đã xảy ra lỗi khi gửi dữ liệu. Vui lòng thử lại.');
        }
    };

    // Handle payment form submit
    const handlePaymentSubmit = async (e) => {
        e.preventDefault();

        try {
            // Add new payment via API
            const response = await fetch(`${API_URL}/api/prize-payments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    race_id: parseInt(paymentForm.raceId),
                    recipient_type: paymentForm.recipientType,
                    recipient_id: parseInt(paymentForm.recipientId),
                    amount: parseFloat(paymentForm.amount),
                    payment_date: paymentForm.paymentDate,
                    payment_method: paymentForm.paymentMethod,
                    notes: paymentForm.notes
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create payment');
            }

            const newPayment = await response.json();
            console.log(newPayment)
            setPrizePayments([...prizePayments, newPayment]);

            // Reset form and close modal
            setPaymentForm({
                raceId: '',
                recipientType: 'driver',
                recipientId: '',
                amount: '',
                paymentDate: new Date().toISOString().split('T')[0],
                paymentMethod: 'Bank Transfer',
                notes: ''
            });
            setShowPaymentModal(false);
            
        } catch (error) {
            console.error('Error submitting payment:', error);
            alert('Đã xảy ra lỗi khi gửi thanh toán. Vui lòng thử lại.');
        }
    };

    // Edit race - This function just prepares the form for editing
    const editRace = async (race) => {
        try {
            // Fetch the latest race data from API before editing
            const response = await fetch(`${API_URL}/api/races/${race.race_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch race details');
            }

            const raceData = await response.json();

            // Set form data with latest race data from API
            setRaceForm({
                raceName: raceData.race_name,
                circuitName: raceData.circuit_name,
                location: raceData.location,
                country: raceData.country,
                raceDate: raceData.race_date,
                raceYear: raceData.race_year.toString(),
                status: raceData.status,
            });

            setEditingRaceId(raceData.race_id);
            setShowRaceModal(true);
        } catch (error) {
            console.error('Error fetching race details:', error);

            // Fallback to using provided race data if API call fails
            setRaceForm({
                raceName: race.race_name,
                circuitName: race.circuit_name,
                location: race.location,
                country: race.country,
                raceDate: race.race_date,
                raceYear: race.race_year.toString(),
                status: race.status,
            });
            setEditingRaceId(race.race_id);
            setShowRaceModal(true);
        }
    };

    // Delete race
    const deleteRace = async (raceId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa cuộc đua này?')) {
            try {
                // Delete race via API
                const response = await fetch(`${API_URL}/api/races/${raceId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to delete race');
                }

                // After successful API call, update local state
                setRaces(races.filter(race => race.race_id !== raceId));
                
                // Also filter out associated results and payments in local state
                setResults(results.filter(result => result.race_id !== raceId));
                setPrizePayments(prizePayments.filter(payment => payment.race_id !== raceId));
                
                // If deleted race was the selected race, reset selection
                if (selectedRace && selectedRace.race_id === raceId) {
                    setSelectedRace(null);
                    setActiveTab('races');
                }
                
            } catch (error) {
                console.error('Error deleting race:', error);
                alert('Đã xảy ra lỗi khi xóa cuộc đua. Vui lòng thử lại.');
            }
        }
    };

    // Edit result
    const editResult = (result) => {
        setResultForm({
            raceId: result.race_id.toString(),
            driverId: result.driver_id.toString(),
            teamId: result.team_id.toString(),
            finishPosition: result.finish_position.toString(),
            points: result.points.toString(),
            fastestLap: result.fastest_lap === 1
        });
        setEditingResultId(result.result_id);
        setShowResultModal(true);
    };

    // Delete result
    const deleteResult = (resultId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa kết quả này?')) {
            setResults(results.filter(result => result.result_id !== resultId));
        }
    };

    // View race results
    const viewRaceResults = (race) => {
        setSelectedRace(race);
        setActiveTab('results');
    };

    // Get driver name by ID
    const getDriverName = (driverId) => {
        const driver = drivers.find(d => d.driver_id === driverId);
        return driver ? `${driver.first_name} ${driver.last_name}` : 'Unknown';
    };

    // Get team name by ID
    const getTeamName = (teamId) => {
        const team = teams.find(t => t.team_id === teamId);
        return team ? team.team_name : 'Unknown';
    };

    // Get driver by ID
    const getDriver = (driverId) => {
        return drivers.find(d => d.driver_id === driverId);
    };

    // Get prize amount for position
    const getPrizeAmount = (position, hasFastestLap) => {
        const positionPrize = PRIZE_STRUCTURE[position] || 0;
        const fastestLapPrize = hasFastestLap ? PRIZE_STRUCTURE.fastestLap : 0;
        return positionPrize + fastestLapPrize;
    };

    // Calculate team prize
    const getTeamPrize = (driverPrize) => {
        return driverPrize * (TEAM_PRIZE_PERCENTAGE / 100);
    };

    // Check if payment exists
    const hasPayment = (raceId, recipientType, recipientId) => {
        return prizePayments.some(
            payment =>
                payment.race_id === raceId &&
                payment.recipient_type === recipientType &&
                payment.recipient_id === recipientId
        );
    };

    // Process payment for a result
    const processPayment = (result) => {
        const race = races.find(r => r.race_id === result.race_id);
        const driver = getDriver(result.driver_id);
        const driverPrize = getPrizeAmount(result.finish_position, result.fastest_lap === 1);
        const teamPrize = getTeamPrize(driverPrize);

        setPaymentForm({
            raceId: result.race_id.toString(),
            recipientType: 'driver',
            recipientId: result.driver_id.toString(),
            amount: driverPrize.toString(),
            paymentDate: new Date().toISOString().split('T')[0],
            paymentMethod: 'Bank Transfer',
            notes: `Prize for ${getDriverName(result.driver_id)} - ${race.race_name} (Position: ${result.finish_position}${result.fastest_lap === 1 ? ', Fastest Lap' : ''})`
        });
        setShowPaymentModal(true);
    };

    // Process team payment
    const processTeamPayment = (result) => {
        const race = races.find(r => r.race_id === result.race_id);
        const driverPrize = getPrizeAmount(result.finish_position, result.fastest_lap === 1);
        const teamPrize = getTeamPrize(driverPrize);

        setPaymentForm({
            raceId: result.race_id.toString(),
            recipientType: 'team',
            recipientId: result.team_id.toString(),
            amount: teamPrize.toString(),
            paymentDate: new Date().toISOString().split('T')[0],
            paymentMethod: 'Bank Transfer',
            notes: `Team prize for ${getTeamName(result.team_id)} - ${race.race_name} (Driver: ${getDriverName(result.driver_id)}, Position: ${result.finish_position})`
        });
        setShowPaymentModal(true);
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    // Get results for selected race
    const raceResults = selectedRace
        ? results.filter(result => result.race_id === selectedRace.race_id)
            .sort((a, b) => a.finish_position - b.finish_position)
        : [];

    // Get payments for selected race
    const racePayments = selectedRace
        ? prizePayments.filter(payment => payment.race_id === selectedRace.race_id)
        : [];

    // Calculate total payments for a race
    const getTotalPaymentsForRace = (raceId) => {
        return prizePayments
            .filter(payment => payment.race_id === raceId)
            .reduce((sum, payment) => sum + payment.amount, 0);
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
                        Quản lý Giải Đua & Giải Thưởng
                    </h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Tabs */}
                <div className="mb-6 border-b border-gray-200">
                    <div className="flex">
                        <button
                            className={`px-4 py-2 font-medium text-sm ${activeTab === 'races'
                                ? 'border-b-2 border-purple-500 text-purple-600'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                            onClick={() => setActiveTab('races')}
                        >
                            Giải Đua
                        </button>
                        <button
                            className={`px-4 py-2 font-medium text-sm ${activeTab === 'results'
                                ? 'border-b-2 border-purple-500 text-purple-600'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                            onClick={() => {
                                if (selectedRace) {
                                    setActiveTab('results');
                                } else {
                                    alert('Vui lòng chọn một giải đua trước');
                                }
                            }}
                        >
                            Kết Quả
                        </button>
                        <button
                            className={`px-4 py-2 font-medium text-sm ${activeTab === 'payments'
                                ? 'border-b-2 border-purple-500 text-purple-600'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                            onClick={() => setActiveTab('payments')}
                        >
                            Thanh Toán Giải Thưởng
                        </button>
                    </div>
                </div>

                {/* Races Tab Content */}
                {activeTab === 'races' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm giải đua..."
                                    value={raceSearch}
                                    onChange={(e) => setRaceSearch(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                {raceSearch && (
                                    <button
                                        onClick={() => setRaceSearch('')}
                                        className="absolute right-3 top-2.5"
                                    >
                                        <X className="h-5 w-5 text-gray-400" />
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={() => {
                                    setRaceForm({
                                        raceName: '',
                                        circuitName: '',
                                        location: '',
                                        country: '',
                                        raceDate: '',
                                        raceYear: new Date().getFullYear(),
                                        status: 'Upcoming'
                                    });
                                    setEditingRaceId(null);
                                    setShowRaceModal(true);
                                }}
                                className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Thêm Giải Đua
                            </button>
                        </div>

                        {loading ? (
                            <div className="text-center py-10">
                                <p className="text-gray-500">Đang tải dữ liệu...</p>
                            </div>
                        ) : (
                            <>
                                {filteredRaces.length === 0 ? (
                                    <div className="text-center py-10">
                                        <p className="text-gray-500">Không tìm thấy giải đua nào</p>
                                    </div>
                                ) : (
                                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                        <ul className="divide-y divide-gray-200">
                                            {filteredRaces.map((race) => {
                                                const raceResults = results.filter(r => r.race_id === race.race_id);
                                                const totalPayments = getTotalPaymentsForRace(race.race_id);

                                                return (
                                                    <li key={race.race_id}>
                                                        <div className="px-4 py-4 sm:px-6">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center">
                                                                    <div className="bg-purple-100 text-purple-800 p-2 rounded-full mr-3">
                                                                        <Flag className="h-5 w-5" />
                                                                    </div>
                                                                    <div>
                                                                        <h3 className="text-lg font-medium text-gray-900">
                                                                            {race.race_name}
                                                                        </h3>
                                                                        <div className="flex items-center">
                                                                            <span className="mr-2 text-sm text-gray-500">
                                                                                {race.circuit_name}, {race.country}
                                                                            </span>
                                                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${race.status === 'Completed'
                                                                                ? 'bg-green-100 text-green-800'
                                                                                : race.status === 'Upcoming'
                                                                                    ? 'bg-blue-100 text-blue-800'
                                                                                    : 'bg-yellow-100 text-yellow-800'
                                                                                }`}>
                                                                                {race.status}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex space-x-2">
                                                                    <button
                                                                        onClick={() => viewRaceResults(race)}
                                                                        className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 flex items-center"
                                                                    >
                                                                        <Trophy className="h-4 w-4 mr-1" />
                                                                        Xem Kết Quả
                                                                    </button>
                                                                    <button
                                                                        onClick={() => editRace(race)}
                                                                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-full"
                                                                    >
                                                                        <Edit className="h-5 w-5" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => deleteRace(race.race_id)}
                                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                                                                    >
                                                                        <Trash2 className="h-5 w-5" />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-500">
                                                                <div className="col-span-1">
                                                                    <span className="font-medium text-gray-900">Ngày đua:</span> {race.race_date}
                                                                </div>
                                                                <div className="col-span-1">
                                                                    <span className="font-medium text-gray-900">Mùa giải:</span> {race.race_year}
                                                                </div>
                                                                <div className="col-span-1">
                                                                    <span className="font-medium text-gray-900">Kết quả:</span> {raceResults.length} tay đua
                                                                </div>
                                                                <div className="col-span-1">
                                                                    <span className="font-medium text-gray-900">Giải thưởng đã trả:</span> {formatCurrency(totalPayments)}
                                                                </div>
                                                            </div>
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

                {/* Results Tab Content */}
                {activeTab === 'results' && selectedRace && (
                    <div>
                        <div className="mb-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <button
                                        onClick={() => setActiveTab('races')}
                                        className="mr-2 p-1 rounded-full hover:bg-gray-100"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {selectedRace.race_name} - {selectedRace.race_date}
                                    </h2>
                                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${selectedRace.status === 'Completed'
                                        ? 'bg-green-100 text-green-800'
                                        : selectedRace.status === 'Upcoming'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {selectedRace.status}
                                    </span>
                                </div>

                                {selectedRace.status !== 'Upcoming' && (
                                    <button
                                        onClick={() => {
                                            setResultForm({
                                                raceId: selectedRace.race_id.toString(),
                                                driverId: '',
                                                teamId: '',
                                                finishPosition: '',
                                                points: '',
                                                fastestLap: false
                                            });
                                            setEditingResultId(null);
                                            setShowResultModal(true);
                                        }}
                                        className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                                    >
                                        <Plus className="h-5 w-5 mr-2" />
                                        Thêm Kết Quả
                                    </button>
                                )}
                            </div>

                            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                                <div className="text-sm text-gray-700">
                                    <div><span className="font-medium">Địa điểm:</span> {selectedRace.circuit_name}, {selectedRace.location}, {selectedRace.country}</div>
                                    <div className="mt-1"><span className="font-medium">Mùa giải:</span> {selectedRace.race_year}</div>
                                </div>
                            </div>
                        </div>

                        {raceResults.length === 0 ? (
                            <div className="text-center py-10 bg-white shadow rounded-lg">
                                <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500">Chưa có kết quả nào cho giải đua này</p>
                                {selectedRace.status !== 'Upcoming' && (
                                    <button
                                        onClick={() => {
                                            setResultForm({
                                                raceId: selectedRace.race_id.toString(),
                                                driverId: '',
                                                teamId: '',
                                                finishPosition: '',
                                                points: '',
                                                fastestLap: false
                                            });
                                            setEditingResultId(null);
                                            setShowResultModal(true);
                                        }}
                                        className="mt-4 inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                                    >
                                        <Plus className="h-5 w-5 mr-2" />
                                        Thêm Kết Quả
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="bg-white shadow overflow-hidden rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Vị trí
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tay đua
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Đội đua
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Điểm
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Giải thưởng
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Hành động
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {raceResults.map((result) => {
                                            const driverPrize = getPrizeAmount(result.finish_position, result.fastest_lap === 1);
                                            const teamPrize = getTeamPrize(driverPrize);
                                            const driverPaid = hasPayment(result.race_id, 'driver', result.driver_id);
                                            const teamPaid = hasPayment(result.race_id, 'team', result.team_id);

                                            return (
                                                <tr key={result.result_id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <span className="font-medium text-gray-900">{result.finish_position}</span>
                                                            {result.fastest_lap === 1 && (
                                                                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                                                                    Fastest Lap
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{getDriverName(result.driver_id)}</div>
                                                        <div className="text-sm text-gray-500">
                                                            #{getDriver(result.driver_id)?.driver_number} - {getDriver(result.driver_id)?.nationality}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{getTeamName(result.team_id)}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{result.points} điểm</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm">
                                                            <div className="flex items-center">
                                                                <span className="text-gray-900 font-medium">Tay đua:</span>
                                                                <span className="ml-1 text-gray-900">{formatCurrency(driverPrize)}</span>
                                                                {driverPaid ? (
                                                                    <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                                        Đã trả
                                                                    </span>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => processPayment(result)}
                                                                        className="ml-2 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200"
                                                                    >
                                                                        Thanh toán
                                                                    </button>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center mt-1">
                                                                <span className="text-gray-900 font-medium">Đội đua:</span>
                                                                <span className="ml-1 text-gray-900">{formatCurrency(teamPrize)}</span>
                                                                {teamPaid ? (
                                                                    <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                                        Đã trả
                                                                    </span>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => processTeamPayment(result)}
                                                                        className="ml-2 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200"
                                                                    >
                                                                        Thanh toán
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            onClick={() => editResult(result)}
                                                            className="text-purple-600 hover:text-purple-900 mr-3"
                                                        >
                                                            Sửa
                                                        </button>
                                                        <button
                                                            onClick={() => deleteResult(result.result_id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Xóa
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Race Payments Summary */}
                        {racePayments.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Thanh toán giải thưởng</h3>
                                <div className="bg-white shadow overflow-hidden rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Ngày thanh toán
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Người nhận
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Loại
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Số tiền
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Ghi chú
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {racePayments.map((payment) => (
                                                <tr key={payment.payment_id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {payment.payment_date}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {payment.recipient_type === 'driver'
                                                                ? getDriverName(payment.recipient_id)
                                                                : getTeamName(payment.recipient_id)}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${payment.recipient_type === 'driver'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : 'bg-green-100 text-green-800'
                                                            }`}>
                                                            {payment.recipient_type === 'driver' ? 'Tay đua' : 'Đội đua'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {formatCurrency(payment.amount)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {payment.notes}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Payments Tab Content */}
                {activeTab === 'payments' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Thanh Toán Giải Thưởng</h2>
                            <button
                                onClick={() => {
                                    setPaymentForm({
                                        raceId: '',
                                        recipientType: 'driver',
                                        recipientId: '',
                                        amount: '',
                                        paymentDate: new Date().toISOString().split('T')[0],
                                        paymentMethod: 'Bank Transfer',
                                        notes: ''
                                    });
                                    setShowPaymentModal(true);
                                }}
                                className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Thanh Toán Mới
                            </button>
                        </div>

                        {prizePayments.length === 0 ? (
                            <div className="text-center py-10 bg-white shadow rounded-lg">
                                <Award className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500">Chưa có thanh toán giải thưởng nào</p>
                            </div>
                        ) : (
                            <div className="bg-white shadow overflow-hidden rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Tổng quan thanh toán</h3>
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                                        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                                            <div className="px-4 py-5 sm:p-6">
                                                <dl>
                                                    <dt className="text-sm font-medium text-gray-500 truncate">Tổng thanh toán</dt>
                                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                                        {formatCurrency(prizePayments.reduce((sum, payment) => sum + payment.amount, 0))}
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                                            <div className="px-4 py-5 sm:p-6">
                                                <dl>
                                                    <dt className="text-sm font-medium text-gray-500 truncate">Thanh toán cho tay đua</dt>
                                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                                        {formatCurrency(prizePayments
                                                            .filter(payment => payment.recipient_type === 'driver')
                                                            .reduce((sum, payment) => sum + payment.amount, 0))}
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                                            <div className="px-4 py-5 sm:p-6">
                                                <dl>
                                                    <dt className="text-sm font-medium text-gray-500 truncate">Thanh toán cho đội đua</dt>
                                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                                        {formatCurrency(prizePayments
                                                            .filter(payment => payment.recipient_type === 'team')
                                                            .reduce((sum, payment) => sum + payment.amount, 0))}
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Danh sách thanh toán</h3>
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Ngày thanh toán
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Giải đua
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Người nhận
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Loại
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Số tiền
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Ghi chú
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {prizePayments
                                                .sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date))
                                                .map((payment) => {
                                                    const race = races.find(r => r.race_id === payment.race_id);

                                                    return (
                                                        <tr key={payment.payment_id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {payment.payment_date}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm font-medium text-gray-900">{race?.race_name}</div>
                                                                <div className="text-xs text-gray-500">{race?.race_date}</div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {payment.recipient_type === 'driver'
                                                                        ? getDriverName(payment.recipient_id)
                                                                        : getTeamName(payment.recipient_id)}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${payment.recipient_type === 'driver'
                                                                    ? 'bg-blue-100 text-blue-800'
                                                                    : 'bg-green-100 text-green-800'
                                                                    }`}>
                                                                    {payment.recipient_type === 'driver' ? 'Tay đua' : 'Đội đua'}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {formatCurrency(payment.amount)}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {payment.notes}
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

                {/* Race Modal */}
                {showRaceModal && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
                            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    {editingRaceId ? 'Chỉnh sửa Giải Đua' : 'Thêm Giải Đua'}
                                </h3>
                                <button
                                    onClick={() => setShowRaceModal(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                            <form onSubmit={handleRaceSubmit}>
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Tên Giải Đua
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={raceForm.raceName}
                                                onChange={(e) => setRaceForm({ ...raceForm, raceName: e.target.value })}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Tên Đường Đua
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={raceForm.circuitName}
                                                onChange={(e) => setRaceForm({ ...raceForm, circuitName: e.target.value })}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Địa điểm
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={raceForm.location}
                                                onChange={(e) => setRaceForm({ ...raceForm, location: e.target.value })}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Quốc gia
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={raceForm.country}
                                                onChange={(e) => setRaceForm({ ...raceForm, country: e.target.value })}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Ngày đua
                                            </label>
                                            <input
                                                type="date"
                                                required
                                                value={raceForm.raceDate}
                                                onChange={(e) => setRaceForm({ ...raceForm, raceDate: e.target.value })}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Mùa giải
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                value={raceForm.raceYear}
                                                onChange={(e) => setRaceForm({ ...raceForm, raceYear: e.target.value })}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Trạng thái
                                            </label>
                                            <select
                                                required
                                                value={raceForm.status}
                                                onChange={(e) => setRaceForm({ ...raceForm, status: e.target.value })}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            >
                                                <option value="Upcoming">Sắp diễn ra</option>
                                                <option value="In Progress">Đang diễn ra</option>
                                                <option value="Completed">Đã hoàn thành</option>
                                                <option value="Cancelled">Đã hủy</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowRaceModal(false)}
                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mr-2"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    >
                                        <Save className="h-4 w-4 mr-2" />
                                        {editingRaceId ? 'Cập nhật' : 'Lưu'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Result Modal */}
                {showResultModal && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
                            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    {editingResultId ? 'Chỉnh sửa Kết Quả' : 'Thêm Kết Quả'}
                                </h3>
                                <button
                                    onClick={() => setShowResultModal(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                            <form onSubmit={handleResultSubmit}>
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Giải đua
                                            </label>
                                            <select
                                                required
                                                value={resultForm.raceId}
                                                onChange={(e) => setResultForm({ ...resultForm, raceId: e.target.value })}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                                disabled={selectedRace !== null}
                                            >
                                                <option value="">Chọn giải đua</option>
                                                {races
                                                    .filter(race => race.status !== 'Upcoming')
                                                    .map(race => (
                                                        <option key={race.race_id} value={race.race_id}>
                                                            {race.race_name} - {race.race_date}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Tay đua
                                            </label>
                                            <select
                                                required
                                                value={resultForm.driverId}
                                                onChange={(e) => {
                                                    const driver = drivers.find(d => d.driver_id === parseInt(e.target.value));
                                                    setResultForm({
                                                        ...resultForm,
                                                        driverId: e.target.value,
                                                        teamId: driver ? driver.team_id.toString() : ''
                                                    });
                                                }}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            >
                                                <option value="">Chọn tay đua</option>
                                                {drivers.map(driver => (
                                                    <option key={driver.driver_id} value={driver.driver_id}>
                                                        {driver.first_name} {driver.last_name} (#{driver.driver_number})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Đội đua
                                            </label>
                                            <select
                                                required
                                                value={resultForm.teamId}
                                                onChange={(e) => setResultForm({ ...resultForm, teamId: e.target.value })}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                                disabled={resultForm.driverId !== ''}
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
                                                Vị trí về đích
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                min="1"
                                                value={resultForm.finishPosition}
                                                onChange={(e) => {
                                                    const position = parseInt(e.target.value);
                                                    let points = 0;

                                                    // Calculate points based on position
                                                    if (position === 1) points = 25;
                                                    else if (position === 2) points = 18;
                                                    else if (position === 3) points = 15;
                                                    else if (position === 4) points = 12;
                                                    else if (position === 5) points = 10;
                                                    else if (position === 6) points = 8;
                                                    else if (position === 7) points = 6;
                                                    else if (position === 8) points = 4;
                                                    else if (position === 9) points = 2;
                                                    else if (position === 10) points = 1;

                                                    setResultForm({
                                                        ...resultForm,
                                                        finishPosition: e.target.value,
                                                        points: points.toString()
                                                    });
                                                }}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Điểm
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                value={resultForm.points}
                                                onChange={(e) => setResultForm({ ...resultForm, points: e.target.value })}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={resultForm.fastestLap}
                                                    onChange={(e) => {
                                                        const fastestLap = e.target.checked;
                                                        const currentPoints = parseInt(resultForm.points || '0');

                                                        // Add 1 point for fastest lap if position <= 10
                                                        const newPoints = fastestLap && parseInt(resultForm.finishPosition) <= 10
                                                            ? currentPoints + 1
                                                            : fastestLap ? currentPoints : currentPoints - 1;

                                                        setResultForm({
                                                            ...resultForm,
                                                            fastestLap: fastestLap,
                                                            points: newPoints.toString()
                                                        });
                                                    }}
                                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                                />
                                                <label className="ml-2 block text-sm text-gray-900">
                                                    Fastest Lap (+1 điểm nếu vị trí trong top 10)
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowResultModal(false)}
                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mr-2"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    >
                                        <Save className="h-4 w-4 mr-2" />
                                        {editingResultId ? 'Cập nhật' : 'Lưu'}
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
                                    Thanh Toán Giải Thưởng
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
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Giải đua
                                            </label>
                                            <select
                                                required
                                                value={paymentForm.raceId}
                                                onChange={(e) => setPaymentForm({ ...paymentForm, raceId: e.target.value })}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            >
                                                <option value="">Chọn giải đua</option>
                                                {races
                                                    .filter(race => race.status === 'Completed')
                                                    .map(race => (
                                                        <option key={race.race_id} value={race.race_id}>
                                                            {race.race_name} - {race.race_date}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Loại người nhận
                                            </label>
                                            <div className="mt-2 flex items-center space-x-4">
                                                <div className="flex items-center">
                                                    <input
                                                        id="recipient-driver"
                                                        name="recipient-type"
                                                        type="radio"
                                                        checked={paymentForm.recipientType === 'driver'}
                                                        onChange={() => setPaymentForm({ ...paymentForm, recipientType: 'driver', recipientId: '' })}
                                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                                                    />
                                                    <label htmlFor="recipient-driver" className="ml-2 block text-sm text-gray-700">
                                                        Tay đua
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        id="recipient-team"
                                                        name="recipient-type"
                                                        type="radio"
                                                        checked={paymentForm.recipientType === 'team'}
                                                        onChange={() => setPaymentForm({ ...paymentForm, recipientType: 'team', recipientId: '' })}
                                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                                                    />
                                                    <label htmlFor="recipient-team" className="ml-2 block text-sm text-gray-700">
                                                        Đội đua
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Người nhận
                                            </label>
                                            {paymentForm.recipientType === 'driver' ? (
                                                <select
                                                    required
                                                    value={paymentForm.recipientId}
                                                    onChange={(e) => setPaymentForm({ ...paymentForm, recipientId: e.target.value })}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                                >
                                                    <option value="">Chọn tay đua</option>
                                                    {drivers.map(driver => (
                                                        <option key={driver.driver_id} value={driver.driver_id}>
                                                            {driver.first_name} {driver.last_name} (#{driver.driver_number})
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <select
                                                    required
                                                    value={paymentForm.recipientId}
                                                    onChange={(e) => setPaymentForm({ ...paymentForm, recipientId: e.target.value })}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                                >
                                                    <option value="">Chọn đội đua</option>
                                                    {teams.map(team => (
                                                        <option key={team.team_id} value={team.team_id}>
                                                            {team.team_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        </div>

                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Số tiền (VND)
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                value={paymentForm.amount}
                                                onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Ngày thanh toán
                                            </label>
                                            <input
                                                type="date"
                                                required
                                                value={paymentForm.paymentDate}
                                                onChange={(e) => setPaymentForm({ ...paymentForm, paymentDate: e.target.value })}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Phương thức thanh toán
                                            </label>
                                            <select
                                                required
                                                value={paymentForm.paymentMethod}
                                                onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            >
                                                <option value="Bank Transfer">Bank Transfer</option>
                                                <option value="Wire Transfer">Wire Transfer</option>
                                                <option value="Check">Check</option>
                                                <option value="Cash">Cash</option>
                                            </select>
                                        </div>

                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Ghi chú
                                            </label>
                                            <textarea
                                                value={paymentForm.notes}
                                                onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                                                rows={2}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowPaymentModal(false)}
                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mr-2"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                        onClick={() => console.log(paymentForm)}
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

export default RacesAwardsPage;