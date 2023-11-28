---------------------------------------------------------------------------------
--Roles & Users
CREATE TABLE login (
	username varchar(25),
	password varchar(25),
	roles varchar(25)
);

INSERT INTO login values ('3645', '3645', 'ROLE_MANAGER');
INSERT INTO login values ('3011', '3011', 'ROLE_HR');

SELECT * FROM login;

select roles from login where username = '3011';
select roles from login where username = '3645';

---------------------------------------------------------------------------------
--nominee details


