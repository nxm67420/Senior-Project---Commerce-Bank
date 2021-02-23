package edu.ucmo.commerce.controller;

import edu.ucmo.commerce.dao.AlertDao;
import edu.ucmo.commerce.model.Alert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("alerts")
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
        List<Alert> list = new ArrayList();
        alertDao.findAll().iterator().forEachRemaining(list::add);
        return list;
    }
}
