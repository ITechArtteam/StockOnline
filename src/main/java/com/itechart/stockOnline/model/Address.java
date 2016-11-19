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
    private Integer id;

    @Column(name = "country_name")
//  @NotNull(message="Country must be specified.")
//    @Size(max=50, message="Number of letters in country < 50")
    private String countryName;


    @Column(name = "city_name")
//    @Size(max=50, message="Number of letters in city < 50")
    private String cityName;

//    @Size(max=50, message="Number of letters in street < 50")
    private String street;

    private int home;

    private int room;

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

    public Address() {    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

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

    public int getHome() {
        return home;
    }

    public void setHome(int home) {
        this.home = home;
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

    public int getRoom() {
        return room;
    }

    public void setRoom(int room) {
        this.room = room;
    }

    public Set<StockOwnerCompany> getStockOwnerCompanies() {
        return stockOwnerCompanies;
    }

    public void setStockOwnerCompanies(Set<StockOwnerCompany> stockOwnerCompanies) {
        this.stockOwnerCompanies = stockOwnerCompanies;
    }
}
