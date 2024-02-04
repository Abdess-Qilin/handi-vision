-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: handivision
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `competence`
--

DROP TABLE IF EXISTS `competence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competence` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `code_type_competence` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `code_type_competence` (`code_type_competence`),
  CONSTRAINT `competence_ibfk_1` FOREIGN KEY (`code_type_competence`) REFERENCES `type_competence` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competence`
--

LOCK TABLES `competence` WRITE;
/*!40000 ALTER TABLE `competence` DISABLE KEYS */;
INSERT INTO `competence` VALUES (1,'HTML',1),(2,'CSS',1),(3,'JS',1),(4,'NODEJS',1),(5,'REACT',1),(6,'BOOTSTRAP',1),(7,'travail en equipe',2),(8,'management',2),(9,'autonomie',2),(10,'PHP',1),(11,'PYTHON',1),(12,'C++',1),(13,'html',3),(14,'css',3),(15,'js',3),(16,'html',4),(17,'css',4),(18,'js',4),(19,'html',5),(20,'css',5),(21,'js',5),(22,'HTML',6),(23,'CSS',6),(24,'JS',6),(25,'js',7),(26,'node.js',7),(27,'react.js',7),(28,'PYTHON',10),(29,'PHP',10),(30,'MYSQL',10),(31,'REACT',11),(32,'JAVASCRIPT',11),(33,'habilite',12),(34,'botanique',12),(35,'brave ',13),(36,'courageux',13),(37,'gentil',14),(38,'arnaqueur',14);
/*!40000 ALTER TABLE `competence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competence_offre_demploi`
--

DROP TABLE IF EXISTS `competence_offre_demploi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competence_offre_demploi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code_competence` int DEFAULT NULL,
  `code_offre_demploi` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `code_competence` (`code_competence`),
  KEY `code_offre_demploi` (`code_offre_demploi`),
  CONSTRAINT `competence_offre_demploi_ibfk_1` FOREIGN KEY (`code_competence`) REFERENCES `competence` (`id`),
  CONSTRAINT `competence_offre_demploi_ibfk_2` FOREIGN KEY (`code_offre_demploi`) REFERENCES `offre_demploi` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competence_offre_demploi`
--

