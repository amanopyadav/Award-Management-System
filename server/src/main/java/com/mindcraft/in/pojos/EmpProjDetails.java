package com.mindcraft.in.pojos;

import java.sql.Date;
import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="emp_projects")
public class EmpProjDetails {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "emp_code")
    private String empCode;

    @Column(name = "emp_name")
    private String empName;

    @Column(name = "designation_name")
    private String designationName;

    @Column(name = "primary_skill_name")
    private String primarySkillName;

    @Column(name = "mindcraft_exp_months")
    private Long mindcraftExpMonths;

    @Column(name = "total_exp_mon")
    private Long totalExpMonths;

    @Column(name = "email")
    private String email;

    @Column(name = "mobileno")
    private Long mobileNumber;

    @Column(name = "dob")
    private Date dateOfBirth;

    @Column(name = "joining_date")
    private Date joiningDate;

    @Column(name = "project_code")
    private String projectCode;

    @Column(name = "project_desc")
    private String projectDesc;

    @Column(name = "client_name")
    private String clientName;

    @Column(name = "indstry_name")
    private String industryName;

    @Column(name = "active_yn")
    private boolean activeYN;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_on")
    private java.sql.Timestamp createdOn;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_on")
    private java.sql.Timestamp updatedOn;

    public EmpProjDetails() {
    }

    public EmpProjDetails(String empCode, String empName, String designationName, String primarySkillName,
            Long mindcraftExpMonths, Long totalExpMonths, String email, Long mobileNumber, Date dateOfBirth,
            Date joiningDate, String projectCode, String projectDesc, String clientName, String industryName,
            boolean activeYN, String createdBy, Timestamp createdOn, String updatedBy, Timestamp updatedOn) {
        this.empCode = empCode;
        this.empName = empName;
        this.designationName = designationName;
        this.primarySkillName = primarySkillName;
        this.mindcraftExpMonths = mindcraftExpMonths;
        this.totalExpMonths = totalExpMonths;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.dateOfBirth = dateOfBirth;
        this.joiningDate = joiningDate;
        this.projectCode = projectCode;
        this.projectDesc = projectDesc;
        this.clientName = clientName;
        this.industryName = industryName;
        this.activeYN = activeYN;
        this.createdBy = createdBy;
        this.createdOn = createdOn;
        this.updatedBy = updatedBy;
        this.updatedOn = updatedOn;
    }

    public String getEmpCode() {
        return empCode;
    }

    public void setEmpCode(String empCode) {
        this.empCode = empCode;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public String getDesignationName() {
        return designationName;
    }

    public void setDesignationName(String designationName) {
        this.designationName = designationName;
    }

    public String getPrimarySkillName() {
        return primarySkillName;
    }

    public void setPrimarySkillName(String primarySkillName) {
        this.primarySkillName = primarySkillName;
    }

    public Long getMindcraftExpMonths() {
        return mindcraftExpMonths;
    }

    public void setMindcraftExpMonths(Long mindcraftExpMonths) {
        this.mindcraftExpMonths = mindcraftExpMonths;
    }

    public Long getTotalExpMonths() {
        return totalExpMonths;
    }

    public void setTotalExpMonths(Long totalExpMonths) {
        this.totalExpMonths = totalExpMonths;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(Long mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Date getJoiningDate() {
        return joiningDate;
    }

    public void setJoiningDate(Date joiningDate) {
        this.joiningDate = joiningDate;
    }

    public String getProjectCode() {
        return projectCode;
    }

    public void setProjectCode(String projectCode) {
        this.projectCode = projectCode;
    }

    public String getProjectDesc() {
        return projectDesc;
    }

    public void setProjectDesc(String projectDesc) {
        this.projectDesc = projectDesc;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getIndustryName() {
        return industryName;
    }

    public void setIndustryName(String industryName) {
        this.industryName = industryName;
    }

    public boolean isActiveYN() {
        return activeYN;
    }

    public void setActiveYN(boolean activeYN) {
        this.activeYN = activeYN;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public java.sql.Timestamp getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(java.sql.Timestamp createdOn) {
        this.createdOn = createdOn;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public java.sql.Timestamp getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(java.sql.Timestamp updatedOn) {
        this.updatedOn = updatedOn;
    }






   
   
    
   
    
    
   
    
   
    
    
    
    
}
