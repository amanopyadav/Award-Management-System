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
@Table(name="nominee_list")
public class NomineeList {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "nomination_id")
    private long nominationId;

    @Column(name = "award_id")
    private long awardId;

    @Column(name = "award_category")
    private String awardCategory;

    @Column(name = "award_sub_category")
    private String awardSubCategory;

    @Column(name = "emp_code")
    private String empCode;

    @Column(name = "emp_name")
    private String empName;

    @Column(name = "emp_designation")
    private String empDesignation;

    @Column(name = "unit")
    private String unit;

    @Column(name = "skill")
    private String skill;

    @Column(name = "mindcraft_exp_in_months")
    private long mindcraftExpInMonths;

    @Column(name = "total_exp_in_months")
    private long totalExpInMonths;

    @Column(name = "email_id")
    private String emailId;

    @Column(name = "contact_number")
    private long contactNumber;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "doj")
    private Date doj;

    @Column(name = "project_name")
    private String projectName;

    @Column(name = "project_code")
    private long projectCode;

    @Column(name = "client")
    private String client;

    @Column(name = "industry_name")
    private String industryName;

    @Column(name = "nominated_by")
    private String nominatedBy;

    @Column(name = "nom_by_designation")
    private String nomByDesignation;

    @Column(name = "onbehalf_of")
    private String onbehalfOf;

    @Column(name = "on_behalf_designation")
    private String onBehalfDesignation;

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

     public NomineeList() {
    }

    public NomineeList(long nominationId, long awardId, String awardCategory, String awardSubCategory, String empCode,
            String empName, String empDesignation, String unit, String skill, long mindcraftExpInMonths,
            long totalExpInMonths, String emailId, long contactNumber, Date dob, Date doj, String projectName,
            long projectCode, String client, String industryName, String nominatedBy, String nomByDesignation,
            String onbehalfOf, String onBehalfDesignation, boolean activeYN, String createdBy, Timestamp createdOn,
            String updatedBy, Timestamp updatedOn) {
        this.nominationId = nominationId;
        this.awardId = awardId;
        this.awardCategory = awardCategory;
        this.awardSubCategory = awardSubCategory;
        this.empCode = empCode;
        this.empName = empName;
        this.empDesignation = empDesignation;
        this.unit = unit;
        this.skill = skill;
        this.mindcraftExpInMonths = mindcraftExpInMonths;
        this.totalExpInMonths = totalExpInMonths;
        this.emailId = emailId;
        this.contactNumber = contactNumber;
        this.dob = dob;
        this.doj = doj;
        this.projectName = projectName;
        this.projectCode = projectCode;
        this.client = client;
        this.industryName = industryName;
        this.nominatedBy = nominatedBy;
        this.nomByDesignation = nomByDesignation;
        this.onbehalfOf = onbehalfOf;
        this.onBehalfDesignation = onBehalfDesignation;
        this.activeYN = activeYN;
        this.createdBy = createdBy;
        this.createdOn = createdOn;
        this.updatedBy = updatedBy;
        this.updatedOn = updatedOn;
    }

    public long getNominationId() {
        return nominationId;
    }

    public void setNominationId(long nominationId) {
        this.nominationId = nominationId;
    }

    public long getAwardId() {
        return awardId;
    }

    public void setAwardId(long awardId) {
        this.awardId = awardId;
    }

    public String getAwardCategory() {
        return awardCategory;
    }

    public void setAwardCategory(String awardCategory) {
        this.awardCategory = awardCategory;
    }

    public String getAwardSubCategory() {
        return awardSubCategory;
    }

    public void setAwardSubCategory(String awardSubCategory) {
        this.awardSubCategory = awardSubCategory;
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

    public String getEmpDesignation() {
        return empDesignation;
    }

    public void setEmpDesignation(String empDesignation) {
        this.empDesignation = empDesignation;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }

    public long getMindcraftExpInMonths() {
        return mindcraftExpInMonths;
    }

    public void setMindcraftExpInMonths(long mindcraftExpInMonths) {
        this.mindcraftExpInMonths = mindcraftExpInMonths;
    }

    public long getTotalExpInMonths() {
        return totalExpInMonths;
    }

    public void setTotalExpInMonths(long totalExpInMonths) {
        this.totalExpInMonths = totalExpInMonths;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public long getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(long contactNumber) {
        this.contactNumber = contactNumber;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public Date getDoj() {
        return doj;
    }

    public void setDoj(Date doj) {
        this.doj = doj;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public long getProjectCode() {
        return projectCode;
    }

    public void setProjectCode(long projectCode) {
        this.projectCode = projectCode;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getIndustryName() {
        return industryName;
    }

    public void setIndustryName(String industryName) {
        this.industryName = industryName;
    }

    public String getNominatedBy() {
        return nominatedBy;
    }

    public void setNominatedBy(String nominatedBy) {
        this.nominatedBy = nominatedBy;
    }

    public String getNomByDesignation() {
        return nomByDesignation;
    }

    public void setNomByDesignation(String nomByDesignation) {
        this.nomByDesignation = nomByDesignation;
    }

    public String getOnbehalfOf() {
        return onbehalfOf;
    }

    public void setOnbehalfOf(String onbehalfOf) {
        this.onbehalfOf = onbehalfOf;
    }

    public String getOnBehalfDesignation() {
        return onBehalfDesignation;
    }

    public void setOnBehalfDesignation(String onBehalfDesignation) {
        this.onBehalfDesignation = onBehalfDesignation;
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
