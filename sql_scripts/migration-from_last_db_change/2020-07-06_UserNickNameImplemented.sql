ALTER TABLE `AspNetUsers` ADD `NickName` varchar(255) CHARACTER SET utf8mb4 NULL;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20200706103127_UserNickNameImplemented', '3.1.5');

