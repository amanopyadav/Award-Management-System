package com.mindcraft.in.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mindcraft.in.services.AwardService;

@RestController
public class AwardController {
    private final AwardService awardService;

    @Autowired
    public AwardController(AwardService awardService){
        this.awardService  = awardService;
    }

    //  @GetMapping("/awards")
    // public List<Map<String, Object>> getAllAwards(@PathVariable String category, @PathVariable String SubCategory) {
    //     List<Map<String, Object>> request = awardService.getAllAwards(category, SubCategory );
    //     return request;
    // }

   @GetMapping("/awards")
   public List<Map<String, Object>> getAllAwards(@RequestParam String category, @RequestParam String subCategory) {
    List<Map<String, Object>> request = awardService.getAllAwards(category, subCategory);
    return request;
}


    
}
