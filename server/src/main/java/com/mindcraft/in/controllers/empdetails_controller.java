package com.mindcraft.in.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.pojos.empdetails;
import com.mindcraft.in.repository.empdetails_repo;

@RestController
@RequestMapping("form")
public class empdetails_controller {
    private final empdetails_repo empdetails_repo;

    @Autowired
    public empdetails_controller(empdetails_repo empdetails_repo){
        this.empdetails_repo= empdetails_repo;
    }

    @PostMapping("/employeeDetails")
    public ResponseEntity<List<empdetails>> getEmployeesByEmpNameWithRequestBody(@RequestBody Map<String, Object> request) {
        Object empNameObject = request.get("emp_name");

        if (empNameObject == null) {
            return ResponseEntity.badRequest().build();
        }

        try {
            String empName = empNameObject.toString();
            List<empdetails> employees = empdetails_repo.findByEmpName(empName);

            if (employees != null && !employees.isEmpty()) {
                return ResponseEntity.ok(employees);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Handle exceptions
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/allEmployees")
    public ResponseEntity<List<empdetails>> getAllEmployees() {
        try {
            List<empdetails> allEmployees = empdetails_repo.findAll();

            if (allEmployees != null && !allEmployees.isEmpty()) {
                return ResponseEntity.ok(allEmployees);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Handle exceptions
            return ResponseEntity.badRequest().build();
        }
    }


}
