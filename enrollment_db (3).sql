-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2025 at 01:26 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `enrollment_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `institute_tbl`
--

CREATE TABLE `institute_tbl` (
  `ins_id` int(11) NOT NULL,
  `ins_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `institute_tbl`
--

INSERT INTO `institute_tbl` (`ins_id`, `ins_name`) VALUES
(1, 'College of Engineering'),
(2, 'College of Information Technology'),
(3, 'College of Business'),
(4, 'College of Education'),
(5, 'College of Arts and Sciences'),
(6, 'College of Arts');

-- --------------------------------------------------------

--
-- Table structure for table `program_tbl`
--

CREATE TABLE `program_tbl` (
  `Program_id` int(11) NOT NULL,
  `program_name` varchar(100) NOT NULL,
  `ins_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program_tbl`
--

INSERT INTO `program_tbl` (`Program_id`, `program_name`, `ins_id`) VALUES
(1, 'BS Civil Engineering', 1),
(2, 'BS Computer Science', 2),
(3, 'BS Information Systems', 2),
(4, 'BS Accountancy', 3),
(5, 'BSEd Major in Math', 4),
(15, 'Accountings', 3);

-- --------------------------------------------------------

--
-- Table structure for table `semester_tbl`
--

CREATE TABLE `semester_tbl` (
  `sem_id` int(11) NOT NULL,
  `sem_name` varchar(50) NOT NULL,
  `year_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `semester_tbl`
--

INSERT INTO `semester_tbl` (`sem_id`, `sem_name`, `year_id`) VALUES
(1, '2nd Semester', 1),
(2, '2nd Semester', 1),
(3, '1st Semester', 2),
(4, '2nd Semester', 2),
(5, 'Summer', 2);

-- --------------------------------------------------------

--
-- Stand-in structure for view `studentsaboveavgallowance`
-- (See below for the actual view)
--
CREATE TABLE `studentsaboveavgallowance` (
`Name` varchar(100)
,`Allowance` double
);

-- --------------------------------------------------------

--
-- Table structure for table `student_load`
--

CREATE TABLE `student_load` (
  `load_id` int(11) NOT NULL,
  `stud_id` int(11) DEFAULT NULL,
  `Subject_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_load`
--

INSERT INTO `student_load` (`load_id`, `stud_id`, `Subject_id`) VALUES
(1, 101, 1),
(2, 102, 2),
(3, 103, 3),
(4, 104, 2),
(5, 103, 2);

-- --------------------------------------------------------

--
-- Table structure for table `student_tbl`
--

CREATE TABLE `student_tbl` (
  `Stud_id` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Program_id` int(11) DEFAULT NULL,
  `Allowance` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_tbl`
--

INSERT INTO `student_tbl` (`Stud_id`, `Name`, `Program_id`, `Allowance`) VALUES
(101, 'Alice Johnson', 1, 1500),
(102, 'Brian Smith', 2, 980.75),
(103, 'Cynthia Lee', 3, 1050),
(104, 'David Kim', 4, 875.25),
(105, 'Ella Brown', 5, 1500),
(106, 'Frank Garcia', 1, 1100),
(107, 'Grace Martinez', 3, 950.4),
(108, 'Henry Wilson', 2, 1000),
(109, 'Isla Moore', 4, 1125.75),
(110, 'Jack Taylor', 5, 850),
(111, 'Karen Anderson', 1, 1300.6),
(112, 'Leo Thomas', 2, 1199.99),
(113, 'Mia White', 4, 1025.5),
(115, 'Olivia Clark', 1, 1055.55),
(116, 'Paul Lewis', 3, 1001.01),
(117, 'Quinn Young', 3, 1234.56),
(118, 'Ruby King', 1, 990),
(119, 'Sam Scott', 2, 975.2),
(120, 'Tina Adams', 5, 1133);

-- --------------------------------------------------------

--
-- Table structure for table `subject_tbl`
--

CREATE TABLE `subject_tbl` (
  `Subject_id` int(11) NOT NULL,
  `subject_name` varchar(100) NOT NULL,
  `sem_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subject_tbl`
--

INSERT INTO `subject_tbl` (`Subject_id`, `subject_name`, `sem_id`) VALUES
(1, 'Introduction to Programming', 1),
(2, 'Data Structures', 2),
(3, 'Database Management', 3),
(4, 'Accounting Principles', 4);

-- --------------------------------------------------------

--
-- Stand-in structure for view `viewaccountancy`
-- (See below for the actual view)
--
CREATE TABLE `viewaccountancy` (
`Student` varchar(100)
,`Program` varchar(100)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `viewallstudents`
-- (See below for the actual view)
--
CREATE TABLE `viewallstudents` (
`Name` varchar(100)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `viewcivil_eng`
-- (See below for the actual view)
--
CREATE TABLE `viewcivil_eng` (
`Student` varchar(100)
,`Program` varchar(100)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `viewcomp_sci`
-- (See below for the actual view)
--
CREATE TABLE `viewcomp_sci` (
`Student` varchar(100)
,`Program` varchar(100)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `viewinfo_sys`
-- (See below for the actual view)
--
CREATE TABLE `viewinfo_sys` (
`Student` varchar(100)
,`Program` varchar(100)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `viewmath`
-- (See below for the actual view)
--
CREATE TABLE `viewmath` (
`Student` varchar(100)
,`Program` varchar(100)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `viewstudentsprogram`
-- (See below for the actual view)
--
CREATE TABLE `viewstudentsprogram` (
`Name` varchar(100)
,`program_name` varchar(100)
);

-- --------------------------------------------------------

--
-- Table structure for table `year_tbl`
--

CREATE TABLE `year_tbl` (
  `year_id` int(11) NOT NULL,
  `year_from` int(11) DEFAULT NULL,
  `year_to` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `year_tbl`
--

INSERT INTO `year_tbl` (`year_id`, `year_from`, `year_to`) VALUES
(1, 2023, 2024),
(2, 2024, 2025),
(3, 2025, 2026),
(4, 2026, 2027),
(5, 2027, 2028);

-- --------------------------------------------------------

--
-- Structure for view `studentsaboveavgallowance`
--
DROP TABLE IF EXISTS `studentsaboveavgallowance`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `studentsaboveavgallowance`  AS SELECT `student_tbl`.`Name` AS `Name`, `student_tbl`.`Allowance` AS `Allowance` FROM `student_tbl` WHERE `student_tbl`.`Allowance` > (select avg(`student_tbl`.`Allowance`) from `student_tbl`) ;

-- --------------------------------------------------------

--
-- Structure for view `viewaccountancy`
--
DROP TABLE IF EXISTS `viewaccountancy`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `viewaccountancy`  AS SELECT `student_tbl`.`Name` AS `Student`, `program_tbl`.`program_name` AS `Program` FROM (`student_tbl` join `program_tbl` on(`student_tbl`.`Program_id` = `program_tbl`.`Program_id`)) WHERE `program_tbl`.`Program_id` = 4 ;

-- --------------------------------------------------------

--
-- Structure for view `viewallstudents`
--
DROP TABLE IF EXISTS `viewallstudents`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `viewallstudents`  AS SELECT `student_tbl`.`Name` AS `Name` FROM `student_tbl` ;

-- --------------------------------------------------------

--
-- Structure for view `viewcivil_eng`
--
DROP TABLE IF EXISTS `viewcivil_eng`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `viewcivil_eng`  AS SELECT `student_tbl`.`Name` AS `Student`, `program_tbl`.`program_name` AS `Program` FROM (`student_tbl` join `program_tbl` on(`student_tbl`.`Program_id` = `program_tbl`.`Program_id`)) WHERE `program_tbl`.`Program_id` = 1 ;

-- --------------------------------------------------------

--
-- Structure for view `viewcomp_sci`
--
DROP TABLE IF EXISTS `viewcomp_sci`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `viewcomp_sci`  AS SELECT `student_tbl`.`Name` AS `Student`, `program_tbl`.`program_name` AS `Program` FROM (`student_tbl` join `program_tbl` on(`student_tbl`.`Program_id` = `program_tbl`.`Program_id`)) WHERE `program_tbl`.`Program_id` = 2 ;

-- --------------------------------------------------------

--
-- Structure for view `viewinfo_sys`
--
DROP TABLE IF EXISTS `viewinfo_sys`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `viewinfo_sys`  AS SELECT `student_tbl`.`Name` AS `Student`, `program_tbl`.`program_name` AS `Program` FROM (`student_tbl` join `program_tbl` on(`student_tbl`.`Program_id` = `program_tbl`.`Program_id`)) WHERE `program_tbl`.`Program_id` = 3 ;

-- --------------------------------------------------------

--
-- Structure for view `viewmath`
--
DROP TABLE IF EXISTS `viewmath`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `viewmath`  AS SELECT `student_tbl`.`Name` AS `Student`, `program_tbl`.`program_name` AS `Program` FROM (`student_tbl` join `program_tbl` on(`student_tbl`.`Program_id` = `program_tbl`.`Program_id`)) WHERE `program_tbl`.`Program_id` = 5 ;

-- --------------------------------------------------------

--
-- Structure for view `viewstudentsprogram`
--
DROP TABLE IF EXISTS `viewstudentsprogram`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `viewstudentsprogram`  AS SELECT `student_tbl`.`Name` AS `Name`, `program_tbl`.`program_name` AS `program_name` FROM (`student_tbl` join `program_tbl` on(`student_tbl`.`Program_id` = `program_tbl`.`Program_id`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `institute_tbl`
--
ALTER TABLE `institute_tbl`
  ADD PRIMARY KEY (`ins_id`);

--
-- Indexes for table `program_tbl`
--
ALTER TABLE `program_tbl`
  ADD PRIMARY KEY (`Program_id`),
  ADD KEY `ins_id` (`ins_id`);

--
-- Indexes for table `semester_tbl`
--
ALTER TABLE `semester_tbl`
  ADD PRIMARY KEY (`sem_id`),
  ADD KEY `year_id` (`year_id`);

--
-- Indexes for table `student_load`
--
ALTER TABLE `student_load`
  ADD PRIMARY KEY (`load_id`),
  ADD KEY `stud_id` (`stud_id`),
  ADD KEY `Subject_id` (`Subject_id`);

--
-- Indexes for table `student_tbl`
--
ALTER TABLE `student_tbl`
  ADD PRIMARY KEY (`Stud_id`),
  ADD KEY `Program_id` (`Program_id`);

--
-- Indexes for table `subject_tbl`
--
ALTER TABLE `subject_tbl`
  ADD PRIMARY KEY (`Subject_id`),
  ADD KEY `sem_id` (`sem_id`);

--
-- Indexes for table `year_tbl`
--
ALTER TABLE `year_tbl`
  ADD PRIMARY KEY (`year_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `institute_tbl`
--
ALTER TABLE `institute_tbl`
  MODIFY `ins_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `program_tbl`
--
ALTER TABLE `program_tbl`
  MODIFY `Program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `student_load`
--
ALTER TABLE `student_load`
  MODIFY `load_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `student_tbl`
--
ALTER TABLE `student_tbl`
  MODIFY `Stud_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT for table `subject_tbl`
--
ALTER TABLE `subject_tbl`
  MODIFY `Subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `program_tbl`
--
ALTER TABLE `program_tbl`
  ADD CONSTRAINT `program_tbl_ibfk_1` FOREIGN KEY (`ins_id`) REFERENCES `institute_tbl` (`ins_id`);

--
-- Constraints for table `semester_tbl`
--
ALTER TABLE `semester_tbl`
  ADD CONSTRAINT `semester_tbl_ibfk_1` FOREIGN KEY (`year_id`) REFERENCES `year_tbl` (`year_id`);

--
-- Constraints for table `student_load`
--
ALTER TABLE `student_load`
  ADD CONSTRAINT `student_load_ibfk_1` FOREIGN KEY (`stud_id`) REFERENCES `student_tbl` (`Stud_id`),
  ADD CONSTRAINT `student_load_ibfk_2` FOREIGN KEY (`Subject_id`) REFERENCES `subject_tbl` (`Subject_id`);

--
-- Constraints for table `student_tbl`
--
ALTER TABLE `student_tbl`
  ADD CONSTRAINT `student_tbl_ibfk_1` FOREIGN KEY (`Program_id`) REFERENCES `program_tbl` (`Program_id`);

--
-- Constraints for table `subject_tbl`
--
ALTER TABLE `subject_tbl`
  ADD CONSTRAINT `subject_tbl_ibfk_1` FOREIGN KEY (`sem_id`) REFERENCES `semester_tbl` (`sem_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
