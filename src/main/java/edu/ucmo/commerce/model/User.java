package edu.ucmo.commerce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id //Primary Key
    @GeneratedValue(strategy = GenerationType.AUTO) //Auto Increment
    @Column(name = "user_id")
    private Integer id;

    //@NotNull(message = "LastName can not be null!!")
    //@NotEmpty(message = "LastName can not be empty!!")
    @Column(name = "user_name")
    private String userName;

    @Column(name = "email")
    private String email;


    @Column(name = "password")
    @JsonIgnore
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "role")
    private Integer role;

    //@Column(name = "active")
    //private Boolean active;

    //empty constructor
    public User(){}

    //Filled Constructor
    public User(String userName, String email, String password, String firstName, String lastName, Integer role){
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;

    }

    //!!!!Double Check this Table Merge
//    @ManyToMany(cascade = CascadeType.MERGE)
//    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
//    private Set<Role> roles;

    public Integer getId() {
        return id;
    }

    //Auto Set User Identification
    public void setId(Integer id) {
        this.id = id;
    }

    //Retrieves username
    public String getUserName() {
        return userName;
    }

    //Set username
    public void setUserName(String userName) {
        this.userName = userName;
    }

    //Get email will be used for 'Alert' system
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }

    /*
    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
     */

//    public Set<Role> getRoles() {
//        return roles;
//    }
//
//    public void setRoles(Set<Role> roles) {
//        this.roles = roles;
//    }


    @Override
    public String toString() {
        return "User { " +
                "id=" + id +
                ", userName ='" + userName + '\'' +
                ", email ='" + email + '\'' +
                ", password ='" + password + '\'' +
                ", firstName ='" + firstName + '\'' +
                ", lastName ='" + lastName + '\'' +
                ", roles =" + role +
                '}';
    }
}
