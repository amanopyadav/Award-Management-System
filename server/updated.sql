--         *****************   Updated date :- 10/12/2023  **********************

-- Insert in parameter table with sample records:

INSERT INTO parameter 
(parameter_id, parameter_name, description, weightage, performance_description, rating_by_nominator, 
 final_committee_rating, active_yn, created_by, created_on, updated_by, updated_on)
VALUES 
(1, 'Exceeding Expectation', 'Consistently surpassing predefined goals and delivering exceptional results',
 5, 'Demonstrates a commitment to excellence and a proactive approach to achieving organizational objectives',
 4, 4, 'Y', 'admin', NOW(), 'admin', NOW());

-- Process Oriented
INSERT INTO parameter 
(parameter_id, parameter_name, description, weightage, performance_description, rating_by_nominator,
 final_committee_rating, active_yn, created_by, created_on, updated_by, updated_on)
VALUES 
(2, 'Process Oriented', 'Consistently follows established processes and procedures to ensure efficient 
 workflow', 4, 'Adheres to established processes, contributing to streamlined operations and enhanced 
 efficiency', 3, 0, 'Y', 'admin', NOW(), 'admin', NOW());

-- Time Management
INSERT INTO parameter 
(parameter_id, parameter_name, description, weightage, performance_description, rating_by_nominator,
 final_committee_rating, active_yn, created_by, created_on, updated_by, updated_on)
VALUES 
(3, 'Time Management', 'Effectively allocates and prioritizes time to meet deadlines and accomplish tasks',
 3, 'Demonstrates efficient time allocation and task prioritization to achieve goals within deadlines', 0, 
 0, 'Y', 'admin', NOW(), 'admin', NOW());

-- Work Efficiency
INSERT INTO parameter 
(parameter_id, parameter_name, description, weightage, performance_description, rating_by_nominator, 
 final_committee_rating, active_yn, created_by, created_on, updated_by, updated_on)
VALUES 
(4, 'Work Efficiency', 'Completes tasks with high accuracy and speed, maximizing productivity', 4, 
 'Consistently delivers high-quality work with optimal speed and precision', 0, 0, 'Y', 'admin', NOW(), 
 'admin', NOW());

-- Punctuality
INSERT INTO parameter 
(parameter_id, parameter_name, description, weightage, performance_description, rating_by_nominator, 
 final_committee_rating, active_yn, created_by, created_on, updated_by, updated_on)
VALUES 
(5, 'Punctuality', 'Consistently arrives on time and meets deadlines', 2, 'Demonstrates punctuality by 
 consistently arriving on time and meeting deadlines', 0, 0, 'Y', 'admin', NOW(), 'admin', NOW());

-- Quick Learner
INSERT INTO parameter 
(parameter_id, parameter_name, description, weightage, performance_description, rating_by_nominator, 
 final_committee_rating, active_yn, created_by, created_on, updated_by, updated_on)
VALUES 
(6, 'Quick Learner', 'Demonstrates the ability to rapidly acquire and apply new knowledge and skills', 3,
 'Displays a rapid learning curve, acquiring and applying new knowledge and skills effectively', 0, 0, 'Y', 
 'admin', NOW(), 'admin', NOW());

-- Proactiveness
INSERT INTO parameter 
(parameter_id, parameter_name, description, weightage, performance_description, rating_by_nominator, 
 final_committee_rating, active_yn, created_by, created_on, updated_by, updated_on)
VALUES 
(7, 'Proactiveness', 'Anticipates and addresses issues before they arise, taking initiative in tasks',
 3, 'Demonstrates proactiveness by anticipating and addressing issues proactively, taking initiative in 
 tasks', 0, 0, 'Y', 'admin', NOW(), 'admin', NOW());


select * from parameter;




-- Created an emp_projects_records table which will contain an record of all the employee with their projects which is assigned before or currently working on them

-- Create emp_projects_records table if not exists
CREATE TABLE IF NOT EXISTS emp_projects_records AS
SELECT * FROM emp_projects where project_code IS NOT NULL;


-- Create a trigger function
CREATE OR REPLACE FUNCTION emp_projects_update_trigger()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert the new data into emp_projects_records after update, only if project_code is not null
    IF NEW.project_code IS NOT NULL THEN
        INSERT INTO emp_projects_records
        SELECT * FROM emp_projects WHERE emp_code = NEW.emp_code;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Create a trigger on emp_projects table
CREATE TRIGGER emp_projects_after_update
AFTER UPDATE ON emp_projects
FOR EACH ROW
EXECUTE FUNCTION emp_projects_update_trigger();



-- Update query 
UPDATE emp_projects
SET project_code = '20000',project_desc='Asset Management System'
WHERE emp_code = '3650';



UPDATE emp_projects
SET project_code = '20000',project_desc='Asset Management System'
WHERE emp_code = '3646';


select * from emp_projects_records;


-- This will update the emp_projects table with the latest projects details also its add on the new updated project data in emp_projects_records table.


--         *****************   Updated date :- 15/12/2023  **********************

select * from nominee_list
select * from m_employee
drop table nominee_list

CREATE TABLE nominee_list (
    nomination_id SERIAL PRIMARY KEY,
	award_id BIGINT NOT NULL,
	award_category VARCHAR(100) NOT NULL,
	award_sub_category VARCHAR(100),
	award_sub_category2 VARCHAR(100),
    emp_code VARCHAR(100) NOT NULL,
    emp_name VARCHAR(100) NOT NULL,
	emp_designation VARCHAR(100) NOT NULL,
	unit VARCHAR(100) NOT NULL,
	skill VARCHAR(100) NOT NULL,
	mindcraft_exp_in_months BIGINT NOT NULL,
	total_exp_in_months BIGINT NOT NULL,
	email_id VARCHAR(100) NOT NULL,
	contact_number BIGINT NOT NULL,
	dob DATE NOT NULL,
	doj DATE NOT NULL,
	project_name VARCHAR(100) NOT NULL,
	project_code BIGINT NOT NULL,
	client VARCHAR(100) NOT NULL,
	industry_name VARCHAR(100) NOT NULL,
	nominated_by VARCHAR(100) NOT NULL,
	nom_by_designation VARCHAR(100) NOT NULL,
	onbehalf_of VARCHAR(100) NOT NULL,
	on_behalf_designation VARCHAR(100) NOT NULL,
	active_yn BOOLEAN NOT NULL,
	created_by VARCHAR(100) NOT NULL,
	created_on TIMESTAMP NOT NULL,
	updated_by VARCHAR(100) NOT NULL,
	updated_on TIMESTAMP NOT NULL
);

CREATE OR REPLACE FUNCTION insert_into_param()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the award_id and nomination_id are provided
  IF NEW.award_id IS NOT NULL AND NEW.nomination_id IS NOT NULL THEN
    -- Insert parameters into the parameter table based on award_id
    INSERT INTO parameter (nomination_id, parameter_id)
    SELECT NEW.nomination_id, parameter_id
    FROM m_parameter
    WHERE award_id = NEW.award_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--------------TRIGGER-----------------------------

CREATE TRIGGER trigger_insert_into_param
AFTER INSERT ON nominee_list
FOR EACH ROW
EXECUTE FUNCTION insert_into_param();
---------------------------------------------------




-- -----------------------------  24/12/2023 ---------------------------------

-- creating view to display employee with rating

CREATE OR REPLACE VIEW emp_ratings AS
SELECT
    p.id AS id,
    mp.parameter_name AS parameter_name,
    p.nomination_id AS nomination_id,
    p.description AS description,
    p.rating AS rating
FROM
    parameter p
JOIN
    m_parameters mp ON p.parameter_id = mp.parameter_id;


select * from emp_ratings;

-- -----------------------------------------------------------------------------



-- ------------------------------- 27/12/2023 -----------------------------------

-- Creating view to display all projects 

CREATE OR REPLACE VIEW allprojects AS
SELECT project_code, project_desc, client_name, indstry_name 
FROM emp_projects
WHERE project_code IS NOT NULL;


-- Creating a view to display all team members of projects

CREATE OR REPLACE VIEW all_team_members AS SELECT project_code,emp_code,emp_name,function_name from emp_projects
WHERE project_code IS NOT NULL;


-- -------------------------------------------------------------------------------

---------------------------------------28/12/2023------------------------------------------

CREATE OR REPLACE VIEW nomination_details AS
SELECT award_category, award_sub_category,award_sub_category2, emp_code,nominated_by, nom_by_designation, onbehalf_of, on_behalf_designation 
FROM nominee_list

select * from nomination_details





-- ----------------------------- 28/12/2023 ------------------------------------------

-- Nominee List


CREATE TABLE nominee_list (
    nomination_id SERIAL PRIMARY KEY,
	award_id BIGINT NOT NULL,
	award_category VARCHAR(100) NOT NULL,
	award_sub_category VARCHAR(100),
	award_sub_category2 VARCHAR(100),
    emp_code VARCHAR(100),
    emp_name VARCHAR(100),
	emp_designation VARCHAR(100),
	unit VARCHAR(100),
	skill VARCHAR(100),
	mindcraft_exp_in_months BIGINT,
	total_exp_in_months BIGINT,
	email_id VARCHAR(100),
	contact_number BIGINT,
	dob DATE,
	doj DATE,
	project_name VARCHAR(100),
	project_code BIGINT,
	client VARCHAR(100),
	industry_name VARCHAR(100),
	nominated_by VARCHAR(100),
	nom_by_designation VARCHAR(100),
	onbehalf_of VARCHAR(100),
	on_behalf_designation VARCHAR(100),
	active_yn BOOLEAN,
	created_by VARCHAR(100),
	created_on TIMESTAMP,
	updated_by VARCHAR(100),
	updated_on TIMESTAMP
);



CREATE OR REPLACE FUNCTION insert_into_param()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the award_id and nomination_id are provided
  IF NEW.award_id IS NOT NULL AND NEW.nomination_id IS NOT NULL THEN
    -- Insert parameters into the parameter table based on award_id
    INSERT INTO parameter (nomination_id, parameter_id)
    SELECT NEW.nomination_id, parameter_id
    FROM m_parameter
    WHERE award_id = NEW.award_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--------------TRIGGER-----------------------------

CREATE TRIGGER trigger_insert_into_param
AFTER INSERT ON nominee_list
FOR EACH ROW
EXECUTE FUNCTION insert_into_param();


-- Emp rating view

CREATE OR REPLACE VIEW emp_ratings AS
SELECT
    p.id AS id,
    mp.parameter_name AS parameter_name,
    p.nomination_id AS nomination_id,
    p.description AS description,
    p.rating AS rating
FROM
    parameter p
JOIN
    m_parameters mp ON p.parameter_id = mp.parameter_id;


select * from emp_ratings;


-- --------------------------------  Updated SQL  ----------------------------------------------------------
------------------------03/01/2024---------------------------------------------------------

-- Create the m_award table
CREATE TABLE m_award (
    award_id SERIAL PRIMARY KEY,
    award_category VARCHAR(255),
    award_sub_category VARCHAR(255),
	award_sub_category2 VARCHAR(255),
    period INT,
    min_eligibility_criteria INT,
	max_eligibility_criteria INT,
    award_count INT,
    award_price INT,
    total_value INT,
    active_yn BOOLEAN,
    created_by VARCHAR(255),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(255),
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert values into the m_award table
INSERT INTO m_award (
    award_id,
    award_category,
    award_sub_category,
	award_sub_category2,
    period,
    min_eligibility_criteria,
	max_eligibility_criteria,
    award_count,
    award_price,
    total_value,
    active_yn,
    created_by,
    created_on,
    updated_by,
    updated_on
) VALUES
(1, 'Promising newcomer', NULL, NULL, 3, 1,6, 10, 2000, 20000, NULL, NULL, NULL, NULL, NULL),
(2, 'Quarterly Award', NULL, NULL, 3, 10,NULL , 20, 2000, 40000, NULL, NULL, NULL, NULL, NULL),
(3, 'Rising Star Award', NULL, NULL, 3, 0,6, 5, 2000, 10000, NULL, NULL, NULL, NULL, NULL),
(4, 'Spot Award', 'In Recognition Of', NULL, 1,NULL ,NULL  , 10, 2000, 20000, NULL, NULL, NULL, NULL, NULL),
(5, 'Spot Award', 'Going Extra Mile', NULL, 1,NULL ,NULL , 10, 2000, 20000, NULL, NULL, NULL, NULL, NULL),
(6, 'Half Yearly Award', 'Lead Award', NULL, 6, 7,NULL , 10, 2000, 20000, NULL, NULL,  NULL, NULL, NULL),
(7, 'Half Yearly Award', 'Lead Award', 'Sales', 6, 7,NULL , 10, 2000, 20000, NULL, NULL,  NULL, NULL, NULL),
(8, 'Half Yearly Award', 'Individual Award', NULL, 6,7,NULL , 10, 2000, 20000, NULL, NULL, NULL, NULL, NULL),
(9, 'Team Award', NULL, NULL, 6,NULL ,NULL, 10, 2000, 20000, NULL, NULL,  NULL, NULL, NULL);

select * from m_award;

--drop view
drop view emp_details;

--create view
create view emp_details1 as
select 
emp_name,
emp_code as emp_id,
designation_name,
function_name,
primary_skill_name,
mindcraft_exp_mon,
total_exp_mon,
email,
mobileno,
dob,
joining_date
from m_employee 


select * from emp_details1;



create view emp_details as
select 
e.emp_name,
e.emp_id,
e.designation_name,
e.function_name,
e.primary_skill_name,
e.mindcraft_exp_mon,
e.total_exp_mon,
e.email,
e.mobileno,
e.dob,
e.joining_date,
np.project_name
from emp_details1 e
LEFT JOIN
    nominee_project_record_details np ON e.emp_id = np.emp_code;

select * from emp_details;


------function for duplicate entries
CREATE OR REPLACE FUNCTION prevent_duplicate_nomination()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the combination of emp_code and award_id already exists
    IF EXISTS (
        SELECT 1
        FROM nominee_list
        WHERE NEW.emp_code = emp_code AND NEW.award_id = award_id
    ) THEN
        RAISE EXCEPTION 'Duplicate nomination not allowed for emp_code % and award_id %', NEW.emp_code, NEW.award_id;
    END IF;
	
	-- Check if it is a team award, and if yes, check if the same combination of award_id and project_code exists
    IF NEW.award_category = 'Team Award' THEN
        IF EXISTS (
            SELECT 1
            FROM nominee_list
            WHERE NEW.award_id = award_id AND NEW.project_code = project_code
        ) THEN
            RAISE EXCEPTION 'Duplicate team nomination not allowed for emp_code % and project_code %', NEW.emp_code, NEW.project_code;
        END IF;
    END IF;

    
    -- If no duplicate, allow the insertion
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-----Trigger----
CREATE TRIGGER before_insert_prevent_duplicate_nomination
BEFORE INSERT ON nominee_list
FOR EACH ROW
EXECUTE FUNCTION prevent_duplicate_nomination();



-------------------------------------------------------------------------------------------------------------
-----------------------------------05/01/2024------------------------------------------------------------
---------------------drop------------
DROP TRIGGER before_insert_prevent_duplicate_nomination ON nominee_list;
DROP FUNCTION prevent_duplicate_nomination();
-----------------new function-----------------
CREATE OR REPLACE FUNCTION prevent_duplicate_nomination()
RETURNS TRIGGER AS $$
BEGIN

    IF NEW.award_id = 9 THEN
        -- Allow duplicate insertions
        RETURN NEW;
    END IF;
	
    -- Check if the combination of emp_code and award_id already exists
    IF EXISTS (
        SELECT 1
        FROM nominee_list
        WHERE NEW.emp_code = emp_code AND NEW.award_id = award_id AND NEW.project_code = project_code
    ) THEN
        RAISE EXCEPTION 'Duplicate nomination not allowed for emp_code % and award_id %', NEW.emp_code, NEW.award_id;
    END IF;

   

    -- If no duplicate, allow the insertion
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



-------------------------------------------------------------------------------------------------------------
-----------------------------------05/01/2024------------------------------------------------------------
---------------------drop------------
DROP TRIGGER before_insert_prevent_duplicate_nomination ON nominee_list;
DROP FUNCTION prevent_duplicate_nomination();
-----------------new function-----------------
CREATE OR REPLACE FUNCTION prevent_duplicate_nomination()
RETURNS TRIGGER AS $$
BEGIN

    IF NEW.award_id = 9 THEN
        -- Allow duplicate insertions
        RETURN NEW;
    END IF;
	
    -- Check if the combination of emp_code and award_id already exists
    IF EXISTS (
        SELECT 1
        FROM nominee_list
        WHERE NEW.emp_code = emp_code AND NEW.award_id = award_id AND NEW.project_code = project_code
    ) THEN
        RAISE EXCEPTION 'Duplicate nomination not allowed for emp_code % and award_id %', NEW.emp_code, NEW.award_id;
    END IF;

   

    -- If no duplicate, allow the insertion
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



-- -------------------- 05/01/2024 --------------------------
-- Mihir changed the HR dashboard

-- Nominee List(Added is_shortlist and is_selected)

CREATE TABLE nominee_list (
    nomination_id SERIAL PRIMARY KEY,
	award_id BIGINT NOT NULL,
	award_category VARCHAR(100) NOT NULL,
	award_sub_category VARCHAR(100),
	award_sub_category2 VARCHAR(100),
    emp_code VARCHAR(100),
    emp_name VARCHAR(100),
	emp_designation VARCHAR(100),
	unit VARCHAR(100),
	skill VARCHAR(100),
	mindcraft_exp_in_months BIGINT,
	total_exp_in_months BIGINT,
	email_id VARCHAR(100),
	contact_number BIGINT,
	dob DATE,
	doj DATE,
	project_name VARCHAR(100),
	project_code BIGINT,
	client VARCHAR(100),
	industry_name VARCHAR(100),
	nominated_by VARCHAR(100),
	nom_by_designation VARCHAR(100),
	onbehalf_of VARCHAR(100),
	on_behalf_designation VARCHAR(100),
    is_shortlist char(10),
    is_selected char(10),
	active_yn BOOLEAN,
	created_by VARCHAR(100),
	created_on TIMESTAMP,
	updated_by VARCHAR(100),
	updated_on TIMESTAMP
);


-- Updated Function

CREATE OR REPLACE FUNCTION insert_into_param()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the award_id and nomination_id are provided
  IF NEW.award_id IS NOT NULL AND NEW.nomination_id IS NOT NULL THEN
    -- Insert parameters into the parameter table based on award_id
    INSERT INTO parameter (nomination_id, parameter_id)
    SELECT NEW.nomination_id, parameter_id
    FROM m_parameter
    WHERE award_id = NEW.award_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;



-- updated Trigger

CREATE TRIGGER trigger_insert_into_param
AFTER INSERT ON nominee_list
FOR EACH ROW
EXECUTE FUNCTION insert_into_param();


-- Updated emp_rating view

CREATE OR REPLACE VIEW emp_ratings AS
SELECT
    p.id AS id,
    mp.parameter_name AS parameter_name,
    p.nomination_id AS nomination_id,
    p.description AS description,
    p.rating AS rating
FROM
    parameter p
JOIN
    m_parameter mp ON p.parameter_id = mp.parameter_id;


select * from emp_ratings;


-- Nomination details

CREATE OR REPLACE VIEW nomination_details AS
SELECT award_category, award_sub_category,award_sub_category2, emp_code,nominated_by, nom_by_designation, onbehalf_of, on_behalf_designation 
FROM nominee_list

select * from nomination_details;


-----------------new function 
-----------------new function(christina)-----------------
CREATE OR REPLACE FUNCTION prevent_duplicate_nomination()
RETURNS TRIGGER AS $$
BEGIN

   -- Check if award_id is 9 and the combination of award_id and project_code is the same
    IF NEW.award_id = 9 AND EXISTS (
        SELECT 1
        FROM nominee_list
        WHERE NEW.award_id = nominee_list.award_id
          AND NEW.project_code = nominee_list.project_code
    ) THEN
        RAISE EXCEPTION 'Duplicate nomination not allowed for award_id % and project_code %', NEW.award_id, NEW.project_code;
    END IF;
	
    -- Check if the combination of emp_code and award_id and project_code already exists
    IF EXISTS (
        SELECT 1
        FROM nominee_list
        WHERE NEW.emp_code = nominee_list.emp_code
          AND NEW.award_id = nominee_list.award_id
          AND NEW.project_code = nominee_list.project_code
    ) THEN
        RAISE EXCEPTION 'Duplicate nomination not allowed for emp_code % and award_id %', NEW.emp_code, NEW.award_id;
    END IF;

    -- If no duplicate, allow the insertion
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;






CREATE TRIGGER before_insert_prevent_duplicate_nomination
BEFORE INSERT ON nominee_list
FOR EACH ROW
EXECUTE FUNCTION prevent_duplicate_nomination();