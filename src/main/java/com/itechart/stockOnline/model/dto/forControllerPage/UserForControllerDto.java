package com.itechart.stockOnline.model.dto.forControllerPage;

import com.itechart.stockOnline.model.User;

public class UserForControllerDto {
    private String login;
    private String name;
    private String surname;
    private String patronymic;

    public UserForControllerDto(User user) {
        this.login = user.getLogin();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.patronymic = user.getPatronymic();
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPatronymic() {
        return patronymic;
    }

    public void setPatronymic(String patronymic) {
        this.patronymic = patronymic;
    }
}
