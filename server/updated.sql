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



