package com.mindcraft.in.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.services.EmployeeDetailsService;

@RestController
public class EmpDetailsController {
    private final EmployeeDetailsService employeeDetailsService;

    @Autowired
    public EmpDetailsController(EmployeeDetailsService employeeDetailsService) {
        this.employeeDetailsService = employeeDetailsService;
    }

    @GetMapping("/allEmployees")
    public List<Map<String, Object>> getAllEmployees() {
        List<Map<String, Object>> request = employeeDetailsService.getAllEmployees();
        return request;
    }

    @GetMapping("/allEmployees/{empId}")
    public List<Map<String, Object>> getAllEmployees(@PathVariable Long empId) {
        List<Map<String, Object>> request = employeeDetailsService.getAllEmployees(empId);
        return request;
    }

     @GetMapping("/allExceptFreshers")
    public List<Map<String, Object>> getAllExceptFreshers() {
        List<Map<String, Object>> request = employeeDetailsService.getAllExceptFreshers();
        return request;
    }


    @GetMapping("/getAwardId")
    public Integer getAwardId(@RequestParam String awardCategory, @RequestParam(required = false) String awardSubCategory) {
        if(awardSubCategory!=null){
            return employeeDetailsService.getAwardId(awardCategory, awardSubCategory);
        }else{
            return employeeDetailsService.getAwardIdSingle(awardCategory);
        }
    }

    @GetMapping("/getProjectDetailsByEmployeeCode")
    public List<Map<String, Object>> getProjectDetailsByEmployeeCode(@RequestParam String employeeCode) {
        System.out.println("Received employeeCode: " + employeeCode);

        List<Map<String, Object>> result = employeeDetailsService.getProjectDetailsByEmployeeCode(employeeCode);

        System.out.println("Result from service: " + result);

        return result;
    }



}