package com.itechart.stockOnline.model;

import javax.persistence.*;
//import javax.validation.constraints.Size;

import java.util.Set;

@Entity
@Table(name = "transfer_company")
public class TransferCompany {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "company")
    private Set<Driver> drivers;

    public TransferCompany() {
    }

    public TransferCompany(String name) {
        this.name = name;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Set<Driver> getDrivers() { return drivers; }
    public void setDrivers(Set<Driver> drivers) { this.drivers = drivers; }

    @Override
    public String toString() {
        return "TransferComany{" +
                "id=" + id +"}";
    }
}
