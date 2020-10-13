-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : mysql:3306
-- Généré le : lun. 05 oct. 2020 à 14:48
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
  `userId` int
(11) NOT NULL,
  `image` varchar
(2048) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

USE matcha;

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

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`
id`,
`likeId
`, `likedId`) VALUES
(3, 2, 1),
(4, 3, 1),
(9, 1, 3),
(10, 1, 2);

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
  `popularityScore` int
(11) NOT NULL DEFAULT '0',
  `latitude` double NOT NULL DEFAULT '0',
  `longitude` double NOT NULL DEFAULT '0',
  `avatar` varchar
(512) CHARACTER
SET utf8 DEFAULT
NULL,
  `isLogin` tinyint
(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`
id`,
`email`,
`username`,
`firstname`,
`name`,
`password`,
`age`,
`sexualOrientation
`, `description`, `matches`, `gender`, `popularityScore`, `latitude`, `longitude`, `avatar`, `isLogin`) VALUES
(1, 'toto.tutug@mail.com', 'jules', 'AhBon', 'coucou', '$2a$10$O4iK1tNnOAOi6FWjPZtamOYowk9DEa6bZb6OWDxG92wCMo.Fic6Yi', NULL, 'hetero', 'Lourddd', NULL, 'male', 0, 0, 0, 'uploads/images/image.jpeg-1601633021515.jpg', 1),
(2, 'jules.jaegle@gmail.co', 'toto', 'jules', 'jules', '$2a$10$PHQ8PU8oxveCkAwKP/.hGuv1wSvuzP/sTV53FFW2Q.e0MJ1y8ladW', NULL, 'bi', NULL, NULL, NULL, 0, 0, 0, NULL, 1),
(3, 'jules.jaegle@gmail.c', 'tata', 'jules', 'jules', '$2a$10$VUAfH2XnsSdIGl6rbK1uv.6RND4w2XyA8US1EHb44xZJjHmw7MA7.', NULL, 'bi', NULL, NULL, NULL, 0, 0, 0, NULL, 1),
(5, 'jules.jaegle@gmail.e', 'tutu', 'jules', 'jules', '$2a$10$iJ/fLkiDhhwfOdw19rhd2.lD2xvvq9RKQ.kk/BPV3m8GA/9adVlW6', NULL, 'bi', NULL, NULL, NULL, 0, 0, 0, NULL, NULL);

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

--
-- Déchargement des données de la table `user_tag`
--

INSERT INTO `user_tag` (`
id`,
`userId
`, `tagId`) VALUES
(53, 1, 1),
(54, 1, 4),
(55, 1, 6),
(56, 1, 8);

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
(11) NOT NULL
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
ADD KEY `watcherUser`
(`watcherId`),
ADD KEY `watchedUser`
(`watchedId`);

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
ADD KEY `watcherUser`
(`watcherId`),
ADD KEY `watchedUser`
(`watchedId`);

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
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `user_tag`
--
ALTER TABLE `user_tag`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT pour la table `views`
--
ALTER TABLE `views`
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
(`id`),
ADD CONSTRAINT `likedUser` FOREIGN KEY
(`likedId`) REFERENCES `users`
(`id`);

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
(`id`),
ADD CONSTRAINT `watcherUser` FOREIGN KEY
(`watcherId`) REFERENCES `users`
(`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
