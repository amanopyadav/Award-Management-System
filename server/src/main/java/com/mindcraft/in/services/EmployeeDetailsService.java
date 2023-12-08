package com.mindcraft.in.services;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.sql.Connection;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.autoconfigure.amqp.RabbitProperties.Cache.Connection;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;


@Service
public class EmployeeDetailsService {
    private final JdbcTemplate jdbcTemplate;
    private final DataSource dataSource;

    @Autowired
    public EmployeeDetailsService(JdbcTemplate jdbcTemplate,DataSource dataSource) {
        this.jdbcTemplate = jdbcTemplate;
        this.dataSource = dataSource;
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
        String sql = "SELECT * FROM emp_details WHERE primary_skill_name <> 'Fresher'";

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




     public Integer getAwardId(String awardCategory, String awardSubCategory) {
        String sql;
        sql = "SELECT award_id FROM m_award WHERE award_category = ? AND award_sub_category = ?";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setString(1, awardCategory);
            preparedStatement.setString(2, awardSubCategory);

            System.out.println("cat1: "+awardCategory);
            System.out.println("cat2: "+awardSubCategory);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    System.out.println("done");
                    return resultSet.getInt("award_id");
                } else {
                    // Handle the case where no result is found
                    System.out.println("Reached null");
                    return null; // or throw a custom exception, depending on your requirements
                }
            }
        } catch (SQLException e) {
            // Handle SQLException
            throw new RuntimeException("Error executing SQL query", e);
        }
    }




     public Integer getAwardIdSingle(String awardCategory) {
        String sql;
        sql = "SELECT award_id FROM m_award WHERE award_category = ?";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setString(1, awardCategory);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    System.out.println("done");
                    return resultSet.getInt("award_id");
                } else {
                    // Handle the case where no result is found
                    System.out.println("Reached null");
                    return null; // or throw a custom exception, depending on your requirements
                }
            }
        } catch (SQLException e) {
            // Handle SQLException
            throw new RuntimeException("Error executing SQL query", e);
        }
    }
    
    

    

}
