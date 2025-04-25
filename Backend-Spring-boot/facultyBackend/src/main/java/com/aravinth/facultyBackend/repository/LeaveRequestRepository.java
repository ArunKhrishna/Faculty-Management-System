package com.aravinth.facultyBackend.repository;

import com.aravinth.facultyBackend.entity.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByFacultyId(Long facultyId); // Update the method to use facultyId
    List<LeaveRequest> findAll(); // This is redundant, but kept for clarity.

}
