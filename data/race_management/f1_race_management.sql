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
-- Database: `f1_race_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `races`
--

CREATE TABLE `races` (
  `race_id` int(11) NOT NULL,
  `race_name` varchar(100) NOT NULL,
  `circuit_name` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `race_date` date DEFAULT NULL,
  `race_year` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Upcoming',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `races`
--

INSERT INTO `races` (`race_id`, `race_name`, `circuit_name`, `location`, `country`, `race_date`, `race_year`, `status`, `created_at`) VALUES
(1, 'Bahrain Grand Prix', 'Bahrain International Circuit', 'Sakhir', 'Bahrain', '2025-03-02', 2025, 'Completed', '2025-04-14 22:54:02'),
(2, 'Saudi Arabian Grand Prix', 'Jeddah Corniche Circuit', 'Jeddah', 'Saudi Arabia', '2025-03-09', 2025, 'Completed', '2025-04-14 22:54:02'),
(3, 'Australian Grand Prix', 'Albert Park Circuit', 'Melbourne', 'Australia', '2025-03-23', 2025, 'Upcoming', '2025-04-14 22:54:02'),
(4, 'Japanese Grand Prix', 'Suzuka International Racing Course', 'Suzuka', 'Japan', '2025-04-06', 2025, 'Upcoming', '2025-04-14 22:54:02');

-- --------------------------------------------------------

--
-- Table structure for table `race_results`
--

CREATE TABLE `race_results` (
  `result_id` int(11) NOT NULL,
  `race_id` int(11) NOT NULL,
  `driver_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `finish_position` int(11) DEFAULT NULL,
  `points` int(11) DEFAULT NULL,
  `fastest_lap` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `race_results`
--

INSERT INTO `race_results` (`result_id`, `race_id`, `driver_id`, `team_id`, `finish_position`, `points`, `fastest_lap`, `created_at`) VALUES
(1, 1, 1, 1, 1, 25, 0, '2025-04-14 22:54:02'),
(2, 1, 3, 2, 2, 18, 0, '2025-04-14 22:54:02'),
(3, 1, 5, 3, 3, 15, 1, '2025-04-14 22:54:02'),
(4, 1, 7, 4, 4, 12, 0, '2025-04-14 22:54:02'),
(5, 1, 2, 1, 5, 10, 0, '2025-04-14 22:54:02'),
(6, 1, 4, 2, 6, 8, 0, '2025-04-14 22:54:02'),
(7, 2, 1, 1, 1, 25, 1, '2025-04-14 22:54:02'),
(8, 2, 2, 1, 2, 18, 0, '2025-04-14 22:54:02'),
(9, 2, 7, 4, 3, 15, 0, '2025-04-14 22:54:02'),
(10, 2, 3, 2, 4, 12, 0, '2025-04-14 22:54:02'),
(11, 2, 4, 2, 5, 10, 0, '2025-04-14 22:54:02'),
(12, 2, 5, 3, 6, 8, 0, '2025-04-14 22:54:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `races`
--
ALTER TABLE `races`
  ADD PRIMARY KEY (`race_id`);

--
-- Indexes for table `race_results`
--
ALTER TABLE `race_results`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `FK2elke3gjhe8xwitsftgj573cn` (`race_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `race_results`
--
ALTER TABLE `race_results`
  ADD CONSTRAINT `FK2elke3gjhe8xwitsftgj573cn` FOREIGN KEY (`race_id`) REFERENCES `races` (`race_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
