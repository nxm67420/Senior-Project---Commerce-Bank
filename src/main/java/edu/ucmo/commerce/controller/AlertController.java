package edu.ucmo.commerce.controller;

import edu.ucmo.commerce.dao.AlertDao;
import edu.ucmo.commerce.dao.ApplicationUsersDao;
import edu.ucmo.commerce.model.Alert;
import edu.ucmo.commerce.model.ApplicationUsers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.security.Principal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController /* Communicates our API React(Javascript) <----> SpringBoot Backend */
@RequestMapping("alerts")
public class AlertController {

    @Autowired
    private AlertDao alertDao;

    @Autowired
    private ApplicationUsersDao applicationUsersDao;

    //Create Alert
    @PostMapping
    public Alert saveAlert(@RequestBody Alert alert){
        Alert newAlert = new Alert(
                alert.getTimestamp(),
                alert.getHostname(),
                alert.getApplication_id(),
                alert.getFile(),
                alert.getChange_agent(),
                alert.getChange_process()
                );
        return alertDao.save(newAlert);
    }

    //Return ALL Alerts
    @GetMapping
    public List<Alert> listAlerts(){
        List<Alert> list = new ArrayList<>();
        alertDao.findAllBy().iterator().forEachRemaining(list::add);
        return list;
    }

    //Return Alert w/ Specific ID
    //Working
    @GetMapping(value = "alerts/{id}")
    public Alert returnOne(@PathVariable int id){
        Optional<Alert> optionalAlert = alertDao.findById(id); //If exist in the Database
        return optionalAlert.isPresent() ? optionalAlert.get() : null; //THEN Return
    }

    //Return (Alerts.Checked == true)
    @GetMapping(value = "/checked/{checked}")
    public List<Alert> notChecked(@PathVariable boolean checked){
        List<Alert> checkedAlerts = new ArrayList<>();
        alertDao.findByChecked(checked).iterator().forEachRemaining(checkedAlerts::add);
        return checkedAlerts;
    }

    //Return (Alerts.Checked == false)
    @GetMapping("/checked/{unChecked}")
    public List<Alert> falseAlerts(@PathVariable boolean unChecked){
        List<Alert> uncheckedAlerts = new ArrayList<>();
        alertDao.findByChecked(unChecked).iterator().forEachRemaining(uncheckedAlerts::add);
        return uncheckedAlerts;
    }

    @GetMapping("/{id}")
    public List<Alert> getUserAlerts(@PathVariable int id){
        List<Alert> list = new ArrayList<>();
        List<ApplicationUsers> applications =  new ArrayList<>();
        applicationUsersDao.findByUserId(id).iterator().forEachRemaining(applications::add);
        for (ApplicationUsers application : applications) {
            alertDao.findAlertByApplicationId(String.valueOf(application.getApplicationId())).iterator().forEachRemaining(list::add);
        }
        return list;
    }

    //Update Alert
    @PutMapping("/{id}")
    public Alert update(@RequestBody Alert alertUpdate, Principal principal){
        Optional<Alert> optionalAlert = alertDao.findById(alertUpdate.getId());
        if(optionalAlert.isPresent()){
            alertUpdate.setAcknowledge_time(new Timestamp(System.currentTimeMillis()));
            alertUpdate.setAcknowledge_user(principal.getName());
            alertUpdate.setChecked(true);
            alertDao.save(alertUpdate);
        }
        return alertUpdate;
    }

    //Delete Alert According to ID
    @DeleteMapping("/delete/{id}")
    public void deleteAlert(@PathVariable int id){
        alertDao.deleteAlertById(id);
    }
}
