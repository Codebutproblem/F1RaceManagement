package com.example.Sponsorship;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class SponsorshipApplication {

	public static void main(String[] args) {
		SpringApplication.run(SponsorshipApplication.class, args);
	}

}
