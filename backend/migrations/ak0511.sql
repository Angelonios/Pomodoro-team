-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 05, 2020 at 03:26 PM
-- Server version: 5.7.32-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_team05`
--

-- --------------------------------------------------------

--
-- Table structure for table `anonym_pomodoro`
--

CREATE TABLE `anonym_pomodoro` (
  `anonym_id` int(11) NOT NULL,
  `state` enum('started','stopped','break','idle') COLLATE utf8mb4_czech_ci NOT NULL,
  `started` timestamp NULL DEFAULT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `link` varchar(40) COLLATE utf8mb4_czech_ci NOT NULL,
  `remaining_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Table structure for table `in_team`
--

CREATE TABLE `in_team` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pomodoros`
--

CREATE TABLE `pomodoros` (
  `pomodoro_id` int(11) NOT NULL,
  `communication_id` varchar(128) COLLATE utf8mb4_czech_ci NOT NULL,
  `share_id` varchar(128) COLLATE utf8mb4_czech_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `running` tinyint(1) NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `position_in_cycle` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Dumping data for table `pomodoros`
--

INSERT INTO `pomodoros` (`pomodoro_id`, `communication_id`, `share_id`, `user_id`, `running`, `last_updated`, `position_in_cycle`) VALUES
(1, 'abc', 'abc', NULL, 1, '2020-11-03 15:06:29', 3),
(2, 'def', 'ghi', NULL, 1, '2020-11-03 16:13:34', 4),
(5, '', '', NULL, 0, '2020-11-03 20:35:51', 0),
(7, '573111a1-c602-497a-9bb7-5292d1263142', '79c26439-5118-4ed0-8ba6-abde9da1aa00', NULL, 1, '2020-11-05 12:05:38', 5),
(23, '30dbe4bb-90cc-489b-927e-7a9cc53ffae1', '2da73cc0-3d9c-4af1-aebd-adfcb765d935', NULL, 0, '2020-11-05 11:01:35', 0),
(30, '3fe2d6ba-95a3-4fe6-aa75-25ab9bbf4f92', '0c798b5d-4d6f-44a5-824d-14f9cd617d33', NULL, 0, '2020-11-03 17:11:33', 4),
(42, '697ac779-545e-4c0a-971f-563f4148d32b', '7553a6a3-30ad-4743-b6bf-a15982495cf1', NULL, 0, '2020-11-04 16:20:58', 0),
(54, '3d26941e-c930-4663-bcd0-7c1917233e31', '673b6dad-28a7-4c35-bd5c-4059dbf3240e', NULL, 0, '2020-11-04 08:18:47', 0),
(171, '56a0dcd8-08f5-48bb-9856-9704c80666d6', '6d7f8358-8062-4b87-9bc1-e7e7071ed568', NULL, 1, '2020-11-03 20:40:27', 0),
(314, 'a47fff14-a4c1-4969-9968-69deb5e09dea', '5d8ddb34-71d8-481c-8e21-9896e23085fb', NULL, 1, '2020-11-03 20:45:23', 0),
(331, '5e1cb23e-bd5c-45f3-b079-7d29f434a7ef', '3258aa0d-33f2-4140-8eb3-89ef4c5d720c', NULL, 1, '2020-11-03 20:46:36', 1),
(336, '78e6b93a-bb74-4beb-934b-55ce5eed7e29', '89e9c6c9-5a67-4d3e-8ffb-02ef47304319', NULL, 1, '2020-11-03 20:50:03', 7),
(417, '588db0be-d9b4-485f-8251-e1e2301a9c94', 'c3092c8d-89f6-4b9e-aba7-0c9fb5ea31c2', NULL, 0, '2020-11-03 21:07:44', 0),
(426, 'e2a302fd-fe7f-47d5-84d1-6d1d797a8a90', '44a928ea-4141-491c-b535-7a774cc51940', NULL, 1, '2020-11-03 21:30:09', 0),
(429, '4fe32816-85bb-40e6-8e60-52c6b0511c1b', 'fdf96208-72f1-412d-8d8c-4f68e60673ba', NULL, 0, '2020-11-03 21:32:05', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `task_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `pomodoros_needed` int(11) NOT NULL,
  `pomodoros_spent` int(11) DEFAULT NULL,
  `description` text COLLATE utf8mb4_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `team_id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL,
  `owner_id` int(11) NOT NULL,
  `description` text COLLATE utf8mb4_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(200) COLLATE utf8mb4_czech_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`) VALUES
(3, 'test1@pomodoritrackertest.cz', '$argon2i$v=19$m=4096,t=3,p=1$PbX0SJgy50oiZTSL7rC1JQ$9xwsqi+Z3MPQvwEM7CPZ2UQtcjc4tlF3F0yCX15RumI'),
(4, 'test2@pomodoritrackertest.cz', '$argon2i$v=19$m=4096,t=3,p=1$NeZ0cOG9Cpfpbi0nQ7sooQ$Ad0o+Ukd75zEdsXM1ZjCZVqqixX5CqsBfxCrSZBWYZI');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anonym_pomodoro`
--
ALTER TABLE `anonym_pomodoro`
  ADD PRIMARY KEY (`anonym_id`);

--
-- Indexes for table `in_team`
--
ALTER TABLE `in_team`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Indexes for table `pomodoros`
--
ALTER TABLE `pomodoros`
  ADD PRIMARY KEY (`pomodoro_id`),
  ADD UNIQUE KEY `share_id` (`share_id`),
  ADD UNIQUE KEY `communication_id` (`communication_id`),
  ADD UNIQUE KEY `user_id_2` (`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`team_id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pomodoros`
--
ALTER TABLE `pomodoros`
  MODIFY `pomodoro_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=530;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `in_team`
--
ALTER TABLE `in_team`
  ADD CONSTRAINT `in_team_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `in_team_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pomodoros`
--
ALTER TABLE `pomodoros`
  ADD CONSTRAINT `pomodoros_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`) ON UPDATE CASCADE;

--
-- Constraints for table `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
