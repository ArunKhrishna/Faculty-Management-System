package com.arun.facultyBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arun.facultyBackend.entity.LeaveRequest;

import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByFacultyId(Long facultyId); // Update the method to use facultyId

    List<LeaveRequest> findAll(); // This is redundant, but kept for clarity.

}
