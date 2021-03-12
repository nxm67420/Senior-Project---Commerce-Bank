package edu.ucmo.commerce.dao;

import edu.ucmo.commerce.model.Alert;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

//Can query to Database
@Repository
public interface AlertDao extends CrudRepository<Alert, Integer> {

    //Find all Alerts
    List<Alert> findAll();

    //Find Alert By ID
    Optional<Alert> findById(Integer id);

    @Query("select a from Alert a where a.application_id=:application_id")
    List<Alert> findAlertByApplicationId(String application_id);

//    @Query("select a from Alert where a.checked = false ")
//    List<Alert> findByChecked(Integer result);

//    //Sort Alerts By Days > 2
//    Optional<Alert> findByTimestamp(Date time);
//
//    //Find By Change Agent
//    Alert findByChange_agent(String name);

    //Find BY App Id
//    List<Alert> findByApplication_idAndAndChange_process(String id, String process);
}
