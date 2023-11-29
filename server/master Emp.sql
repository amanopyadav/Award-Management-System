SELECT * FROM public.m_employee
ORDER BY emp_id ASC 
-----------------------------------------------
-- Step 1: Alter Table to Add 'role' Column
ALTER TABLE m_employee
ADD COLUMN role VARCHAR(255); -- Adjust the data type and length as needed

-- Update 'role' for specified employee IDs
UPDATE m_employee
SET role = 'HR'
WHERE emp_id = 2709;

UPDATE m_employee
SET role = 'Fresher'
WHERE emp_id = 3348;

UPDATE m_employee
SET role = 'Fresher'
WHERE emp_id = 3344;

UPDATE m_employee
SET role = 'Fresher'
WHERE emp_id = 3345;

UPDATE m_employee
SET role = 'Manager'
WHERE emp_id = 619;

UPDATE m_employee
SET role = 'Fresher'
WHERE emp_id = 3356;

UPDATE m_employee
SET role = 'Manager'
WHERE emp_id = 1863;

UPDATE m_employee
SET role = 'Fresher'
WHERE emp_id = 3355;

UPDATE m_employee
SET role = 'Fresher'
WHERE emp_id = 3354;

UPDATE m_employee
SET role = 'Fresher'
WHERE emp_id = 3353;

UPDATE m_employee
SET role = 'Manager'
WHERE emp_id = 2771;

UPDATE m_employee
SET role = 'Fresher'
WHERE emp_id = 3352;

UPDATE m_employee
SET role = 'Fresher'
WHERE emp_id = 3350;

UPDATE m_employee
SET role = 'Fresher'
WHERE emp_id = 3357;

UPDATE m_employee
SET role = 'Fresher'
WHERE emp_id = 3358;

UPDATE m_employee
SET role = 'Fresher'
WHERE emp_id = 3347;

UPDATE m_employee
SET role = 'Fresher'
WHERE emp_id = 3351;

UPDATE m_employee
SET role = 'Manager'
WHERE emp_id = 3173;

UPDATE m_employee
SET role = 'Fresher'
WHERE emp_id = 3346;
