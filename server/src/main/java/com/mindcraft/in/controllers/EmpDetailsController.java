package com.mindcraft.in.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.pojos.EmployeeDetails;
import com.mindcraft.in.services.EmployeeDetailsService;
import com.mindcraft.in.services.NomineeListService;

@RestController
public class EmpDetailsController {
    private final EmployeeDetailsService employeeDetailsService;
    private final NomineeListService nomineeListService;

    @Autowired
    public EmpDetailsController(EmployeeDetailsService employeeDetailsService,NomineeListService nomineeListService) {
        this.employeeDetailsService = employeeDetailsService;
        this.nomineeListService = nomineeListService;
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

    @GetMapping("/getAwardIdForSales")
    public Integer getAwardIdForSales(@RequestParam String awardCategory, @RequestParam String awardSubCategory, @RequestParam String awardSubCategory1 ) {
        return employeeDetailsService.getAwardIdForSales(awardCategory, awardSubCategory, awardSubCategory1);
        
    }

    // New method to get employee details
    @GetMapping("/employeeDetails/{empCode}")
    public ResponseEntity<EmployeeDetails> getEmployeeDetails(@PathVariable String empCode) {
        System.out.println("Also reached here");
        EmployeeDetails employeeDetails = nomineeListService.getEmployeeDetails(empCode);

        if (employeeDetails != null) {
            return ResponseEntity.ok(employeeDetails);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }




}