package com.aravinth.facultyBackend.controller;

import com.aravinth.facultyBackend.dto.LeaveRequestDTO;
import com.aravinth.facultyBackend.entity.LeaveRequest;
import com.aravinth.facultyBackend.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/leave-requests")
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;

    @Autowired
    public LeaveRequestController(LeaveRequestService leaveRequestService) {
        this.leaveRequestService = leaveRequestService;
    }

    @PostMapping("/faculty/{facultyId}")
    public ResponseEntity<LeaveRequest> requestLeave(@RequestBody LeaveRequestDTO leaveRequestDTO, @PathVariable Long facultyId) {
        System.out.println("reached");
        LeaveRequest leaveRequest = leaveRequestService.createLeaveRequest(leaveRequestDTO, facultyId);
        if (leaveRequest != null) {
            return new ResponseEntity<>(leaveRequest, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/hod/{leaveRequestId}")
    public ResponseEntity<LeaveRequest> approveByHod(@PathVariable Long leaveRequestId) {
        System.out.println("reached hod aprove");
        LeaveRequest leaveRequest = leaveRequestService.approveByHod(leaveRequestId);
        if (leaveRequest != null) {
            return new ResponseEntity<>(leaveRequest, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/hr/{leaveRequestId}")
    public ResponseEntity<LeaveRequest> approveByHr(@PathVariable Long leaveRequestId) {
        LeaveRequest leaveRequest = leaveRequestService.approveByHr(leaveRequestId);
        if (leaveRequest != null) {
            return new ResponseEntity<>(leaveRequest, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/my-requests")
    public List<LeaveRequest> getMyLeaveRequests(@RequestHeader("Authorization") String token) {
        Long userId = leaveRequestService.getUserIdFromToken(token);
        System.out.println("User id: " + userId + " printed");
        return leaveRequestService.getLeaveRequestsByUserId(userId);
    }

    @GetMapping("/fetch-requests")
    public List<LeaveRequest> getAllLeaveRequests(@RequestHeader("Authorization") String token) {
//        jwtUtil.validateToken(token); // Optional: Validate the token before fetching data
        return leaveRequestService.getAllRequests();
    }
}
