package edu.ucmo.commerce;

import edu.ucmo.commerce.dao.AlertDao;
import edu.ucmo.commerce.dao.ApplicationUsersDao;
import edu.ucmo.commerce.dao.UserDao;
import edu.ucmo.commerce.model.Alert;
import edu.ucmo.commerce.model.ApplicationUsers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@SpringBootApplication
@EnableScheduling
public class AlertTracker {

	public static void main(String[] args) {
		SpringApplication.run(AlertTracker.class, args);
	}


	@Autowired
	private AlertDao alertDao;

	@Autowired
	private ApplicationUsersDao applicationUsersDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private JavaMailSender javaMailSender;

	@Scheduled(fixedDelay = 10000)
	public void unacknowledgedAlerts(){


		List<Alert> alerts = new ArrayList<>();

		//Gathers all alerts that are unchecked and older than 2 days
		alertDao.findByChecked(false).iterator().forEachRemaining(alert -> {
			if((Calendar.getInstance().getTime().getTime() - alert.getTimestamp().getTime()) >= 172800000){
				alerts.add(alert);
				System.out.println(alert);
			}
		});

		//Sends emails for every alert that was gathered above
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
				msg.setSubject("Unacknowledged Alert!");
				msg.setText("One of your modified files: " + alert.getFile() + " has been unacknowledged for 48 hours! Please acknowledge it!");
				javaMailSender.send(msg);
			}
		}
	}
}
