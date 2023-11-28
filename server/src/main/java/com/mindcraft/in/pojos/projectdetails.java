package com.mindcraft.in.pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name ="nominee_project_details")
public class projectdetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
    private int id;

    @Column(name = "project_name")
    private String project_name;

    @Column(name = "project_code")
    private String project_code;

    @Column(name = "client")
    private String client;

    @Column(name = "nominated_by")
    private String nominated_by;
    
    public projectdetails() {
    }

    public projectdetails(int id, String project_name, String project_code, String client, String nominate_by) {
        this.id = id;
        this.project_name = project_name;
        this.project_code = project_code;
        this.client = client;
        this.nominated_by = nominated_by;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProject_name() {
        return project_name;
    }

    public void setProject_name(String project_name) {
        this.project_name = project_name;
    }

    public String getProject_code() {
        return project_code;
    }

    public void setProject_code(String project_code) {
        this.project_code = project_code;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getNominated_by() {
        return nominated_by;
    }

    public void setNominated_by(String nominated_by) {
        this.nominated_by = nominated_by;
    }
    
}
