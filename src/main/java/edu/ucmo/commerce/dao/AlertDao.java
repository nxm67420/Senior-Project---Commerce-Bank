package edu.ucmo.commerce.dao;

import edu.ucmo.commerce.model.Alert;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlertDao extends CrudRepository<Alert, Integer> {
    @Query("select a from Alert a where a.application_id=:application_id")
    List<Alert> findAlertByApplicationId(String application_id);
}
