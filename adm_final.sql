-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-08-2018 a las 15:43:13
-- Versión del servidor: 10.1.32-MariaDB
-- Versión de PHP: 5.6.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `adm_final`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comidas`
--

CREATE TABLE `comidas` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombrecomida` varchar(45) DEFAULT NULL,
  `comentarios` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comidas`
--

INSERT INTO `comidas` (`id`, `nombrecomida`, `comentarios`) VALUES
(1, 'Dogchow', 'Perros Medianos'),
(2, 'Eukanuba Perros', 'Perros Chicos'),
(3, 'Royalcanin', 'Perros Grandes'),
(4, 'Eukanuba Gatos', 'Gatos Chicos'),
(5, 'Catchow', 'Gatos Medianos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `edad` int(10) UNSIGNED DEFAULT NULL,
  `comentarios` varchar(45) DEFAULT NULL,
  `tipo` enum('Perro','Gato') DEFAULT NULL,
  `imagen` varchar(100) DEFAULT 'no-image.png',
  `fecha_creación` datetime DEFAULT NULL,
  `fk_id_raza` int(10) UNSIGNED DEFAULT NULL,
  `falsoid` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`id`, `nombre`, `edad`, `comentarios`, `tipo`, `imagen`, `fecha_creación`, `fk_id_raza`, `falsoid`) VALUES
(1, 'Laina', 3, 'Darle de comer 3 veces por día', 'Perro', 'no-image.jpg', '2018-08-27 00:00:00', 1, 'c668310e-5bbe-4eff-9ddd-1ffb6fcd4c3f'),
(2, 'Ciro', 4, 'Come 2 veces al día.', 'Perro', 'no-image.jpg', '2018-08-27 00:00:00', 14, '52020efb-568f-43b7-a285-a09d8925504b'),
(3, 'Goku', 1, 'Solo comida balanceada.', 'Gato', 'no-image.jpg', '2018-08-27 00:00:00', 22, '812d63ae-93de-4c98-925c-6da58d105ed1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `razas`
--

CREATE TABLE `razas` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombreraza` varchar(45) DEFAULT NULL,
  `tipo` enum('Perro','Gato') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `razas`
--

INSERT INTO `razas` (`id`, `nombreraza`, `tipo`) VALUES
(1, 'Beagle', 'Perro'),
(2, 'Pastor Aleman', 'Perro'),
(3, 'Bulldog', 'Perro'),
(4, 'Labrador', 'Perro'),
(5, 'Boxer', 'Perro'),
(6, 'Chihuahua', 'Perro'),
(7, 'Caniche', 'Perro'),
(8, 'Rottweiler', 'Perro'),
(9, 'Pug', 'Perro'),
(10, 'Doberman', 'Perro'),
(11, 'Chow Chow', 'Perro'),
(12, 'Mastin', 'Perro'),
(13, 'San Bernardo', 'Perro'),
(14, 'Pointer', 'Perro'),
(15, 'Yokshire', 'Perro'),
(16, 'Salchicha', 'Perro'),
(17, 'Cocker', 'Perro'),
(18, 'Pit Bull', 'Perro'),
(19, 'Collie', 'Perro'),
(20, 'BasserHunt', 'Perro'),
(21, 'Azul Ruso', 'Gato'),
(22, 'Persa', 'Gato'),
(23, 'Siames', 'Gato'),
(24, 'British Shortair', 'Gato'),
(25, 'Abisinio', 'Gato'),
(26, 'Ragdoll', 'Gato'),
(27, 'Sphynx', 'Gato'),
(28, 'Maine Coon', 'Gato'),
(29, 'MunchKin', 'Gato'),
(30, 'Savannah', 'Gato');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rel_masc_com`
--

CREATE TABLE `rel_masc_com` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_mascota` int(10) UNSIGNED DEFAULT NULL,
  `id_comida` int(10) UNSIGNED DEFAULT NULL,
  `comentarios` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `rel_masc_com`
--

INSERT INTO `rel_masc_com` (`id`, `id_mascota`, `id_comida`, `comentarios`) VALUES
(1, 1, 2, 'Dar dos veces al día.'),
(2, 2, 1, 'Dar 3 veces al día, no le gusta mucho.'),
(3, 3, 4, 'Dar con verduras una vez.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rel_masc_vac`
--

CREATE TABLE `rel_masc_vac` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_mascota` int(10) UNSIGNED DEFAULT NULL,
  `id_vacunas` int(10) UNSIGNED DEFAULT NULL,
  `fecha_vacunacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `rel_masc_vac`
--

INSERT INTO `rel_masc_vac` (`id`, `id_mascota`, `id_vacunas`, `fecha_vacunacion`) VALUES
(1, 1, 2, '2018-05-12 03:00:00'),
(2, 3, 4, '2018-05-12 03:00:00'),
(3, 2, 1, '2018-05-12 03:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacunas`
--

CREATE TABLE `vacunas` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombrevacuna` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `vacunas`
--

INSERT INTO `vacunas` (`id`, `nombrevacuna`) VALUES
(1, 'Primovacunacion'),
(2, 'Polivalente'),
(3, 'Antirrabica'),
(4, 'Trivalente'),
(5, 'Tetravalente'),
(6, 'Parvovirus');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comidas`
--
ALTER TABLE `comidas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fkidraza_idx` (`fk_id_raza`);

--
-- Indices de la tabla `razas`
--
ALTER TABLE `razas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indices de la tabla `rel_masc_com`
--
ALTER TABLE `rel_masc_com`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indices de la tabla `rel_masc_vac`
--
ALTER TABLE `rel_masc_vac`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indices de la tabla `vacunas`
--
ALTER TABLE `vacunas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comidas`
--
ALTER TABLE `comidas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `razas`
--
ALTER TABLE `razas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `rel_masc_com`
--
ALTER TABLE `rel_masc_com`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `rel_masc_vac`
--
ALTER TABLE `rel_masc_vac`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `vacunas`
--
ALTER TABLE `vacunas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `fkidraza` FOREIGN KEY (`fk_id_raza`) REFERENCES `razas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
