package com.mindcraft.in.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.mindcraft.in.pojos.User;

@Service
public class LoginService {

    private final JdbcTemplate jdbcTemplate;

    public LoginService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Map<String, String> login(User user) {
        String sql = "Select roles from login where username = ? and password = ?";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, user.getUsername(), user.getPassword());
        String role = (String) result.get(0).get("roles");
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("role", role);
        response.put("message", "Login successful");
        System.out.println(role);
        return response;
    }

}
