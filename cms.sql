/*
 Navicat Premium Data Transfer

 Source Server         : cai
 Source Server Type    : MySQL
 Source Server Version : 80036
 Source Host           : localhost:3306
 Source Schema         : cms

 Target Server Type    : MySQL
 Target Server Version : 80036
 File Encoding         : 65001

 Date: 05/07/2024 13:50:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `ano` int unsigned NOT NULL COMMENT '行政编号',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '姓名',
  `userid` int(10) UNSIGNED ZEROFILL NOT NULL COMMENT '用户id',
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '性别',
  PRIMARY KEY (`ano`) USING BTREE,
  INDEX `admin-userid`(`userid`) USING BTREE,
  CONSTRAINT `admin-userid` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 10001 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (10001, '教务哥', 0000000001, '男');

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `cno` int(0) NOT NULL AUTO_INCREMENT COMMENT '课程号',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '课程名称',
  `grades` float DEFAULT NULL COMMENT '绩点',
  `startTime` date DEFAULT NULL COMMENT '开始时间',
  `endTime` date DEFAULT NULL COMMENT '结束时间',
  `MAXNUM` int unsigned COMMENT '最大人数',
  `enrollTime` date DEFAULT NULL COMMENT '成绩录用时间',
  PRIMARY KEY (`cno`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2006 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES (1101, '数据结构', 3, '2024-04-24', '2024-08-25', 20, '2024-11-30');
INSERT INTO `course` VALUES (1102, '数据库', 2, '2022-05-01', '2024-08-30', 20, '2024-12-01');
INSERT INTO `course` VALUES (1103, '算法设计', 1, '2024-06-23', '2024-08-03', 20, '2024-11-30');
INSERT INTO `course` VALUES (1104, '数电', 2, '2024-06-25', '2024-08-01', 20, '2024-12-01');
INSERT INTO `course` VALUES (1105, 'c语言', 2, '2024-06-24', '2024-08-29', 20, '2024-11-30');
INSERT INTO `course` VALUES (1106, 'java', 2, '2024-04-26', '2024-08-27', 20, '2024-12-01');
INSERT INTO `course` VALUES (1107, 'python', 2, '2022-05-01', '2022-09-01', 20, '2024-12-01');
INSERT INTO `course` VALUES (1108, 'javaScript', 1, '2022-05-01', '2022-09-01', 20, '2024-12-01');
INSERT INTO `course` VALUES (1109, 'c++', 1, '2024-06-28', '2024-09-01', 20, '2024-12-01');
INSERT INTO `course` VALUES (1110, 'vue框架', 2.5, '2024-04-28', '2024-08-29', 20, '2024-11-27');
INSERT INTO `course` VALUES (1111, 'vue3框架', 2.5, '2022-05-01', '2022-09-01', 20, '2024-11-30');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '姓名',
  `sno` int unsigned NOT NULL COMMENT '学号',
  `class` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '班级',
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '性别',
  `userid` int(10) UNSIGNED ZEROFILL DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`sno`) USING BTREE,
  INDEX `student-userid`(`userid`) USING BTREE,
  CONSTRAINT `student-userid` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('蔡3', 321, '22计科3', '男', 0000000007);
INSERT INTO `student` VALUES ('蔡4', 322, '22计科3', '男', 0000000008);
INSERT INTO `student` VALUES ('蔡2', 427, '22计科4', '男', 0000000006);
INSERT INTO `student` VALUES ('蔡一', 428, '22计科4', '男', 0000000002);
INSERT INTO `student` VALUES ('蔡6', 429, '22计科4', '女', NULL);

-- ----------------------------
-- Table structure for student_course
-- ----------------------------
DROP TABLE IF EXISTS `student_course`;
CREATE TABLE `student_course`  (
  `id` int unsigned NOT NULL COMMENT '选课编号',
  `sno` int unsigned COMMENT '学生号',
  `grade` int unsigned COMMENT '成绩',
  `tcid` int unsigned COMMENT '排课号',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sc_s`(`sno`) USING BTREE,
  INDEX `sc_tc`(`tcid`) USING BTREE,
  CONSTRAINT `sc_s` FOREIGN KEY (`sno`) REFERENCES `student` (`sno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sc_tc` FOREIGN KEY (`tcid`) REFERENCES `teacher_course` (`tcid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3025 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student_course
-- ----------------------------
INSERT INTO `student_course` VALUES (3002, 428, 88, 2003);
INSERT INTO `student_course` VALUES (3004, 428, NULL, 2005);
INSERT INTO `student_course` VALUES (3005, 428, NULL, 2007);
INSERT INTO `student_course` VALUES (3006, 427, 72, 2003);
INSERT INTO `student_course` VALUES (3007, 427, 66, 2004);
INSERT INTO `student_course` VALUES (3008, 321, 88, 2002);
INSERT INTO `student_course` VALUES (3009, 321, 78, 2003);
INSERT INTO `student_course` VALUES (3010, 428, 55, 2002);
INSERT INTO `student_course` VALUES (3011, 321, 67, 2004);
INSERT INTO `student_course` VALUES (3012, 321, 77, 2005);
INSERT INTO `student_course` VALUES (3013, 322, 67, 2002);
INSERT INTO `student_course` VALUES (3014, 322, 56, 2003);
INSERT INTO `student_course` VALUES (3015, 322, 67, 2004);
INSERT INTO `student_course` VALUES (3016, 427, 45, 2002);
INSERT INTO `student_course` VALUES (3017, 428, 77, 2009);

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `tno` int unsigned NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '姓名',
  `userid` int(10) UNSIGNED ZEROFILL DEFAULT NULL COMMENT '用户id',
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '性别',
  PRIMARY KEY (`tno`) USING BTREE,
  INDEX `teacher-userid`(`userid`) USING BTREE,
  CONSTRAINT `teacher-userid` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1007 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES (1001, '一加', 0000000004, '男');
INSERT INTO `teacher` VALUES (1002, '二加', 0000000005, '女');
INSERT INTO `teacher` VALUES (1003, '三加', 0000000003, '男');
INSERT INTO `teacher` VALUES (1004, '四加', 0000000009, '男');
INSERT INTO `teacher` VALUES (1005, '五加', 0000000010, '女');

-- ----------------------------
-- Table structure for teacher_course
-- ----------------------------
DROP TABLE IF EXISTS `teacher_course`;
CREATE TABLE `teacher_course`  (
  `tcid` int unsigned NOT NULL COMMENT '教师课程安排表',
  `tno` int unsigned NOT NULL COMMENT '教师号',
  `cno` int(0) NOT NULL COMMENT '课程号',
  `selected` int(0) DEFAULT 0 COMMENT '已选课人数',
  PRIMARY KEY (`tcid`) USING BTREE,
  INDEX `tc-tno`(`tno`) USING BTREE,
  INDEX `tc-cno`(`cno`) USING BTREE,
  CONSTRAINT `tc-cno` FOREIGN KEY (`cno`) REFERENCES `course` (`cno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tc-tno` FOREIGN KEY (`tno`) REFERENCES `teacher` (`tno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2016 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher_course
-- ----------------------------
INSERT INTO `teacher_course` VALUES (2002, 1003, 1101, 5);
INSERT INTO `teacher_course` VALUES (2003, 1002, 1103, 4);
INSERT INTO `teacher_course` VALUES (2004, 1002, 1104, 3);
INSERT INTO `teacher_course` VALUES (2005, 1001, 1105, 2);
INSERT INTO `teacher_course` VALUES (2006, 1001, 1106, 0);
INSERT INTO `teacher_course` VALUES (2007, 1004, 1106, 1);
INSERT INTO `teacher_course` VALUES (2009, 1005, 1108, 1);
INSERT INTO `teacher_course` VALUES (2012, 1005, 1107, 0);
INSERT INTO `teacher_course` VALUES (2013, 1005, 1102, 0);
INSERT INTO `teacher_course` VALUES (2015, 1003, 1111, 0);
INSERT INTO `teacher_course` VALUES (2016, 1001, 1103, 0);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `userid` int(5) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `userPwd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `userType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`userid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (00001, 'admin', '123456', 'admin');
INSERT INTO `user` VALUES (00002, 'student', '123456', 'student');
INSERT INTO `user` VALUES (00003, 'teacher', '123456', 'teacher');
INSERT INTO `user` VALUES (00004, 'yijia', '123456', 'teacher');
INSERT INTO `user` VALUES (00005, 'monika', '123456', 'teacher');
INSERT INTO `user` VALUES (00006, 'caitwo', '123456', 'student');
INSERT INTO `user` VALUES (00007, 'caithree', '123456', 'student');
INSERT INTO `user` VALUES (00008, 'caifour', '123456', 'student');
INSERT INTO `user` VALUES (00009, 'fouradd', '123456', 'teacher');
INSERT INTO `user` VALUES (00010, 'fiveadd', '123456', 'teacher');

-- ----------------------------
-- View structure for class_grade_view
-- ----------------------------
DROP VIEW IF EXISTS `class_grade_view`;
CREATE ALGORITHM = UNDEFINED DEFINER = `root`@`localhost` SQL SECURITY DEFINER VIEW `class_grade_view` AS select `s`.`class` AS `class`,coalesce(avg(`sc`.`grade`),0) AS `avg_score`,coalesce(max(`sc`.`grade`),0) AS `max_score`,coalesce(min(`sc`.`grade`),0) AS `min_score`,(case when (count(`sc`.`grade`) = 0) then 0 else ((sum((case when (`sc`.`grade` >= 60) then 1 else 0 end)) * 1.0) / count(`sc`.`grade`)) end) AS `pass_rate`,count(distinct `sc`.`sno`) AS `student_count`,sum(1) AS `total_courses` from (`student_course` `sc` join `student` `s` on((`sc`.`sno` = `s`.`sno`))) group by `s`.`class` order by `s`.`class`;

-- ----------------------------
-- View structure for course_grade_view
-- ----------------------------
DROP VIEW IF EXISTS `course_grade_view`;
CREATE ALGORITHM = UNDEFINED DEFINER = `root`@`localhost` SQL SECURITY DEFINER VIEW `course_grade_view` AS select `c`.`name` AS `name`,coalesce(avg(`sc`.`grade`),0) AS `avg_score`,coalesce(max(`sc`.`grade`),0) AS `max_score`,coalesce(min(`sc`.`grade`),0) AS `min_score`,(case when (count(`sc`.`grade`) = 0) then 0 else ((sum((case when (`sc`.`grade` >= 60) then 1 else 0 end)) * 1.0) / count(`sc`.`grade`)) end) AS `pass_rate`,count(distinct `sc`.`id`) AS `student_count` from ((`course` `c` left join `teacher_course` `tc` on((`c`.`cno` = `tc`.`cno`))) left join `student_course` `sc` on((`tc`.`tcid` = `sc`.`tcid`))) group by `c`.`name`;

-- ----------------------------
-- View structure for student_course_view
-- ----------------------------
DROP VIEW IF EXISTS `student_course_view`;
CREATE ALGORITHM = UNDEFINED DEFINER = `root`@`localhost` SQL SECURITY DEFINER VIEW `student_course_view` AS select `sc`.`id` AS `id`,`s`.`name` AS `sname`,`c`.`name` AS `cname`,`t`.`name` AS `tname`,`c`.`startTime` AS `stime`,`c`.`endTime` AS `etime`,`sc`.`grade` AS `grade`,`sc`.`tcid` AS `tcid`,`s`.`sno` AS `sno`,`c`.`cno` AS `cno`,`t`.`tno` AS `tno` from ((((`student_course` `sc` join `teacher_course` `tc` on((`sc`.`tcid` = `tc`.`tcid`))) join `teacher` `t` on((`tc`.`tno` = `t`.`tno`))) join `student` `s` on((`sc`.`sno` = `s`.`sno`))) join `course` `c` on((`tc`.`cno` = `c`.`cno`)));

-- ----------------------------
-- View structure for student_gpa_view
-- ----------------------------
DROP VIEW IF EXISTS `student_gpa_view`;
CREATE ALGORITHM = UNDEFINED DEFINER = `root`@`localhost` SQL SECURITY DEFINER VIEW `student_gpa_view` AS select `s`.`sno` AS `sno`,`s`.`name` AS `name`,`s`.`class` AS `class`,(sum((case when (`sc`.`grade` between 0 and 59.99) then (`c`.`grades` * 0) when (`sc`.`grade` between 60 and 69.99) then (`c`.`grades` * 1) when (`sc`.`grade` between 70 and 79.99) then (`c`.`grades` * 2) when (`sc`.`grade` between 80 and 89.99) then (`c`.`grades` * 3) when (`sc`.`grade` between 90 and 100) then (`c`.`grades` * 4) else 0 end)) / nullif(sum(`c`.`grades`),0)) AS `student_gpa`,coalesce(avg(`sc`.`grade`),0) AS `avg_course_grade` from (((`student` `s` left join `student_course` `sc` on((`s`.`sno` = `sc`.`sno`))) left join `teacher_course` `tc` on((`sc`.`tcid` = `tc`.`tcid`))) left join `course` `c` on((`tc`.`cno` = `c`.`cno`))) where (`sc`.`grade` is not null) group by `s`.`sno`,`s`.`name`,`s`.`class` order by `s`.`sno`;

-- ----------------------------
-- View structure for student_grade_view
-- ----------------------------
DROP VIEW IF EXISTS `student_grade_view`;
CREATE ALGORITHM = UNDEFINED DEFINER = `root`@`localhost` SQL SECURITY DEFINER VIEW `student_grade_view` AS select `s`.`sno` AS `sno`,`s`.`name` AS `name`,`s`.`class` AS `class`,coalesce((sum((`sc`.`grade` * `c`.`grades`)) / nullif(sum(`c`.`grades`),0)),0) AS `student_gpa`,coalesce(avg(`sc`.`grade`),0) AS `avg_course_grade` from (((`student` `s` left join `student_course` `sc` on((`s`.`sno` = `sc`.`sno`))) left join `teacher_course` `tc` on((`sc`.`tcid` = `tc`.`tcid`))) left join `course` `c` on((`tc`.`cno` = `c`.`cno`))) where (`sc`.`grade` is not null) group by `s`.`sno`,`s`.`name`,`s`.`class` order by `s`.`sno`;

-- ----------------------------
-- View structure for teacher_course_view
-- ----------------------------
DROP VIEW IF EXISTS `teacher_course_view`;
CREATE ALGORITHM = UNDEFINED DEFINER = `root`@`localhost` SQL SECURITY DEFINER VIEW `teacher_course_view` AS select `tc`.`tcid` AS `tcid`,`c`.`name` AS `cname`,`t`.`name` AS `tname`,`c`.`grades` AS `grades`,`c`.`startTime` AS `stime`,`c`.`endTime` AS `etime`,count(distinct `sc`.`sno`) AS `selectedNum`,`c`.`MAXNUM` AS `Maxnum`,`t`.`tno` AS `tno`,`c`.`cno` AS `cno` from (((`teacher_course` `tc` join `teacher` `t` on((`tc`.`tno` = `t`.`tno`))) join `course` `c` on((`tc`.`cno` = `c`.`cno`))) left join `student_course` `sc` on((`tc`.`tcid` = `sc`.`tcid`))) group by `tc`.`tcid`;

SET FOREIGN_KEY_CHECKS = 1;
