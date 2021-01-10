-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Počítač: localhost:3306
-- Vytvořeno: Ned 10. led 2021, 15:46
-- Verze serveru: 5.7.32-0ubuntu0.18.04.1
-- Verze PHP: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `user_team05`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `garden`
--

CREATE TABLE `garden` (
  `team_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `display_name` varchar(255) COLLATE utf8mb4_czech_ci NOT NULL,
  `row` int(11) NOT NULL,
  `col` int(11) NOT NULL,
  `planted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `in_team`
--

CREATE TABLE `in_team` (
  `in_team_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `pomodoros`
--

CREATE TABLE `pomodoros` (
  `pomodoro_id` int(11) NOT NULL,
  `communication_id` varchar(128) COLLATE utf8mb4_czech_ci NOT NULL,
  `share_id` varchar(128) COLLATE utf8mb4_czech_ci NOT NULL,
  `state` enum('IDLE','RUNNING','PAUSED') COLLATE utf8mb4_czech_ci NOT NULL DEFAULT 'IDLE',
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `position_in_cycle` int(1) NOT NULL,
  `seconds_since_start_at_pause` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `pomodoro_statistics`
--

CREATE TABLE `pomodoro_statistics` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `finished_at` date NOT NULL,
  `duration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `tasks`
--

CREATE TABLE `tasks` (
  `task_id` int(11) NOT NULL,
  `pomodoro_statistic_id` int(11) NOT NULL,
  `task_description` varchar(255) COLLATE utf8mb4_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `teams`
--

CREATE TABLE `teams` (
  `team_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `display_name` varchar(255) COLLATE utf8mb4_czech_ci NOT NULL,
  `email` varchar(200) COLLATE utf8mb4_czech_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_czech_ci NOT NULL,
  `pomodoro_id` int(11) DEFAULT NULL,
  `used_points` int(10) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `garden`
--
ALTER TABLE `garden`
  ADD KEY `team_id` (`team_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `display_name` (`display_name`);

--
-- Klíče pro tabulku `in_team`
--
ALTER TABLE `in_team`
  ADD PRIMARY KEY (`in_team_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Klíče pro tabulku `pomodoros`
--
ALTER TABLE `pomodoros`
  ADD PRIMARY KEY (`pomodoro_id`),
  ADD UNIQUE KEY `share_id` (`share_id`),
  ADD UNIQUE KEY `communication_id` (`communication_id`);

--
-- Klíče pro tabulku `pomodoro_statistics`
--
ALTER TABLE `pomodoro_statistics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Klíče pro tabulku `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `pomodoro_statistic_id` (`pomodoro_statistic_id`);

--
-- Klíče pro tabulku `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`team_id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Klíče pro tabulku `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `pomodoro_id` (`pomodoro_id`),
  ADD KEY `display_name` (`display_name`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `in_team`
--
ALTER TABLE `in_team`
  MODIFY `in_team_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;
--
-- AUTO_INCREMENT pro tabulku `pomodoros`
--
ALTER TABLE `pomodoros`
  MODIFY `pomodoro_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19256;
--
-- AUTO_INCREMENT pro tabulku `pomodoro_statistics`
--
ALTER TABLE `pomodoro_statistics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;
--
-- AUTO_INCREMENT pro tabulku `tasks`
--
ALTER TABLE `tasks`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;
--
-- AUTO_INCREMENT pro tabulku `teams`
--
ALTER TABLE `teams`
  MODIFY `team_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT pro tabulku `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `garden`
--
ALTER TABLE `garden`
  ADD CONSTRAINT `garden_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `garden_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `garden_ibfk_3` FOREIGN KEY (`display_name`) REFERENCES `users` (`display_name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omezení pro tabulku `in_team`
--
ALTER TABLE `in_team`
  ADD CONSTRAINT `in_team_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `in_team_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omezení pro tabulku `pomodoro_statistics`
--
ALTER TABLE `pomodoro_statistics`
  ADD CONSTRAINT `pomodoro_statistics_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Omezení pro tabulku `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`pomodoro_statistic_id`) REFERENCES `pomodoro_statistics` (`id`);

--
-- Omezení pro tabulku `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omezení pro tabulku `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_pomodoro_id` FOREIGN KEY (`pomodoro_id`) REFERENCES `pomodoros` (`pomodoro_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
