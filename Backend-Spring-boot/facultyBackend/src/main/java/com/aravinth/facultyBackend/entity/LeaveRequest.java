package com.aravinth.facultyBackend.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "leave_requests")
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    @ManyToOne
    @JoinColumn(name = "faculty_id", nullable = false)
    private User faculty;  // This is the faculty requesting leave

    private String leaveType;     // Leave type (e.g., Casual, Sick, etc.)
    private String leaveReason;   // Reason for leave
    private Date startDate;       // Start date of leave
    private Date endDate;         // End date of leave

    private boolean isRequested = false;  // Initially, the request is not yet made
    private boolean isHodApproved = false;  // Whether the HOD approved the leave
    private boolean isHrApproved = false;  // Whether the HR approved the leave
    private boolean isLeaveApproved = false;  // Final status of the leave approval

    // Default constructor
    public LeaveRequest() {}

    // Constructor with fields
    public LeaveRequest(String username, User faculty, String leaveType, String leaveReason, Date startDate, Date endDate) {
        this.faculty = faculty;
        this.username = username;
        this.leaveType = leaveType;
        this.leaveReason = leaveReason;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getFaculty() {
        return faculty;
    }

    public void setFaculty(User faculty) {
        this.faculty = faculty;
    }

    public String getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }

    public String getLeaveReason() {
        return leaveReason;
    }

    public void setLeaveReason(String leaveReason) {
        this.leaveReason = leaveReason;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public boolean isRequested() {
        return isRequested;
    }

    public void setRequested(boolean isRequested) {
        this.isRequested = isRequested;
    }

    public boolean isHodApproved() {
        return isHodApproved;
    }

    public void setHodApproved(boolean isHodApproved) {
        this.isHodApproved = isHodApproved;
    }

    public boolean isHrApproved() {
        return isHrApproved;
    }

    public void setHrApproved(boolean isHrApproved) {
        this.isHrApproved = isHrApproved;
    }

    public boolean isLeaveApproved() {
        return isLeaveApproved;
    }

    public void setLeaveApproved(boolean isLeaveApproved) {
        this.isLeaveApproved = isLeaveApproved;
    }
}
