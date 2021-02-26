package edu.ucmo.commerce.model;

import javax.persistence.*;

@Entity //Exists in the Database
@Table(name = "role") //Table in The Database roles
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "role_id")
    private int id;

    @Column(name = "role")
    private String role;

    //Empty Constructor
    public Role() {
    }

    //Filled Constructor
    public  Role(String role){
        this.role = role;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "Role {" +
                "id=" + id +
                ", role='" + role + '\'' +
                '}';
    }
}