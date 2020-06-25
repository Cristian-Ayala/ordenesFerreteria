SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `tpiCobro` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE `tpiCobro`;

CREATE TABLE IF NOT EXISTS `categoria` (
  `id_categoria` int(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre_cat` varchar(500) COLLATE utf8mb4_spanish_ci NOT NULL,
  `activoCat` tinyint(1) NOT NULL,
  `descripcion` varchar(1000) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_categoria`),
  KEY `id_categoria` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

INSERT INTO `categoria` (`id_categoria`, `nombre_cat`, `activoCat`, `descripcion`) VALUES
(1, 'Hogar', 1, 'Cualquier utensilio que es requerido para la casa, como alfombras, macetas, plantas, e.t.c.'),
(2, 'Herramientas industriales', 1, 'Se encuentran todas las herramientas a nivel industrial para todo tipo de reparación o construcción.'),
(3, 'Tornillos y Clavos', 1, 'Todo tipo de tornillos y tamaños'),
(4, 'Materiales de Construcción', 1, 'Todo tipo de material utilizado para construcción, como cemento, hierro, formica, e.t.c');

CREATE TABLE IF NOT EXISTS `detalle_orden` (
  `id_orden` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `cantidad_prod` int(5) UNSIGNED NOT NULL,
  `precio_unit` float UNSIGNED NOT NULL,
  `upc` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `descuento` int(3) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id_orden`,`upc`),
  KEY `upc` (`upc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

INSERT INTO `detalle_orden` (`id_orden`, `cantidad_prod`, `precio_unit`, `upc`, `descuento`) VALUES
('07MIuIGA28egi28vOhzi', 2, 15.23, '4385729473184', 50),
('07MIuIGA28egi28vOhzi', 1, 1.25, '7416501070368', 0),
('07MIuIGA28egi28vOhzi', 3, 3.5, '7453015121346', 10),
('nDjTXIO1qFUbNpY6eCPE', 2, 17.5, '2947356189445', 20);

CREATE TABLE IF NOT EXISTS `marca` (
  `id_marca` int(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre_marca` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `activoMarca` tinyint(1) NOT NULL,
  `descrip_marca` varchar(1000) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_marca`),
  KEY `id_marca` (`id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

INSERT INTO `marca` (`id_marca`, `nombre_marca`, `activoMarca`, `descrip_marca`) VALUES
(1, 'Fabuloso', 1, 'Fabuloso Limpiador liquido fabuloso antibacterial lavanda multiusos'),
(2, 'Philips', 1, 'Koninklijke Philips N.V., conocida comúnmente como Philips, es una de las empresas de tecnología más grandes e importantes del mundo. Está enfocada principalmente en los sectores de la electrónica y la asistencia sanitaria. Sus oficinas principales se encuentran en Ámsterdam y en otras ciudades de los Países Bajos.'),
(3, 'Studmarket', 1, 'Es una línea completa e innovadora, de diseños distintivos, que se incrementa y renueva día tras día, fruto de un trabajo conjunto  por más de 20 años con nuestros clientes, de incesante investigación e inconformidad.Nuestra compañía se ha especializado en la comercialización de una amplia línea de útiles y mobiliarios de oficina, máquinas e insumos para encuadernar y útiles escolares.'),
(4, 'OFI-Plus', 1, 'Marca que se especializa en productos de oficina.'),
(8, 'Holcim', 1, 'Holcim es una empresa suiza, líder en el suministro de cementos​ y áridos así como otros materiales como hormigón premezclado y combustibles alternativos.');

CREATE TABLE IF NOT EXISTS `metodo_pago` (
  `id_metodo_pago` int(2) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre_pago` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `activoMet` tinyint(1) NOT NULL,
  `descripcion_metodo` varchar(1000) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id_metodo_pago`),
  KEY `id_metodo_pago` (`id_metodo_pago`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

INSERT INTO `metodo_pago` (`id_metodo_pago`, `nombre_pago`, `activoMet`, `descripcion_metodo`) VALUES
(1, 'Efectivo', 1, 'Cualquier cancelación de ordenes hechas con efectivo'),
(2, 'Tarjeta de Crédito VISA', 1, 'Cualquier cancelación de ordenes hechas con una tarjeta de credito VISA'),
(3, 'Tarjeta de Debito VISA', 1, 'Cualquier cancelación de ordenes hechas con una tarjeta electrónica de debito'),
(4, 'Pagaré', 1, 'Cualquier cancelación de ordenes hechas con un documento legal de pagaré'),
(5, 'Cheque', 1, 'Cualquier cancelación de ordenes hechas con un cheque');

CREATE TABLE IF NOT EXISTS `orden` (
  `id_orden` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fecha_ord` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `total_orden` double NOT NULL,
  `nombre_cliente` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `id_metodo_pago` int(2) UNSIGNED NOT NULL,
  `activoOrden` tinyint(1) NOT NULL,
  `observaciones_orden` varchar(1000) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_orden`),
  KEY `id_orden` (`id_orden`),
  KEY `id_metodo_pago` (`id_metodo_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

INSERT INTO `orden` (`id_orden`, `fecha_ord`, `total_orden`, `nombre_cliente`, `id_metodo_pago`, `activoOrden`, `observaciones_orden`) VALUES
('07MIuIGA28egi28vOhzi', '2020-06-25 19:41:40', 25.93000030517578, 'Jaime Navas', 1, 1, 'Pago con un billete de $50'),
('nDjTXIO1qFUbNpY6eCPE', '2020-06-25 19:46:07', 28, 'Cristian Ayala', 3, 1, 'Está construyendo su champita');

CREATE TABLE IF NOT EXISTS `producto` (
  `upc` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre_prod` varchar(500) COLLATE utf8mb4_spanish_ci NOT NULL,
  `id_marca` int(5) UNSIGNED NOT NULL,
  `id_categoria` int(3) UNSIGNED NOT NULL,
  `precio_unit` float UNSIGNED NOT NULL,
  `descripcion` varchar(1000) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `stock_prod` int(10) UNSIGNED NOT NULL,
  `activoProd` tinyint(1) NOT NULL,
  PRIMARY KEY (`upc`),
  KEY `id_marca` (`id_marca`,`id_categoria`),
  KEY `id_categoria` (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

INSERT INTO `producto` (`upc`, `nombre_prod`, `id_marca`, `id_categoria`, `precio_unit`, `descripcion`, `stock_prod`, `activoProd`) VALUES
('2947356189445', 'Cemento de 42.5Kg', 8, 4, 17.5, 'BAJO CONTENIDO DE QUÍMICOS\nALTA RESISTENCIA A COMPRESIÓN\nIDEAL PARA MUROS, PISOS, LOZAS Y TECHOS', 98, 1),
('4385729473184', 'Destornillador con punta de estrella', 2, 2, 15.23, 'Esta es una descripción', 50, 1),
('7416501070368', 'Grapas estandrar', 4, 1, 1.25, 'Grapas para engrapar trabajos trabajados', 261, 1),
('7453015121346', 'Tape dispenser', 1, 1, 3.5, 'Cinta tape transparente con el dispensador incluido', 247, 1);


ALTER TABLE `detalle_orden`
  ADD CONSTRAINT `detalle_orden_ibfk_1` FOREIGN KEY (`id_orden`) REFERENCES `orden` (`id_orden`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_orden_ibfk_2` FOREIGN KEY (`upc`) REFERENCES `producto` (`upc`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `orden`
  ADD CONSTRAINT `orden_ibfk_1` FOREIGN KEY (`id_metodo_pago`) REFERENCES `metodo_pago` (`id_metodo_pago`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_3` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `producto_ibfk_4` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`) ON DELETE NO ACTION ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
