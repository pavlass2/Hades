ALTER TABLE `Messages` ADD `FrontEndTimeStamp` longtext CHARACTER SET utf8mb4 NULL;

ALTER TABLE `Messages` ADD `TimeStamp` datetime(6) NOT NULL DEFAULT '0001-01-01 00:00:00.000000';

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20200712012754_MessagesDevelopment', '3.1.5');

