CREATE DATABASE  IF NOT EXISTS `spot` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `spot`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: nolmung.kr    Database: spot
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_review_photo`
--

DROP TABLE IF EXISTS `tbl_review_photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_review_photo` (
  `review_photo_idx` bigint NOT NULL AUTO_INCREMENT,
  `photo_url` varchar(255) DEFAULT NULL,
  `review_idx` bigint NOT NULL,
  PRIMARY KEY (`review_photo_idx`),
  KEY `FKh9mxyrkjucsx2k243yfkaia44` (`review_idx`),
  CONSTRAINT `FKh9mxyrkjucsx2k243yfkaia44` FOREIGN KEY (`review_idx`) REFERENCES `tbl_spot_review` (`review_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_spot_review`
--

DROP TABLE IF EXISTS `tbl_spot_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_spot_review` (
  `review_idx` bigint NOT NULL AUTO_INCREMENT,
  `create_date` datetime DEFAULT NULL,
  `modify_date` datetime DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `star` double DEFAULT NULL,
  `user_idx` bigint NOT NULL,
  `spot_id` varchar(255) NOT NULL,
  PRIMARY KEY (`review_idx`),
  KEY `FKinxho5yf6une75h56m0rep7ms` (`spot_id`),
  CONSTRAINT `FKinxho5yf6une75h56m0rep7ms` FOREIGN KEY (`spot_id`) REFERENCES `tbl_spot` (`spot_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21  4:01:56
CREATE DATABASE  IF NOT EXISTS `user` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `user`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: nolmung.kr    Database: user
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_dog`
--

DROP TABLE IF EXISTS `tbl_dog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_dog` (
  `dog_idx` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `dog_name` varchar(255) DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `neuter` bit(1) DEFAULT NULL,
  `vaccination` bit(1) DEFAULT NULL,
  `breed_code` int DEFAULT NULL,
  `user_idx` bigint DEFAULT NULL,
  PRIMARY KEY (`dog_idx`),
  KEY `FK14no23bhbvpsbonpge79be21e` (`breed_code`),
  KEY `FK7nymxfqn7l176ryaf0q1ou2kn` (`user_idx`),
  CONSTRAINT `FK14no23bhbvpsbonpge79be21e` FOREIGN KEY (`breed_code`) REFERENCES `tbl_breed` (`breed_code`),
  CONSTRAINT `FK7nymxfqn7l176ryaf0q1ou2kn` FOREIGN KEY (`user_idx`) REFERENCES `tbl_user` (`user_idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_history`
--

DROP TABLE IF EXISTS `tbl_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_history` (
  `history_idx` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `owner` bit(1) DEFAULT NULL,
  `record_idx` varchar(255) DEFAULT NULL,
  `review` varchar(255) DEFAULT NULL,
  `star` int DEFAULT NULL,
  `reviewee` bigint DEFAULT NULL,
  `reviewer` bigint DEFAULT NULL,
  PRIMARY KEY (`history_idx`),
  KEY `FKu3lvgjlypaa745mrpljrbba` (`reviewee`),
  KEY `FK9f8v84w0gn0wjnp6j1wqfecwd` (`reviewer`),
  CONSTRAINT `FK9f8v84w0gn0wjnp6j1wqfecwd` FOREIGN KEY (`reviewer`) REFERENCES `tbl_user` (`user_idx`),
  CONSTRAINT `FKu3lvgjlypaa745mrpljrbba` FOREIGN KEY (`reviewee`) REFERENCES `tbl_user` (`user_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_user` (
  `user_idx` bigint NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `nickname` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `profile_image` varchar(255) NOT NULL,
  PRIMARY KEY (`user_idx`),
  UNIQUE KEY `UK_pd19ylfyt8bc5i11d9k2ns41u` (`nickname`),
  UNIQUE KEY `UK_d6tho5pxk6qd8xem6vwou8sdp` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_user_variable`
--