LOCK TABLES `competence_offre_demploi` WRITE;
/*!40000 ALTER TABLE `competence_offre_demploi` DISABLE KEYS */;
INSERT INTO `competence_offre_demploi` VALUES (1,1,3),(2,2,3),(3,3,3),(4,4,3),(5,5,3),(6,10,4),(7,11,4),(8,1,5),(9,2,5),(10,3,5),(11,5,5),(12,28,15),(13,29,15),(14,30,15),(15,31,16),(16,32,16),(17,33,17),(18,34,17),(19,35,18),(20,36,18),(21,37,19),(22,38,19);
/*!40000 ALTER TABLE `competence_offre_demploi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `critere_handicap`
--

DROP TABLE IF EXISTS `critere_handicap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `critere_handicap` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(70) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `critere_handicap`
--

LOCK TABLES `critere_handicap` WRITE;
/*!40000 ALTER TABLE `critere_handicap` DISABLE KEYS */;
/*!40000 ALTER TABLE `critere_handicap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entreprise`
--

DROP TABLE IF EXISTS `entreprise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entreprise` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_de_lentreprise` varchar(255) NOT NULL,
  `secteur_activite` varchar(255) NOT NULL,
  `raison_sociale` varchar(255) NOT NULL,
  `statut_juridique` varchar(255) DEFAULT NULL,
  `telephone` varchar(25) NOT NULL,
  `adresse` text NOT NULL,
  `effectif` int DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `site_web` text,
  `reseaux_sociaux` text,
  `code_NAF_principal` varchar(255) NOT NULL,
  `politique_teletravail` text,
  `code_utilisateur` int DEFAULT NULL,
  `statut` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `telephone` (`telephone`),
  UNIQUE KEY `mail` (`mail`),
  KEY `code_utilisateur` (`code_utilisateur`),
  CONSTRAINT `entreprise_ibfk_1` FOREIGN KEY (`code_utilisateur`) REFERENCES `utilisateur` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entreprise`
--

LOCK TABLES `entreprise` WRITE;
/*!40000 ALTER TABLE `entreprise` DISABLE KEYS */;
INSERT INTO `entreprise` VALUES (4,'SNCF','transport','sncf FRANCE','SARL','0194657482','59 Rue de renaud, 75009 Paris',6765,'testk@sncf.fr','https://www.sncf.fr','https://www.linkedin.com/company/sncf/','6202A - Conseil en systèmes et logiciels informatiques','selon besoins du service',8,3),(7,'RATP','transport','sncf FRANCE','SARL','0199657462','539 Rue de renaud, 75009 Paris',2765,'testk@rato.fr','https://www.ratp.fr','https://www.linkedin.com/company/sncf/','6202A - Conseil en systèmes et logiciels informatiques','selon besoins du service',8,3),(8,'O\'CLOCK','informatique','o\'clock france','sarl','0254789632','12 rue o\'clock',89,'oclock@test.fr','https://www.oclock.fr','https://www.linkedin.com/company/oclock/','6202A - Conseil en systèmes et logiciels informatiques','100 % teletravail',17,3),(9,'INFOTECH','informatique','infotech france','sarl','6512478963','10 rue test ',50,'info@tech.com','https://www.infotech.fr','https://www.linkedin.com/company/infotech/','6202A - Conseil en systèmes et logiciels informatiques','1j /semaine',17,3),(11,'DIGITAL GROUP','informatique','test france','sarl','651247896','10 rue test ',50,'test@tech.com','https://www.test.fr','https://www.linkedin.com/company/test/','6202A - Conseil en systèmes et logiciels informatiques','1j /semaine',17,3),(12,'SLOUMINFO','informatique','slouminfo france','sarl','0321456987','10 rue info',50,'recrutemet@info.com','https://www.slouminfo.fr','https://www.linkedin.com/company/slouminfo/','6202A - Conseil en systèmes et logiciels informatiques','100 % teletravail',17,1),(20,'AIR FRANCE','transport','air france','sarl','0369852147','10 rue info',850,'recrutement@airfrance.com','https://www.airfrance.fr','https://www.linkedin.com/airfrance/','6202A - Conseil en systèmes et logiciels informatiques','1j /semaine',19,1),(22,'NIKE','sport','nike france','sarl','032145698','10 rue test ',1533,'recrutement@nike.com','https://www.nike.fr','https://www.nike.com/edf/','6202A - Conseil en systèmes et logiciels informatiques','2j/semaine',17,1),(23,'COLAS','batiment','colas france','sarl','0215698741','12 rue du gard 75008 paris',1533,'colas@gmail.com','https://www.colas.fr','https://www.colas.com','6202A - Conseil en systèmes et logiciels informatiques','100% teletravail',17,1),(24,'SIGMA VISION','informatique','sigma vision france','sarl','0321569874','12 rue du gard',50,'segam@vision.fr','https://www.segma-vision.fr','https://www.seggma-vision.com/edf/','6202A - Conseil en systèmes et logiciels informatiques','100 % teletravail',17,1),(26,'CAPGEMINI','informatique','capgemini france','sarl','0321569872','12 rue du gard 75008 paris',253,'cap@recrutement.fr','https://www.capgemini.fr','https://www.linkedin.com/capgemini/','6202A - Conseil en systèmes et logiciels informatiques','100% teletravail',17,1),(28,'COLOMBBUS','informatique','edf france','sarl','0215698749','10rue test',566,'colombus@gmail.com','https://www.colombbus.fr','https://www.linkedin.com/company/colombbus/','6202A - Conseil en systèmes et logiciels informatiques','1j /semaine',17,3);
/*!40000 ALTER TABLE `entreprise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offre_demploi`
--

DROP TABLE IF EXISTS `offre_demploi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offre_demploi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `poste` varchar(255) NOT NULL,
  `lieu_du_poste` varchar(255) DEFAULT NULL,
  `type_de_contrat` varchar(50) DEFAULT NULL,
  `duree_de_contrat` varchar(50) DEFAULT NULL,
  `horaires` varchar(50) DEFAULT NULL,
  `experience` int DEFAULT NULL,
  `salaire` decimal(10,2) DEFAULT NULL,
  `politique_teletravail` text,
  `code_utilisateur` int DEFAULT NULL,
  `code_entreprise` int DEFAULT NULL,
  `statut` int DEFAULT '1',
  `description` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email_candidature` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `code_entreprise` (`code_entreprise`),
  CONSTRAINT `offre_demploi_ibfk_1` FOREIGN KEY (`code_entreprise`) REFERENCES `entreprise` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offre_demploi`
--

LOCK TABLES `offre_demploi` WRITE;
/*!40000 ALTER TABLE `offre_demploi` DISABLE KEYS */;
INSERT INTO `offre_demploi` VALUES (3,'Developpeur fullstack','Paris','CDI','','9h-17h',3,35000.00,'2j/semaine',NULL,4,3,'Description du poste\nAlphalives, basée dans le 13ème arrondissement de Paris est une agence Web de conseil et de développement Internet spécialisée depuis 22 ans dans la création de projets Web et applications mobiles.\n\nNotre agence de développement (8 personnes) recherche dans le cadre d\'une augmentation d\'activité, des personnes ayant de bonnes compétences et expériences dans le développement web PHP.\n\nVous aurez pour missions de :\n\ndévelopper des sites web sur mesure en PHP/MySQL avec le framework Laravel, ainsi que jQuery et Bootstrap.\ndévelopper des applications mobiles hybrides (front-end et/ou back-end ) sur les différentes plateformes (capacitorjs / ionic / nextjs / angular).\nréaliser des spécifications techniques\ntester les développements\ndéployer les sites et applications\nProfil recherché :\n\nDiplômé(e) d\'un Bac + 2 ou Bac + 5 en informatique, avoir fait de l\'alternance est un plus.\nExpérience sur PHP/MySQL, Laravel\nCompétences sur jQuery, HTLM, CSS, Bootstrap\nPro-actif(ve), rigoureux(se) et passionné(e) pour les nouvelles technologies et les métiers du développement logiciel et Saas.','recrutement@ancf.fr'),(4,'Developpeur backend','Paris','CDI','','9h-17h',3,35000.00,'4j/semaine',NULL,4,3,'Rattaché·e au Responsable développement du groupe, vous intégrerez une équipe de 5 personnes et travaillerez sur un tout nouveau pan du système d\'information visant à fluidifier les échanges de données entre les différentes usines et le groupe. Cette partie applicative reposera sur une architecture back-end orientées services s\'appuyant soit sur Node.js soit sur du Pyhon avec FastApi. Mais le plus gros du travail sera centré sur le requêtage des données au travers de multiples bases de données relationnelles, le SQL sera donc votre compagnon le plus fidèle dans votre quotidien. Diplômé·e en informatique, vous justifiez d\'une expérience post diplôme de 2 ans grand minimum au cours de laquelle vous avez acquis de solides compétences en requêtage de bases de données SQL et si possible un peu de pratique en développement back-end web quel que soit le langage utilisé du moment que vous maitrisez bien les concepts de la programmation orienté objet et le fonctionnement d\'une API REST.\n\nLes responsabilités\n\nConception technique\nDéveloppement de fonctionnalités\nMise en place de tests','recrutement@ancf.fr'),(5,'Developpeur frontend','Paris','CDI','','9h-17h',3,35000.00,'2j/semaine',NULL,4,3,'Principales tâches :\nDéveloppement front :\nMigrer le code existant de Nuxt2/Vue2 vers Nuxt3/Vue3\nCréation de composants en Vue / API de composition\nMise en place des tests unitaires / intégrations\n\nRespect des bonnes pratiques de développement (tests unitaires, code review, code coverage, accessibilité, core web vitals)\nMise de place de solutions techniques qualitatives (performance, maintenabilité, accessibilité,...)\nMaintenance corrective et évolutive sur web et mobile\nParticiper aux mises en production des assets\n\nHard skills\nMaîtrise des langages : Javascript, Typescript\nMaîtrise des frameworks/librairies : Vue3, Nuxt3, Vitest, Jest, Sass, BEM\nMaîtrise des outils : Git, npm\nAvoir déjà évolué dans le cadre d?une équipe Agile (scrum)\nConnaissance de l?intégration continue avec GitlabCI\nExpérience dans le secteur du e-commerce (Google Analytics / Google Tag Manager / SEA / SEO)\n\nSoft skills\nGeek / force de proposition sur des choix techniques / veille tech\nChallenge son équipe et son TL\nAutonome\nBon relationnel\nCurieux','recrutement@ancf.fr'),(6,'Developpeur javascript','Paris','CDI','','9h-17h',3,35000.00,'2j/semaine',NULL,4,3,'Capgemini, qu’est-ce que cela évoque ?\nSelon nous, c’est une success story à la Française qui regroupe aujourd’hui plus de 320 000 collaborateurs dans le monde. Celle d’une start-up née il y a 50 ans, qui est aujourd’hui n°1 des ESN en France et en Europe et l’un des leaders mondiaux du conseil, des services informatiques et de la transformation numérique.\nAu sein du groupe Capgemini, ce poste est à pourvoir au sein de l’entité software engineering de Sophia Antipolis, agence à taille humaine composée d’environ 100 personnes. Notre expertise est dédiée aux métiers de l’ingénierie et de la R&D sur les produits et systèmes industriels dans plusieurs secteurs d’activités (Aéronautique&Aérospatiale, Ferroviaire, Maritime, Nucléaire, Télécommunications). Notre agence est spécialisée dans le logiciel embarqué, le développement et l’intégration d’applications industrielles lourdes ou encore le développement d’applications Web.\n\nLes missions ?\nDans un contexte de travail dynamique et challengeant, nous recherchons un développeur pour travailler sur l’assistance du portail web de notre client.\nVous travaillerez en équipe sur des technologies en Java, Javascript, HTLM et Angular principalement.\nVos tâches principales seront de développer les fonctionnalités de l’assistance du portail web et d’effectuer la mise en place et l’exécution des plans de test.\nEn parallèle vous aurez aussi pour responsabilité de gérer la maintenance en conditions opérationnelles et de faire les corrections en respectant les normes de l’application.\n\nVotre profil\n\nVous avez une expérience d’au moins 1 an en tant que développeur web ?\nVous maitrisez l’agilité ?\nVous avez une excellente communication écrite et orale ?\nVous avez des compétences en Webservice ?\nLe petit plus : Vous avez des connaissances en Devops.','recrutement@ancf.fr'),(7,'Boucher','paris','cdi','cdi','39h/semaine',12,35000.00,'non',NULL,8,3,'Rejoignez-nous dès aujourd\'hui !\n\nTravailler chez Colruyt c\'est d\'abord un état d\'esprit ;\nEn confiance et en collaboration active avec ses collègues ;\nEn nouant des partenariats responsables avec ses fournisseurs ;\nEn collaborant étroitement avec chacun des services ;\n\nTRAVAILLER ENSEMBLE\n#faireensemble #grandirensemble #rêverensemble\n\nVous avez un savoir-faire en tant que Boucher(ère) ? Alors venez travailler au sein de l\'une de nos boucheries et vous pourrez faire valoir votre professionnalisme en travaillant uniquement de la génisse charolaise classification UR de tradition française, le veau qualité, l\'agneau français.\n\nVous pourrez également fabriquer des préparations maison dans un labo de qualité.\nGrace à votre sourire et vos compétences, emmenez les clients dans votre univers afin qu\'ils deviennent des as de la cuisine.\n\nOccuper un poste de Boucher(ère) chez Colruyt, c\'est l\'opportunité d\'exercer votre métier proche de chez vous et de manière traditionnelle.\n\nVous bénéficierez des avantages et des formations du groupe Colruyt : chaque heure travaillée est pointée et donc rémunérée + prime de fin d\'année + Comité d\'entreprise + Ticket Restaurant + Mutuelle et prévoyance + Carte salarié avec des réductions sur vos achats en magasin.\n\nVous bénéficierez des avantages et des formations du groupe Colruyt : chaque heure travaillée est pointée et donc rémunérée + prime de fin d\'année + Comité d\'entreprise + Ticket Restaurant + Mutuelle et prévoyance + Carte salarié avec des réductions sur vos achats en magasin.','recrutement@ancf.fr'),(8,'Developpeur','paris','cdi','temp plein','39h/semaine',1,45000.00,'3j/semaine',19,20,3,'Profil recherché\n\nVous justifiez d\'une expérience significative ( > 4 ans) dans le développement PHP / LARAVEL\nPrincipales missions\n\nPrendre en main les projets existants, les maîtriser et les faire évoluer\nProposer des recommandations pour améliorer les différents projets\nAutonomie, autoformation et veille\nParticiper au développement du front-officeback-office et des algorithmes\nAnalyser les problématiques liées au développement et proposer des solutions adaptées aux besoins\nCompétences recherchées\n\nVous avez déjà codé un ou plusieurs projets en PHP et êtes en capacité de les présenter (projets personnels acceptés).\nVous êtes compétent PHP / LARAVEL\nVous savez manipuler une base de donnée MySQL via l\'interface PHPMyAdmin et via des requêtes PHP (insert, select, update...).\nTester votre code et supprimer les erreurs,\nDébogguer\nCompétences appréciées\n\nAnglais technique\nNotions de référencement\nNiveau d\'études : Bac +2 et +\nExpérience : > 3 ans\nRespect des bonnes pratiques établies\nFacilité à comprendre un développement existant (programmation procédurale et objet)\nQualités recherchées\n\nPassion du web\nCuriosité\nRigueur et implication\nSouplesse et capacité d’adaptation\ndynamisme\nadaptabilité','recrutement@ancf.fr'),(9,'Commercial','paris','cdi','temp plein','39h/semaine',12,35000.00,'2j/semaine',NULL,23,1,'Notre Entreprise :\n\nEduneo regroupe des écoles spécialisées dans les formations à distance pour les particuliers, dans des domaines porteurs et passionnants.\n\nLe rôle du Groupe EDUNEO est d’accompagner ses écoles à distance (EDAA, EDAA Pix, EFM Fonction Publique, EFM Santé Social) et école en présentiel (BLOT) :\n\nDans leurs projets\n\nSur les expertises métiers Marketing, Communication, RH,...\n\nEt plus particulièrement sur la démarche commerciale : dans la vente de formations à distance pour les particuliers.\n\nEn fort développement, notre groupe est à ce jour constitué d’environ 150 salariés répartis sur 4 sites dans le Nord de la France et dans la Marne.\n\nVos missions :\n\nEn tant que Manager/Chef(fe) de ventes votre objectif est de recruter, former, et manager votre équipe composée de commerciaux en télétravail, et de développer la performance commerciale en fonction des objectifs établis par la Direction Générale.\nCe que nous attendons de vous :\n\nRecruter et assurer la formation et la montée en compétences de votre équipe\nMettre en place des actions pour motiver et fédérer vos collaborateurs\nAnimer au quotidien vos commerciaux (écoutes, contrôles, entretiens, plan de progrès)\nEffectuer un reporting d\'activité régulier auprès de la direction.','recrutement@ancf.fr'),(10,'Developpeur','paris','cdi','cdi','39h/semaine',12,42000.00,'100% teletravail',17,22,3,'Profil recherché\n\nVous justifiez d\'une expérience significative ( > 4 ans) dans le développement PHP / LARAVEL\nPrincipales missions\n\nPrendre en main les projets existants, les maîtriser et les faire évoluer\nProposer des recommandations pour améliorer les différents projets\nAutonomie, autoformation et veille\nParticiper au développement du front-officeback-office et des algorithmes\nAnalyser les problématiques liées au développement et proposer des solutions adaptées aux besoins\nCompétences recherchées\n\nVous avez déjà codé un ou plusieurs projets en PHP et êtes en capacité de les présenter (projets personnels acceptés).\nVous êtes compétent PHP / LARAVEL\nVous savez manipuler une base de donnée MySQL via l\'interface PHPMyAdmin et via des requêtes PHP (insert, select, update...).\nTester votre code et supprimer les erreurs,\nDébogguer\nCompétences appréciées\n\nAnglais technique\nNotions de référencement\nNiveau d\'études : Bac +2 et +\nExpérience : > 3 ans\nRespect des bonnes pratiques établies\nFacilité à comprendre un développement existant (programmation procédurale et objet)\nQualités recherchées\n\nPassion du web\nCuriosité\nRigueur et implication\nSouplesse et capacité d’adaptation\ndynamisme\nadaptabilité','recrutement@ancf.fr'),(11,'Devops','paris','cdi','temp plein','39h/semaine',6,45000.00,'100% teletravail',17,9,3,'Description du poste\n\nAu sein de la Direction Digital et Data et plus particulièrement au sein du Digital Conso Lab, vous intégrerez l\'équipe OPS en charge de la plateforme e-commerce d’Intermarché.\n\nEn tant que DevOps vous serez amené à travailler en coordination avec les équipes OPS, QA, DEV, Delivery Manager des équipes digitales.\n\nVous serez rattaché au manager du pôle et ferez partie d\'une équipe composée d’une dizaine de collaborateurs\n\nLa plateforme e-commerce est hébergée en mode hybride (On Premise + Cloud) dans un contexte de modernisation et d’amélioration en continue. L’écosystème global dépend également d’autres solutions de partenaires que nous pilotons.\n\nLe contexte vous plait ? Découvrez votre quotidien au sein de votre future équipe.\n\n\nVos missions\n\nMaintenir en condition opérationnelle les infrastructures virtualisées en diagnostiquant les pannes et les dysfonctionnements\nConfigurer et dimensionner les plateformes en fonction des performances requises\nIndustrialiser les architectures cibles et configurer les équipements (CI / CD)\nMettre en place des procédures et outils de surveillance permettant de garantir la haute disponibilité des infrastructures\nVeiller à la sauvegarde des données, à la sécurité des accès (mise en place des systèmes de gestion des droits des utilisateurs) et à la fiabilité des solutions déployées\nParticiper aux phases de validation technique lors des mises en production ou des évolutions.','recrutement@ancf.fr'),(12,'Developpeur','Maeseille','cdi','temp plein','39h/semaine',6,35000.00,'100% teletravail',17,26,3,'Profil recherché\n\nVous justifiez d\'une expérience significative ( > 4 ans) dans le développement PHP / LARAVEL\nPrincipales missions\n\nPrendre en main les projets existants, les maîtriser et les faire évoluer\nProposer des recommandations pour améliorer les différents projets\nAutonomie, autoformation et veille\nParticiper au développement du front-officeback-office et des algorithmes\nAnalyser les problématiques liées au développement et proposer des solutions adaptées aux besoins\nCompétences recherchées\n\nVous avez déjà codé un ou plusieurs projets en PHP et êtes en capacité de les présenter (projets personnels acceptés).\nVous êtes compétent PHP / LARAVEL\nVous savez manipuler une base de donnée MySQL via l\'interface PHPMyAdmin et via des requêtes PHP (insert, select, update...).\nTester votre code et supprimer les erreurs,\nDébogguer\nCompétences appréciées\n\nAnglais technique\nNotions de référencement\nNiveau d\'études : Bac +2 et +\nExpérience : > 3 ans\nRespect des bonnes pratiques établies\nFacilité à comprendre un développement existant (programmation procédurale et objet)\nQualités recherchées\n\nPassion du web\nCuriosité\nRigueur et implication\nSouplesse et capacité d’adaptation\ndynamisme\nadaptabilité','recrutement@ancf.fr'),(14,'Infirmier','Paris','cdd','6 mois','temps plein',3,10000.00,'hybride',NULL,4,3,'Située dans un parc privé de 8 hectares, la Maison de retraite Saint Rémy se présente comme un village composé d\'une Résidence Services pour des Personnes âgées valides et autonomes, ainsi que d\'un EHPAD avec des unités de soins adaptés dédiées aux personnes atteintes de maladies de type Alzheimer.\n\nParking gratuit sur place et accès possible grâce à une navette gratuite adaptée depuis la gare de St Rémy (RER B).\n\nNous recherchons un(e) infirmier(ère) motivé(e) pour rejoindre notre équipe et prendre soin des résidents et de leur famille dans la durée.\n\nVOS MISSIONS:\n\nRattaché.e au Cadre de santé, vous travaillerez en collaboration avec un.e IDEC et l’équipe d’IDE et serez entouré.e d’une équipe pluridisciplinaire pour vous concentrer sur votre cœur de métier :\n\nAssurer la continuité des soins techniques, la bonne prise en charge des résidents et leur sécurité\nEchanger avec les familles pour les rassurer, les tenir informées\nContrôler et gérer les matériels et les produits\nVeiller à la traçabilité des soins en collaboration avec l’équipe soignante\n*','recrutement@ancf.fr'),(15,'Devops','paris','CDD','12 mois','39h/semaine',12,45000.00,'100% teletravail',NULL,28,1,'Description du poste Au sein de la Direction Digital et Data et plus particulièrement au sein du Digital Conso Lab, vous intégrerez l\'équipe OPS en charge de la plateforme e-commerce d’Intermarché. En tant que DevOps vous serez amené à travailler en coordination avec les équipes OPS, QA, DEV, Delivery Manager des équipes digitales. Vous serez rattaché au manager du pôle et ferez partie d\'une équipe composée d’une dizaine de collaborateurs La plateforme e-commerce est hébergée en mode hybride (On Premise + Cloud) dans un contexte de modernisation et d’amélioration en continue. L’écosystème global dépend également d’autres solutions de partenaires que nous pilotons. Le contexte vous plait ? Découvrez votre quotidien au sein de votre future équipe. Vos missions Maintenir en condition opérationnelle les infrastructures virtualisées en diagnostiquant les pannes et les dysfonctionnements Configurer et dimensionner les plateformes en fonction des performances requises Industrialiser les architectures cibles et configurer les équipements (CI / CD) Mettre en place des procédures et outils de surveillance permettant de garantir la haute disponibilité des infrastructures Veiller à la sauvegarde des données, à la sécurité des accès (mise en place des systèmes de gestion des droits des utilisateurs) et à la fiabilité des solutions déployées Participer aux phases de validation technique lors des mises en production ou des évolutions.','recrutement@ancf.fr'),(16,'Developpeur front-end','paris','CDI','temp plein','39h/semaine',12,65000.00,'100% teletravail',NULL,26,3,'Principales tâches : Développement front : Migrer le code existant de Nuxt2/Vue2 vers Nuxt3/Vue3 Création de composants en Vue / API de composition Mise en place des tests unitaires / intégrations Respect des bonnes pratiques de développement (tests unitaires, code review, code coverage, accessibilité, core web vitals) Mise de place de solutions techniques qualitatives (performance, maintenabilité, accessibilité,...) Maintenance corrective et évolutive sur web et mobile Participer aux mises en production des assets Hard skills Maîtrise des langages : Javascript, Typescript Maîtrise des frameworks/librairies : Vue3, Nuxt3, Vitest, Jest, Sass, BEM Maîtrise des outils : Git, npm Avoir déjà évolué dans le cadre d?une équipe Agile (scrum) Connaissance de l?intégration continue avec GitlabCI Expérience dans le secteur du e-commerce (Google Analytics / Google Tag Manager / SEA / SEO) Soft skills Geek / force de proposition sur des choix techniques / veille tech Challenge son équipe et son TL Autonome Bon relationnel Curieux','recrutement@test.com'),(17,'Jardinier','paris','CDD','12 mois','39h/semaine',6,35000.00,'nom',NULL,11,3,'Présentation de l’entreprise :\n\nNous recherchons pour l’un de nos clients un/une JARDINIER(ÈRE) pour un poste situé sur le secteur de Galluis (78) en CDI à temps plein.\n\nVous travaillerez pour un groupe expert dans le monde végétal et animal qui regroupe 7 jardineries et une pépinière de production en Ile de France et Normandie.\n\nIntégrer un grand groupe mais qui a encore une dimension « familiale », c\'est se donner la possibilité de monter en compétences et d\'évoluer en interne tout en étant considéré(e).\nVous trouverez assurément des valeurs d\'investissement, d\'entraide et de réussite partagée.\n\nMissions :\n\nAu quotidien, vous travaillerez sur 2 sites (sur la même ville) et vous aurez en charge :\n\n- D’effectuer l\'entretien des surfaces par le ramassage des feuilles, le décapage de la mousse ou le débroussaillage ;\n\n- De réaliser l\'entretien des gazons ;\n\n- De réguler la croissance des plantes en apportant les éléments nécessaires (eau, engrais, traitements phytosanitaires...)\n\n- D\'assurer de l\'entretien des différents bacs à fleurs ;\n\n- De tailler les arbres et arbustes pour travailler des formes ;\n\n- De faire des semis ou plantations ornementales ;\n\n- Toutes autres tâches en lien avec l\'entretien des espaces verts…\n\nProfil recherché :\n\nVous aimez les végétaux, c’est indiscutable.\n\nIdéalement issu d\'une formation Horticole, vous avez une expérience de 2 ans minimum dans les métiers du paysage.\n\nVous connaissez les techniques et les contraintes de chantier d\'espace vert et savez utiliser le matériel type débroussailleuse, tondeuse, taille-haie, tronçonneuse.\n\nVous avez un bon sens de la communication et du contact, vous serez en effet amené(e) à communiquer avec les usagers des 2 sites.\n\nVous savez travailler seul et en autonomie.\n\nLe Permis B est indispensable puisqu’il faudra vous déplacer régulièrement sur les 2 sites.','jardiland@recrutement.fr'),(18,'Infirmier','paris','CDI','temp plein','39h/semaine',12,35000.00,'non',NULL,11,1,'Située dans un parc privé de 8 hectares, la Maison de retraite Saint Rémy se présente comme un village composé d\'une Résidence Services pour des Personnes âgées valides et autonomes, ainsi que d\'un EHPAD avec des unités de soins adaptés dédiées aux personnes atteintes de maladies de type Alzheimer.\n\nParking gratuit sur place et accès possible grâce à une navette gratuite adaptée depuis la gare de St Rémy (RER B).\n\nNous recherchons un(e) infirmier(ère) motivé(e) pour rejoindre notre équipe et prendre soin des résidents et de leur famille dans la durée.\n\nVOS MISSIONS:\n\nRattaché.e au Cadre de santé, vous travaillerez en collaboration avec un.e IDEC et l’équipe d’IDE et serez entouré.e d’une équipe pluridisciplinaire pour vous concentrer sur votre cœur de métier :\n\nAssurer la continuité des soins techniques, la bonne prise en charge des résidents et leur sécurité\nEchanger avec les familles pour les rassurer, les tenir informées\nContrôler et gérer les matériels et les produits\nVeiller à la traçabilité des soins en collaboration avec l’équipe soignante\n*','hp@recrutement.fr'),(19,'Mecanicien','paris','CDD','6 mois','39h/semaine',6,40000.00,'non',NULL,11,3,'Chez Durand Services, nos MECANICIENS PL (H/F) partagent la même vision et la même envie : Assurer un service au top du top pour satisfaire nos clients\n\nÊtes-vous prêt(e) à rejoindre une équipe technique dynamique et ambitieuse qui se donne à 100% pour être la meilleure aux yeux de ses clients ?\n\nSpécialiste de la vente de pièces détachées automobiles et poids lourds à destination des professionnels et des particuliers, Durand Services est un groupe familial reconnu comme un acteur majeur en région Rhône-Alpes Auvergne. L’entreprise possède en outre ses propres ateliers intégrés VL et PL.\n\nVous aurez pour principales missions les opérations de diagnostic, d’entretien et de réparation des véhicules PL / Autocars et Utilitaires\n\nAlors ? La technique est votre domaine. Le poids lourd est votre passion. La satisfaction client est votre motivation. Postulez chez Durand Services\n\nTélétravail\n\nNon\nType d\'emploi : CDI, Temps plein\n\nAvantages :\n\nTitre-restaurant\nProgrammation :\n\nDu lundi au vendredi\nPériode de travail de 8 Heures\nTravail en journée\nLieu du poste : En présentiel','meca@recrutement.fr');
/*!40000 ALTER TABLE `offre_demploi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'utilisateur'),(2,'candidat'),(3,'recruteur'),(4,'administrateur');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_competence`
--

DROP TABLE IF EXISTS `type_competence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_competence` (
  `id` int NOT NULL AUTO_INCREMENT,
  `aptitude` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_competence`
--

LOCK TABLES `type_competence` WRITE;
/*!40000 ALTER TABLE `type_competence` DISABLE KEYS */;
INSERT INTO `type_competence` VALUES (1,'competence_technique'),(2,'competence_relationnel'),(3,'informatique'),(4,'informatique'),(5,'informatique'),(6,'informatique'),(7,'Santé'),(8,'informatique'),(9,'informatique'),(10,'informatique'),(11,'informatique'),(12,'espaces vert'),(13,'medical'),(14,'automobile');
/*!40000 ALTER TABLE `type_competence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `civilite` varchar(20) NOT NULL,
  `nom` varchar(60) NOT NULL,
  `prenom` varchar(110) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `poste_recherche` varchar(255) DEFAULT NULL,
  `experience` varchar(50) DEFAULT NULL,
  `mobilite_geographique` int DEFAULT NULL,
  `code_role` int DEFAULT NULL,
  `statut` int NOT NULL DEFAULT '1',
  `rue` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `codePostal` int DEFAULT NULL,
  `rqth` varchar(255) DEFAULT NULL,
  `numero_telephone` varchar(25) DEFAULT NULL,
  `photo_profile` varchar(255) DEFAULT NULL,
  `cv` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `numero_telephone` (`numero_telephone`),
  KEY `code_role` (`code_role`),
  CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`code_role`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` VALUES (1,'Madame','Twenae','Louise','ab@gmailmm.com','$2b$10$j3KI.FsVjC/2I3clXvk2iufsBsNtf.e8TA3zG564FVk2qIHMvYBLi','Devops','8',0,2,1,'4 Allée Basse du Village Anglais','Paris',75001,NULL,'0123654769',NULL,NULL),(2,'Madame','Diacre','Rose','test123@gmailmm.com','$2b$10$M4.SMQQfpqa.G1Nv1DNNFej5RqT/rfPSOaTjATYZJkphgyPOwGqEG','Developpeu Fulstack','5',0,2,1,' 46 Allée des Platanes','Marseille',13000,NULL,'0123654789',NULL,NULL),(6,'Monsieur','Admin','Laurent','test789@gmailmm.com','$2b$10$am51lrHl6LpEI06UFdxLs.foRMjK1gFMijjaExM.VmdP/J6Ix8FGK','','',0,4,3,'1 Allée Santos-Dumont','Paris',75001,NULL,'0258963214',NULL,NULL),(8,'Madame','Toni','Lea','abc@gmailmm.com','$2b$10$rDsF9sOhuTDzrOk5MSse2.KgnQY5WGFjkkQidlwO25E31CC5mjxMO',NULL,'',0,3,3,'12 	AV DESPREAUX','Lyon',69000,NULL,'0321456323',NULL,NULL),(9,'Madame','Fabre','Ines','aebc@gmailmm.com','$2b$10$kSRrAt5EztKI2bZdfJizJ.mteofEpgugIHckLiRokvDX2gAI/.tr.','','',0,3,3,'1 Chemin de la Motte','Paris',75001,NULL,'0432156987',NULL,NULL),(10,'Monsieur','Tahar','Rahim','sloumbim@gmail.com','$2b$10$yH6dKGgk..cP9LpJcPnSbONAyzTqvfPxIvunKa7ree7iryFPDG7O2','Developpeur backend','6',4,2,3,'2 Chemin du Calvaire','Lille',59000,'1699605793103-thunder-file_6c03436e.pdf','0532145697',NULL,NULL),(11,'Monsieur','Gonzales','Elliot','test8@gmail.com','$2b$10$fNrmvOLePDO/zgb1N8mJXOTgfTJiI1TAwaOrSDd/bWkXYtfCbTWEC','Data scientist','5',11111,2,3,' 12 Esplanade des Courtieux','Paris',75001,'1699605822480-thunder-file_6c03436e.pdf','0698745632',NULL,NULL),(12,'Monsieur','Mani','Tony','test9@gmail.com','$2b$10$6qRfmoeN0mbsX9HNiS.n4.RYCXqoh92rX64gZTjy94vWiEfCYlgA6','Aiguilleur','12',3,2,3,' 52 Quai Léon Blum','Lyon',69000,'1699605850834-thunder-file_6c03436e.pdf','0732145698',NULL,NULL),(13,'Monsieur','Flamby','Marc','sb@gmail.com','$2b$10$T.zv5zauWr5w9rlTUBSOUO7NMmGYmiVyIBM9JPMROxADdq6POF1i.','Developpeur','1',5,2,1,'56 Quai Marcel Dassault','Marseille',13000,'1699605881029-thunder-file_6c03436e.pdf','0896321456',NULL,NULL),(14,'Monsieur','Mahrez','Riyad','zxc@gmail.com','$2b$10$poED/W2fXHtSxbEGwgZiDOaaDbIC.jLmwJrLCsmjZjZcid0RqjzQK',NULL,'',0,3,3,' 663 Esplanade des Courtieux','Paris',75001,NULL,'0954789632',NULL,NULL),(15,'Monsieur','Sadio','Mane','ab@gmail.com','$2b$10$Jztn4VXp0Oy38EpJRBaWAOkxYJbKkQqsmtFMDhboO82O2ALPiJu2W','Developpeur Frontend','12',6,2,3,' 552 Square de la Concorde','Bordeaux',33000,'1706175626301-badge.pdf','0111236547','1706088809670-T039P7U66-U049JUS8PDL-863dbb686e37-512.jpg','1704216687348-Plaquette d\'intÃ©gration 2O23 - Abdesselam BIMKHIOUAD.pdf'),(16,'Madame','Mary','Curry','s@gmail.com','$2b$10$xuzYJVpVsKzxnhIOf0KfQueQ189cJE6hzUBVv1zb/DSRTfgsWjCBm','RH','6',1,2,1,'8 Villa de la Station','Angers',49000,'1699605916611-thunder-file_6c03436e.pdf','0225896321',NULL,NULL),(17,'Monsieur','test','test','rh@gmail.com','$2b$10$5UmkZ.XmASnC4cnx/Xg/9uoxH5A06XMhDqsBjTLvS45lKfI0IJqoy',NULL,'',0,3,3,'78  Esplanade des Courtieux','Lyon',69000,NULL,'0123658963','1704293056651-1280px-Logo_SNCF_(2005).svg.png',NULL),(19,'Madame','Didier','Deshamps','rh2@gmail.com','$2b$10$gkXw34tq66n5wxNIKM0l8.yiX1AvC5EeIk6k16zDszoww95I/iL8K','','',0,3,3,'56 Quai du Général Gallieni','Angers',49000,NULL,'044456987',NULL,NULL),(103,'Madame','Heux','debert','pdf@gmail.com','$2b$10$wl0yJ6ZZnZJZokrgzZ4N0.Cl57yXX8f89s51h/.365/C.QzQXIkUm','Developpeur Frontend','6',1,2,1,'56 Villa de la Station','Paris',75001,NULL,'0555563214',NULL,NULL),(104,'Monsieur','Thierry','Henry','th@gmail.com','$2b$10$znZ90JNbTT9yuwsLQCq0TedI/ZIuhhz5cImDtOsXU5aBiv4SOXpuu','Commercial','6',20,2,1,'12 rue test','Paris',75001,NULL,'0669874563','1704293923593-team2.jpg',NULL),(106,'Madame','Jean','Pierre','abc@gmail.com','$2b$10$eTPZQPhcWuH9ym5ZSHG.KOJfamJR1jJw6BbqR56EDZYu09xZTL2Zu','Conducteur de train','6',1,2,1,'89 Quai du Général Gallieni','Paris',75001,NULL,'0778987413',NULL,NULL),(110,'Monsieur','louis','amstrong','l@gmail.com','$2b$10$mRgITEB2QEtKpd9nVJva3.mLBEvEApkgIi/DgsHZsOygUkBn90zmK','Bijoutier','12',1,2,1,'12 rue Clavire','Bordeaux',33000,NULL,'0321456987',NULL,NULL),(112,'Autre','Maurice','Hubert','ma@gmail.com','$2b$10$.d4cYjDA.BjZBdvdrF.d7.A6XEFOCqXbUT4w.aHYEDuY/YiOWKjYi','Chef de projet','1',1,2,3,'1203 rue Bellvue','Marseille',13000,NULL,'0321456980','1702336582641-team2.jpg',NULL),(116,'Monsieur','','newlpastname3l','r@gmail.com','$2b$10$z1uUl4bhcsXsk9Dgrt.3LO.HCMJTeesdQ7P1OMZkxPKBDzuCl3iOK','','',0,3,3,'99 Quai du Général Gallieni','suresnes',92150,NULL,'0563214563',NULL,NULL),(120,'Monsieur','pp','pp','pp@gmail.com','$2b$10$oZmehEytK25cpulNNcpoKOvXnG35PNvUSy9sjO4qtzeqc7IsDdxEG','developpeur frontend','6',2,2,1,'12 rue test','vnbcvncvn',75001,NULL,'0523654789',NULL,NULL),(121,'','rc','rc','rc@gmail.com','$2b$10$mR18HHFALZIDOoqaqUYsWeTiWyO45A3hrk8Rw7zlNhWMquRt4TyNW','','',0,3,1,'12 rue test','suresnes',92150,NULL,'',NULL,NULL);
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur_competence`
--

DROP TABLE IF EXISTS `utilisateur_competence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur_competence` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code_utilisateur` int DEFAULT NULL,
  `code_competence` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `code_utilisateur` (`code_utilisateur`),
  KEY `code_competence` (`code_competence`),
  CONSTRAINT `utilisateur_competence_ibfk_1` FOREIGN KEY (`code_utilisateur`) REFERENCES `utilisateur` (`id`),
  CONSTRAINT `utilisateur_competence_ibfk_2` FOREIGN KEY (`code_competence`) REFERENCES `competence` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur_competence`
--

LOCK TABLES `utilisateur_competence` WRITE;
/*!40000 ALTER TABLE `utilisateur_competence` DISABLE KEYS */;
INSERT INTO `utilisateur_competence` VALUES (1,15,1),(2,15,2),(3,15,3);
/*!40000 ALTER TABLE `utilisateur_competence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur_critere_handicap`
--

DROP TABLE IF EXISTS `utilisateur_critere_handicap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur_critere_handicap` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code_utilisateur` int DEFAULT NULL,
  `code_Critere_handicap` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `code_utilisateur` (`code_utilisateur`),
  KEY `code_Critere_handicap` (`code_Critere_handicap`),
  CONSTRAINT `utilisateur_critere_handicap_ibfk_1` FOREIGN KEY (`code_utilisateur`) REFERENCES `utilisateur` (`id`),
  CONSTRAINT `utilisateur_critere_handicap_ibfk_2` FOREIGN KEY (`code_Critere_handicap`) REFERENCES `critere_handicap` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur_critere_handicap`
--

LOCK TABLES `utilisateur_critere_handicap` WRITE;
/*!40000 ALTER TABLE `utilisateur_critere_handicap` DISABLE KEYS */;
/*!40000 ALTER TABLE `utilisateur_critere_handicap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur_offre_demploi`
--

DROP TABLE IF EXISTS `utilisateur_offre_demploi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur_offre_demploi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code_utilisateur` int DEFAULT NULL,
  `code_offre_demploi` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `code_utilisateur` (`code_utilisateur`),
  KEY `code_offre_demploi` (`code_offre_demploi`),
  CONSTRAINT `utilisateur_offre_demploi_ibfk_1` FOREIGN KEY (`code_utilisateur`) REFERENCES `utilisateur` (`id`),
  CONSTRAINT `utilisateur_offre_demploi_ibfk_2` FOREIGN KEY (`code_offre_demploi`) REFERENCES `offre_demploi` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=215 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur_offre_demploi`
--

LOCK TABLES `utilisateur_offre_demploi` WRITE;
/*!40000 ALTER TABLE `utilisateur_offre_demploi` DISABLE KEYS */;
INSERT INTO `utilisateur_offre_demploi` VALUES (9,112,3),(10,112,4),(11,112,5),(12,112,7),(13,112,11),(14,112,3),(15,112,3),(19,110,3),(20,110,4),(21,110,5),(22,110,3),(23,110,7),(24,110,10),(25,106,3),(26,106,4),(27,106,5),(28,106,7),(29,106,8),(30,106,6),(31,106,10),(32,106,5),(33,106,8),(34,106,11),(35,106,12),(36,106,3),(37,106,10),(38,106,11),(39,106,9),(40,106,4),(41,106,7),(42,106,7),(43,103,4),(44,103,5),(45,103,10),(46,103,4),(174,17,15),(182,17,16),(183,17,17),(184,17,18),(185,17,19),(203,15,3),(209,15,7),(210,15,8),(211,15,5),(213,15,14),(214,15,4);
/*!40000 ALTER TABLE `utilisateur_offre_demploi` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-04 19:54:48
