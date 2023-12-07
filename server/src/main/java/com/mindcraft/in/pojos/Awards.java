package com.mindcraft.in.pojos;



import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="m_award")
public class Awards {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "award_id")
    private Integer id;

    @Column(name = "award_category")
    private String award_category;

    @Column(name = "award_sub_category")
    private String award_sub_category;

    @Column(name = "period")
    private Integer period;

    @Column(name = "eligibility_criteria")
    private String eligibility_criteria;

    @Column(name = "award_count")
    private Integer award_count;

    @Column(name = "award_price")
    private Integer award_price;

    @Column(name = "total_value")
    private Integer total_value;

    @Column(name = "active_yn")
    private boolean active_yn;

    @Column(name = "created_by")
    private String created_by;

    @Column(name = "created_on")
    private  java.sql.Timestamp created_on;

    @Column(name = "updated_by")
    private String updated_by;

    @Column(name = "updated_on")
    private  java.sql.Timestamp updated_on;

    public Awards() {
    }

    public Awards(Integer id, String award_category, String award_sub_category, Integer period,
            String eligibility_criteria, Integer award_count, Integer award_price, Integer total_value,
            boolean active_yn, String created_by, Timestamp created_on, String updated_by, Timestamp updated_on) {
        this.id = id;
        this.award_category = award_category;
        this.award_sub_category = award_sub_category;
        this.period = period;
        this.eligibility_criteria = eligibility_criteria;
        this.award_count = award_count;
        this.award_price = award_price;
        this.total_value = total_value;
        this.active_yn = active_yn;
        this.created_by = created_by;
        this.created_on = created_on;
        this.updated_by = updated_by;
        this.updated_on = updated_on;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Integer getPeriod() {
        return period;
    }

    public void setPeriod(Integer period) {
        this.period = period;
    }

    public String getEligibility_criteria() {
        return eligibility_criteria;
    }

    public void setEligibility_criteria(String eligibility_criteria) {
        this.eligibility_criteria = eligibility_criteria;
    }

    public Integer getAward_count() {
        return award_count;
    }

    public void setAward_count(Integer award_count) {
        this.award_count = award_count;
    }

    public Integer getAward_price() {
        return award_price;
    }

    public void setAward_price(Integer award_price) {
        this.award_price = award_price;
    }

    public Integer getTotal_value() {
        return total_value;
    }

    public void setTotal_value(Integer total_value) {
        this.total_value = total_value;
    }

    public boolean isActive_yn() {
        return active_yn;
    }

    public void setActive_yn(boolean active_yn) {
        this.active_yn = active_yn;
    }

    public String getCreated_by() {
        return created_by;
    }

    public void setCreated_by(String created_by) {
        this.created_by = created_by;
    }

    public java.sql.Timestamp getCreated_on() {
        return created_on;
    }

    public void setCreated_on(java.sql.Timestamp created_on) {
        this.created_on = created_on;
    }

    public String getUpdated_by() {
        return updated_by;
    }

    public void setUpdated_by(String updated_by) {
        this.updated_by = updated_by;
    }

    public java.sql.Timestamp getUpdated_on() {
        return updated_on;
    }

    public void setUpdated_on(java.sql.Timestamp updated_on) {
        this.updated_on = updated_on;
    }

    

}
