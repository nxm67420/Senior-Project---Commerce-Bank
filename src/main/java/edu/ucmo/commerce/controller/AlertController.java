package edu.ucmo.commerce.controller;

import edu.ucmo.commerce.dao.AlertDao;
import edu.ucmo.commerce.dao.ApplicationUsersDao;
import edu.ucmo.commerce.model.Alert;
import edu.ucmo.commerce.model.ApplicationUsers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("alerts")
public class AlertController {
    @Autowired
    private AlertDao alertDao;

    @Autowired
    private ApplicationUsersDao applicationUsersDao;

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

    @GetMapping
    public List<Alert> listAlerts(){
        List<Alert> list = new ArrayList<>();
        alertDao.findAll().iterator().forEachRemaining(list::add);
        return list;
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
}
