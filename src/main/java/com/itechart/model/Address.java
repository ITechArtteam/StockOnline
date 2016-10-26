package com.itechart.model;

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

    @Column(name = "country")
//  @NotNull(message="Country must be specified.")
//    @Size(max=50, message="Number of letters in country < 50")
    private String country;


    @Column(name = "city")
//    @Size(max=50, message="Number of letters in city < 50")
    private String city;


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

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

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
                ", country='" + country + '\'' +
                ", city='" + city + '\'' +
                ", street='" + street + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", stocks=" + stocks +
                ", clientCompanies=" + clientCompanies +
                '}';
    }
}
