package edu.ucmo.commerce.dao;

import edu.ucmo.commerce.model.Alert;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface AlertDao extends CrudRepository<Alert, Integer> {
    //Alert findAlertByTimestamp(Date date);
}
