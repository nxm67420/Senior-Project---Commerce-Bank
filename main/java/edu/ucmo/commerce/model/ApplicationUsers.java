package edu.ucmo.commerce.model;

import javax.persistence.*;

@Entity
@Table(name = "application_users")
public class ApplicationUsers {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "application_user_id")
    private int id;
    @Column(name = "user_id")
    private int userId;
    @Column(name = "application_id")
    private String applicationId;

    @Override
    public String toString() {
        return "ApplicationUsers{" +
                "id=" + id +
                ", userId=" + userId +
                ", applicationId=" + applicationId +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(String applicationId) {
        this.applicationId = applicationId;
    }
}
