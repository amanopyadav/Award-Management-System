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




// package com.mindcraft.in.controllers;

// import java.util.List;
// import java.util.Map;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.mindcraft.in.pojos.projectdetails;
// import com.mindcraft.in.repository.projectdetails_repo;

// @RestController
// @RequestMapping("form")
// public class projectdetails_controller {
//  private final projectdetails_repo projectdetails_repo;
 
//  @Autowired
//  public projectdetails_controller(projectdetails_repo projectdetails_repo){
//     this.projectdetails_repo= projectdetails_repo;
//  }


// @PostMapping("/projectDetailsByName")
// public ResponseEntity<List<projectdetails>> getProjectsByName(@RequestBody Map<String, String> requestBody) {
//     try {
//         String projectName = requestBody.get("project_name");

//         if (projectName == null || projectName.isEmpty()) {
//             return ResponseEntity.badRequest().build();
//         }

//         List<projectdetails> projects = projectdetails_repo.findByProjName(projectName);

//         if (projects != null && !projects.isEmpty()) {
//             return ResponseEntity.ok(projects);
//         } else {
//             return ResponseEntity.notFound().build();
//         }
//     } catch (Exception e) {
//         // Handle exceptions
//         return ResponseEntity.badRequest().build();
//     }
// }


//     @PostMapping("/allProjects")
//     public ResponseEntity<List<projectdetails>> getAllProjects() {
//         try {
//             List<projectdetails> allProjects = projectdetails_repo.findAll();

//             if (allProjects != null && !allProjects.isEmpty()) {
//                 return ResponseEntity.ok(allProjects);
//             } else {
//                 return ResponseEntity.notFound().build();
//             }
//         } catch (Exception e) {
//             // Handle exceptions
//             return ResponseEntity.badRequest().build();
//         }
//     }


// }


