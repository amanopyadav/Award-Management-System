package com.mindcraft.in.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.pojos.NominationAndAwardIdResponse;
import com.mindcraft.in.pojos.ParameterFormData;
import com.mindcraft.in.services.ParameterService;

@RestController
// @RequestMapping("/api/parameters")
public class ParameterController {

    private final ParameterService parameterService;
    

    public ParameterController(ParameterService parameterService) {
        this.parameterService = parameterService;
    }


    @PostMapping("/addNomineeParamData/{nominationId}/{latestAwardId}")
    public ResponseEntity<Map<String, String>> addParameters(@RequestBody List<ParameterFormData> paramFormDataList,
                                                @PathVariable Long nominationId,
                                                @PathVariable Long latestAwardId) {
        Map<String, String> response = new HashMap<>();
        try {
            // rest of your logic
            parameterService.updateParameters(paramFormDataList, nominationId, latestAwardId);
            response.put("status", "success");
            response.put("message", "Parameters added successfully.");
        return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("status", "error");
            response.put("message", "Error adding parameters.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @GetMapping("/getNominationIdAndLatestAwardId3")
    public NominationAndAwardIdResponse getNominationIdAndLatestAwardId(
            @RequestParam String awardCategory,
            @RequestParam String awardSubCategory,
            @RequestParam String awardSubCategory1) {

                System.out.println("Award category : "+awardCategory);
                System.out.println("Award sub category: "+awardSubCategory);
                System.out.println("Award sub category1: "+awardSubCategory1);
        return parameterService.getNominationIdAndLatestAwardId3(awardCategory, awardSubCategory, awardSubCategory1);
    }


     @GetMapping("/getNominationIdAndLatestAwardId2")
    public NominationAndAwardIdResponse getNominationIdAndLatestAwardId(
            @RequestParam String awardCategory,
            @RequestParam String awardSubCategory) {

                System.out.println("Award category : "+awardCategory);
                System.out.println("Award sub category: "+awardSubCategory);
        return parameterService.getNominationIdAndLatestAwardId2(awardCategory, awardSubCategory);
    }



     @GetMapping("/getNominationIdAndLatestAwardId1")
    public NominationAndAwardIdResponse getNominationIdAndLatestAwardId(
            @RequestParam String awardCategory) {

                System.out.println("Award category : "+awardCategory);
        return parameterService.getNominationIdAndLatestAwardId1(awardCategory);
    }

   
}

