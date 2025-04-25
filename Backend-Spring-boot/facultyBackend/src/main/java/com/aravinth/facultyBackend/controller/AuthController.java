package com.aravinth.facultyBackend.controller;

import com.aravinth.facultyBackend.entity.User;
import com.aravinth.facultyBackend.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        String token = authService.authenticate(username, password);
        return token != null ? token : "Invalid credentials";
    }
}
