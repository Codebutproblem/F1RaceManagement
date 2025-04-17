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
-- Database: `f1_sponsorship`
--

-- --------------------------------------------------------

--
-- Table structure for table `sponsors`
--

CREATE TABLE `sponsors` (
  `sponsor_id` int(11) NOT NULL,
  `sponsor_name` varchar(100) NOT NULL,
  `industry` varchar(50) DEFAULT NULL,
  `contact_person` varchar(100) DEFAULT NULL,
  `contact_email` varchar(100) DEFAULT NULL,
  `contact_phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sponsors`
--

INSERT INTO `sponsors` (`sponsor_id`, `sponsor_name`, `industry`, `contact_person`, `contact_email`, `contact_phone`, `created_at`) VALUES
(1, 'Shell', 'Energy', 'John Smith', 'john.smith@shell.com', '+44123456789', '2025-04-15 05:54:02'),
(2, 'Rolex', 'Luxury Goods', 'Emma Johnson', 'emma.j@rolex.com', '+41987654321', '2025-04-15 05:54:02'),
(3, 'DHL', 'Logistics', 'Michael Brown', 'mbrown@dhl.com', '+49123456789', '2025-04-15 05:54:02'),
(4, 'Pirelli', 'Automotive', 'Laura Rossi', 'l.rossi@pirelli.com', '+39123456789', '2025-04-15 05:54:02');

-- --------------------------------------------------------

--
-- Table structure for table `sponsorship_contracts`
--

CREATE TABLE `sponsorship_contracts` (
  `contract_id` int(11) NOT NULL,
  `sponsor_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `season_year` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `contract_value` decimal(15,2) NOT NULL,
  `payment_terms` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sponsorship_contracts`
--

INSERT INTO `sponsorship_contracts` (`contract_id`, `sponsor_id`, `type_id`, `season_year`, `start_date`, `end_date`, `contract_value`, `payment_terms`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 2025, '2025-01-01', '2025-12-31', 5000000.00, 'Thanh toán hàng quý', 'Active', '2025-04-15 05:54:02', '2025-04-15 05:54:02'),
(2, 2, 1, 2025, '2025-01-01', '2027-12-31', 15000000.00, 'Thanh toán hàng năm', 'Active', '2025-04-15 05:54:02', '2025-04-15 05:54:02'),
(3, 3, 2, 2025, '2025-01-01', '2025-12-31', 3500000.00, 'Thanh toán đầy đủ trước mùa giải', 'Active', '2025-04-15 05:54:02', '2025-04-15 05:54:02'),
(4, 4, 3, 2025, '2025-01-01', '2026-12-31', 8000000.00, 'Thanh toán 50% đầu mùa, 50% giữa mùa', 'Active', '2025-04-15 05:54:02', '2025-04-15 05:54:02');

-- --------------------------------------------------------

--
-- Table structure for table `sponsorship_payments`
--

CREATE TABLE `sponsorship_payments` (
  `payment_id` int(11) NOT NULL,
  `contract_id` int(11) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `payment_date` date NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `transaction_reference` varchar(100) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sponsorship_payments`
--

INSERT INTO `sponsorship_payments` (`payment_id`, `contract_id`, `amount`, `payment_date`, `payment_method`, `transaction_reference`, `notes`) VALUES
(1, 1, 1250000.00, '2025-01-15', 'Bank Transfer', 'SHELL-Q1-2025', 'Thanh toán quý 1/2025'),
(2, 2, 5000000.00, '2025-01-10', 'Wire Transfer', 'ROLEX-2025-01', 'Thanh toán năm đầu tiên'),
(3, 3, 3500000.00, '2025-01-05', 'Bank Transfer', 'DHL-2025-FULL', 'Thanh toán đầy đủ cho mùa 2025'),
(4, 4, 4000000.00, '2025-01-20', 'Wire Transfer', 'PIRELLI-2025-P1', 'Thanh toán đợt 1');

-- --------------------------------------------------------

--
-- Table structure for table `sponsorship_types`
--

CREATE TABLE `sponsorship_types` (
  `type_id` int(11) NOT NULL,
  `type_name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `visibility_level` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sponsorship_types`
--

INSERT INTO `sponsorship_types` (`type_id`, `type_name`, `description`, `visibility_level`) VALUES
(1, 'Title Sponsor', 'Nhà tài trợ chính có quyền đặt tên đội đua', 'Title'),
(2, 'Official Partner', 'Đối tác chính thức của giải đấu', 'Official'),
(3, 'Technical Partner', 'Đối tác cung cấp công nghệ', 'Technical'),
(4, 'Regional Partner', 'Đối tác khu vực', 'Regional');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sponsors`
--
ALTER TABLE `sponsors`
  ADD PRIMARY KEY (`sponsor_id`);

--
-- Indexes for table `sponsorship_contracts`
--
ALTER TABLE `sponsorship_contracts`
  ADD PRIMARY KEY (`contract_id`),
  ADD KEY `sponsor_id` (`sponsor_id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `sponsorship_payments`
--
ALTER TABLE `sponsorship_payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `contract_id` (`contract_id`);

--
-- Indexes for table `sponsorship_types`
--
ALTER TABLE `sponsorship_types`
  ADD PRIMARY KEY (`type_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sponsors`
--
ALTER TABLE `sponsors`
  MODIFY `sponsor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sponsorship_contracts`
--
ALTER TABLE `sponsorship_contracts`
  MODIFY `contract_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sponsorship_payments`
--
ALTER TABLE `sponsorship_payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sponsorship_types`
--
ALTER TABLE `sponsorship_types`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sponsorship_contracts`
--
ALTER TABLE `sponsorship_contracts`
  ADD CONSTRAINT `sponsorship_contracts_ibfk_1` FOREIGN KEY (`sponsor_id`) REFERENCES `sponsors` (`sponsor_id`),
  ADD CONSTRAINT `sponsorship_contracts_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `sponsorship_types` (`type_id`);

--
-- Constraints for table `sponsorship_payments`
--
ALTER TABLE `sponsorship_payments`
  ADD CONSTRAINT `sponsorship_payments_ibfk_1` FOREIGN KEY (`contract_id`) REFERENCES `sponsorship_contracts` (`contract_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
