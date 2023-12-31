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
        EmployeeDetails employeeDetails = nomineeListService.getEmployeeDetails(empCode);

        if (employeeDetails != null) {
            return ResponseEntity.ok(employeeDetails);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



    @GetMapping("/getProjectDetailsByEmployeeCode")
    public List<Map<String, Object>> getProjectDetailsByEmployeeCode(@RequestParam String employeeCode) {
        System.out.println("Received employeeCode: " + employeeCode);

        List<Map<String, Object>> result = employeeDetailsService.getProjectDetailsByEmployeeCode(employeeCode);

        System.out.println("Result from service: " + result);

        return result;
    }

    // for 1 categories

    @GetMapping("/getRatingNominationIdTeam/{projectCode}/{awardCategory}")
    public Long getNominationIDTeam(@PathVariable Long projectCode,@PathVariable String awardCategory){
        return employeeDetailsService.getRatingNominationIdTeam(awardCategory,projectCode);
    }

    @GetMapping("/getRatingNominationIdOne/{empCode}/{awardCategory}")
    public Long getNominationIDOne(@PathVariable String empCode,@PathVariable String awardCategory){
        return employeeDetailsService.getRatingNominationIdOne(empCode, awardCategory);
    }

    // for 2 categories
    @GetMapping("/getRatingNominationIdTwo/{empCode}/{awardCategory}/{awardSubCategory}")
    public Long getNominationIDTwo(@PathVariable String empCode,@PathVariable String awardCategory,@PathVariable String awardSubCategory){
        // System.out.println("Reached here");
        System.out.println("Employee code for two : "+empCode);
        System.out.println("Employee Category for two : "+awardCategory);
        System.out.println("Employee sub category for two : "+awardSubCategory);
        return employeeDetailsService.getRatingNominationIdTwo(empCode, awardCategory, awardSubCategory);
    }

    // For 3 categories
    @GetMapping("/getRatingNominationIdThree/{empCode}/{awardCategory}/{awardSubCategory}/{awardSubCategory2}")
    public Long getNominationIDThree(@PathVariable String empCode,@PathVariable String awardCategory,@PathVariable String awardSubCategory,@PathVariable String awardSubCategory2){
        return employeeDetailsService.getRatingNominationIdThree(empCode, awardCategory, awardSubCategory, awardSubCategory2);
    }


    @GetMapping("/getRatingDetails/{nominationID}")
    public List<Map<String, Object>> getRatingDetails(@PathVariable Long nominationID){
        return employeeDetailsService.getRatingDetails(nominationID);
    }

    // For 1
    @GetMapping("/getNominationDetails1/{empCode}/{awardCategory}")
    public List<Map<String, Object>> getNominationDetails1(@PathVariable String empCode,@PathVariable String awardCategory){
        return employeeDetailsService.getNominationDetails1(empCode,awardCategory);
    }

    // For 2
    @GetMapping("/getNominationDetails2/{empCode}/{awardCategory}/{awardSubCategory}")
    public List<Map<String, Object>> getNominationDetails2(@PathVariable String empCode,@PathVariable String awardCategory,@PathVariable String awardSubCategory){
        return employeeDetailsService.getNominationDetails2(empCode,awardCategory,awardSubCategory);
    }

    // For 3
    @GetMapping("/getNominationDetails3/{empCode}/{awardCategory}/{awardSubCategory}/{awardSubCategory2}")
    public List<Map<String, Object>> getNominationDetails3(@PathVariable String empCode,@PathVariable String awardCategory,@PathVariable String awardSubCategory,@PathVariable String awardSubCategory2){
        return employeeDetailsService.getNominationDetails3(empCode,awardCategory,awardSubCategory,awardSubCategory2);
    }
    


}