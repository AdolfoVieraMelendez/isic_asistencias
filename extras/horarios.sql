/*
Navicat MySQL Data Transfer

Source Server         : informatica
Source Server Version : 50051
Source Host           : localhost:3306
Source Database       : beta

Target Server Type    : MYSQL
Target Server Version : 50051
File Encoding         : 65001

Date: 2020-04-13 13:23:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for horarios
-- ----------------------------
DROP TABLE IF EXISTS `horarios`;
CREATE TABLE `horarios` (
  `id_horario` int(11) NOT NULL auto_increment,
  `id_datos_persona` int(11) default NULL,
  `turno` text,
  `l_entrada` time default NULL,
  `l_salida` time default NULL,
  `m_entrada` time default NULL,
  `m_salida` time default NULL,
  `mi_entrada` time default NULL,
  `mi_salida` time default NULL,
  `j_entrada` time default NULL,
  `j_salida` time default NULL,
  `v_entrada` time default NULL,
  `v_salida` time default NULL,
  `s_entrada` time default NULL,
  `s_salida` time default NULL,
  `d_entrada` time default NULL,
  `d_salida` time default NULL,
  `fecha_registro` date default NULL,
  `hora_registro` time default NULL,
  PRIMARY KEY  (`id_horario`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of horarios
-- ----------------------------
