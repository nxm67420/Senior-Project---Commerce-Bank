package edu.ucmo.commerce.dao;

import edu.ucmo.commerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository //Responsible for getting info TO && FROM the Database //CRUD && Queries on Database
public interface UserDao extends CrudRepository<User, Long> { //<Trying To Access, Type of Primary Key>

    //Sends Alert via Email to all role = "Admin" && Registered Emails
    User findByRoleAndEmail(String role, String email);

    User findByEmail(String email);

    //Used in Login Verification
    User findByUserName(String name);

    User findById(int id);

    //Finds all users with role 'Admin' || 'User'
    //Based on role assigned, allows access to certain HTML page
    List <User> findByRole(String role);

}
