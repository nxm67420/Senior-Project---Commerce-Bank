package edu.ucmo.commerce.controller;

import edu.ucmo.commerce.dao.AlertDao;
import edu.ucmo.commerce.model.Alert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController /* Communicates our API React(Javascript) <----> SpringBoot Backend */
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

    //Return (Alerts.Checked == False)
    //Working
    @GetMapping(value = "/checking/{checked}")
    public List<Alert> notChecked(@PathVariable boolean checked){
     //   Optional<Alert> unchecked = alertDao.findByChecked(checked); //If exist in the Database
     //   return unchecked.isPresent() ? unchecked.get() : null; //THEN Return
        List<Alert> list = new ArrayList<>();
        alertDao.findByChecked(checked).iterator().forEachRemaining(list::add);
        return list;
    }


    //Return (Alerts Checked == True)
    //In Progress


    //Return (Alerts.Checked == False && Days Passed > 2)
    //DaysPassed - Posted Date
    //In Progress
    /*@GetMapping("checked/{checked}/days/{days}")
    public Alert passedDue(Integer checked, Integer days){
        List<Alert> list = new ArrayList<>();
        alertDao.findByCheckedAndTimestamp(0, 2).iterator().forEachRemaining(list::add);
        return (Alert)list;
    }*/

    //Save Altered Process
    //Admin Name, Timestamp, Comments
}
