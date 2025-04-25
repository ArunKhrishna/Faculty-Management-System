package com.arun.facultyBackend.dto;

import java.util.Date;

public class LeaveRequestDTO {

    private String leaveType;
    private String leaveReason;
    private Date startDate;
    private Date endDate;

    // Default constructor
    public LeaveRequestDTO() {
    }

    // Constructor with fields
    public LeaveRequestDTO(String leaveType, String leaveReason, Date startDate, Date endDate) {
        this.leaveType = leaveType;
        this.leaveReason = leaveReason;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    // Getters and Setters
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
}
