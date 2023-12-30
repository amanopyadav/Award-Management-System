package com.mindcraft.in.services;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Service;

import com.mindcraft.in.pojos.EmployeeDetails;
import com.mindcraft.in.pojos.NomineeList;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NomineeListService {

    private final JdbcTemplate jdbcTemplate;

    public NomineeListService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Map<String, String> insertNomineeListRecord(NomineeList nomineeList) {
       
        String sql = "INSERT INTO nominee_list " +
        "(award_id, award_category, award_sub_category, award_sub_category2, emp_code, emp_name, emp_designation, unit, skill, " +
        "mindcraft_exp_in_months, total_exp_in_months, email_id, contact_number, dob, doj, project_name, " +
        "project_code, client, industry_name, nominated_by, nom_by_designation, onbehalf_of, " +
        "on_behalf_designation, active_yn, created_by, created_on, updated_by, updated_on) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

         System.out.println("Nomination ID : "+nomineeList.getNominationId());

        // SimpleJdbcInsert simpleJdbcInsert = new SimpleJdbcInsert(jdbcTemplate)
        //         .withTableName("nominee_list")
        //         .usingGeneratedKeyColumns("nomination_id");

        MapSqlParameterSource parameters = new MapSqlParameterSource()
        // .addValue("nomination_id", nomineeList.getNominationId())
                .addValue("award_id", nomineeList.getAwardId())
                .addValue("award_category", nomineeList.getAwardCategory())
                .addValue("award_sub_category", nomineeList.getAwardSubCategory())
                .addValue("award_sub_category2", nomineeList.getAwardSubCategory2())
                .addValue("emp_code", nomineeList.getEmpCode())
                .addValue("emp_name", nomineeList.getEmpName())
                .addValue("emp_designation", nomineeList.getEmpDesignation())
                .addValue("unit", nomineeList.getUnit())
                .addValue("skill", nomineeList.getSkill())
                .addValue("mindcraft_exp_in_months", nomineeList.getMindcraftExpInMonths())
                .addValue("total_exp_in_months", nomineeList.getTotalExpInMonths())
                .addValue("email_id", nomineeList.getEmailId())
                .addValue("contact_number", nomineeList.getContactNumber())
                .addValue("dob", nomineeList.getDob())
                .addValue("doj", nomineeList.getDoj())
                .addValue("project_name", nomineeList.getProjectName())
                .addValue("project_code", nomineeList.getProjectCode())
                .addValue("client", nomineeList.getClient())
                .addValue("industry_name", nomineeList.getIndustryName())
                .addValue("nominated_by", nomineeList.getNominatedBy())
                .addValue("nom_by_designation", nomineeList.getNomByDesignation())
                .addValue("onbehalf_of", nomineeList.getOnbehalfOf())
                .addValue("on_behalf_designation", nomineeList.getOnBehalfDesignation())
                .addValue("active_yn", nomineeList.isActiveYN())
                .addValue("created_by", nomineeList.getCreatedBy())
                .addValue("created_on", new Timestamp(System.currentTimeMillis())) 
                .addValue("updated_by", nomineeList.getUpdatedBy())
                .addValue("updated_on", new Timestamp(System.currentTimeMillis()));

        try {
            int result = jdbcTemplate.update(sql, parameters.getValues().values().toArray());

            // Successfully inserted, you can handle the result if needed
            System.out.println("Result: " + result);
            System.out.println("Nomination ID : "+nomineeList.getNominationId());
            System.out.println("Nomination sub category 2 : "+nomineeList.getAwardSubCategory2());

            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Nominee List Details Inserted Successfully.");
            return response;
        } catch (Exception e) {
            e.printStackTrace(); // Log or handle the exception as needed
            Map<String, String> response = new HashMap<>();
            System.out.println("Nomination ID : "+nomineeList.getNominationId());
            System.out.println("Nomination sub category 2 : "+nomineeList.getAwardSubCategory2());
            response.put("status", "error");
            response.put("message", "Error while Inserting Nominee List Details.");
            return response;
        }
    }

    public List<Map<String, Object>> getNomineeList() {
        String sql = "SELECT * FROM nominee_list ORDER BY created_on DESC";

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);
        Map<String, Object> response = new HashMap<>();

        if (result.isEmpty()) {
            response.put("status", "error");
            response.put("message", "No NomineeList Found.");
        } else {
            response.put("status", "success"); // Change status to "success"
            response.put("message", "All NomineeList Found.");
        }
        return result;
    }

    public Map<String, Object> getLatestEmpDialogRecord(String empCode, String awardCategory, String awardSubCategory, String awardSubCategory2) {
        String sql = "SELECT * FROM emp_dialog " +
                     "WHERE emp_code = ? " +
                     "AND award_category = ? " +
                     "AND award_sub_category = ? " +
                     "AND award_sub_category2 = ? " +
                     "ORDER BY updated_on DESC " +
                     "LIMIT 1";
    
        try {
            Map<String, Object> result = jdbcTemplate.queryForMap(sql, empCode, awardCategory, awardSubCategory, awardSubCategory2);
    
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Latest emp_dialog record found.");
            response.put("data", result);
            return response;
        } catch (Exception e) {
            e.printStackTrace(); // Log or handle the exception as needed
    
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "Error while fetching the latest emp_dialog record.");
            return response;
        }
    }



    public EmployeeDetails getEmployeeDetails(String empCode) {
        String sql = "SELECT * FROM emp_projects WHERE emp_code = ?";
        
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{empCode}, (rs, rowNum) -> {
                EmployeeDetails employeeDetails = new EmployeeDetails();
                employeeDetails.setEmpCode(rs.getString("emp_code"));
                employeeDetails.setEmpName(rs.getString("emp_name"));
                employeeDetails.setDoj(rs.getDate("joining_date"));
                employeeDetails.setUnit(rs.getString("function_name"));
                employeeDetails.setSkill(rs.getString("primary_skill_name"));
                employeeDetails.setEmpDesignation(rs.getString("designation_name"));
                employeeDetails.setMindcraftExpInMonths(rs.getInt("mindcraft_exp_mon"));
                employeeDetails.setTotalExpInMonths(rs.getInt("total_exp_mon"));
                employeeDetails.setContactNumber(rs.getLong("mobileno"));
                employeeDetails.setEmailId(rs.getString("email"));
                employeeDetails.setDob(rs.getDate("dob"));
                employeeDetails.setProjectCode(rs.getString("project_code"));
                employeeDetails.setProjectName(rs.getString("project_desc"));
                employeeDetails.setClient(rs.getString("client_name"));
                employeeDetails.setIndustryName(rs.getString("indstry_name"));
                // Add more fields as needed

                return employeeDetails;
            });
        } catch (Exception e) {
            e.printStackTrace(); // Log or handle the exception as needed
            return null;
        }
    }

    
}

