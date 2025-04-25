package com.arun.facultyBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FacultyBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FacultyBackendApplication.class, args);
		System.out.println("Server Running!");
	}

}
