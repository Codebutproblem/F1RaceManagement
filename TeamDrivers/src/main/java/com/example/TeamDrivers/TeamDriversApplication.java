package com.example.TeamDrivers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class TeamDriversApplication {

	public static void main(String[] args) {
		SpringApplication.run(TeamDriversApplication.class, args);
	}
}
