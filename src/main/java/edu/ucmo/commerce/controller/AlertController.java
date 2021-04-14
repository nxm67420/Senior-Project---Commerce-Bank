package edu.ucmo.commerce.controller;

import edu.ucmo.commerce.dao.AlertDao;
import edu.ucmo.commerce.dao.ApplicationUsersDao;
import edu.ucmo.commerce.dao.UserDao;
import edu.ucmo.commerce.model.Alert;
import edu.ucmo.commerce.model.ApplicationUsers;
import edu.ucmo.commerce.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
    private JavaMailSender javaMailSender;

    @Autowired
    private ApplicationUsersDao applicationUsersDao;

    @Autowired
    private UserDao userDao;

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

        /*

         HANDLES EMAILS AFTER ALERT HAS BEEN POSTED

         */
        SimpleMailMessage msg = new SimpleMailMessage();
        List<ApplicationUsers> applicationUsers = new ArrayList<>();
        List<String> emails = new ArrayList<>();

        //Gathers the relationships between userId and applicationIds
        applicationUsersDao.findByApplicationId(alert.getApplication_id()).iterator().forEachRemaining(applicationUsers::add);

        //Uses previous relationships to gather user emails
        for (ApplicationUsers application: applicationUsers) {
            emails.add(userDao.findById(application.getUserId()).getEmail());
        }
        //Only creates an email if there are emails
        if(emails.size()>0) {
            //Creates the email
            msg.setTo(emails.toArray(new String[0]));
            msg.setSubject("New Alert!");
            msg.setText("One of your files: " + alert.getFile() + " has been modified at " + alert.getTimestamp() + " . Please acknowledge it!");
            javaMailSender.send(msg);
        }

        /*

         END OF EMAIL

         */


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
        return optionalAlert.orElse(null); //THEN Return
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

    @PutMapping("/{id}")
    public Alert update(@RequestBody Alert alertUpdate, Principal principal){
        Optional<Alert> optionalAlert = alertDao.findById(alertUpdate.getId());
        if(optionalAlert.isPresent()){
            alertUpdate.setAcknowledge_time(new Timestamp(System.currentTimeMillis()));
            alertUpdate.setAcknowledge_user(principal.getName());
            alertUpdate.setChecked(true);
            alertDao.save(alertUpdate);

            /*** Alerts IT department if alert was malicious **/
            if(alertUpdate.getMalicious()==true){
                SimpleMailMessage msg = new SimpleMailMessage();
                msg.setTo("IT@Commercebank.com");
                msg.setSubject("Malicious Alert Reported!");
                msg.setText(alertUpdate.getFile() + " has been reported to be malicious by User: " + principal.getName() + ". Please address this ASAP!");
                javaMailSender.send(msg);
            }
        }
        return alertUpdate;
    }

}
