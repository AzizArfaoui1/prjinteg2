package com.example.GatewayProjet_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class GatewayProjetServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayProjetServiceApplication.class, args);
		System.out.println("Gateway Service is running...");
	}
	@Bean
	public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
		return builder.routes()
				.route(r -> r.path("/providers/**").uri("http://localhost:8081"))
				.route(r -> r.path("/services/**").uri("http://localhost:8083"))
				.route(r -> r.path("/reservations/**").uri("http://localhost:8086"))
				.build();
	}

}