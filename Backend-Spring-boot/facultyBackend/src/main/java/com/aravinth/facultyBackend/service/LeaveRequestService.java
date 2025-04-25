package com.aravinth.facultyBackend.service;

import com.aravinth.facultyBackend.entity.LeaveRequest;
import com.aravinth.facultyBackend.entity.User;
import com.aravinth.facultyBackend.repository.LeaveRequestRepository;
import com.aravinth.facultyBackend.repository.UserRepository;
import com.aravinth.facultyBackend.dto.LeaveRequestDTO;
import com.aravinth.facultyBackend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    @Autowired
    public LeaveRequestService(LeaveRequestRepository leaveRequestRepository, UserRepository userRepository, JwtUtil jwtUtil) {
        this.leaveRequestRepository = leaveRequestRepository;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public LeaveRequest createLeaveRequest(LeaveRequestDTO leaveRequestDTO, Long facultyId) {
        Optional<User> facultyOpt = userRepository.findById(facultyId);
        if (facultyOpt.isPresent()) {
            User faculty = facultyOpt.get();
            LeaveRequest leaveRequest = new LeaveRequest();
            leaveRequest.setFaculty(faculty);
            leaveRequest.setLeaveType(leaveRequestDTO.getLeaveType());
            leaveRequest.setLeaveReason(leaveRequestDTO.getLeaveReason());
            leaveRequest.setStartDate(leaveRequestDTO.getStartDate());
            leaveRequest.setEndDate(leaveRequestDTO.getEndDate());
            leaveRequest.setRequested(true); // Faculty has made the request
            return leaveRequestRepository.save(leaveRequest);
        }
        return null;
    }

    public LeaveRequest approveByHod(Long leaveRequestId) {
        Optional<LeaveRequest> leaveRequestOpt = leaveRequestRepository.findById(leaveRequestId);
        if (leaveRequestOpt.isPresent()) {
            LeaveRequest leaveRequest = leaveRequestOpt.get();
            leaveRequest.setHodApproved(true); // HOD approves the leave
            return leaveRequestRepository.save(leaveRequest);
        }
        return null;
    }

    public LeaveRequest approveByHr(Long leaveRequestId) {
        Optional<LeaveRequest> leaveRequestOpt = leaveRequestRepository.findById(leaveRequestId);
        if (leaveRequestOpt.isPresent()) {
            LeaveRequest leaveRequest = leaveRequestOpt.get();
            if (leaveRequest.isHodApproved()) {
                leaveRequest.setHrApproved(true); // HR approves the leave
                leaveRequest.setLeaveApproved(true); // Leave is fully approved
                return leaveRequestRepository.save(leaveRequest);
            }
        }
        return null;
    }

    public Long getUserIdFromToken(String token) {
        String username = jwtUtil.extractUsername(token.substring(7));  // Remove "Bearer " prefix
        Optional<User> user = userRepository.findByUsername(username);
        return user.isPresent() ? user.get().getId() : null;
    }

    public List<LeaveRequest> getLeaveRequestsByUserId(Long userId) {
        return leaveRequestRepository.findByFacultyId(userId);
    }

    public List<LeaveRequest> getAllRequests() {
        return leaveRequestRepository.findAll();
    }
}
