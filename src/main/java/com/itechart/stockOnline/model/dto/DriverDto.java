package com.itechart.stockOnline.model.dto;

public class DriverDto {
    private Long id;
    private String transferCompany;
    private String firstName;
    private String lastName;
    private String patronymic;
    private String birtDate;
    private String passportNumber;
    private String passportIssuedBy;
    private String passportIssuedDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransferCompany() {
        return transferCompany;
    }

    public void setTransferCompany(String transferCompany) {
        this.transferCompany = transferCompany;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPatronymic() {
        return patronymic;
    }

    public void setPatronymic(String patronymic) {
        this.patronymic = patronymic;
    }

    public String getBirtDate() {
        return birtDate;
    }

    public void setBirtDate(String birtDate) {
        this.birtDate = birtDate;
    }

    public String getPassportNumber() {
        return passportNumber;
    }

    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
    }

    public String getPassportIssuedBy() {
        return passportIssuedBy;
    }

    public void setPassportIssuedBy(String passportIssuedBy) {
        this.passportIssuedBy = passportIssuedBy;
    }

    public String getPassportIssuedDate() {
        return passportIssuedDate;
    }

    public void setPassportIssuedDate(String passportIssuedDate) {
        this.passportIssuedDate = passportIssuedDate;
    }

    @Override
    public String toString() {
        return "DriverDto{" +
                "id=" + id +
                ", transferCompany='" + transferCompany + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", patronymic='" + patronymic + '\'' +
                ", birtDate='" + birtDate + '\'' +
                ", passportNumber='" + passportNumber + '\'' +
                ", passportIssuedBy='" + passportIssuedBy + '\'' +
                ", passportIssuedDate='" + passportIssuedDate + '\'' +
                '}';
    }
}
