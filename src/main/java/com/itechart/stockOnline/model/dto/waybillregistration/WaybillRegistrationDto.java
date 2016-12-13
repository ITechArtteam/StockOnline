package com.itechart.stockOnline.model.dto.waybillregistration;

import com.itechart.stockOnline.model.enums.TransportType;
import com.itechart.stockOnline.model.enums.WaybillStatus;

import java.util.List;

public class WaybillRegistrationDto {

    private String number;
    private String issueDate;
    private Long senderId;
    private Long receiverId;
    private Long carrierId;
    private String driverPassportNumber;
    private TransportType transportType;
    private List<String> numbers;
    private String description;
    private String registeredByLogin;
    private String registrationDatetime;
    private List<WaybillProductDto> products;
    private WaybillStatus status;

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(String issueDate) {
        this.issueDate = issueDate;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }

    public Long getCarrierId() {
        return carrierId;
    }

    public void setCarrierId(Long carrierId) {
        this.carrierId = carrierId;
    }

    public String getDriverPassportNumber() {
        return driverPassportNumber;
    }

    public void setDriverId(String driverPassportNumber) {
        this.driverPassportNumber = driverPassportNumber;
    }

    public TransportType getTransportType() {
        return transportType;
    }

    public void setTransportType(TransportType transportType) {
        this.transportType = transportType;
    }

    public List<String> getNumbers() {
        return numbers;
    }

    public void setNumbers(List<String> numbers) {
        this.numbers = numbers;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDriverPassportNumber(String driverPassportNumber) {
        this.driverPassportNumber = driverPassportNumber;
    }

    public String getRegisteredByLogin() {
        return registeredByLogin;
    }

    public void setRegisteredByLogin(String registeredByLogin) {
        this.registeredByLogin = registeredByLogin;
    }

    public String getRegistrationDatetime() {
        return registrationDatetime;
    }

    public void setRegistrationDatetime(String registrationDatetime) {
        this.registrationDatetime = registrationDatetime;
    }

    public List<WaybillProductDto> getProducts() {
        return products;
    }

    public void setProducts(List<WaybillProductDto> products) {
        this.products = products;
    }

    public WaybillStatus getStatus() {
        return status;
    }

    public void setStatus(WaybillStatus status) {
        this.status = status;
    }
}
