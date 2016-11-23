package com.itechart.stockOnline.model.dto;

public class OwnerCompanyDto {
    private Long id;
    private String name;
    private String adminLogin;
    private String adminPassword;
    private String adminEmail;
    private String country;
    private String city;
    private String street;
    private String home;
    private String room;

    public OwnerCompanyDto() {
        this.id = 0L;
        name = "";
        adminLogin = "";
        adminPassword = "";
        adminEmail = "";
        country = "";
        city = "";
        street = "";
        home = "";
        room = "";
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAdminLogin() {
        return adminLogin;
    }

    public void setAdminLogin(String adminLogin) {
        this.adminLogin = adminLogin;
    }

    public String getAdminPassword() {
        return adminPassword;
    }

    public void setAdminPassword(String adminPassword) {
        this.adminPassword = adminPassword;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getAdminEmail() {
        return adminEmail;
    }

    public void setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHome() {
        return home;
    }

    public void setHome(String home) {
        this.home = home;
    }

    public void setHome(Integer home) {
        if (home != null) {
            this.home = Integer.toString(home);
        } else {
            this.home = "";
        }
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public void setRoom(Integer room) {
        if (room != null) {
            this.room = Integer.toString(room);
        } else {
            this.room = "";
        }
    }


    @Override
    public String toString() {
        return "OwnerCompanyDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", adminLogin='" + adminLogin + '\'' +
                ", adminPassword='" + adminPassword + '\'' +
                ", adminEmail='" + adminEmail + '\'' +
                ", country='" + country + '\'' +
                ", city='" + city + '\'' +
                ", street='" + street + '\'' +
                ", home=" + home +
                ", room=" + room +
                '}';
    }
}
