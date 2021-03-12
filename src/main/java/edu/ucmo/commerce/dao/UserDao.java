package edu.ucmo.commerce.dao;

import edu.ucmo.commerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository //Responsible for getting info TO && FROM the Database //CRUD && Queries on Database
public interface UserDao extends CrudRepository<User, Long> { //<Trying To Access, Type of Primary Key>
    User findByemail(String email);
    User findByUserName(String userName);
    User findByRole(int role);
}
