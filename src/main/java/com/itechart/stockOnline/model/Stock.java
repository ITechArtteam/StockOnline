package com.itechart.stockOnline.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.collections.CollectionUtils;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "stock")
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "address_id")
    private Address address;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private StockOwnerCompany company;

    @OneToMany(mappedBy = "stock", fetch = FetchType.EAGER)
    private Set<Room> rooms;

    public Stock() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Address getAddress() { return address; }
    public void setAddress(Address address) { this.address = address; }

    public StockOwnerCompany getCompany() { return company; }
    public void setCompany(StockOwnerCompany company) { this.company = company; }

    public Set<Room> getRooms() { return rooms; }
    public void setRooms(Set<Room> rooms) { this.rooms = rooms; }

    @Override
    public String toString() {
        return "Stock{" +
                "name='" + name + '\'' +
                ", address=" + address +
                ", rooms=" + rooms +
                '}';
    }
}
