package com.mindcraft.in.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mindcraft.in.pojos.empdetails;
import com.mindcraft.in.pojos.projectdetails;

@Repository
public interface projectdetails_repo extends JpaRepository<projectdetails, Integer>{
    @Query("SELECT ep FROM projectdetails ep WHERE ep.project_name= :project_name")
    List<projectdetails> findByProjName(String project_name);   

    List<projectdetails> findAll();
    
}
