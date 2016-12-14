package com.itechart.stockOnline.model.dto.forControllerPage;

import com.itechart.stockOnline.model.Driver;
import org.apache.commons.lang3.time.DateFormatUtils;

public class DriverForControllerDto {
    private String DATE_PATTERN = "dd.MM.yyyy";

    private String passportNumber;
    private String firstName;
    private String lastName;
    private String patronymic;
    private String birthDate;

    public DriverForControllerDto(Driver driver) {
        if(driver != null) {
            this.passportNumber = driver.getPassportNumber();
            this.firstName = driver.getFirstName();
            this.lastName = driver.getLastName();
            this.patronymic = driver.getPatronymic();
            this.birthDate = DateFormatUtils.format(driver.getBirthDate(), DATE_PATTERN);
        }
    }

    public String getPassportNumber() {
        return passportNumber;
    }

    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
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

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }
}
