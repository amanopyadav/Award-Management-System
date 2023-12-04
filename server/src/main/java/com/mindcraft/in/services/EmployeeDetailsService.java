package com.mindcraft.in.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class EmployeeDetailsService {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public EmployeeDetailsService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> getAllEmployees() {
        String sql = "SELECT * FROM emp_details";

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);
        Map<String, Object> response = new HashMap<>();

        if (result.isEmpty()) {
            response.put("status", "error");
            response.put("message", "No Employees Found.");
        } else {
            response.put("status", "error");
            response.put("message", "All Employees Found.");
        }
        return result;
    }

    public List<Map<String, Object>> getAllEmployees(Long empId) {
        String sql = "SELECT * FROM emp_details where emp_id=?";

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, empId);
        Map<String, Object> response = new HashMap<>();

        if (result.isEmpty()) {
            response.put("status", "error");
            response.put("message", "No Employees Found.");
        } else {
            response.put("status", "error");
            response.put("message", "All Employees Found.");
        }
        return result;
    }

     public List<Map<String, Object>> getAllExceptFreshers() {
        String sql = "SELECT * FROM emp_details WHERE primary_skill_name <> 'fresher'";

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);
        Map<String, Object> response = new HashMap<>();

        if (result.isEmpty()) {
            response.put("status", "error");
            response.put("message", "No Employees Found.");
        } else {
            response.put("status", "error");
            response.put("message", "All Employees Found.");
        }
        return result;
    }
    

}
