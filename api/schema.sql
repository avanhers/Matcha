-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : mysql:3306
-- Généré le : jeu. 08 oct. 2020 à 16:10
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
USE matcha;
-- --------------------------------------------------------

--
-- Structure de la table `blocks`
--

CREATE TABLE `blocks`
(
  `id` int
(11) NOT NULL,
  `blockerId` int
(11) NOT NULL,
  `blockedId` int
(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `hash`
--

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
  `hashForget` varchar
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
  `userId` int
(11) NOT NULL,
  `image` varchar
(2048) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes`
(
  `id` int
(11) NOT NULL,
  `likeId` int
(11) NOT NULL,
  `likedId` int
(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `reports`
--

CREATE TABLE `reports`
(
  `id` int
(11) NOT NULL,
  `reporterId` int
(11) NOT NULL,
  `reportedId` int
(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `tags`
--

CREATE TABLE `tags`
(
  `id` int
(11) NOT NULL,
  `tags` varchar
(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `tags`
--

INSERT INTO `tags` (`
id`,
`tags
`) VALUES
(1, 'tag1'),
(2, 'tag2'),
(3, 'tag3'),
(4, 'tag4'),
(5, 'tag5'),
(6, 'tag6'),
(7, 'tag7'),
(8, 'tag8');

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
  `age` int
(11) DEFAULT NULL,
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
  `popularityScore` decimal
(11,2) NOT NULL DEFAULT '0.00',
  `latitude` double NOT NULL DEFAULT '0',
  `longitude` double NOT NULL DEFAULT '0',
  `avatar` varchar
(512) CHARACTER
SET utf8 DEFAULT
NULL,
  `isLogin` tinyint
(1) DEFAULT NULL,
  `connectedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `user_tag`
--

CREATE TABLE `user_tag`
(
  `id` int
(11) NOT NULL,
  `userId` int
(11) NOT NULL,
  `tagId` int
(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `views`
--

CREATE TABLE `views`
(
  `id` int
(11) NOT NULL,
  `watcherId` int
(11) NOT NULL,
  `watchedId` int
(11) NOT NULL,
  `viewAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `blocks`
--
ALTER TABLE `blocks`
ADD PRIMARY KEY
(`id`),
ADD KEY `blocked`
(`blockedId`),
ADD KEY `blocker`
(`blockerId`);

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
(`userId`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
ADD PRIMARY KEY
(`id`),
ADD KEY `likeUser`
(`likeId`),
ADD KEY `likedUser`
(`likedId`);

--
-- Index pour la table `reports`
--
ALTER TABLE `reports`
ADD PRIMARY KEY
(`id`),
ADD KEY `reported`
(`reportedId`),
ADD KEY `reporter`
(`reporterId`);

--
-- Index pour la table `tags`
--
ALTER TABLE `tags`
ADD PRIMARY KEY
(`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
ADD PRIMARY KEY
(`id`);

--
-- Index pour la table `user_tag`
--
ALTER TABLE `user_tag`
ADD PRIMARY KEY
(`id`),
ADD KEY `user`
(`userId`),
ADD KEY `tag`
(`tagId`);

--
-- Index pour la table `views`
--
ALTER TABLE `views`
ADD PRIMARY KEY
(`id`),
ADD KEY `watchedUser`
(`watchedId`),
ADD KEY `watcherUser`
(`watcherId`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `blocks`
--
ALTER TABLE `blocks`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=412;

--
-- AUTO_INCREMENT pour la table `user_tag`
--
ALTER TABLE `user_tag`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=884;

--
-- AUTO_INCREMENT pour la table `views`
--
ALTER TABLE `views`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `blocks`
--
ALTER TABLE `blocks`
ADD CONSTRAINT `blocked` FOREIGN KEY
(`blockedId`) REFERENCES `users`
(`id`) ON
DELETE CASCADE,
ADD CONSTRAINT `blocker` FOREIGN KEY
(`blockerId`) REFERENCES `users`
(`id`) ON
DELETE CASCADE;

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
(`userId`) REFERENCES `users`
(`id`) ON
DELETE NO ACTION ON
UPDATE NO ACTION;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
ADD CONSTRAINT `likeUser` FOREIGN KEY
(`likeId`) REFERENCES `users`
(`id`) ON
DELETE CASCADE,
ADD CONSTRAINT `likedUser` FOREIGN KEY
(`likedId`) REFERENCES `users`
(`id`) ON
DELETE CASCADE;

--
-- Contraintes pour la table `reports`
--
ALTER TABLE `reports`
ADD CONSTRAINT `reported` FOREIGN KEY
(`reportedId`) REFERENCES `users`
(`id`) ON
DELETE CASCADE,
ADD CONSTRAINT `reporter` FOREIGN KEY
(`reporterId`) REFERENCES `users`
(`id`) ON
DELETE CASCADE;

--
-- Contraintes pour la table `user_tag`
--
ALTER TABLE `user_tag`
ADD CONSTRAINT `tag` FOREIGN KEY
(`tagId`) REFERENCES `tags`
(`id`),
ADD CONSTRAINT `user` FOREIGN KEY
(`userId`) REFERENCES `users`
(`id`);

--
-- Contraintes pour la table `views`
--
ALTER TABLE `views`
ADD CONSTRAINT `watchedUser` FOREIGN KEY
(`watchedId`) REFERENCES `users`
(`id`) ON
DELETE CASCADE,
ADD CONSTRAINT `watcherUser` FOREIGN KEY
(`watcherId`) REFERENCES `users`
(`id`) ON
DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
