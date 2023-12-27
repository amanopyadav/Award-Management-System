package com.mindcraft.in.controllers;

import com.mindcraft.in.services.ProjectDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/projects")
public class ProjectDetailsController {
    private final ProjectDetailsService projectDetailsService;

    @Autowired
    public ProjectDetailsController(ProjectDetailsService projectDetailsService) {
        this.projectDetailsService = projectDetailsService;
    }

    @GetMapping("/all")
    public List<Map<String, Object>> getAllProjects() {
        return projectDetailsService.getAllProjects();
    }

    @GetMapping("/{projectId}")
    public List<Map<String, Object>> getProjectById(@PathVariable String projectId) {
        return projectDetailsService.getProjectById(projectId);
    }

    // Additional methods for CRUD operations can be added as needed
}




