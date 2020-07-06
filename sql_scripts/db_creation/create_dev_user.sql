/*Create user*/
CREATE USER IF NOT EXISTS 'dev_hades_user'@'localhost' IDENTIFIED BY 'password';

/*Grant necessary privilages. 
CREATE, ALTER, DROP should not by granted no production.
 These are here only for entity framework*/
GRANT 
	CREATE, ALTER, ALTER ROUTINE, DROP, DELETE, INSERT, SELECT, UPDATE, REFERENCES, INDEX
    ON dev_hades.* 
    TO 'dev_hades_user'@'localhost';
    