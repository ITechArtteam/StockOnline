package com.itechart.stockOnline.model;

import javax.persistence.*;
//import javax.validation.constraints.NotNull;
//import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "country_name")
//  @NotNull(message="Country must be specified.")
//    @Size(max=50, message="Number of letters in country < 50")
    private String countryName;


    @Column(name = "city_name")
//    @Size(max=50, message="Number of letters in city < 50")
    private String cityName;

//    @Size(max=50, message="Number of letters in street < 50")
    @Column(name = "street")
    private String street;

    @Column(name = "home")
    private Integer home;

    @Column(name = "room")
    private Integer room;

    @Column(name = "latitude")
    private Float latitude;


    @Column(name = "longitude")
    private Float longitude;

    @OneToMany(mappedBy = "address")
    private Set<Stock> stocks;

    @OneToMany(mappedBy = "address")
    private Set<ClientCompany> clientCompanies;

    @OneToMany(mappedBy = "address")
    private Set<StockOwnerCompany> stockOwnerCompanies;

    @OneToMany(mappedBy = "address")
    private Set<User> user;

    public Address() {
        home = 0;
        room = 0;
        id = 0L;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCountryName() { return countryName; }
    public void setCountryName(String countryName) { this.countryName = countryName; }

    public String getCityName() { return cityName; }
    public void setCityName(String cityName) { this.cityName = cityName; }

    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }

    public Float getLatitude() { return latitude; }
    public void setLatitude(Float latitude) { this.latitude = latitude; }

    public Float getLongitude() { return longitude; }
    public void setLongitude(Float longitude) { this.longitude = longitude; }

    public Set<Stock> getStocks() { return stocks; }
    public void setStocks(Set<Stock> stocks) { this.stocks = stocks; }

    public Set<ClientCompany> getClientCompanies() { return clientCompanies;  }
    public void setClientCompanies(Set<ClientCompany> clientCompanies) { this.clientCompanies = clientCompanies; }

    public Set<User> getUser() {
        return user;
    }

    public void setUser(Set<User> user) {
        this.user = user;
    }

    public Integer getHome() {
        return home;
    }

    public void setHome(Integer home) {
        this.home = home;
    }

    public Integer getRoom() {
        return room;
    }

    public void setRoom(Integer room) {
        this.room = room;
    }

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", countryName='" + countryName + '\'' +
                ", cityName='" + cityName + '\'' +
                ", street='" + street + '\'' +
                ", home=" + home +
                ", room=" + room +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }

    public Set<StockOwnerCompany> getStockOwnerCompanies() {
        return stockOwnerCompanies;
    }

    public void setStockOwnerCompanies(Set<StockOwnerCompany> stockOwnerCompanies) {
        this.stockOwnerCompanies = stockOwnerCompanies;
    }
}
