package com.arun.facultyBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arun.facultyBackend.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
