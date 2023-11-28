package com.mindcraft.in.pojos;


import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="emp_details")
public class EmpDetails {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "emp_id")
    private Integer id;

    @Column(name = "emp_name")
    private String emp_name;

    @Column(name = "designation_name")
    private String designation_name;

    @Column(name = "unit")
    private String unit;

    @Column(name = "primary_skill_name")
    private String primary_skill_name;

    @Column(name = "mindcraft_exp_mon")
    private Integer mindcraft_exp_mon;

    @Column(name = "total_exp_mon")
    private Integer total_exp_mon;

    @Column(name = "email")
    private String email;

    @Column(name = "mobileno")
    private Long mobileno;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "joining_date")
    private Date joining_date;

    public EmpDetails() {
    }

    public EmpDetails(Integer id, String emp_name, String designation_name, String unit, String primary_skill_name,
            Integer mindcraft_exp_mon, Integer total_exp_mon, String email, Long mobileno, Date dob,
            Date joining_date) {
        this.id = id;
        this.emp_name = emp_name;
        this.designation_name = designation_name;
        this.unit = unit;
        this.primary_skill_name = primary_skill_name;
        this.mindcraft_exp_mon = mindcraft_exp_mon;
        this.total_exp_mon = total_exp_mon;
        this.email = email;
        this.mobileno = mobileno;
        this.dob = dob;
        this.joining_date = joining_date;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmp_name() {
        return emp_name;
    }

    public void setEmp_name(String emp_name) {
        this.emp_name = emp_name;
    }

    public String getDesignation_name() {
        return designation_name;
    }

    public void setDesignation_name(String designation_name) {
        this.designation_name = designation_name;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getPrimary_skill_name() {
        return primary_skill_name;
    }

    public void setPrimary_skill_name(String primary_skill_name) {
        this.primary_skill_name = primary_skill_name;
    }

    public Integer getMindcraft_exp_mon() {
        return mindcraft_exp_mon;
    }

    public void setMindcraft_exp_mon(Integer mindcraft_exp_mon) {
        this.mindcraft_exp_mon = mindcraft_exp_mon;
    }

    public Integer getTotal_exp_mon() {
        return total_exp_mon;
    }

    public void setTotal_exp_mon(Integer total_exp_mon) {
        this.total_exp_mon = total_exp_mon;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getMobileno() {
        return mobileno;
    }

    public void setMobileno(Long mobileno) {
        this.mobileno = mobileno;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public Date getJoining_date() {
        return joining_date;
    }

    public void setJoining_date(Date joining_date) {
        this.joining_date = joining_date;
    }


}

