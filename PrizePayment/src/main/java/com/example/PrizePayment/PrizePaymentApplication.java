package com.example.PrizePayment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class PrizePaymentApplication {

	public static void main(String[] args) {
		SpringApplication.run(PrizePaymentApplication.class, args);
	}

}
