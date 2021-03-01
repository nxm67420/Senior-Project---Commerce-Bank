//package edu.ucmo.commerce.model;
//
//import javax.persistence.*;
//
//@Entity //Exists in the Database
//@Table(name = "role") //Table in The Database roles
//public class Role {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    @Column(name = "role_id")
//    private int id;
//
//    @Column(name = "role")
//    private String role;
//
//    //Empty Constructor
//    public Role() {
//    }
//
//    //Create Role Object when User Object is created
//    public  Role(String role){
//        this.role = role;
//    }
//
//    public int getId() {
//        return id;
//    }
//
//    //Set ID accordingly to User ID /*Will Be Foreign Key*/
//    public void setId(int id) {
//        this.id = id;
//    }
//
//    public String getRole() {
//        return role;
//    }
//
//    //Sets user role as "Admin" || "User"
//    //This will determine who has permission to access & edit sensitive files
//    public void setRole(String role) {
//        this.role = role;
//    }
//
//    @Override
//    public String toString() {
//        return "Role {" +
//                "id=" + id +
//                ", role='" + role + '\'' +
//                '}';
//    }
//}