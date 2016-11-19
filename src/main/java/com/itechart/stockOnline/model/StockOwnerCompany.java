package com.itechart.stockOnline.model;

import javax.persistence.*;
//import javax.validation.constraints.Size;

import java.util.Set;

@Entity
@Table(name = "stock_owner_company")
public class StockOwnerCompany {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
//    @Size(max=50, message="Number of letters in name < 50")
    private String name;

    @ManyToOne
    @JoinColumn(name = "admin")
    private User admin;

    @Column(name = "is_active")
    private Boolean isActive;

    @OneToMany(mappedBy = "company")
    private Set<Stock> stocks;

    @ManyToOne
    @JoinColumn(name = "address")
    private Address address;

    @OneToMany(mappedBy = "stockOwnerCompany")
    private Set<User> users;

    public StockOwnerCompany() {
        isActive = false;
        address = new Address();
        admin = new User();
    }
    public StockOwnerCompany(String name) {
        isActive = false;
        address = new Address();
        admin = new User();
        this.name = name;
    }
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

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

    public User getAdmin() {
        return admin;
    }

    public void setAdmin(User admin) {
        this.admin = admin;
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
                "id=" + id +
                ", name='" + name + '\'' +
                ", admin=" + admin +
                ", isActive=" + isActive +
                ", stocks=" + stocks +
                ", address=" + address +
                '}';
    }
}

