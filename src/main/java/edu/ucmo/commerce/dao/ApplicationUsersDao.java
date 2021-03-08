package edu.ucmo.commerce.dao;

import edu.ucmo.commerce.model.ApplicationUsers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationUsersDao extends JpaRepository<ApplicationUsers, Integer> {
    ApplicationUsers findByApplicationId(int applicationId);
}