DROP TABLE IF EXISTS `tbl_user_variable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_user_variable` (
  `user_idx` bigint NOT NULL,
  `cnt_alba_star` int DEFAULT '0',
  `cnt_owner_star` int DEFAULT '0',
  `cnt_walk` int DEFAULT '0',
  `point` int DEFAULT '0',
  `sum_alba_star` int DEFAULT '0',
  `sum_owner_star` int DEFAULT '0',
  `total_distance` double DEFAULT '0',
  `total_time` int DEFAULT '0',
  PRIMARY KEY (`user_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21  4:01:56
CREATE DATABASE  IF NOT EXISTS `community` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `community`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: nolmung.kr    Database: community
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_chat`
--

DROP TABLE IF EXISTS `tbl_chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_chat` (
  `chat_idx` bigint NOT NULL AUTO_INCREMENT,
  `caller_user_idx` bigint DEFAULT NULL,
  `create_date` datetime(6) DEFAULT NULL,
  `room_id` varchar(255) DEFAULT NULL,
  `post_idx` bigint DEFAULT NULL,
  PRIMARY KEY (`chat_idx`),
  KEY `FK1r0h5a5kmmelhrl7e727wra1m` (`post_idx`),
  CONSTRAINT `FK1r0h5a5kmmelhrl7e727wra1m` FOREIGN KEY (`post_idx`) REFERENCES `tbl_post` (`post_idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_lucky_dog`
--

DROP TABLE IF EXISTS `tbl_lucky_dog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_lucky_dog` (
  `dog_idx` bigint NOT NULL,
  `post_idx` bigint NOT NULL,
  PRIMARY KEY (`dog_idx`,`post_idx`),
  KEY `FKc3mfbrwsthx86sfgdnry7ngsj` (`post_idx`),
  CONSTRAINT `FKc3mfbrwsthx86sfgdnry7ngsj` FOREIGN KEY (`post_idx`) REFERENCES `tbl_post` (`post_idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_post`
--

DROP TABLE IF EXISTS `tbl_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_post` (
  `post_idx` bigint NOT NULL AUTO_INCREMENT,
  `create_date` datetime(6) DEFAULT NULL,
  `modify_date` datetime(6) DEFAULT NULL,
  `alba_idx` bigint DEFAULT NULL,
  `category_type` varchar(20) DEFAULT NULL,
  `content` varchar(200) DEFAULT NULL,
  `get_completed` bit(1) DEFAULT b'0',
  `get_deleted` bit(1) DEFAULT b'0',
  `lead_line` bit(1) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `pay` int DEFAULT NULL,
  `poop_bag` bit(1) DEFAULT NULL,
  `re_register` int DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `walk_date` datetime(6) DEFAULT NULL,
  `writer_idx` bigint DEFAULT NULL,
  PRIMARY KEY (`post_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_post_like`
--

DROP TABLE IF EXISTS `tbl_post_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_post_like` (
  `user_idx` bigint NOT NULL,
  `post_idx` bigint NOT NULL,
  PRIMARY KEY (`post_idx`,`user_idx`),
  CONSTRAINT `FKfox3s61o2p7ri5b4bhxwiy741` FOREIGN KEY (`post_idx`) REFERENCES `tbl_post` (`post_idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tbl_post_photo`
--

DROP TABLE IF EXISTS `tbl_post_photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_post_photo` (
  `post_photo_idx` bigint NOT NULL AUTO_INCREMENT,
  `photo_url` varchar(255) DEFAULT NULL,
  `post_idx` bigint DEFAULT NULL,
  PRIMARY KEY (`post_photo_idx`),
  KEY `FKbmdi2x7kwr11pi73q9a51dn2s` (`post_idx`),
  CONSTRAINT `FKbmdi2x7kwr11pi73q9a51dn2s` FOREIGN KEY (`post_idx`) REFERENCES `tbl_post` (`post_idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21  4:01:57
