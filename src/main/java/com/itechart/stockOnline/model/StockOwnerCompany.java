package com.itechart.stockOnline.model;

import javax.persistence.*;

import java.util.Set;

@Entity
@Table(name = "stock_owner_company")
public class StockOwnerCompany {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "is_active")
    private Boolean isActive;

    @OneToMany(mappedBy = "company")
    private Set<Stock> stocks;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "address")
    private Address address;

    @OneToMany(mappedBy = "stockOwnerCompany", cascade = CascadeType.PERSIST,  fetch = FetchType.LAZY)
    private Set<User> users;

    public StockOwnerCompany() {
        isActive = false;
        address = new Address();
    }
    public StockOwnerCompany(String name) {
        isActive = false;
        address = new Address();
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Boolean getActive() { return isActive; }
    public void setActive(Boolean active) { isActive = active; }

    public Set<Stock> getStocks() { return stocks; }
    public void setStocks(Set<Stock> stocks) { this.stocks = stocks; }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "StockOwnerCompany{" +
                "id=" + id +"}";
    }
}

