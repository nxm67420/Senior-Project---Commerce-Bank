package edu.ucmo.commerce.dao;

import edu.ucmo.commerce.model.ApplicationUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationUsersDao extends JpaRepository<ApplicationUsers, Integer> {
    List<ApplicationUsers> findByUserId(int userId);
    List<ApplicationUsers> findByApplicationId(String applicationId);
}
