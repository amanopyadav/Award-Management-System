package com.mindcraft.in.controllers;

import com.mindcraft.in.pojos.NomineeList;
import com.mindcraft.in.services.NomineeListService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class NomineeListController {

    private final NomineeListService nomineeListService;

    public NomineeListController(NomineeListService nomineeListService) {
        this.nomineeListService = nomineeListService;
    }

    @RequestMapping(value = "/addNomineeList", method = RequestMethod.POST)
    public ResponseEntity<Map<String, String>> insertNomineeList(@RequestBody NomineeList nomineeList) {
        Map<String, String> response = nomineeListService.insertNomineeListRecord(nomineeList);
        System.out.println(response);
        if ("success".equals(response.get("status"))) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }


    @GetMapping("/nomineeList")
    public List<Map<String, Object>> getNomineeList() {
        List<Map<String, Object>> request = nomineeListService.getNomineeList();
        return request;
    }
}

