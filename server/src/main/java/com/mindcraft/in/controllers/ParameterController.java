package com.mindcraft.in.controllers;

import java.util.List;

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
    public ResponseEntity<String> addParameters(@RequestBody List<ParameterFormData> paramFormDataList,
                                               @PathVariable Long nominationId,
                                               @PathVariable Long latestAwardId) {
        try {
            parameterService.updateParameters(paramFormDataList, nominationId, latestAwardId);
            return ResponseEntity.ok("Parameters added successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding parameters.");
        }
    }

    @GetMapping("/getNominationIdAndLatestAwardId")
    public NominationAndAwardIdResponse getNominationIdAndLatestAwardId(
            @RequestParam String awardCategory,
            @RequestParam String awardSubCategory,
            @RequestParam String awardSubCategory1) {

                System.out.println("Award category : "+awardCategory);
                System.out.println("Award sub category: "+awardSubCategory);
                System.out.println("Award sub category1: "+awardSubCategory1);
        return parameterService.getNominationIdAndLatestAwardId(awardCategory, awardSubCategory, awardSubCategory1);
    }
}

