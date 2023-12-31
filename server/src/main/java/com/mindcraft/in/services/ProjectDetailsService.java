package com.mindcraft.in.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.pojos.ProjectDetails;

@Service
public class ProjectDetailsService {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ProjectDetailsService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> getAllProjects() {
        String sql = "SELECT * FROM nominee_project_details";

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);
        Map<String, Object> response = new HashMap<>();

        if (result.isEmpty()) {
            response.put("status", "error");
            response.put("message", "No Employees Found.");
        }else {
            response.put("status", "error");
            response.put("message", "All Employees Found.");
        }

        return result;
    }

    public List<Map<String, Object>> getProjectById(String projectId) {
        String sql = "SELECT * FROM nominee_project_details WHERE project_id = ?";

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, projectId);
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



    public List<Map<String, Object>> getAllProjectDetails() {
        String sql = "SELECT * FROM allprojects";

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);
        Map<String, Object> response = new HashMap<>();

        if (result.isEmpty()) {
            response.put("status", "error");
            response.put("message", "Error to find projects");
        } else {
            response.put("status", "success");
            response.put("message", "All projects found");
            response.put("result", result);
        }

        return result;
    }



    public List<Map<String, Object>> getAllTeamMember(String projCode) {
        String sql = "SELECT * FROM all_team_members WHERE project_code = ?";

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql,projCode);
        Map<String, Object> response = new HashMap<>();

        if (result.isEmpty()) {
            response.put("status", "error");
            response.put("message", "Error to find team members");
        } else {
            response.put("status", "success");
            response.put("message", "All Team members found");
            response.put("result", result);
        }

        return result;
    }

    // Additional methods for CRUD operations can be added as needed
}

