package com.itechart.stockOnline.model.dto;

import java.util.Set;

public class StockDto {
    private Long id;
    private String name;
    private String nameCompany;
    private String country;
    private String city;
    private String street;
    private Integer home;
    private Set<RoomDto> rooms;


    public Long getId() { return id;  }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getNameCompany() {
        return nameCompany;
    }
    public void setNameCompany(String nameCompany) {
        this.nameCompany = nameCompany;
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

    public Integer getHome() {
        return home;
    }
    public void setHome(Integer home) {
        this.home = home;
    }

    public Set<RoomDto> getRooms() { return rooms; }
    public void setRooms(Set<RoomDto> rooms) { this.rooms = rooms; }

    @Override
    public String toString() {
        return "StockDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", nameCompany='" + nameCompany + '\'' +
                ", country='" + country + '\'' +
                ", city='" + city + '\'' +
                ", street='" + street + '\'' +
                ", home=" + home +
                ", rooms=" + rooms +
                '}';
    }
}
