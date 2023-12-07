package com.mindcraft.in.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class AwardService {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AwardService(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

 public List<Map<String, Object>> getAllAwards(String category, String subCategory) {
        String sql = "SELECT * FROM m_award where award_category = ? and award_sub_category= ?";

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, category, subCategory);
        Map<String, Object> response = new HashMap<>();

        if (result.isEmpty()) {
            response.put("status", "error");
            response.put("message", "No Awards Found.");
        } else {
            response.put("status", "error");
            response.put("message", "All Awards Found.");
        }
        return result;
    }
    
}
