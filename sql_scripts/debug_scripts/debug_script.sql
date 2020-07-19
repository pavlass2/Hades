-- Get all groups
SELECT * FROM dev_hades.groups;

-- Get all students of a group
SELECT u.UserName FROM aspnetusers u INNER JOIN studentgroup sg ON u.Id = sg.StudentId INNER JOIN `groups` g ON sg.GroupId = g.GroupId WHERE g.Name IN('emilova_skupina');

-- Get group founder
SELECT u.UserName FROM aspnetusers u INNER JOIN `groups` g on u.Id = g.FounderId WHERE g.Name IN('emilova_skupina');

-- Get user with user name
SELECT * FROM aspnetusers u WHERE u.UserName IN('rudolf', 'kamarad', 'emil');

-- Get group with group name
SELECT * FROM `groups` g WHERE g.Name IN('emilova_skupina');