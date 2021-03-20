package edu.ucmo.commerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BasicDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(BasicDemoApplication.class, args);
	}

}
