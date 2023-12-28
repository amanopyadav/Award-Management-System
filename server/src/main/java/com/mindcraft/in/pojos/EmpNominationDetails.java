package com.mindcraft.in.pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Id;

@Entity
@Table(name="nomination_details")
public class EmpNominationDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "emp_code")
    private String empCode;

    @Column(name = "award_category")
    private String award_category;

    @Column(name = "award_sub_category")
    private String award_sub_category;

    @Column(name = "award_sub_category2")
    private String award_sub_category2;

    @Column(name = "nominated_by")
    private String nominated_by;

    @Column(name = "nom_by_designation")
    private String nom_by_designation;

    @Column(name = "onbehalf_of")
    private String onbehalf_of;

    @Column(name = "on_behalf_designation")
    private String on_behalf_designation;

    public EmpNominationDetails(){

    }

    public EmpNominationDetails(String empCode, String award_category, String award_sub_category,
            String award_sub_category2, String nominated_by, String nom_by_designation, String onbehalf_of,
            String on_behalf_designation) {
        this.empCode = empCode;
        this.award_category = award_category;
        this.award_sub_category = award_sub_category;
        this.award_sub_category2 = award_sub_category2;
        this.nominated_by = nominated_by;
        this.nom_by_designation = nom_by_designation;
        this.onbehalf_of = onbehalf_of;
        this.on_behalf_designation = on_behalf_designation;
    }

    public String getEmpCode() {
        return empCode;
    }

    public void setEmpCode(String empCode) {
        this.empCode = empCode;
    }

    public String getAward_category() {
        return award_category;
    }

    public void setAward_category(String award_category) {
        this.award_category = award_category;
    }

    public String getAward_sub_category() {
        return award_sub_category;
    }

    public void setAward_sub_category(String award_sub_category) {
        this.award_sub_category = award_sub_category;
    }

    public String getAward_sub_category2() {
        return award_sub_category2;
    }

    public void setAward_sub_category2(String award_sub_category2) {
        this.award_sub_category2 = award_sub_category2;
    }

    public String getNominated_by() {
        return nominated_by;
    }

    public void setNominated_by(String nominated_by) {
        this.nominated_by = nominated_by;
    }

    public String getNom_by_designation() {
        return nom_by_designation;
    }

    public void setNom_by_designation(String nom_by_designation) {
        this.nom_by_designation = nom_by_designation;
    }

    public String getOnbehalf_of() {
        return onbehalf_of;
    }

    public void setOnbehalf_of(String onbehalf_of) {
        this.onbehalf_of = onbehalf_of;
    }

    public String getOn_behalf_designation() {
        return on_behalf_designation;
    }

    public void setOn_behalf_designation(String on_behalf_designation) {
        this.on_behalf_designation = on_behalf_designation;
    }

    
}
