package com.mindcraft.in.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mindcraft.in.pojos.empdetails;

@Repository
public interface empdetails_repo extends JpaRepository<empdetails, Integer>{
    @Query("SELECT en FROM empdetails en WHERE en.emp_name= :emp_name")
    List<empdetails> findByEmpName(String emp_name); 

    List<empdetails> findAll();
}
