package edu.ucmo.commerce.dao;

import edu.ucmo.commerce.model.Alert;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface AlertDao extends CrudRepository<Alert, Integer> {

    @Query("select a from Alert a where a.application_id=:application_id")
    List<Alert> findAlertByApplicationId(String application_id);

    //Find ALL Alerts
    List<Alert> findAllBy();

    //Find Alerts w/ specific id
    Optional<Alert> findById(Integer id);

    //Find Alerts that have been (checked && !checked)
    List<Alert> findByChecked(Boolean checked);

    //Delete Specific ID
    void deleteAlertById(Integer id);

    //Finds *Possible Alerts that are Unchecked && Two Days Old
    Optional<Alert> findByCheckedAndTimestamp(Boolean checked, Date date);
}
