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
import com.mindcraft.in.pojos.EmployeeDetails;

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
            response.put("status", "success"); // Change status to "success"
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
            response.put("status", "success"); // Change status to "success"
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
            response.put("status", "success"); // Change status to "success"
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



    public Integer getAwardIdForSales(String awardCategory, String awardSubCategory, String awardSubCategory1) {
        String sql;
        sql = "SELECT award_id FROM m_award WHERE award_category = ? AND award_sub_category = ? AND award_sub_category2 = ?";

        try (Connection connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setString(1, awardCategory);
            preparedStatement.setString(2, awardSubCategory);
            preparedStatement.setString(3, awardSubCategory1);

            System.out.println("cat1: "+awardCategory);
            System.out.println("cat2: "+awardSubCategory);
            System.out.println("cat3: "+awardSubCategory1);

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


    // For one categories
    public Long getRatingNominationIdOne(String empCode,String awardCategory){
        String sql;
        sql = "SELECT nomination_id FROM nominee_list WHERE emp_code=? AND award_category=?";

        try(Connection conn = dataSource.getConnection();
            PreparedStatement preparedStatement = conn.prepareStatement(sql)){
                preparedStatement.setString(1, empCode);
                preparedStatement.setString(2, awardCategory);

                try (ResultSet rset = preparedStatement.executeQuery()){
                    if(rset.next()){
                        System.out.println("Fetched rating nomination ID : "+rset.getLong("nomination_id"));
                        return rset.getLong("nomination_id");
                    }else{
                        System.out.println("Not found rating nomination id");
                        return null;
                    }
                }
            }   catch(SQLException e){
                throw new RuntimeException("Error executing SQL query", e);
            }
    }

    // For two categories
    public Long getRatingNominationIdTwo(String empCode,String awardCategory,String awardSubCategory){
        String sql;
        sql = "SELECT nomination_id FROM nominee_list WHERE emp_code=? AND award_category=? AND award_sub_category=?";

        try(Connection conn = dataSource.getConnection();
            PreparedStatement preparedStatement = conn.prepareStatement(sql)){
                preparedStatement.setString(1, empCode);
                preparedStatement.setString(2, awardCategory);
                preparedStatement.setString(3, awardSubCategory);

                try (ResultSet rset = preparedStatement.executeQuery()){
                    if(rset.next()){
                        System.out.println("Fetched rating nomination ID : "+rset.getLong("nomination_id"));
                        return rset.getLong("nomination_id");
                    }else{
                        System.out.println("Not found rating nomination id");
                        return null;
                    }
                }
            }   catch(SQLException e){
                throw new RuntimeException("Error executing SQL query", e);
            }
    }


    // For three categories
    public Long getRatingNominationIdThree(String empCode,String awardCategory,String awardSubCategory,String awardSubCategory2){
        String sql;
        System.out.println("Empcode for three: "+empCode);
        System.out.println("Emp category for three: "+awardCategory);
        System.out.println("Emp sub category for three: "+awardSubCategory);
        System.out.println("Emp sub category 2 for three: "+awardSubCategory2);
        sql = "SELECT nomination_id FROM nominee_list WHERE emp_code=? AND award_category=? AND award_sub_category=? AND award_sub_category2=?";

        try(Connection conn = dataSource.getConnection();
            PreparedStatement preparedStatement = conn.prepareStatement(sql)){
                preparedStatement.setString(1, empCode);
                preparedStatement.setString(2, awardCategory);
                preparedStatement.setString(3, awardSubCategory);
                preparedStatement.setString(4, awardSubCategory2);

                try (ResultSet rset = preparedStatement.executeQuery()){
                    if(rset.next()){
                        System.out.println("Fetched rating nomination ID : "+rset.getLong("nomination_id"));
                        return rset.getLong("nomination_id");
                    }else{
                        System.out.println("Not found rating nomination id");
                        return null;
                    }
                }
            }   catch(SQLException e){
                throw new RuntimeException("Error executing SQL query", e);
            }
    }




    public List<Map<String, Object>> getRatingDetails(Long nominationID) {
        String sql = "select parameter_name,description,rating from emp_ratings where nomination_id=?";

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, nominationID);
        Map<String, Object> response = new HashMap<>();

        if (result.isEmpty()) {
            response.put("status", "error");
            response.put("message", "No ratings found");
        } else {
            response.put("status", "error");
            response.put("message", "All rating found.");
        }

        return result;
    }



    public List<Map<String, Object>> getProjectDetailsByEmployeeCode(String employeeCode) {
        String sql = "SELECT * FROM nominee_project_record_details WHERE emp_code = ?";
    
        return jdbcTemplate.queryForList(sql, employeeCode);
    }

    // For 1
    public List<Map<String, Object>> getNominationDetails1(String empCode,String awardCategory) {
        String sql = "select * from nomination_details where emp_code = ? AND award_category=?";

        return jdbcTemplate.queryForList(sql, empCode,awardCategory);
    }


    // For 2
    public List<Map<String, Object>> getNominationDetails2(String empCode,String awardCategory,String awardSubCategory) {
        String sql = "select * from nomination_details where emp_code=? AND award_category=? AND award_sub_category=?";

        return jdbcTemplate.queryForList(sql, empCode,awardCategory,awardSubCategory);
    }

    // For 3
    public List<Map<String, Object>> getNominationDetails3(String empCode,String awardCategory,String awardSubCategory,String awardSubCategory2) {
        String sql = "select * from nomination_details where emp_code=? AND award_category=? AND award_sub_category=? AND award_sub_category2=?";

        return jdbcTemplate.queryForList(sql, empCode,awardCategory,awardSubCategory,awardSubCategory2);
    }
    

}
