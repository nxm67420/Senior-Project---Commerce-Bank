package edu.ucmo.commerce.controller;

import edu.ucmo.commerce.dao.AlertDao;
import edu.ucmo.commerce.model.Alert;
import jdk.nashorn.internal.runtime.regexp.joni.constants.OPCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/alerts")
public class AlertController {

    @Autowired
    private AlertDao alertDao;

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
    public Alert findById(@PathVariable int id){
        Optional<Alert> optionalAlert = alertDao.findById(id);
        return optionalAlert.isPresent() ? optionalAlert.get() : null;
    }

}
