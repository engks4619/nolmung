package com.a703.withdog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class WithdogApplication {

	public static void main(String[] args) {
		SpringApplication.run(WithdogApplication.class, args);
	}

}
