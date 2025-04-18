-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2025 at 08:13 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `f1_teams_drivers`
--

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `driver_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `nationality` varchar(50) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `driver_number` int(11) DEFAULT NULL,
  `bank_account` varchar(50) DEFAULT NULL,
  `bank_details` text DEFAULT NULL,
  `active_status` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`driver_id`, `team_id`, `first_name`, `last_name`, `nationality`, `date_of_birth`, `driver_number`, `bank_account`, `bank_details`, `active_status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Max', 'Verstappen', 'Dutch', '1997-09-30', 1, 'MV33445566', 'Dutch International Bank, SWIFT: DIBKXX', 1, '2025-04-15 05:54:02', '2025-04-15 05:54:02'),
(2, 1, 'Sergio', 'Perez', 'Mexican', '1990-01-26', 11, 'SP77889900', 'Mexican Global Bank, SWIFT: MGBKXX', 1, '2025-04-15 05:54:02', '2025-04-15 05:54:02'),
(3, 2, 'Lewis', 'Hamilton', 'British', '1985-01-07', 44, 'LH44556677', 'British Banking Corp, SWIFT: BBCPXX', 1, '2025-04-15 05:54:02', '2025-04-15 05:54:02'),
(4, 2, 'George', 'Russell', 'British', '1998-02-15', 63, 'GR63123456', 'British Banking Corp, SWIFT: BBCPXX', 1, '2025-04-15 05:54:02', '2025-04-15 05:54:02'),
(5, 3, 'Charles', 'Leclerc', 'Monegasque', '1997-10-16', 16, 'CL16789012', 'Monaco Private Bank, SWIFT: MPBKXX', 1, '2025-04-15 05:54:02', '2025-04-15 05:54:02'),
(6, 3, 'Carlos', 'Sainz', 'Spanish', '1994-09-01', 55, 'CS55345678', 'Spanish International Bank, SWIFT: SIBKXX', 1, '2025-04-15 05:54:02', '2025-04-15 05:54:02'),
(7, 4, 'Lando', 'Norris', 'British', '1999-11-13', 4, 'LN04901234', 'British National Bank, SWIFT: BNBKXX', 1, '2025-04-15 05:54:02', '2025-04-15 05:54:02'),
(8, 4, 'Oscar', 'Piastri', 'Australian', '2001-04-06', 81, 'OP81567890', 'Australian Banking Group, SWIFT: ABGKXX', 1, '2025-04-15 05:54:02', '2025-04-15 05:54:02');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `team_id` int(11) NOT NULL,
  `team_name` varchar(100) NOT NULL,
  `team_principal` varchar(100) DEFAULT NULL,
  `nationality` varchar(50) DEFAULT NULL,
  `headquarters` varchar(100) DEFAULT NULL,
  `founding_year` int(11) DEFAULT NULL,
  `bank_account` varchar(50) DEFAULT NULL,
  `bank_details` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`team_id`, `team_name`, `team_principal`, `nationality`, `headquarters`, `founding_year`, `bank_account`, `bank_details`, `created_at`, `updated_at`) VALUES
(1, 'Red Bull Racing', 'Christian Horner', 'Austrian', 'Milton Keynes, UK', 2005, 'RB12345678', 'Bank of F1, SWIFT: BOFF1XX', '2025-04-15 05:54:02', '2025-04-15 05:54:02'),
(2, 'Mercedes-AMG Petronas', 'Toto Wolff', 'German', 'Brackley, UK', 1970, 'MB87654321', 'Global Bank, SWIFT: GLBKXX', '2025-04-15 05:54:02', '2025-04-15 05:54:02'),
(3, 'Scuderia Ferrari', 'Frédéric Vasseur', 'Italian', 'Maranello, Italy', 1950, 'SF11223344', 'Italian Banking Group, SWIFT: ITBGXX', '2025-04-15 05:54:02', '2025-04-15 05:54:02'),
(4, 'McLaren Racing', 'Andrea Stella', 'British', 'Woking, UK', 1966, 'MC99887766', 'UK Banking Corp, SWIFT: UKBCXX', '2025-04-15 05:54:02', '2025-04-15 05:54:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`driver_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`team_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `driver_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `team_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `drivers`
--
ALTER TABLE `drivers`
  ADD CONSTRAINT `drivers_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
