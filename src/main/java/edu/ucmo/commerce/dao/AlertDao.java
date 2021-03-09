package edu.ucmo.commerce.dao;

import com.sun.org.apache.xpath.internal.operations.Bool;
import edu.ucmo.commerce.model.Alert;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface AlertDao extends CrudRepository<Alert, Integer> {

    //Find ALL Alerts
    List<Alert> findAllBy();

    //Find Alerts w/ specific id
    Optional<Alert> findById(Integer id);

    //Find Alerts that have been !checked
    List<Alert> findByChecked(Boolean checked);


    //Find Alerts that have been altered / tampered


    //Find Alerts.Unchecked && Alerts.DaysOld == 2
    //If File is unchecked && Time > 2 Days THEN Filter
    //List<Alert> findByNotCheckedAndTimestamp(Date posted, Date passed);



}
