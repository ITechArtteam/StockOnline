package com.itechart.stockOnline.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "stock")
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private StockOwnerCompany company;

    @OneToMany(mappedBy = "stock")
    private Set<Room> rooms;

    public Stock() {
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Address getAddress() { return address; }
    public void setAddress(Address address) { this.address = address; }

    public StockOwnerCompany getCompany() { return company; }
    public void setCompany(StockOwnerCompany company) { this.company = company; }

    public Set<Room> getRooms() { return rooms; }
    public void setRooms(Set<Room> rooms) { this.rooms = rooms; }

    @Override
    public String toString() {
        return "Stock{" +
                "id=" + id +
                ", address=" + address +
                ", stockOwnerCompany=" + company +
                ", rooms=" + rooms +
                '}';
    }
}
