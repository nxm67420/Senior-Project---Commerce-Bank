package edu.ucmo.commerce.controller;

import edu.ucmo.commerce.dao.AlertDao;
import edu.ucmo.commerce.dao.ApplicationUsersDao;
import edu.ucmo.commerce.dao.UserDao;
import edu.ucmo.commerce.model.Alert;
import edu.ucmo.commerce.model.ApplicationUsers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class EmailController {

    @Autowired
    private AlertDao alertDao;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private ApplicationUsersDao applicationUsersDao;

    @Autowired
    private UserDao userDao;

    public EmailController(){

    }

    public void run(){
        List<Alert> alerts = new ArrayList<>();
        alertDao.findByChecked(false).iterator().forEachRemaining(alerts::add);
        for (Alert alert: alerts) {
            SimpleMailMessage msg = new SimpleMailMessage();
            List<ApplicationUsers> applicationUsers = new ArrayList<>();
            List<String> emails = new ArrayList<>();

            applicationUsersDao.findByApplicationId(alert.getApplication_id()).iterator().forEachRemaining(applicationUsers::add);

            for (ApplicationUsers application: applicationUsers) {
                emails.add(userDao.findById(application.getUserId()).getEmail());
            }

            if(emails.size()>0) {
                //Creates the email
                msg.setTo(emails.toArray(new String[0]));
                msg.setSubject("New Alert!");
                msg.setText("One of your modified files: " + alert.getFile() + " has been unacknowledged for 48 hours! Please acknowledge it!");
                javaMailSender.send(msg);
            }
        }
    }
}
