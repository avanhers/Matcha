-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : mysql:3306
-- Généré le : ven. 18 sep. 2020 à 10:56
-- Version du serveur :  5.7.31
-- Version de PHP : 7.4.9

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone
= "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `matcha`
--

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

CREATE TABLE `images`
(
  `id` int
(11) NOT NULL,
  `user-id` int
(11) NOT NULL,
  `image` varchar
(2048) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users`
(
  `id` int
(11) NOT NULL,
  `email` varchar
(50) CHARACTER
SET utf8
NOT NULL,
  `username` varchar
(30) CHARACTER
SET utf8
NOT NULL,
  `firstname` varchar
(30) CHARACTER
SET utf8
NOT NULL,
  `name` varchar
(30) CHARACTER
SET utf8
NOT NULL,
  `password` varchar
(76) CHARACTER
SET utf8
NOT NULL,
  `sexual-orientation` enum
('hetero','homo','bi') NOT NULL DEFAULT 'bi',
  `description` text CHARACTER
SET utf8
NOT NULL,
  `matches` text CHARACTER
SET utf8
NOT NULL,
  `gender` enum
('male','female') NOT NULL,
  `popularity-score` int
(11) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `images`
--
ALTER TABLE `images`
ADD PRIMARY KEY
(`id`),
ADD KEY `foreign-user`
(`user-id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
ADD PRIMARY KEY
(`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `images`
--
ALTER TABLE `images`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `images`
--
ALTER TABLE `images`
ADD CONSTRAINT `foreign-user` FOREIGN KEY
(`user-id`) REFERENCES `users`
(`id`) ON
DELETE NO ACTION ON
UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
