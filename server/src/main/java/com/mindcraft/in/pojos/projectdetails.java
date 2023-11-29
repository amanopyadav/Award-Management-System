package com.mindcraft.in.pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="nominee_project_details")
public class ProjectDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private String id;

    @Column(name = "project_name")
    private String project_name;

    
    @Column(name = "client")
    private String client;

    @Column(name = "c_id")
    private String c_id;


    @Column(name = "industry_name")
    private String industry_name;
    
    public ProjectDetails() {
    }

    public ProjectDetails(String id, String project_name, String client, String c_id, String industry_name) {
        this.id = id;
        this.project_name = project_name;
        this.client = client;
        this.c_id = c_id;
        this.industry_name = industry_name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProject_name() {
        return project_name;
    }

    public void setProject_name(String project_name) {
        this.project_name = project_name;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getC_id() {
        return c_id;
    }

    public void setC_id(String c_id) {
        this.c_id = c_id;
    }

    public String getIndustry_name() {
        return industry_name;
    }

    public void setIndustry_name(String industry_name) {
        this.industry_name = industry_name;
    }

    
}
