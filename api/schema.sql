-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : mysql:3306
-- Généré le : jeu. 24 sep. 2020 à 12:53
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
-- Structure de la table `hash`
--

USE matcha;

CREATE TABLE `hash`
(
  `id` int
(11) NOT NULL,
  `userId` int
(11) NOT NULL,
  `hashValidation` varchar
(128) CHARACTER
SET utf8 DEFAULT
NULL,
  `hashForget` int
(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `sexualOrientation` enum
('hetero','homo','bi') NOT NULL DEFAULT 'bi',
  `description` text CHARACTER
SET
utf8,
  `matches` text CHARACTER
SET
utf8,
  `gender` enum
('male','female') DEFAULT NULL,
  `popularityScore` int
(11) NOT NULL DEFAULT '0',
  `latitude` double NOT NULL DEFAULT '0',
  `longitude` double NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `hash`
--
ALTER TABLE `hash`
ADD PRIMARY KEY
(`id`),
ADD KEY `foreign`
(`userId`);

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
-- AUTO_INCREMENT pour la table `hash`
--
ALTER TABLE `hash`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT;

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
-- Contraintes pour la table `hash`
--
ALTER TABLE `hash`
ADD CONSTRAINT `foreign` FOREIGN KEY
(`userId`) REFERENCES `users`
(`id`) ON
DELETE CASCADE;

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
