package com.itechart.stockOnline.model;

import javax.persistence.*;
//import javax.validation.constraints.Size;

import java.util.Set;

@Entity
@Table(name = "transfer_company")
public class TransferCompany {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
//    @Size(max=50, message="Number of letters in name < 50")
    private String name;

    @OneToMany(mappedBy = "company")
    private Set<Driver> drivers;

    public TransferCompany() {
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Set<Driver> getDrivers() { return drivers; }
    public void setDrivers(Set<Driver> drivers) { this.drivers = drivers; }

    @Override
    public String toString() {
        return "TransferComany{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", drivers=" + drivers +
                '}';
    }
}
