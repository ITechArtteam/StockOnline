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


    @Column(name = "street")
//    @Size(max=50, message="Number of letters in street < 50")
    private String street;


    @Column(name = "latitude")
    private Float latitude;


    @Column(name = "longitude")
    private Float longitude;

    @OneToMany(mappedBy = "address")
    private Set<Stock> stocks;

    @OneToMany(mappedBy = "address")
    private Set<ClientCompany> clientCompanies;

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

    @Override
    public String toString() {
        return "AddressDao{" +
                "id=" + id +
                ", country name='" + countryName + '\'' +
                ", city name='" + cityName + '\'' +
                ", street='" + street + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", stocks=" + stocks +
                ", clientCompanies=" + clientCompanies +
                '}';
    }
}
