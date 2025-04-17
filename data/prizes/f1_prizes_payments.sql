-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 17, 2025 at 10:43 AM
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
-- Database: `f1_prizes_payments`
--

-- --------------------------------------------------------

--
-- Table structure for table `prize_payments`
--

CREATE TABLE `prize_payments` (
  `payment_id` int(11) NOT NULL,
  `recipient_type` varchar(10) NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `race_id` int(11) NOT NULL,
  `prize_type` varchar(50) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `payment_date` date DEFAULT NULL,
  `transaction_reference` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `driver_id` int(11) NOT NULL,
  `position` int(11) DEFAULT NULL,
  `prize_category` varchar(100) DEFAULT NULL,
  `team_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prize_payments`
--

INSERT INTO `prize_payments` (`payment_id`, `recipient_type`, `recipient_id`, `race_id`, `prize_type`, `amount`, `payment_date`, `transaction_reference`, `status`, `created_at`, `driver_id`, `position`, `prize_category`, `team_id`) VALUES
(1, 'Driver', 1, 1, 'Race Position', 100000.00, '2025-03-05', 'BGP-WIN-2025', 'Completed', '2025-04-14 22:54:02', 0, NULL, NULL, 0),
(2, 'Driver', 3, 1, 'Race Position', 75000.00, '2025-03-05', 'BGP-P2-2025', 'Completed', '2025-04-14 22:54:02', 0, NULL, NULL, 0),
(3, 'Driver', 5, 1, 'Race Position', 50000.00, '2025-03-05', 'BGP-P3-2025', 'Completed', '2025-04-14 22:54:02', 0, NULL, NULL, 0),
(4, 'Driver', 5, 1, 'Fastest Lap', 10000.00, '2025-03-05', 'BGP-FL-2025', 'Completed', '2025-04-14 22:54:02', 0, NULL, NULL, 0),
(5, 'Driver', 1, 2, 'Race Position', 100000.00, '2025-03-12', 'SGP-WIN-2025', 'Completed', '2025-04-14 22:54:02', 0, NULL, NULL, 0),
(6, 'Driver', 2, 2, 'Race Position', 75000.00, '2025-03-12', 'SGP-P2-2025', 'Completed', '2025-04-14 22:54:02', 0, NULL, NULL, 0),
(7, 'Driver', 7, 2, 'Race Position', 50000.00, '2025-03-12', 'SGP-P3-2025', 'Completed', '2025-04-14 22:54:02', 0, NULL, NULL, 0),
(8, 'Driver', 1, 2, 'Fastest Lap', 10000.00, '2025-03-12', 'SGP-FL-2025', 'Completed', '2025-04-14 22:54:02', 0, NULL, NULL, 0),
(9, 'Team', 1, 1, 'Constructor Position', 150000.00, '2025-03-07', 'BGP-TEAM-RB-2025', 'Completed', '2025-04-14 22:54:02', 0, NULL, NULL, 0),
(10, 'Team', 2, 1, 'Constructor Position', 130000.00, '2025-03-07', 'BGP-TEAM-MB-2025', 'Completed', '2025-04-14 22:54:02', 0, NULL, NULL, 0),
(11, 'Team', 3, 1, 'Constructor Position', 110000.00, '2025-03-07', 'BGP-TEAM-SF-2025', 'Completed', '2025-04-14 22:54:02', 0, NULL, NULL, 0),
(12, 'Team', 1, 2, 'Constructor Position', 150000.00, '2025-03-14', 'SGP-TEAM-RB-2025', 'Completed', '2025-04-14 22:54:02', 0, NULL, NULL, 0),
(13, 'Team', 2, 2, 'Constructor Position', 130000.00, '2025-03-14', 'SGP-TEAM-MB-2025', 'Completed', '2025-04-14 22:54:02', 0, NULL, NULL, 0),
(14, 'Team', 4, 2, 'Constructor Position', 110000.00, '2025-03-14', 'SGP-TEAM-MC-2025', 'Completed', '2025-04-14 22:54:02', 0, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `prize_structures`
--

CREATE TABLE `prize_structures` (
  `structure_id` int(11) NOT NULL,
  `prize_category` varchar(50) NOT NULL,
  `position` int(11) DEFAULT NULL,
  `amount` decimal(15,2) NOT NULL,
  `applicable_year` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prize_structures`
--

INSERT INTO `prize_structures` (`structure_id`, `prize_category`, `position`, `amount`, `applicable_year`) VALUES
(1, 'Race Position', 1, 100000.00, 2025),
(2, 'Race Position', 2, 75000.00, 2025),
(3, 'Race Position', 3, 50000.00, 2025),
(4, 'Fastest Lap', 1, 10000.00, 2025),
(5, 'Constructor Position', 1, 150000.00, 2025),
(6, 'Constructor Position', 2, 130000.00, 2025),
(7, 'Constructor Position', 3, 110000.00, 2025);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
